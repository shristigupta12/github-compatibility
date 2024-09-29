// import React, { useState, useEffect } from 'react';
// import { Card, CardHeader, CardContent, CardDescription } from '@/components/ui/card';
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
// import { Skeleton } from '@/components/ui/skeleton';
// import { Progress } from '@/components/ui/progress';

// const ChatGPTAnalysisDisplay = ({ username }) => {
//   const [data, setData] = useState({ user: null, followers: [], analysis: null });
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);
//       setProgress(0);
//       setData({ user: null, followers: [], analysis: null });

//       try {
//         const response = await fetch(`/api/user-follow-list?username=${username}`);
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }

//         const reader = response.body.getReader();
//         const decoder = new TextDecoder();

//         while (true) {
//           const { done, value } = await reader.read();
          
//           if (done) break;
          
//           const chunk = decoder.decode(value);
//           const lines = chunk.split('\n');

//           for (const line of lines) {
//             if (line.trim() === '') continue;

//             try {
//               const parsedData = JSON.parse(line);
//               setData(prevData => ({ ...prevData, ...parsedData }));
//               if (parsedData.progress) {
//                 setProgress(parsedData.progress);
//               }
//             } catch (e) {
//               console.error('Error parsing JSON:', e);
//             }
//           }
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (username) {
//       fetchData();
//     }
//   }, [username]);

//   if (isLoading || progress < 100) {
//     return <LoadingSkeleton progress={progress} />;
//   }

//   if (error) {
//     return <div className="text-center text-red-500">Error: {error}</div>;
//   }

//   if (!data.user || !data.analysis) {
//     return <div className="text-center">No data available</div>;
//   }

//   const { user, analysis } = data;

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <Card className="mb-6">
//         <CardHeader>
//           <div className="flex items-center space-x-4">
//             <Avatar>
//               <AvatarImage src={user.avatar_url} alt={user.login} />
//               <AvatarFallback>{user.login[0].toUpperCase()}</AvatarFallback>
//             </Avatar>
//             <div>
//               <h2 className="text-2xl font-bold">{user.login}</h2>
//               <CardDescription>{user.bio}</CardDescription>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <h3 className="font-semibold mb-2">Top Languages:</h3>
//           <div className="flex flex-wrap gap-2">
//             {user.languages.map(([lang, count], index) => (
//               <Badge key={index} variant="secondary">
//                 {lang}: {count}
//               </Badge>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <h2 className="text-2xl font-bold">Best Collaboration Match</h2>
//         </CardHeader>
//         <CardContent>
//           <h3 className="text-xl font-semibold mb-2">{analysis.bestMatch}</h3>
//           <p className="mb-4">{analysis.explanation}</p>
          
//           <h4 className="font-semibold mb-2">Shared Skills:</h4>
//           <div className="flex flex-wrap gap-2 mb-4">
//             {analysis.sharedSkills.map((skill, index) => (
//               <Badge key={index}>{skill}</Badge>
//             ))}
//           </div>
          
//           <h4 className="font-semibold mb-2">Project Ideas:</h4>
//           <ul className="list-disc list-inside">
//             {analysis.projectIdeas.map((idea, index) => (
//               <li key={index}>{idea}</li>
//             ))}
//           </ul>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// const LoadingSkeleton = ({ progress }) => (
//   <div className="p-4 max-w-3xl mx-auto">
//     <Card className="mb-6">
//       <CardHeader>
//         <div className="flex items-center space-x-4">
//           <Skeleton className="h-12 w-12 rounded-full" />
//           <div>
//             <Skeleton className="h-6 w-40" />
//             <Skeleton className="h-4 w-60 mt-2" />
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <Skeleton className="h-4 w-32 mb-2" />
//         <div className="flex flex-wrap gap-2">
//           {[1, 2, 3].map((i) => (
//             <Skeleton key={i} className="h-6 w-20" />
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//     <Card>
//       <CardHeader>
//         <Skeleton className="h-8 w-64" />
//         <Skeleton className="h-4 w-40 mt-2" />
//       </CardHeader>
//       <CardContent>
//         <Skeleton className="h-6 w-40 mb-2" />
//         <Skeleton className="h-20 w-full mb-4" />
//         <Skeleton className="h-4 w-32 mb-2" />
//         <div className="flex flex-wrap gap-2 mb-4">
//           {[1, 2, 3].map((i) => (
//             <Skeleton key={i} className="h-6 w-20" />
//           ))}
//         </div>
//         <Skeleton className="h-4 w-32 mb-2" />
//         <Skeleton className="h-4 w-full" />
//         <Skeleton className="h-4 w-full mt-1" />
//         <Skeleton className="h-4 w-3/4 mt-1" />
//       </CardContent>
//     </Card>
//     <div className="mt-4">
//       <Progress value={progress} className="w-full" />
//       <p className="text-center mt-2">Analyzing followers: {progress.toFixed(0)}% complete</p>
//     </div>
//   </div>
// );

// export default ChatGPTAnalysisDisplay;



