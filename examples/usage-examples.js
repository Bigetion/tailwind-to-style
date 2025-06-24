import { tws, twsx } from "../dist/index.esm.js";

// ====== BASIC EXAMPLES ======

// Basic tws example - output as CSS string
console.log("===== BASIC EXAMPLES =====");
console.log("\nBasic tws with CSS string output:");
const basicCssString = tws("bg-blue-500 text-white p-4 rounded");
console.log(basicCssString);

// JSON format output
console.log("\nBasic tws with JSON output:");
const basicCssJson = tws("bg-blue-500 text-white p-4", true);
console.log(basicCssJson);

// More complex combinations
console.log("\nMore complex tws example:");
const responsiveClasses = tws(
  "text-sm md:text-base lg:text-lg font-medium text-gray-800 hover:text-blue-600"
);
console.log(responsiveClasses);

// With arbitrary values
console.log("\nWith arbitrary values:");
const arbitraryValues = tws("w-[120px] h-[80px] bg-[#ff5500] text-[16px]");
console.log(arbitraryValues);

// ====== COMPLEX EXAMPLES ======

console.log("\n\n===== COMPLEX EXAMPLES =====");

// Simple twsx example
console.log("\nSimple twsx example:");
const simpleStyles = twsx({
  ".container": ["max-w-screen-lg mx-auto p-4"],
});
console.log(simpleStyles);

// Complex nested styles example
console.log("\nComplex nested twsx example:");
const complexStyles = twsx({
  ".card": [
    "w-full bg-white shadow-md rounded-lg p-6",
    {
      "&:hover": "shadow-lg",
      ".card-title": "text-xl font-bold mb-2 text-gray-900",
      ".card-body": [
        "text-gray-600",
        {
          p: "mb-4",
          a: "text-blue-500 hover:underline",
        },
      ],
    },
  ],
});
console.log(complexStyles);

// Responsive and variant example
console.log("\nResponsive and variant twsx example:");
const responsiveStyles = twsx({
  ".responsive-container": [
    "flex flex-col items-center p-4",
    {
      "@media (min-width: 640px)": [
        "flex-row justify-between",
        {
          ".item": "w-auto",
        },
      ],
      ".item": [
        "w-full mb-4 md:w-auto md:mb-0",
        {
          "&:hover": "bg-gray-100",
        },
      ],
    },
  ],
});
console.log(responsiveStyles);

// Combined usage example
console.log("\nPractical usage example (React-like component):");
console.log(`
// React component example
function Button({ primary, children }) {
  // Dynamic class based on props
  const buttonStyle = primary
    ? tws("bg-blue-600 hover:bg-blue-700 text-white")
    : tws("bg-gray-200 hover:bg-gray-300 text-gray-800");

  return (
    <button style={buttonStyle}>
      {children}
    </button>
  );
}

// For more complex styling with nested selectors
const pageStyles = twsx({
  ".page": ["container mx-auto p-4", {
    "header": "mb-6 border-b pb-4",
    "main": ["py-8", {
      "section": "mb-12",
      "h2": "text-2xl font-bold mb-4",
      ".card-grid": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    }],
    "footer": "mt-12 pt-6 border-t text-gray-600"
  }]
});
`);

// Run this example with: node examples/usage-examples.js
