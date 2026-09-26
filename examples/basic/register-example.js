/**
 * register-example.js
 *
 * Demonstrates tailwind-to-style/register — semantic class registration API.
 *
 * Run: node examples/basic/register-example.js
 */

import { register, cx, cn } from "../../src/register/index.js";

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
    toBe: (expected) => {
      if (value !== expected)
        throw new Error(`Expected "${expected}" but got "${value}"`);
    },
    toContain: (substr) => {
      if (typeof value !== "string" || !value.includes(substr))
        throw new Error(`Expected to contain "${substr}", got: "${value}"`);
    },
    toBeTypeOf: (type) => {
      if (typeof value !== type)
        throw new Error(`Expected type "${type}" but got "${typeof value}"`);
    },
    toBeTruthy: () => {
      if (!value) throw new Error(`Expected truthy, got: ${value}`);
    },
  };
}

console.log("\n" + "=".repeat(60));
console.log("  tailwind-to-style/register — API test");
console.log("=".repeat(60));

// ─────────────────────────────────────────────────────────────────────────────
// 1. Simple form — whole config IS the base style
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n── 1. Simple form ──────────────────────────────────────────\n");

test("register() runs without error (simple form)", () => {
  register("btn", {
    tw: "px-6 py-3 rounded-lg font-medium transition-all cursor-pointer",
    "background-color": "#3b82f6",
    color: "#fff",
    border: "0",
  });
  // CSS injected — no return value
  expect(register.extractCSS()).toContain(".btn");
  console.log("       Injected CSS preview:");
  const css = register.extractCSS();
  console.log("       " + css.split("\n").slice(0, 3).join("\n       "));
});

test("register() with pseudo selector ('&:hover')", () => {
  register("link", {
    tw: "text-blue-600",
    "text-decoration": "none",
    "&:hover": {
      tw: "underline",
      color: "#1d4ed8",
    },
  });
  expect(register.extractCSS()).toContain(".link");
});

test("register() with pseudo shorthands (hover, focus, dark)", () => {
  register("card-simple", {
    tw: "rounded-xl bg-white shadow-sm p-6",
    hover: "shadow-lg",
    dark: "bg-gray-900 text-white",
    focus: "ring-2 ring-blue-500",
  });
  expect(register.extractCSS()).toContain(".card-simple");
});

test("register() with responsive shorthands (md, lg)", () => {
  register("hero-text", {
    tw: "text-2xl font-bold",
    "font-size": "24px",
    md: "text-4xl",
    lg: "text-5xl",
  });
  expect(register.extractCSS()).toContain(".hero-text");
});

test("register() with kebab-case raw CSS + nested selector", () => {
  register("input-field", {
    tw: "w-full px-4 py-2 border rounded-lg transition-all",
    "font-family": "inherit",
    "font-size": "14px",
    "&:focus": {
      tw: "outline-none ring-2 ring-blue-500 border-blue-500",
    },
    "&::placeholder": {
      color: "#9ca3af",
    },
  });
  expect(register.extractCSS()).toContain(".input-field");
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. Complex form — base + modifiers
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n── 2. Complex form (base + modifiers) ──────────────────────\n");

register.reset();

test("register() with base + modifiers", () => {
  register("btn", {
    base: {
      tw: "inline-flex items-center justify-center rounded-lg font-medium transition-all cursor-pointer border-0",
      "font-family": "inherit",
      "line-height": "1",
    },
    modifiers: {
      // colors
      blue:    { tw: "bg-blue-600 text-white hover:bg-blue-700" },
      green:   { tw: "bg-green-600 text-white hover:bg-green-700" },
      red:     { tw: "bg-red-600 text-white hover:bg-red-700" },
      ghost:   { tw: "bg-transparent hover:bg-gray-100", border: "1px solid currentColor" },
      // sizes
      sm:      { tw: "px-3 py-1.5", "font-size": "12px" },
      md:      { tw: "px-4 py-2",   "font-size": "14px" },
      lg:      { tw: "px-6 py-3",   "font-size": "16px" },
      // shapes
      pill:    { "border-radius": "9999px" },
      square:  { "border-radius": "0" },
      // states
      loading: { tw: "opacity-70 cursor-wait" },
    },
  });

  const css = register.extractCSS();
  // Base class generated
  expect(css).toContain(".btn");
  // Modifier classes generated
  expect(css).toContain(".btn-blue");
  expect(css).toContain(".btn-green");
  expect(css).toContain(".btn-red");
  expect(css).toContain(".btn-ghost");
  expect(css).toContain(".btn-sm");
  expect(css).toContain(".btn-md");
  expect(css).toContain(".btn-lg");
  expect(css).toContain(".btn-pill");

  console.log("       Generated classes: .btn, .btn-blue, .btn-green, .btn-red,");
  console.log("                          .btn-ghost, .btn-sm, .btn-md, .btn-lg,");
  console.log("                          .btn-pill, .btn-square, .btn-loading");
  console.log("       Usage: <button class=\"btn btn-blue btn-lg btn-pill\">");
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. register.group()
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n── 3. register.group() ─────────────────────────────────────\n");

test("register.group() generates root + component classes", () => {
  register.group("card", {
    root: {
      tw: "rounded-xl overflow-hidden",
      "box-shadow": "0 4px 24px rgba(0,0,0,0.08)",
      "background-color": "#fff",
    },
    header: {
      tw: "px-6 py-4 border-b border-gray-100",
      "font-size": "16px",
      "font-weight": "600",
    },
    body: {
      tw: "px-6 py-4",
      "font-size": "14px",
      "line-height": "1.6",
    },
    footer: "px-6 py-3 bg-gray-50 text-sm text-gray-500",
  });

  const css = register.extractCSS();
  expect(css).toContain(".card");
  expect(css).toContain(".card-header");
  expect(css).toContain(".card-body");
  expect(css).toContain(".card-footer");

  console.log("       Generated: .card, .card-header, .card-body, .card-footer");
  console.log("       Usage:");
  console.log("         <div class=\"card\">");
  console.log("           <div class=\"card-header\">Title</div>");
  console.log("           <div class=\"card-body\">Content</div>");
  console.log("           <div class=\"card-footer\">Footer</div>");
  console.log("         </div>");
});

test("register.group() with plain string values", () => {
  register.group("badge", {
    root:    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
    blue:    "bg-blue-100 text-blue-800",
    green:   "bg-green-100 text-green-800",
    red:     "bg-red-100 text-red-800",
    yellow:  "bg-yellow-100 text-yellow-800",
  });

  const css = register.extractCSS();
  expect(css).toContain(".badge");
  expect(css).toContain(".badge-blue");
  expect(css).toContain(".badge-green");

  console.log("       Usage: <span class=\"badge badge-blue\">New</span>");
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. extend
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n── 4. extend ───────────────────────────────────────────────\n");

register.reset();

register("btn", {
  tw: "inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all",
  "font-family": "inherit",
});

test("extend: icon-btn inherits from btn", () => {
  register("icon-btn", {
    extend: "btn",
    tw: "w-10 h-10 p-0",
  });
  const css = register.extractCSS();
  expect(css).toContain(".btn");
  expect(css).toContain(".icon-btn");
  console.log("       .icon-btn inherits btn styles + overrides with w-10 h-10 p-0");
});

test("extend: fab multi-level extend (btn → icon-btn → fab)", () => {
  register("fab", {
    extend: "icon-btn",
    tw: "rounded-full shadow-lg",
    "background-color": "#3b82f6",
    color: "#fff",
  });
  const css = register.extractCSS();
  expect(css).toContain(".fab");
  console.log("       .fab inherits btn + icon-btn + adds rounded-full shadow-lg");
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. cx / cn utilities
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n── 5. cx / cn utilities ────────────────────────────────────\n");

test("cx() merges class strings", () => {
  const result = cx("btn", "btn-blue", "btn-lg");
  expect(result).toBe("btn btn-blue btn-lg");
});

test("cx() with conditional (truthy)", () => {
  const isLoading = true;
  const result = cx("btn", "btn-blue", isLoading && "opacity-70 cursor-wait");
  expect(result).toContain("opacity-70");
  expect(result).toContain("cursor-wait");
});

test("cx() with conditional (falsy skipped)", () => {
  const isLoading = false;
  const result = cx("btn", "btn-blue", isLoading && "opacity-70");
  expect(result).toBe("btn btn-blue");
});

test("cx() with object syntax", () => {
  const result = cx("btn", { "btn-lg": true, "btn-sm": false, "btn-pill": true });
  expect(result).toContain("btn-lg");
  expect(result).toContain("btn-pill");
  expect(result.includes("btn-sm")).toBe(false);
});

test("cn() is identical to cx()", () => {
  const a = cx("btn", "btn-blue");
  const b = cn("btn", "btn-blue");
  expect(a).toBe(b);
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. Realistic design system
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n── 6. Realistic design system ──────────────────────────────\n");

register.reset();

// Buttons
register("btn", {
  base: {
    tw: "inline-flex items-center justify-center rounded-lg font-medium transition-all cursor-pointer",
    "font-family": "inherit",
    "line-height": "1",
    "border": "0",
  },
  modifiers: {
    primary:   { tw: "bg-blue-600 text-white hover:bg-blue-700" },
    secondary: { tw: "bg-gray-100 text-gray-900 hover:bg-gray-200" },
    danger:    { tw: "bg-red-600 text-white hover:bg-red-700" },
    success:   { tw: "bg-green-600 text-white hover:bg-green-700" },
    ghost:     { tw: "bg-transparent hover:bg-gray-100", border: "1px solid #e5e7eb" },
    sm:        { tw: "px-3 py-1.5", "font-size": "12px" },
    md:        { tw: "px-4 py-2",   "font-size": "14px" },
    lg:        { tw: "px-6 py-3",   "font-size": "16px" },
    pill:      { "border-radius": "9999px" },
    disabled:  { tw: "opacity-50 cursor-not-allowed pointer-events-none" },
  },
});

// Cards
register.group("card", {
  root:    { tw: "rounded-xl border border-gray-200 bg-white overflow-hidden" },
  header:  { tw: "px-6 py-4 border-b border-gray-100 font-semibold", "font-size": "16px" },
  body:    { tw: "px-6 py-4", "font-size": "14px", "line-height": "1.6" },
  footer:  { tw: "px-6 py-4 border-t border-gray-100 bg-gray-50", "font-size": "13px" },
  actions: { tw: "px-6 py-4 flex items-center gap-3" },
});

// Form inputs
register("input", {
  tw: "w-full px-4 py-2 border border-gray-300 rounded-lg bg-white transition-all",
  "font-family": "inherit",
  "font-size": "14px",
  "&:focus": { tw: "outline-none ring-2 ring-blue-500 border-blue-500" },
  "&:disabled": { tw: "opacity-50 cursor-not-allowed bg-gray-100" },
  "&::placeholder": { color: "#9ca3af" },
});

// Badges
register.group("badge", {
  root:   { tw: "inline-flex items-center px-2.5 py-0.5 rounded-full font-medium", "font-size": "11px" },
  blue:   "bg-blue-100 text-blue-800",
  green:  "bg-green-100 text-green-800",
  red:    "bg-red-100 text-red-800",
  yellow: "bg-yellow-100 text-yellow-800",
  gray:   "bg-gray-100 text-gray-800",
});

test("design system: btn + modifiers registered", () => {
  const css = register.extractCSS();
  expect(css).toContain(".btn");
  expect(css).toContain(".btn-primary");
  expect(css).toContain(".btn-lg");
  expect(css).toContain(".btn-pill");
});

test("design system: card group registered", () => {
  const css = register.extractCSS();
  expect(css).toContain(".card");
  expect(css).toContain(".card-header");
  expect(css).toContain(".card-body");
  expect(css).toContain(".card-actions");
});

test("design system: input registered", () => {
  expect(register.extractCSS()).toContain(".input");
});

test("design system: badge group registered", () => {
  const css = register.extractCSS();
  expect(css).toContain(".badge");
  expect(css).toContain(".badge-blue");
  expect(css).toContain(".badge-red");
});

console.log("\n  React/HTML usage with this design system:");
console.log(`
  <button class="btn btn-primary btn-lg">Submit</button>
  <button class="btn btn-ghost btn-sm btn-pill">Cancel</button>

  <div class="card">
    <div class="card-header">User Profile</div>
    <div class="card-body">
      <input class="input" placeholder="Email address" />
    </div>
    <div class="card-actions">
      <button class="btn btn-primary btn-md">Save</button>
      <span class="badge badge-green">Active</span>
    </div>
  </div>
`);

// ─────────────────────────────────────────────────────────────────────────────
// Summary
// ─────────────────────────────────────────────────────────────────────────────
console.log("=".repeat(60));
console.log(`  Results: ${passed} passed, ${failed} failed`);
if (failed === 0) {
  console.log("  🎉 All tests passed!");
} else {
  console.log("  ⚠️  Some tests failed — check output above.");
  process.exit(1);
}
console.log("=".repeat(60) + "\n");
