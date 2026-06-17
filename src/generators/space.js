import { generateCssString } from "../utils/index.js";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}space`;

  const { space = {} } = theme;

  const responsiveCssString = generateCssString(() => {
    const generateSpace = (position, key, value) => {
      let spacePosition = "x";
      let margin1 = "left";
      let margin2 = "right";
      if (position === "y") {
        spacePosition = "y";
        margin1 = "top";
        margin2 = "bottom";
      }
      return `
        ${prefix}-${spacePosition}-${key} {
          --space-${spacePosition}-reverse: 0;
          margin-${margin1}: calc(${value} * calc(1 - var(--space-${spacePosition}-reverse)));
          margin-${margin2}: calc(${value} * var(--space-${spacePosition}-reverse));
        }
        -${prefix}-${spacePosition}-${key} {
          --space-${spacePosition}-reverse: 0;
          margin-${margin1}: calc(-${value} * calc(1 - var(--space-${spacePosition}-reverse)));
          margin-${margin2}: calc(-${value} * var(--space-${spacePosition}-reverse));
        }
      `;
    };
    let cssString = "";
    Object.entries(space).forEach(([space, spaceValue]) => {
      cssString += generateSpace("y", space, spaceValue);
      cssString += generateSpace("x", space, spaceValue);
    });
    cssString += `
      ${prefix}-x-reverse {
        --space-x-reverse: 1;
      }
      ${prefix}-y-reverse {
        --space-y-reverse: 1;
      }
    `;
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
