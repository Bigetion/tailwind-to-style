import { createStaticOptionsGenerator } from "../utils/baseGenerator.js";

export default createStaticOptionsGenerator('place-content', 'place-content', {
  values: {
    start: "start",
    end: "end",
    center: "center",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
    stretch: "stretch",
  }
});
