import { createStaticOptionsGenerator } from "../utils/baseGenerator.js";

export default createStaticOptionsGenerator('content', 'align-content', {
  values: {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
  }
});
