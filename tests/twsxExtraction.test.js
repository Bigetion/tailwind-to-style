import { twsx } from "../src/index.js";

describe("twsx extraction mode", () => {
  beforeEach(() => {
    twsx.runtime({ inject: true });
  });

  test("collects generated CSS for static extraction", () => {
    twsx({ ".demo-card": "bg-blue-500 p-4 text-white" });

    const css = twsx.extractCSS();

    expect(css).toContain(".demo-card");
    expect(css).toContain("background-color");
  });

  test("supports build export without register boilerplate", async () => {
    twsx({ ".feature-panel": "rounded-lg border border-slate-200" });

    const css = await twsx.build({ minify: true });
    expect(css).toContain(".feature-panel");

    twsx.runtime({ inject: true });
  });
});
