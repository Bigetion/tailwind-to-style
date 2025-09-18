import { createStaticOptionsGenerator } from "../utils/baseGenerator.js";

export default createStaticOptionsGenerator('', 'isolation', {
  values: {
    isolate: "isolate",
    "isolation-auto": "auto",
  }
});
