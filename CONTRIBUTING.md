# Contributing to tailwind-to-style

Thank you for considering contributing to tailwind-to-style! This document provides guidelines and steps for contributing.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct, which is to treat all contributors with respect.

## How Can I Contribute?

### Reporting Bugs

Before reporting a bug, please check the existing issues to see if someone has already reported it. If not, create a new issue with the following information:
- A clear title
- A detailed description of the bug
- **Minimal reproduction** — a small code snippet showing the issue
- Steps to reproduce the bug
- Expected behavior vs actual behavior
- Screenshots (if applicable)
- Your environment (e.g., OS, browser, Node.js version, library version)

### Suggesting Features

We welcome feature suggestions! Please provide:
- A clear title
- A detailed description of the feature
- Why this feature would be useful (use cases)
- Any examples of how it might work
- Links to similar features in other libraries (if applicable)

### Pull Requests

1. Fork the repository
2. Create a new branch from the `main` branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Write tests for your changes
5. Run tests and ensure they pass (`npm test`)
6. Run linting (`npm run lint`)
7. Submit a pull request with a clear description

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/tailwind-to-style.git
cd tailwind-to-style

# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build the library
npm run build

# Run linting
npm run lint

# Format code
npm run prettify
```

## Project Architecture

```
src/
├── index.js              # Main entry point (exports all public APIs)
├── cx.js                 # cx() conditional class name builder
├── core/
│   ├── constants.js      # Pre-compiled regex & constants
│   ├── tws.js            # Tree-shakeable tws() entry
│   ├── twsx.js           # Tree-shakeable twsx() entry
│   └── twsxVariants.js   # Tree-shakeable twsxVariants() entry
├── css/
│   ├── resolver.js       # CSS variable resolution
│   ├── parser.js         # Class parsing & opacity modifiers
│   └── generator.js      # CSS string generation
├── config/
│   ├── index.js          # Default config/theme
│   ├── userConfig.js     # User configuration management
│   ├── theme.js          # Theme definitions
│   └── vars.js           # CSS variables
├── generators/           # 163 CSS generators (one per utility)
├── patterns/             # Pattern matching for custom values
├── plugins/              # Plugin system
├── presets/              # Preset configurations
└── utils/
    ├── logger.js         # Logging system
    ├── lruCache.js       # LRU Cache implementation
    ├── errorHandler.js   # Error handling
    ├── tailwindCache.js  # Singleton cache
    └── performanceMonitor.js
```

### Key Concepts

- **`tws()`** — Converts Tailwind class strings to inline style objects or CSS strings
- **`twsx()`** — Generates CSS from SCSS-like nested style objects
- **`twsxVariants()`** — Creates variant-based component styles (like CVA)
- **`cx()`** — Conditional class name builder (like clsx)
- **SSR** — `startSSR()`/`stopSSR()` for server-side rendering

### Adding a New Tailwind Utility Generator

1. Create a new file in `src/generators/` (e.g., `myUtility.js`)
2. Export a function that returns CSS strings for each utility class
3. Import and register it in `src/index.js`
4. Write tests in `tests/myUtility.test.js`

## Testing Guidelines

- All new features **must** have corresponding tests
- Tests live in the `tests/` directory
- We use **Jest** as the test framework
- Import from `../src/index.js` (source, not dist) for test consistency
- Run `npm run test:coverage` to check coverage

### Test Structure

```javascript
import { tws, twsx, cx } from '../src/index.js';

describe('Feature Name', () => {
  describe('Basic behavior', () => {
    it('should do X when Y', () => {
      expect(tws('class-name', true)).toHaveProperty('property', 'value');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty input', () => {
      expect(tws('')).toBe('');
    });
  });
});
```

## Code Style

- Follow the existing code style
- Use ESLint to check for style issues: `npm run lint`
- Use Prettier for formatting: `npm run prettify`
- Write clear commit messages (preferably [conventional commits](https://www.conventionalcommits.org/))
  - `feat: add cx() conditional class builder`
  - `fix: resolve unbounded cache memory leak`
  - `docs: update README with SSR guide`
  - `test: add tws() unit tests`

## Building

```bash
# Production build (ESM + CJS + UMD + sub-path entry points)
npm run build

# Watch mode
npm run dev
```

The build outputs:
- `dist/index.esm.js` — ESM build
- `dist/index.cjs` — CommonJS build
- `dist/index.min.js` — Minified UMD for CDN
- `dist/core/tws.esm.js` — Tree-shakeable tws
- `dist/core/twsx.esm.js` — Tree-shakeable twsx
- `dist/core/twsxVariants.esm.js` — Tree-shakeable twsxVariants
- `dist/cx.esm.js` — Tree-shakeable cx
- `dist/utils/index.esm.js` — Tree-shakeable utils

## License

By contributing to tailwind-to-style, you agree that your contributions will be licensed under the project's MIT license.
