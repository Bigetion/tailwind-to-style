import { createDualClassGenerator } from "../utils/baseGenerator.js";

export default createDualClassGenerator({
  prefix: "invert",
  themeKey: "invert",
  handleDefaultKey: true,
  mainClass: {
    property: "--invert",
    varsKey: "filter"
  },
  secondaryClass: {
    prefix: "backdrop-invert",
    property: "--backdrop-invert",
    varsKey: "backdropFilter"
  }
});
