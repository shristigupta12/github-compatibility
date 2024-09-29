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
  
  // const [activeButton, setActiveButton] = useState('')

  const [activeData, setActiveData] = useState(null)

  const handleInputNameChange1 = (event) => {
    setInputName1(event.target.value)
  }
  const handleInputNameChange2 = (event) => {
    setInputName2(event.target.value)
  }

  const handleGetReport = () => {
    setActiveData("userCompatibility");
    setUserName1(inputName1);
    setUserName2(inputName2)
  }

  return (
    <div className="flex w-[100vw] py-20 justify-center gap-10 px-8 bg-neutral-50 min-h-screen overflow-x-hidden">
      <div className="flex flex-col gap-16">

          {/* <div className="text-4xl font-semibold  w-full text-neutral-800 italic">Find Compatibility between two users</div> */}
          
          
          <div className="flex gap-3 text-lg font-extrabold text-neutral-500 items-center">

            {/* <button className={`${activeButton=="follower-collaborator"?"underline underline-offset-4 text-neutral-800":"text-neutral-500"} hover:underline hover:underline-offset-4 hover:text-neutral-800  text-lg italic font-medium`} 
              onClick={()=>setActiveButton("follower-collaborator")}>
                Know the potential collaborator from your followers
            </button> */}
            
            <div className={`flex items-center justify-center gap-5 text-neutral-800 md:text-6xl text-2xl w-full text-center font-medium`}  >
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
            
              <div className="flex flex-col gap-12 justify-center items-center w-full">
                <div className="flex justify-center md:gap-12 gap-2 w-full">
                  <div className="flex flex-col items-center gap-5">
                    <div className=" text-neutral-800 md:text-3xl text-lg font-semibold ">Your username</div>
                    <Input className="bg-white font-semibold py-5 border-neutral-400  md:text-xl text-center" type="text" value={inputName1} onChange={handleInputNameChange1} />
                  </div>
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="50"  height="50"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-brand-github hidden md:block"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" /></svg>
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="30"  height="30"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-brand-github md:hidden"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z" /></svg>
                  <div className="flex flex-col items-center gap-5">
                    <div className=" text-neutral-800 md:text-3xl text-lg font-semibold ">Their username</div>
                    <Input className="bg-white font-semibold py-5 border-neutral-400 md:text-xl text-center" type="text" value={inputName2} onChange={handleInputNameChange2}/>
                  </div>
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







