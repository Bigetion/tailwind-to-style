# tailwind-to-style

`tailwind-to-style` is a lightweight JavaScript library to convert Tailwind CSS classes into inline styles. This is particularly useful for dynamically applying styles in frameworks like React.

## Installation

Install the library using npm or yarn:

```bash
npm install tailwind-to-style
```

or

```bash
yarn add tailwind-to-style
```

## Features

- Converts Tailwind CSS classes into inline or objects style.
- Compatible with modern JavaScript frameworks like React.
- Lightweight and efficient.

## Usage

```javascript
import { tws } from "tailwind-to-style";

// Convert classes to inline CSS
const styleInline = tws(`bg-white mx-auto`);
// Output: background-color:rgba(255, 255, 255, 1);margin-left:auto;margin-right:auto;

// Convert classes to JSON
const styleJSON = tws(`bg-white mx-auto`, 1);
// Output: {backgroundColor: 'rgba(255, 255, 255, 1)', marginLeft: 'auto', marginRight: 'auto'}
```

### Example

Here is an example of how to use `tailwind-to-style` in a React application:

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

Button example

```javascript
import React from "react";
import Helmet from "react-helmet";
import { twsx } from "tailwind-to-style";

const buttonStyle = twsx({
  ".btn": [
    "text-black px-4 py-2.5 bg-gray-200 outline-gray-400 rounded-lg cursor-pointer",
    {
      "&:not(:disabled):hover": "bg-gray-300",
      "&:focus": "outline outline-[3px]",
      "&:disabled": "opacity-50 cursor-not-allowed",
      "&.x-small": "text-xs px-2.5 py-1.5",
      "&.small": "text-sm px-3 py-2",
      "&.large": "text-lg px-5 py-3",
      "&.x-large": "text-xl px-6 py-3.5",
      "&.rounded": "rounded-full",
      "&.info": [
        "text-white bg-sky-500 outline-sky-400",
        {
          "&:not(:disabled):hover": "text-white bg-sky-600",
        },
      ],
      "&.success": [
        "text-white bg-green-500 outline-green-400",
        {
          "&:not(:disabled):hover": "text-white bg-green-600",
        },
      ],
      "&.warning": [
        "text-white bg-amber-500 outline-amber-400",
        {
          "&:not(:disabled):hover": "text-white bg-amber-600",
        },
      ],
      "&.danger": [
        "text-white bg-red-500 outline-red-400",
        {
          "&:not(:disabled):hover": "text-white bg-red-600",
        },
      ],
      "&.outlined": [
        "border bg-white text-gray-900",
        {
          "&.info": "border-sky-500",
          "&.success": "border-green-500",
          "&.warning": "border-amber-500",
          "&.danger": "border-red-500",
        },
      ],
    },
  ],
});

const App = () => {
  return (
    <>
      <Helmet>
        <style>{buttonStyle}</style>
      </Helmet>
      <div className="flex flex-col p-5">
        <h1 className="mb-2">Button Fill</h1>
        <div className="space-x-2 mb-8">
          <button type="button" className="btn">
            Button
          </button>
          <button type="button" className="btn info">
            Button
          </button>
          <button type="button" className="btn success">
            Button
          </button>
          <button type="button" className="btn warning">
            Button
          </button>
          <button type="button" className="btn danger">
            Button
          </button>
        </div>

        <h1 className="mb-2">Button Outlined</h1>
        <div className="space-x-2 mb-8">
          <button type="button" className="btn outlined">
            Button
          </button>
          <button type="button" className="btn outlined info">
            Button
          </button>
          <button type="button" className="btn outlined success">
            Button
          </button>
          <button type="button" className="btn outlined warning">
            Button
          </button>
          <button type="button" className="btn outlined danger">
            Button
          </button>
        </div>

        <h1 className="mb-2">Button Disabled</h1>
        <div className="space-x-2 mb-8">
          <button type="button" disabled className="btn">
            Button
          </button>
          <button type="button" disabled className="btn info">
            Button
          </button>
          <button type="button" disabled className="btn success">
            Button
          </button>
          <button type="button" disabled className="btn warning">
            Button
          </button>
          <button type="button" disabled className="btn danger">
            Button
          </button>
        </div>

        <h1 className="mb-2">Button Size</h1>
        <div className="space-x-2 mb-8">
          <button type="button" className="btn x-small">
            Button
          </button>
          <button type="button" className="btn small">
            Button
          </button>
          <button type="button" className="btn">
            Button
          </button>
          <button type="button" className="btn large">
            Button
          </button>
          <button type="button" className="btn x-large">
            Button
          </button>
        </div>

        <h1 className="mb-2">Button Rounded</h1>
        <div className="space-x-2 mb-8">
          <button type="button" className="btn rounded">
            Button
          </button>
          <button type="button" className="btn rounded info">
            Button
          </button>
          <button type="button" className="btn rounded success">
            Button
          </button>
          <button type="button" className="btn rounded warning">
            Button
          </button>
          <button type="button" className="btn rounded danger">
            Button
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
```

## License

This library is licensed under the MIT License. See the LICENSE file for more details.

---

Feel free to contribute or raise issues on the [GitHub repository](https://github.com/Bigetion/tailwind-to-style).
