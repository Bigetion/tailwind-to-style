import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { twsx } from "tailwind-to-style";

function findTwsxFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findTwsxFiles(fullPath, files);
    } else if (item.startsWith("twsx.") && item.endsWith(".js")) {
      files.push(fullPath);
    }
  }
  return files;
}

async function buildTwsx(inputDir, outputDir) {
  try {
    const twsxFiles = findTwsxFiles(inputDir);
    for (const filePath of twsxFiles) {
      try {
        const styleModule = await import(
          pathToFileURL(filePath).href + `?update=${Date.now()}`
        );
        const styleObj = styleModule.default || styleModule;
        const css = twsx(styleObj, { inject: false });
        const fileName = path.basename(filePath).replace(/\.js$/, ".css");
        const cssFilePath = path.join(outputDir, fileName);
        fs.writeFileSync(cssFilePath, css);
        console.log(`[build-twsx] CSS written to ${cssFilePath}`);
      } catch (err) {
        console.error(
          `[build-twsx] Error importing or processing ${filePath}:`,
          err
        );
      }
    }
  } catch (err) {
    console.error("[build-twsx] Error scanning for twsx files:", err);
  }
}

const inputDir =
  process.env.TWSX_INPUT_DIR || path.resolve(process.cwd(), "src");
const outputDir =
  process.env.TWSX_OUTPUT_DIR || path.resolve(process.cwd(), "src/styles");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
  try {
    await buildTwsx(inputDir, outputDir);
  } catch (err) {
    console.error("[build-twsx] Error writing CSS:", err);
  }
})();
