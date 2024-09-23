
async function fetchAllPages(url) {
  let allData = [];
  let page = 1;
  const perPage = 100; // Max allowed by GitHub API

  console.log("Token:", process.env.GITHUB_ACCESS_TOKEN);

  while (true) {
    const response = await fetch(`${url}?per_page=${perPage}&page=${page}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
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


export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    console.log("Fetching data for username:", username);
    
    const [userRes, followersRes, followingRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
      }),
      fetchAllPages(`https://api.github.com/users/${username}/followers`),
      fetchAllPages(`https://api.github.com/users/${username}/following`)
    ]);

    console.log("User response status:", userRes.status);
    
    const userData = await userRes.json();

    if (userRes.status === 404) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!userRes.ok) {
      throw new Error(`GitHub API responded with status ${userRes.status}`);
    }

    res.status(200).json({
      user: userData,
      followers: followersRes.map(f => ({ login: f.login, avatar_url: f.avatar_url })),
      following: followingRes.map(f => ({ login: f.login, avatar_url: f.avatar_url }))
    });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ error: 'Error fetching GitHub data', details: error.message });
  }
}
