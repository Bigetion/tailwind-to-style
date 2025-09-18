import { createMultiPropertyStaticGenerator } from "../utils/baseGenerator.js";

export default createMultiPropertyStaticGenerator({
  basePrefix: "break",
  classes: {
    normal: {
      "overflow-wrap": "normal",
      "word-break": "normal",
    },
    words: {
      "overflow-wrap": "break-word",
    },
    all: {
      "word-break": "break-all",
    },
    keep: {
      "word-break": "keep-all",
    },
  },
});
