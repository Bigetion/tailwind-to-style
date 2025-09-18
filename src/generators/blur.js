import { createDualClassGenerator } from "../utils/baseGenerator.js";

export default createDualClassGenerator({
  prefix: "blur",
  themeKey: "blur",
  handleDefaultKey: true,
  mainClass: {
    property: "--blur",
    varsKey: "filter"
  },
  secondaryClass: {
    prefix: "backdrop-blur",
    property: "--backdrop-blur",
    varsKey: "backdropFilter"
  }
});
