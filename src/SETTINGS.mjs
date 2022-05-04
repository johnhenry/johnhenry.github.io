import * as defaults from "./DEFAULTS.mjs";
export default defaults;

export const SITE_AUTHOR =
  import.meta.env.PUBLIC_SITE_AUTHOR || defaults.SITE_AUTHOR;

export const SITE_TITLE =
  import.meta.env.PUBLIC_SITE_TITLE || defaults.SITE_TITLE;

export const SITE_FAVICON_PATH =
  import.meta.env.PUBLIC_SITE_FAVICON_PATH || defaults.SITE_FAVICON_PATH;

export const SITE_FAVICON_TYPE =
  import.meta.env.PUBLIC_SITE_FAVICON_TYPE || defaults.SITE_FAVICON_TYPE;

export const SITE_SERVICE_WORKER =
  import.meta.env.PUBLIC_SITE_SERVICE_WORKER || defaults.SITE_SERVICE_WORKER;

export const SITE_BASE_PATH =
  import.meta.env.PUBLIC_SITE_BASE_PATH || defaults.SITE_BASE_PATH;

export const SITE_CDN_URL =
  import.meta.env.PUBLIC_SITE_CDN_URL || defaults.SITE_CDN_URL;

SITE_CDN_URL;
export const SITE_BLOG_PAGE_SIZE =
  Number(import.meta.env.PUBLIC_SITE_BLOG_PAGE_SIZE) ||
  defaults.SITE_BLOG_PAGE_SIZE;

export const SITE_LIB_URL =
  import.meta.env.PUBLIC_SITE_LIB_URL || defaults.SITE_LIB_URL;

export const SITE_CANONICAL_URL =
  import.meta.env.PUBLIC_SITE_CANONICAL_URL || defaults.SITE_CANONICAL_URL;

export const SITE_DESCRIPTION =
  import.meta.env.PUBLIC_SITE_DESCRIPTION || defaults.SITE_DESCRIPTION;

export const SITE_KEYWORDS = import.meta.env.PUBLIC_SITE_KEYWORDS
  ? import.meta.env.PUBLIC_SITE_KEYWORDS.split(",")
  : defaults.SITE_KEYWORDS;

export const TAG_MANAGER_ID =
  import.meta.env.PUBLIC_TAG_MANAGER_ID || defaults.TAG_MANAGER_ID;

export const BUILD_DATE =
  import.meta.env.PUBLIC_BUILD_DATE || defaults.BUILD_DATE;
export const BUILD_HASH =
  import.meta.env.PUBLIC_BUILD_HASH || defaults.BUILD_HASH;
export const BUILD_META =
  import.meta.env.PUBLIC_BUILD_META || defaults.BUILD_META;

//
export const SITE_FAVICON = `/${SITE_FAVICON_PATH}`;
