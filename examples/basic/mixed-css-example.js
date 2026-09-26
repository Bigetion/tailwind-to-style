/**
 * mixed-css-example.js
 *
 * Demonstrates the new mixed Tailwind + raw CSS feature in tw().
 * Run: node --experimental-vm-modules examples/basic/mixed-css-example.js
 *       (from the workspace root)
 */

import { twsxClassName as tw } from "../../src/className/index.js";

// ─────────────────────────────────────────────────────────────────────────────
// Helper: print test result
// ─────────────────────────────────────────────────────────────────────────────
let passed = 0;
let failed = 0;

function test(label, fn) {
  try {
    fn();
    console.log(`  ✅  ${label}`);
    passed++;
  } catch (e) {
    console.log(`  ❌  ${label}`);
    console.log(`       ${e.message}`);
    failed++;
  }
}

function expect(value) {
  return {
    toBe(expected) {
      if (value !== expected)
        throw new Error(`Expected "${expected}" but got "${value}"`);
    },
    toContain(substr) {
      if (typeof value !== "string" || !value.includes(substr))
        throw new Error(`Expected string to contain "${substr}", got: "${value}"`);
    },
    toBeTypeOf(type) {
      if (typeof value !== type)
        throw new Error(`Expected type "${type}" but got "${typeof value}"`);
    },
    toHaveKey(key) {
      if (!Object.prototype.hasOwnProperty.call(value, key))
        throw new Error(`Expected object to have key "${key}", got keys: ${Object.keys(value).join(", ")}`);
    },
  };
}

console.log("\n" + "=".repeat(60));
console.log("  Mixed Tailwind + Raw CSS — tw() feature test");
console.log("=".repeat(60) + "\n");

// ─────────────────────────────────────────────────────────────────────────────
// 1. Basic: `tw` key as Tailwind classes alias
// ─────────────────────────────────────────────────────────────────────────────
console.log("1. tw key as Tailwind class alias\n");

test("`tw` key generates a className string", () => {
  const cls = tw({ tw: "flex items-center gap-2" });
  expect(cls).toBeTypeOf("string");
  expect(cls.length > 0).toBe(true);
});

test("`_` key still works (backward compat)", () => {
  const cls = tw({ _: "flex items-center gap-2" });
  expect(cls).toBeTypeOf("string");
  expect(cls.length > 0).toBe(true);
});

test("`tw` and `_` together merge classes", () => {
  const cls = tw({ tw: "flex", _: "items-center" });
  expect(cls).toBeTypeOf("string");
  // Both produce a valid className (merged internally)
  expect(cls.length > 0).toBe(true);
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. Raw CSS properties (camelCase)
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n2. Raw CSS properties (camelCase)\n");

test("fontSize as camelCase raw CSS property", () => {
  const cls = tw({ tw: "p-4", fontSize: "13px" });
  expect(cls).toBeTypeOf("string");
  expect(cls.length > 0).toBe(true);
});

test("lineHeight + color raw CSS properties", () => {
  const cls = tw({ lineHeight: "1.6", color: "#333" });
  expect(cls).toBeTypeOf("string");
});

test("multiple raw CSS props with Tailwind", () => {
  const cls = tw({
    tw: "flex rounded-lg",
    fontSize: "14px",
    lineHeight: 1.5,
    color: "var(--text-primary)",
    backgroundColor: "#fff",
  });
  expect(cls).toBeTypeOf("string");
  expect(cls.length > 0).toBe(true);
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. Raw CSS — kebab-case
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n3. Raw CSS properties (kebab-case)\n");

test("font-size kebab-case", () => {
  const cls = tw({ tw: "p-2", "font-size": "15px" });
  expect(cls).toBeTypeOf("string");
});

test("border-radius kebab-case", () => {
  const cls = tw({ "border-radius": "8px", color: "#000" });
  expect(cls).toBeTypeOf("string");
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. CSS custom properties (--var)
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n4. CSS custom properties (--var)\n");

test("--custom-color CSS variable", () => {
  const cls = tw({ "--custom-color": "#3b82f6", tw: "text-blue-500" });
  expect(cls).toBeTypeOf("string");
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. Mixed: Tailwind + raw CSS + pseudo shorthands
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n5. Mixed Tailwind + raw CSS + pseudo shorthands\n");

test("tw + raw CSS + hover shorthand", () => {
  const cls = tw({
    tw: "flex items-center",
    fontSize: "14px",
    hover: "opacity-90",
  });
  expect(cls).toBeTypeOf("string");
});

test("tw + raw CSS + dark mode", () => {
  const cls = tw({
    tw: "bg-white text-gray-900",
    lineHeight: "1.6",
    dark: "bg-gray-900 text-white",
  });
  expect(cls).toBeTypeOf("string");
});

test("tw + raw CSS + responsive breakpoint", () => {
  const cls = tw({
    tw: "flex-col",
    fontSize: "12px",
    md: "flex-row",
  });
  expect(cls).toBeTypeOf("string");
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. Variants with mixed style values
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n6. Variants with mixed style values\n");

const btn = tw({
  name: "btn",
  base: {
    tw: "inline-flex items-center font-medium rounded-lg transition-all",
    fontFamily: "inherit",
  },
  variants: {
    size: {
      sm: { tw: "px-3 py-1.5", fontSize: "12px", lineHeight: "1.4" },
      md: { tw: "px-4 py-2",   fontSize: "14px", lineHeight: "1.5" },
      lg: { tw: "px-6 py-3",   fontSize: "16px", lineHeight: "1.6" },
    },
    color: {
      primary: { tw: "bg-blue-600 text-white hover:bg-blue-700" },
      ghost:   { tw: "bg-transparent", border: "1px solid currentColor" },
    },
    rounded: {
      none: { borderRadius: "0" },
      full: { borderRadius: "9999px" },
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

test("variant selector function is returned", () => {
  expect(btn).toBeTypeOf("function");
});

test("btn() with defaults returns className string", () => {
  const cls = btn();
  expect(cls).toBeTypeOf("string");
  expect(cls.length > 0).toBe(true);
  console.log(`       Result: "${cls}"`);
});

test("btn({ size:'lg', color:'primary' }) returns className", () => {
  const cls = btn({ size: "lg", color: "primary" });
  expect(cls).toBeTypeOf("string");
  console.log(`       Result: "${cls}"`);
});

test("btn({ size:'sm', color:'ghost' }) returns className", () => {
  const cls = btn({ size: "sm", color: "ghost" });
  expect(cls).toBeTypeOf("string");
  console.log(`       Result: "${cls}"`);
});

test("btn({ rounded:'full' }) returns className", () => {
  const cls = btn({ rounded: "full" });
  expect(cls).toBeTypeOf("string");
  console.log(`       Result: "${cls}"`);
});

test("btn.merge() works", () => {
  const cls = btn.merge({ size: "md" }, "extra-class");
  expect(cls).toBeTypeOf("string");
  expect(cls).toContain("extra-class");
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. Base as MixedStyleValue in variants
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n7. Base as MixedStyleValue\n");

const badge = tw({
  name: "badge",
  base: {
    tw: "inline-flex items-center rounded-full px-2.5 py-0.5",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  variants: {
    color: {
      blue:   "bg-blue-100 text-blue-800",
      green:  "bg-green-100 text-green-800",
      red:    "bg-red-100 text-red-800",
    },
  },
  defaultVariants: { color: "blue" },
});

test("badge() returns className with mixed base", () => {
  const cls = badge();
  expect(cls).toBeTypeOf("string");
  console.log(`       Result: "${cls}"`);
});

test("badge({ color:'red' }) returns className", () => {
  const cls = badge({ color: "red" });
  expect(cls).toBeTypeOf("string");
  console.log(`       Result: "${cls}"`);
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. Slots with mixed style values
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n8. Slots with mixed style values\n");

const card = tw({
  name: "card",
  slots: {
    root: {
      tw: "rounded-xl overflow-hidden",
      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      backgroundColor: "#fff",
    },
    header: {
      tw: "px-6 py-4 border-b border-gray-100",
      fontSize: "16px",
      fontWeight: "600",
    },
    body: {
      tw: "px-6 py-4",
      lineHeight: "1.6",
    },
    footer: "px-6 py-3 bg-gray-50 text-sm text-gray-500",
  },
  variants: {
    elevated: {
      true: {
        // slot-keyed variant values
        root:   { tw: "shadow-2xl", boxShadow: "0 8px 40px rgba(0,0,0,0.16)" },
        header: { tw: "bg-gray-50" },
      },
      false: {
        root: "shadow-sm",
      },
    },
  },
  defaultVariants: { elevated: "false" },
});

test("slots generator function returned", () => {
  expect(card).toBeTypeOf("function");
});

test("card() returns object with all slot keys", () => {
  const slots = card();
  expect(slots).toHaveKey("root");
  expect(slots).toHaveKey("header");
  expect(slots).toHaveKey("body");
  expect(slots).toHaveKey("footer");
  console.log(`       root:   "${slots.root}"`);
  console.log(`       header: "${slots.header}"`);
  console.log(`       body:   "${slots.body}"`);
  console.log(`       footer: "${slots.footer}"`);
});

test("card({ elevated:'true' }) returns slot objects", () => {
  const slots = card({ elevated: "true" });
  expect(slots).toHaveKey("root");
  expect(slots).toHaveKey("header");
  console.log(`       root (elevated):   "${slots.root}"`);
  console.log(`       header (elevated): "${slots.header}"`);
});

test("card.merge() works per slot", () => {
  const slots = card.merge({ elevated: "false" }, { body: "extra-body-class" });
  expect(slots).toHaveKey("body");
  expect(slots.body).toContain("extra-body-class");
});

// ─────────────────────────────────────────────────────────────────────────────
// 9. Realistic component: Input field
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n9. Realistic component: Input field\n");

const input = tw({
  name: "input",
  base: {
    tw: "w-full rounded-lg border transition-all outline-none",
    fontSize: "14px",
    lineHeight: "1.5",
    fontFamily: "inherit",
  },
  variants: {
    size: {
      sm: { tw: "px-3 py-1.5", fontSize: "12px" },
      md: { tw: "px-4 py-2",   fontSize: "14px" },
      lg: { tw: "px-4 py-3",   fontSize: "16px" },
    },
    state: {
      default: {
        tw: "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
      },
      error: {
        tw: "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20",
        color: "inherit",
      },
      success: {
        tw: "border-green-400",
      },
    },
  },
  defaultVariants: { size: "md", state: "default" },
});

test("input() default className", () => {
  const cls = input();
  expect(cls).toBeTypeOf("string");
  console.log(`       Result: "${cls}"`);
});

test("input({ size:'lg', state:'error' }) className", () => {
  const cls = input({ size: "lg", state: "error" });
  expect(cls).toBeTypeOf("string");
  console.log(`       Result: "${cls}"`);
});

// ─────────────────────────────────────────────────────────────────────────────
// 10. Name + hash = deterministic output
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n10. Name + hash = deterministic output\n");

test("same config called twice gives same className", () => {
  const config = {
    name: "deterministic",
    tw: "flex items-center",
    fontSize: "14px",
  };
  const cls1 = tw(config);
  const cls2 = tw(config);
  expect(cls1).toBe(cls2);
});

test("hash:false gives clean name", () => {
  const cls = tw({ name: "clean-btn", hash: false, tw: "flex", fontSize: "14px" });
  expect(cls).toBe("clean-btn");
});

// ─────────────────────────────────────────────────────────────────────────────
// Summary
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n" + "=".repeat(60));
console.log(`  Results: ${passed} passed, ${failed} failed`);
if (failed === 0) {
  console.log("  🎉 All tests passed!");
} else {
  console.log("  ⚠️  Some tests failed — check output above.");
  process.exit(1);
}
console.log("=".repeat(60) + "\n");
