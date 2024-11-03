import React, { useState } from "react";

function TreeItem({ label, children }) {
  const [isActive, setIsActive] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsActive((prev) => !prev);
    setIsChecked((prev) => !prev);
  };

  return (
    <li>
      <div
        className={`box ${isChecked ? "check-box" : ""}`}
        onClick={handleToggle}
      >
        {label}
      </div>
      {children && (
        <ul className={`nested ${isActive ? "active" : ""}`}>{children}</ul>
      )}
    </li>
  );
}

export default TreeItem;
