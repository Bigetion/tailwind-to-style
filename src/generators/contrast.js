import { createDualClassGenerator } from "../utils/baseGenerator.js";

export default createDualClassGenerator({
  prefix: "contrast",
  themeKey: "contrast",
  handleDefaultKey: true,
  mainClass: {
    property: "--contrast",
    varsKey: "filter"
  },
  secondaryClass: {
    prefix: "backdrop-contrast",
    property: "--backdrop-contrast",
    varsKey: "backdropFilter"
  }
});
