import { Link } from "react-router-dom";
import HandLandmarkerComponent from "../components/HandLandmarker";
// import Typography from '@mui/material/Typography';

const SerialConsole = () => {
  const disconnectHandle = () => {};

  return (
    <div className="flex h-screen font-poppins text-white">
      <div className="w-full h-sceen flex">
        {/* Left portion */}
        <div className="bg-blue-600 w-[20%] py-5 px-4 flex flex-col items-center">
          <p className="font-semibold text-2xl">Arduino GestureSense</p>
          <button
            id="disconnectButton"
            className="bg-white text-red-600 font-semibold w-64 rounded-md mt-4 mb-2 py-4"
            onClick={disconnectHandle}
          >
            Diconnect
          </button>
          <p className="font-semibold mb-3">Status: </p>
          {/* canvas */}
          <div className="h-[30%] w-[90%] bg-white mb-5">Canvas</div>
          <p className="text-sm mb-2">Select any two Landmarks to track</p>
          <p className="text-sm mb-2">Landmark: 1 (Index Finger)</p>
          <div className="flex justify-center items-center text-sm mb-5">
            <p className="mx-3">X: </p>
            {/* no need of input here use p tag only with same styling */}
            <input
              type="number"
              name="number"
              className="max-w-12 rounded-sm py-1"
            />
            <p className="mx-3">Y: </p>
            <input
              type="number"
              name="number"
              className="max-w-12 rounded-sm py-1"
            />
            <p className="mx-3">Z: </p>
            <input
              type="number"
              name="number"
              className="max-w-12 rounded-sm py-1"
            />
          </div>
          <p className="text-sm mb-2">Landmark: 8 (Thumb)</p>
          <div className="flex justify-center items-center text-sm mb-5">
            <p className="mx-3">X: </p>
            <input
              type="number"
              name="number"
              className="max-w-12 rounded-sm py-1"
            />
            <p className="mx-3">Y: </p>
            <input
              type="number"
              name="number"
              className="max-w-12 rounded-sm py-1"
            />
            <p className="mx-3">Z: </p>
            <input
              type="number"
              name="number"
              className="max-w-12 rounded-sm py-1"
            />
          </div>
          <Link to="https://github.com/sheeeuWu/gesture-sense" target="_blank">
            <button className="font-semibold mt-24 underline underline-offset-2">
              Download Arduino Library
            </button>
          </Link>
        </div>
        {/* Right portion */}
        <div className="w-[80%]">
          <div>
            <HandLandmarkerComponent />
          </div>
          {/* <Typography>sdfghjk</Typography> */}
          <div className="h-16 w-full bg-[#5271FF] absolute bottom-0">
            dfghj
          </div>
        </div>
      </div>
    </div>
  );
};

export default SerialConsole;
