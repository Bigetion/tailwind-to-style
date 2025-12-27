/**
 * Critical CSS Extractor - Extracts above-the-fold CSS for faster initial page load
 * @module optimization/criticalCSS
 */

import { logger } from "../utils/logger.js";

export class CriticalCSSExtractor {
  constructor(options = {}) {
    this.options = {
      url: null, // URL or HTML to analyze
      html: null, // Direct HTML content
      dimensions: [
        { width: 1920, height: 1080 }, // Desktop
        { width: 1366, height: 768 }, // Laptop
        { width: 768, height: 1024 }, // Tablet
        { width: 375, height: 667 }, // Mobile
      ],
      penthouse: false, // Use penthouse for accurate critical CSS
      minify: true,
      ...options,
    };

    this.criticalCSS = "";
    this.stats = {
      totalRules: 0,
      criticalRules: 0,
      originalSize: 0,
      criticalSize: 0,
    };
  }

  /**
   * Extract critical CSS
   */
  async extract() {
    try {
      logger.info("Extracting critical CSS...");

      const html = await this.getHTML();
      const allCSS = await this.getAllCSS();

      this.stats.originalSize = new Blob([allCSS]).size;
      this.stats.totalRules = this.countCSSRules(allCSS);

      // Get visible elements
      const visibleSelectors = await this.getVisibleSelectors(html);

      // Extract only critical CSS
      this.criticalCSS = this.filterCriticalCSS(allCSS, visibleSelectors);

      this.stats.criticalSize = new Blob([this.criticalCSS]).size;
      this.stats.criticalRules = this.countCSSRules(this.criticalCSS);

      const savings = (
        (1 - this.stats.criticalSize / this.stats.originalSize) *
        100
      ).toFixed(1);

      logger.info(
        `✅ Critical CSS extracted: ${this.stats.criticalRules}/${this.stats.totalRules} rules (${savings}% reduction)`
      );

      return {
        css: this.criticalCSS,
        stats: this.stats,
      };
    } catch (error) {
      logger.error("Critical CSS extraction failed:", error);
      throw error;
    }
  }

  /**
   * Get HTML content
   */
  async getHTML() {
    if (this.options.html) {
      return this.options.html;
    }

    if (this.options.url) {
      // In Node.js environment
      if (typeof process !== "undefined" && process.versions?.node) {
        try {
          const response = await fetch(this.options.url);
          return await response.text();
        } catch (error) {
          logger.error("Failed to fetch URL:", error);
          throw error;
        }
      }
    }

    // Browser environment - use current document
    if (typeof document !== "undefined") {
      return document.documentElement.outerHTML;
    }

    throw new Error("No HTML source provided");
  }

  /**
   * Get all CSS from document
   */
  async getAllCSS() {
    let allCSS = "";

    // Browser environment
    if (typeof document !== "undefined") {
      // Get inline styles
      const styleElements = document.querySelectorAll("style");
      styleElements.forEach((style) => {
        allCSS += style.textContent + "\n";
      });

      // Get linked stylesheets
      const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
      for (const link of linkElements) {
        try {
          const response = await fetch(link.href);
          allCSS += (await response.text()) + "\n";
        } catch (_error) {
          logger.warn(`Failed to fetch stylesheet: ${link.href}`);
        }
      }
    }

    return allCSS;
  }

  /**
   * Get selectors for visible elements
   */
  async getVisibleSelectors(html) {
    // Browser environment with DOM access
    if (typeof document !== "undefined") {
      return this.getVisibleSelectorsDOM();
    }

    // Parse HTML and extract likely above-the-fold selectors
    return this.getVisibleSelectorsFromHTML(html);
  }

  /**
   * Get visible selectors using DOM
   */
  getVisibleSelectorsDOM() {
    const visibleSelectors = new Set();
    const viewportHeight = window.innerHeight || 1080;

    // Get all elements
    const elements = document.querySelectorAll("*");

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();

      // Check if element is in viewport (above the fold)
      if (rect.top < viewportHeight && rect.bottom > 0) {
        // Add element's classes
        if (el.className && typeof el.className === "string") {
          el.className.split(/\s+/).forEach((cls) => {
            if (cls) visibleSelectors.add(`.${cls}`);
          });
        }

        // Add element's ID
        if (el.id) {
          visibleSelectors.add(`#${el.id}`);
        }

        // Add element tag
        visibleSelectors.add(el.tagName.toLowerCase());
      }
    });

    return visibleSelectors;
  }

  /**
   * Get visible selectors from HTML string
   */
  getVisibleSelectorsFromHTML(html) {
    const visibleSelectors = new Set();

    // Extract classes and IDs from HTML
    // For small HTML (< 30 lines), use at least 50% to catch critical content
    // For larger HTML, use 30% to approximate above-the-fold
    const htmlLines = html.split("\n");
    const percentage = htmlLines.length < 30 ? 0.5 : 0.3;
    const linesToScan = Math.max(Math.ceil(htmlLines.length * percentage), 5);
    const aboveFoldLines = htmlLines.slice(0, linesToScan);
    const aboveFoldHTML = aboveFoldLines.join("\n");

    // Extract classes
    const classRegex = /class=["']([^"']+)["']/g;
    let match;
    while ((match = classRegex.exec(aboveFoldHTML)) !== null) {
      match[1].split(/\s+/).forEach((cls) => {
        if (cls) visibleSelectors.add(`.${cls}`);
      });
    }

    // Extract IDs
    const idRegex = /id=["']([^"']+)["']/g;
    let idMatch;
    while ((idMatch = idRegex.exec(aboveFoldHTML)) !== null) {
      visibleSelectors.add(`#${idMatch[1]}`);
    }

    // Add common above-fold tags
    [
      "html",
      "body",
      "header",
      "nav",
      "h1",
      "h2",
      "h3",
      "p",
      "a",
      "button",
      "img",
    ].forEach((tag) => {
      visibleSelectors.add(tag);
    });

    return visibleSelectors;
  }

  /**
   * Filter CSS to only include critical selectors
   */
  filterCriticalCSS(css, visibleSelectors) {
    const criticalRules = [];

    // Split CSS into rules
    const rules = css
      .split("}")
      .map((rule) => rule.trim() + "}")
      .filter(Boolean);

    rules.forEach((rule) => {
      const selectorMatch = rule.match(/^([^{]+){/);
      if (!selectorMatch) return;

      const selectors = selectorMatch[1].split(",").map((s) => s.trim());

      // Check if any selector is visible
      const isCritical = selectors.some((selector) => {
        // Extract the base class/id/tag from complex selectors
        const baseSelector = selector.split(/[\s>+~:]/).filter(Boolean)[0];
        return visibleSelectors.has(baseSelector);
      });

      if (isCritical) {
        criticalRules.push(rule);
      }
    });

    let criticalCSS = criticalRules.join("\n");

    // Minify if requested
    if (this.options.minify) {
      criticalCSS = this.minifyCSS(criticalCSS);
    }

    return criticalCSS;
  }

  /**
   * Count CSS rules
   */
  countCSSRules(css) {
    return (css.match(/{/g) || []).length;
  }

  /**
   * Minify CSS
   */
  minifyCSS(css) {
    return css
      .replace(/\s+/g, " ")
      .replace(/\s*([{}:;,])\s*/g, "$1")
      .replace(/;}/g, "}")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .trim();
  }

  /**
   * Generate inline critical CSS tag
   */
  generateInlineTag() {
    return `<style id="critical-css">${this.criticalCSS}</style>`;
  }

  /**
   * Generate preload link for full CSS
   */
  generatePreloadLink(href) {
    return `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">`;
  }
}
