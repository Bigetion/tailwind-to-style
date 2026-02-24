# 🎮 tailwind-to-style Test App

Interactive React playground for testing all **tailwind-to-style** library functions.

## 🚀 Quick Start

```bash
# 1. Install dependencies
cd test-app
npm install

# 2. Start dev server
npm run dev

# 3. Open browser (automatically opens at http://localhost:3000)
```

## 📦 What's Included

### 3 Interactive Testing Modes

#### 1. **tws() Demo**
Test inline style conversion with:
- 6 built-in examples (Button, Gradient, Responsive, etc.)
- Custom class input
- Live preview rendering
- Generated style object display
- Usage code examples

#### 2. **twsx() Demo**
Test CSS generation with:
- 4 component examples (Button, Card, Nav, Form)
- JSON configuration editor
- Live preview with actual DOM elements
- Generated CSS output
- Auto-injection into document

#### 3. **twsxVariants() Demo**
Test variant system with:
- 3 component types (Button, Badge, Alert)
- Interactive variant controls
- Real-time class generation
- Compound variants showcase
- Full configuration display

## 🎨 Features

### Beautiful UI
- Gradient background design
- Tabbed navigation
- Responsive layout
- Smooth animations
- Code syntax display

### Interactive Controls
- Radio buttons for examples vs custom input
- Dropdowns for variant selection
- Text areas for custom code
- Live preview updates
- Copy to clipboard functionality

### Code Examples
- Input configuration display
- Generated output (styles/CSS/classes)
- Usage examples in multiple formats
- Full variant configuration reference

## 🛠️ Technology Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **tailwind-to-style** - The library being tested (linked from parent)

## 📁 Project Structure

```
test-app/
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Main app with tabs
│   ├── components/
│   │   ├── TwsDemo.jsx       # tws() testing
│   │   ├── TwsxDemo.jsx      # twsx() testing
│   │   ├── VariantsDemo.jsx  # twsxVariants() testing
│   │   └── CodePreview.jsx   # Code display component
│   └── styles/
│       └── app.css           # Global styles
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
└── index.html                # HTML entry
```

## 🎯 Usage Examples

### Testing tws()
1. Select "tws()" tab
2. Choose an example or enter custom classes
3. Click input, see live preview
4. Check generated style object
5. Copy usage code

### Testing twsx()
1. Select "twsx()" tab
2. Choose component example
3. See live rendered component
4. Check generated CSS
5. Modify config if needed

### Testing twsxVariants()
1. Select "twsxVariants()" tab
2. Choose component type
3. Adjust variant controls (color, size, etc.)
4. See live component with variants
5. Check generated class names

## 🐛 Debugging

### Browser DevTools
- **Console**: Check library logs
- **Elements**: Inspect generated styles/classes
- **Network**: Check if library loaded

### Common Issues

**Library not found:**
```bash
# Rebuild parent library
cd ..
npm run build
cd test-app
npm install
```

**Port already in use:**
```bash
# Change port in vite.config.js or run:
npm run dev -- --port 3001
```

**Changes not reflecting:**
- Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- Clear cache and reload

## 🎓 Learning Path

1. **Start with tws()** - Understand basic class-to-style conversion
2. **Try twsx()** - Learn CSS generation and nesting
3. **Explore variants()** - Master component variant system
4. **Experiment** - Modify examples, try edge cases
5. **Build** - Create your own components

## 📊 Testing Checklist

- [ ] tws() converts classes correctly
- [ ] Responsive classes work
- [ ] Custom arbitrary values work
- [ ] twsx() generates valid CSS
- [ ] Nested selectors work
- [ ] CSS injection works
- [ ] twsxVariants() returns correct classes
- [ ] Compound variants apply
- [ ] Default variants work
- [ ] Boolean variants work
- [ ] Nested selectors in variants work

## 🚀 Next Steps

After testing here:
- Check `../examples/` for production code examples
- Run `npm test` in parent for full test suite
- See `../ARCHITECTURE.md` for library internals
- Build your own components using the library

## 💡 Tips

- Keep DevTools open while testing
- Try edge cases (empty input, invalid JSON, etc.)
- Check console for errors/warnings
- Copy working examples for your projects
- Experiment with different combinations

---

**Happy Testing!** 🎉 If you find bugs, report them in the main repo.
