import { createArrayOptionsGenerator } from "../utils/baseGenerator.js";

export default createArrayOptionsGenerator(
  "",
  "display",
  [
    "block",
    "inline-block",
    "inline",
    "flex",
    "inline-flex",
    "table",
    "table-caption",
    "table-cell",
    "table-column",
    "table-column-group",
    "table-header-group",
    "table-footer-group",
    "table-row-group",
    "table-row",
    "flow-root",
    "grid",
    "inline-grid",
    "contents",
    "none",
  ],
  {
    customHandler: (selector, key, value, cssProperty) => {
      // Remove extra dash caused by empty prefix
      const cleanSelector = selector.replace("tw--", "tw-");
      const className =
        key === "none" ? cleanSelector.replace(key, "hidden") : cleanSelector;
      return `
          ${className} {
            ${cssProperty}: ${value};
          }
        `;
    },
  }
);
