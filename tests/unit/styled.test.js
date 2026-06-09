/**
 * @jest-environment jsdom
 *
 * Tests for styled() — The Unified API
 *
 * styled() replaces: twsxClassName, twsxVariants, tw, and twsx (basic usage)
 */

import { styled, tws, cx } from "../../src/index.js";

describe("styled() — Unified API", () => {
  beforeEach(() => {
    styled.clearCache();
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // BASIC MODE
  // ═════════════════════════════════════════════════════════════════════════════
  describe("Basic Mode", () => {
    test("returns a className string", () => {
      const className = styled({ name: "button", base: "px-4 py-2 bg-blue-500" });
      expect(typeof className).toBe("string");
      expect(className).toMatch(/^button-/);
    });

    test("auto-injects CSS for base styles", () => {
      styled({ name: "btn", base: "p-4 bg-red-500" });
      const css = styled.getAllCSS();
      expect(css).toContain(".btn-");
      expect(css).toContain("padding");
      expect(css).toContain("background-color");
    });

    test("supports hover shorthand", () => {
      styled({ name: "link", base: "text-blue-500", hover: "text-blue-700" });
      const css = styled.getAllCSS();
      expect(css).toContain(":hover");
    });

    test("supports dark shorthand", () => {
      styled({ name: "card", base: "bg-white", dark: "bg-gray-900" });
      const css = styled.getAllCSS();
      expect(css).toContain("@media");
      expect(css).toContain("prefers-color-scheme: dark");
    });

    test("supports focus shorthand", () => {
      styled({ name: "input", base: "border-gray-300", focus: "border-blue-500" });
      const css = styled.getAllCSS();
      expect(css).toContain(":focus");
    });

    test("supports @container shorthand", () => {
      styled({
        name: "responsive-box",
        base: "p-2",
        "@container (min-width: 400px)": "p-4",
      });
      const css = styled.getAllCSS();
      expect(css).toContain("@container");
    });

    test("supports nested child selectors", () => {
      styled({
        name: "card",
        base: "bg-white",
        ".title": "text-xl font-bold",
        ".body": "p-4",
      });
      const css = styled.getAllCSS();
      expect(css).toContain(".title");
      expect(css).toContain(".body");
    });
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // VARIANTS MODE
  // ═════════════════════════════════════════════════════════════════════════════
  describe("Variants Mode", () => {
    test("returns a function", () => {
      const button = styled({
        name: "btn",
        base: "px-4 py-2 rounded-lg font-medium",
        variants: {
          color: {
            primary: "bg-blue-500 text-white",
            danger: "bg-red-500 text-white",
          },
          size: {
            sm: "text-sm px-3 py-1.5",
            lg: "text-lg px-6 py-3",
          },
        },
        defaultVariants: { color: "primary", size: "sm" },
      });

      expect(typeof button).toBe("function");
    });

    test("returns base className with defaults", () => {
      const button = styled({
        name: "btn",
        base: "px-4 py-2 rounded-lg",
        variants: {
          color: { primary: "bg-blue-500", danger: "bg-red-500" },
        },
        defaultVariants: { color: "primary" },
      });

      const classes = button();
      expect(classes).toContain("btn");
    });

    test("applies variant classes", () => {
      const button = styled({
        name: "btn",
        base: "px-4 py-2 rounded-lg",
        variants: {
          color: { primary: "bg-blue-500", danger: "bg-red-500" },
        },
        defaultVariants: { color: "primary" },
      });

      const classes = button({ color: "danger" });
      expect(classes).toContain("btn");
      expect(classes).toMatch(/btn-[a-z0-9]+--color-danger/);
    });

    test("auto-injects CSS for all variant combinations", () => {
      styled({
        name: "badge",
        base: "px-2 py-1 rounded font-medium",
        variants: {
          status: {
            success: "bg-green-100 text-green-800",
            error: "bg-red-100 text-red-800",
          },
        },
        defaultVariants: { status: "success" },
      });

      const css = styled.getAllCSS();
      expect(css).toContain(".badge");
      expect(css).toMatch(/badge-[a-z0-9]+--status-success/);
      expect(css).toMatch(/badge-[a-z0-9]+--status-error/);
    });

    test("supports compound variants", () => {
      const button = styled({
        name: "btn",
        base: "px-4 py-2 rounded-lg",
        variants: {
          color: { primary: "bg-blue-500", danger: "bg-red-500" },
          size: { sm: "text-sm", lg: "text-lg" },
        },
        compoundVariants: [
          {
            color: "danger",
            size: "lg",
            class: "shadow-lg",
          },
        ],
        defaultVariants: { color: "primary", size: "sm" },
      });

      const classes = button({ color: "danger", size: "lg" });
      expect(classes).toMatch(/btn-[a-z0-9]+--compound-0/);
    });
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // SLOTS MODE
  // ═════════════════════════════════════════════════════════════════════════════
  describe("Slots Mode", () => {
    test("returns a function", () => {
      const card = styled({
        name: "card",
        slots: {
          root: "bg-white rounded-xl shadow-lg",
          header: "px-6 py-4 border-b",
          body: "px-6 py-4",
        },
      });

      expect(typeof card).toBe("function");
    });

    test("returns slot classNames", () => {
      const card = styled({
        name: "card",
        slots: {
          root: "bg-white rounded-xl",
          body: "p-4",
        },
      });

      const classes = card();
      expect(classes.root).toMatch(/card-[a-z0-9]+__root/);
      expect(classes.body).toMatch(/card-[a-z0-9]+__body/);
    });

    test("auto-injects CSS for all slots", () => {
      styled({
        name: "card",
        slots: {
          root: "bg-white rounded-xl shadow-lg",
          header: "px-6 py-4 border-b border-gray-200",
          title: "text-xl font-bold text-gray-900",
          body: "px-6 py-4",
          footer: "px-6 py-4 border-t border-gray-200",
        },
      });

      const css = styled.getAllCSS();
      expect(css).toMatch(/card-[a-z0-9]+__root/);
      expect(css).toMatch(/card-[a-z0-9]+__header/);
      expect(css).toMatch(/card-[a-z0-9]+__title/);
      expect(css).toMatch(/card-[a-z0-9]+__body/);
      expect(css).toMatch(/card-[a-z0-9]+__footer/);
    });

    test("supports variants on slots", () => {
      const card = styled({
        name: "card",
        slots: {
          root: "bg-white rounded-xl",
          body: "p-4",
        },
        variants: {
          variant: {
            elevated: { root: "shadow-2xl" },
            outlined: { root: "border-2" },
          },
        },
        defaultVariants: { variant: "elevated" },
      });

      const classes = card({ variant: "outlined" });
      expect(classes.root).toMatch(/card-[a-z0-9]+__root--variant-outlined/);
    });
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // styled.css() — Raw CSS Injection
  // ═════════════════════════════════════════════════════════════════════════════
  describe("styled.css() — Raw CSS Injection", () => {
    test("injects CSS from nested object", () => {
      styled.css({
        ".card": "bg-white p-6 rounded-xl",
        ".card:hover": "shadow-lg",
      });

      const css = styled.getAllCSS();
      expect(css).toContain(".card");
      expect(css).toContain(":hover");
    });

    test("supports @media queries", () => {
      styled.css({
        "@media (min-width: 768px)": {
          ".card": "grid-cols-2",
        },
      });

      const css = styled.getAllCSS();
      expect(css).toContain("@media");
    });

    test("supports @container queries", () => {
      styled.css({
        "@container (min-width: 400px)": {
          ".item": "grid-cols-2",
        },
      });

      const css = styled.getAllCSS();
      expect(css).toContain("@container");
    });

    test("supports @scope", () => {
      styled.css({
        "@scope (.card) to (.content)": {
          ".title": "text-xl font-bold",
        },
      });

      const css = styled.getAllCSS();
      expect(css).toContain("@scope");
    });

    test("returns CSS string without injection when inject: false", () => {
      styled.clearCache();
      const css = styled.css(
        {
          ".box": "p-4 bg-blue-500",
        },
        { inject: false }
      );

      expect(typeof css).toBe("string");
      expect(css).toContain(".box");
      expect(css).toContain("padding");

      // Should NOT be in registry
      expect(styled.getAllCSS()).toBe("");
    });
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // UTILITY METHODS
  // ═════════════════════════════════════════════════════════════════════════════
  describe("Utility Methods", () => {
    test("styled.clearCache() works", () => {
      styled({ name: "test", base: "p-4" });
      expect(styled.getAllCSS()).not.toBe("");

      styled.clearCache();
      expect(styled.getAllCSS()).toBe("");
    });

    test("styled.getCacheStats() returns stats", () => {
      const stats = styled.getCacheStats();
      expect(stats).toHaveProperty("classNameCacheSize");
      expect(stats).toHaveProperty("cssCacheSize");
      expect(stats).toHaveProperty("styleRegistrySize");
    });

    test("styled.getAllCSS() returns all injected CSS", () => {
      styled({ name: "btn", base: "px-4 py-2" });
      styled({ name: "card", base: "bg-white p-6" });

      const css = styled.getAllCSS();
      expect(css).toContain("btn-");
      expect(css).toContain("card-");
    });

    test("styled.config() sets global config", () => {
      styled.config({ prefix: "my-app", hash: false });
      const className = styled({ name: "btn", base: "p-4" });
      expect(className).toBe("my-app-btn");

      // Reset
      styled.config({ prefix: "twsx", hash: true });
    });
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // INTEGRATION: styled + cx
  // ═════════════════════════════════════════════════════════════════════════════
  describe("Integration with cx()", () => {
    test("styled works with cx for conditional classes", () => {
      const btnClass = styled({ name: "btn", base: "px-4 py-2" });
      const isDisabled = true;
      const finalClass = cx(btnClass, isDisabled && "opacity-50");

      expect(finalClass).toContain("btn-");
      expect(finalClass).toContain("opacity-50");
    });

    test("styled variants + cx", () => {
      const button = styled({
        name: "btn",
        base: "px-4 py-2 rounded-lg",
        variants: {
          color: { primary: "bg-blue-500", danger: "bg-red-500" },
        },
        defaultVariants: { color: "primary" },
      });

      const classes = cx(button({ color: "danger" }), "shadow-lg");
      expect(classes).toMatch(/btn-[a-z0-9]+--color-danger/);
      expect(classes).toContain("shadow-lg");
    });
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // INTEGRATION: styled + tws
  // ═════════════════════════════════════════════════════════════════════════════
  describe("Integration with tws()", () => {
    test("tws converts styled base classes to inline styles", () => {
      const style = tws("px-4 py-2 bg-blue-500 text-white", true);
      expect(style).toHaveProperty("paddingLeft");
      expect(style).toHaveProperty("paddingTop");
      expect(style).toHaveProperty("backgroundColor");
    });
  });
});
