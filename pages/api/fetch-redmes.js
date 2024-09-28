// pages/api/fetch-readmes.js

import { Base64 } from 'js-base64';

async function fetchWithAuth(url) {
  console.log(`Fetching: ${url}`);
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
  });
  if (!response.ok) {
    console.error(`GitHub API responded with status ${response.status} for URL: ${url}`);
    return null;
  }
  return response.json();
}

async function fetchAllPages(url) {
  let allData = [];
  let page = 1;
  const perPage = 100; // Max allowed by GitHub API

  while (true) {
    const data = await fetchWithAuth(`${url}?per_page=${perPage}&page=${page}`);
    if (!data || data.length === 0) break;
    allData = allData.concat(data);
    if (data.length < perPage) break;
    page++;
  }

  console.log(`Fetched ${allData.length} items from ${url}`);
  return allData;
}

async function fetchProfileReadme(username) {
  try {
    const readmeUrl = `https://api.github.com/repos/${username}/${username}/contents/README.md`;
    const data = await fetchWithAuth(readmeUrl);
    if (data) {
      console.log(`Successfully fetched README for ${username}`);
      return Base64.decode(data.content);
    } else {
      console.log(`No README found for ${username}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching profile README for ${username}:`, error);
    return null;
  }
}

async function fetchFollowersAndFollowing(username) {
  const [followers, following] = await Promise.all([
    fetchAllPages(`https://api.github.com/users/${username}/followers`),
    fetchAllPages(`https://api.github.com/users/${username}/following`)
  ]);

  return { 
    followers: followers.map(f => f.login),
    following: following.map(f => f.login)
  };
}

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    console.log(`Starting to fetch data for username: ${username}`);
    const { followers, following } = await fetchFollowersAndFollowing(username);
    console.log(`Fetched ${followers.length} followers and ${following.length} following for ${username}`);

    const readmes = {
      followers: {},
      following: {}
    };

    console.log('Fetching READMEs for followers...');
    for (const follower of followers) {
      readmes.followers[follower] = await fetchProfileReadme(follower);
    }

    console.log('Fetching READMEs for following...');
    for (const followedUser of following) {
      readmes.following[followedUser] = await fetchProfileReadme(followedUser);
    }

    console.log('Finished fetching all READMEs');
    res.status(200).json(readmes);
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    res.status(500).json({ error: 'Error fetching GitHub data', details: error.message });
  }
}