// pages/api/compatibility-report.js
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    const { username } = req.query;
  
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
  
    try {
      // Fetch the user's followers and following data, including their profile READMEs
      const [userRes, followersRes, followingRes] = await Promise.all([
        fetch(`/api/user-follow-list?username=${username}`),
        fetch(`/api/user-readme?username=${username}`),
      ]);
  
      const userData = await userRes.json();
      const profileReadme = await followersRes.json();
  
      // Analyze the compatibility between the user and their followers/following using OpenAI
      const compatibilityReport = await analyzeCompatibility(
        userData.user,
        userData.followers,
        userData.following,
        profileReadme
      );
  
      // Generate the JSON file with the compatibility report
      res.status(200).json(compatibilityReport);
    } catch (error) {
      console.error('Error generating compatibility report:', error);
      res.status(500).json({ error: 'Error generating compatibility report' });
    }
  }

async function analyzeCompatibility(user, followers, following, profileReadmes) {
  // Use OpenAI's language models to analyze the content of the profile READMEs
  // and determine the unique skills and differences between the users

  const prompt = `
    Analyze the compatibility between the following users based on their profile README content:
    
    User: ${user.name || user.login} (@${user.login})
    Profile: ${user.bio || 'No bio available'}
    
    Followers:
    ${followers.map(f => `- ${f.login}: ${profileReadmes[f.login] || 'No profile README available'}`).join('\n')}
    
    Following:
    ${following.map(f => `- ${f.login}: ${profileReadmes[f.login] || 'No profile README available'}`).join('\n')}
    
    Provide a compatibility score (0-100) and describe the unique skills and differences between the user and their most compatible follower/following.
  `;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 1024,
    n: 1,
    stop: null,
    temperature: 0.7,
  });

  return {
    user: user,
    followers: followers,
    following: following,
    compatibilityReport: response.data.choices[0].text.trim(),
  };
}