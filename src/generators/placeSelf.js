import { createArrayOptionsGenerator } from "../utils/baseGenerator.js";

export default createArrayOptionsGenerator({
  prefix: "place-self",
  property: "place-self",
  options: ["auto", "start", "end", "center", "stretch"],
});
