/**
 * Fluid Design System Generator
 * 
 * Generates fluid responsive utilities using CSS clamp().
 * Eliminates breakpoint hell by making values smoothly scale 
 * between viewport sizes without media queries.
 * 
 * @module generators/fluid
 */

import { generateCssString } from "../utils/index";

/**
 * Calculate fluid clamp() value from min and max sizes
 * Uses viewport-relative scaling with a 320px-1920px range by default
 */
function fluidClamp(minVal, maxVal, minVp = "20rem", maxVp = "120rem") {
  const minNum = parseFloat(minVal);
  const maxNum = parseFloat(maxVal);
  const minUnit = minVal.replace(/[\d.]/g, "");
  const maxUnit = maxVal.replace(/[\d.]/g, "");

  // If units differ, use the max unit
  const unit = maxUnit || minUnit || "rem";

  // Calculate slope: (maxSize - minSize) / (maxViewport - minViewport)
  const slope = (maxNum - minNum) / (120 - 20); // rem-based viewport range
  const intercept = minNum - slope * 20;

  // Preferred value: intercept + slope * 100vw (in appropriate unit)
  // Use cqi (container query inline) when possible for component-level fluidity
  const preferred = `${intercept.toFixed(4)}${unit} + ${(slope * 100).toFixed(4)}vi`;

  return `clamp(${minVal}, ${preferred}, ${maxVal})`;
}

/**
 * Default fluid scales — maps static tokens to fluid ranges
 */
const FLUID_SCALES = {
  // Font sizes (rem)
  "text-xs": { min: "0.75rem", max: "0.875rem" },
  "text-sm": { min: "0.875rem", max: "1rem" },
  "text-base": { min: "1rem", max: "1.125rem" },
  "text-lg": { min: "1.125rem", max: "1.375rem" },
  "text-xl": { min: "1.25rem", max: "1.625rem" },
  "text-2xl": { min: "1.5rem", max: "2rem" },
  "text-3xl": { min: "1.875rem", max: "2.5rem" },
  "text-4xl": { min: "2.25rem", max: "3.25rem" },
  "text-5xl": { min: "3rem", max: "4.5rem" },
  "text-6xl": { min: "3.75rem", max: "5.5rem" },
  "text-7xl": { min: "4.5rem", max: "7rem" },
  "text-8xl": { min: "6rem", max: "9rem" },
  "text-9xl": { min: "8rem", max: "12rem" },

  // Spacing (rem)
  "space-0": { min: "0rem", max: "0rem" },
  "space-px": { min: "1px", max: "1px" },
  "space-0.5": { min: "0.125rem", max: "0.1875rem" },
  "space-1": { min: "0.25rem", max: "0.375rem" },
  "space-1.5": { min: "0.375rem", max: "0.5rem" },
  "space-2": { min: "0.5rem", max: "0.75rem" },
  "space-2.5": { min: "0.625rem", max: "0.875rem" },
  "space-3": { min: "0.75rem", max: "1rem" },
  "space-3.5": { min: "0.875rem", max: "1.125rem" },
  "space-4": { min: "1rem", max: "1.5rem" },
  "space-5": { min: "1.25rem", max: "1.875rem" },
  "space-6": { min: "1.5rem", max: "2.25rem" },
  "space-7": { min: "1.75rem", max: "2.625rem" },
  "space-8": { min: "2rem", max: "3rem" },
  "space-9": { min: "2.25rem", max: "3.375rem" },
  "space-10": { min: "2.5rem", max: "3.75rem" },
  "space-12": { min: "3rem", max: "4.5rem" },
  "space-14": { min: "3.5rem", max: "5.25rem" },
  "space-16": { min: "4rem", max: "6rem" },
  "space-20": { min: "5rem", max: "7.5rem" },
  "space-24": { min: "6rem", max: "9rem" },
  "space-28": { min: "7rem", max: "10.5rem" },
  "space-32": { min: "8rem", max: "12rem" },
  "space-36": { min: "9rem", max: "13.5rem" },
  "space-40": { min: "10rem", max: "15rem" },
  "space-44": { min: "11rem", max: "16.5rem" },
  "space-48": { min: "12rem", max: "18rem" },
  "space-52": { min: "13rem", max: "19.5rem" },
  "space-56": { min: "14rem", max: "21rem" },
  "space-60": { min: "15rem", max: "22.5rem" },
  "space-64": { min: "16rem", max: "24rem" },
  "space-72": { min: "18rem", max: "27rem" },
  "space-80": { min: "20rem", max: "30rem" },
  "space-96": { min: "24rem", max: "36rem" },
};

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;
  const prefix = `${globalPrefix}fluid`;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    let cssString = "";

    // Fluid font sizes
    Object.entries(FLUID_SCALES).forEach(([key, { min, max }]) => {
      if (key.startsWith("text-")) {
        const sizeKey = key.replace("text-", "");
        cssString += `
          ${prefix}-text-${sizeKey} {
            font-size: ${fluidClamp(min, max)};
          }
        `;
      }
    });

    // Fluid spacing (padding, margin, gap)
    Object.entries(FLUID_SCALES).forEach(([key, { min, max }]) => {
      if (key.startsWith("space-")) {
        const sizeKey = key.replace("space-", "");
        const clamped = fluidClamp(min, max);

        // Padding
        cssString += `
          ${prefix}-p-${sizeKey} {
            padding: ${clamped};
          }
          ${prefix}-px-${sizeKey} {
            padding-left: ${clamped};
            padding-right: ${clamped};
          }
          ${prefix}-py-${sizeKey} {
            padding-top: ${clamped};
            padding-bottom: ${clamped};
          }
          ${prefix}-pt-${sizeKey} {
            padding-top: ${clamped};
          }
          ${prefix}-pr-${sizeKey} {
            padding-right: ${clamped};
          }
          ${prefix}-pb-${sizeKey} {
            padding-bottom: ${clamped};
          }
          ${prefix}-pl-${sizeKey} {
            padding-left: ${clamped};
          }
        `;

        // Margin
        cssString += `
          ${prefix}-m-${sizeKey} {
            margin: ${clamped};
          }
          ${prefix}-mx-${sizeKey} {
            margin-left: ${clamped};
            margin-right: ${clamped};
          }
          ${prefix}-my-${sizeKey} {
            margin-top: ${clamped};
            margin-bottom: ${clamped};
          }
          ${prefix}-mt-${sizeKey} {
            margin-top: ${clamped};
          }
          ${prefix}-mr-${sizeKey} {
            margin-right: ${clamped};
          }
          ${prefix}-mb-${sizeKey} {
            margin-bottom: ${clamped};
          }
          ${prefix}-ml-${sizeKey} {
            margin-left: ${clamped};
          }
        `;

        // Gap
        cssString += `
          ${prefix}-gap-${sizeKey} {
            gap: ${clamped};
          }
          ${prefix}-gap-x-${sizeKey} {
            column-gap: ${clamped};
          }
          ${prefix}-gap-y-${sizeKey} {
            row-gap: ${clamped};
          }
        `;
      }
    });

    // Fluid width / height percentages
    const fluidSizes = {
      "1/4": { min: "20%", max: "25%" },
      "1/3": { min: "28%", max: "33.333%" },
      "1/2": { min: "45%", max: "50%" },
      "2/3": { min: "60%", max: "66.666%" },
      "3/4": { min: "70%", max: "75%" },
      full: { min: "100%", max: "100%" },
    };

    Object.entries(fluidSizes).forEach(([key, { min, max }]) => {
      cssString += `
        ${prefix}-w-${key} {
          width: ${fluidClamp(min, max)};
        }
        ${prefix}-h-${key} {
          height: ${fluidClamp(min, max)};
        }
      `;
    });

    // Container-relative fluid sizes (using cqi/cqb for true component fluidity)
    cssString += `
      ${prefix}-text-cqi-1 {
        font-size: clamp(0.75rem, 0.5rem + 1cqi, 1rem);
      }
      ${prefix}-text-cqi-2 {
        font-size: clamp(0.875rem, 0.6rem + 1.5cqi, 1.25rem);
      }
      ${prefix}-text-cqi-3 {
        font-size: clamp(1rem, 0.7rem + 2cqi, 1.5rem);
      }
      ${prefix}-text-cqi-4 {
        font-size: clamp(1.25rem, 0.8rem + 3cqi, 2rem);
      }
      ${prefix}-text-cqi-5 {
        font-size: clamp(1.5rem, 0.9rem + 4cqi, 3rem);
      }
    `;

    // Arbitrary fluid support: fluid-[1rem_2rem]
    cssString += `
      ${prefix}-custom {
        --fluid-min: custom_value;
        --fluid-max: custom_value;
      }
    `;

    return cssString;
  }, configOptions);

  return responsiveCssString;
}
