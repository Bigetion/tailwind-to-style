/**
 * Tests for the token system — createTheme, activateTheme, token, tokenRegistry
 *
 * @jest-environment jsdom
 */

import { jest } from "@jest/globals";

import {
  createTheme,
  activateTheme,
  token,
  tokenRegistry,
} from "../src/tokens/index.js";

// ============================================================================
// Helpers
// ============================================================================

const REGISTRY_KEY = "__TWS_TOKEN_REGISTRY__";

/**
 * Reset the singleton registry AND remove the injected <style> element between
 * tests so each test starts from a completely clean slate.
 */
function resetRegistry() {
  const existing = document.head.querySelector("style[data-tws-tokens]");
  if (existing) existing.remove();
  delete globalThis[REGISTRY_KEY];
}

// ============================================================================
// Setup
// ============================================================================

beforeEach(() => {
  resetRegistry();
});

// ============================================================================
// createTheme() — basic usage
// ============================================================================

describe("createTheme() — basic usage", () => {
  test("injects a <style> element into document.head", () => {
    createTheme({ colors: { primary: "#3b82f6" } });
    const styleEl = document.head.querySelector("style[data-tws-tokens]");
    expect(styleEl).not.toBeNull();
  });

  test("injected CSS contains all expected custom properties", () => {
    createTheme({
      colors: { primary: "#3b82f6", secondary: "#8b5cf6" },
      spacing: { md: "1rem" },
    });
    const styleEl = document.head.querySelector("style[data-tws-tokens]");
    expect(styleEl.textContent).toContain("--tws-colors-primary: #3b82f6");
    expect(styleEl.textContent).toContain("--tws-colors-secondary: #8b5cf6");
    expect(styleEl.textContent).toContain("--tws-spacing-md: 1rem");
  });

  test("returns an object with name, tokens, selector, and var()", () => {
    const theme = createTheme(
      { colors: { primary: "#3b82f6" } },
      { name: "light", selector: ":root" }
    );
    expect(theme.name).toBe("light");
    expect(theme.selector).toBe(":root");
    expect(theme.tokens).toBeDefined();
    expect(typeof theme.var).toBe("function");
  });

  test("theme.var() returns correct CSS variable reference", () => {
    const theme = createTheme({ colors: { primary: "#3b82f6" } });
    expect(theme.var("colors.primary")).toBe("var(--tws-colors-primary)");
  });

  test("registering a second theme merges its tokens into the CSS", () => {
    createTheme({ colors: { primary: "#3b82f6" } }, { name: "a" });
    createTheme({ spacing: { md: "1rem" } }, { name: "b" });
    const styleEl = document.head.querySelector("style[data-tws-tokens]");
    expect(styleEl.textContent).toContain("--tws-colors-primary");
    expect(styleEl.textContent).toContain("--tws-spacing-md");
  });
});

// ============================================================================
// CRITICAL — createTheme() must NOT mutate the original theme object
// ============================================================================

describe("createTheme() — immutability of source objects", () => {
  test("does not mutate the tokens object passed to it", () => {
    const myTheme = { colors: { primary: "#3b82f6", secondary: "#8b5cf6" } };
    createTheme(myTheme, { name: "light" });
    expect(myTheme.colors.primary).toBe("#3b82f6");
    expect(myTheme.colors.secondary).toBe("#8b5cf6");
  });

  test("does not add foreign keys to the source object", () => {
    const myTheme = { colors: { primary: "#3b82f6" } };
    const keysBefore = Object.keys(myTheme.colors);
    createTheme(myTheme, { name: "only" });
    expect(Object.keys(myTheme.colors)).toEqual(keysBefore);
  });

  test("source object stays intact after a second createTheme overwrites the same key", () => {
    const themeA = { colors: { primary: "#aaaaaa" } };
    const themeB = { colors: { primary: "#bbbbbb" } };
    createTheme(themeA, { name: "a" });
    createTheme(themeB, { name: "b" });
    expect(themeA.colors.primary).toBe("#aaaaaa");
    expect(themeB.colors.primary).toBe("#bbbbbb");
  });
});

// ============================================================================
// Switching between multiple themes
// ============================================================================

describe("Theme switching — values are preserved independently", () => {
  test("activateTheme() switches back to a previously defined theme", () => {
    createTheme({ colors: { bg: "#ffffff", text: "#111111" } }, { name: "light" });
    createTheme({ colors: { bg: "#111111", text: "#ffffff" } }, { name: "dark" });
    activateTheme("light");
    expect(tokenRegistry.get("colors.bg")).toBe("#ffffff");
    expect(tokenRegistry.get("colors.text")).toBe("#111111");
  });

  test("after switching to dark, registry reflects dark values", () => {
    createTheme({ colors: { bg: "#ffffff" } }, { name: "light" });
    createTheme({ colors: { bg: "#111111" } }, { name: "dark" });
    activateTheme("dark");
    expect(tokenRegistry.get("colors.bg")).toBe("#111111");
  });

  test("light theme retains original values after dark was activated", () => {
    createTheme({ colors: { accent: "#3b82f6" } }, { name: "light" });
    createTheme({ colors: { accent: "#60a5fa" } }, { name: "dark" });
    activateTheme("dark");
    activateTheme("light");
    expect(tokenRegistry.get("colors.accent")).toBe("#3b82f6");
  });

  test("dark theme retains original values after switching back and forth", () => {
    createTheme({ colors: { accent: "#3b82f6" } }, { name: "light" });
    createTheme({ colors: { accent: "#60a5fa" } }, { name: "dark" });
    activateTheme("light");
    activateTheme("dark");
    activateTheme("light");
    activateTheme("dark");
    expect(tokenRegistry.get("colors.accent")).toBe("#60a5fa");
  });

  test("activateTheme() throws for an unknown theme name", () => {
    expect(() => activateTheme("nonexistent")).toThrow(/Theme "nonexistent" not found/);
  });

  test("activateTheme() updates injected CSS to match the activated theme", () => {
    createTheme({ colors: { bg: "#ffffff" } }, { name: "light" });
    createTheme({ colors: { bg: "#111111" } }, { name: "dark" });
    const styleEl = document.head.querySelector("style[data-tws-tokens]");
    activateTheme("light");
    expect(styleEl.textContent).toContain("--tws-colors-bg: #ffffff");
    activateTheme("dark");
    expect(styleEl.textContent).toContain("--tws-colors-bg: #111111");
    expect(styleEl.textContent).not.toContain("--tws-colors-bg: #ffffff");
  });
});

// ============================================================================
// token() helper
// ============================================================================

describe("token()", () => {
  test("returns var(--tws-...) for a simple path", () => {
    expect(token("colors.primary")).toBe("var(--tws-colors-primary)");
  });

  test("returns var(--tws-...) for a single segment path", () => {
    expect(token("radius")).toBe("var(--tws-radius)");
  });

  test("returns var(--tws-...) for a deeply nested path", () => {
    expect(token("a.b.c")).toBe("var(--tws-a-b-c)");
  });

  test("includes fallback when provided", () => {
    expect(token("colors.primary", "#000")).toBe("var(--tws-colors-primary, #000)");
  });

  test("omits fallback clause when no fallback is given", () => {
    expect(token("spacing.md")).not.toContain(",");
  });
});

// ============================================================================
// tokenRegistry.get()
// ============================================================================

describe("tokenRegistry.get()", () => {
  test("returns correct value after createTheme", () => {
    createTheme({ colors: { primary: "#3b82f6" } });
    expect(tokenRegistry.get("colors.primary")).toBe("#3b82f6");
  });

  test("returns undefined for a path that does not exist", () => {
    createTheme({ colors: { primary: "#3b82f6" } });
    expect(tokenRegistry.get("colors.missing")).toBeUndefined();
  });

  test("handles nested multi-level paths", () => {
    createTheme({ a: { b: { c: "deep-value" } } });
    expect(tokenRegistry.get("a.b.c")).toBe("deep-value");
  });
});

// ============================================================================
// tokenRegistry.set()
// ============================================================================

describe("tokenRegistry.set()", () => {
  test("updates an existing token value", () => {
    createTheme({ colors: { primary: "#3b82f6" } });
    tokenRegistry.set("colors.primary", "#ef4444");
    expect(tokenRegistry.get("colors.primary")).toBe("#ef4444");
  });

  test("creates a new token path that did not exist before", () => {
    createTheme({ colors: { primary: "#3b82f6" } });
    tokenRegistry.set("colors.brand", "#ff6600");
    expect(tokenRegistry.get("colors.brand")).toBe("#ff6600");
  });

  test("updates the injected CSS after set()", () => {
    createTheme({ colors: { primary: "#3b82f6" } });
    tokenRegistry.set("colors.primary", "#ef4444");
    const styleEl = document.head.querySelector("style[data-tws-tokens]");
    expect(styleEl.textContent).toContain("--tws-colors-primary: #ef4444");
    expect(styleEl.textContent).not.toContain("--tws-colors-primary: #3b82f6");
  });

  test("notifies subscribers when a value changes", () => {
    createTheme({ colors: { primary: "#3b82f6" } });
    const callback = jest.fn();
    const unsubscribe = tokenRegistry.subscribe(callback);
    tokenRegistry.set("colors.primary", "#ef4444");
    expect(callback).toHaveBeenCalledTimes(1);
    unsubscribe();
  });
});

// ============================================================================
// tokenRegistry.toCSS()
// ============================================================================

describe("tokenRegistry.toCSS()", () => {
  test("returns a string starting with :root when tokens exist", () => {
    createTheme({ colors: { primary: "#3b82f6" } });
    expect(tokenRegistry.toCSS()).toMatch(/^:root\s*\{/);
  });

  test("contains expected custom property declarations", () => {
    createTheme({
      colors: { primary: "#3b82f6", secondary: "#8b5cf6" },
      spacing: { md: "1rem" },
    });
    const css = tokenRegistry.toCSS();
    expect(css).toContain("--tws-colors-primary: #3b82f6;");
    expect(css).toContain("--tws-colors-secondary: #8b5cf6;");
    expect(css).toContain("--tws-spacing-md: 1rem;");
  });

  test("closes the :root block with a closing brace", () => {
    createTheme({ colors: { primary: "#3b82f6" } });
    expect(tokenRegistry.toCSS().trim()).toMatch(/\}$/);
  });

  test("returns an empty string when no tokens are registered", () => {
    expect(tokenRegistry.toCSS()).toBe("");
  });

  test("reflects updated values after tokenRegistry.set()", () => {
    createTheme({ colors: { primary: "#3b82f6" } });
    tokenRegistry.set("colors.primary", "#ef4444");
    const css = tokenRegistry.toCSS();
    expect(css).toContain("--tws-colors-primary: #ef4444;");
    expect(css).not.toContain("--tws-colors-primary: #3b82f6;");
  });
});
