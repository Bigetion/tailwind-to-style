/**
 * CSS Purger - Removes unused CSS from the bundle
 * @module optimization/cssPurger
 */

import { logger } from "../utils/logger.js";

export class CSSPurger {
  constructor(options = {}) {
    this.options = {
      content: [], // Files to scan for used classes
      css: null, // CSS to purge
      safelist: [], // Classes to always keep
      blocklist: [], // Classes to always remove
      keyframes: true, // Remove unused keyframes
      fontFace: true, // Remove unused font-face
      variables: true, // Remove unused CSS variables
      rejected: false, // Return rejected CSS
      ...options,
    };

    this.usedClasses = new Set();
    this.usedKeyframes = new Set();
    this.usedVariables = new Set();

    this.stats = {
      originalSize: 0,
      purgedSize: 0,
      rulesRemoved: 0,
      classesAnalyzed: 0,
    };
  }

  /**
   * Purge unused CSS
   */
  async purge() {
    try {
      logger.info("Starting CSS purging...");

      // Get CSS to purge
      const css = this.options.css || (await this.getAllCSS());
      this.stats.originalSize = new Blob([css]).size;

      // Scan content for used classes
      await this.scanContent();

      // Purge CSS
      const purgedCSS = this.purgeCSS(css);
      this.stats.purgedSize = new Blob([purgedCSS]).size;

      const savings = (
        (1 - this.stats.purgedSize / this.stats.originalSize) *
        100
      ).toFixed(1);

      logger.info(
        `✅ CSS purged: ${this.formatBytes(this.stats.originalSize)} → ${this.formatBytes(this.stats.purgedSize)} (${savings}% reduction)`
      );

      return {
        css: purgedCSS,
        stats: this.stats,
      };
    } catch (error) {
      logger.error("CSS purging failed:", error);
      throw error;
    }
  }

  /**
   * Get all CSS from document
   */
  async getAllCSS() {
    let allCSS = "";

    if (typeof document !== "undefined") {
      const styleElements = document.querySelectorAll("style");
      styleElements.forEach((style) => {
        allCSS += style.textContent + "\n";
      });

      const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
      for (const link of linkElements) {
        try {
          const response = await fetch(link.href);
          allCSS += (await response.text()) + "\n";
        } catch (error) {
          logger.warn(`Failed to fetch stylesheet: ${link.href}`);
        }
      }
    }

    return allCSS;
  }

  /**
   * Scan content files for used classes
   */
  async scanContent() {
    const files = await this.resolveContentFiles();

    for (const file of files) {
      await this.scanFile(file);
    }

    // Add safelist classes
    this.options.safelist.forEach((cls) => {
      this.usedClasses.add(cls);
    });

    this.stats.classesAnalyzed = this.usedClasses.size;
    logger.info(`Found ${this.usedClasses.size} used classes`);
  }

  /**
   * Resolve content files
   */
  async resolveContentFiles() {
    if (typeof process !== "undefined" && process.versions?.node) {
      try {
        const glob = await import("glob");
        const files = [];

        for (const pattern of this.options.content) {
          const matches = await glob.glob(pattern);
          files.push(...matches);
        }

        return [...new Set(files)];
      } catch (error) {
        logger.warn("Glob not available, using direct file paths");
        return this.options.content;
      }
    }

    return this.options.content;
  }

  /**
   * Scan a single file
   */
  async scanFile(filePath) {
    try {
      const content = await this.readFile(filePath);
      this.extractClasses(content);
    } catch (error) {
      logger.warn(`Failed to scan ${filePath}:`, error.message);
    }
  }

  /**
   * Read file content
   */
  async readFile(filePath) {
    if (typeof process !== "undefined" && process.versions?.node) {
      const fs = await import("fs/promises");
      return await fs.readFile(filePath, "utf-8");
    }

    const response = await fetch(filePath);
    return await response.text();
  }

  /**
   * Extract classes from content
   */
  extractClasses(content) {
    // Extract from className/class attributes
    const classRegex = /(?:className|class)=["'`]([^"'`]*)["'`]/g;
    let match;

    while ((match = classRegex.exec(content)) !== null) {
      match[1].split(/\s+/).forEach((cls) => {
        if (cls && !cls.startsWith("{")) {
          this.usedClasses.add(cls);
        }
      });
    }

    // Extract from tws/twsx calls
    const twsRegex = /tw(?:s|sx)\([^)]*["'`]([^"'`]*)["'`]/g;
    while ((match = twsRegex.exec(content)) !== null) {
      match[1].split(/\s+/).forEach((cls) => {
        if (cls) this.usedClasses.add(cls);
      });
    }

    // Extract keyframe names
    const animateRegex = /animate-(\w+)/g;
    while ((match = animateRegex.exec(content)) !== null) {
      this.usedKeyframes.add(match[1]);
    }

    // Extract CSS variable usage
    const varRegex = /var\(--([^)]+)\)/g;
    while ((match = varRegex.exec(content)) !== null) {
      this.usedVariables.add(match[1]);
    }
  }

  /**
   * Purge CSS
   */
  purgeCSS(css) {
    let purgedCSS = css;
    let originalRuleCount = this.countCSSRules(css);

    // Remove unused rules
    purgedCSS = this.removeUnusedRules(purgedCSS);

    // Remove unused keyframes
    if (this.options.keyframes) {
      purgedCSS = this.removeUnusedKeyframes(purgedCSS);
    }

    // Remove unused variables
    if (this.options.variables) {
      purgedCSS = this.removeUnusedVariables(purgedCSS);
    }

    // Remove unused font-face
    if (this.options.fontFace) {
      purgedCSS = this.removeUnusedFontFace(purgedCSS);
    }

    // Remove blocklisted classes
    purgedCSS = this.removeBlocklisted(purgedCSS);

    this.stats.rulesRemoved = originalRuleCount - this.countCSSRules(purgedCSS);

    return purgedCSS;
  }

  /**
   * Remove unused CSS rules
   */
  removeUnusedRules(css) {
    const rules = css
      .split("}")
      .map((rule) => rule.trim() + "}")
      .filter(Boolean);
    const keptRules = [];

    rules.forEach((rule) => {
      // Skip @rules
      if (rule.trim().startsWith("@")) {
        keptRules.push(rule);
        return;
      }

      const selectorMatch = rule.match(/^([^{]+){/);
      if (!selectorMatch) return;

      const selectors = selectorMatch[1].split(",").map((s) => s.trim());

      // Check if any selector is used
      const isUsed = selectors.some((selector) => {
        // Extract class names from selector
        const classMatches = selector.match(/\.([a-zA-Z0-9_-]+)/g);
        if (!classMatches) return true; // Keep non-class selectors

        return classMatches.some((cls) => {
          const className = cls.substring(1); // Remove leading dot
          return this.usedClasses.has(className);
        });
      });

      if (isUsed) {
        keptRules.push(rule);
      }
    });

    return keptRules.join("\n");
  }

  /**
   * Remove unused keyframes
   */
  removeUnusedKeyframes(css) {
    const keyframeRegex =
      /@keyframes\s+([a-zA-Z0-9_-]+)\s*{[^}]*(?:{[^}]*}[^}]*)*}/g;

    return css.replace(keyframeRegex, (match, name) => {
      return this.usedKeyframes.has(name) ? match : "";
    });
  }

  /**
   * Remove unused CSS variables
   */
  removeUnusedVariables(css) {
    const varRegex = /(--[a-zA-Z0-9_-]+)\s*:\s*[^;]+;/g;

    return css.replace(varRegex, (match, varName) => {
      const cleanName = varName.substring(2); // Remove --
      return this.usedVariables.has(cleanName) ? match : "";
    });
  }

  /**
   * Remove unused font-face
   */
  removeUnusedFontFace(css) {
    // Simple approach: keep all font-face for now
    // More sophisticated approach would check font-family usage
    return css;
  }

  /**
   * Remove blocklisted classes
   */
  removeBlocklisted(css) {
    if (this.options.blocklist.length === 0) return css;

    const rules = css
      .split("}")
      .map((rule) => rule.trim() + "}")
      .filter(Boolean);
    const keptRules = [];

    rules.forEach((rule) => {
      const selectorMatch = rule.match(/^([^{]+){/);
      if (!selectorMatch) return;

      const hasBlocklisted = this.options.blocklist.some((blocked) =>
        selectorMatch[1].includes(blocked)
      );

      if (!hasBlocklisted) {
        keptRules.push(rule);
      }
    });

    return keptRules.join("\n");
  }

  /**
   * Count CSS rules
   */
  countCSSRules(css) {
    return (css.match(/{/g) || []).length;
  }

  /**
   * Format bytes to human readable
   */
  formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
}
