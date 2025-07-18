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
- Allows **nested styles** similar to SCSS, enabling more complex CSS structures.
- **Grouping**: Supports grouping utilities inside parentheses, including responsive variants.
- Supports **responsive variants** (`sm`, `md`, `lg`, etc.) when used within Tailwind utility classes or in grouping syntax.
- Handles **state variants** like `hover`, `focus`, and more.
- Supports **dynamic utilities** such as `w-[300px]`, `bg-[rgba(0,0,0,0.5)]`.
- **@css directive**: Apply custom CSS properties directly for more complex styles like transitions and animations.

#### Usage

```javascript
import { twsx } from "tailwind-to-style";

const styles = twsx({
  ".card": [
    "bg-white p-4 rounded-lg",
    {
      "&:hover": "shadow-lg",
      ".title": "text-lg font-bold",
      ".desc": "text-sm text-gray-500"
    }
  ]
});

console.log(styles);
```

This will generate CSS like:

```css
.card {
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
}
.card:hover {
  box-shadow: 0 10px 15px rgba(0,0,0,0.1);
}
.card .title {
  font-size: 1.125rem;
  font-weight: bold;
}
.card .desc {
  font-size: 0.875rem;
  color: #6b7280;
}
```

#### Grouping Support:

With `twsx`, you can group related utilities together inside parentheses, making the CSS more modular and easier to manage. This is especially useful for responsive and state variants.

```javascript
const styles = twsx({
  ".button": [
    "bg-blue-500 text-white p-2 rounded-md",
    {
      "&:hover": "bg-blue-600",
      ".icon": "text-lg"
    }
  ]
});

console.log(styles);
```

**Output**:

```css
.button {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem;
  border-radius: 0.375rem;
}
.button:hover {
  background-color: #2563eb;
}
.button .icon {
  font-size: 1.125rem;
}
```

#### Dynamic Utilities:

`twsx` supports dynamic values in utilities like `w-[300px]` and `bg-[rgba(0,0,0,0.5)]`.

```javascript
const styles = twsx({
  ".box": "w-[300px] h-[50vh] bg-[rgba(0,0,0,0.5)]"
});

console.log(styles);
```

**Output**:

```css
.box {
  width: 300px;
  height: 50vh;
  background-color: rgba(0,0,0,0.5);
}
```

#### `!important` Support

You can prepend an exclamation mark (`!`) directly to the class name to make it `!important`. This feature is useful for easily overriding default styles.

```javascript
const styles = twsx({
  ".alert": "!text-red-500 !bg-yellow-100 !p-4"
});

console.log(styles);
```

**Output**:
```css
.alert {
  color: #ef4444 !important;
  background-color: #fef3c7 !important;
  padding: 1rem !important;
}
```

#### Grouping Example:

You can group related utilities for better readability:

```javascript
const styles = twsx({
  ".alert": "hover:(bg-yellow-500 text-black) md:(px-6 py-3)"
});

console.log(styles);
```

**Output**:

```css
.alert:hover {
  background-color: #f59e0b;
  color: #000;
}
@media (min-width: 768px) {
  .alert {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
}
```

#### Responsive Variants:

Responsive variants work within Tailwind utility classes and in grouping syntax:

```javascript
const styles = twsx({
  ".responsive-card": [
    "w-full md:w-1/2 lg:w-1/3 p-4 bg-white", 
    {
      "&:hover": "shadow-lg transform:scale-105"
    }
  ],
  ".grouped-responsive": "text-sm md:(text-lg px-6) lg:(text-xl px-8)"
});
```

**Output**:
```css
.responsive-card {
  width: 100%;
  padding: 1rem;
  background-color: white;
}
@media (min-width: 768px) {
  .responsive-card {
    width: 50%;
  }
}
@media (min-width: 1024px) {
  .responsive-card {
    width: 33.333333%;
  }
}
.responsive-card:hover {
  box-shadow: 0 10px 15px rgba(0,0,0,0.1);
  transform: scale(1.05);
}
.grouped-responsive {
  font-size: 0.875rem;
}
@media (min-width: 768px) {
  .grouped-responsive {
    font-size: 1.125rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
@media (min-width: 1024px) {
  .grouped-responsive {
    font-size: 1.25rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
```

#### `@css` Direct CSS Properties:

With the `@css` feature, you can directly add CSS properties that aren't available as Tailwind utilities or when you need more complex CSS values like transitions, animations, or custom properties.

There are several ways to use the `@css` feature:

1. **As a nested object inside selectors**:

```javascript
const styles = twsx({
  ".button": [
    "bg-blue-500 text-white rounded-md",
    {
      "@css": {
        transition: "all 0.3s ease-in-out",
        "will-change": "transform, opacity"
      },
      "&:hover": "bg-blue-600"
    }
  ]
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
  ".button:hover": "bg-blue-600"
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
        "will-change": "transform, opacity"
      },
      "&.hidden": [
        "opacity-0",
        {
          "@css": {
            transform: "translateX(-100px)"
          }
        }
      ]
    }
  ]
});
```

**Output**:
```css
.modal {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
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
  ".responsive-box": "w-full md:w-1/2 lg:w-1/3 p-4 bg-blue-500"
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
      "h1": "text-6xl font-bold text-white md:text-4xl",
      "@css": {
        transition: "font-size 0.3s ease-in-out"
      }
    }
  ]
});

// Check performance stats
console.log(performanceUtils.getStats());
```

This will automatically log warnings for operations taking longer than 5ms and provide insights into cache usage and performance bottlenecks.

## License

## Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to contribute or raise issues on the [GitHub repository](https://github.com/Bigetion/tailwind-to-style).
