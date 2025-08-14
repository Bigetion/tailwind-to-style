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

async function buildTwsx(inputDir, outputDir, preserveStructure = false) {
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
        
        let cssFilePath;
        if (preserveStructure) {
          // Generate CSS file next to the JS file
          cssFilePath = filePath.replace(/\.js$/, ".css");
        } else {
          // Generate CSS file in the output directory
          cssFilePath = path.join(outputDir, fileName);
        }
        
        // Ensure the directory exists
        const cssDir = path.dirname(cssFilePath);
        if (!fs.existsSync(cssDir)) {
          fs.mkdirSync(cssDir, { recursive: true });
        }
        
        fs.writeFileSync(cssFilePath, css);
        generatedCssFiles.push(preserveStructure ? cssFilePath : fileName);
      } catch (err) {
        console.error(
          `[webpack-twsx] Error importing or processing ${filePath}:`,
          err
        );
      }
    }

    // Clean up orphaned CSS files
    if (preserveStructure) {
      // For preserve structure mode, clean up next to JS files
      const allJsFiles = findTwsxFiles(inputDir);
      for (const jsFile of allJsFiles) {
        const cssFile = jsFile.replace(/\.js$/, ".css");
        if (fs.existsSync(cssFile) && !generatedCssFiles.includes(cssFile)) {
          fs.unlinkSync(cssFile);
        }
      }
    } else {
      // For normal mode, clean up in output directory
      if (fs.existsSync(outputDir)) {
        const existingCssFiles = fs.readdirSync(outputDir).filter((file) => {
          return file.startsWith("twsx.") && file.endsWith(".css");
        });

        if (Array.isArray(existingCssFiles) && Array.isArray(generatedCssFiles)) {
          for (const cssFile of existingCssFiles) {
            if (!generatedCssFiles.includes(cssFile)) {
              const cssFilePath = path.join(outputDir, cssFile);
              fs.unlinkSync(cssFilePath);
            }
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
    this.preserveStructure = options.preserveStructure || false;
    
    if (!this.preserveStructure && !fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  apply(compiler) {
    compiler.hooks.beforeCompile.tapPromise("TwsxPlugin", async () => {
      try {
        await buildTwsx(this.inputDir, this.outputDir, this.preserveStructure);
      } catch (err) {
        console.error("[webpack-twsx] Error writing CSS:", err);
      }
    });
    compiler.hooks.watchRun.tapPromise("TwsxPlugin", async () => {
      try {
        await buildTwsx(this.inputDir, this.outputDir, this.preserveStructure);
      } catch (err) {
        console.error("[webpack-twsx] Error updating CSS:", err);
      }
    });
  }
}

export default TwsxPlugin;
