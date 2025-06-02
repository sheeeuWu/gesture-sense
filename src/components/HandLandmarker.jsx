import { useEffect, useRef, useState } from "react";
import { HandLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";
import '../App.css';
import { port, writeSerial } from "../lib/serial";

let video, canvas, ctx, drawingUtils, handLandmarks = {}, videoFrameCallbackId = null;

const HandLandmarkerComponent = () => {
  const videoRef = useRef(null);
  const [handLandmarker, setHandLandmarker] = useState(null);
  const canvasRef = useRef(null);

  // Load the model and initialize HandLandmarker
  useEffect(() => {
    videoFrameCallbackId = null;
    async function initHandLandmarker() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      const handLandmarkerInstance = await HandLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: "GPU"
          },
          runningMode: "IMAGE",
          numHands: 1,
        }
      );
      setHandLandmarker(handLandmarkerInstance);
    }
    initHandLandmarker();
    return () => {
      if (videoFrameCallbackId) {
        video.cancelVideoFrameCallback(videoFrameCallbackId);
        const stream = video.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
          video.srcObject = null;
        }
        if (handLandmarker) {
          handLandmarker.close();
          setHandLandmarker(null);
        }
      }
    }
  }, []);

  // Process video frames
  const processVideoFrame = async () => {
    if (handLandmarker && video) {
      ctx.clearRect(0, 0, 640, 480);
      ctx.drawImage(video, 0, 0, 640, 480);
      const result = await handLandmarker.detect(canvas);
      if (result.landmarks.length) {
        for (const landmarks of result.landmarks) {
          drawingUtils.drawLandmarks(landmarks, {
            color: '#FF0000',
            radius: (data) => DrawingUtils.lerp(data.from.z, -0.15, 0.1, 5, 5)
          });
          drawingUtils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
          landmarks.forEach((landmark, index) => {
            const key = `Hand0_Landmark${index}`;
            handLandmarks[key] = {
              x: Math.round((landmark.x + Number.EPSILON) * 100) / 100,
              y: Math.round((landmark.y + Number.EPSILON) * 100) / 100,
              z: Math.round((landmark.z + Number.EPSILON) * 100) / 100,
            };
          })
        }
        if (port) {
          const toWrite = JSON.stringify(handLandmarks) + "\n";
          await writeSerial(toWrite);
        }
      }
      videoFrameCallbackId = video.requestVideoFrameCallback(processVideoFrame);
    }
  };

  //video stream and process each frame
  useEffect(() => {
    if (handLandmarker) {
      video = videoRef.current;
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            if (!video.srcObject) {
              video.srcObject = stream;
              video.play();
            }
            video.addEventListener("loadeddata", async function onVideoLoaded() {
              canvas = canvasRef.current;
              ctx = canvas.getContext("2d");
              drawingUtils = new DrawingUtils(ctx);
              processVideoFrame();
              video.removeEventListener("loadeddata", onVideoLoaded);
            });
          })
          .catch((err) => {
            console.error("Error accessing camera: ", err);
          });
      }
    }
  }, [handLandmarker]);

  return (
    <div>
      <video ref={videoRef} className="videoFeed" style={{ display: "none" }} width="640" height="480" muted autoPlay />
      <canvas ref={canvasRef} className="videoFeed" width="640" height="480" />
    </div>
  );
};

export default HandLandmarkerComponent;
