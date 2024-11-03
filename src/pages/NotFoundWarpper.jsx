// NotFoundWrapper.js
import React from "react";
import { useLocation } from "react-router-dom";
import Error from "../components/ErrorView/ErrorPage";

const NotFoundWrapper = () => {
  const location = useLocation(); // Get the current location object
  return (
    <Error
      msg={`Path ${location.pathname} does not exists`}
      status={404}
      statusText={"Not Found"}
    />
  ); // Pass the path to NotFound
};

export default NotFoundWrapper;
