import { createDualClassGenerator } from "../utils/baseGenerator.js";

export default createDualClassGenerator({
  prefix: "sepia",
  themeKey: "sepia",
  handleDefaultKey: true,
  mainClass: {
    property: "--sepia",
    varsKey: "filter",
  },
  secondaryClass: {
    prefix: "backdrop-sepia",
    property: "--backdrop-sepia",
    varsKey: "backdropFilter",
  },
});
