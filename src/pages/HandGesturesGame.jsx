import React from "react";
import { useNavigate } from "react-router-dom";
import { connectSerial, readSerial } from "../lib/serial";

const HandGesturesGame = () => {
  const navigate = useNavigate();

  const handleConnectClick = async () => {
    try {
      await connectSerial();
      readSerial();
      navigate("/serial-console");
    } catch (error) { }
  };

  return (
    <div className="w-100 h-screen bg-black flex flex-col justify-center items-center text-white font-poppins">
      <p className="text-7xl text font-bold p-5">
        Welcome to Arduino GestureSense!
      </p>
      <p className="text-3xl font-medium p-3">
        Control your Arduino projects with Gestures.
      </p>
      <div>
        <p className="text-md">
          1. Plug in your arduino/ESP/Microcontroller board to a USB port.
        </p>
        <p className="text-md">
          2. Click on the connect button & select the correct COM PORT.
        </p>
      </div>
      <button
        id="connectButton"
        className="bg-blue-600 w-72 py-4 rounded-md mt-9 mb-5"
        onClick={handleConnectClick}
      >
        Connect with USB
      </button>
      <button
        id="connectButton"
        className="bg-blue-600 w-72 py-4 rounded-md mt-2 mb-5"
        onClick={handleConnectClick}
      >
        Connect with Bluetooth
      </button>
      <p className="text-md">Get started in just a few minutes!</p>
    </div>
  );
};

export default HandGesturesGame;
