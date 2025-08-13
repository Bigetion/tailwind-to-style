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
    const generatedCssFiles = [];

    // Generate CSS from JS files
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
        generatedCssFiles.push(fileName);
        console.log(`[webpack-twsx] CSS written to ${cssFilePath}`);
      } catch (err) {
        console.error(
          `[webpack-twsx] Error importing or processing ${filePath}:`,
          err
        );
      }
    }

    // Clean up orphaned CSS files
    if (fs.existsSync(outputDir)) {
      const existingCssFiles = fs.readdirSync(outputDir).filter((file) => {
        return file.startsWith("twsx.") && file.endsWith(".css");
      });

      if (
        Array.isArray(existingCssFiles) &&
        Array.isArray(generatedCssFiles)
      ) {
        console.log(
          `[webpack-twsx] Found ${existingCssFiles.length} existing CSS files:`,
          existingCssFiles
        );
        console.log(
          `[webpack-twsx] Generated ${generatedCssFiles.length} CSS files:`,
          generatedCssFiles
        );

        for (const cssFile of existingCssFiles) {
          if (!generatedCssFiles.includes(cssFile)) {
            const cssFilePath = path.join(outputDir, cssFile);
            fs.unlinkSync(cssFilePath);
            console.log(`[webpack-twsx] Removed orphaned CSS: ${cssFilePath}`);
          }
        }
      }
    }
  } catch (err) {
    console.error("[webpack-twsx] Error scanning for twsx files:", err);
  }
}

class TwsxPlugin {
  constructor(options = {}) {
    this.inputDir = options.inputDir || path.resolve(process.cwd(), "src");
    this.outputDir =
      options.outputDir || path.resolve(process.cwd(), "src/styles");
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  apply(compiler) {
    compiler.hooks.beforeCompile.tapPromise("TwsxPlugin", async () => {
      try {
        await buildTwsx(this.inputDir, this.outputDir);
      } catch (err) {
        console.error("[webpack-twsx] Error writing CSS:", err);
      }
    });
    compiler.hooks.watchRun.tapPromise("TwsxPlugin", async () => {
      try {
        await buildTwsx(this.inputDir, this.outputDir);
      } catch (err) {
        console.error("[webpack-twsx] Error updating CSS:", err);
      }
    });
  }
}

export default TwsxPlugin;
