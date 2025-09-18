import { createMixedStaticGenerator } from "../utils/baseGenerator.js";

export default createMixedStaticGenerator({
  staticClass: {
    name: "truncate",
    properties: {
      overflow: "hidden",
      "text-overflow": "ellipsis",
      "white-space": "nowrap",
    },
  },
  dynamicPrefix: "text",
  dynamicProperty: "text-overflow",
  values: ["ellipsis", "clip"],
});
