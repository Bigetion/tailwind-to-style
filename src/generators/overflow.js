import { createMultiAxisGenerator } from "../utils/baseGenerator.js";

export default createMultiAxisGenerator({
  prefix: "overflow",
  mainProperty: "overflow",
  xProperty: "overflow-x", 
  yProperty: "overflow-y",
  values: ["auto", "hidden", "visible", "scroll"],
  staticClasses: [
    {
      name: "scrolling-touch",
      properties: {
        "-webkit-overflow-scrolling": "touch"
      }
    },
    {
      name: "scrolling-auto", 
      properties: {
        "-webkit-overflow-scrolling": "auto"
      }
    }
  ]
});
