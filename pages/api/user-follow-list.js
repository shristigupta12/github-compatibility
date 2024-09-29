// import { Octokit } from "@octokit/rest";
// import { Configuration, OpenAIApi } from "openai";

// const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
// const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

// const MAX_FOLLOWERS = 100; // Limit the number of followers to process
// const RETRY_DELAY = 1000; // 1 second delay between retries

// async function fetchWithRetry(apiCall, maxRetries = 3) {
//   for (let i = 0; i < maxRetries; i++) {
//     try {
//       return await apiCall();
//     } catch (error) {
//       if (i === maxRetries - 1) throw error;
//       await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
//     }
//   }
// }

// async function fetchUserDetails(username) {
//   try {
//     const [user, repos] = await Promise.all([
//       fetchWithRetry(() => octokit.users.getByUsername({ username })),
//       fetchWithRetry(() => octokit.repos.listForUser({ username, per_page: 100, sort: 'pushed' }))
//     ]);

//     const languages = repos.data.reduce((acc, repo) => {
//       if (repo.language) {
//         acc[repo.language] = (acc[repo.language] || 0) + 1;
//       }
//       return acc;
//     }, {});

//     return {
//       login: user.data.login,
//       avatar_url: user.data.avatar_url,
//       bio: user.data.bio,
//       languages: Object.entries(languages).sort((a, b) => b[1] - a[1]).slice(0, 5)
//     };
//   } catch (error) {
//     console.error(`Error fetching details for ${username}:`, error);
//     return { login: username, error: 'Failed to fetch details' };
//   }
// }

// async function fetchFollowersWithDetails(username) {
//   const followers = await fetchWithRetry(() => 
//     octokit.paginate(octokit.users.listFollowersForUser, {
//       username,
//       per_page: 100
//     })
//   );

//   const limitedFollowers = followers.slice(0, MAX_FOLLOWERS);
//   console.log(`Fetching details for ${limitedFollowers.length} followers`);

//   const detailedFollowers = await Promise.all(
//     limitedFollowers.map(follower => fetchUserDetails(follower.login))
//   );

//   return detailedFollowers;
// }

// async function analyzeWithOpenAI(userData, followers) {
//   const prompt = `
//     Analyze the following GitHub user and their followers to find the most suitable match for collaboration:

//     User: ${JSON.stringify(userData, null, 2)}

//     Followers: ${JSON.stringify(followers, null, 2)}

//     Provide:
//     1. The username of the most suitable follower for collaboration
//     2. A brief explanation in a fun way of why they are the best match along with roasting both of the users
//     3. A list of shared skills or interests
//     4. Potential project ideas they could work on together

//     Respond ONLY with a JSON object:
//     {
//       "bestMatch": "username",
//       "explanation": "reason for the match",
//       "sharedSkills": ["skill1", "skill2", ...],
//       "projectIdeas": ["idea1", "idea2", ...]
//     }
//   `;

//   try {
//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: "You are a helpful assistant that analyzes GitHub user data and responds only in JSON format." },
//         { role: "user", content: prompt }
//       ],
//       max_tokens: 500,
//       temperature: 0.7,
//     });

//     return JSON.parse(response.data.choices[0].message.content.trim());
//   } catch (error) {
//     console.error("Error in OpenAI analysis:", error);
//     throw error;
//   }
// }

// export default async function handler(req, res) {
//   const { username } = req.query;

//   if (!username) {
//     return res.status(400).json({ error: 'Username is required' });
//   }

//   res.writeHead(200, {
//     'Content-Type': 'application/json',
//     'Transfer-Encoding': 'chunked',
//   });

//   try {
//     const userData = await fetchUserDetails(username);
//     res.write(JSON.stringify({ user: userData, progress: 10 }) + '\n');

//     const followers = await fetchFollowersWithDetails(username);
//     res.write(JSON.stringify({ followers: followers, progress: 80 }) + '\n');

//     const analysis = await analyzeWithOpenAI(userData, followers);
//     res.write(JSON.stringify({ analysis: analysis, progress: 100 }) + '\n');
//     res.end();
//   } catch (error) {
//     console.error('Error:', error);
//     res.write(JSON.stringify({ 
//       error: 'Error processing data', 
//       details: error.message
//     }));
//     res.end();
//   }
// }




