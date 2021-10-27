import { SITE_LIB_URL, SITE_BASE_PATH } from "../SETTINGS.mjs";
const image = `${SITE_BASE_PATH}vendor/img/www.pexels.com/pixabay/turned-on-computer-monitor-displaying-text-300.jpg`;
export default [
  {
    title: "Bash Command Line tools",
    description: "A collection of tools that I find useful.",
    href: "https://johnhenry.github.io/lib/bash",
    image: `${SITE_BASE_PATH}personal/image/bufka.karolina/cat-in-sun.jpg`,
  },
  {
    title: "Standard Library -- set of components for building applications.",
    description: "Click here",
    href: SITE_LIB_URL,
    image,
  },
  {
    title: "Forsnaken -- Multiplayer snake game",
    description: "A modular snake game",
    href: "https://johnhenry.github.io/forsnaken",
    image: `${SITE_BASE_PATH}personal/image/bufka.karolina/cat-in-towel.jpg`,
  },
  {
    title: "HTML Builder",
    description: "Build HTML with components",
    href: "https://johnhenry.github.io/htmlbuilder",
    image,
  },
  {
    title: "Blog",
    description: "Thoughts and musings",
    href: "https://johnhenry.github.io/blog",
    image: `${SITE_BASE_PATH}personal/image/bufka.karolina/cat-on-chair.jpg`,
  },
];
