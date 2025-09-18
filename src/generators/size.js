import { createSimpleGenerator } from "../utils/baseGenerator.js";

export default createSimpleGenerator({
  prefix: "size",
  themeKey: "size",
  customHandler: (key, value) => ({
    width: value,
    height: value,
  }),
});
