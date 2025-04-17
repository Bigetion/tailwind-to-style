
# tailwind-to-style

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

`twsx` is an advanced function that builds on `tws` by allowing you to define **nested styles** and more complex CSS structures. It supports **grouping**, **responsive variants**, **state variants**, and **dynamic utilities**, making it ideal for more advanced styling needs.

#### Features of `twsx`:
- Allows **nested styles** similar to SCSS, enabling more complex CSS structures.
- **Grouping**: Supports grouping utilities inside parentheses, making the code more readable and modular.
- Fully supports **responsive variants** (`sm`, `md`, `lg`, etc.).
- Handles **state variants** like `hover`, `focus`, and more.
- Supports **dynamic utilities** such as `w-[300px]`, `bg-[rgba(0,0,0,0.5)]`.

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

## License

This library is licensed under the MIT License. See the LICENSE file for more details.

---

Feel free to contribute or raise issues on the [GitHub repository](https://github.com/Bigetion/tailwind-to-style).
