import { createArrayOptionsGenerator } from "../utils/baseGenerator.js";

export default createArrayOptionsGenerator({
  prefix: "scroll",
  property: "scroll-behavior",
  options: ["auto", "smooth"],
});
