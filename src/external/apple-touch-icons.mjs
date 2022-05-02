import { SITE_CDN_URL } from "../SETTINGS.mjs";
export default [512, 384, 256, 192, 128].map((item) => {
  return [`${item}x${item}`, `${SITE_CDN_URL}image/iajh.${item}.png`];
});
