import React, { useState, useEffect } from "react";
import "./loading.css";
import { PacmanLoader as Loader } from "react-spinners";

// TODO: I need to refactor these code
// isLoading is not isShowing
// These setTimeout makes things hard to comprehend
function LoadingWrapper({ isLoading, children, threshold, minDisplayTime }) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [mayFinish, setMayFinish] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    let loadingTimeout;
    let minDisplayTimeout;

    if (isLoading) {
      loadingTimeout = setTimeout(() => {
        setShowSpinner(true);

        minDisplayTimeout = setTimeout(
          () => setMayFinish(true),
          minDisplayTime,
        );
      }, threshold);
    } else {
      if (showSpinner) {
        minDisplayTimeout = setTimeout(
          () => setMayFinish(true),
          minDisplayTime,
        );
      }
    }

    // stage 0: empty page, smooth in
    // stage 1: spinner
    // stage 2: children

    if (stage === 0 && showSpinner) {
      setStage(1);
    }

    if (stage === 0 && !isLoading) {
      setStage(2);
    }

    if (stage === 1 && !isLoading && mayFinish) {
      setStage(2);
    }

    return () => {
      clearTimeout(loadingTimeout);
      clearTimeout(minDisplayTimeout);
    };
  }, [isLoading, showSpinner, mayFinish]);

  if (stage === 0) {
    return (
      <main>
        <div className="empty-container loading"></div>
      </main>
    );
  }

  if (stage === 1) {
    return (
      <main>
        <div className="loading-container">
          <Loader color="orange" size={50} />
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }

  return children;
}

export default LoadingWrapper;
