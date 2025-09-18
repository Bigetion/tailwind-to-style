import { createBorderColorGenerator } from "../utils/baseGenerator.js";

export default createBorderColorGenerator("border", "border-color", {
  themeKey: "borderColor",
  opacityKey: "border",
  customPrefix: "border-color",
});
