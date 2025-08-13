const fs = require("fs");
const path = require("path");
const { twsx } = require("tailwind-to-style");

class TwsxPlugin {
  constructor(options = {}) {
    this.twsxDir = options.twsxDir || path.resolve(process.cwd(), "src/twsx");
    this.outDir = options.outDir || path.resolve(process.cwd(), "dist");
  }

  buildTwsx() {
    let allCss = "";
    fs.readdirSync(this.twsxDir).forEach((file) => {
      if (file.endsWith(".json")) {
        const json = JSON.parse(
          fs.readFileSync(path.join(this.twsxDir, file), "utf8")
        );
        const css = twsx(json, { inject: false });
        const outFile = path.join(this.outDir, file.replace(".json", ".css"));
        fs.writeFileSync(outFile, css);
        allCss += css + "\n";
      }
    });
    return allCss;
  }

  apply(compiler) {
    const cssFile = path.resolve(
      process.cwd(),
      "node_modules/tailwind-to-style/twsx.css"
    );
    compiler.hooks.beforeCompile.tap("TwsxPlugin", () => {
      const allCss = this.buildTwsx();
      fs.writeFileSync(cssFile, allCss);
    });
    compiler.hooks.watchRun.tap("TwsxPlugin", () => {
      const allCss = this.buildTwsx();
      fs.writeFileSync(cssFile, allCss);
    });
  }
}

module.exports = TwsxPlugin;
