# 🚀 TWSX React Demo

Interactive playground for testing TWSX library with React integration before publishing to npm.

## 📦 What's Included

### React Hooks
- **useTwsx** - Main hook for component styling with auto CSS injection
- **useTwsxClasses** - Get CSS without auto-injection for manual control
- **useTwsxInline** - Convert Tailwind classes to React inline styles
- **TwsxProvider** - Context provider for global configuration
- **useTwsxContext** - Access TWSX configuration and theme

### Live Examples
1. **Basic Examples** - Core TWSX features and usage patterns
2. **Animation Examples** - Built-in and custom animations
3. **Component Examples** - Real-world UI components (Dashboard, Tabs, Forms, Notifications)
4. **Hook Examples** - All React hooks with live demos
5. **Performance Test** - Benchmark rendering and CSS generation

## 🎯 Purpose

This demo serves as a comprehensive testing environment to verify:
- ✅ All TWSX features work correctly in React
- ✅ React hooks integrate seamlessly
- ✅ Performance is optimized
- ✅ No bugs or edge cases before npm publish
- ✅ Documentation examples are accurate

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The demo will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
demo/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx       # Demo header
│   │   ├── Navigation.jsx   # Sidebar navigation
│   │   └── CodeBlock.jsx    # Code display component
│   ├── examples/            # Live example pages
│   │   ├── BasicExamples.jsx
│   │   ├── AnimationExamples.jsx
│   │   ├── ComponentExamples.jsx
│   │   ├── HookExamples.jsx
│   │   └── PerformanceTest.jsx
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── package.json
├── vite.config.js
└── index.html
```

## 🔧 Configuration

The demo uses a custom TWSX configuration in `App.jsx`:

```javascript
const twsxConfig = {
  theme: {
    extend: {
      colors: {
        brand: { /* custom brand colors */ },
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      }
    }
  }
}
```

## 🧪 Testing Checklist

Before publishing to npm, verify:

- [ ] All examples render without errors
- [ ] Animations work smoothly
- [ ] Hover states and interactions work
- [ ] Performance is acceptable (check Performance Test page)
- [ ] No console errors or warnings
- [ ] Responsive design works on mobile
- [ ] Theme switching works correctly
- [ ] Dynamic styling updates properly
- [ ] Code examples are accurate
- [ ] All hooks function as expected

## 📝 Notes

- This demo is in the `react-demo` branch for safe testing
- Demo folder is git-ignored to keep main repo clean
- React hooks are in `src/react/` and will be published with the library
- Use this demo to catch bugs before npm publish

## 🎉 Ready to Publish?

Once all tests pass:
1. Merge `react-demo` branch to main
2. Update version in `package.json`
3. Build the library: `npm run build`
4. Publish to npm: `npm publish`

---

Built with ❤️ using Vite + React + TWSX