import { useAccount, useDisconnect } from "@starknet-react/core";
import React, { useEffect } from "react";
import ConnectModal from "./starknet/ConnectModal";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(address);
    const checkUserExists = async () => {
      if (address) {
        // Perform an asynchronous check if the user exists in the database
        try {
          const response = await fetch(`/user/${address}`);
          const data = await response.json();

          if (data.alreadyExists) {
            // If user exists, navigate to the home page
            navigate("/");
          } else {
            // If user does not exist, navigate to create profile
            navigate("/createprofile");
          }
        } catch (error) {
          console.error("Error checking user existence:", error);
        }
      }
    };

    checkUserExists();
  }, [address]);

  return (
    <div className=" top-0 left-0 right-0 bg-white border justify-between  flex flex-row px-4 p-2">
      {address ? (
        <div className="flex flex-col items-end bg-zinc-100 rounded-md px-6 py-2">
          <p className="font-semibold">{`${address.slice(
            0,
            6
          )}...${address.slice(-4)}`}</p>
          <p
            onClick={() => disconnect()}
            className="cursor-pointer text-black/50"
          >
            Disconnect
          </p>
        </div>
      ) : (
        <ConnectModal />
      )}
    </div>
  );
}
