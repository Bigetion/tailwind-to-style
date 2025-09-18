import { createCustomValueGenerator } from "../utils/baseGenerator.js";

export default createCustomValueGenerator({
  prefix: "bg",
  customPrefix: "bg-image",
  property: "background-image", 
  themeKey: "backgroundImage"
});
