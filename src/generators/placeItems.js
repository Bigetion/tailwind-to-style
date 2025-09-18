import { createArrayOptionsGenerator } from "../utils/baseGenerator.js";

export default createArrayOptionsGenerator({
  prefix: "place-items",
  property: "place-items",
  options: ["auto", "start", "end", "center", "stretch"],
});
