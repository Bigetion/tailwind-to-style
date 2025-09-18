import { createArrayOptionsGenerator } from "../utils/baseGenerator.js";

export default createArrayOptionsGenerator("justify-items", "justify-items", {
  values: ["auto", "start", "end", "center", "stretch"],
});
