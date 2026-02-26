# 🎮 tailwind-to-style — Interactive Playground

A comprehensive React playground that demonstrates **every feature** of the `tailwind-to-style` library.

## 🚀 Quick Start

```bash
cd test-app
npm install
npm run dev
```

Opens at `http://localhost:5173`

## 📐 Architecture

Sidebar-based SPA with 11 dedicated pages across 4 groups:

```
src/
├── App.jsx                 # Sidebar layout + page router
├── main.jsx                # Entry point (imports preflight.css + playground.css)
├── components/
│   └── CodeBlock.jsx       # Reusable code display with copy-to-clipboard
├── pages/
│   ├── TwsPage.jsx         # tws() — interactive input, typography, spacing, colors, arbitrary values, shadows
│   ├── TwsxPage.jsx        # twsx() — pseudo-selectors, nested selectors, child selectors, @css directive
│   ├── VariantsPage.jsx    # twsxVariants() — interactive builder, all combos grid, badges, alerts
│   ├── CxPage.jsx          # cx() — conditional classes, all syntax forms, cx.with() composition
│   ├── GradientsPage.jsx   # Gradients — 8 directions, gallery, via color stops
│   ├── FiltersPage.jsx     # Filters — blur, brightness, contrast, grayscale, hue-rotate, backdrop
│   ├── TransformsPage.jsx  # Transforms — scale, rotate, translate, skew, origin (interactive builder)
│   ├── AnimationsPage.jsx  # Animations — CSS animations, Web Animations API, chain, stagger
│   ├── ConfigPage.jsx      # configure() — custom themes, plugins, SSR demo
│   ├── PerformancePage.jsx # performanceUtils — cache stats, benchmarks, clear caches
│   └── PlaygroundPage.jsx  # Free-form playground with presets
└── styles/
    └── playground.css      # Full layout + utility styles
```

## 📦 Pages Overview

### Core API
| Page | API | What it demonstrates |
|------|-----|---------------------|
| **tws()** | `tws(classes, asObject?)` | Interactive class → CSS/object converter, typography scale, spacing, colors with opacity modifiers, arbitrary values, negative values, border-radius, box shadows |
| **twsx()** | `twsx(name, config)` | Button hover/active/focus, card with child selectors, form input states, nav tabs, `@css` raw CSS directive |
| **twsxVariants()** | `twsxVariants(config)` | Interactive button builder (variant/color/size), full combinations grid, badge variants, alert with nested selectors, compound variants |
| **cx()** | `cx(...args)` | Conditional toggles, all syntax forms (strings, booleans, objects, arrays, falsy, nested), `cx.with()` base class composition |

### Visual Features
| Page | What it demonstrates |
|------|---------------------|
| **Gradients** | All 8 directions, 8 named gradient gallery, via color stops comparison |
| **Filters** | blur, brightness, grayscale/sepia/invert, contrast/saturate, hue-rotate, backdrop-blur (glass morphism) |
| **Transforms** | Interactive transform builder, scale/rotate/translate/skew galleries, negative transforms, transform-origin |
| **Animations** | animate-spin/bounce/pulse/ping, `applyWebAnimation()`, `applyInlineAnimation()`, `chainAnimations()`, `staggerAnimations()` |

### Advanced
| Page | API | What it demonstrates |
|------|-----|---------------------|
| **configure()** | `configure()`, `getConfig()`, `resetConfig()`, `clearConfigCache()` | Custom theme with brand colors/spacing, plugin registration, config lifecycle, SSR with `startSSR()`/`stopSSR()`/`getSSRStyles()` |
| **Performance** | `performanceUtils` | Cache statistics dashboard (9 cache counters), cold vs warm benchmarks, cache speedup measurement, `clearCaches()` |

### Tools
| Page | What it demonstrates |
|------|---------------------|
| **Playground** | Free-form input for tws()/cx(), 8 quick presets, live preview, CSS + JSON output, twsx() code examples |

## 🔌 Library APIs Covered

- `tws()` / `tws(classes, true)` — CSS string / JS object
- `twsx()` — styled component with nested selectors
- `twsxVariants()` — design system variant factory
- `cx()` / `cx.with()` — conditional class merging & composition
- `configure()` / `getConfig()` / `resetConfig()` / `clearConfigCache()`
- `createPlugin()` / `createUtilityPlugin()`
- `startSSR()` / `stopSSR()` / `getSSRStyles()`
- `performanceUtils.getStats()` / `.clearCaches()` / `.enablePerformanceLogging()`
- `applyWebAnimation()` / `applyInlineAnimation()` / `animateElement()`
- `chainAnimations()` / `staggerAnimations()`
- `debouncedTws` / `debouncedTwsx`
- Opacity modifiers (`bg-blue-500/50`)
- Arbitrary values (`w-[200px]`)
- Negative values (`-mt-4`)
- Gradients (`bg-gradient-to-r from-* via-* to-*`)
- Filters & backdrop filters
- Transforms & transform-origin
- `@css` raw CSS directive

## ⚙️ Tech Stack

- **Vite 5** + **React 18**
- Library linked via `"tailwind-to-style": "file:.."`
- Zero external UI dependencies — all styling via `tws()` + `playground.css`
