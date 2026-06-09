/**
 * @jest-environment jsdom
 * 
 * Tests for Modern CSS Features
 * 
 * Covers: Fluid Design, Logical Properties, Modern Color,
 * Smart Selectors, Container Queries, CSS Scope, Auto-Dark Mode
 */

import { tws, twsx, toDarkMode, generateDarkVariant } from "../../src/index.js";

describe("Modern CSS Features", () => {
  beforeEach(() => {
    // Clear any injected styles
    const styleTag = document.getElementById("twsx-auto-style");
    if (styleTag) styleTag.textContent = "";
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // FLUID DESIGN SYSTEM
  // ═════════════════════════════════════════════════════════════════════════════
  describe("Fluid Design System", () => {
    test("fluid-text-sm generates clamp() value", () => {
      const result = tws("fluid-text-sm");
      expect(result).toContain("clamp(");
      expect(result).toContain("font-size");
    });

    test("fluid-text-base generates clamp() value", () => {
      const result = tws("fluid-text-base");
      expect(result).toContain("clamp(");
    });

    test("fluid-p-4 generates fluid padding", () => {
      const result = tws("fluid-p-4");
      expect(result).toContain("clamp(");
      expect(result).toContain("padding");
    });

    test("fluid-gap-2 generates fluid gap", () => {
      const result = tws("fluid-gap-2");
      expect(result).toContain("clamp(");
      expect(result).toContain("gap");
    });

    test("fluid-container text sizes use cqi units", () => {
      const result = tws("fluid-text-cqi-1");
      expect(result).toContain("cqi");
    });

    test("fluid margin utilities exist", () => {
      const result = tws("fluid-m-4");
      expect(result).toContain("clamp(");
      expect(result).toContain("margin");
    });
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // LOGICAL PROPERTIES
  // ═════════════════════════════════════════════════════════════════════════════
  describe("Logical Properties", () => {
    test("mbs-4 generates margin-block-start", () => {
      const result = tws("mbs-4");
      expect(result).toContain("margin-block-start");
    });

    test("mbe-4 generates margin-block-end", () => {
      const result = tws("mbe-4");
      expect(result).toContain("margin-block-end");
    });

    test("mis-4 generates margin-inline-start", () => {
      const result = tws("mis-4");
      expect(result).toContain("margin-inline-start");
    });

    test("mie-4 generates margin-inline-end", () => {
      const result = tws("mie-4");
      expect(result).toContain("margin-inline-end");
    });

    test("pbs-4 generates padding-block-start", () => {
      const result = tws("pbs-4");
      expect(result).toContain("padding-block-start");
    });

    test("pis-4 generates padding-inline-start", () => {
      const result = tws("pis-4");
      expect(result).toContain("padding-inline-start");
    });

    test("bs-full generates block-size: 100%", () => {
      const result = tws("bs-full");
      expect(result).toContain("block-size");
    });

    test("is-full generates inline-size: 100%", () => {
      const result = tws("is-full");
      expect(result).toContain("inline-size");
    });

    test("inset-bs-0 generates inset-block-start", () => {
      const result = tws("inset-bs-0");
      expect(result).toContain("inset-block-start");
    });

    test("overflow-b-auto generates overflow-block", () => {
      const result = tws("overflow-b-auto");
      expect(result).toContain("overflow-block");
    });

    test("rounded-bs-sm generates logical border radius", () => {
      const result = tws("rounded-bs-sm");
      expect(result).toContain("border-start-start-radius");
      expect(result).toContain("border-start-end-radius");
    });

    test("bsw-2 generates logical border width", () => {
      const result = tws("bsw-2");
      expect(result).toContain("border-block-start-width");
    });

    test("scroll-mbs-4 generates scroll-margin-block-start", () => {
      const result = tws("scroll-mbs-4");
      expect(result).toContain("scroll-margin-block-start");
    });
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // MODERN COLOR ENGINE
  // ═════════════════════════════════════════════════════════════════════════════
  describe("Modern Color Engine", () => {
    test("bg-oklch-blue-500 generates oklch color", () => {
      const result = tws("bg-oklch-blue-500");
      expect(result).toContain("oklch(");
      expect(result).toContain("background-color");
    });

    test("text-oklch-red-500 generates oklch text color", () => {
      const result = tws("text-oklch-red-500");
      expect(result).toContain("oklch(");
      expect(result).toContain("color");
    });

    test("border-oklch-green-500 generates oklch border color", () => {
      const result = tws("border-oklch-green-500");
      expect(result).toContain("oklch(");
      expect(result).toContain("border-color");
    });

    test("bg-mix-oklch-50 sets up color-mix", () => {
      const result = tws("bg-mix-oklch-50");
      expect(result).toContain("color-mix");
      expect(result).toContain("in oklch");
    });

    test("bg-relative-lighten uses relative color syntax", () => {
      const result = tws("bg-relative-lighten");
      expect(result).toContain("oklch(from");
    });

    test("bg-relative-darken uses relative color syntax", () => {
      const result = tws("bg-relative-darken");
      expect(result).toContain("oklch(from");
    });

    test("bg-relative-rotate-30 uses hue rotation", () => {
      const result = tws("bg-relative-rotate-30");
      expect(result).toContain("calc(h + 30)");
    });

    test("contrast-auto generates auto-contrast text", () => {
      const result = tws("contrast-auto");
      expect(result).toContain("oklch(from");
      expect(result).toContain("color");
    });

    test("bg-p3-red generates display-p3 color", () => {
      const result = tws("bg-p3-red");
      expect(result).toContain("display-p3");
    });
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // MODERN TYPOGRAPHY
  // ═════════════════════════════════════════════════════════════════════════════
  describe("Modern Typography", () => {
    test("text-pretty generates text-wrap: pretty", () => {
      const result = tws("text-pretty");
      expect(result).toContain("text-wrap: pretty");
    });

    test("text-balance generates text-wrap: balance", () => {
      const result = tws("text-balance");
      expect(result).toContain("text-wrap: balance");
    });

    test("text-stable generates text-wrap: stable", () => {
      const result = tws("text-stable");
      expect(result).toContain("text-wrap: stable");
    });

    test("text-wrap generates text-wrap: wrap", () => {
      const result = tws("text-wrap");
      expect(result).toContain("text-wrap: wrap");
    });

    test("text-nowrap generates text-wrap: nowrap", () => {
      const result = tws("text-nowrap");
      expect(result).toContain("text-wrap: nowrap");
    });

    test("text-spacing-trim-trim-start generates text-spacing-trim", () => {
      const result = tws("text-spacing-trim-trim-start");
      expect(result).toContain("text-spacing-trim");
    });

    test("break-phrase generates word-break: auto-phrase", () => {
      const result = tws("break-phrase");
      expect(result).toContain("word-break: auto-phrase");
    });

    test("underline-from-font generates text-decoration-thickness: from-font", () => {
      const result = tws("underline-from-font");
      expect(result).toContain("text-decoration-thickness: from-font");
    });
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // CONTENT VISIBILITY & PERFORMANCE
  // ═════════════════════════════════════════════════════════════════════════════
  describe("Content Visibility & Performance", () => {
    test("content-auto generates content-visibility: auto", () => {
      const result = tws("content-auto");
      expect(result).toContain("content-visibility: auto");
    });

    test("content-visible generates content-visibility: visible", () => {
      const result = tws("content-visible");
      expect(result).toContain("content-visibility: visible");
    });

    test("content-hidden generates content-visibility: hidden", () => {
      const result = tws("content-hidden");
      expect(result).toContain("content-visibility: hidden");
    });

    test("contain-strict generates contain: strict", () => {
      const result = tws("contain-strict");
      expect(result).toContain("contain: strict");
    });

    test("contain-content generates contain: content", () => {
      const result = tws("contain-content");
      expect(result).toContain("contain: content");
    });

    test("contain-layout generates contain: layout", () => {
      const result = tws("contain-layout");
      expect(result).toContain("contain: layout");
    });

    test("contain-paint generates contain: paint", () => {
      const result = tws("contain-paint");
      expect(result).toContain("contain: paint");
    });

    test("intrinsic-size-md generates contain-intrinsic-size", () => {
      const result = tws("intrinsic-size-md");
      expect(result).toContain("contain-intrinsic-size");
    });

    test("will-change-scroll generates will-change: scroll-position", () => {
      const result = tws("will-change-scroll");
      expect(result).toContain("will-change: scroll-position");
    });
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // MODERN LAYOUT
  // ═════════════════════════════════════════════════════════════════════════════
  describe("Modern Layout", () => {
    test("grid-cols-subgrid generates subgrid", () => {
      const result = tws("grid-cols-subgrid");
      expect(result).toContain("subgrid");
    });

    test("grid-rows-subgrid generates subgrid", () => {
      const result = tws("grid-rows-subgrid");
      expect(result).toContain("subgrid");
    });

    test("container-type-inline generates container-type: inline-size", () => {
      const result = tws("container-type-inline");
      expect(result).toContain("container-type: inline-size");
    });

    test("container-type-size generates container-type: size", () => {
      const result = tws("container-type-size");
      expect(result).toContain("container-type: size");
    });

    test("w-stretch generates width stretch fallback", () => {
      const result = tws("w-stretch");
      // Uses -webkit-fill-available or -moz-available as fallback
      expect(result).toMatch(/width:\s*(stretch|-webkit-fill-available|-moz-available)/);
    });

    test("display-contents generates display: contents", () => {
      const result = tws("display-contents");
      expect(result).toContain("display: contents");
    });
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // ANCHOR POSITIONING
  // ═════════════════════════════════════════════════════════════════════════════
  describe("Anchor Positioning", () => {
    test("anchor generates anchor-name", () => {
      const result = tws("anchor");
      expect(result).toContain("anchor-name");
    });

    test("positioned generates position-anchor", () => {
      const result = tws("positioned");
      expect(result).toContain("position-anchor");
    });

    test("inset-area-top generates inset-area", () => {
      const result = tws("inset-area-top");
      expect(result).toContain("inset-area");
    });

    test("anchor-size-width generates anchor-size", () => {
      const result = tws("anchor-size-width");
      expect(result).toContain("anchor-size");
    });

    test("position-try-auto generates position-try-fallbacks", () => {
      const result = tws("position-try-auto");
      expect(result).toContain("position-try-fallbacks");
    });

    test("popover-auto generates popover: auto", () => {
      const result = tws("popover-auto");
      expect(result).toContain("popover: auto");
    });
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // SCROLL-DRIVEN ANIMATIONS
  // ═════════════════════════════════════════════════════════════════════════════
  describe("Scroll-Driven Animations", () => {
    test("view-timeline generates view-timeline", () => {
      const result = tws("view-timeline");
      expect(result).toContain("view-timeline");
    });

    test("animation-timeline-view generates animation-timeline", () => {
      const result = tws("animation-timeline-view");
      expect(result).toContain("animation-timeline");
    });

    test("animation-range-entry generates animation-range", () => {
      const result = tws("animation-range-entry");
      expect(result).toContain("animation-range");
    });

    test("scroll-fade-in generates scroll-driven animation class", () => {
      const result = tws("scroll-fade-in");
      expect(result).toContain("animation");
    });

    test("scroll-progress-bar generates progress animation", () => {
      const result = tws("scroll-progress-bar");
      expect(result).toContain("animation");
    });
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // SMART SELECTOR VARIANTS
  // ═════════════════════════════════════════════════════════════════════════════
  describe("Smart Selector Variants", () => {
    test("twsx supports :has() via has-[...] variant", () => {
      const css = twsx({
        ".card": {
          "&:hover": "shadow-lg",
          "has-[input:focus]": "ring-2",
        },
      }, { inject: false });
      expect(css).toContain(":has(input:focus)");
    });

    test("twsx supports :not() via not-[...] variant", () => {
      const css = twsx({
        ".card": {
          "not-[.active]": "opacity-50",
        },
      }, { inject: false });
      expect(css).toContain(":not(.active)");
    });
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // CSS SCOPE & CONTAINER QUERIES IN TWSX
  // ═════════════════════════════════════════════════════════════════════════════
  describe("CSS Scope & Container Queries in twsx", () => {
    test("twsx supports @scope", () => {
      const css = twsx({
        "@scope (.card) to (.content)": {
          ".title": "text-xl font-bold",
        },
      }, { inject: false });
      expect(css).toContain("@scope (.card) to (.content)");
      expect(css).toContain(".title");
    });

    test("twsx supports @container", () => {
      const css = twsx({
        "@container (min-width: 400px)": {
          ".card": "grid-cols-2",
        },
      }, { inject: false });
      expect(css).toContain("@container (min-width: 400px)");
    });

    test("twsx supports @layer", () => {
      const css = twsx({
        "@layer utilities": {
          ".custom-util": "text-red-500",
        },
      }, { inject: false });
      expect(css).toContain("@layer utilities");
    });

    test("twsx supports @position-try", () => {
      const css = twsx({
        "@position-try --flip-block": {
          ".tooltip": "top: anchor(bottom);",
        },
      }, { inject: false });
      expect(css).toContain("@position-try --flip-block");
    });
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // AUTO-DARK MODE
  // ═════════════════════════════════════════════════════════════════════════════
  describe("Auto-Dark Mode Engine", () => {
    test("toDarkMode inverts light background", () => {
      const light = "background-color: #ffffff; color: #000000;";
      const dark = toDarkMode(light);
      expect(dark).toContain("#0f172a"); // dark equivalent of #fff
      expect(dark).toContain("#f8fafc"); // light text
    });

    test("toDarkMode inverts gray scale", () => {
      const light = "background-color: #f3f4f6; border-color: #e5e7eb;";
      const dark = toDarkMode(light);
      expect(dark).toContain("#1f2937"); // dark equivalent
    });

    test("toDarkMode with oklch strategy", () => {
      const light = "background-color: #3b82f6; color: #ffffff;";
      const dark = toDarkMode(light, { strategy: "oklch" });
      expect(dark).toContain("oklch(from");
    });

    test("toDarkMode preserves unknown values", () => {
      const css = "display: flex; gap: 1rem;";
      const dark = toDarkMode(css);
      expect(dark).toContain("display: flex");
      expect(dark).toContain("gap: 1rem");
    });
  });

  // ═════════════════════════════════════════════════════════════════════════════
  // CONTAINER QUERY VARIANTS IN TWS
  // ═════════════════════════════════════════════════════════════════════════════
  describe("Container Query Variants", () => {
    test("@sm: prefix generates container query", () => {
      // @sm is already in BREAKPOINTS as container query
      const result = tws("@sm:text-lg");
      // This should resolve via breakpoints
      expect(result).toBeTruthy();
    });
  });
});
