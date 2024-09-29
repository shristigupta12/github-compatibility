"use client"
import { useEffect, useState } from "react";
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

export default function UserReadme({username}) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = async (username) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/user-readme?username=${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
      fetchUserData(username);
    }, [username])

  return (
    <div className="flex flex-col  justify-start items-center gap-5">
      
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {userData && (
        <div className="mt-8 w-full max-w-2xl">
          <div className="flex items-center mb-6">
            {/* <Image src={userData.user.avatar_url} alt={userData.user.login} width={100} height={100} className="rounded-full mr-4" /> */}
            <div>
              <h2 className="text-2xl font-bold">{userData.user.name || userData.user.login}</h2>
              <p className="text-gray-600">@{userData.user.login}</p>
            </div>
          </div>
          
          {userData.profileReadme && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Profile README</h3>
              <div className="bg-neutral-50 p-4 rounded-md">
                <ReactMarkdown>{userData.profileReadme}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}