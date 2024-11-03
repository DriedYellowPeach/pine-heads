import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import CodeBlockTitle from "./CodeBlockTitle/CodeBlockTitle";

import "../styles/markdown.css";

const MarkdownRenderer = ({ markdown }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    window.onstorage = () => {
      setTheme(window.localStorage.getItem("theme"));
    };
  }, []);

  return (
    <main>
      <div className="container  markdown">
        <div className="intro"></div>
        <Markdown
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <div className="markdown codeblock">
                  <div className="filetype">
                    <CodeBlockTitle language={match[1]} />
                  </div>
                  <SyntaxHighlighter
                    style={theme === "dark" ? oneDark : oneLight}
                    PreTag="div"
                    language={match[1]}
                    showLineNumbers={true}
                    className={"syntax-highlighter"}
                    customStyle={{
                      borderTopRightRadius: 0,
                      borderTopLeftRadius: 0,
                      margin: 0,
                    }}
                    lineNumberStyle={{
                      textAlign: "left",
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
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
