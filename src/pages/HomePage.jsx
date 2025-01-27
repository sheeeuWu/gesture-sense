/* eslint-disable react/jsx-key */
import React from "react";
import { Link } from "react-router-dom";
import { GameSeriesCards } from "../data/GameSeriesCards";
import GameSeriesCard from "../components/GameSeriesCard";

const HomePage = () => {
  return (
    <div className="w-100 h-screen bg-black font-poppins flex flex-col justify-center items-center text-white">
      <p className="text-7xl text font-bold p-5 mb-5">
        Welcome to Arduino GestureSense!
      </p>
      <div>
        <p className="text-md font-medium">
          1. Download & Install the MediaPipeArdino Library in your arduino IDE.
        </p>
        <p className="text-md font-medium">
          2. Burn the example code simple in your arduino.
        </p>
        <p className="text-md font-medium">3. Connect to this webpage.</p>
      </div>
      {/* Game Series Cards */}
      <div className="w-full">
        <div className="flex flex-wrap justify-center">
          {GameSeriesCards.map((item) => (
            <Link to={item.page}>
              <GameSeriesCard game={item} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
