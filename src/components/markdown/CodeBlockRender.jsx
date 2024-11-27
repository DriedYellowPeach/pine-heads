import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import CodeBlockTitle from "../CodeBlockTitle/CodeBlockTitle";

function createCodeBlockRender(theme) {
  return function CodeBlockRender({
    node,
    inline,
    className,
    children,
    ...props
  }) {
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
  };
}

export default createCodeBlockRender;
