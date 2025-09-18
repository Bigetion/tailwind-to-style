import { createArrayOptionsGenerator } from "../utils/baseGenerator.js";

export default createArrayOptionsGenerator("text", "text-wrap", [
  "wrap",
  "nowrap",
  "balance",
  "pretty",
]);
