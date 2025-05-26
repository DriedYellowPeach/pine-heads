import React, { useRef, useState, useEffect } from "react";
import "../styles/canvas.css";
import endpoints from "../constants/endpoints";
import axios from "axios";
import { PacmanLoader as Loader } from "react-spinners";

const DrawingCanvas = () => {
  const canvasRef = useRef(null); // Reference for the canvas element
  const [pos, setPos] = useState({ x: 0, y: 0 }); // Position of the mouse
  const [isDrawing, setIsDrawing] = useState(false); // Whether the mouse is pressed
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [smallImageDataUrl, setSmallImageDataUrl] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading effect
  const [result, setResult] = useState(null);
  const canvasWidth = 280;
  const canvasHeight = 280;

  useEffect(() => {
    const canvas = canvasRef.current;
    setImageDataUrl(canvas.toDataURL());
  }, []);

  // Function to set the position of the mouse relative to the canvas
  const setPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y });
  };

  // Drawing function
  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 30;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#c0392b";

    ctx.moveTo(pos.x, pos.y); // Move to previous position
    setPosition(e); // Update the mouse position
    ctx.lineTo(pos.x, pos.y); // Draw line to new position
    ctx.stroke();

    updateGrayscaleImage();
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    setPosition(e);
  };
  const handleMouseUp = () => setIsDrawing(false);
  const handleMouseEnter = (e) => setPosition(e);

  const updateGrayscaleImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Clone the original canvas to avoid modifying it
    const cloneCanvas = document.createElement("canvas");
    cloneCanvas.width = canvas.width;
    cloneCanvas.height = canvas.height;
    const cloneCtx = cloneCanvas.getContext("2d");

    cloneCtx.drawImage(canvas, 0, 0); // Copy content

    // Get image data and convert to grayscale
    const imageData = cloneCtx.getImageData(
      0,
      0,
      cloneCanvas.width,
      cloneCanvas.height,
    );
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const gray = 0.3 * r + 0.59 * g + 0.11 * b;
      let thresholdColor;
      if (gray > 180) {
        thresholdColor = 0; // white
      } else if (gray > 100) {
        thresholdColor = 150; // grayish
      } else {
        thresholdColor = 255; // black
      }
      data[i] = data[i + 1] = data[i + 2] = thresholdColor;
    }

    cloneCtx.putImageData(imageData, 0, 0); // Apply grayscale to the clone

    // Convert clone to data URL
    const imageDataUrl = cloneCanvas.toDataURL();

    // Resize image to 28x28 and back to 200x200
    const img = new Image();
    img.src = imageDataUrl;
    img.onload = () => {
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");

      tempCanvas.width = canvasWidth;
      tempCanvas.height = canvasHeight;

      // Draw 28x28 onto tempCanvas scaled up to 200x200
      const smallCanvas = document.createElement("canvas");
      smallCanvas.width = 28;
      smallCanvas.height = 28;
      const smallCtx = smallCanvas.getContext("2d");
      smallCtx.drawImage(img, 0, 0, 28, 28);
      // console.log(smallCanvas.toDataURL());
      setSmallImageDataUrl(smallCanvas.toDataURL());

      tempCtx.imageSmoothingEnabled = false; // prevent blur
      tempCtx.drawImage(
        smallCanvas,
        0,
        0,
        28,
        28,
        0,
        0,
        canvasWidth,
        canvasHeight,
      );

      setImageDataUrl(tempCanvas.toDataURL());
    };
  };

  // Function to clear the canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateGrayscaleImage();
    setResult(null);
  };

  const predictStroke = () => {
    // console.log(smallImageDataUrl);
    const payload = {
      Base64: smallImageDataUrl,
    };

    axios
      .post(endpoints.predictDigit, payload)
      .then((response) => {
        // Handle success
        setLoading(false);
        setResult(response.data);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        // Handle error
        setLoading(false); // Hide loading effect
        console.error("Error during API request:", error);
        setResult("Error occurred while predicting.");
      });
  };

  return (
    <div className="canvas-container">
      <div className="drawing-pads">
        <div className="pad-left">
          <p className="title">original</p>
          <canvas
            ref={canvasRef}
            height={canvasHeight}
            width={canvasWidth}
            className="drawing-canvas"
            onMouseMove={draw}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseEnter={handleMouseEnter}
          />
          <button onClick={clearCanvas}>Clear Canvas</button>
        </div>

        <div className="pad-right">
          <p className="title">Processed</p>
          <img
            src={imageDataUrl}
            alt="Processed Image"
            className="preview-image"
            height={canvasHeight + 4}
            width={canvasWidth + 4}
          />
          <button onClick={predictStroke}>Predict</button>
        </div>

        <div className="pad-res">
          <p className="title">Result</p>
          <div className="text-area">
            {/* Show loading spinner or message while waiting for response */}
            {loading && <Loader color="orange" size={25} />}
            {/* Show result once the request is completed */}
            {result && (
              <div>
                <p>
                  Digit: <span className="num">{result.digit}</span>
                </p>
                <p>
                  Confidence: {<span className="num">{result.confidence}</span>}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;
