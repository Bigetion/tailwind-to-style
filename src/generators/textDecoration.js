import { createStaticOptionsGenerator } from "../utils/baseGenerator.js";

export default createStaticOptionsGenerator("", "text-decoration", {
  values: {
    underline: "underline",
    overline: "overline",
    "line-through": "line-through",
    "no-underline": "none",
  },
});
