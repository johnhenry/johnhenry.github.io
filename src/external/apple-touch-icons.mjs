import { SITE_BASE_PATH } from "../SETTINGS.mjs";
export default [512, 384, 256, 192, 128].map((item) => {
  return [`${item}x${item}`, `${SITE_BASE_PATH}image/iajh.${item}.png`];
});
