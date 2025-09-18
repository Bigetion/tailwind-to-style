import { createCustomValueGenerator } from "../utils/baseGenerator.js";

export default createCustomValueGenerator({
  prefix: "bg",
  customPrefix: "bg-position",
  property: "background-position",
  themeKey: "backgroundPosition"
});
