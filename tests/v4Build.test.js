import { tw } from "../src/v4/index.js";

describe("tw v4 build/export API", () => {
  beforeEach(() => {
    tw.runtime({ inject: true });
    tw.clearCache();
  });

  test("extractCSS gathers runtime-generated CSS", () => {
    tw("inline-flex items-center justify-center");

    const css = tw.extractCSS();

    expect(css.length).toBeGreaterThan(0);
    expect(css).toContain(".tw-inline-flex");
    expect(css).toContain("display: inline-flex");
  });

  test("build emits a static CSS string for production export", async () => {
    tw("bg-blue-500 text-white rounded-lg");

    const css = await tw.build({ minify: true });

    expect(css.length).toBeGreaterThan(0);
    expect(css).toContain("background-color");
    expect(css).toContain("color:");
  });

  test("runtime injection can be disabled without changing generated class names", () => {
    tw.runtime({ inject: false });

    const className = tw("bg-blue-500");

    expect(className).toContain("tw-bg-blue-500");
    expect(tw.extractCSS()).toBe("");
  });

  test("variant and slot APIs resolve classes without generating CSS when injection is disabled", () => {
    tw.runtime({ inject: false });

    const button = tw({
      name: "button",
      hash: false,
      base: "inline-flex",
      variants: { color: { primary: "bg-blue-500" } },
      responsiveVariants: ["color"],
    });
    const card = tw({
      name: "card",
      hash: false,
      slots: { root: "rounded-lg", title: "font-bold" },
      variants: { density: { compact: { root: "p-2" } } },
      compoundVariants: [{ density: "compact", root: "shadow-md" }],
    });

    expect(button({ color: "primary" })).toContain("button--color-primary");
    expect(button({ color: { initial: "primary", md: "primary" } })).toContain(
      "button--md-color-primary"
    );
    expect(card({ density: "compact" }).root).toContain("card__root--density-compact");
    expect(card({ density: "compact" }).root).toContain("card__root--compound-0");
    expect(tw.extractCSS()).toBe("");
  });
});
