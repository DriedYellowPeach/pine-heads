import React, { useEffect, useState } from "react";
import "./loading.css";
import { PacmanLoader as Loader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

// HACK: under 100ms, there will be no spinner
// once go over 100ms, then spinner will last for 200ms, causing a wait time 300ms
const Loading = ({ delay = 100 }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, delay);

    // Cleanup timer if the component unmounts before the delay finishes
    return () => clearTimeout(timer);
  }, [delay]);

  if (!showSpinner) {
    return (
      <main>
        <div className="empty-container loading"></div>
      </main>
    );
  }

  return (
    <main>
      <div className="loading-container">
        <Loader color="orange" size={50} cssOverride={override} />
        <h1>Loading...</h1>
      </div>
    </main>
  );
};

export default Loading;
