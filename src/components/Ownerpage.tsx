/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OwnerPage() {
  const [ownerName, setOwnerName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [milestone, setMilestone] = useState("");
  const [description, setDescription] = useState("");
  const [gstId, setGstId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Update localStorage when state changes
    localStorage.setItem("ownerName", ownerName);
    localStorage.setItem("restaurantName", restaurantName);
    localStorage.setItem("restaurantAddress", restaurantAddress);
    localStorage.setItem("milestone", milestone);
    localStorage.setItem("description", description);
    localStorage.setItem("gstId", gstId);
  }, [ownerName, restaurantName, restaurantAddress, milestone, description, gstId]);
  return (
    <div className="flex flex-col h-[370px] items-center justify-center ml-[60px] space-y-[27px]">
      <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
        <label className="text-[#7A999C] text-[20px] font-serif">Name:</label>
        <input
          className="text-[#7A999C] focus:outline-none"
          type="text"
          placeholder="Enter owner name"
        />
      </div>
      <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
        <label className="text-[#7A999C] text-[20px] font-serif">
          Restaurant name:
        </label>
        <input
          className="text-[#7A999C] focus:outline-none"
          type="text"
          placeholder="Enter the restaurant name"
        />
      </div>
      <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
        <label className="text-[#7A999C] text-[20px] font-serif">
          Restaurant address:
        </label>
        <input
          className="text-[#7A999C] focus:outline-none"
          type="text"
          placeholder="Enter the address"
        />
      </div>
      <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
        <label className="text-[#7A999C] text-[20px] font-serif">
          Milestone:
        </label>
        <input
          className="text-[#7A999C] focus:outline-none"
          type="number"
          placeholder="Count to claim rewards"
        />
      </div>
      <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
        <label className="text-[#7A999C] text-[20px] font-serif">
          Description:
        </label>
        <input
          className="text-[#7A999C] focus:outline-none"
          type="text"
          placeholder="Description of restaurant"
        />
      </div>
      <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
        <label className="text-[#7A999C] text-[20px] font-serif">GST id:</label>
        <input
          className="text-[#7A999C] focus:outline-none"
          type="text"
          placeholder="Enter GST id of restaurant"
        />
      </div>
      <div className="flex flex-col h-10 p-5 m-3">
        <button onClick={() => navigate("/")} className="px-6 py-3 bg-[#4B687A] rounded-lg text-white font-bold">
          Submit
        </button>
      </div>
    </div>
  );
}

export default OwnerPage;
