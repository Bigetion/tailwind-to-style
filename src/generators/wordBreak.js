import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix } = configOptions;

  const responsiveCssString = generateCssString(() => {
    const cssString = `
				${prefix}break-normal {
					overflow-wrap: normal;
					word-break: normal;
				}
				${prefix}break-words {
					overflow-wrap: break-word;
				}
				${prefix}break-all {
					word-break: break-all;
				}
				${prefix}break-keep {
					word-break: keep-all;
				}
			`;
    return cssString;
  }, configOptions);

  return responsiveCssString;
}
