import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import Ownerpage from "../components/Ownerpage";
import Userpage from "../components/Userpage";
import sideBG from "../assets/side-background.png";

function CreateProfile() {
  const [checkUser, setCheckUser] = useState<String>();

  return (
    <div className="flex">
      <div>
        <img className="h-screen" src={sideBG} alt="" />
      </div>
      <div className="flex flex-col mt-[-50px] absolute left-[700px] overflow-x-hidden h-screen justify-center">
        <div className="font-bold text-[#7A999C] font text-[32px] py-4  mb-[110px]">
          {checkUser == "Owner" && <h1>OWNER SIGNUP</h1>}
          {checkUser == "User" && <h1>USER SIGNUP</h1>}
          {checkUser == null && <h1>CREATE PROFILE</h1>}
        </div>
        {checkUser == undefined && (
          <div className="flex flex-col space-y-[53px] ml-[130px]">
            <Button
              className="font text-white text-[25px] w-[179px] font-semibold bg-[#4B687A] py-[11px] px-10 rounded-xl my-3"
              onPress={() => setCheckUser("Owner")}
            >
              Owner
            </Button>
            <Button
              className="font text-[25px] text-white w-[179px] font-semibold bg-[#4B687A] py-[11px] px-10 rounded-xl my-3"
              onPress={() => setCheckUser("User")}
            >
              User
            </Button>
          </div>
        )}

        {checkUser == "Owner" && (
          <>
            <Ownerpage />
          </>
        )}
        {checkUser == "User" && (
          <>
            <Userpage />
          </>
        )}
      </div>
    </div>
  );
}

export default CreateProfile;
