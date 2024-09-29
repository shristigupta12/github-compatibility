// import React, { useState, useEffect } from 'react';

// const UserBio = ({ username }) => {
//     const [bio, setBio] = useState("");
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         async function fetchUserBio() {
//             try {
//                 const response = await fetch(`/api/user-bio?username=${username}`);
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch data");
//                 }
//                 const data = await response.json();
//                 setBio(data.bio);
//             } catch (err) {
//                 setError(err.message);
//             }
//         }

//         if (username) {
//             fetchUserBio();
//         }
//     }, [username]);

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div>{bio || "No bio available"}</div>
//     );
// };

// export default UserBio;