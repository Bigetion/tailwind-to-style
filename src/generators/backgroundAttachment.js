import { createArrayOptionsGenerator } from "../utils/baseGenerator.js";

export default createArrayOptionsGenerator("bg", "background-attachment", [
  "fixed",
  "local",
  "scroll",
]);
