// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function OwnerPage() {
//   const [ownerName, setOwnerName] = useState("");
//   const [restaurantName, setRestaurantName] = useState("");
//   const [restaurantAddress, setRestaurantAddress] = useState("");
//   const [milestone, setMilestone] = useState("");
//   const [description, setDescription] = useState("");
//   const [gstId, setGstId] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Update localStorage when state changes
//     localStorage.setItem("ownerName", ownerName);
//     localStorage.setItem("restaurantName", restaurantName);
//     localStorage.setItem("restaurantAddress", restaurantAddress);
//     localStorage.setItem("milestone", milestone);
//     localStorage.setItem("description", description);
//     localStorage.setItem("gstId", gstId);
//   }, [
//     ownerName,
//     restaurantName,
//     restaurantAddress,
//     milestone,
//     description,
//     gstId,
//   ]);

//   return (
//     <div className="flex flex-col h-[370px] items-center justify-center ml-[60px] space-y-[27px]">
//       <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
//         <label className="text-[#7A999C] text-[20px] font-serif">Name:</label>
//         <input
//           className="text-[#7A999C] focus:outline-none"
//           type="text"
//           placeholder="Enter owner name"
//           onChange={handleChange}
//         />
//       </div>
//       <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
//         <label className="text-[#7A999C] text-[20px] font-serif">
//           Restaurant name:
//         </label>
//         <input
//           className="text-[#7A999C] focus:outline-none"
//           type="text"
//           placeholder="Enter the restaurant name"
//           onChange={handleChange}
//         />
//       </div>
//       <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
//         <label className="text-[#7A999C] text-[20px] font-serif">
//           Restaurant address:
//         </label>
//         <input
//           className="text-[#7A999C] focus:outline-none"
//           type="text"
//           placeholder="Enter the address"
//           onChange={handleChange}
//         />
//       </div>
//       <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
//         <label className="text-[#7A999C] text-[20px] font-serif">Image:</label>
//         <input
//           className="text-[#7A999C] focus:outline-none"
//           type="number"
//           placeholder="Image url"
//           onChange={handleChange}
//         />
//       </div>
//       <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
//         <label className="text-[#7A999C] text-[20px] font-serif">
//           Description:
//         </label>
//         <input
//           className="text-[#7A999C] focus:outline-none"
//           type="text"
//           placeholder="Description of restaurant"
//         />
//       </div>
//       <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
//         <label className="text-[#7A999C] text-[20px] font-serif">GST id:</label>
//         <input
//           className="text-[#7A999C] focus:outline-none"
//           type="text"
//           placeholder="Enter GST id of restaurant"
//         />
//       </div>
//       <div className="flex flex-col h-10 p-5 m-3">
//         <button
//           onClick={() => navigate("/")}
//           className="px-6 py-3 bg-[#4B687A] rounded-lg text-white font-bold"
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }

// export default OwnerPage;

import { useAccount } from "@starknet-react/core";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

interface OwnerPageProps {}

const OwnerPage: React.FC<OwnerPageProps> = () => {
  const [ownerName, setOwnerName] = useState<string>("");
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [restaurantAddress, setRestaurantAddress] = useState<string>("");
  const [milestone, setMilestone] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [gstId, setGstId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Update localStorage when state changes
    localStorage.setItem("ownerName", ownerName);
    localStorage.setItem("restaurantName", restaurantName);
    localStorage.setItem("restaurantAddress", restaurantAddress);
    localStorage.setItem("milestone", milestone);
    localStorage.setItem("description", description);
    localStorage.setItem("gstId", gstId);
  }, [
    ownerName,
    restaurantName,
    restaurantAddress,
    milestone,
    description,
    gstId,
  ]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the corresponding state based on the input name
    switch (name) {
      case "ownerName":
        setOwnerName(value);
        break;
      case "restaurantName":
        setRestaurantName(value);
        break;
      case "restaurantAddress":
        setRestaurantAddress(value);
        break;
      case "milestone":
        setMilestone(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "gstId":
        setGstId(value);
        break;
      default:
        break;
    }
  };

  const { address } = useAccount();
  const handleSubmit = async () => {
    try {
      // const walletAddress = "1234567890"; // Replace with the actual wallet address

      const response = await fetch(`http://localhost:3070/profile/${address}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: ownerName,
          restaurants: [
            {
              name: restaurantName,
              address: restaurantAddress,
              img: milestone,
              desc: description,
              gst: gstId,
            },
          ],
        }),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        navigate("/"); // Navigate to the desired page after successful update
      } else {
        console.error("Failed to update profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex flex-col h-[370px] items-center justify-center ml-[60px] space-y-[27px]">
      <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
        <label className="text-[#7A999C] text-[20px] font-serif">Name:</label>
        <input
          name="ownerName"
          className="text-[#7A999C] focus:outline-none"
          type="text"
          placeholder="Enter owner name"
          value={ownerName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
        <label className="text-[#7A999C] text-[20px] font-serif">
          Restaurant name:
        </label>
        <input
          name="restaurantName"
          className="text-[#7A999C] focus:outline-none"
          type="text"
          placeholder="Enter the restaurant name"
          value={restaurantName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
        <label className="text-[#7A999C] text-[20px] font-serif">
          Restaurant address:
        </label>
        <input
          name="restaurantAddress"
          className="text-[#7A999C] focus:outline-none"
          type="text"
          placeholder="Enter the address"
          value={restaurantAddress}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
        <label className="text-[#7A999C] text-[20px] font-serif">Image:</label>
        <input
          name="milestone"
          className="text-[#7A999C] focus:outline-none"
          type="text"
          placeholder="URL to restaurant Image"
          value={milestone}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
        <label className="text-[#7A999C] text-[20px] font-serif">
          Description:
        </label>
        <input
          name="description"
          className="text-[#7A999C] focus:outline-none"
          type="text"
          placeholder="Description of restaurant"
          value={description}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
        <label className="text-[#7A999C] text-[20px] font-serif">GST id:</label>
        <input
          name="gstId"
          className="text-[#7A999C] focus:outline-none"
          type="text"
          placeholder="Enter GST id of restaurant"
          value={gstId}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col h-10 p-5 m-3">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-[#4B687A] rounded-lg text-white font-bold"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OwnerPage;
