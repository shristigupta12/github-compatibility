"use client"

import React from 'react';
import { useGitHub } from 'use-github-react/dist/use-github';

export default function LanguageDistribution ({ username })  {
  const { getRepositories } = useGitHub({ username });
  const languageDist = getRepositories().all.languageDistribution();

  return (
    <div>
      <h2>Language Distribution</h2>
      <ul>
        {languageDist.map((lang) => (
          <li key={lang.language}>
            {lang.language}: {(lang.percentage * 100).toFixed(2)}%
          </li>
        ))}
      </ul>
    </div>
  );
};

