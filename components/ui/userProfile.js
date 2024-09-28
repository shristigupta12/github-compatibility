"use client"
import React, { useEffect } from 'react';
import { useGitHub } from 'use-github-react/dist/use-github';

const UserProfile = ({ username }) => {
  useEffect(()=>{
    console.log("username: ", username);
  }, [])
  const { userInfo } = useGitHub({ username, personalAccessToken: process.env.GITHUB_ACCESS_TOKEN  });

  if (!userInfo) return <p>Loading...</p>;  


  return (
    <div>
      <h1>{userInfo.name}</h1>
      <p>{userInfo.bio}</p>
      <p>Public Repositories: {userInfo.public_repos}</p>
    </div>
  );
};

export default UserProfile;