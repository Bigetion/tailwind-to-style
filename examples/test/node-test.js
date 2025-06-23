// Test script for tailwind-to-style library
/*
 * This script demonstrates the usage of the tailwind-to-style library in a Node.js environment
 * It showcases both the tws and twsx functionality with beautified output
 *
 * Run this script with:
 * node examples/test/node-test.js
 *
 * The output will be color-coded in terminals that support ANSI color codes
 */

import { tws, twsx } from "../../dist/index.esm.js";

// Check if terminal supports colors
const supportsColor =
  process.stdout.isTTY &&
  (process.platform !== "win32" ||
    process.env.TERM !== "dumb" ||
    process.env.FORCE_COLOR);

// Console color codes for syntax highlighting
const colors = {
  reset: supportsColor ? "\x1b[0m" : "",
  bright: supportsColor ? "\x1b[1m" : "",
  dim: supportsColor ? "\x1b[2m" : "",
  red: supportsColor ? "\x1b[31m" : "",
  green: supportsColor ? "\x1b[32m" : "",
  yellow: supportsColor ? "\x1b[33m" : "",
  blue: supportsColor ? "\x1b[34m" : "",
  magenta: supportsColor ? "\x1b[35m" : "",
  cyan: supportsColor ? "\x1b[36m" : "",
  white: supportsColor ? "\x1b[37m" : "",
};

// Function to colorize CSS output in the console
function colorizeCSS(css) {
  return css
    .replace(/([^:{}]+):/g, `${colors.blue}$1${colors.reset}:`)
    .replace(/:\s*([^;{}]+);/g, `: ${colors.green}$1${colors.reset};`)
    .replace(/[{}:;]/g, (match) => `${colors.dim}${match}${colors.reset}`)
    .replace(/^([.#][^\s{]+)|\n([.#][^\s{]+)/g, (match, g1, g2) => {
      const selector = g1 || g2;
      return match.replace(
        selector,
        `${colors.magenta}${selector}${colors.reset}`
      );
    });
}

// Function to beautify CSS output
function beautifyCSS(css) {
  // Remove excess whitespace
  let result = css.trim().replace(/\s+/g, " ");

  // Add line breaks after closing braces and semicolons for better readability
  result = result.replace(/}/g, "}\n");

  // Format each rule with proper indentation
  const rules = result.split("\n");
  result = "";

  rules.forEach((rule) => {
    if (!rule.trim()) return;

    // Extract selector and body
    const parts = rule.split("{");
    if (parts.length < 2) return;

    const selector = parts[0].trim();
    const body = parts[1].replace("}", "").trim();

    // Format body with indentation
    const properties = body.split(";").filter((p) => p.trim());
    let formattedBody = "";

    properties.forEach((prop) => {
      if (prop.trim()) {
        // Split at the first colon to handle values that contain colons (like box-shadow)
        const colonIndex = prop.indexOf(":");
        if (colonIndex > -1) {
          const name = prop.substring(0, colonIndex).trim();
          const value = prop.substring(colonIndex + 1).trim();
          formattedBody += `  ${name}: ${value};\n`;
        }
      }
    });

    // Combine selector and formatted body
    result += `${selector} {\n${formattedBody}}\n\n`;
  });

  return result;
}

console.log("=== TAILWIND-TO-STYLE NODE.JS TESTS ===");

// Advise on terminal width for better formatting
console.log(
  `${colors.yellow}Note: For best formatting, use a terminal with width of at least 100 characters${colors.reset}`
);

// Test 1: Basic tws function
console.log("\n1. Basic tws test");
console.log("Input: bg-blue-500 text-white p-4 rounded");
const basicOutput = tws("bg-blue-500 text-white p-4 rounded");
// Fix the first test by handling it as a special case
const beautifiedBasic = basicOutput
  .split(";")
  .filter((p) => p.trim())
  .map((prop) => {
    const colonIndex = prop.indexOf(":");
    if (colonIndex > -1) {
      const name = prop.substring(0, colonIndex).trim();
      const value = prop.substring(colonIndex + 1).trim();
      return `  ${name}: ${value};\n`;
    }
    return "";
  })
  .join("");

console.log("Output:\n" + colorizeCSS(beautifiedBasic));

// Test 2: JSON output
console.log("\n2. JSON output test");
console.log("Input: bg-blue-500 text-white p-4 rounded");
const jsonOutput = tws("bg-blue-500 text-white p-4 rounded", 1);
console.log("Output:", JSON.stringify(jsonOutput, null, 2));

// Test 3: Complex styles with twsx
console.log("\n3. Complex styles with twsx");
console.log("Input: Complex nested object");
const complexInput = {
  ".card": [
    "bg-white p-4 rounded-lg shadow",
    {
      "&:hover": "shadow-lg",
      ".title": "text-lg font-bold text-gray-800",
      ".desc": "text-sm text-gray-500",
    },
  ],
};
console.log(JSON.stringify(complexInput, null, 2));

const complexStyles = twsx(complexInput);
// For the complex output, let's handle the common box-shadow line that causes line wrapping issues
const complexBeautified = beautifyCSS(complexStyles);

console.log("Output:\n" + colorizeCSS(complexBeautified));
