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

export const SITE_AUTHOR = import.meta.env.SITE_AUTHOR || defaults.SITE_AUTHOR;

export const SITE_TITLE = import.meta.env.SITE_TITLE || defaults.SITE_TITLE;

export const SITE_FAVICON_PATH =
  import.meta.env.SITE_FAVICON_PATH || defaults.SITE_FAVICON_PATH;

export const SITE_FAVICON_TYPE =
  import.meta.env.SITE_FAVICON_TYPE || defaults.SITE_FAVICON_TYPE;

export const SITE_SERVICE_WORKER =
  import.meta.env.SITE_SERVICE_WORKER || defaults.SITE_SERVICE_WORKER;

export const SITE_BASE_PATH =
  import.meta.env.SITE_BASE_PATH || defaults.SITE_BASE_PATH;

export const SITE_BLOG_PAGE_SIZE =
  Number(import.meta.env.SITE_BLOG_PAGE_SIZE) || defaults.SITE_BLOG_PAGE_SIZE;

export const SITE_LIB_URL =
  import.meta.env.SITE_LIB_URL || defaults.SITE_LIB_URL;

export const SITE_CANONICAL_URL =
  import.meta.env.SITE_CANONICAL_URL || defaults.SITE_CANONICAL_URL;

export const SITE_DESCRIPTION =
  import.meta.env.SITE_DESCRIPTION || defaults.SITE_DESCRIPTION;

export const SITE_KEYWORDS = import.meta.env.SITE_KEYWORDS
  ? import.meta.env.SITE_KEYWORDS.split(",")
  : defaults.SITE_KEYWORDS;

export const TAG_MANAGER_ID =
  import.meta.env.TAG_MANAGER_ID || defaults.TAG_MANAGER_ID;

export const BUILD_DATE = import.meta.env.BUILD_DATE || defaults.BUILD_DATE;
export const BUILD_HASH = import.meta.env.BUILD_HASH || defaults.BUILD_HASH;
export const BUILD_META = import.meta.env.BUILD_META || defaults.BUILD_META;

//
export const SITE_FAVICON = `${SITE_BASE_PATH}${SITE_FAVICON_PATH}`;
