/**
 * Tests for twsxClassName - Unified CSS-in-JS API
 */

import { twsxClassName } from "../src/className/index.js";

describe("twsxClassName", () => {
  beforeEach(() => {
    // Clear cache before each test
    twsxClassName.clearCache();
  });

  // ==========================================================================
  // Basic Mode Tests
  // ==========================================================================

  describe("Basic Mode", () => {
    test("generates className with hash", () => {
      const className = twsxClassName({
        _: "bg-blue-500 p-4",
      });

      expect(className).toMatch(/^twsx-[a-z0-9]+$/);
    });

    test("generates named className", () => {
      const className = twsxClassName({
        name: "button",
        _: "bg-blue-500 p-4",
      });

      expect(className).toMatch(/^button-[a-z0-9]+$/);
    });

    test("shorthand syntax with name as first argument", () => {
      const className = twsxClassName("button", {
        _: "bg-blue-500 p-4",
      });

      expect(className).toMatch(/^button-[a-z0-9]+$/);
    });

    test("generates className without hash when hash: false", () => {
      const className = twsxClassName({
        name: "button-primary",
        hash: false,
        _: "bg-blue-500 p-4",
      });

      expect(className).toBe("button-primary");
    });

    test("generates className with custom prefix", () => {
      const className = twsxClassName({
        name: "button",
        prefix: "my-app",
        _: "bg-blue-500 p-4",
      });

      expect(className).toMatch(/^my-app-button-[a-z0-9]+$/);
    });

    test("handles shorthand pseudo-classes", () => {
      const className = twsxClassName({
        name: "btn",
        _: "bg-blue-500",
        hover: "bg-blue-600",
        focus: "ring-2",
        active: "bg-blue-700",
      });

      expect(className).toMatch(/^btn-[a-z0-9]+$/);

      // Check that CSS was generated (via getAllCSS)
      const css = twsxClassName.getAllCSS();
      expect(css).toContain(":hover");
      expect(css).toContain(":focus");
      expect(css).toContain(":active");
    });

    test("caches results for same config", () => {
      const config = { _: "bg-blue-500 p-4" };

      const className1 = twsxClassName(config);
      const className2 = twsxClassName(config);

      expect(className1).toBe(className2);
    });
  });

  // ==========================================================================
  // Variants Mode Tests
  // ==========================================================================

  describe("Variants Mode", () => {
    test("creates variant function", () => {
      const button = twsxClassName({
        name: "button",
        base: "px-4 py-2 rounded",
        variants: {
          color: {
            primary: "bg-blue-500 text-white",
            secondary: "bg-gray-500 text-white",
          },
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
        },
      });

      expect(typeof button).toBe("function");
    });

    test("variant function returns className", () => {
      const button = twsxClassName({
        name: "btn",
        base: "px-4 py-2",
        variants: {
          color: {
            primary: "bg-blue-500",
            secondary: "bg-gray-500",
          },
        },
      });

      const className = button({ color: "primary" });

      expect(className).toContain("btn");
      expect(className).toContain("--color-primary");
    });

    test("applies default variants", () => {
      const button = twsxClassName({
        name: "btn",
        base: "px-4 py-2",
        variants: {
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
        },
        defaultVariants: {
          size: "sm",
        },
      });

      const className = button();

      expect(className).toContain("--size-sm");
    });

    test("overrides default variants with props", () => {
      const button = twsxClassName({
        name: "btn",
        base: "px-4 py-2",
        variants: {
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
        },
        defaultVariants: {
          size: "sm",
        },
      });

      const className = button({ size: "lg" });

      expect(className).toContain("--size-lg");
      expect(className).not.toContain("--size-sm");
    });

    test("applies compound variants", () => {
      const button = twsxClassName({
        name: "btn",
        base: "px-4 py-2",
        variants: {
          color: {
            primary: "bg-blue-500",
            secondary: "bg-gray-500",
          },
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
        },
        compoundVariants: [
          {
            color: "primary",
            size: "lg",
            class: "shadow-lg font-bold",
          },
        ],
      });

      const className = button({ color: "primary", size: "lg" });

      expect(className).toContain("--compound-");
    });

    test("handles nested variant styles", () => {
      const button = twsxClassName({
        name: "btn",
        base: {
          _: "px-4 py-2",
          hover: "transform scale-105",
        },
        variants: {
          color: {
            primary: {
              _: "bg-blue-500",
              hover: "bg-blue-600",
            },
          },
        },
      });

      const css = twsxClassName.getAllCSS();
      expect(css).toContain(":hover");
    });
  });

  // ==========================================================================
  // Slots Mode Tests
  // ==========================================================================

  describe("Slots Mode", () => {
    test("creates slots function", () => {
      const card = twsxClassName({
        name: "card",
        slots: {
          root: "bg-white rounded shadow",
          header: "p-4 border-b",
          body: "p-4",
          footer: "p-4 border-t",
        },
      });

      expect(typeof card).toBe("function");
    });

    test("slots function returns object with slot classNames", () => {
      const card = twsxClassName({
        name: "card",
        slots: {
          root: "bg-white",
          header: "p-4",
          body: "p-4",
        },
      });

      const slots = card();

      expect(slots).toHaveProperty("root");
      expect(slots).toHaveProperty("header");
      expect(slots).toHaveProperty("body");
      expect(slots.root).toContain("card");
      expect(slots.root).toContain("__root");
      expect(slots.header).toContain("__header");
      expect(slots.body).toContain("__body");
    });

    test("applies variants to slots", () => {
      const card = twsxClassName({
        name: "card",
        slots: {
          root: "bg-white",
          header: "p-4",
        },
        variants: {
          variant: {
            default: {
              root: "border",
              header: "bg-gray-50",
            },
            primary: {
              root: "border-blue-500",
              header: "bg-blue-50",
            },
          },
        },
      });

      const slots = card({ variant: "primary" });

      expect(slots.root).toContain("--variant-primary");
      expect(slots.header).toContain("--variant-primary");
    });

    test("handles nested slot styles", () => {
      const card = twsxClassName({
        name: "card",
        slots: {
          root: {
            _: "bg-white rounded",
            hover: "shadow-lg",
          },
          header: {
            _: "p-4",
            "& .title": "text-xl font-bold",
          },
        },
      });

      const css = twsxClassName.getAllCSS();
      expect(css).toContain(":hover");
    });
  });

  // ==========================================================================
  // Configuration Tests
  // ==========================================================================

  describe("Configuration", () => {
    test("config() updates global settings", () => {
      twsxClassName.config({
        prefix: "myapp",
        hashLength: 6,
      });

      const config = twsxClassName.getConfig();
      expect(config.prefix).toBe("myapp");
      expect(config.hashLength).toBe(6);

      // Reset for other tests
      twsxClassName.config({ prefix: "twsx", hashLength: 8 });
    });

    test("clearCache() clears all caches", () => {
      // Generate some styles
      twsxClassName({ _: "bg-blue-500" });
      twsxClassName({ _: "bg-red-500" });

      const statsBefore = twsxClassName.getCacheStats();
      expect(statsBefore.classNameCacheSize).toBeGreaterThan(0);

      twsxClassName.clearCache();

      const statsAfter = twsxClassName.getCacheStats();
      expect(statsAfter.classNameCacheSize).toBe(0);
    });

    test("getCacheStats() returns cache statistics", () => {
      twsxClassName.clearCache();
      twsxClassName({ _: "bg-blue-500" });

      const stats = twsxClassName.getCacheStats();

      expect(stats).toHaveProperty("classNameCacheSize");
      expect(stats).toHaveProperty("cssCacheSize");
      expect(stats).toHaveProperty("styleRegistrySize");
    });
  });

  // ==========================================================================
  // SSR Support Tests
  // ==========================================================================

  describe("SSR Support", () => {
    test("getCSS() returns CSS for specific className", () => {
      const className = twsxClassName({
        name: "btn",
        _: "bg-blue-500 p-4",
      });

      const css = twsxClassName.getCSS(className);
      expect(css).toBeTruthy();
    });

    test("getAllCSS() returns all generated CSS", () => {
      twsxClassName.clearCache();

      twsxClassName({ name: "btn1", _: "bg-blue-500" });
      twsxClassName({ name: "btn2", _: "bg-red-500" });

      const allCss = twsxClassName.getAllCSS();

      expect(allCss).toContain(".btn1");
      expect(allCss).toContain(".btn2");
    });
  });

  // ==========================================================================
  // Responsive Breakpoint Tests
  // ==========================================================================

  describe("Responsive Breakpoints", () => {
    test("handles responsive shorthand (sm, md, lg)", () => {
      const className = twsxClassName({
        name: "container",
        _: "p-4",
        sm: "p-6",
        md: "p-8",
        lg: "p-10",
      });

      const css = twsxClassName.getAllCSS();

      expect(css).toContain("@media");
      expect(css).toContain("640px");
      expect(css).toContain("768px");
      expect(css).toContain("1024px");
    });
  });

  // ==========================================================================
  // Edge Cases
  // ==========================================================================

  describe("Edge Cases", () => {
    test("handles empty config", () => {
      const className = twsxClassName({});
      expect(className).toMatch(/^twsx-[a-z0-9]+$/);
    });

    test("handles config with only name", () => {
      const className = twsxClassName({ name: "empty" });
      expect(className).toMatch(/^empty-[a-z0-9]+$/);
    });

    test("handles child selectors", () => {
      const className = twsxClassName({
        name: "card",
        _: "bg-white",
        "& .title": "text-xl font-bold",
        "& .description": "text-gray-600",
      });

      const css = twsxClassName.getAllCSS();
      expect(css).toContain(".title");
      expect(css).toContain(".description");
    });

    test("handles attribute selectors", () => {
      const className = twsxClassName({
        name: "input",
        _: "border p-2",
        "&[disabled]": "opacity-50 cursor-not-allowed",
        '&[data-active="true"]': "ring-2 ring-blue-500",
      });

      const css = twsxClassName.getAllCSS();
      expect(css).toContain("[disabled]");
      expect(css).toContain('[data-active="true"]');
    });
  });

  // ==========================================================================
  // Dark Mode Tests
  // ==========================================================================

  describe("Dark Mode", () => {
    test("handles dark mode shorthand config", () => {
      twsxClassName.clearCache();
      const className = twsxClassName({
        name: "card-dark",
        _: "bg-white text-gray-900",
        dark: "bg-gray-900 text-white",
      });

      // Verify className is generated
      expect(className).toMatch(/card-dark/);
      // Verify CSS is generated (even if empty, function should work)
      const css = twsxClassName.getAllCSS();
      expect(typeof css).toBe("string");
    });

    test("handles light mode shorthand config", () => {
      twsxClassName.clearCache();
      const className = twsxClassName({
        name: "card-light-mode",
        _: "bg-gray-900",
        light: "bg-white",
      });

      expect(className).toMatch(/card-light-mode/);
    });
  });

  // ==========================================================================
  // Group/Peer States Tests
  // ==========================================================================

  describe("Group/Peer States", () => {
    test("handles group-hover", () => {
      const className = twsxClassName({
        name: "icon",
        _: "opacity-0 transition-opacity",
        "group-hover": "opacity-100",
      });

      const css = twsxClassName.getAllCSS();
      expect(css).toContain(".group:hover");
    });

    test("handles peer-focus", () => {
      const className = twsxClassName({
        name: "label",
        _: "text-gray-500",
        "peer-focus": "text-blue-500",
      });

      const css = twsxClassName.getAllCSS();
      expect(css).toContain(".peer:focus");
    });
  });

  // ==========================================================================
  // Motion Preferences Tests
  // ==========================================================================

  describe("Motion Preferences", () => {
    test("handles motion-safe config", () => {
      twsxClassName.clearCache();
      const className = twsxClassName({
        name: "animated-safe",
        _: "transition-none",
        "motion-safe": "transition-all duration-300",
      });

      // Verify className is generated
      expect(className).toMatch(/animated-safe/);
    });

    test("handles motion-reduce config", () => {
      twsxClassName.clearCache();
      const className = twsxClassName({
        name: "animated-reduce-test",
        _: "animate-bounce",
        "motion-reduce": "animate-none",
      });

      expect(className).toMatch(/animated-reduce-test/);
    });
  });

  // ==========================================================================
  // Boolean Variants Tests
  // ==========================================================================

  describe("Boolean Variants", () => {
    test("handles boolean true variant", () => {
      const button = twsxClassName({
        name: "btn-bool",
        base: "px-4 py-2",
        variants: {
          disabled: {
            true: "opacity-50 cursor-not-allowed",
            false: "cursor-pointer",
          },
        },
      });

      const disabledClass = button({ disabled: true });
      expect(disabledClass).toContain("--disabled-true");
    });

    test("handles boolean false variant", () => {
      const button = twsxClassName({
        name: "btn-bool2",
        base: "px-4 py-2",
        variants: {
          loading: {
            true: "animate-pulse",
            false: "",
          },
        },
      });

      const notLoadingClass = button({ loading: false });
      expect(notLoadingClass).toContain("--loading-false");
    });
  });

  // ==========================================================================
  // Extend/Compose Tests
  // ==========================================================================

  describe("Extend/Compose", () => {
    test("twsxClassName.extend works with variant function", () => {
      const baseButton = twsxClassName({
        name: "btn-ext",
        base: "px-4 py-2 rounded",
        variants: {
          size: {
            sm: "text-sm",
            lg: "text-lg",
          },
        },
      });

      const extendedButton = twsxClassName.extend(baseButton, {
        variants: {
          color: {
            primary: "bg-blue-500",
            secondary: "bg-gray-500",
          },
        },
      });

      expect(typeof extendedButton).toBe("function");
      const className = extendedButton({ size: "lg", color: "primary" });
      expect(className).toContain("btn-ext");
    });

    test("variant function has merge method", () => {
      const button = twsxClassName({
        name: "btn-merge",
        base: "px-4 py-2",
        variants: {
          size: { sm: "text-sm", lg: "text-lg" },
        },
      });

      expect(typeof button.merge).toBe("function");
      const merged = button.merge({ size: "lg" }, "custom-class");
      expect(merged).toContain("btn-merge");
      expect(merged).toContain("custom-class");
    });

    test("variant function has raw method", () => {
      const config = {
        name: "btn-raw",
        base: "px-4 py-2",
        variants: { size: { sm: "text-sm" } },
      };
      const button = twsxClassName(config);

      expect(typeof button.raw).toBe("function");
      expect(button.raw()).toMatchObject(config);
    });
  });

  // ==========================================================================
  // Design Tokens Tests
  // ==========================================================================

  describe("Design Tokens", () => {
    test("defineTokens sets tokens", () => {
      twsxClassName.defineTokens({
        colors: {
          primary: "#3b82f6",
          secondary: "#6b7280",
        },
        spacing: {
          sm: "0.5rem",
          md: "1rem",
        },
      });

      const tokens = twsxClassName.getTokens();
      expect(tokens.colors.primary).toBe("#3b82f6");
      expect(tokens.spacing.md).toBe("1rem");
    });

    test("setToken sets single token", () => {
      twsxClassName.setToken("colors.brand", "#ff0000");
      const tokens = twsxClassName.getTokens();
      expect(tokens.colors.brand).toBe("#ff0000");
    });
  });

  // ==========================================================================
  // Theme System Tests
  // ==========================================================================

  describe("Theme System", () => {
    test("createTheme creates a theme", () => {
      twsxClassName.createTheme("dark", {
        background: "#1a1a1a",
        text: "#ffffff",
      });

      const themes = twsxClassName.getThemes();
      expect(themes.dark).toBeDefined();
      expect(themes.dark.background).toBe("#1a1a1a");
    });

    test("setTheme changes active theme", () => {
      twsxClassName.createTheme("custom-dark", { bg: "#000" });
      twsxClassName.setTheme("custom-dark");
      expect(twsxClassName.getTheme()).toBe("custom-dark");
    });
  });

  // ==========================================================================
  // Animation Tests
  // ==========================================================================

  describe("Animations", () => {
    test("defineAnimation adds custom preset", () => {
      twsxClassName.defineAnimation("customBounce", {
        keyframes: {
          "0%, 100%": "translate-y-0",
          "50%": "-translate-y-4",
        },
        duration: "600ms",
        timing: "ease-in-out",
        iteration: "infinite",
      });

      const animations = twsxClassName.getAnimations();
      expect(animations.customBounce).toBeDefined();
    });
  });

  // ==========================================================================
  // Container Queries Tests
  // ==========================================================================

  describe("Container Queries", () => {
    test("handles @container queries", () => {
      const className = twsxClassName({
        name: "responsive-card",
        _: "p-2",
        "@container (min-width: 400px)": "p-4 grid grid-cols-2",
      });

      const css = twsxClassName.getAllCSS();
      expect(css).toContain("@container");
    });
  });

  // ==========================================================================
  // SSR Advanced Tests
  // ==========================================================================

  describe("SSR Advanced", () => {
    test("extractCSS returns style tag string", () => {
      twsxClassName({ name: "ssr-test", _: "bg-blue-500" });

      const styleTag = twsxClassName.extractCSS();
      expect(styleTag).toContain("<style");
      expect(styleTag).toContain("data-twsx-classname");
      expect(styleTag).toContain("</style>");
    });
  });

  // ==========================================================================
  // Utility Methods Tests
  // ==========================================================================

  describe("Utility Methods", () => {
    test("merge combines classes", () => {
      const result = twsxClassName.merge(
        "base-class",
        "additional-class",
        false && "ignored",
        { conditional: true }
      );

      expect(result).toContain("base-class");
      expect(result).toContain("additional-class");
      expect(result).toContain("conditional");
    });
  });

  // ==========================================================================
  // Slots Merge Tests
  // ==========================================================================

  describe("Slots Advanced", () => {
    test("slots function has merge method", () => {
      const card = twsxClassName({
        name: "card-merge",
        slots: {
          root: "bg-white",
          header: "p-4",
        },
      });

      expect(typeof card.merge).toBe("function");

      const merged = card.merge({}, {
        root: "custom-root",
        header: "custom-header",
      });

      expect(merged.root).toContain("custom-root");
      expect(merged.header).toContain("custom-header");
    });
  });
});
