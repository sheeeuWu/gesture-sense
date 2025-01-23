import { useEffect, useRef, useState } from "react";

const SerialConsole = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [isCameraRunning, setIsCameraRunning] = useState(false);
  const [isSerialConnected, setIsSerialConnected] = useState(false);
  const [serialMonitorText, setSerialMonitorText] = useState("");
  const [loadingMessageVisible, setLoadingMessageVisible] = useState(false);

  const handleResults = (results) => {
    if (!isCameraRunning) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
    // Drawing hand landmarks logic here...
    ctx.restore();
  };

  const startCamera = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.srcObject = stream;
      video.play();
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        setIsCameraRunning(true);
        processFrame();
      };
    });
  };

  const stopCamera = () => {
    const video = videoRef.current;
    const stream = video.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    video.srcObject = null;
    setIsCameraRunning(false);
  };

  const processFrame = () => {
    if (!isCameraRunning) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Send frame to model and call handleResults...
  };

  //checkbox generation
  const handLandmarks = Array.from({ length: 21 }, (_, i) => i);

  const handleStartButtonClick = async () => {
    if (isCameraRunning) {
      stopCamera();
    } else {
      setLoadingMessageVisible(true);
      // Initialize the model here...
      setLoadingMessageVisible(false);
      startCamera();
    }
  };

  const handleConnectButtonClick = async () => {
    if (isSerialConnected) {
      // Disconnect serial logic...
      setIsSerialConnected(false);
    } else {
      // Connect serial logic...
      setIsSerialConnected(true);
    }
  };

  return (
    <div className="flex h-screen font-poppins">
      <div className="flex-grow flex justify-center items-center overflow-hidden relative transform -scale-x-100">
        <canvas ref={canvasRef} className="w-full h-auto"></canvas>
        {loadingMessageVisible && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-2 rounded">
            Please wait for the model to load
          </div>
        )}
      </div>

      <div className="w-72 flex flex-col items-center p-4 bg-gray-100 shadow-lg">
        <div className="mt-4 mb-2">
          <strong>Select Hand Landmarks:</strong>
        </div>

        <div id="handLandmarkSelector" className="flex flex-wrap max-w-72">
          {handLandmarks.map((i) => (
            <div key={i}>
              <label htmlFor={`hand_landmark_${i}`} className="px-1">
                H{i}
                <input type="checkbox" id={`hand_landmark_${i}`} value={i} />
              </label>
            </div>
          ))}
        </div>

        <div className="label bg-white border border-gray-300 p-2 mt-4 overflow-auto h-36">
          Selected Landmark JSON data will be displayed here
        </div>

        <button
          onClick={handleStartButtonClick}
          className={`mt-4 w-4/5 py-2 ${
            isCameraRunning ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          {isCameraRunning ? "Stop" : "Start"}
        </button>

        <button
          onClick={handleConnectButtonClick}
          className={`mt-4 w-4/5 py-2 ${
            isSerialConnected ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          {isSerialConnected ? "Disconnect" : "Connect"}
        </button>

        <div className="bg-white border border-gray-300 p-2 mt-4 h-36 overflow-auto">
          JSON data will be displayed here
        </div>

        <div className="bg-gray-200 border border-gray-300 p-2 mt-4 h-36 overflow-auto">
          {serialMonitorText || "Serial Monitor Output will be displayed here"}
        </div>
      </div>
    </div>
  );
};

export default SerialConsole;
