/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { Contract } from "starknet";
import bg from "../assets/side-background.png";
import Navbar from "../components/Navbar";

// import contractAbi from "../../../smart-contracts/";
const contractAddress =
  "0x5302e3d1d237dd13dbca7bd0e6448c5248dae4382010b39b21fc32efc51e07a";

const RestaurantModal = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState({ reviewText: "", rating: "" });
  const [amount, setAmount] = useState(0);
  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Change the alpha value for transparency
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "80%", // Adjust the width as needed
      maxWidth: "800px", // You can set a max-width if needed
      padding: "20px",
      border: "none", // Remove the border
      borderRadius: "10px", // Add border-radius for rounded corners
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      backgroundColor: "rgba(255, 255, 255, 0.9)", // Adjust the alpha value for modal background
    },
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const setLoyalty = async () => {
      // try {
      //   const provider = new RpcProvider({
      //     sequencer: { network: constants.NetworkName.SN_GOERLI },
      //   });
      //   const testAddress =
      //     "0x543a9944c1f169f4fa16f918c555fe23977add9b226340823b66835b5a27e2e";
      //   const testAbi = await provider.getClassAt(testAddress);
      //   const newContract = new Contract(
      //     testAbi.abi,
      //     testAddress,
      //     appState.address
      //   );
      //   console.log("mycontract", newContract, appState);
      //   const response = await newContract.set_loyalty(
      //     appState.address.address,
      //     amount / 10
      //   );
      //   console.log(">> response 0", response);
      //   await provider.waitForTransaction(response.transaction_hash);
      //   return true;
      // } catch (error) {
      //   console.log("error", error);
      //   return false;
      // }
    };
    setLoyalty();
    console.log("Submitted Review:", reviewData);
    setIsModalOpen(false);
  };
  const restaurants = [
    {
      id: 1,
      name: "Restaurant A",
      imageUrl: "https://via.placeholder.com/300",
      averageRating: 4.5,
      location: "Location A",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      images: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        // ... more image URLs
      ],
      reviews: ["Great food!", "Amazing service!"],
    },
    {
      id: 2,
      name: "Restaurant B",
      imageUrl: "https://via.placeholder.com/300",
      averageRating: 4.0,
      location: "Location B",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      images: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        // ... more image URLs
      ],
      reviews: ["Good ambiance.", "Could improve the menu variety."],
    },
  ];

  const restaurant = restaurants.find((r) => r.id === parseInt(id!, 10));

  if (!restaurant) {
    return <div className="text-center mt-8">Restaurant not found!</div>;
  }

  const {
    imageUrl,
    name,
    averageRating,
    location,
    description,
    images,
    reviews,
  } = restaurant;

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-5">
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        <div className="flex flex-col justify-between">
          <img
            src={imageUrl}
            alt="Restaurant"
            className=" w-96 h-unit-60 object-cover mb-4"
          />
          <div className="flex justify-between mb-4">
            <p className="text-gray-600">Location:{location}</p>
            <p className="text-yellow-500">Rating:{averageRating}/5</p>
          </div>
        </div>
        <div className="text-gray-800">
          <p>{description}</p>
        </div>
        <div className="flex flex-col w-full  gap-3">
          <h4 className="text-[#2d626E] font-bold">Images</h4>
          <div className="flex gap-6 justify-between">
            <img src={bg} className="w-40 h-24" />
            <img src={bg} className="w-40 h-24" />
            <img src={bg} className="w-40 h-24" />
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <p className="font-bold"> Wanna Claim the Loyalty Points ? </p>
          <div className="flex justify-center">
            <button
              onClick={toggleModal}
              className="bg-[#4B687A] text-white px-4 py-2 rounded-md"
            >
              Review us
            </button>
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={toggleModal}
          contentLabel="Review Modal"
          style={modalStyle}
        >
          <div style={{ marginBottom: "1rem" }}>
            <h2 className="text-2xl font-bold">Write a Review</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                GST NO:
              </label>
              <textarea
                name="reviewText"
                value={reviewData.reviewText}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-[#4B687A]"
                placeholder="Enter the GST no"
                required
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price Paid:
              </label>
              <input
                type="number"
                name="rating"
                value={amount}
                onChange={(e) => {
                  setAmount(Number(e.target.value));
                  console.log(e.target.value);
                }}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-[#4B687A]"
                placeholder="Enter your rating (1-5)"
                min="1"
                max="5"
                required
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Rating:
              </label>
              <input
                type="number"
                name="rating"
                value={reviewData.rating}
                onChange={handleInputChange}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-[#4B687A]"
                placeholder="Enter your rating (1-5)"
                min="1"
                max="5"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className=" text-white py-2 px-4 rounded-md bg-[#4B687A]"
              >
                Submit Review
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default RestaurantModal;
