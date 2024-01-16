// import React,{useState,useEffect} from "react";
// import RestaurantCard from "./RestaurantCard"; // assuming the file location of the RestaurantCard component

// const RestaurantList = () => {
//   // Sample restaurant data
//   // const restaurants = [
//   //   {
//   //     id: 1,
//   //     name: "Restaurant A",
//   //     imageUrl: "https://via.placeholder.com/300",
//   //     averageRating: 4.5,
//   //     location: "123 Main St, City",
//   //   },
//   //   {
//   //     id: 2,
//   //     name: "Restaurant B",
//   //     imageUrl: "https://via.placeholder.com/300",
//   //     averageRating: 4.0,
//   //     location: "456 Broadway, Town",
//   //   },
//   //   // ... other restaurants
//   // ];

//    const [restaurants, setRestaurants] = useState([]);

//    const fetchRestaurants = async () => {
//      try {
//        const response = await fetch("/restaurants");
//        const data = await response.json();
//        setRestaurants(data.restaurants);
//      } catch (error) {
//        console.error("Error fetching restaurants:", error);
//      }
//    };

//    useEffect(() => {
//      fetchRestaurants();
//    }, []);

//   return (
//     <div className="grid grid-cols-3">
//       {restaurants.map((restaurant) => (
//         <RestaurantCard
//           key={restaurant.id}
//           id={restaurant.id}
//           imageUrl={restaurant.imageUrl}
//           name={restaurant.name}
//           averageRating={restaurant.averageRating}
//           location={restaurant.location}
//         />
//       ))}
//     </div>
//   );
// };

// export default RestaurantList;

import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";

interface Restaurant {
  name: string;
  address: string;
  img: string;
  desc: string;
  gst: string;
}

const RestaurantList: React.FC = () => {
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

  return (
    <div className="grid grid-cols-3">
      {restaurants.map((restaurant, index) => (
        <RestaurantCard
          key={index}
          id={index}
          imageUrl={restaurant.img}
          name={restaurant.name}
          averageRating={5}
          location={restaurant.address}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
