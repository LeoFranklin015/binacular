// import { useBlock } from "@starknet-react/core";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateProfile from "./pages/CreateProfile";
import RestaurantModal from "./utils/RestaurantModal";

import { Route, Routes, useLocation } from "react-router-dom";

import { useAccount, useContractRead } from "@starknet-react/core";
import React from "react";
import loyalty from "./loyalty.json";

function App() {
  const { address } = useAccount();
  console.log(address);

  const { data } = useContractRead({
    functionName: "get_loyalty",
    args: [address as string],
    abi: loyalty.abi,
    address:
      "0x0358a819b026c94bfa739931c53cca29501e32e72b1f6cdc98d49dd4905d896e",
    watch: true,
  });
  console.log(data);

  // const { contract } = useContract({
  //   address:
  //     "0x0367fe8c6d35b2eb3437c715c2b9b1178e19e584eacc2d2da8cd5bd9614324c3",
  //   abi: abi_erc20.abi,
  //   provider: provider,
  // });

  // const calls = useMemo(() => {
  //   if (!address || !contract) return [];
  //   return contract.populateTransaction["_mint"]!(address, {
  //     low: 1,
  //     high: 0,
  //   });
  // }, [contract, address]);

  // const { writeAsync, data, isPending } = useContractWrite({
  //   calls,
  // });
  const location = useLocation();

  return (
    // <main className=" flex flex-col items-center justify-center min-h-screen gap-12">
    //   <Header />

    //   <p className="mb-2 text-lg">
    //     Get started by editing&nbsp;
    //     <code className="p-2 bg-zinc-200 rounded">src/App.tsx</code>
    //   </p>
    //   <div className="flex flex-row gap-12">
    //     <a
    //       className="p-4 rounded-md w-48 bg-zinc-100 border flex flex-col items-start justify-start gap-6 group"
    //       href="https://starknet.io/docs"
    //       target="_blank"
    //       rel="noreferrer"
    //     >
    //       <img
    //         src="https://pbs.twimg.com/profile_images/1656626805816565763/WyFDMG6u_400x400.png"
    //         className="object-contain w-24 h-24"
    //         alt="starknet-icon"
    //       />
    //       <p className="mb-2 text-lg">
    //         Starknet Documentation
    //         <span className=" group-hover:font-bold transition-all ml-2 group-hover:ml-4">
    //           {">"}
    //         </span>
    //       </p>
    //     </a>
    //     <a
    //       className="p-4 rounded-md w-48 bg-zinc-100 border flex flex-col items-start justify-start gap-6 group"
    //       href="https://starknet-react.com/docs/getting-started"
    //       target="_blank"
    //       rel="noreferrer"
    //     >
    //       <img
    //         src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png"
    //         className="object-contain w-24 h-24"
    //         alt="react-icon"
    //       />
    //       <p className="mb-2 text-lg">
    //         Starknet React Documentation
    //         <span className="group-hover:font-bold transition-all ml-2 group-hover:ml-4">
    //           {">"}
    //         </span>
    //       </p>
    //     </a>
    //     <button onClick={() => writeAsync()}>Transfer</button>
    //   </div>

    // </main>
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile loyalty={data as bigint} />} />
      <Route path="/createprofile" element={<CreateProfile />} />
      <Route path="/details/:id" element={<RestaurantModal />} />
    </Routes>
  );
}

export default App;
