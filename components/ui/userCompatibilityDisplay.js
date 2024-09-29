import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import UserReadme from '@/components/ui/userReadme';
import { cn } from '@/lib/utils';

const UserCompatibilityDisplay = ({ user1, user2 }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/user-compatibility?user1=${user1}&user2=${user2}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user1 && user2) {
      fetchData();
    }
  }, [user1, user2]);

  const SemiCircularPercentage = ({ percentage, className }) => {
    const radius = 80;
    const strokeWidth = 12;
    const normalizedRadius = radius - strokeWidth / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Color gradient based on percentage
    const getColor = (percent) => {
      const hue = (percent * 120) / 100; // 0 is red, 120 is green
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
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
    return <div className="text-center text-red-500">Error: {error}</div>;
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
            <h2 className="md:text-2xl text-xl font-semibold">User Details</h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-8">
              <UserCard user={userData1} />
              <UserCard user={userData2} />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 col-span-full pb-7">
          <CardHeader >
            <h3 className="md:text-2xl text-xl font-semibold">Compatibility Score</h3>
          </CardHeader>
          <CardContent className="flex md:flex-row flex-col items-center">
            <SemiCircularPercentage percentage={compatibility.compatibilityPercentage} className="w-full" />
            <p className=" w-full text-justify md:text-lg max-md:mt-10">{compatibility.explanation}</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h3 className="md:text-2xl text-xl font-semibold">Shared Skills</h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 justify-center">
              {compatibility.sharedSkills.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 ">
          <CardHeader>
            <h3 className="md:text-2xl text-xl font-semibold">Project Ideas</h3>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside md:text-lg text-justify">
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

const UserCard = ({ user }) => {
  const [showReadme, setShowReadme] = useState(false);

  return (
    <div className="text-center w-full  ">
      <Avatar className="md:w-32 md:h-32 w-20 h-20 mx-auto mb-2">
        <AvatarImage src={user.avatar_url} alt={user.login} />
        <AvatarFallback>{user.login[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <h3 className="font-semibold md:text-xl text-lg">{user.login}</h3>
      <p className="md:text-lg">{user.bio}</p>
      <div className="mt-2">
        {user.languages.map(([lang, count], index) => (
          <Badge key={index} variant="secondary" className="m-1 text-base">
            {lang}: {count}
          </Badge>
        ))}
      </div>
      <Button onClick={() => setShowReadme(!showReadme)} size="sm" className="mt-4 text-sm">
        {showReadme ? "Hide" : "Show"} {user.login}'s README
      </Button>
      {showReadme && (
        <Card className="mt-4">
          <CardHeader>
            <h3 className="text-xl font-semibold">{user.login}'s README</h3>
          </CardHeader>
          <CardContent>
            <UserReadme username={user.login} />
          </CardContent>
        </Card>
      )}
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
