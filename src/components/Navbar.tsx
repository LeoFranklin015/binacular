/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useAccount, useDisconnect } from "@starknet-react/core";
import { useNavigate, Link } from "react-router-dom";
import ConnectModal from "./starknet/ConnectModal";
import navbg from "../assets/navbg.jpeg";

interface NavbarProps {
  // Add any props if needed
}

const Navbar: React.FC<NavbarProps> = (
  // eslint-disable-next-line no-empty-pattern
  {
    /* Props here */
  }
) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  const [profileState, setProfileState] = useState(false);

  // useEffect(() => {
  //   console.log("UE", appState);
  // }, []);

  const CheckConnect = async () => {
    // Assuming connectWallet and getTokenData are defined somewhere
    // Replace with your actual implementation
    // await connectWallet();
    // await getTokenData();
    if (profileState) {
      console.log("This is from home");
      navigate("/home");
    } else {
      console.log("This is from profile");
      navigate("/createprofile");
    }
  };

  useEffect(() => {
    console.log(address);
    let isMounted = true;
    const checkUserExists = async () => {
      if (address && isMounted) {
        // Perform an asynchronous check if the user exists in the database
        try {
          const response = await fetch(
            `https://binocular-be.onrender.com/user/${address}`
          );
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

    return () => {
      isMounted = false; // Cleanup to prevent state update on unmounted component
    };
  }, []);

  return (
    <div className="">
      <section className="relative mx-auto">
        <nav
          style={{ backgroundImage: `url(${navbg})` }}
          className="flex justify-between h-[170px] text-black w-full bg-hero"
        >
          <div className="px-16 py-6 flex w-full items-center">
            <a
              className="text-3xl font-bold font-heading font-title tracking-widest"
              href="/"
            >
              Milestone
            </a>

            <div className="fixed top-[50px] right-[50px] justify-between flex flex-row px-4 p-2">
              <div className="hidden xl:flex space-x-5 items-center px-10">
                <Link to="/profile">
                  <a className="flex items-center hover:text-gray-800" href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </a>
                </Link>
              </div>
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
          </div>
          <a className="xl:hidden flex mr-6 items-center" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="flex absolute -mt-5 ml-4">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </a>
          <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </a>
        </nav>
      </section>
    </div>
  );
};

export default Navbar;
