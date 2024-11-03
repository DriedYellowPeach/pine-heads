import React, { useState, useEffect } from "react";
import "./loading.css";
import { PacmanLoader as Loader } from "react-spinners";

// TODO: I need to refactor these code
// isLoading is not isShowing
// These setTimeout makes things hard to comprehend
function LoadingWrapper({
  isLoading,
  children,
  threshold = 100,
  minDisplayTime = 200,
}) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [mayFinish, setMayFinish] = useState(true);

  useEffect(() => {
    let loadingTimeout;
    let minDisplayTimeout;

    if (isLoading) {
      loadingTimeout = setTimeout(() => {
        setShowSpinner(true);
        setMayFinish(false);

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

    return () => {
      clearTimeout(loadingTimeout);
      clearTimeout(minDisplayTimeout);
    };
  }, [isLoading, showSpinner]);

  // console.log("isLoading", isLoading);
  // console.log("showSpinner", showSpinner);

  if (isLoading && !showSpinner)
    return (
      <main>
        <div className="empty-container loading"></div>
      </main>
    );

  if ((isLoading && showSpinner) || (!isLoading && showSpinner && !mayFinish))
    return (
      <main>
        <div className="loading-container">
          <Loader color="orange" size={50} />
          <h1>Loading...</h1>
        </div>
      </main>
    );

  return children;
}

export default LoadingWrapper;
