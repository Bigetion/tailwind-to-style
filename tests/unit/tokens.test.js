/**
 * @jest-environment jsdom
 *
 * Tests for Token Registry & Reactivity
 */

import { tokenRegistry } from "../../src/tokens/registry.js";
import { styled } from "../../src/index.js";

describe("Token Registry", () => {
  beforeEach(() => {
    tokenRegistry.replace({
      colors: {},
      spacing: {},
      fontSize: {},
      fontWeight: {},
      borderRadius: {},
      shadow: {},
      animation: {},
      custom: {},
    });
    styled.clearCache();
  });

  test("get() returns current tokens", () => {
    const tokens = tokenRegistry.get();
    expect(tokens).toHaveProperty("colors");
    expect(tokens).toHaveProperty("spacing");
  });

  test("set() merges tokens", () => {
    tokenRegistry.set({ colors: { primary: "#3b82f6" } });
    expect(tokenRegistry.get().colors.primary).toBe("#3b82f6");
  });

  test("set() deep merges without overwriting unrelated keys", () => {
    tokenRegistry.set({ colors: { primary: "#3b82f6" } });
    tokenRegistry.set({ colors: { secondary: "#ef4444" } });
    expect(tokenRegistry.get().colors.primary).toBe("#3b82f6");
    expect(tokenRegistry.get().colors.secondary).toBe("#ef4444");
  });

  test("subscribe() receives updates", () => {
    let callCount = 0;
    let lastTokens = null;
    const fn = (tokens) => {
      callCount++;
      lastTokens = tokens;
    };
    const unsubscribe = tokenRegistry.subscribe(fn);

    tokenRegistry.set({ colors: { primary: "#3b82f6" } });
    expect(callCount).toBe(1);
    expect(lastTokens.colors.primary).toBe("#3b82f6");

    unsubscribe();
    tokenRegistry.set({ colors: { primary: "#ef4444" } });
    expect(callCount).toBe(1); // no more calls after unsubscribe
  });

  test("replace() replaces entire token set", () => {
    tokenRegistry.set({ colors: { primary: "#3b82f6" } });
    tokenRegistry.replace({ colors: { danger: "#ef4444" } });
    expect(tokenRegistry.get().colors.danger).toBe("#ef4444");
    expect(tokenRegistry.get().colors.primary).toBeUndefined();
  });

  test("getByPath() resolves nested paths", () => {
    tokenRegistry.set({ colors: { primary: "#3b82f6" } });
    expect(tokenRegistry.getByPath("colors.primary")).toBe("#3b82f6");
    expect(tokenRegistry.getByPath("colors.missing")).toBeUndefined();
  });
});

describe("Token Integration with styled()", () => {
  beforeEach(() => {
    tokenRegistry.replace({
      colors: { primary: "blue-500" },
      spacing: { md: "4" },
      fontSize: {},
      fontWeight: {},
      borderRadius: {},
      shadow: {},
      animation: {},
      custom: {},
    });
    styled.clearCache();
  });

  test("styled() resolves $token references into valid Tailwind classes", () => {
    const btn = styled({
      name: "btn",
      base: "bg-$colors.primary p-$spacing.md rounded-lg",
    });

    const css = styled.getAllCSS();
    // bg-blue-500 → background-color: #3b82f6
    expect(css).toContain("background-color");
    // p-4 → padding: 1rem
    expect(css).toContain("padding");
  });

  test("styled() falls back to raw string for unknown tokens", () => {
    const btn = styled({
      name: "btn",
      base: "bg-$colors.missing px-4",
    });

    const css = styled.getAllCSS();
    // Should keep the raw $colors.missing since token doesn't exist
    // and not generate invalid CSS
    expect(css).not.toContain("undefined");
    expect(css).not.toContain("null");
  });

  test("token change + clearCache regenerates new CSS", () => {
    styled({
      name: "btn",
      base: "bg-$colors.primary p-$spacing.md",
    });

    const cssBefore = styled.getAllCSS();
    expect(cssBefore).toContain("background-color");

    // Update token
    tokenRegistry.set({ colors: { primary: "red-500" } });
    styled.clearCache();

    styled({
      name: "btn",
      base: "bg-$colors.primary p-$spacing.md",
    });

    const cssAfter = styled.getAllCSS();
    expect(cssAfter).toContain("background-color");
  });
});
