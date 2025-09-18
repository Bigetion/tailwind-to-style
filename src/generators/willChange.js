import { createStaticOptionsGenerator } from "../utils/baseGenerator.js";

export default createStaticOptionsGenerator("will-change", "will-change", {
  values: {
    auto: "auto",
    scroll: "scroll-position",
    contents: "contents",
    transform: "transform",
  },
});
