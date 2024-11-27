import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeRewrite from "rehype-rewrite";
import { visit } from "unist-util-visit";
import remarkGfm from "remark-gfm";

import "./markdown.css";
import endpoints from "../../constants/endpoints";
import createCodeBlockRender from "./CodeBlockRender";
import { rehypeBlockquotePlugin, BlockquoteRenderer } from "./blockquote";

function rehypeWrapImageInContainer() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "img" && parent) {
        // Create a new container element
        const container = {
          type: "element",
          tagName: "div",
          properties: { className: ["image-container"] },
          children: [node], // Place the image as a child of the container
        };

        // Replace the image node with the container
        parent.children[index] = container;
      }
    });
  };
}

const MarkdownRenderer = ({ markdown, slug, title }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const transformSrc = (src) => {
    const baseURL = endpoints.getPostBySlug(slug) + "/";
    if (src.startsWith("./")) {
      return baseURL + src.replace("./", "");
    }
    return src;
  };

  const redirectPlugin = () => {
    return rehypeRewrite({
      rewrite: (node) => {
        if (node.tagName === "img" && node.properties && node.properties.src) {
          node.properties.src = transformSrc(node.properties.src);
        }
      },
    });
  };

  useEffect(() => {
    window.onstorage = () => {
      setTheme(window.localStorage.getItem("theme"));
    };
  }, []);

  return (
    <main>
      <div className="container  markdown">
        <div className="intro title">
          <h1>{title}</h1>
        </div>
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeRaw,
            redirectPlugin,
            rehypeWrapImageInContainer,
            rehypeBlockquotePlugin,
          ]}
          components={{
            blockquote: BlockquoteRenderer,
            code: createCodeBlockRender(theme),
            input({ node, ...props }) {
              console.log(node);
              console.log(props);
              if (props.checked) {
                return (
                  <input type="checkbox" {...props} disabled={false} readOnly />
                );
              }
              return <input type="checkbox" {...props} disabled={true} />;
            },
          }}
        >
          {markdown}
        </Markdown>
      </div>
    </main>
  );
};

export default MarkdownRenderer;
