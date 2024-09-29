// import { Octokit } from "@octokit/rest";

// const octokit = new Octokit({auth: process.env.GITHUB_ACCESS_TOKEN});

// const RETRY_DELAY = 1000; // Define RETRY_DELAY constant

// async function fetchWithRetry(apiCall, maxRetries = 3) {
//     for (let i = 0; i < maxRetries; i++) {
//         try {
//             return await apiCall();
//         } catch (error) {
//             if (i === maxRetries - 1) throw error;
//             await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
//         }
//     }
// }

// async function fetchUserBio(username) {
//     try {
//         const user = await fetchWithRetry(() => octokit.users.getByUsername({username}));
//         return user.data.bio;
//     } catch (err) {
//         console.error("Error fetching user by username: ", err);
//         throw err; // Re-throw the error to be caught in the handler
//     }
// }

// export default async function handler(req, res) {
//     const { username } = req.query;

//     if (!username) {
//         return res.status(400).json({ error: 'Username is required' });
//     }

//     try {
//         const userBio = await fetchUserBio(username);
//         res.status(200).json({ bio: userBio });
//     } catch (err) {
//         console.error('Error: ', err);
//         res.status(500).json({ 
//             error: 'Error processing data', 
//             details: err.message
//         });
//     }
// }