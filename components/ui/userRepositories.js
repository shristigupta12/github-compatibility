import React from 'react';
import { useGitHub } from 'use-github-react/dist/use-github';

const UserRepositories = ({ username }) => {
  const { getRepositories } = useGitHub({ username, personalAccessToken: process.env.GITHUB_ACCESS_TOKEN});
  const repositories = getRepositories().all();

  return (
    <ul>
      {repositories.map((repo) => (
        <li key={repo.id}>
          <a href={repo.html_url}>{repo.name}</a>
          {repo.language && <span> - {repo.language}</span>}
        </li>
      ))}
    </ul>
  );
};

export default UserRepositories;