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
        generatedCssFiles.push(cssFilePath);
      } catch (err) {
        console.error(
          `[vite-twsx] Error importing or processing ${filePath}:`,
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
        const existingCssFiles = fs
          .readdirSync(outputDir)
          .filter((file) => file.startsWith("twsx.") && file.endsWith(".css"));

        for (const cssFile of existingCssFiles) {
          const cssFilePath = path.join(outputDir, cssFile);
          if (!generatedCssFiles.includes(cssFilePath)) {
            fs.unlinkSync(cssFilePath);
          }
        }
      }
    }

    return { generatedCssFiles };
  } catch (err) {
    console.error("[vite-twsx] Error scanning for twsx files:", err);
    return { generatedCssFiles: [] };
  }
}

export default function twsxPlugin(options = {}) {
  const inputDir = options.inputDir || path.resolve(process.cwd(), "src");
  const outputDir =
    options.outputDir || path.resolve(process.cwd(), "src/styles");
  const preserveStructure = options.preserveStructure || false;

  // Keep track of generated files to avoid triggering on our own changes
  const generatedFiles = new Set();

  if (!preserveStructure && !fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  return {
    name: "vite-twsx",
    async buildStart() {
      try {
        const result = await buildTwsx(inputDir, outputDir, preserveStructure);
        // Track generated CSS files
        if (result && result.generatedCssFiles) {
          result.generatedCssFiles.forEach((file) => generatedFiles.add(file));
        }
      } catch (err) {
        console.error("[vite-twsx] Error writing CSS:", err);
      }
    },
    async handleHotUpdate({ file, server }) {
      // Skip if this is a CSS file we generated
      if (generatedFiles.has(file)) {
        return [];
      }

      // Only process .js files that start with "twsx."
      if (file.endsWith(".js") && path.basename(file).startsWith("twsx.")) {
        try {
          const result = await buildTwsx(
            inputDir,
            outputDir,
            preserveStructure
          );

          // Update our tracking of generated files
          if (result && result.generatedCssFiles) {
            generatedFiles.clear();
            result.generatedCssFiles.forEach((f) => generatedFiles.add(f));
          }

          // Return empty array to prevent default HMR handling
          return [];
        } catch (err) {
          console.error("[vite-twsx] Error updating CSS:", err);
          return [];
        }
      }
    },
  };
}
