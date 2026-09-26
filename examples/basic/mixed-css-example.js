/**
 * mixed-css-example.js
 *
 * Demonstrates the new mixed Tailwind + raw CSS feature in tw().
 *
 * Key concept: tw() lets you write CSS properties directly alongside
 * Tailwind utilities — using kebab-case (native CSS syntax) as the
 * idiomatic style, just like writing real CSS.
 *
 * Run: node examples/basic/mixed-css-example.js
 *       (from the workspace root)
 */

import { twsxClassName as tw } from "../../src/className/index.js";

// ─────────────────────────────────────────────────────────────────────────────
// Minimal test runner
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
        throw new Error(
          `Expected object to have key "${key}", got keys: ${Object.keys(value).join(", ")}`
        );
    },
  };
}

console.log("\n" + "=".repeat(60));
console.log("  Mixed Tailwind + raw CSS — tw() examples & tests");
console.log("  (kebab-case as idiomatic CSS-native style)");
console.log("=".repeat(60));

// ─────────────────────────────────────────────────────────────────────────────
// 1. The basics — kebab-case CSS properties
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n── 1. Kebab-case CSS properties (idiomatic style) ─────────\n");

// This is the on-brand way to write it — reads like real CSS
const label = tw({
  tw: "inline-flex items-center",
  "font-size": "11px",
  "font-weight": "600",
  "letter-spacing": "0.05em",
  "text-transform": "uppercase",
  "line-height": "1",
});

test("kebab-case: font-size, font-weight, letter-spacing", () => {
  expect(label).toBeTypeOf("string");
  expect(label.length > 0).toBe(true);
  console.log(`       className: "${label}"`);
});

const overlay = tw({
  tw: "fixed inset-0",
  "background-color": "rgba(0,0,0,0.5)",
  "backdrop-filter": "blur(4px)",
  "z-index": "50",
});

test("kebab-case: background-color, backdrop-filter, z-index", () => {
  expect(overlay).toBeTypeOf("string");
  console.log(`       className: "${overlay}"`);
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. CamelCase still works (JS/React style)
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n── 2. CamelCase also supported (React / JS style) ─────────\n");

const labelCamel = tw({
  tw: "inline-flex items-center",
  fontSize: "11px",
  fontWeight: "600",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
});

test("camelCase: fontSize, fontWeight, letterSpacing", () => {
  expect(labelCamel).toBeTypeOf("string");
  console.log(`       className: "${labelCamel}"`);
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. CSS custom properties (--var)
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n── 3. CSS custom properties (--var) ───────────────────────\n");

const themed = tw({
  tw: "rounded-lg p-4",
  "--bg": "#3b82f6",
  "--text": "#ffffff",
  "background-color": "var(--bg)",
  "color": "var(--text)",
});

test("CSS custom properties as --var keys", () => {
  expect(themed).toBeTypeOf("string");
  console.log(`       className: "${themed}"`);
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. Mixed with pseudo shorthands & responsive
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n── 4. Mixed: Tailwind + raw CSS + pseudo + responsive ──────\n");

const link = tw({
  tw: "inline-flex items-center",
  "font-size": "14px",
  "text-decoration": "none",
  "color": "inherit",
  hover: "underline opacity-80",
});

test("kebab-case + hover shorthand", () => {
  expect(link).toBeTypeOf("string");
  console.log(`       className: "${link}"`);
});

const heading = tw({
  tw: "font-bold",
  "font-size": "18px",
  "line-height": "1.3",
  "letter-spacing": "-0.01em",
  md: "text-2xl",
  lg: "text-3xl",
  dark: "text-white",
});

test("kebab-case + responsive (md, lg) + dark shorthand", () => {
  expect(heading).toBeTypeOf("string");
  console.log(`       className: "${heading}"`);
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. Variants — mixed base + variant option values
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n── 5. Variants with mixed style values ─────────────────────\n");

const btn = tw({
  name: "btn",
  base: {
    tw: "inline-flex items-center font-medium rounded-lg transition-all",
    "font-family": "inherit",
    "line-height": "1",
  },
  variants: {
    size: {
      // kebab-case raw CSS inside variant options
      xs: { tw: "px-2.5 py-1.5", "font-size": "11px" },
      sm: { tw: "px-3 py-2",     "font-size": "12px" },
      md: { tw: "px-4 py-2.5",   "font-size": "14px" },
      lg: { tw: "px-5 py-3",     "font-size": "16px" },
    },
    intent: {
      primary: { tw: "bg-blue-600 text-white hover:bg-blue-700" },
      danger:  { tw: "bg-red-600 text-white hover:bg-red-700" },
      ghost: {
        tw: "bg-transparent hover:bg-gray-100",
        border: "1px solid currentColor",
      },
    },
    rounded: {
      none:  { "border-radius": "0" },
      sm:    { "border-radius": "4px" },
      full:  { "border-radius": "9999px" },
    },
  },
  compoundVariants: [
    {
      intent: "ghost",
      size: "lg",
      class: "border-2",
    },
  ],
  defaultVariants: { size: "md", intent: "primary" },
});

test("variant function returned", () => {
  expect(btn).toBeTypeOf("function");
});

test("btn() with defaults", () => {
  const cls = btn();
  expect(cls).toBeTypeOf("string");
  console.log(`       "${cls}"`);
});

test("btn({ size:'xs', intent:'ghost' })", () => {
  const cls = btn({ size: "xs", intent: "ghost" });
  expect(cls).toBeTypeOf("string");
  console.log(`       "${cls}"`);
});

test("btn({ size:'lg', intent:'danger', rounded:'full' })", () => {
  const cls = btn({ size: "lg", intent: "danger", rounded: "full" });
  expect(cls).toBeTypeOf("string");
  console.log(`       "${cls}"`);
});

test("btn({ size:'lg', intent:'ghost' }) — compound variant", () => {
  const cls = btn({ size: "lg", intent: "ghost" });
  expect(cls).toBeTypeOf("string");
  console.log(`       "${cls}"`);
});

test("btn.merge() appends extra classes", () => {
  const cls = btn.merge({ size: "sm" }, "w-full");
  expect(cls).toContain("w-full");
  console.log(`       "${cls}"`);
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. Slots — CSS-native syntax throughout
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n── 6. Slots with kebab-case raw CSS ────────────────────────\n");

const card = tw({
  name: "card",
  slots: {
    root: {
      tw: "rounded-xl overflow-hidden",
      "box-shadow": "0 4px 24px rgba(0,0,0,0.08)",
      "background-color": "#fff",
    },
    header: {
      tw: "px-6 py-4 border-b border-gray-100",
      "font-size": "16px",
      "font-weight": "600",
      "line-height": "1.4",
    },
    body: {
      tw: "px-6 py-4",
      "font-size": "14px",
      "line-height": "1.6",
      "color": "#374151",
    },
    footer: "px-6 py-3 bg-gray-50 text-sm text-gray-500",
  },
  variants: {
    elevated: {
      true: {
        root:   { tw: "shadow-2xl", "box-shadow": "0 8px 40px rgba(0,0,0,0.16)" },
        header: { tw: "bg-gray-50" },
      },
      false: { root: "shadow-sm" },
    },
    compact: {
      true: {
        header: { tw: "px-4 py-3", "font-size": "14px" },
        body:   { tw: "px-4 py-3", "font-size": "13px" },
      },
      false: {},
    },
  },
  defaultVariants: { elevated: "false", compact: "false" },
});

test("slots generator returned", () => {
  expect(card).toBeTypeOf("function");
});

test("card() — all slot keys present", () => {
  const s = card();
  expect(s).toHaveKey("root");
  expect(s).toHaveKey("header");
  expect(s).toHaveKey("body");
  expect(s).toHaveKey("footer");
  console.log(`       root:   "${s.root}"`);
  console.log(`       header: "${s.header}"`);
  console.log(`       body:   "${s.body}"`);
  console.log(`       footer: "${s.footer}"`);
});

test("card({ elevated:'true' })", () => {
  const s = card({ elevated: "true" });
  expect(s).toHaveKey("root");
  console.log(`       root (elevated): "${s.root}"`);
});

test("card({ compact:'true' })", () => {
  const s = card({ compact: "true" });
  expect(s).toHaveKey("header");
  console.log(`       header (compact): "${s.header}"`);
});

test("card.merge() per-slot override", () => {
  const s = card.merge({ elevated: "false" }, { body: "custom-body" });
  expect(s.body).toContain("custom-body");
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. Realistic component: Typography scale
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n── 7. Realistic: Typography scale ──────────────────────────\n");

const text = tw({
  name: "text",
  base: {
    "font-family": "inherit",
    "color": "inherit",
    "line-height": "1.5",
  },
  variants: {
    size: {
      xs:  { "font-size": "11px", "line-height": "1.4" },
      sm:  { "font-size": "12px", "line-height": "1.4" },
      md:  { "font-size": "14px", "line-height": "1.5" },
      lg:  { "font-size": "16px", "line-height": "1.5" },
      xl:  { "font-size": "18px", "line-height": "1.4" },
      "2xl": { "font-size": "22px", "line-height": "1.3" },
      "3xl": { "font-size": "28px", "line-height": "1.2" },
    },
    weight: {
      normal:   { "font-weight": "400" },
      medium:   { "font-weight": "500" },
      semibold: { "font-weight": "600" },
      bold:     { "font-weight": "700" },
    },
    tracking: {
      tight:  { "letter-spacing": "-0.02em" },
      normal: { "letter-spacing": "0" },
      wide:   { "letter-spacing": "0.05em" },
      wider:  { "letter-spacing": "0.1em" },
    },
  },
  defaultVariants: { size: "md", weight: "normal", tracking: "normal" },
});

test("text() default", () => {
  const cls = text();
  expect(cls).toBeTypeOf("string");
  console.log(`       "${cls}"`);
});

test("text({ size:'3xl', weight:'bold', tracking:'tight' })", () => {
  const cls = text({ size: "3xl", weight: "bold", tracking: "tight" });
  expect(cls).toBeTypeOf("string");
  console.log(`       "${cls}"`);
});

test("text({ size:'xs', weight:'medium', tracking:'wider' })", () => {
  const cls = text({ size: "xs", weight: "medium", tracking: "wider" });
  expect(cls).toBeTypeOf("string");
  console.log(`       "${cls}"`);
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. Determinism & backward compat
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n── 8. Determinism & backward compatibility ──────────────────\n");

test("same config → same className (deterministic)", () => {
  const config = { name: "det", "font-size": "14px", tw: "flex" };
  expect(tw(config)).toBe(tw(config));
});

test("`_` key still works (backward compat)", () => {
  const cls = tw({ _: "flex items-center", "font-size": "14px" });
  expect(cls).toBeTypeOf("string");
  console.log(`       "${cls}"`);
});

test("`tw` and `_` together merge without error", () => {
  const cls = tw({ tw: "flex", _: "items-center", "font-size": "14px" });
  expect(cls).toBeTypeOf("string");
});

test("hash:false → clean readable name", () => {
  const cls = tw({ name: "my-heading", hash: false, "font-size": "24px", tw: "font-bold" });
  expect(cls).toBe("my-heading");
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
