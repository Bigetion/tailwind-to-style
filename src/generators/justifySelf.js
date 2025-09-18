import { createArrayOptionsGenerator } from "../utils/baseGenerator.js";

export default createArrayOptionsGenerator("justify-self", "justify-self", {
  values: ["auto", "start", "end", "center", "stretch"],
});
