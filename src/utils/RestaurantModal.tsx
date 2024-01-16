import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";

import bg from "../assets/side-background.png";
import Navbar from "../components/Navbar";

import { useAccount, useContractWrite } from "@starknet-react/core";

interface Restaurant {
  name: string;
  address: string;
  img: string;
  desc: string;
  gst: string;
}

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

  const { address } = useAccount();

  const calls = useMemo(() => {
    const tx2 = {
      contractAddress:
        "0x0358a819b026c94bfa739931c53cca29501e32e72b1f6cdc98d49dd4905d896e",
      entrypoint: "set_loyalty",
      calldata: [(address as string) || "0x000000000", amount / 10],
    };
    return [tx2];
  }, [address, amount]);

  const { writeAsync } = useContractWrite({ calls });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(amount);
    setAmount(amount / 10);
    console.log(amount);
    await writeAsync();
    console.log("Submitted Review:", reviewData);
    setIsModalOpen(false);
  };

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(
        "https://binocular-be.onrender.com/restaurants"
      );
      console.log(response);
      const data = await response.json();
      console.log(data.restaurants);
      setRestaurants(data.restaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const restaurantIndex = parseInt(id!, 10);
  const restaurant = restaurants[restaurantIndex];

  if (!restaurant) {
    return <div className="text-center mt-8">Restaurant not found!</div>;
  }
  // const { img, name, address, desc, images, reviews } = restaurant;

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-5">
        <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
        <div className="flex flex-col justify-between">
          <img
            src={restaurant.img}
            alt="Restaurant"
            className=" w-96 h-unit-60 object-cover mb-4"
          />
          <div className="flex justify-between mb-4">
            <p className="text-gray-600">Location:{restaurant.address}</p>
            <p className="text-yellow-500">Rating:{4}/5</p>
          </div>
        </div>
        <div className="text-gray-800">
          <p>{restaurant.desc}</p>
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
                // value={reviewData.reviewText}
                value={restaurant.gst}
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
                }}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-[#4B687A]"
                placeholder="Enter your rating (1-5)"
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
