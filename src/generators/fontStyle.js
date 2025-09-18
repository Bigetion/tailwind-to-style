import { createStaticOptionsGenerator } from "../utils/baseGenerator.js";

export default createStaticOptionsGenerator("", "font-style", {
  values: {
    italic: "italic",
    "not-italic": "normal",
  },
});
