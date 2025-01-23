import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {

  return (
    <div className="w-100 h-screen bg-black font-poppins flex flex-col justify-center items-center text-white ">
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
      <Link to="/connect-with-usb">
        <button className="bg-blue-600 w-72  py-4 rounded-md mt-9 mb-5">
          Connect with USB
        </button>
      </Link>
      <Link to="">
        <button className="bg-blue-600 w-72 py-4 rounded-md mb-5">
          Connect with Bluetooth
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
