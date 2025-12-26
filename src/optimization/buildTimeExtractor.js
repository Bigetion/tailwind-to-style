/**
 * Build-time CSS Extractor - Extracts CSS at build time for static generation
 * @module optimization/buildTimeExtractor
 */

import { logger } from '../utils/logger.js';

export class BuildTimeExtractor {
  constructor(options = {}) {
    this.options = {
      input: [], // Array of source files or globs
      output: 'styles.css', // Output CSS file
      minify: false,
      sourceMap: false,
      preserveComments: false,
      format: 'css', // 'css', 'json', 'js'
      ...options,
    };
    
    this.extractedCSS = '';
    this.stats = {
      filesProcessed: 0,
      classesFound: 0,
      outputSize: 0,
    };
  }

  /**
   * Extract CSS from source files
   */
  async extract() {
    try {
      logger.info('Starting build-time CSS extraction...');

      const sourceFiles = await this.resolveSourceFiles();
      
      for (const file of sourceFiles) {
        await this.processFile(file);
      }

      const output = this.formatOutput();
      
      this.stats.outputSize = new Blob([output]).size;

      logger.info(`✅ Extraction complete: ${this.stats.filesProcessed} files, ${this.stats.classesFound} classes, ${this.formatBytes(this.stats.outputSize)}`);

      return {
        css: output,
        stats: this.stats,
      };
    } catch (error) {
      logger.error('Build-time extraction failed:', error);
      throw error;
    }
  }

  /**
   * Resolve source files from input patterns
   */
  async resolveSourceFiles() {
    // In Node.js environment, use glob to resolve files
    if (typeof process !== 'undefined' && process.versions?.node) {
      try {
        const glob = await import('glob');
        const files = [];
        
        for (const pattern of this.options.input) {
          const matches = await glob.glob(pattern);
          files.push(...matches);
        }
        
        return [...new Set(files)]; // Remove duplicates
      } catch (error) {
        logger.warn('Glob not available, using direct file paths');
        return this.options.input;
      }
    }
    
    return this.options.input;
  }

  /**
   * Process a single file
   */
  async processFile(filePath) {
    try {
      const content = await this.readFile(filePath);
      const classes = this.extractClasses(content);
      
      if (classes.length > 0) {
        this.stats.filesProcessed++;
        this.stats.classesFound += classes.length;
        
        // Generate CSS for found classes
        await this.generateCSSForClasses(classes);
      }
    } catch (error) {
      logger.warn(`Failed to process ${filePath}:`, error.message);
    }
  }

  /**
   * Read file content
   */
  async readFile(filePath) {
    // Node.js environment
    if (typeof process !== 'undefined' && process.versions?.node) {
      const fs = await import('fs/promises');
      return await fs.readFile(filePath, 'utf-8');
    }
    
    // Browser environment (for testing)
    const response = await fetch(filePath);
    return await response.text();
  }

  /**
   * Extract Tailwind classes from file content
   */
  extractClasses(content) {
    const classes = new Set();
    
    // Match className="..." or class="..."
    const classNameRegex = /(?:className|class)=["'`]([^"'`]*)["'`]/g;
    let match;
    
    while ((match = classNameRegex.exec(content)) !== null) {
      const classString = match[1];
      classString.split(/\s+/).forEach(cls => {
        if (cls && !cls.startsWith('{') && !cls.includes('${')) {
          classes.add(cls);
        }
      });
    }

    // Match tws("...") or twsx({...})
    const twsRegex = /tw(?:s|sx)\(["'`]([^"'`]*)["'`]/g;
    while ((match = twsRegex.exec(content)) !== null) {
      const classString = match[1];
      classString.split(/\s+/).forEach(cls => {
        if (cls) classes.add(cls);
      });
    }

    return Array.from(classes);
  }

  /**
   * Generate CSS for extracted classes
   */
  async generateCSSForClasses(classes) {
    // Import tws dynamically to generate CSS
    const { tws } = await import('../index.js');
    
    for (const className of classes) {
      try {
        const css = tws(className, { inject: false });
        if (css && !this.extractedCSS.includes(css)) {
          this.extractedCSS += css + '\n';
        }
      } catch (error) {
        // Skip invalid classes
      }
    }
  }

  /**
   * Format output based on options
   */
  formatOutput() {
    let output = this.extractedCSS;

    // Minify if requested
    if (this.options.minify) {
      output = this.minifyCSS(output);
    }

    // Remove comments if requested
    if (!this.options.preserveComments) {
      output = output.replace(/\/\*[\s\S]*?\*\//g, '');
    }

    // Format based on output type
    switch (this.options.format) {
      case 'json':
        return JSON.stringify({ css: output, stats: this.stats }, null, 2);
      
      case 'js':
        return `export const css = ${JSON.stringify(output)};\nexport const stats = ${JSON.stringify(this.stats)};`;
      
      default:
        return output;
    }
  }

  /**
   * Minify CSS
   */
  minifyCSS(css) {
    return css
      .replace(/\s+/g, ' ') // Multiple spaces to single
      .replace(/\s*([{}:;,])\s*/g, '$1') // Remove spaces around special chars
      .replace(/;}/g, '}') // Remove last semicolon before }
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .trim();
  }

  /**
   * Format bytes to human readable
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Write output to file (Node.js only)
   */
  async writeToFile(content) {
    if (typeof process !== 'undefined' && process.versions?.node) {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      const outputPath = path.resolve(this.options.output);
      await fs.writeFile(outputPath, content, 'utf-8');
      
      logger.info(`✅ CSS written to: ${outputPath}`);
    } else {
      logger.warn('File writing only available in Node.js environment');
    }
  }
}
