import { createStaticOptionsGenerator } from "../utils/baseGenerator.js";

export default createStaticOptionsGenerator("resize", "resize", {
  values: {
    none: "none",
    y: "vertical",
    x: "horizontal",
    "": "both", // default case - empty string for just "resize"
  },
});
