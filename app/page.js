  "use client"
import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
import UserFollowList from "@/components/ui/userFollowList";
import { LanguageDistribution } from "@/components/ui/userLanguageDistribution";
  import UserProfile from "@/components/ui/userProfile";
  import UserReadme from "@/components/ui/userReadme";
  import { useEffect, useState } from "react";

  export default function Home() {

    const [inputName, setInputName] = useState('')
    // const [userName, setUserName] = useState('')
    const [activeData, setActiveData] = useState(null)

    const handleInputNameChange = (event) => {
      setInputName(event.target.value)
    }



    // useEffect(()=>{
    //   console.log("userName: ", userName)
    // },[userName])

    // const handleKeyDown = (event) => {
    //   if(event.key === "Enter"){
    //     event.preventDefault();
    //     setUserName(inputName)
    //   }
    // }

    return (
      <div className="flex flex-col w-[100vw] py-20 justify-center items-center gap-8">
          <div className="text-3xl font-semibold text-neutral-500">Enter your github username</div>
          <Input className="border-neutral-200 w-[300px] text-neutral-400 text-xl text-center  focus-visible:ring-[0.3px]" type="text" value={inputName} onChange={handleInputNameChange} />
          <div className="flex gap-3">
            <Button variant={
              activeData=="profile"? "default" : "outline"} 
              className={`${activeData=="profile"?"text-neutral-50":"text-neutral-500"}`} 
              onClick={()=>setActiveData("profile")}>
                Profile
            </Button>
            <Button variant={
              activeData=="follow list"? "default" : "outline"} 
              className={`${activeData=="follow list"?"text-neutral-50":"text-neutral-500"}`} 
              onClick={()=>setActiveData("follow list")}>
                Follow List
            </Button>
            <Button variant={
              activeData=="language distribution"? "default" : "outline"} 
              className={`${activeData=="language distribution"?"text-neutral-50":"text-neutral-500"}`} 
              onClick={()=>setActiveData("language distribution")}>
                Language Distribution
            </Button>
            <Button variant={
              activeData=="readme file"? "default" : "outline"} 
              className={`${activeData=="readme file"?"text-neutral-50":"text-neutral-500"}`} 
              onClick={()=>setActiveData("readme file")}>
                Readme File
            </Button>
          </div>

          {!activeData && <div></div>}

          {activeData=="profile" && <UserProfile username={inputName} /> }
          {activeData=="follow list" && <UserFollowList username={inputName} /> }
          {activeData=="language distribution" &&  <LanguageDistribution username={inputName} /> }
          {activeData=="readme file" &&  <UserReadme username={inputName} /> }
      </div>
    );
  } 
  