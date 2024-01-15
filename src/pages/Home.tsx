/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import RestaurantList from "../utils/RestaurantList";

import Header from "../components/Header";
import RestaurantCard from "../utils/RestaurantCard";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <div className="w-full p-4 px-14">
          <h2 className="text-2xl font-bold ">Restaurants List</h2>
          <RestaurantList />
        </div>
      </div>
    </div>
  );
};

export default Home;
