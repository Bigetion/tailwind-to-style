import { createArrayOptionsGenerator } from "../utils/baseGenerator.js";

export default createArrayOptionsGenerator({
  prefix: "object",
  property: "object-fit",
  options: ["contain", "cover", "fill", "none", "scale-down"],
});
