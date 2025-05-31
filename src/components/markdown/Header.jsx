import React from "react";
import "./markdown.css";

function string_to_slug(str) {
  str = str.replace(/^[\s]+|[\s]+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc-----";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/\./g, "")
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

function CopyableHeader({ children }) {
  const id = string_to_slug(children?.toString() || "");

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
      id={string_to_slug(children?.toString() || "")}
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
      id={string_to_slug(children?.toString() || "")}
    >
      {"=> "}
      {children}
      <CopyableHeader>{children}</CopyableHeader>
    </h2>
  );
};

export const createH3Render = ({ node, children }) => {
  return (
    <h3
      className="markdown-header"
      id={string_to_slug(children?.toString() || "")}
    >
      {"==> "}
      {children} <CopyableHeader>{children}</CopyableHeader>
    </h3>
  );
};

export const createH4Render = ({ node, children }) => {
  return (
    <h3
      className="markdown-header"
      id={string_to_slug(children?.toString() || "")}
    >
      {"===> "}
      {children} <CopyableHeader>{children}</CopyableHeader>
    </h3>
  );
};
