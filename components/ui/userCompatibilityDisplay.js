import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import UserReadme from '@/components/ui/userReadme';

const UserCompatibilityDisplay = ({ user1, user2, onError }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReadme1, setShowReadme1] = useState(false);
  const [showReadme2, setShowReadme2] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/user-compatibility?user1=${user1}&user2=${user2}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch data');
        }

        if (result.error) {
          throw new Error(result.error);
        }

        setData(result);
      } catch (err) {
        setError(err.message);
        if (onError) onError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user1 && user2) {
      fetchData();
    }
  }, [user1, user2, onError]);

  const SemiCircularPercentage = ({ percentage, className }) => {
    const radius = 80;
    const strokeWidth = 12;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const getColor = (percent) => {
      const hue = (percent * 120) / 100;
      return `hsl(${hue}, 100%, 50%)`;
    };

    return (
      <div className='px-14'>
        <div className="relative w-[200px] h-[120px] mx-auto mb-4">
          <svg
            height={radius * 2}
            width={radius * 2}
            viewBox={`0 0 ${radius * 2} ${radius * 2}`}
            className="transform -rotate-90"
          >
            <circle
              stroke="#e6e6e6"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke={getColor(percentage)}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute mt-4 pr-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-4xl font-bold">{percentage}</span>
            <span className="text-xl">%</span>
            <div className="text-sm text-gray-500">Compatibility</div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Card className="mb-6 col-span-full">
        <CardHeader>
          <h2 className="md:text-xl text-lg font-semibold text-red-500">Error</h2>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
          <p>Please check the usernames and try again.</p>
        </CardContent>
      </Card>
    );
  }

  if (!data || !data.user1 || !data.user2 || !data.compatibility) {
    return <div className="text-center">No data available</div>;
  }

  const { user1: userData1, user2: userData2, compatibility } = data;

  return (
    <div className="md:p-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="mb-6 col-span-full">
          <CardHeader>
            <h2 className="md:text-xl text-lg font-semibold">User Details</h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-between items-center md:space-y-0 md:space-x-8">
              <div className='flex md:flex-row flex-col md:gap-4 gap-8 justify-between items-start w-full'>
                {[userData1, userData2].map((userData, index) => (
                  <div key={index} className='flex flex-col items-center w-full justify-center'>
                    <Avatar className="md:w-32 md:h-32 w-16 h-16 mb-2">
                      <AvatarImage src={userData.avatar_url} alt={userData.login} />
                      <AvatarFallback>{userData.login[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold md:text-xl w-full text-center text-lg">{userData.login}</h3>
                    <p className="md:text-lg text-sm w-full text-center">{userData.bio}</p>
                    <div className="mt-2 w-full justify-center flex-wrap items-center md:hidden flex">
                      {userData.languages.map(([lang, count], langIndex) => (
                        <Badge key={langIndex} variant="secondary" className="m-1 text-xs">
                          {lang}: {count}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      onClick={() => index === 0 ? setShowReadme1(!showReadme1) : setShowReadme2(!showReadme2)} 
                      size="sm" 
                      className="mt-4 text-xs md:hidden"
                    >
                      {(index === 0 ? showReadme1 : showReadme2) ? "Hide" : "Show"} {userData.login}&#39;s README
                    </Button>
                    {((index === 0 && showReadme1) || (index === 1 && showReadme2)) && (
                      <Card className="mt-4 md:hidden w-full">
                        <CardContent>
                          <UserReadme username={userData.login} />
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ))}
              </div>

              <div className='flex justify-between w-full'>
                {[userData1, userData2].map((userData, index) => (
                  <div key={index} className="mt-2 w-full md:flex justify-center flex-wrap items-center hidden">
                    {userData.languages.map(([lang, count], langIndex) => (
                      <Badge key={langIndex} variant="secondary" className="m-1 text-base">
                        {lang}: {count}
                      </Badge>
                    ))}
                  </div>
                ))}
              </div>
              <div className='md:flex justify-evenly w-full hidden'>
                {[userData1, userData2].map((userData, index) => (
                  <Button 
                    key={index}
                    onClick={() => index === 0 ? setShowReadme1(!showReadme1) : setShowReadme2(!showReadme2)} 
                    size="sm" 
                    className={`mt-4 text-sm ${index === 0 ? 'mr-52' : ''}`}
                  >
                    {(index === 0 ? showReadme1 : showReadme2) ? "Hide" : "Show"} {userData.login}&#39;s README
                  </Button>
                ))}
              </div>
              <div className='md:flex hidden justify-between w-full'>
                {showReadme1 && (
                  <Card className="mt-4 w-full">
                    <CardContent>
                      <UserReadme username={userData1.login} />
                    </CardContent>
                  </Card>
                )}
                {showReadme2 && (
                  <Card className="mt-4 w-full">
                    <CardContent>
                      <UserReadme username={userData2.login} />
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 col-span-full pb-7">
          <CardHeader>
            <h3 className="md:text-xl text-lg font-semibold">Compatibility Score</h3>
          </CardHeader>
          <CardContent className="flex md:flex-row flex-col items-center">
            <SemiCircularPercentage percentage={compatibility.compatibilityPercentage} className="w-full" />
            <p className="w-full text-justify md:text-lg max-md:mt-10">{compatibility.explanation}</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h3 className="md:text-xl text-lg font-semibold">Shared Skills</h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 md:justify-start justify-center items-center md:pt-4 max-md:pb-4">
              {compatibility.sharedSkills.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h3 className="md:text-xl text-lg font-semibold">Project Ideas</h3>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside md:text-lg text-justify max-md:pb-4">
              {compatibility.projectIdeas.map((idea, index) => (
                <li key={index}>{idea}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="p-4 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className={`mb-6 ${i === 1 ? 'col-span-full' : ''}`}>
          <CardHeader>
            <Skeleton className="h-8 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default UserCompatibilityDisplay;