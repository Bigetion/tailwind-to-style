import { createCustomValueGenerator } from "../utils/baseGenerator.js";

export default createCustomValueGenerator({
  prefix: "bg",
  customPrefix: "bg-size",
  property: "background-size",
  themeKey: "backgroundSize",
});
