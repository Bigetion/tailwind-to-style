import { createArrayOptionsGenerator } from "../utils/baseGenerator.js";

export default createArrayOptionsGenerator({
  prefix: "snap",
  property: "scroll-snap-stop",
  options: ["normal", "always"]
});
