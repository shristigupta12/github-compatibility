"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserCompatibilityDisplay from "@/components/ui/userCompatibilityDisplay";
// import ChatGPTAnalysisDisplay from "@/components/ui/userFollowList";
// import LanguageDistribution from "@/components/ui/userLanguageDistribution";
// import UserProfile from "@/components/ui/userProfile";
// import UserReadme from "@/components/ui/userReadme";
// import UserRepositories from "@/components/ui/userRepositories";
import { useEffect, useState } from "react";
// import UserBio from "@/components/ui/userBio";

export default function Home() {

  const [inputName1, setInputName1] = useState('')
  const [inputName2, setInputName2] = useState('')
  const [username1, setUserName1] = useState('')
  const [username2, setUserName2] = useState('')
  const [activeData, setActiveData] = useState(null)
  const [errors, setErrors] = useState({ username1: '', username2: '' });

  const handleInputNameChange1 = (event) => {
    setInputName1(event.target.value);
    setErrors(prev => ({ ...prev, username1: '' }));
  }

  const handleInputNameChange2 = (event) => {
    setInputName2(event.target.value);
    setErrors(prev => ({ ...prev, username2: '' }));
  }

  const handleGetReport = () => {
    let newErrors = { username1: '', username2: '' };
    let isValid = true;

    if (!inputName1.trim()) {
      newErrors.username1 = 'Your username is required';
      isValid = false;
    }
    if (!inputName2.trim()) {
      newErrors.username2 = 'Their username is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      setActiveData("userCompatibility");
      setUserName1(inputName1);
      setUserName2(inputName2);
    }
  }
  return (
    <div className="flex w-[100vw] py-20 justify-center gap-10 px-8 bg-neutral-50 min-h-screen overflow-x-hidden">
      <div className="flex flex-col md:gap-16 gap-8">

          {/* <div className="text-4xl font-semibold  w-full text-neutral-800 italic">Find Compatibility between two users</div> */}
          
          
          <div className="flex gap-3 text-lg font-extrabold text-neutral-500 items-center">

            {/* <button className={`${activeButton=="follower-collaborator"?"underline underline-offset-4 text-neutral-800":"text-neutral-500"} hover:underline hover:underline-offset-4 hover:text-neutral-800  text-lg italic font-medium`} 
              onClick={()=>setActiveButton("follower-collaborator")}>
                Know the potential collaborator from your followers
            </button> */}
            
            <div className={`flex flex-col items-center justify-center gap-5 text-neutral-800 md:text-5xl text-2xl w-full text-center font-medium`}  >
               <svg  xmlns="http://www.w3.org/2000/svg"  width="50"  height="50"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-github hidden md:block"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
              <svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-github md:hidden"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
              Github Compatability
            </div>
            
            {/* <button className={`${activeButton=="user-readme"?"underline underline-offset-4 text-neutral-800":"text-neutral-500"} hover:text-neutral-800 hover:underline hover:underline-offset-4 text-neutral-500 text-lg italic font-medium`} 
              onClick={()=>setActiveButton("user-readme")}> 
                Fetch Readme file by username
            </button> */}

             {/* <Button variant={
              activeData=="language distribution"? "default" : "outline"} 
              className={`${activeData=="language distribution"?"text-neutral-50":"text-neutral-500"}`} 
              onClick={()=>setActiveData("language distribution")}>
                Language Distribution
                </Button> */}
            {/* <Button variant={
              activeData=="profile"? "default" : "outline"} 
              className={`${activeData=="profile"?"text-neutral-50":"text-neutral-500"}`} 
              onClick={()=>setActiveData("profile")}>
                Profile
            </Button> */}
            {/* <Button variant={
              activeData=="repositories"? "default" : "outline"} 
              className={`${activeData=="repositories"?"text-neutral-50":"text-neutral-500"}`} 
              onClick={()=>setActiveData("repositories")}>
                Repositories
            </Button> */}
          </div>

          <div className=" justify-center flex flex-col items-center">
            {/* {!activeData && <div></div>}
            {activeButton=="follower-collaborator" &&
              <div className="flex flex-col gap-5 justify-center items-center">
                <div className="flex gap-5">
                  <div className="italic text-neutral-800 text-2xl font-semibold">Enter a github username</div>
                  <Input className="border-neutral-200 w-[300px] bg-white italic text-neutral-600 text-xl text-center font-semibold focus-visible:ring-[0.3px]" type="text" value={inputName} onChange={handleInputNameChange} />
                </div>
                <Button className="italic text-lg w-fit" onClick={()=>setActiveData("follow list")}>Get Collaborator</Button>
                {activeData=="follow list" && <ChatGPTAnalysisDisplay username={inputName} /> }
              </div>
            } */}
            
              <div className="flex flex-col md:gap-12 gap-8 justify-center items-center w-full">
                <div className="flex md:flex-row flex-col justify-center items-center md:gap-12 gap-5 w-full">
                  <div className="flex flex-col items-center md:gap-5 gap-3">
                    <div className=" text-neutral-800 md:text-2xl text-lg font-semibold ">Your username</div>
                    <Input className="bg-white font-semibold md:py-3 border-neutral-400 md:text-lg text-center" type="text" value={inputName1} onChange={handleInputNameChange1} />
                  </div>
                               {errors.username1 && <div className="text-red-500 md:hidden text-sm">{errors.username1}</div>}

                  
                  <div className="flex flex-col items-center md:gap-5 gap-3">
                    <div className=" text-neutral-800 md:text-2xl text-lg font-semibold ">Their username</div>
                    <Input className="bg-white font-semibold py-3 border-neutral-400 md:text-lg text-center" type="text" value={inputName2} onChange={handleInputNameChange2}/>
                  </div>
                               {errors.username2 && <div className="text-red-500 md:hidden text-sm">{errors.username2}</div>}

                </div>
                <Button size="lg" onClick={handleGetReport} className="hidden md:block">Get Compatibility Report</Button>
                <Button size="sm" onClick={handleGetReport} className=" md:hidden">Get Compatibility Report</Button>
                {activeData=="userCompatibility" &&  <UserCompatibilityDisplay user1={username1} user2={username2} />}
              </div>
       
            {/* {activeButton=="user-readme" &&
              <div className="flex flex-col gap-5 justify-center items-center">
                <div className="flex gap-5">
                  <div className="italic text-neutral-800 text-2xl font-semibold">Enter a github username 1</div>
                  <Input className="border-neutral-200 w-[300px] bg-white italic text-neutral-600 text-xl text-center font-semibold focus-visible:ring-[0.3px]" type="text" value={inputName} onChange={handleInputNameChange} />
                </div>
                <Button className="italic text-lg w-fit" onClick={()=>setActiveData("readme file")}>Get Readme</Button>
                {activeData=="readme file" &&  <UserReadme username={inputName} /> }
              </div>
            } */}

             {/*<Input className="border-neutral-200 w-[300px] text-neutral-400 text-xl text-center  focus-visible:ring-[0.3px]" type="text" value={inputName2} onChange={handleInputNameChange2} /> */}
            
            {/* {activeData=="profile" && <UserBio username={inputName} /> } */}
            {/* {activeData=="language distribution" &&  <LanguageDistribution username={inputName} /> } */}
            {/* {activeData=="repositories" &&  <UserRepositories username={inputName} /> } */}

        </div>
       
        </div>
    </div>
  );
} 




// "use client"
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import UserCompatibilityDisplay from "@/components/ui/userCompatibilityDisplay";
// import { useState } from "react";

// export default function Home() {
//   const [inputName1, setInputName1] = useState('');
//   const [inputName2, setInputName2] = useState('');
//   const [username1, setUserName1] = useState('');
//   const [username2, setUserName2] = useState('');
//   const [activeData, setActiveData] = useState(null);
//   const [errors, setErrors] = useState({ username1: '', username2: '' });

//   const handleInputNameChange1 = (event) => {
//     setInputName1(event.target.value);
//     setErrors(prev => ({ ...prev, username1: '' }));
//   }

//   const handleInputNameChange2 = (event) => {
//     setInputName2(event.target.value);
//     setErrors(prev => ({ ...prev, username2: '' }));
//   }

//   const handleGetReport = () => {
//     let newErrors = { username1: '', username2: '' };
//     let isValid = true;

//     if (!inputName1.trim()) {
//       newErrors.username1 = 'Your username is required';
//       isValid = false;
//     }
//     if (!inputName2.trim()) {
//       newErrors.username2 = 'Their username is required';
//       isValid = false;
//     }

//     setErrors(newErrors);

//     if (isValid) {
//       setActiveData("userCompatibility");
//       setUserName1(inputName1);
//       setUserName2(inputName2);
//     }
//   }

//   return (
//     <div className="flex w-[100vw] py-20 justify-center gap-10 px-8 bg-neutral-50 min-h-screen overflow-x-hidden">
//       <div className="flex flex-col md:gap-16 gap-8 w-full max-w-3xl">
//         <div className="flex flex-col items-center justify-center gap-5 text-neutral-800 md:text-5xl text-2xl w-full text-center font-medium">
//           <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github hidden md:block">
//             <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
//             <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
//           </svg>
//           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github md:hidden">
//             <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
//             <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
//           </svg>
//           Github Compatibility
//         </div>

//         <div className="flex flex-col md:flex-row justify-center items-center md:gap-12 gap-5 w-full">
//           <div className="flex flex-col items-center md:gap-5 gap-3 w-full md:w-auto">
//             <div className="text-neutral-800 md:text-2xl text-lg font-semibold">Your username</div>
//             <Input 
//               className="bg-white font-semibold md:py-3 border-neutral-400 md:text-lg text-center w-full md:w-64" 
//               type="text" 
//               value={inputName1} 
//               onChange={handleInputNameChange1} 
//             />
//             {errors.username1 && <div className="text-red-500 text-sm">{errors.username1}</div>}
//           </div>
          
//           <div className="flex flex-col items-center md:gap-5 gap-3 w-full md:w-auto">
//             <div className="text-neutral-800 md:text-2xl text-lg font-semibold">Their username</div>
//             <Input 
//               className="bg-white font-semibold py-3 border-neutral-400 md:text-lg text-center w-full md:w-64" 
//               type="text" 
//               value={inputName2} 
//               onChange={handleInputNameChange2}
//             />
//             {errors.username2 && <div className="text-red-500 text-sm">{errors.username2}</div>}
//           </div>
//         </div>

//         <div className="flex justify-center w-full">
//           <Button size="lg" onClick={handleGetReport} className="px-8 py-3 text-lg">
//             Get Compatibility Report
//           </Button>
//         </div>

//         {activeData === "userCompatibility" && (
//           <UserCompatibilityDisplay user1={username1} user2={username2} />
//         )}
//       </div>
//     </div>
//   );
// }