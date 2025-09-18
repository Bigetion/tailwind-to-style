import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}aspect`;
  const { spacing = {} } = theme;

  // DRY: Aspect ratio axis configurations
  const aspectAxes = [
    {
      suffix: "-h",
      properties: {
        "--aspect-h": "${key}",
      },
    },
    {
      suffix: "-w",
      properties: {
        position: "relative",
        "padding-bottom": "calc(var(--aspect-h) / var(--aspect-w) * 100%)",
        "--aspect-w": "${key}",
      },
    },
  ];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(spacing, (key) => {
      return aspectAxes
        .map(({ suffix, properties }) => {
          const className = `${prefix}${suffix}-${key}`;
          const cssProps = Object.entries(properties)
            .map(
              ([prop, val]) =>
                `            ${prop}: ${val.replace("${key}", key)};`
            )
            .join("\n");

          return `
          ${className} {
${cssProps}
          }`;
        })
        .join("");
    });
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
