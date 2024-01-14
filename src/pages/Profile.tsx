import React, { useEffect, useMemo } from "react";

import {
  useAccount,
  useContractWrite,
  useContract,
  useProvider,
  useContractRead,
} from "@starknet-react/core";

import { useState } from "react";

import sideBG from "../assets/side-background.png";
import profileBG from "../assets/profileBg.png";
import nft from "../nft.json";
import loyalty from "../loyalty.json";

interface ProfileDetails {
  name: string;
  type: "Customer" | "Owner";
  loyaltyPoints: number;
}

interface ProfileProps {
  loyalty: bigint;
}

const Profile: React.FC<ProfileProps> = ({ loyalty }) => {
  const profileDetails: ProfileDetails = {
    name: "John Doe",
    type: "Customer",
    loyaltyPoints: 120,
  };

  const { address } = useAccount();
  console.log(address);

  const [count] = useState(1);
  const { provider } = useProvider();

  const { contract } = useContract({
    address:
      "0x0367fe8c6d35b2eb3437c715c2b9b1178e19e584eacc2d2da8cd5bd9614324c3",

    abi: nft.abi,
    provider: provider,
  });

  // const calls = useMemo(() => {
  //   if (!address || !contract) return [];
  //   return contract.populateTransaction["_mint"]!(address, {
  //     low: 3,
  //     high: 0,
  //   });
  // }, [contract, address]);

  // const { writeAsync, data, isPending } = useContractWrite({
  //   calls,
  // });

  const calls = useMemo(() => {
    const tx1 = {
      contractAddress:
        "0x0367fe8c6d35b2eb3437c715c2b9b1178e19e584eacc2d2da8cd5bd9614324c3",
      entrypoint: "_mint",
      calldata: [
        (address as string) || "0x000000000", // Ensure it's a string or use a default value
        4,
        0,
      ],
    };
    const tx2 = {
      contractAddress:
        "0x0358a819b026c94bfa739931c53cca29501e32e72b1f6cdc98d49dd4905d896e",
      entrypoint: "remove_loyalty",
      calldata: [(address as string) || "0x000000000", 100],
    };
    return [tx1, tx2];
  }, []);

  const { writeAsync: writeMulti } = useContractWrite({ calls });

  console.log(loyalty);
  return (
    <div className="flex">
      <div>
        <img className="h-screen" src={sideBG} alt="" />
      </div>
      <div className=" flex flex-col justify-center h-full absolute left-[700px]">
        <div
          style={{ backgroundImage: `url(${profileBG})` }}
          className="border flex flex-col items-center justify-center border-black w-[434px] h-[547px] rounded-md"
        >
          <h2 className="text-[32px] text-[#7A999C] font-bold mt-[-80px] ml-[-150px] mb-[70px]">
            MY PROFILE
          </h2>
          <div className="mb-2 flex text-left justify-center w-[200px]">
            <span className="text-[#7A999C] text-left text-[20px] font-serif mr-[50px]">
              Name:
            </span>{" "}
            {profileDetails.name}
          </div>
          <div className="mb-2 flex justify-center w-[200px]">
            <span className="text-[#7A999C] text-[20px] font-serif mr-[50px]">
              Type:
            </span>{" "}
            {profileDetails.type}
          </div>
          <div className="mb-2 flex justify-between text-left w-[170px]">
            <span className="text-[#7A999C] text-left text-[20px] font-serif mr-[50px]">
              LoyaltyPoints:
            </span>{" "}
            <span className="text-left">{`${loyalty}`}</span>
          </div>
          <div>
            <h1 className="text-[#7A999C] text-left text-[20px] font-serif ">
              Current Supply
            </h1>
          </div>
          <div className="w-[200px] flex flex-col h-10 p-5 m-3">
            <button
              onClick={async () => await writeMulti()}
              className="px-6 py-3 bg-[#7A999C] rounded-lg text-white font-bold"
            >
              Mint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
