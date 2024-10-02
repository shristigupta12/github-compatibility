"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserCompatibilityDisplay from "@/components/ui/userCompatibilityDisplay";

export default function Home() {
  const [inputName1, setInputName1] = useState('');
  const [inputName2, setInputName2] = useState('');
  const [username1, setUserName1] = useState('');
  const [username2, setUserName2] = useState('');
  const [activeData, setActiveData] = useState(null);
  const [errors, setErrors] = useState({ username1: '', username2: '', sameUsername: '' });
  const [apiError, setApiError] = useState(null);

  const handleInputNameChange1 = (event) => {
    setInputName1(event.target.value);
    setErrors(prev => ({ ...prev, username1: '', sameUsername: '' }));
    setApiError(null);
  }

  const handleInputNameChange2 = (event) => {
    setInputName2(event.target.value);
    setErrors(prev => ({ ...prev, username2: '', sameUsername: '' }));
    setApiError(null);
  }

  const handleGetReport = () => {
    let newErrors = { username1: '', username2: '', sameUsername: '' };
    let isValid = true;

    if (!inputName1.trim()) {
      newErrors.username1 = 'Your username is required';
      isValid = false;
    }
    if (!inputName2.trim()) {
      newErrors.username2 = 'Their username is required';
      isValid = false;
    }

    if (inputName1.trim().toLowerCase() === inputName2.trim().toLowerCase()) {
      const funnyMessages = [
        "Oops! It looks like you're trying to compare yourself with... yourself? That's some next-level introspection!",
        "Whoa there! We appreciate self-love, but let's find you a coding buddy who isn't your mirror image.",
        "Error 418: I'm a teapot, and even I know you can't be your own GitHub soulmate!",
        "Breaking news: Local developer discovers cloning technology! ...Oh wait, you just entered the same username twice."
      ];
      newErrors.sameUsername = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setActiveData("userCompatibility");
      setUserName1(inputName1);
      setUserName2(inputName2);
      setApiError(null);
    }
  }

  const handleApiError = (error) => {
    setApiError(error);
    setActiveData(null);
  }

  return (
    <div className="flex w-[100vw] py-20 justify-center gap-10 px-8 bg-neutral-50 min-h-screen overflow-x-hidden">
      <div className="flex flex-col md:gap-16 gap-8 w-full max-w-3xl">
        <div className="flex flex-col items-center justify-center gap-5 text-neutral-800 md:text-5xl text-2xl w-full text-center font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github hidden md:block">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github md:hidden">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
          </svg>
          Github Compatibility
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center md:gap-12 gap-5 w-full">
          <div className="flex flex-col items-center md:gap-5 gap-3 w-full md:w-auto">
            <div className="text-neutral-800 md:text-2xl text-lg font-semibold">Your username</div>
            <Input 
              className="bg-white font-semibold md:py-3 border-neutral-400 md:text-lg text-center w-full md:w-64" 
              type="text" 
              value={inputName1} 
              onChange={handleInputNameChange1} 
            />
            {errors.username1 && <div className="text-red-500 text-sm">{errors.username1}</div>}
          </div>
          
          <div className="flex flex-col items-center md:gap-5 gap-3 w-full md:w-auto">
            <div className="text-neutral-800 md:text-2xl text-lg font-semibold">Their username</div>
            <Input 
              className="bg-white font-semibold py-3 border-neutral-400 md:text-lg text-center w-full md:w-64" 
              type="text" 
              value={inputName2} 
              onChange={handleInputNameChange2}
            />
            {errors.username2 && <div className="text-red-500 text-sm">{errors.username2}</div>}
          </div>
        </div>

        {errors.sameUsername && (
          <div className="text-yellow-600 text-center text-lg font-medium bg-yellow-100 p-4 rounded-md">
            {errors.sameUsername}
          </div>
        )}

        <div className="flex justify-center w-full">
          <Button size="lg" onClick={handleGetReport} className="px-8 py-3 text-lg">
            Get Compatibility Report
          </Button>
        </div>

        {apiError && (
          <div className="text-red-500 text-center mt-4">
            {apiError}
          </div>
        )}

        {activeData === "userCompatibility" && (
          <UserCompatibilityDisplay 
            user1={username1} 
            user2={username2} 
            onError={handleApiError}
          />
        )}
      </div>
    </div>
  );
}