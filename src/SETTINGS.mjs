import HASH from "./HASH.mjs";

const defaults = {
  SITE_AUTHOR: "John Henry",
  SITE_TITLE: "John Henry",
  SITE_FAVICON_PATH: "image/iajh.png",
  SITE_FAVICON_TYPE: "image/png",
  SITE_SERVICE_WORKER: "",
  SITE_BASE_PATH: "/",
  SITE_BLOG_PAGE_SIZE: 4,
  SITE_LIB_URL: "http://localhost:3001/",
  SITE_CANONICAL_URL: "http://localhost:3000/",
  SITE_DESCRIPTION: "John Henry's Person Portfolio and Blog",
  SITE_KEYWORDS: [],
  TAG_MANAGER_ID: "",
  BUILD_DATE: new Date().toISOString(),
  BUILD_HASH: HASH,
  BUILD_META: "",
};
export default defaults;

export const SITE_AUTHOR = process.env.SITE_AUTHOR || defaults.SITE_AUTHOR;

export const SITE_TITLE = process.env.SITE_TITLE || defaults.SITE_TITLE;

export const SITE_FAVICON_PATH =
  process.env.SITE_FAVICON_PATH || defaults.SITE_FAVICON_PATH;

export const SITE_FAVICON_TYPE =
  process.env.SITE_FAVICON_TYPE || defaults.SITE_FAVICON_TYPE;

export const SITE_SERVICE_WORKER =
  process.env.SITE_SERVICE_WORKER || defaults.SITE_SERVICE_WORKER;

export const SITE_BASE_PATH =
  process.env.SITE_BASE_PATH || defaults.SITE_BASE_PATH;

export const SITE_BLOG_PAGE_SIZE =
  Number(process.env.SITE_BLOG_PAGE_SIZE) || defaults.SITE_BLOG_PAGE_SIZE;

export const SITE_LIB_URL = process.env.SITE_LIB_URL || defaults.SITE_LIB_URL;

export const SITE_CANONICAL_URL =
  process.env.SITE_CANONICAL_URL || defaults.SITE_CANONICAL_URL;

export const SITE_DESCRIPTION =
  process.env.SITE_DESCRIPTION || defaults.SITE_DESCRIPTION;

export const SITE_KEYWORDS = process.env.SITE_KEYWORDS
  ? process.env.SITE_KEYWORDS.split(",")
  : defaults.SITE_KEYWORDS;

export const TAG_MANAGER_ID =
  process.env.TAG_MANAGER_ID || defaults.TAG_MANAGER_ID;

export const BUILD_DATE = process.env.BUILD_DATE || defaults.BUILD_DATE;
export const BUILD_HASH = process.env.BUILD_HASH || defaults.BUILD_HASH;
export const BUILD_META = process.env.BUILD_META || defaults.BUILD_META;

//
export const SITE_FAVICON = `${SITE_BASE_PATH}${SITE_FAVICON_PATH}`;
