import { createMultiAxisGenerator } from "../utils/baseGenerator.js";

export default createMultiAxisGenerator({
  prefix: "overscroll",
  mainProperty: "overscroll-behavior",
  xProperty: "overscroll-behavior-x",
  yProperty: "overscroll-behavior-y", 
  values: ["auto", "contain", "none"]
});
