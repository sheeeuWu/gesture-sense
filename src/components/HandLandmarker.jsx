import React, { useEffect, useRef, useState } from "react";
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const HandLandmarkerComponent = () => {
  const videoRef = useRef(null);
  const [handLandmarker, setHandLandmarker] = useState(null);
  const canvasRef = useRef(null);

  // Load the model and initialize HandLandmarker
  useEffect(() => {
    async function initHandLandmarker() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      const handLandmarkerInstance = await HandLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath: "/models/hand_landmarker.task",
          },
          runningMode: "VIDEO",
          numHands: 2,
        }
      );
      setHandLandmarker(handLandmarkerInstance);
    }
    initHandLandmarker();
  }, []);

  // Process video frames
  const processVideoFrame = () => {
    if (handLandmarker && videoRef.current) {
      const result = handLandmarker.detectForVideo(
        videoRef.current,
        Date.now()
      );

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Clear canvas before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (result && result.landmarks) {
        result.landmarks.forEach((landmark) => {
          const THUMB_TIP = landmark[4];
          const INDEX_FINGER_TIP = landmark[8];

          //line connecting each knuckle landmark
          const HAND_CONNECTIONS = [
            // Thumb
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4],
            // Index finger
            [0, 5],
            [5, 6],
            [6, 7],
            [7, 8],
            // Middle finger
            [0, 9],
            [9, 10],
            [10, 11],
            [11, 12],
            // Ring finger
            [0, 13],
            [13, 14],
            [14, 15],
            [15, 16],
            // Pinky finger
            [0, 17],
            [17, 18],
            [18, 19],
            [19, 20],
          ];

          ctx.strokeStyle = "#00FF00";
          ctx.lineWidth = 3;

          HAND_CONNECTIONS.forEach(([start, end]) => {
            const startX = landmark[start].x * canvas.width;
            const startY = landmark[start].y * canvas.height;
            const endX = landmark[end].x * canvas.width;
            const endY = landmark[end].y * canvas.height;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
          });

          landmark.forEach((point) => {
            ctx.beginPath();
            ctx.arc(
              point.x * canvas.width,
              point.y * canvas.height,
              5,
              0,
              2 * Math.PI
            );
            ctx.fillStyle = "red";
            ctx.fill();
          });

          // console.log("All landmarks>>>", result.landmarks)
          console.log("THUMB_TIP>>>", THUMB_TIP);
          console.log("INDEX_FINGER_TIP>>>", INDEX_FINGER_TIP);
        });
      }
    }
  };

  //video stream and process each frame
  useEffect(() => {
    const video = videoRef.current;
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
          video.addEventListener("loadeddata", () => {
            setInterval(processVideoFrame, 100); // Process every 100 ms
          });
        })
        .catch((err) => {
          console.error("Error accessing camera: ", err);
        });
    }
  }, [handLandmarker]);

  return (
    <div>
      <video ref={videoRef} autoPlay muted style={{ width: "100%" }} />
      <canvas
        ref={canvasRef}
        width={650}
        height={480}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
};

export default HandLandmarkerComponent;
