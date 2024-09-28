"use client"
import React, { useEffect, useState } from "react"
import UserReadme from "./userReadme"

export default function UserFollowList({username}){
    const [loading, setLoading] = useState(false)
    const [followData, setFollowData] = useState(null)
    const [error, setError] = useState(null)

    const fetchFollowList = async() => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/user-follow-list?username=${username}`);
            
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || errorData.details || 'Failed to fetch user data');
            }
            
            const data = await response.json();
            setFollowData(data);
          } catch (err) {
            setError(err.message);
            console.error('Detailed error:', err);
          } finally {
            setLoading(false);
          }
    }

    useEffect(() => {
        fetchFollowList(username)
    }, [username])
    
    return(
        <div>
            {loading && <div>Loading...</div>}
            {error && <p className="text-red-500">{error}</p>}

            {followData && (
                <div className="mt-8 w-full max-w-4xl">
                    <div className="flex items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold">{followData.user.name || followData.user.login}</h2>
                            <p className="text-gray-600">@{followData.user.login}</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Followers ({followData.followers.length})</h3>
                            <ul className="space-y-4">
                                {followData.followers.map(follower => (
                                    <li key={follower.login} className="border p-4 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <span className="font-semibold">{follower.login}</span>
                                        </div>
                                    <UserReadme username={follower.login} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Following ({followData.following.length})</h3>
                            <ul className="space-y-4">
                                {followData.following.map(following => (
                                    <li key={following.login} className="border p-4 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <span className="font-semibold">{following.login}</span>
                                        </div>
                                    <UserReadme username={following.login} />  
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}