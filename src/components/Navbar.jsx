import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";

import AnimatedIcon from "./AnimatedIcon/AnimatedIcon";

import arcadeIcon from "../assets/arcade.svg";
import "../styles/navbar.css";
import ImportAllImages from "../utils/ImportAllImages";

const moonAnimeIcon = ImportAllImages(
  require.context("../assets/animated/moon", false, /\.png$/),
);

const sunAnimeIcon = ImportAllImages(
  require.context("../assets/animated/sun/", false, /\.png$/),
);

const navEntries = [
  { url: "/blogs", label: "Blogs" },
  { url: "/notes", label: "Notes" },
  { url: "/projects", label: "Projects" },
  { url: "/me", label: "Me" },
];

const brandText = "Neil's Pine";

const Navbar = () => {
  const [theme, setTheme] = useState("dark");

  // Check localStorage for saved theme preference when component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
  }, []);

  const getThemeIcon = () => {
    return theme === "light" ? (
      <AnimatedIcon images={sunAnimeIcon} fps={15} />
    ) : (
      <AnimatedIcon images={moonAnimeIcon} fps={15} />
    );
  };

  const onUpdateTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div>
      <Helmet>
        {theme === "dark" && <link rel="stylesheet" href="/dark-mode.css" />}
      </Helmet>
      <section className="navigation">
        <div className="container">
          <a href="/" className="item brand">
            <object
              alt="icon"
              aria-label="icon"
              type="image/svg+xml"
              data={arcadeIcon}
              className="logo"
              id="computer-svg"
            ></object>
            <span>
              {brandText} <i className="nf nf-fa-tree nav-emoji-pine"></i>
            </span>
          </a>
          <nav>
            {navEntries.map((item) => (
              <div className="nav-item-outer" key={item.url}>
                <NavLink
                  to={item.url}
                  key={item.label}
                  activeclassname="active"
                  className="item"
                >
                  <span>{item.label}</span>
                </NavLink>
              </div>
            ))}

            <div className="theme-toggle">
              <button className="animated-icon" onClick={onUpdateTheme}>
                {getThemeIcon()}
              </button>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
