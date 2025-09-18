import { createArrayOptionsGenerator } from "../utils/baseGenerator.js";

export default createArrayOptionsGenerator({
  prefix: "decoration",
  property: "text-decoration-style",
  options: ["solid", "double", "dotted", "dashed", "wavy"]
});
