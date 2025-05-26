import React from "react";
import "./markdown.css";

function CopyableHeader({ children }) {
  const id = children?.toString().toLowerCase().replace(/\s+/g, "-");

  const handleCopy = () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    console.log(url);
    navigator.clipboard.writeText(url);
  };

  return React.createElement("i", {
    className: "nf nf-fa-link scale-on-click",
    onClick: handleCopy,
  });
}

export const createH1Render = ({ node, children }) => {
  return (
    <h1
      id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
      style={{ color: "#7aa2f7" }}
    >
      {children}
    </h1>
  );
};

export const createH2Render = ({ node, children }) => {
  return (
    <h2
      className="markdown-header"
      id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
    >
      {"=> "}
      {children}
      {/* <CopyableHeader children={children} /> */}
      <CopyableHeader>{children}</CopyableHeader>
    </h2>
  );
};

export const createH3Render = ({ node, children }) => {
  return (
    <h3
      className="markdown-header"
      id={children?.toString().toLowerCase().replace(/\s+/g, "-")}
    >
      {"==> "}
      {children} <CopyableHeader>{children}</CopyableHeader>
    </h3>
  );
};
