import React from "react";
import { visit } from "unist-util-visit";

// Define the custom plugin
export function rehypeBlockquotePlugin() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "blockquote") {
        const textContent = node.children[1]?.children[0]?.value;
        let type = null;

        // Match the control string
        if (textContent.startsWith("[!NOTE]")) {
          type = "note";
        } else if (textContent.startsWith("[!WARNING]")) {
          type = "warning";
        } else if (textContent.startsWith("[!IMPORTANT]")) {
          type = "important";
        } else if (textContent.startsWith("[!ERROR]")) {
          type = "error";
        } else {
          type = "default";
        }

        if (type) {
          // Remove the control string from the text
          node.children[1].children[0].value = textContent.replace(
            /^\[![A-Z]+\]\s*/,
            "",
          );

          // Add custom class
          node.properties = node.properties || {};
          node.properties.className = `blockquote ${type}`;
        }
      }
    });
  };
}

const NerdFontIcons = {
  note: "nf-fa-sticky_note",
  warning: "nf-fa-warning",
  important: "nf-fa-flag",
  error: "nf-cod-error_small",
  default: "nf-cod-quote",
};

// Render the blockquote with custom styles and icons
export const BlockquoteRenderer = ({ children, className }) => {
  const type = className
    ?.split(" ")
    .find((cls) =>
      ["note", "warning", "important", "error", "default"].includes(cls),
    );
  const iconClassNames = `nf ${NerdFontIcons[type]}`;
  const iconColor = `var(--blockquote-${type}-color`;
  return (
    <blockquote className={className}>
      {/* {type && <span className="blockquote-icon">{BlockquoteIcons[type]}</span>} */}
      {type && <i className={iconClassNames} style={{ color: iconColor }}></i>}
      {children}
    </blockquote>
  );
};
