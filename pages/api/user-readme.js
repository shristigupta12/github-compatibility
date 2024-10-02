


import { Base64 } from 'js-base64';

async function fetchAllPages(url) {
  let allData = [];
  let page = 1;
  const perPage = 100; // Max allowed by GitHub API

  while (true) {
    const response = await fetch(`${url}?per_page=${perPage}&page=${page}`, {
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
      },
    });
    const data = await response.json();
    
    if (data.length === 0) break;
    
    allData = allData.concat(data);
    if (data.length < perPage) break;
    
    page++;
  }

  return allData;
}

async function fetchProfileReadme(username) {
  try {
    const readmeUrl = `https://api.github.com/repos/${username}/${username}/contents/README.md`;
    const response = await fetch(readmeUrl, {
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
      },
    });
    
    if (response.status === 404) {
      return null; // Profile README doesn't exist
    }

    const data = await response.json();
    
    // Check if the content exists before trying to decode it
    if (data && data.content) {
      // GitHub returns the content as Base64 encoded
      const decodedContent = Base64.decode(data.content);
      return decodedContent;
    } else {
      console.warn(`No content found in README for user ${username}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching profile README:', error);
    return null;
  }
}

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const [userRes, followers, following, profileReadme] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
        },
      }),
      fetchAllPages(`https://api.github.com/users/${username}/followers`),
      fetchAllPages(`https://api.github.com/users/${username}/following`),
      fetchProfileReadme(username)
    ]);

    if (userRes.status === 404) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = await userRes.json();

    res.status(200).json({
      user: userData,
      followers: followers.map(f => ({ login: f.login, avatar_url: f.avatar_url })),
      following: following.map(f => ({ login: f.login, avatar_url: f.avatar_url })),
      profileReadme
    });
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    res.status(500).json({ error: 'Error fetching GitHub data', details: error.message });
  }
}
