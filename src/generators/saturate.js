import { createDualClassGenerator } from "../utils/baseGenerator.js";

export default createDualClassGenerator({
  prefix: "saturate",
  themeKey: "saturate",
  handleDefaultKey: true,
  mainClass: {
    property: "--saturate",
    varsKey: "filter",
  },
  secondaryClass: {
    prefix: "backdrop-saturate",
    property: "--backdrop-saturate",
    varsKey: "backdropFilter",
  },
});
