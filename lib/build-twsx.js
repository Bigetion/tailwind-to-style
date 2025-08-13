import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { twsx } from "tailwind-to-style";

const twsxDir = path.resolve(process.cwd(), "src/twsx");
const cssFile = path.resolve(process.cwd(), "node_modules/tailwind-to-style/twsx.css");

async function buildTwsx() {
  let allCss = "";
  try {
    const files = fs.readdirSync(twsxDir);
    for (const file of files) {
      if (file.endsWith(".js")) {
        try {
          const styleModule = await import(
            pathToFileURL(path.join(twsxDir, file)).href
          );
          const styleObj = styleModule.default || styleModule;
          const css = twsx(styleObj, { inject: false });
          allCss += css + "\n";
        } catch (err) {
          console.error(`[build-twsx] Error importing or processing ${file}:`, err);
        }
      }
    }
  } catch (err) {
    console.error('[build-twsx] Error reading twsxDir:', err);
  }
  return allCss;
}

(async () => {
  try {
    const allCss = await buildTwsx();
    fs.writeFileSync(cssFile, allCss);
    console.log(`[build-twsx] CSS written to ${cssFile}`);
  } catch (err) {
    console.error('[build-twsx] Error writing CSS:', err);
  }
})();
