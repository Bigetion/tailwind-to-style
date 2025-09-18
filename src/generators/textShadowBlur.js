import { createDefaultKeyGenerator } from "../utils/baseGenerator.js";

export default createDefaultKeyGenerator({
  prefix: "text-shadow-blur",
  property: "--text-shadow-blur",
  themeKey: "textShadowBlur",
});
