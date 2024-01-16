/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const [loading, setLoading] = useState(false);
  const [displayImg, setDisplayImg] = useState(false);
  const [currentSupply, setCurrentSupply] = useState<number>(0);
  const [User, setUser] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    // Fetch the initial supply value
    const fetchSupply = async () => {
      try {
        // console.log("fetching");
        const response = await fetch(
          "https://binocular-be.onrender.com/supply"
        );
        const data = await response.json();

        setCurrentSupply(data.value);
      } catch (error) {
        console.error("Error fetching supply:", error);
      }
    };

    fetchSupply();
    console.log(currentSupply);
  }, [currentSupply]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const walletAddress = "user_wallet_address"; // Replace with the actual wallet address
        const response = await fetch(
          `https://binocular-be.onrender.com/profile/${address}`
        );
        const userData = await response.json();

        if (response.ok) {
          setUser(userData.user.name);
          setType(userData.user.type);
        } else {
          console.error("Error fetching user profile:", userData.message);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [address]);
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
      calldata: [(address as string) || "0x000000000", currentSupply, 0],
    };
    const tx2 = {
      contractAddress:
        "0x0358a819b026c94bfa739931c53cca29501e32e72b1f6cdc98d49dd4905d896e",
      entrypoint: "remove_loyalty",
      calldata: [(address as string) || "0x000000000", 1000],
    };
    return [tx1, tx2];
  }, [address, currentSupply]);

  const { writeAsync: writeMulti } = useContractWrite({ calls });

  const mint = async () => {
    try {
      setLoading(true);

      // Perform the minting operation
      await writeMulti();

      //token id

      setCurrentSupply((prevSupply) => prevSupply + 1);

      // Update the supply on the server
      await fetch("https://binocular-be.onrender.com/updateSupply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      // Simulate a 5-second loading period
      await new Promise((resolve) => {
        setTimeout(resolve, 5000);
      });
      setDisplayImg(true);

      // Update the UI or perform any additional actions after loading
      console.log("Minting complete!");
    } catch (error) {
      console.error("Error minting:", error);
    } finally {
      setLoading(false);
    }
  };

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
            {User}
          </div>
          <div className="mb-2 flex justify-center w-[200px]">
            <span className="text-[#7A999C] text-[20px] font-serif mr-[50px]">
              Type:
            </span>{" "}
            {type}
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
              onClick={async () => await mint()}
              className="px-6 py-3 bg-[#7A999C] rounded-lg text-white font-bold"
              disabled={loyalty < 1000}
            >
              Mint
            </button>
            {/* Display message when loyalty is insufficient */}
            {loyalty < 1000 && (
              <span className="text-[#FF0000] text-sm mt-2">
                You need 1000 loyalty to mint.
              </span>
            )}
            {loading && (
              <div className="mt-2">
                {/* Display loading indicator, e.g., an image */}
                <img
                  className="w-[50px] mx-auto"
                  src="https://i.gifer.com/ZKZg.gif"
                  alt="Loading"
                />
              </div>
            )}
            {displayImg && (
              <div className="mt-2 mx-auto">
                <img
                  className="w-[90px] "
                  src="https://assets-global.website-files.com/632c0b24c6c60510a1d60f5c/6332b7a2465c5f4e8455a4e9_bored-ape-yacht-club-nft-art-819x1024.jpg"
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
