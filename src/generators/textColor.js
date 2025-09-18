import { createColorGenerator } from "../utils/baseGenerator.js";

export default createColorGenerator("text", "color", {
  themeKey: "textColor", 
  opacityKey: "text",
  customPrefix: "text-color"
});
