import { createConditionalSuffixGenerator } from "../utils/baseGenerator.js";

export default createConditionalSuffixGenerator({
  prefix: "outline",
  defaultProperty: "outline-style",
  values: ["none", "solid", "dashed", "dotted", "double"],
  defaultValue: "solid",
  specialCases: {
    none: {
      suffix: "-none",
      properties: {
        outline: "2px solid transparent",
        "outline-offset": "2px",
      },
    },
  },
});
