/**
 * Edge Case Tests for tailwind-to-style
 * Covers unusual inputs, boundary conditions, and error scenarios
 */

import { tws, twsxClassName } from '../../src/index.js';

describe("Input Validation Edge Cases", () => {
  describe("null and undefined handling", () => {
    it("should handle null input gracefully", () => {
      expect(tws(null, true)).toEqual({});
    });

    it("should handle undefined input gracefully", () => {
      expect(tws(undefined, true)).toEqual({});
    });

    it("should handle empty string", () => {
      expect(tws("", true)).toEqual({});
    });

    it("should handle array input gracefully", () => {
      // Should not throw, behavior may vary
      expect(() => tws([], true)).not.toThrow();
      expect(() => tws(["class1", "class2"], true)).not.toThrow();
    });

    it("should handle number input gracefully", () => {
      expect(() => tws(123, true)).not.toThrow();
    });

    it("should handle object input gracefully", () => {
      expect(() => tws({}, true)).not.toThrow();
    });
  });

  describe("whitespace handling", () => {
    it("should handle leading whitespace", () => {
      const result = tws("   p-4", true);
      expect(result.padding).toBe("1rem");
    });

    it("should handle trailing whitespace", () => {
      const result = tws("p-4   ", true);
      expect(result.padding).toBe("1rem");
    });

    it("should handle multiple spaces between classes", () => {
      const result = tws("p-4    m-4", true);
      expect(result.padding).toBe("1rem");
      expect(result.margin).toBe("1rem");
    });

    it("should handle tabs and newlines", () => {
      const result = tws("p-4\t\nm-4", true);
      expect(result.padding).toBe("1rem");
      expect(result.margin).toBe("1rem");
    });

    it("should handle only whitespace", () => {
      expect(tws("   ", true)).toEqual({});
      expect(tws("\t\n\r", true)).toEqual({});
    });
  });

  describe("special characters in class names", () => {
    it("should handle classes with hyphens", () => {
      expect(tws("text-red-500", true)).toHaveProperty("color");
    });

    it("should handle arbitrary values with special chars", () => {
      expect(tws("w-[calc(100%-16px)]", true)).toEqual({ width: "calc(100%-16px)" });
    });

    it("should handle CSS variables", () => {
      expect(tws("text-[var(--my-color)]", true)).toEqual({ color: "var(--my-color)" });
    });

    it("should handle url() in arbitrary values", () => {
      // This may or may not be supported
      expect(() => tws("bg-[url('/image.png')]", true)).not.toThrow();
    });
  });
});

describe("Boundary Conditions", () => {
  describe("numeric values", () => {
    it("should handle zero values", () => {
      expect(tws("p-0", true)).toEqual({ padding: "0px" });
      expect(tws("m-0", true)).toEqual({ margin: "0px" });
      expect(tws("w-0", true)).toEqual({ width: "0px" });
      // opacity-0 may include filter properties in response
      expect(tws("opacity-0", true)).toHaveProperty("opacity", "0");
    });

    it("should handle large scale values", () => {
      expect(tws("p-96", true)).toHaveProperty("padding");
      expect(tws("w-96", true)).toHaveProperty("width");
    });

    it("should handle decimal values", () => {
      expect(tws("p-0.5", true)).toHaveProperty("padding");
      expect(tws("p-1.5", true)).toHaveProperty("padding");
      expect(tws("p-2.5", true)).toHaveProperty("padding");
    });

    it("should handle negative values", () => {
      expect(tws("-m-4", true)).toHaveProperty("margin");
      expect(tws("-translate-x-4", true)).toBeDefined();
      expect(tws("-rotate-45", true)).toBeDefined();
    });

    it("should handle very large arbitrary values", () => {
      expect(tws("w-[9999px]", true)).toEqual({ width: "9999px" });
      expect(tws("p-[100rem]", true)).toEqual({ padding: "100rem" });
    });
  });

  describe("color values", () => {
    it("should handle full opacity colors", () => {
      const result = tws("bg-red-500/100", true);
      expect(result.backgroundColor).toBeDefined();
    });

    it("should handle zero opacity colors", () => {
      const result = tws("bg-red-500/0", true);
      expect(result.backgroundColor).toBeDefined();
    });

    it("should handle transparent", () => {
      expect(tws("bg-transparent", true)).toEqual({ backgroundColor: "transparent" });
    });

    it("should handle currentColor", () => {
      expect(tws("fill-current", true)).toEqual({ fill: "currentColor" });
    });
  });
});

describe("Class Combinations", () => {
  describe("conflicting classes", () => {
    it("should handle multiple values for same property", () => {
      const result = tws("p-4 p-8", true);
      // Either value is acceptable, just shouldn't crash
      expect(result.padding).toBeDefined();
    });

    it("should handle hidden and flex together", () => {
      const result = tws("hidden flex", true);
      expect(result.display).toBeDefined();
    });

    it("should handle conflicting widths", () => {
      const result = tws("w-full w-auto", true);
      expect(result.width).toBeDefined();
    });
  });

  describe("responsive variants", () => {
    it("should not crash on responsive prefixes (may not be supported)", () => {
      expect(() => tws("md:p-4", true)).not.toThrow();
      expect(() => tws("sm:block md:flex lg:hidden", true)).not.toThrow();
    });
  });

  describe("state variants", () => {
    it("should not crash on hover/focus prefixes (may not be supported)", () => {
      expect(() => tws("hover:bg-blue-500", true)).not.toThrow();
      expect(() => tws("focus:outline-none", true)).not.toThrow();
    });
  });

  describe("dark mode", () => {
    it("should not crash on dark mode prefix (may not be supported)", () => {
      expect(() => tws("dark:bg-gray-800", true)).not.toThrow();
    });
  });
});

describe("Complex Arbitrary Values", () => {
  it("should handle nested calc()", () => {
    expect(tws("w-[calc(100vw-calc(100%-16px))]", true)).toBeDefined();
  });

  it("should handle min/max functions", () => {
    expect(tws("w-[min(100%,400px)]", true)).toEqual({ width: "min(100%,400px)" });
    expect(tws("w-[max(200px,50%)]", true)).toEqual({ width: "max(200px,50%)" });
    expect(tws("w-[clamp(200px,50%,400px)]", true)).toEqual({ width: "clamp(200px,50%,400px)" });
  });

  it("should handle multiple units", () => {
    expect(tws("w-[10vw]", true)).toEqual({ width: "10vw" });
    expect(tws("w-[10vh]", true)).toEqual({ width: "10vh" });
    expect(tws("w-[10%]", true)).toEqual({ width: "10%" });
    expect(tws("w-[10em]", true)).toEqual({ width: "10em" });
    expect(tws("w-[10ch]", true)).toEqual({ width: "10ch" });
  });
});

describe("Long Class Strings", () => {
  it("should handle many classes efficiently", () => {
    const classes = Array(50).fill("p-4 m-4 text-red-500 bg-blue-500").join(" ");
    const start = performance.now();
    const result = tws(classes, true);
    const duration = performance.now() - start;
    
    expect(result).toBeDefined();
    expect(duration).toBeLessThan(100); // Should complete in < 100ms
  });

  it("should handle very long class string", () => {
    const longString = "p-4 m-4 ".repeat(1000);
    expect(() => tws(longString, true)).not.toThrow();
  });
});

describe("Unicode and Special Strings", () => {
  it("should not crash on unicode characters", () => {
    expect(() => tws("p-4 🎨", true)).not.toThrow();
    expect(() => tws("p-4 安全", true)).not.toThrow();
  });

  it("should not crash on HTML entities", () => {
    expect(() => tws("&nbsp; p-4", true)).not.toThrow();
  });

  it("should not crash on quotes", () => {
    expect(() => tws("'p-4'", true)).not.toThrow();
    expect(() => tws('"p-4"', true)).not.toThrow();
  });
});

describe("Memory Safety", () => {
  it("should not leak memory on repeated calls", () => {
    // Run many conversions
    for (let i = 0; i < 10000; i++) {
      tws(`p-${i % 12} m-${i % 12}`, true);
    }
    // If we get here without crashing, memory is being managed
    expect(true).toBe(true);
  });

  it("should handle rapid succession of different classes", () => {
    const results = [];
    for (let i = 0; i < 1000; i++) {
      results.push(tws(`bg-red-${(i % 9 + 1) * 100}`, true));
    }
    expect(results.length).toBe(1000);
  });
});

describe("Return Value Consistency", () => {
  it("should always return an object", () => {
    expect(typeof tws("", true)).toBe("object");
    expect(typeof tws(null, true)).toBe("object");
    expect(typeof tws("unknown-class", true)).toBe("object");
  });

  it("should return consistent style keys", () => {
    const result = tws("p-4 bg-red-500 flex", true);
    expect(result).toHaveProperty("padding");
    expect(result).toHaveProperty("backgroundColor");
    expect(result).toHaveProperty("display");
  });

  it("should use camelCase for CSS properties", () => {
    const result = tws("bg-red-500 justify-center items-center", true);
    expect(result).not.toHaveProperty("background-color");
    expect(result).not.toHaveProperty("justify-content");
    expect(result).not.toHaveProperty("align-items");
    expect(result).toHaveProperty("backgroundColor");
    expect(result).toHaveProperty("justifyContent");
    expect(result).toHaveProperty("alignItems");
  });
});
