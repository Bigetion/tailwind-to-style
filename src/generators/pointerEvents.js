import { createStaticOptionsGenerator } from "../utils/baseGenerator.js";

export default createStaticOptionsGenerator({
  options: {
    "pointer-events-none": { "pointer-events": "none" },
    "pointer-events-auto": { "pointer-events": "auto" },
  },
});
