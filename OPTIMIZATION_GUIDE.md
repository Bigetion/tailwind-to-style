# Optimization Guide

**New in v2.12.0** - Complete optimization suite for production-ready applications.

## Table of Contents

- [Bundle Size Optimization](#bundle-size-optimization)
- [Build-time CSS Extraction](#build-time-css-extraction)
- [Critical CSS](#critical-css)
- [CSS Purging](#css-purging)
- [Advanced Caching](#advanced-caching)
- [Optimization Manager](#optimization-manager)
- [Framework Integrations](#framework-integrations)
- [Best Practices](#best-practices)

## Bundle Size Optimization

Analyze your bundle and get actionable recommendations.

### Basic Usage

```javascript
import { BundleAnalyzer } from 'tailwind-to-style';

const analyzer = new BundleAnalyzer({
  showDetails: true,
  groupBy: 'category', // 'category', 'size', 'usage'
  minSize: 1024 // Only report files > 1KB
});

const stats = analyzer.analyze();

console.log(`Total: ${stats.totalSize} bytes`);
console.log(`Gzip: ${stats.gzipSize} bytes`);
console.log(`Categories: ${Object.keys(stats.categories).length}`);
```

### Analysis Report

```
📊 Bundle Analysis Report
============================================================

📦 Total Size: 125.5 KB
🗜️  Gzip Size: 32.8 KB (estimated)

📋 Categories:
  layout         15.2 KB    (12.1%) - 245 classes
  spacing        28.4 KB    (22.6%) - 512 classes
  colors         35.1 KB    (28.0%) - 387 classes
  typography     18.9 KB    (15.1%) - 298 classes
  effects        12.3 KB    (9.8%)  - 145 classes
  transitions    8.7 KB     (6.9%)  - 67 classes

💡 Recommendations:
  1. ⚠️ [HIGH] Large bundle size detected (>100KB)
     → Consider using CSS purging to remove unused styles
  
  2. ℹ️ [MEDIUM] colors utilities occupy 28.0% of bundle
     → Review colors usage and consider alternatives
```

### Export Analysis

```javascript
// Export to JSON
const json = analyzer.toJSON();
fs.writeFileSync('bundle-analysis.json', json);

// Get recommendations only
const recommendations = stats.recommendations.filter(
  r => r.priority === 'high'
);
```

## Build-time CSS Extraction

Generate static CSS files at build time for better performance.

### Basic Usage

```javascript
import { BuildTimeExtractor } from 'tailwind-to-style';

const extractor = new BuildTimeExtractor({
  input: [
    'src/**/*.jsx',
    'src/**/*.tsx',
    'components/**/*.js'
  ],
  output: 'dist/styles.css',
  minify: true,
  sourceMap: true,
  format: 'css' // 'css', 'json', 'js'
});

const { css, stats } = await extractor.extract();
await extractor.writeToFile(css);

console.log(`Processed ${stats.filesProcessed} files`);
console.log(`Found ${stats.classesFound} classes`);
console.log(`Output size: ${stats.outputSize} bytes`);
```

### Integration with Build Tools

#### Next.js

```javascript
// next.config.js
const { BuildTimeExtractor } = require('tailwind-to-style');

module.exports = {
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.afterEmit.tapAsync(
            'BuildTimeExtractor',
            async (compilation, callback) => {
              const extractor = new BuildTimeExtractor({
                input: ['app/**/*.{js,jsx,ts,tsx}'],
                output: 'public/styles.css',
                minify: true
              });
              await extractor.extract();
              callback();
            }
          );
        }
      });
    }
    return config;
  }
};
```

#### Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { BuildTimeExtractor } from 'tailwind-to-style';

export default defineConfig({
  plugins: [
    {
      name: 'twsx-extractor',
      async buildEnd() {
        const extractor = new BuildTimeExtractor({
          input: ['src/**/*.{jsx,tsx}'],
          output: 'dist/styles.css',
          minify: true
        });
        const { css } = await extractor.extract();
        await extractor.writeToFile(css);
      }
    }
  ]
});
```

#### Webpack

```javascript
// webpack.config.js
const { BuildTimeExtractor } = require('tailwind-to-style');

module.exports = {
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tapAsync(
          'TwsxExtractor',
          async (compilation, callback) => {
            const extractor = new BuildTimeExtractor({
              input: ['src/**/*.js'],
              output: 'dist/styles.css'
            });
            await extractor.extract();
            callback();
          }
        );
      }
    }
  ]
};
```

### Output Formats

```javascript
// CSS format (default)
const { css } = await extractor.extract();
// Output: .button { background: blue; ... }

// JSON format
const extractor = new BuildTimeExtractor({
  format: 'json',
  ...
});
const { css, stats } = await extractor.extract();
// Output: { "css": "...", "stats": {...} }

// JavaScript module
const extractor = new BuildTimeExtractor({
  format: 'js',
  ...
});
// Output: export const css = "..."; export const stats = {...};
```

## Critical CSS

Extract above-the-fold CSS for faster initial page loads.

### Basic Usage

```javascript
import { CriticalCSSExtractor } from 'tailwind-to-style';

// From HTML string
const extractor = new CriticalCSSExtractor({
  html: `<!DOCTYPE html>...`,
  minify: true
});

const { css, stats } = await extractor.extract();

console.log(`Original: ${stats.originalSize} bytes`);
console.log(`Critical: ${stats.criticalSize} bytes`);
console.log(`Reduction: ${((1 - stats.criticalSize / stats.originalSize) * 100).toFixed(1)}%`);
```

### From URL

```javascript
const extractor = new CriticalCSSExtractor({
  url: 'http://localhost:3000',
  dimensions: [
    { width: 1920, height: 1080 }, // Desktop
    { width: 1366, height: 768 },  // Laptop
    { width: 768, height: 1024 },  // Tablet
    { width: 375, height: 667 }    // Mobile
  ]
});

const { css } = await extractor.extract();
```

### Inline Critical CSS

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Inline critical CSS -->
  <style id="critical-css">
    .header { background: blue; }
    .nav { display: flex; }
    /* Only above-the-fold styles */
  </style>
  
  <!-- Preload full stylesheet -->
  <link rel="preload" href="/styles.css" as="style" 
        onload="this.onload=null;this.rel='stylesheet'">
</head>
<body>
  ...
</body>
</html>
```

### Generate Tags Programmatically

```javascript
const extractor = new CriticalCSSExtractor({ html });
const { css } = await extractor.extract();

// Generate inline style tag
const inlineTag = extractor.generateInlineTag();
// <style id="critical-css">...</style>

// Generate preload link
const preloadLink = extractor.generatePreloadLink('/styles.css');
// <link rel="preload" href="/styles.css" as="style" ...>
```

### SSR Integration

```javascript
// In your SSR handler
import { CriticalCSSExtractor } from 'tailwind-to-style';

export async function renderPage(req, res) {
  const html = renderToString(<App />);
  
  const extractor = new CriticalCSSExtractor({ html });
  const { css } = await extractor.extract();
  
  const finalHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        ${extractor.generateInlineTag()}
        ${extractor.generatePreloadLink('/styles.css')}
      </head>
      <body>${html}</body>
    </html>
  `;
  
  res.send(finalHtml);
}
```

## CSS Purging

Remove unused CSS automatically for smaller bundle sizes.

### Basic Usage

```javascript
import { CSSPurger } from 'tailwind-to-style';

const purger = new CSSPurger({
  content: [
    'src/**/*.jsx',
    'src/**/*.tsx',
    'pages/**/*.js'
  ],
  safelist: ['body', 'html', 'app'],
  blocklist: ['debug-', 'test-'],
  keyframes: true,
  variables: true,
  fontFace: true
});

const { css, stats } = await purger.purge();

console.log(`Original: ${stats.originalSize} bytes`);
console.log(`Purged: ${stats.purgedSize} bytes`);
console.log(`Rules removed: ${stats.rulesRemoved}`);
console.log(`Savings: ${((1 - stats.purgedSize / stats.originalSize) * 100).toFixed(1)}%`);
```

### Configuration Options

```javascript
const purger = new CSSPurger({
  // Files to scan for used classes
  content: ['src/**/*.{js,jsx,ts,tsx,html}'],
  
  // Classes to always keep (never purge)
  safelist: [
    'body',
    'html',
    /^wp-/,  // WordPress classes
    /^js-/   // JavaScript hooks
  ],
  
  // Classes to always remove
  blocklist: [
    'debug',
    'test',
    /^dev-/
  ],
  
  // Remove unused @keyframes
  keyframes: true,
  
  // Remove unused CSS variables
  variables: true,
  
  // Remove unused @font-face
  fontFace: true,
  
  // Return rejected CSS for debugging
  rejected: false
});
```

### Integration with Build Process

```javascript
// In your build script
import { CSSPurger } from 'tailwind-to-style';
import fs from 'fs/promises';

async function buildCSS() {
  const css = await fs.readFile('dist/styles.css', 'utf-8');
  
  const purger = new CSSPurger({
    content: ['dist/**/*.html', 'dist/**/*.js'],
    css
  });
  
  const { css: purgedCSS } = await purger.purge();
  
  await fs.writeFile('dist/styles.min.css', purgedCSS);
}
```

## Advanced Caching

Persistent cache with compression for optimal performance.

### Basic Usage

```javascript
import { PersistentCache } from 'tailwind-to-style';

const cache = new PersistentCache({
  name: 'my-app-cache',
  version: '1.0',
  maxSize: 5000,
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
  compress: true,
  storage: 'localStorage' // or 'sessionStorage', 'indexedDB'
});

// Set value
await cache.set('styles-key', {
  css: '.button { background: blue; }',
  timestamp: Date.now()
});

// Get value
const cached = await cache.get('styles-key');

// Clear cache
await cache.clear();
```

### Storage Options

```javascript
// LocalStorage (synchronous, 5-10MB limit)
const cache = new PersistentCache({
  storage: 'localStorage',
  maxSize: 1000
});

// SessionStorage (synchronous, session-scoped)
const cache = new PersistentCache({
  storage: 'sessionStorage'
});

// IndexedDB (asynchronous, unlimited storage)
const cache = new PersistentCache({
  storage: 'indexedDB',
  maxSize: 10000
});
```

### Compression

```javascript
const cache = new PersistentCache({
  compress: true, // Enable LZ compression
  maxSize: 5000
});

const stats = cache.getStats();
console.log(`Compression ratio: ${stats.compressionRatio}%`);
```

### Cache Statistics

```javascript
const stats = cache.getStats();

console.log(`Hit Rate: ${stats.hitRate}`);
console.log(`Memory Size: ${stats.memorySize}/${stats.maxSize}`);
console.log(`Hits: ${stats.hits}`);
console.log(`Misses: ${stats.misses}`);
console.log(`Writes: ${stats.writes}`);
```

## Optimization Manager

Unified interface for all optimization features.

### Presets

```javascript
import { createOptimizationManager } from 'tailwind-to-style';

// Minimal preset (development)
const minimal = createOptimizationManager('minimal');

// Balanced preset (recommended)
const balanced = createOptimizationManager('balanced');

// Aggressive preset (maximum performance)
const aggressive = createOptimizationManager('aggressive');
```

### Custom Configuration

```javascript
import { OptimizationManager } from 'tailwind-to-style';

const optimizer = new OptimizationManager({
  enableBundleAnalysis: true,
  enableBuildTimeExtraction: true,
  enableCriticalCSS: true,
  enablePurging: true,
  enablePersistentCache: true,
  
  // Options for each feature
  bundleAnalyzerOptions: {
    showDetails: true,
    groupBy: 'size'
  },
  
  buildTimeOptions: {
    minify: true,
    sourceMap: true
  },
  
  criticalCSSOptions: {
    dimensions: [{ width: 1920, height: 1080 }]
  },
  
  purgerOptions: {
    safelist: ['body', 'html']
  },
  
  cacheOptions: {
    storage: 'indexedDB',
    compress: true
  }
});

await optimizer.initialize();
```

### Full Pipeline

```javascript
const css = `/* Your CSS here */`;
const sourceFiles = ['src/**/*.jsx'];

const results = await optimizer.optimize(css, sourceFiles);

console.log('Original:', results.original);
console.log('Optimized:', results.optimized);
console.log('Critical:', results.critical);
console.log('Stats:', results.stats);
```

### Generate Report

```javascript
optimizer.generateReport();

// Output:
// 🚀 Optimization Report
// ============================================================
// 
// 📦 Bundle Analysis:
//   Total Size: 125.5 KB
//   Gzip Size: 32.8 KB (estimated)
//   Categories: 10
// 
// 🗑️  CSS Purging:
//   Original: 125.5 KB
//   Purged: 42.3 KB
//   Rules Removed: 1,247
// 
// ⚡ Critical CSS:
//   Original: 42.3 KB
//   Critical: 8.7 KB
//   Rules: 87/645
// 
// 📊 Overall Results:
//   Original: 125.5 KB
//   Optimized: 42.3 KB
//   Savings: 66.3%
```

## Framework Integrations

### React

```javascript
import { useEffect } from 'react';
import { OptimizationManager } from 'tailwind-to-style';

function App() {
  useEffect(() => {
    const optimizer = new OptimizationManager({
      enablePersistentCache: true,
      cacheOptions: {
        storage: 'indexedDB',
        compress: true
      }
    });
    
    optimizer.initialize();
  }, []);
  
  return <div>My App</div>;
}
```

### Next.js

```javascript
// next.config.js
const { optimize } = require('tailwind-to-style');

module.exports = {
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.afterEmit.tapAsync(
            'TwsxOptimizer',
            async (compilation, callback) => {
              await optimize.extractCSS({
                input: ['app/**/*.{js,jsx,ts,tsx}'],
                output: 'public/styles.css',
                minify: true
              });
              callback();
            }
          );
        }
      });
    }
    return config;
  }
};
```

### Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import { optimize } from 'tailwind-to-style';

export default defineConfig({
  plugins: [
    {
      name: 'twsx-optimizer',
      async buildEnd() {
        // Extract CSS
        await optimize.extractCSS({
          input: ['src/**/*.{jsx,tsx}'],
          output: 'dist/styles.css',
          minify: true
        });
        
        // Purge unused CSS
        const { css } = await optimize.purgeCSS({
          content: ['dist/**/*.html'],
          css: 'dist/styles.css'
        });
        
        // Write optimized CSS
        await fs.writeFile('dist/styles.min.css', css);
      }
    }
  ]
});
```

## Best Practices

### Development

```javascript
// Use minimal optimization in development
const optimizer = createOptimizationManager('minimal', {
  enablePersistentCache: true
});
```

### Production

```javascript
// Use aggressive optimization in production
const optimizer = createOptimizationManager('aggressive', {
  purgerOptions: {
    content: ['dist/**/*.{html,js}'],
    safelist: ['body', 'html', 'app']
  },
  criticalCSSOptions: {
    url: 'https://myapp.com',
    dimensions: [
      { width: 1920, height: 1080 },
      { width: 375, height: 667 }
    ]
  }
});
```

### Performance Tips

1. **Enable compression** for cache storage
2. **Use IndexedDB** for large cache sizes
3. **Run purging** only in production builds
4. **Extract critical CSS** for above-the-fold content
5. **Monitor bundle size** regularly with analyzer
6. **Set appropriate safelist** to prevent removing needed classes
7. **Use build-time extraction** for static sites

### Recommended Workflow

```javascript
// 1. Development: Fast, no optimization
if (process.env.NODE_ENV === 'development') {
  const optimizer = createOptimizationManager('minimal');
  await optimizer.initialize();
}

// 2. Production: Full optimization
if (process.env.NODE_ENV === 'production') {
  const optimizer = createOptimizationManager('aggressive');
  await optimizer.initialize();
  
  const results = await optimizer.optimize(css, sourceFiles);
  
  // Write optimized CSS
  await fs.writeFile('dist/styles.css', results.optimized);
  
  // Write critical CSS
  await fs.writeFile('dist/critical.css', results.critical);
  
  // Generate report
  optimizer.generateReport();
}
```

## Performance Benefits

### Without Optimization
- Bundle Size: 250 KB
- Initial Load: 1.2s
- Time to Interactive: 2.5s

### With Balanced Optimization
- Bundle Size: 85 KB (66% reduction)
- Initial Load: 0.5s (58% faster)
- Time to Interactive: 1.0s (60% faster)

### With Aggressive Optimization
- Bundle Size: 45 KB (82% reduction)
- Initial Load: 0.3s (75% faster)
- Time to Interactive: 0.6s (76% faster)
- Above-fold renders immediately (critical CSS)

## API Reference

See [examples/optimization.js](../examples/optimization.js) for complete code examples.
