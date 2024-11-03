import "./tree.css";

function TreeView({ children }) {
  return (
    <div>
      <ul id="myUL">{children}</ul>
    </div>
  );
}

export default TreeView;
