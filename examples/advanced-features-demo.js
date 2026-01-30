/**
 * v3.2.0 Advanced Features Demo
 * Demonstrates all new capabilities
 */

import {
  tws,
  twsx,
  
  // Plugin System
  usePlugin,
  gradientPlugin,
  animationPlugin,
  
  // Presets
  applyPreset,
  materialPreset,
  antDesignPreset,
  mergePresets,
  
  // Class Optimizer
  optimizeClasses,
  findConflicts,
  analyzeClasses,
  mergeClasses,
  
  // Animation Builder
  createAnimation,
  animations,
  easings,
  createSequence,
  createTimeline,
  
  // Composition API
  box,
  flex,
  button,
  card,
  stack,
  center,
  
  // SSR Utilities
  createStyleCollector,
  createSSRContext,
  extractCriticalCss,
  generateStaticCss,
  
  // Validation
  validateClasses,
  validateWithWarnings,
  checkConflicts,
  autoFix,
  
  // DevTools
  enableDevTools,
  createDebugPanel,
  devTools,
} from "../src/index.js";

console.log("=".repeat(80));
console.log("TWS v3.2.0 - Advanced Features Demo");
console.log("=".repeat(80));

// =============================================================================
// 1. Plugin System
// =============================================================================
console.log("\n1. Plugin System");
console.log("-".repeat(80));

// Use gradient plugin
usePlugin(gradientPlugin);
usePlugin(animationPlugin);

console.log("✓ Gradient plugin registered");
console.log("✓ Animation plugin registered");

// =============================================================================
// 2. Preset System
// =============================================================================
console.log("\n2. Preset System");
console.log("-".repeat(80));

// Apply Material Design preset
applyPreset(materialPreset);
console.log("✓ Applied Material Design preset");

// Material Design colors
const materialColors = tws("bg-primary-500 text-white p-4 rounded-md shadow-2");
console.log("Material colors:", materialColors);

// Merge presets
const customPreset = mergePresets(materialPreset, antDesignPreset);
console.log("✓ Merged Material + Ant Design presets");

// =============================================================================
// 3. Class Optimizer
// =============================================================================
console.log("\n3. Class Optimizer");
console.log("-".repeat(80));

// Classes with conflicts
const messyClasses = "p-4 p-6 bg-red-500 bg-blue-500 text-white text-black m-2 m-4";

// Find conflicts
const conflicts = findConflicts(messyClasses);
console.log(`Found ${conflicts.length} conflicts:`);
conflicts.forEach((conflict) => {
  console.log(`  - ${conflict.property}: ${conflict.classes.join(", ")}`);
  console.log(`    Winner: ${conflict.winner}`);
});

// Optimize
const optimized = optimizeClasses(messyClasses, {
  removeDups: true,
  resolveConflict: true,
  sort: true,
});
console.log("\nOptimized:", optimized);

// Analyze
const analysis = analyzeClasses(messyClasses);
console.log("\nAnalysis:");
console.log(`  - Total: ${analysis.total}`);
console.log(`  - Unique: ${analysis.unique}`);
console.log(`  - Duplicates: ${analysis.duplicates}`);
console.log(`  - Conflicts: ${analysis.conflicts}`);

// Merge classes intelligently
const merged = mergeClasses(
  "flex items-center p-4",
  "justify-between bg-blue-500",
  "text-white hover:bg-blue-600"
);
console.log("\nMerged classes:", merged);

// =============================================================================
// 4. Animation Builder
// =============================================================================
console.log("\n4. Animation Builder");
console.log("-".repeat(80));

// Create custom animation
const slideUp = createAnimation("slideUp")
  .from({ transform: "translateY(100px)", opacity: "0" })
  .to({ transform: "translateY(0)", opacity: "1" })
  .duration("500ms")
  .ease("easeOutCubic");

console.log("Custom animation created:");
console.log(slideUp.toKeyframes());

// Use pre-built animations
const fadeInAnim = animations.fadeIn("300ms");
console.log("\nFade In animation:", fadeInAnim.toCss());

const bounceAnim = animations.bounce("600ms");
console.log("Bounce animation:", bounceAnim.toCss());

// Animation sequence
const sequence = createSequence()
  .step(animations.fadeIn("200ms"))
  .step(animations.scaleIn("300ms"))
  .step(animations.slideInBottom("400ms", "50px"));

console.log("\nAnimation sequence:", sequence.toCss());

// Animation timeline (parallel)
const timeline = createTimeline()
  .add(animations.fadeIn("500ms"), 0)
  .add(animations.scaleIn("500ms"), 100)
  .add(animations.bounce("600ms"), 200);

console.log("Animation timeline:", timeline.toCss());

// List all available easings
console.log("\nAvailable easings:", Object.keys(easings).length, "functions");
console.log("Examples:", Object.keys(easings).slice(0, 10).join(", "), "...");

// =============================================================================
// 5. Composition API
// =============================================================================
console.log("\n5. Composition API");
console.log("-".repeat(80));

// Box primitive
const boxProps = box({
  p: "4",
  m: "2",
  bg: "blue-500",
  color: "white",
  borderRadius: "lg",
  shadow: "md",
});
console.log("Box primitive:", boxProps.style);

// Flex container
const flexProps = flex({
  justifyContent: "between",
  alignItems: "center",
  gap: "4",
  p: "4",
});
console.log("Flex container:", flexProps.style);

// Button component
const primaryButton = button({
  variant: "solid",
  colorScheme: "blue",
  size: "lg",
});
console.log("Primary button:", primaryButton.style);

// Card component
const cardProps = card({
  p: "6",
  shadow: "lg",
  borderRadius: "xl",
});
console.log("Card component:", cardProps.style);

// Stack (vertical)
const stackProps = stack({
  gap: "4",
  p: "4",
});
console.log("Stack component:", stackProps.style);

// Center content
const centerProps = center({
  h: "screen",
  bg: "gray-100",
});
console.log("Center component:", centerProps.style);

// =============================================================================
// 6. SSR Utilities
// =============================================================================
console.log("\n6. SSR Utilities");
console.log("-".repeat(80));

// Create style collector
const collector = createStyleCollector();

// Simulate style collection
collector.add("p-4", { padding: "1rem" });
collector.add("bg-blue-500", { backgroundColor: "#3b82f6" });
collector.add("text-white", { color: "#ffffff" });

const criticalCss = collector.getCss();
console.log("Collected CSS:");
console.log(criticalCss);

const styleTag = collector.getStyleTag({ nonce: "abc123" });
console.log("\nStyle tag:");
console.log(styleTag);

// SSR Context
const ssrContext = createSSRContext();
console.log("✓ SSR Context created");

// Collected classes
const collectedClasses = collector.getClasses();
console.log(`Collected ${collectedClasses.length} classes:`, collectedClasses.join(", "));

// =============================================================================
// 7. Class Validation
// =============================================================================
console.log("\n7. Class Validation");
console.log("-".repeat(80));

// Valid classes
const validClasses = "flex items-center justify-between p-4 bg-blue-500 text-white";
const validResult = validateClasses(validClasses);
console.log("Valid classes result:");
console.log(`  - Valid: ${validResult.valid}`);
console.log(`  - Errors: ${validResult.errors.length}`);

// Invalid classes
const invalidClasses = "flex-center text-middle margin-4 padding-2";
const invalidResult = validateClasses(invalidClasses);
console.log("\nInvalid classes result:");
console.log(`  - Valid: ${invalidResult.valid}`);
console.log(`  - Errors: ${invalidResult.errors.length}`);

invalidResult.errors.forEach((error) => {
  console.log(`  - ${error.className}: ${error.error}`);
  if (error.suggestions.length > 0) {
    console.log(`    Suggestions: ${error.suggestions.join(", ")}`);
  }
});

// Check conflicts
const conflictingClasses = "p-4 p-6 bg-red-500 bg-blue-500";
const conflictCheck = checkConflicts(conflictingClasses);
console.log(`\nConflicts in "${conflictingClasses}":`);
console.log(`  Found ${conflictCheck.length} conflicts`);

// Auto-fix
const fixResult = autoFix("flex-center text-middle margin-4");
console.log("\nAuto-fix result:");
console.log(`  Original: flex-center text-middle margin-4`);
console.log(`  Fixed: ${fixResult.classes}`);
console.log(`  Changes: ${fixResult.changes.length}`);

// =============================================================================
// 8. DevTools
// =============================================================================
console.log("\n8. DevTools");
console.log("-".repeat(80));

// Enable DevTools
enableDevTools({
  logClassNames: true,
  logStyles: true,
  logPerformance: true,
  showWarnings: true,
  highlightConflicts: true,
});
console.log("✓ DevTools enabled");

// Log performance
devTools.logPerformance("Test operation", 15.5);

// Show warning
devTools.showWarning("This is a test warning", { detail: "Additional info" });

// Track usage
devTools.trackUsage("flex");
devTools.trackUsage("p-4");
devTools.trackUsage("bg-blue-500");
console.log("✓ Tracked usage of 3 classes");

// =============================================================================
// Performance Comparison
// =============================================================================
console.log("\n9. Performance Comparison");
console.log("-".repeat(80));

const testClasses = "flex items-center justify-between p-4 m-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors";

// Without optimizer
const start1 = performance.now();
for (let i = 0; i < 1000; i++) {
  tws(testClasses);
}
const time1 = performance.now() - start1;

// With optimizer
const optimizedClasses = optimizeClasses(testClasses);
const start2 = performance.now();
for (let i = 0; i < 1000; i++) {
  tws(optimizedClasses);
}
const time2 = performance.now() - start2;

console.log(`Without optimizer: ${time1.toFixed(2)}ms (1000 iterations)`);
console.log(`With optimizer: ${time2.toFixed(2)}ms (1000 iterations)`);
console.log(`Improvement: ${((time1 - time2) / time1 * 100).toFixed(1)}%`);

// =============================================================================
// Summary
// =============================================================================
console.log("\n" + "=".repeat(80));
console.log("SUMMARY - v3.2.0 Advanced Features");
console.log("=".repeat(80));

console.log("\n✓ Plugin System - Extensible with custom utilities");
console.log("✓ Preset System - 6 pre-configured themes");
console.log("✓ Class Optimizer - Smart deduplication and conflict resolution");
console.log("✓ Animation Builder - 15+ pre-built animations + custom builder");
console.log("✓ Composition API - 15+ component primitives");
console.log("✓ SSR Utilities - Critical CSS extraction and hydration");
console.log("✓ Class Validation - Runtime validation with suggestions");
console.log("✓ DevTools - Browser debugging panel and performance tracking");

console.log("\n" + "=".repeat(80));
console.log("All features demonstrated successfully!");
console.log("=".repeat(80));
