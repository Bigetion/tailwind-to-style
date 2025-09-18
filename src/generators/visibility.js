import { createStaticOptionsGenerator } from "../utils/baseGenerator.js";

export default createStaticOptionsGenerator("", "visibility", {
  values: {
    visible: "visible",
    collapse: "collapse",
    invisible: "hidden",
  },
});
