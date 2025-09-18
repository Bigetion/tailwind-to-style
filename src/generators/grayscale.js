import { createDualClassGenerator } from "../utils/baseGenerator.js";

export default createDualClassGenerator({
  prefix: "grayscale",
  themeKey: "grayscale",
  handleDefaultKey: true,
  mainClass: {
    property: "--grayscale",
    varsKey: "filter"
  },
  secondaryClass: {
    prefix: "backdrop-grayscale",
    property: "--backdrop-grayscale",
    varsKey: "backdropFilter"
  }
});
