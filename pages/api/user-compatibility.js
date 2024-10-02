import { Octokit } from "@octokit/rest";
import { Configuration, OpenAIApi } from "openai";

const octokit = new Octokit({ auth: process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN });
const openai = new OpenAIApi(new Configuration({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY }));

async function fetchUserDetails(username) {
  try {
    const [user, repos] = await Promise.all([
      octokit.users.getByUsername({ username }),
      octokit.repos.listForUser({ username, per_page: 100, sort: 'pushed' })
    ]);

    const languages = repos.data.reduce((acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});

    let readme = '';
    try {
      const readmeRepo = repos.data.find(repo => repo.name === username);
      if (readmeRepo) {
        const readmeContent = await octokit.repos.getReadme({
          owner: username,
          repo: readmeRepo.name
        });
        readme = Buffer.from(readmeContent.data.content, 'base64').toString('utf-8');
      }
    } catch (error) {
      console.warn(`Error fetching README for ${username}:`, error);
    }

    return {
      login: user.data.login,
      avatar_url: user.data.avatar_url,
      bio: user.data.bio,
      languages: Object.entries(languages).sort((a, b) => b[1] - a[1]).slice(0, 5),
      readme
    };
  } catch (error) {
    if (error.status === 404) {
      throw new Error(`User ${username} not found on GitHub`);
    }
    console.error(`Error fetching details for ${username}:`, error);
    throw error;
  }
}

async function analyzeCompatibility(user1, user2) {
  const prompt = `
    Analyze the compatibility between these two GitHub users:

    User 1: ${JSON.stringify(user1, null, 2)}
    User 2: ${JSON.stringify(user2, null, 2)}
    
    User 1 README:
    ${user1.readme}
    
    User 2 README:
    ${user2.readme}

    Provide:
    1. A compatibility percentage (0-100)
    2. A brief explanation of their compatibility
    3. A list of shared skills or interests
    4. Potential project ideas they could work on together (Example: Clone of discord, socket based chat application)

    Respond ONLY with a JSON object:
    {
      "compatibilityPercentage": 85,
      "explanation": "reason for compatibility",
      "sharedSkills": ["skill1", "skill2", ...],
      "projectIdeas": ["idea1", "idea2", ...]
    }
  `;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that analyzes GitHub user data and responds only in JSON format." },
        { role: "user", content: prompt }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return JSON.parse(response.data.choices[0].message.content.trim());
  } catch (error) {
    console.error("Error in OpenAI analysis:", error);
    throw new Error("Failed to analyze compatibility");
  }
}

export default async function handler(req, res) {
  const { user1, user2 } = req.query;

  if (!user1 || !user2) {
    return res.status(400).json({ error: 'Both usernames are required' });
  }

  try {
    const [userData1, userData2] = await Promise.all([
      fetchUserDetails(user1),
      fetchUserDetails(user2)  
    ]);

    const compatibilityAnalysis = await analyzeCompatibility(userData1, userData2);

    res.status(200).json({
      user1: userData1,
      user2: userData2,
      compatibility: compatibilityAnalysis
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(404).json({ 
      error: error.message
    });
  }
}