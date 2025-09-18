import { createStaticOptionsGenerator } from "../utils/baseGenerator.js";

export default createStaticOptionsGenerator("box", "box-sizing", {
  values: {
    border: "border-box",
    content: "content-box",
  },
});
