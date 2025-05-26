import { Link } from "@mui/material";
import DrawingCanvas from "../components/Canvas";

function CanvasWrapper() {
  return (
    <main>
      <div className="container">
        <div>
          <header className="intro">
            <h1>Digit Recoginition</h1>
            <div className="intro-description">
              <p>
                This project is about digit recognition using Rust, where I
                build a neural network from scratch and trained on the MNIST
                dataset. The github repo for this project is{" "}
                <a href="https://github.com/DriedYellowPeach/nn-rs"> nn-rs </a>.
                You can try it out by drawing digits on the pad with your
                cursor, then clicking the <strong>Predict</strong> button to see
                the recognition result.
              </p>
            </div>
          </header>

          <DrawingCanvas />
        </div>
      </div>
    </main>
  );
}

export default CanvasWrapper;
