import { createMultiPropertyStaticGenerator } from "../utils/baseGenerator.js";

export default createMultiPropertyStaticGenerator({
  classes: {
    "sr-only": {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      "white-space": "nowrap",
      "border-width": "0",
    },
    "not-sr-only": {
      position: "static",
      width: "auto",
      height: "auto",
      padding: "0",
      margin: "0",
      overflow: "visible",
      clip: "auto",
      "white-space": "normal",
    },
    "forced-color-adjust-auto": {
      "forced-color-adjust": "auto",
    },
    "forced-color-adjust-none": {
      "forced-color-adjust": "none",
    },
  },
});
