
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { twsx } from "tailwind-to-style";

async function buildTwsx(twsxDir) {
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
          console.error(`[vite-twsx] Error importing or processing ${file}:`, err);
        }
      }
    }
  } catch (err) {
    console.error('[vite-twsx] Error reading twsxDir:', err);
  }
  return allCss;
}

export default function twsxPlugin(options = {}) {
  const twsxDir = options.twsxDir || path.resolve(process.cwd(), "src/twsx");
  const cssFile = path.resolve(
    process.cwd(),
    "node_modules/tailwind-to-style/twsx.css"
  );

  return {
    name: "vite-twsx",
    async buildStart() {
      try {
        const allCss = await buildTwsx(twsxDir);
        fs.writeFileSync(cssFile, allCss);
        console.log(`[vite-twsx] CSS written to ${cssFile}`);
      } catch (err) {
        console.error('[vite-twsx] Error writing CSS:', err);
      }
    },
    async handleHotUpdate() {
      try {
        const allCss = await buildTwsx(twsxDir);
        fs.writeFileSync(cssFile, allCss);
        console.log(`[vite-twsx] CSS written to ${cssFile}`);
      } catch (err) {
        console.error('[vite-twsx] Error writing CSS:', err);
      }
    },
  };
}
