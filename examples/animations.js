/**
 * Animation & Transition Examples
 * Demonstrates how to use animations and transitions with tailwind-to-style
 */

import { tws, configure, createUtilityPlugin } from "../dist/index.cjs";

console.log("=== Animation Examples ===\n");

// Built-in animations
console.log("1. Built-in Animations:");
console.log("animate-spin:", tws("animate-spin"));
console.log("animate-ping:", tws("animate-ping"));
console.log("animate-pulse:", tws("animate-pulse"));
console.log("animate-bounce:", tws("animate-bounce"));
console.log("animate-none:", tws("animate-none"));

// Responsive animations
console.log("\n2. Responsive Animations:");
console.log("md:animate-spin:", tws("md:animate-spin"));
console.log("hover:animate-bounce:", tws("hover:animate-bounce"));

console.log("\n=== Transition Examples ===\n");

// Transition property
console.log("3. Transition Properties:");
console.log("transition:", tws("transition"));
console.log("transition-all:", tws("transition-all"));
console.log("transition-colors:", tws("transition-colors"));
console.log("transition-opacity:", tws("transition-opacity"));
console.log("transition-shadow:", tws("transition-shadow"));
console.log("transition-transform:", tws("transition-transform"));
console.log("transition-none:", tws("transition-none"));

// Duration
console.log("\n4. Transition Durations:");
console.log("duration-150:", tws("duration-150"));
console.log("duration-300:", tws("duration-300"));
console.log("duration-500:", tws("duration-500"));
console.log("duration-1000:", tws("duration-1000"));

// Timing functions
console.log("\n5. Transition Timing Functions:");
console.log("ease-linear:", tws("ease-linear"));
console.log("ease-in:", tws("ease-in"));
console.log("ease-out:", tws("ease-out"));
console.log("ease-in-out:", tws("ease-in-out"));

// Delays
console.log("\n6. Transition Delays:");
console.log("delay-150:", tws("delay-150"));
console.log("delay-300:", tws("delay-300"));
console.log("delay-500:", tws("delay-500"));

// Combined transitions
console.log("\n7. Combined Transitions:");
console.log(
  "transition duration-300 ease-in-out:",
  tws("transition duration-300 ease-in-out")
);
console.log(
  "transition-all duration-500 ease-out delay-150:",
  tws("transition-all duration-500 ease-out delay-150")
);

console.log("\n=== Custom Animations ===\n");

// Custom animation with configure
configure({
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-in forwards",
        slideIn: "slideIn 0.5s ease-out",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
});

console.log("8. Custom Animations via configure():");
console.log("animate-fadeIn:", tws("animate-fadeIn"));
console.log("animate-slideIn:", tws("animate-slideIn"));
console.log("animate-wiggle:", tws("animate-wiggle"));

console.log("\n=== Real-World Use Cases ===\n");

// Button with hover effect
console.log("9. Button Hover Effect:");
const buttonHover = tws(
  "transition-colors duration-200 ease-in-out hover:bg-blue-600"
);
console.log("Button hover:", buttonHover);

// Loading spinner
console.log("\n10. Loading Spinner:");
const spinner = tws("animate-spin w-8 h-8 border-2 border-blue-500 rounded-full");
console.log("Spinner:", spinner);

// Notification fade in
console.log("\n11. Notification Fade In:");
const notification = tws("animate-fadeIn bg-green-500 p-4 rounded shadow-lg");
console.log("Notification:", notification);

// Menu slide in
console.log("\n12. Menu Slide In:");
const menu = tws("animate-slideIn bg-white shadow-xl");
console.log("Menu:", menu);

// Icon wiggle on hover
console.log("\n13. Icon Wiggle on Hover:");
const iconWiggle = tws("hover:animate-wiggle cursor-pointer");
console.log("Icon:", iconWiggle);

// Modal with backdrop fade
console.log("\n14. Modal Backdrop:");
const backdrop = tws("animate-fadeIn bg-black bg-opacity-50 fixed inset-0");
console.log("Backdrop:", backdrop);

console.log("\n=== Plugin API Custom Animations ===\n");

// Using plugin API to create custom animation utilities

const customAnimationsPlugin = createUtilityPlugin(
  "customAnimations",
  {
    shake: "shake 0.5s ease-in-out",
    float: "float 3s ease-in-out infinite",
    glow: "glow 2s ease-in-out infinite alternate",
  },
  {
    property: "animation",
  }
);

configure({
  plugins: [customAnimationsPlugin],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-10px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(10px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 1)" },
        },
      },
    },
  },
});

console.log("15. Plugin API Custom Animations:");
console.log("customAnimations-shake:", tws("customAnimations-shake"));
console.log("customAnimations-float:", tws("customAnimations-float"));
console.log("customAnimations-glow:", tws("customAnimations-glow"));

console.log("\n=== Responsive & State Variants ===\n");

console.log("16. Complex Variants:");
console.log(
  "md:hover:animate-pulse focus:animate-bounce:",
  tws("md:hover:animate-pulse focus:animate-bounce")
);
console.log(
  "lg:transition-all lg:duration-500 lg:ease-out:",
  tws("lg:transition-all lg:duration-500 lg:ease-out")
);

console.log("\n✨ Animation & Transition support complete!");
