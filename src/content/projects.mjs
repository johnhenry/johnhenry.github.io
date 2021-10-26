import { SITE_LIB_URL } from "../SETTINGS.mjs";
const image =
  "https://johnhenry.github.io/vendor/img/www.pexels.com/pixabay/turned-on-computer-monitor-displaying-text-300.jpg";

const image2 =
  "https://johnhenry.github.io/vendor/img/_/bufka.karolina/cat-in-sun.jpg";

export default [
  {
    title: "Bash Command Line tools",
    description: "A collection of tools that I find useful.",
    href: "https://johnhenry.github.io/lib/bash",
    image,
  },
  {
    title: "Standard Library -- set of components for building applications.",
    description: "Click here",
    href: SITE_LIB_URL,
    image: image2,
  },
  {
    title: "Forsnaken -- Multiplayer snake game",
    description: "A modular snake game",
    href: "https://johnhenry.github.io/forsnaken",
    image,
  },
  {
    title: "HTML Builder",
    description: "Build HTML with components",
    href: "https://johnhenry.github.io/htmlbuilder",
    image: image2,
  },
  {
    title: "Blog",
    description: "Thoughts and musings",
    href: "https://johnhenry.github.io/blog",
    image,
  },
];
