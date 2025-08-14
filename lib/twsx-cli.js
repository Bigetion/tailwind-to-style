import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { twsx } from "tailwind-to-style";
import chokidar from "chokidar";

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
    let cssWrittenCount = 0;
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
          // Generate CSS in the same directory as the JS file
          cssFilePath = filePath.replace(/\.js$/, ".css");
        } else {
          // Generate CSS in the output directory
          cssFilePath = path.join(outputDir, fileName);
        }

        fs.writeFileSync(cssFilePath, css);
        generatedCssFiles.push(preserveStructure ? cssFilePath : fileName);
        cssWrittenCount++;
      } catch (err) {
        console.error(
          `[twsx-cli] Error importing or processing ${filePath}:`,
          err
        );
      }
    }
    if (cssWrittenCount > 0) {
      const green = "\x1b[32m";
      const reset = "\x1b[0m";
      const check = green + "✔" + reset;
      const now = new Date();
      const time = now.toLocaleTimeString();
      console.log(
        `[twsx-cli] ${check} CSS updated in ${cssWrittenCount} file(s) at ${time}`
      );
    }

    // Clean up orphaned CSS files
    if (!preserveStructure && fs.existsSync(outputDir)) {
      const existingCssFiles = fs
        .readdirSync(outputDir)
        .filter((file) => file.startsWith("twsx.") && file.endsWith(".css"));

      for (const cssFile of existingCssFiles) {
        if (!generatedCssFiles.includes(cssFile)) {
          const cssFilePath = path.join(outputDir, cssFile);
          fs.unlinkSync(cssFilePath);
          console.log(`[twsx-cli] Removed orphaned CSS: ${cssFilePath}`);
        }
      }
    } else if (preserveStructure) {
      // Clean up orphaned CSS files in preserve structure mode
      const twsxFiles = findTwsxFiles(inputDir);
      const expectedCssFiles = twsxFiles.map((file) =>
        file.replace(/\.js$/, ".css")
      );

      // Find and remove orphaned CSS files
      function cleanupOrphanedCss(dir) {
        if (!fs.existsSync(dir)) return;

        const items = fs.readdirSync(dir);
        for (const item of items) {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            cleanupOrphanedCss(fullPath);
          } else if (item.startsWith("twsx.") && item.endsWith(".css")) {
            if (!expectedCssFiles.includes(fullPath)) {
              fs.unlinkSync(fullPath);
              console.log(`[twsx-cli] Removed orphaned CSS: ${fullPath}`);
            }
          }
        }
      }

      cleanupOrphanedCss(inputDir);
    }
  } catch (err) {
    console.error("[twsx-cli] Error scanning for twsx files:", err);
  }
}

const inputDir =
  process.env.TWSX_INPUT_DIR || path.resolve(process.cwd(), "src");
const outputDir =
  process.env.TWSX_OUTPUT_DIR || path.resolve(process.cwd(), "src/styles");
const watchMode =
  process.argv.includes("--watch") || process.env.TWSX_WATCH === "true";
const preserveStructure =
  process.argv.includes("--preserve-structure") ||
  process.env.TWSX_PRESERVE_STRUCTURE === "true";

if (!preserveStructure && !fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Initial build
(async () => {
  try {
    await buildTwsx(inputDir, outputDir, preserveStructure);
    console.log(`[twsx-cli] Initial build completed`);

    if (watchMode) {
      console.log(`[twsx-cli] Watching for changes in ${inputDir}...`);

      const watcher = chokidar.watch(`${inputDir}/**/twsx.*.js`, {
        ignored: /node_modules/,
        persistent: true,
      });

      let changeTimeout = null;
      let pendingChange = false;
      function triggerBatchBuild() {
        if (changeTimeout) clearTimeout(changeTimeout);
        changeTimeout = setTimeout(async () => {
          pendingChange = false;
          const green = "\x1b[32m";
          const reset = "\x1b[0m";
          const check = green + "✔" + reset;
          const now = new Date();
          const time = now.toLocaleTimeString();
          console.log(
            `[twsx-cli] ${check} Detected changes, updating CSS at ${time}`
          );
          await buildTwsx(inputDir, outputDir, preserveStructure);
        }, 100);
      }
      watcher
        .on("change", () => {
          pendingChange = true;
          triggerBatchBuild();
        })
        .on("add", () => {
          pendingChange = true;
          triggerBatchBuild();
        })
        .on("unlink", () => {
          pendingChange = true;
          triggerBatchBuild();
        });

      // Keep the process alive
      process.on("SIGINT", () => {
        console.log("\n[twsx-cli] Stopping watcher...");
        watcher.close();
        process.exit(0);
      });
    }
  } catch (err) {
    console.error("[twsx-cli] Error writing CSS:", err);
  }
})();
