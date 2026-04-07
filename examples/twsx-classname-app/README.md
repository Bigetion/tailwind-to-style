# twsxClassName Demo Application

This demo showcases all features of the `twsxClassName()` and `tw()` APIs from tailwind-to-style.

## Features Demonstrated

### Core Features
- **twsxClassName** - Unified CSS-in-JS with variants and slots
- **tw()** - Atomic CSS classes with hover/responsive support
- **Basic Mode** - Simple className generation with `_` and pseudo shorthands
- **Variants Mode** - Multiple variant props (size, color, disabled, etc.)
- **Slots Mode** - Multi-part components (card, table, modal)

### Advanced Features
- **Compound Variants** - Style combinations (large + primary = shadow)
- **Boolean Variants** - `disabled: true/false` syntax
- **Dark Mode** - `dark: "..."` shorthand in styles
- **Group/Peer States** - `group-hover`, `peer-focus` for tooltips
- **Extend** - `twsxClassName.extend()` for creating component variants
- **Merge** - `.merge()` method for combining custom classes

### Design System Features
- **Design Tokens** - `defineTokens()` for consistent values
- **Themes** - `createTheme()` for light/dark mode switching
- **SSR Support** - `extractCSS()` for server-side rendering

## Running the Demo

### Option 1: Using the test-app (Recommended)
```bash
cd test-app
npm install
npm run dev
```

Then import from the example:
```js
import '../../examples/twsx-classname-app/app.js';
```

### Option 2: Using any HTTP server
```bash
# From the examples/twsx-classname-app directory

# Python
python -m http.server 3000

# Node.js (npx serve)
npx serve .

# PHP
php -S localhost:3000
```

Then open http://localhost:3000

### Option 3: VS Code Live Server
Install the "Live Server" extension and open index.html with Live Server.

## Components Included

| Component | Mode | Description |
|-----------|------|-------------|
| Button | Variants | 6 color variants, 5 sizes, disabled state, compound variants |
| Card | Slots | root, header, title, description, body, footer slots |
| Input | Variants | 3 sizes, 3 states (default, success, error) |
| Badge | Variants | 5 color variants, 3 sizes |
| Alert | Variants | 4 variants (info, success, warning, error) |
| Avatar | Variants | 5 sizes |
| Toggle | Slots | root, track, thumb slots |
| Table | Slots | wrapper, table, thead, th, tbody, tr, td slots |
| Tooltip | Basic | Uses group-hover for visibility |
| Modal | Slots | overlay, content, header, title, closeButton, body, footer |
| IconButton | Extended | Extended from Button with square aspect ratio |

## Notes

- This demo uses **only** twsxClassName for styling components
- Some basic utility classes (flex, gap, etc.) are included in the HTML for layout
- The toggle theme button demonstrates runtime theme switching
- All styles are runtime-generated via twsxClassName

## License

MIT
