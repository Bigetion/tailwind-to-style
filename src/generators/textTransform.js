import { createStaticOptionsGenerator } from "../utils/baseGenerator.js";

export default createStaticOptionsGenerator("", "text-transform", {
  values: {
    uppercase: "uppercase",
    lowercase: "lowercase",
    capitalize: "capitalize",
    "normal-case": "none",
  },
});
