import React, { useState } from "react";

import scared from "../../assets/zelda/scared.png";
import shrug from "../../assets/zelda/shrug.png";

import "./error.css";

const showErrorImage = ({ status }) => {
  if (status === 404) {
    return <img className="error-page" src={shrug} alt="500-internal" />;
  }

  return (
    <img
      className="error-page"
      src={scared}
      alt="500-internal"
      style={{
        paddingTop: "5rem",
        paddingBottom: "5rem",
      }}
    />
  );
};

const Error = ({
  msg = "...",
  status = 500,
  statusText = "Internal Service Error",
}) => {
  const [isActive, setIsActive] = useState(true);
  const [isChecked, setIsChecked] = useState(true);

  const info = [
    { title: "Status Code", content: `${status} ${statusText}` },
    { title: "Response Msg", content: msg },
  ];

  const handleToggle = () => {
    setIsActive((prev) => !prev);
    setIsChecked((prev) => !prev);
  };

  const TreeLike = ({ root, nodes }) => (
    <ul className="tree">
      <li className="root">
        <h1 className="root">
          <span
            className={`box ${isChecked ? "check-box" : ""}`}
            onClick={handleToggle}
          >
            {root}
          </span>
        </h1>
        {/* <ul class="nested"> */}
        <ul className={`nested ${isActive ? "active" : ""}`}>
          {nodes.map((node, index) => (
            <li key={index} className="child">
              <h5 className="node">
                <span>{node.title}:</span> {node.content}
              </h5>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );

  return (
    <main>
      <div className="error-container">
        {showErrorImage({ status })}
        <div className="error-info">
          <TreeLike root="Sorry, Something is wrong..." nodes={info} />
        </div>
      </div>
    </main>
  );
};

export default Error;
