import React from "react";
import "./title.css";

// Global mapping of programming languages to Nerd Font classes and highlights
const programmingLangs = {
  rust: { className: "nf-md-language_rust", highlight: "orange" },
  javascript: { className: "nf-md-language_javascript", highlight: "yellow" },
  python: { className: "nf-md-language_python", highlight: "blue" },
  java: { className: "nf-md-language_java", highlight: "green" },
  c: { className: "nf-custom-c", highlight: "azure" },
  cpp: { className: "nf-custom-cpp", highlight: "azure" },
  css: { className: "nf-md-language_css3", highlight: "azure" },
  html: { className: "nf-md-language_html5", highlight: "orange" },
  go: { className: "nf-seti-go", highlight: "azure" },
  typescript: { className: "nf-md-language_typescript", highlight: "azure" },
  bash: { className: "nf-seti-shell", highlight: "green" },
  sql: { className: "nf-md-language_sql", highlight: "orange" },
  lua: { className: "nf-md-language_lua", highlight: "azure" },
  wgsl: { className: "nf-md-alpha_w", highlight: "azure" },

  default: { className: "nf-fa-code", highlight: "blue" },
  // Add more languages as needed
};

const CodeBlockTitle = ({ language }) => {
  // Get the mapping for the specified language
  const lang =
    programmingLangs[language.toLowerCase()] || programmingLangs.default;

  return (
    <span
      className="code-block-title"
      style={{ color: `var(--highlight-${lang.highlight}`, margin: "auto" }}
    >
      <i className={"nf " + lang.className}></i>
      {language}
    </span>
  );
};

export default CodeBlockTitle;
