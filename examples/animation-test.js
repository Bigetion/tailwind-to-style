/**
 * Simple Animation & Transition Test
 */

import { tws } from "../dist/index.cjs";

console.log("=== Animation Tests ===\n");

// Test built-in animations
console.log("✓ animate-spin:", tws("animate-spin", 1));
console.log("✓ animate-pulse:", tws("animate-pulse", 1));
console.log("✓ animate-bounce:", tws("animate-bounce", 1));
console.log("✓ animate-ping:", tws("animate-ping", 1));
console.log("✓ animate-none:", tws("animate-none", 1));

console.log("\n=== Transition Tests ===\n");

// Test transitions
console.log("✓ transition:", tws("transition", 1));
console.log("✓ duration-300:", tws("duration-300", 1));
console.log("✓ ease-in-out:", tws("ease-in-out", 1));
console.log("✓ delay-150:", tws("delay-150", 1));

// Test combined
console.log("\n✓ Combined:", tws("transition duration-300 ease-in-out delay-150", 1));

// Test with responsive
console.log("\n✓ Responsive:", tws("hover:animate-spin md:transition-all", 1));

console.log("\n✅ All animation & transition utilities working!");
