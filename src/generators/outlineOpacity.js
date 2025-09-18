import { createDefaultKeyGenerator } from "../utils/baseGenerator.js";

export default createDefaultKeyGenerator({
  prefix: "outline-opacity",
  property: "--outline-opacity",
  themeKey: "outlineOpacity",
});
