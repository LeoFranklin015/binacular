// /* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function UserPage() {
//   const [userName, setUserName] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [emailId, setEmailId] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Update localStorage when state changes
//     localStorage.setItem("userName", userName);
//     localStorage.setItem("mobileNumber", mobileNumber);
//     localStorage.setItem("emailId", emailId);
//   }, [userName, mobileNumber, emailId]);

//   return (
//     <div className="flex flex-col h-[250px] items-center justify-center ml-[60px] space-y-[27px]">
//       <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
//         <label className="text-[#7A999C] text-[20px] font-serif">
//           User name:
//         </label>
//         <input
//           className="text-[#7A999C] focus:outline-none"
//           type="text"
//           placeholder="Enter your username"
//         />
//       </div>
//       <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
//         <label className="text-[#7A999C] text-[20px] font-serif">
//           Mobile Number:
//         </label>
//         <input
//           className="text-[#7A999C] focus:outline-none"
//           type="text"
//           placeholder="Enter the mobile number"
//         />
//       </div>
//       <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
//         <label className="text-[#7A999C] text-[20px] font-serif">
//           Email id:
//         </label>
//         <input
//           className="text-[#7A999C] focus:outline-none"
//           type="email"
//           placeholder="Enter your mail id"
//         />
//       </div>
//       <div className="flex flex-col h-10 p-5 m-3">
//         <button onClick={() => navigate("/")} className="px-6 py-3 bg-[#4B687A] rounded-lg text-white font-bold">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }

// export default UserPage;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAccount } from "@starknet-react/core";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

interface UserPageProps {}

const UserPage: React.FC<UserPageProps> = () => {
  const [userName, setUserName] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [emailId, setEmailId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Update localStorage when state changes
    localStorage.setItem("userName", userName);
    localStorage.setItem("mobileNumber", mobileNumber);
    localStorage.setItem("emailId", emailId);
  }, [userName, mobileNumber, emailId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the corresponding state based on the input name
    switch (name) {
      case "userName":
        setUserName(value);
        break;
      case "mobileNumber":
        setMobileNumber(value);
        break;
      case "emailId":
        setEmailId(value);
        break;
      default:
        break;
    }
  };

  const { address } = useAccount();
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3070/profile/${address}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
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
    <div className="flex flex-col h-[250px] items-center justify-center ml-[60px] space-y-[27px]">
      <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
        <label className="text-[#7A999C] text-[20px] font-serif">
          User name:
        </label>
        <input
          name="userName"
          className="text-[#7A999C] focus:outline-none"
          type="text"
          placeholder="Enter your username"
          value={userName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
        <label className="text-[#7A999C] text-[20px] font-serif">
          Mobile Number:
        </label>
        <input
          name="mobileNumber"
          className="text-[#7A999C] focus:outline-none"
          type="text"
          placeholder="Enter the mobile number"
          value={mobileNumber}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col w-[300px] h-22 bg-gray-10 border-b-3 border-[#5F7C8D]">
        <label className="text-[#7A999C] text-[20px] font-serif">
          Email id:
        </label>
        <input
          name="emailId"
          className="text-[#7A999C] focus:outline-none"
          type="email"
          placeholder="Enter your mail id"
          value={emailId}
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

export default UserPage;
