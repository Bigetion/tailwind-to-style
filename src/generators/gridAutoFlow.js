import { createStaticOptionsGenerator } from "../utils/baseGenerator.js";

export default createStaticOptionsGenerator("grid-flow", "grid-auto-flow", {
  values: {
    row: "row",
    col: "column",
    "row-dense": "row dense",
    "col-dense": "column dense",
  },
});
