import { createDualClassGenerator } from "../utils/baseGenerator.js";

export default createDualClassGenerator({
  prefix: "opacity",
  themeKey: "opacity",
  mainClass: {
    property: "opacity",
    varsKey: "filter"
  },
  secondaryClass: {
    prefix: "backdrop-opacity",
    property: "--backdrop-opacity",
    varsKey: "backdropFilter"
  }
});
