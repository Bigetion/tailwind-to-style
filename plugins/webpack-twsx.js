import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { twsx } from "tailwind-to-style";

class TwsxPlugin {
  constructor(options = {}) {
    this.twsxDir = options.twsxDir || path.resolve(process.cwd(), "src/twsx");
  }

  async buildTwsx() {
    let allCss = "";
    try {
      const files = fs.readdirSync(this.twsxDir);
      for (const file of files) {
        if (file.endsWith(".js")) {
          try {
            const styleModule = await import(
              pathToFileURL(path.join(this.twsxDir, file)).href
            );
            const styleObj = styleModule.default || styleModule;
            const css = twsx(styleObj, { inject: false });
            allCss += css + "\n";
          } catch (err) {
            console.error(`[webpack-twsx] Error importing or processing ${file}:`, err);
          }
        }
      }
    } catch (err) {
      console.error('[webpack-twsx] Error reading twsxDir:', err);
    }
    return allCss;
  }

  apply(compiler) {
    const cssFile = path.resolve(
      process.cwd(),
      "node_modules/tailwind-to-style/twsx.css"
    );
    compiler.hooks.beforeCompile.tapPromise("TwsxPlugin", async () => {
      try {
        const allCss = await this.buildTwsx();
        fs.writeFileSync(cssFile, allCss);
        console.log(`[webpack-twsx] CSS written to ${cssFile}`);
      } catch (err) {
        console.error('[webpack-twsx] Error writing CSS:', err);
      }
    });
    compiler.hooks.watchRun.tapPromise("TwsxPlugin", async () => {
      try {
        const allCss = await this.buildTwsx();
        fs.writeFileSync(cssFile, allCss);
        console.log(`[webpack-twsx] CSS written to ${cssFile}`);
      } catch (err) {
        console.error('[webpack-twsx] Error writing CSS:', err);
      }
    });
  }
}

export default TwsxPlugin;
