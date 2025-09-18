import { createArrayOptionsGenerator } from "../utils/baseGenerator.js";

export default createArrayOptionsGenerator({
  prefix: "",
  property: "position",
  options: ["static", "fixed", "absolute", "relative", "sticky"]
});
