import React, { useState, useEffect } from "react";

const AnimatedIcon = ({ images, fps }) => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const frameCount = images.frames; // Total number of frames
  fps = fps || 30;
  const frameDuration = 1000 / fps; // Frame

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the frame and loop back to 1 when reaching frameCount
      setCurrentFrame((prevFrame) => (prevFrame % frameCount) + 1);
    }, frameDuration);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [frameCount, frameDuration]);

  return <img id="animatedIcon" src={images[currentFrame]} alt="" />;
};

export default AnimatedIcon;
