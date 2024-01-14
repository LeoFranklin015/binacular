import React from "react";

import RestaurantList from "../utils/RestaurantList";

import Header from "../components/Header";
import RestaurantCard from "../utils/RestaurantCard";

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="flex h-screen">
        <div className="w-full bg-gray-300 p-4">
          <h2 className="text-lg font-bold ">Restaurants List</h2>
          <RestaurantList />
        </div>
      </div>
    </div>
  );
};

export default Home;
