import { createDualClassGenerator } from "../utils/baseGenerator.js";

export default createDualClassGenerator({
  prefix: "brightness",
  themeKey: "brightness",
  handleDefaultKey: true,
  mainClass: {
    property: "--brightness",
    varsKey: "filter"
  },
  secondaryClass: {
    prefix: "backdrop-brightness",
    property: "--backdrop-brightness",
    varsKey: "backdropFilter"
  }
});
