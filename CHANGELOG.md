# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [4.0.0-beta.1] — 2026-06-10

### Added
- **`tw()` unified API** — one function covering 4 modes: atomic string, named class, variants config, and slots config
- **Responsive & pseudo-class support via `tw()`** — `md:flex`, `hover:bg-blue-500`, etc. auto-inject scoped `@media` and pseudo CSS rules
- **Design token system** (`tailwind-to-style/tokens`) — `createTheme()`, `activateTheme()`, `token()`, `tokenRegistry`
- **React bindings** (`tailwind-to-style/react`) — `ThemeProvider`, `useTheme`, `useTws`, `styled()`
- **Animations** (`tailwind-to-style/animations`) — `animate()`, `defineAnimation()` with built-in presets
- **SSR support** — `createSSRCollector()` + `tw.extractCSS()` for server-side CSS extraction
- **Container query breakpoints** — `@sm`, `@md`, `@lg`, etc. (Tailwind v4 syntax)
- **Subpath exports** — `tailwind-to-style/cx`, `tailwind-to-style/tws`, `tailwind-to-style/classname`
- Comprehensive test suite for `tw()` variants, slots, CSS injection, and HMR behavior
- Full token system test suite covering mutation safety, theme switching, and CSS output

### Fixed
- **`deepMerge` in token registry mutated source theme objects** — when switching between themes, the original theme definitions (e.g., `THEMES.blue.colors`) were being silently overwritten by values from subsequently activated themes. Fixed by deep-cloning nested objects during merge instead of sharing references.

### Changed
- `sideEffects` in `package.json` updated from `false` to `["*.css", "dist/*.js", "dist/**/*.js"]` — prevents bundlers from incorrectly tree-shaking CSS injection side effects
- v4 API (`tw()`) replaces the legacy `twsx()` / `twsxClassName()` internal surface as the primary public interface

### Notes
- `tws()` (inline style output) does **not** support responsive variants (`md:`, `lg:`, etc.) — use `tw()` with `className` for responsive layouts
- Requires React ≥ 17 as an optional peer dependency for React bindings

---

## [3.x and earlier]

See git history for changes prior to v4.
