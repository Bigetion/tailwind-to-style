import { createDefaultKeyGenerator } from "../utils/baseGenerator.js";

export default createDefaultKeyGenerator({
  prefix: "text-shadow-opacity",
  property: "--text-shadow-opacity",
  themeKey: "textShadowOpacity",
});
