# tailwind-to-style

[![npm version](https://img.shields.io/npm/v/tailwind-to-style.svg)](https://www.npmjs.com/package/tailwind-to-style)
[![Build Status](https://github.com/Bigetion/tailwind-to-style/workflows/CI%2FCD/badge.svg)](https://github.com/Bigetion/tailwind-to-style/actions)
[![npm downloads](https://img.shields.io/npm/dm/tailwind-to-style.svg)](https://www.npmjs.com/package/tailwind-to-style)
[![license](https://img.shields.io/npm/l/tailwind-to-style.svg)](https://github.com/Bigetion/tailwind-to-style/blob/main/LICENSE)

`tailwind-to-style` is a JavaScript library designed to convert Tailwind CSS utility classes into inline styles or JavaScript objects. This is especially useful when you need to dynamically apply styles to elements in frameworks like React, where inline styles or style objects are frequently used.

The library exposes two main functions:

1. **`tws`**: Converts Tailwind CSS classes into inline CSS styles or JavaScript objects (JSON).
2. **`twsx`**: A more advanced function that allows you to define nested and complex styles similar to SCSS, including support for responsive, state variants, and grouping.

## Installation

To use `tailwind-to-style`, install the library using either npm or yarn:

### Using npm

```bash
npm install tailwind-to-style
```

### Using yarn

```bash
yarn add tailwind-to-style
```

## Core Functions

### 1. `tws`

The `tws` function is designed to convert Tailwind CSS utility classes into either **inline CSS** or **JSON style objects**. This makes it particularly useful for applying styles dynamically in React or similar frameworks where inline styles or style objects are often needed.

#### Features of `tws`:

- Converts Tailwind utility classes into **inline CSS** or **JSON style objects**.

#### Usage

```javascript
import { tws } from "tailwind-to-style";

// Convert Tailwind classes to inline CSS
const styleInline = tws("bg-white mx-auto");
// Output: background-color:rgba(255, 255, 255, 1); margin-left:auto; margin-right:auto;

// Convert Tailwind classes to JSON style object
const styleJSON = tws("bg-white mx-auto", 1);
// Output: { backgroundColor: 'rgba(255, 255, 255, 1)', marginLeft: 'auto', marginRight: 'auto' }
```

- **First argument**: The string of Tailwind classes to convert.
- **Second argument (optional)**: Pass `1` to get the result as a JSON object (default is inline CSS when omitted).

#### Example in React:

```javascript
import React from "react";
import { tws } from "tailwind-to-style";

const App = () => {
  return (
    <div style={tws("text-red-500 bg-blue-200 p-4", 1)}>
      Hello, this is styled using tailwind-to-style
    </div>
  );
};

export default App;
```

This will apply the Tailwind classes directly as inline styles in the React component.

### 2. `twsx`

`twsx` is an advanced function that builds on `tws` by allowing you to define **nested styles** and more complex CSS structures. It supports **grouping**, **responsive variants**, **state variants**, **dynamic utilities**, and **direct CSS properties** via the `@css` directive, making it ideal for more advanced styling needs.

#### Features of `twsx`:

- ✅ **Nested styles** similar to SCSS, enabling more complex CSS structures
- ✅ **Grouping**: Supports grouping utilities inside parentheses `hover:(bg-blue-600 scale-105)`
- ✅ **Responsive variants** (`sm`, `md`, `lg`, `xl`, `2xl`) in standard and grouping syntax
- ✅ **State variants** like `hover`, `focus`, `active`, `disabled`, etc.
- ✅ **Dynamic utilities** such as `w-[300px]`, `bg-[rgba(0,0,0,0.5)]`, `text-[14px]`
- ✅ **!important support** with `!text-red-500`, `!bg-blue-500`
- ✅ **@css directive**: Apply custom CSS properties for animations, transitions, and modern effects

#### Basic Usage

```javascript
import { twsx } from "tailwind-to-style";

const styles = twsx({
  ".card": [
    "bg-white p-4 rounded-lg shadow-md",
    {
      "&:hover": "shadow-xl scale-105",
      ".title": "text-lg font-bold text-gray-900",
      ".desc": "text-sm text-gray-600 mt-2",
    },
  ],
});

console.log(styles);
```

**Output**:

```css
.card {
  background-color: rgba(255, 255, 255, var(--bg-opacity));
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}
.card:hover {
  box-shadow:
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  transform: scale(1.05);
}
.card .title {
  font-size: 1.125rem;
  font-weight: 700;
  color: rgba(17, 24, 39, var(--text-opacity));
}
.card .desc {
  font-size: 0.875rem;
  color: rgba(75, 85, 99, var(--text-opacity));
  margin-top: 0.5rem;
}
```

#### Grouping Support

Group related utilities together inside parentheses for better readability and organization:

```javascript
const styles = twsx({
  ".button": [
    "bg-blue-500 text-white px-6 py-3 rounded-lg",
    "hover:(bg-blue-600 scale-105 shadow-lg)",
    "focus:(ring-2 ring-blue-300 outline-none)",
    "active:(bg-blue-700 scale-95)",
  ],
});
```

**Output**:

```css
.button {
  background-color: rgba(59, 130, 246, var(--bg-opacity));
  color: rgba(255, 255, 255, var(--text-opacity));
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
}
.button:hover {
  background-color: rgba(37, 99, 235, var(--bg-opacity));
  transform: scale(1.05);
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
}
.button:focus {
  box-shadow: var(--ring-offset-shadow), var(--ring-shadow);
  outline: none;
}
.button:active {
  background-color: rgba(29, 78, 216, var(--bg-opacity));
  transform: scale(0.95);
}
```

#### Responsive Variants

Responsive variants work seamlessly with both standard syntax and grouping syntax:

```javascript
const styles = twsx({
  ".hero": [
    // Standard responsive syntax
    "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
    "w-full md:w-1/2 lg:w-1/3 p-4",
    // Grouped responsive syntax
    "sm:(py-16 px-4)",
    "md:(py-20 px-6)",
    "lg:(py-24 px-8)",
    {
      h1: "font-bold text-gray-900",
      p: "text-gray-600 mt-4",
    },
  ],
});
```

**Output**:

```css
.hero {
  font-size: 1.5rem;
  width: 100%;
  padding: 1rem;
}
@media (min-width: 640px) {
  .hero {
    font-size: 1.875rem;
    padding: 4rem 1rem;
  }
}
@media (min-width: 768px) {
  .hero {
    font-size: 2.25rem;
    width: 50%;
    padding: 5rem 1.5rem;
  }
}
@media (min-width: 1024px) {
  .hero {
    font-size: 3rem;
    width: 33.333333%;
    padding: 6rem 2rem;
  }
}
@media (min-width: 1280px) {
  .hero {
    font-size: 3.75rem;
  }
}
.hero h1 {
  font-weight: 700;
  color: rgba(17, 24, 39, var(--text-opacity));
}
.hero p {
  color: rgba(75, 85, 99, var(--text-opacity));
  margin-top: 1rem;
}
```

### Performance Utilities

The library includes performance optimization features:

#### Inject Option

Control CSS output location with the `inject` option:

```javascript
import { tws, twsx } from "tailwind-to-style";

// Auto-inject into document head (default)
const styles1 = tws("bg-blue-500 text-white p-4");

// Skip injection - returns CSS only
const styles2 = tws("bg-red-500 text-black p-2", { inject: false });

// Custom injection target
const targetElement = document.getElementById("custom-styles");
const styles3 = tws("bg-green-500 text-yellow p-3", { inject: targetElement });
```

#### Performance Monitoring

```javascript
import { tws } from "tailwind-to-style";

// Enable performance logging
const start = performance.now();
const styles = tws("complex-classes here...");
const end = performance.now();
console.log(`Generation time: ${end - start}ms`);
```

## Advanced `@css` Directive

There are several ways to use the `@css` feature:

1. **As a nested object inside selectors**:

```javascript
const styles = twsx({
  ".button": [
    "bg-blue-500 text-white rounded-md",
    {
      "@css": {
        transition: "all 0.3s ease-in-out",
        "will-change": "transform, opacity",
      },
      "&:hover": "bg-blue-600",
    },
  ],
});
```

**Output**:

```css
.button {
  background-color: #3b82f6;
  color: white;
  border-radius: 0.375rem;
  transition: all 0.3s ease-in-out;
  will-change: transform, opacity;
}
.button:hover {
  background-color: #2563eb;
}
```

2. **As a direct property in the selector**:

```javascript
const styles = twsx({
  ".button @css transition": "all 0.3s ease-in-out",
  ".button": "bg-blue-500 text-white rounded-md",
  ".button:hover": "bg-blue-600",
});
```

This syntax is especially useful when you need to add just a single CSS property that isn't available in Tailwind.

The `@css` feature is particularly helpful for properties that require complex values with spaces (like transitions, animations, and transforms) which can't be represented with standard Tailwind utility classes.

#### Advanced `@css` Examples:

You can combine `@css` with state variants:

```javascript
const styles = twsx({
  ".modal": [
    "bg-white rounded-lg shadow-xl",
    {
      "@css": {
        transform: "translateX(0px)",
        transition: "all 0.3s ease-out",
        "will-change": "transform, opacity",
      },
      "&.hidden": [
        "opacity-0",
        {
          "@css": {
            transform: "translateX(-100px)",
          },
        },
      ],
    },
  ],
});
```

**Output**:

```css
.modal {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: translateX(0px);
  transition: all 0.3s ease-out;
  will-change: transform, opacity;
}
.modal.hidden {
  opacity: 0;
  transform: translateX(-100px);
}
```

For responsive styles, you can use standard Tailwind responsive utilities within your classes:

```javascript
const styles = twsx({
  ".responsive-box": "w-full md:w-1/2 lg:w-1/3 p-4 bg-blue-500",
});
```

The `@css` feature provides a powerful way to bridge the gap between Tailwind's utility classes and custom CSS when needed, without leaving the `twsx` syntax.

### Inject Option (Browser Only)

By default, every call to `twsx` in the browser will automatically inject the generated CSS into a `<style id="twsx-auto-style">` tag in the document `<head>`. This makes it easy to use dynamic styles in browser or CDN scenarios without manual CSS management.

You can control this behavior with the `inject` option:

```js
// Auto-inject (default)
twsx({ ... }) // CSS is injected automatically

// Disable auto-inject
twsx({ ... }, { inject: false }) // CSS is NOT injected, just returned as string
```

- **inject: true** (default): CSS is injected into the page (browser only).
- **inject: false**: CSS is only returned as a string, not injected. Useful for SSR, testing, or custom handling.

> Note: This option only affects browser usage. In Node.js or SSR, no injection occurs.

## Performance Monitoring & Debugging (v2.7.0+)

Starting from version 2.7.0, `tailwind-to-style` includes built-in performance monitoring and debugging utilities to help you optimize your application and troubleshoot issues.

### Performance Utils

```javascript
import { performanceUtils } from "tailwind-to-style";

// Enable performance logging (logs operations > 5ms as warnings)
performanceUtils.enablePerformanceLogging(true);

// Get cache and injection statistics
const stats = performanceUtils.getStats();
console.log(stats);
// Output:
// {
//   cacheStats: {
//     cssResolution: 45,
//     configOptions: 2,
//     parseSelector: 23,
//     encodeBracket: 12,
//     decodeBracket: 8
//   },
//   injectionStats: {
//     uniqueStylesheets: 15
//   }
// }

// Clear all caches (useful for memory management)
performanceUtils.clearCaches();
```

### Performance Metrics

The library automatically tracks performance for key operations:

- **tws:total** - Total execution time for `tws()`
- **tws:parse** - Time spent parsing classes
- **tws:process** - Time spent processing classes
- **twsx:total** - Total execution time for `twsx()`
- **twsx:flatten** - Time spent flattening objects
- **twsx:generate** - Time spent generating CSS
- **css:inject** - Time spent injecting CSS to DOM

### Debounced Functions

For high-frequency usage, use the debounced versions:

```javascript
import { debouncedTws, debouncedTwsx } from "tailwind-to-style";

// Debounced versions (50ms for tws, 100ms for twsx)
const styles = debouncedTws("bg-red-500 p-4");
const complexStyles = debouncedTwsx({ ".card": "bg-white p-6" });
```

### Example: Performance Monitoring

```javascript
import { tws, twsx, performanceUtils } from "tailwind-to-style";

// Enable monitoring
performanceUtils.enablePerformanceLogging(true);

// Your code that uses tws/twsx
const styles = tws("bg-gradient-to-r from-purple-400 to-pink-500 p-8");
const complexStyles = twsx({
  ".hero": [
    "bg-gradient-to-br from-indigo-900 to-purple-900 min-h-screen",
    {
      h1: "text-6xl font-bold text-white md:text-4xl",
      "@css": {
        transition: "font-size 0.3s ease-in-out",
      },
    },
  ],
});

// Check performance stats
console.log(performanceUtils.getStats());
```

This will automatically log warnings for operations taking longer than 5ms and provide insights into cache usage and performance bottlenecks.

# Build-Time Plugins: Vite & Webpack

### Automated Modular CSS Generation

1. Save your modular styles in the `src/twsx/` folder as JSON files (e.g., `card.json`, `button.json`).
2. Use the Vite/Webpack plugin from the `plugins/` folder to automatically generate CSS on every build/rebuild.
3. All generated CSS files will be merged into a single `twsx.css` file inside `node_modules/tailwind-to-style/`.
4. In React, simply import this file in your entry point: `import 'tailwind-to-style/twsx.css'`.

#### Vite Plugin Usage Example

Add the plugin to your `vite.config.js`:
```js
import twsxPlugin from './plugins/vite-twsx';

export default {
  plugins: [
    twsxPlugin({
      twsxDir: 'src/twsx',
      outDir: 'dist'
    })
  ]
};
```

After build, the merged CSS file will be automatically created at `node_modules/tailwind-to-style/twsx.css`.
Import in React:
```js
// src/index.js
import 'tailwind-to-style/twsx.css';
```

#### Webpack Plugin Usage Example

Add the plugin to your `webpack.config.js`:
```js
import TwsxPlugin from './plugins/webpack-twsx';

module.exports = {
  plugins: [
    new TwsxPlugin({
      twsxDir: 'src/twsx',
      outDir: 'dist'
    })
  ]
};
```

After build, the merged CSS file will be automatically created at `node_modules/tailwind-to-style/twsx.css`.
Import in React:
```js
// src/index.js
import 'tailwind-to-style/twsx.css';
```

## License

## Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to contribute or raise issues on the [GitHub repository](https://github.com/Bigetion/tailwind-to-style).
