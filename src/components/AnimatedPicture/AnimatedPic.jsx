import React, { useState, useEffect } from "react";

const AnimatedPic = ({ className, images, fps }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const frameCount = images.frames; // Total number of frames
  fps = fps || 60;
  const frameDuration = 1000 / fps; // Frame

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the frame and loop back to 1 when reaching frameCount
      setCurrentFrame((prevFrame) => (prevFrame + 1) % frameCount);
    }, frameDuration);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [frameCount, frameDuration]);

  return (
    <img
      className={className}
      src={images[currentFrame]}
      alt="current frame is {currentFrame}"
    />
  );
};

export default AnimatedPic;
