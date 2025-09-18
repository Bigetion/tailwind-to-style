import { createArrayOptionsGenerator } from "../utils/baseGenerator.js";

export default createArrayOptionsGenerator({
  prefix: "origin",
  property: "transform-origin",
  options: [
    "center",
    "top",
    "top-right", 
    "right",
    "bottom-right",
    "bottom",
    "bottom-left",
    "left",
    "top-left"
  ],
  customHandler: (key, value) => ({
    "transform-origin": value.replace("-", " ")
  })
});
