import React from "react";

function UserPage() {
  return (
    <div className="flex flex-col h-[250px] items-center justify-center ml-[60px] space-y-[27px]">
      <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
        <label className="text-[#7A999C] text-[20px] font-serif">
          User name:
        </label>
        <input
          className="text-[#7A999C] focus:outline-none"
          type="text"
          placeholder="Enter your username"
        />
      </div>
      <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
        <label className="text-[#7A999C] text-[20px] font-serif">
          Mobile Number:
        </label>
        <input
          className="text-[#7A999C] focus:outline-none"
          type="text"
          placeholder="Enter the mobile number"
        />
      </div>
      <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
        <label className="text-[#7A999C] text-[20px] font-serif">
          Email id:
        </label>
        <input
          className="text-[#7A999C] focus:outline-none"
          type="email"
          placeholder="Enter your mail id"
        />
      </div>
      <div className="flex flex-col h-10 p-5 m-3">
        <button className="px-6 py-3 bg-[#4B687A] rounded-lg text-white font-bold">
          Submit
        </button>
      </div>
    </div>
  );
}

export default UserPage;
