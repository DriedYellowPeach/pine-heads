import { Link } from "react-router-dom";
import "../styles/me.css";

const Me = () => {
  return (
    <main>
      <div className="container">
        <header className="intro">
          <h1>
            Hello! I am Neil <i className="nf nf-custom-vim"></i>
          </h1>
          <h3>This Blog is under construction</h3>
          <h3>Playground</h3>

          <ul>
            <li>
              <h5>
                <Link to="/loading">Loading Demo</Link>
              </h5>
            </li>

            <li>
              <h5>
                <Link to="/loading2">Loading Demo(smooth in)</Link>
              </h5>
            </li>

            <li>
              <h5>
                <Link to="/notfound">Not Found Demo</Link>
              </h5>
            </li>

            <li>
              <h5>
                <Link to="/internal_error">Internal Service Error Demo</Link>
              </h5>
            </li>
          </ul>
        </header>
      </div>
    </main>
  );
};

export default Me;
