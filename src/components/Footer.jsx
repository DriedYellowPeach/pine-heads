import React from "react";

import "../styles/footer.css";

import computerIcon from "../assets/computer.svg";
import bugIcon from "../assets/bug.svg";
import diskIcon from "../assets/disk.svg";
import memoryIcon from "../assets/memory.svg";
import cpuIcon from "../assets/cpu.svg";
import wwwIcon from "../assets/www.svg";

import coffeeIcon from "../assets/coffee.svg";
import githubIcon from "../assets/github.svg";
import linkedinIcon from "../assets/linkedin.svg";

import nvimIcon from "../assets/nvim.png";
import reactIcon from "../assets/react.png";
import actixWebIcon from "../assets/actix-web.png";
import taniaIcon from "../assets/tania.png";
import alacrittyIcon from "../assets/alacritty.png";
import rustIcon from "../assets/rust.png";
import lazyVimIcon from "../assets/lazy.svg";
import nfIcon from "../assets/nerd-fonts-logo.png";

const icon_banner = [
  computerIcon,
  bugIcon,
  diskIcon,
  memoryIcon,
  cpuIcon,
  wwwIcon,
];

const links = [
  {
    url: "https://ko-fi.com/neilwang",
    label: "Buy me a coffee",
    icon: coffeeIcon,
  },
  {
    url: "https://github.com/DriedYellowPeach",
    label: "Github",
    icon: githubIcon,
  },
  {
    url: "https://www.linkedin.com/in/neil-wang-b7849b310/",
    label: "LinkedIn",
    icon: linkedinIcon,
  },
];

const acknoledgements = [
  {
    url: "https://github.com/taniarascia/taniarascia.com",
    label: "Tania Rascia's blog",
    icon: taniaIcon,
  },
  {
    url: "https://www.rust-lang.org/",
    label: "Rust",
    icon: rustIcon,
  },
  {
    url: "https://neovim.io/",
    label: "Neovim",
    icon: nvimIcon,
  },
  { url: "https://react.dev/", label: "React", icon: reactIcon },
  {
    url: "https://actix.rs/",
    label: "Actix-web",
    icon: actixWebIcon,
    flag: true,
  },
  {
    url: "https://www.lazyvim.org/",
    label: "Lazyvim",
    icon: lazyVimIcon,
  },
  {
    url: "https://alacritty.org/",
    label: "Alacritty",
    icon: alacrittyIcon,
  },
  {
    url: "https://www.nerdfonts.com/",
    label: "Nerdfonts",
    icon: nfIcon,
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <section>
        <span className="banner">
          {icon_banner.map((icon) => (
            <object
              alt="icon"
              aria-label="icon"
              type="image/svg+xml"
              data={icon}
              className="logo icon"
              key={icon}
            ></object>
          ))}
        </span>

        <span className="split"></span>

        <nav className="morelink">
          {links.map((link) => (
            <a
              href={link.url}
              title={link.label}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
              className="button small"
            >
              <object
                alt="icon"
                aria-label="icon"
                type="image/svg+xml"
                data={link.icon}
                className="icon"
              ></object>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
        <span className="ack">Acknowledgements and Built With:</span>
        <nav className="ack">
          {acknoledgements.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
            >
              <img
                src={link.icon}
                alt="icon"
                className={`${link.flag ? "special" : "normal"}`}
              ></img>
              {link.label}
            </a>
          ))}
        </nav>
      </section>
    </footer>
  );
};

export default Footer;
