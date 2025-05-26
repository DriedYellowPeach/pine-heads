import { Link } from "react-router-dom";
import "../styles/me.css";
import me_pic from "../assets/aboutme/me.jpeg";
import bicycle from "../assets/aboutme/bicycle.png";
import tire from "../assets/aboutme/tire.png";
import repairing from "../assets/aboutme/repairing.png";
import ray_tracer from "../assets/aboutme/ray_tracer.png";
import nvim from "../assets/aboutme/nvim-preview.png";
import AnimatedPic from "../components/AnimatedPicture/AnimatedPic.jsx";
import ImportAllImages from "../utils/ImportAllImages";

const ShinyBox = ImportAllImages(
  require.context("../assets/animated/rotation/", false, /\.png$/),
);

const RandomBox = ImportAllImages(
  require.context("../assets/animated/rotation_random_axis/", false, /\.png$/),
);

const Me = () => {
  return (
    <main>
      <div className="container">
        <header className="intro">
          <h1>
            Hello! I am Neil <i className="nf nf-fae-meat"></i>
          </h1>
          <h3>About Me 🤓</h3>

          <div className="aboutme">
            <div className="left">
              <p>
                I’m Neil Wang, a passionate enthusiast of system programming,
                cloud-native technologies, and computer graphics programming.
                Currently, I am pursuing my Master’s degree in Computer Science
                at Northeastern University.
              </p>
            </div>
            <img className="right" src={me_pic} alt="Neil Wang"></img>
          </div>

          <hr className="sep" />

          <div className="aboutme">
            <div>
              <p>
                Currently, I am very interested in computer graphics. And I hope
                to work in this field in my future career. Here is a
                <Link to="https://www.driedyellowpeach.us/posts/building-a-ray-tracer">
                  {" "}
                  ray tracer{" "}
                </Link>
                I built using Rust.
              </p>
            </div>
            <img className="right" src={ray_tracer} alt="Neil Wang"></img>
          </div>

          <div className="aboutme">
            <AnimatedPic className="right" images={ShinyBox} fps={60} />
            <AnimatedPic className="right" images={RandomBox} fps={60} />
            <div>
              <p>
                I built this shiny spinning effect using only Image processing
                library(for manipulating pixels) and matrices multiplication(for
                spinning and perspective view)
              </p>
            </div>
          </div>

          <hr className="sep" />

          <div className="aboutme">
            <img className="right" src={nvim} alt="nvim preview"></img>
            <div>
              <p>
                This is my Neovim dashboard customized with ASCII art. I really
                love tinkering with Neovim and fine-tuning my development setup
                to suit my workflow.
              </p>
            </div>
          </div>

          <hr className="sep" />

          <div className="aboutme">
            <div>
              <p>
                I like cycling. There’s something therapeutic about being out on
                the road, lost in thought, with nothing but the sound of nature
                or the city buzzing around me.
              </p>
            </div>
            <img className="right" src={bicycle} alt="Neil Wang"></img>
          </div>

          <br />

          <div className="aboutme">
            <img className="right" src={repairing} alt="Neil Wang"></img>
            <img className="right" src={tire} alt="Neil Wang"></img>
            <div>
              <p>And I consider myself good flat tire fixer.</p>
            </div>
          </div>

          <hr className="sep" />

          <h3>Playground</h3>
          <ul>
            <li>
              <h5>
                <Link to="playground/canvas">
                  Handwriting Digit Recognition
                </Link>
              </h5>
            </li>
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
