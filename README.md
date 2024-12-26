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
import tws from "tailwind-to-style";

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
import React from 'react';
import tws from 'tailwind-to-style';

const App = () => {
  return (
    <div style={tws("text-red-500 bg-blue-200 p-4", 1)}>
      Hello, this is styled using tailwind-to-style
    </div>
  );
};

export default App;
```

## License

This library is licensed under the MIT License. See the LICENSE file for more details.

---

Feel free to contribute or raise issues on the [GitHub repository](https://github.com/Bigetion/tailwind-to-style).

