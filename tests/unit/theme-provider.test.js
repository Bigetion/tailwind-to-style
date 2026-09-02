/**
 * @jest-environment jsdom
 *
 * ThemeProvider footgun regression test
 * ============================================================================
 * `ThemeProvider`'s effect previously depended on the `theme` prop's object
 * identity (`useEffect(() => { createTheme(themeProp, ...) }, [themeProp, name])`).
 * The natural, documented way to use the component is
 * `<ThemeProvider theme={{ colors: {...} }}>` — an inline object literal —
 * which creates a brand new object on every parent render, so the effect
 * (and the CSS-variable re-injection inside `createTheme`) ran on every
 * single render instead of only when the theme actually changed.
 *
 * Fix: the effect now depends on a stable JSON signature of the theme's
 * *content* instead of its identity.
 *
 * This project runs Jest in native ESM mode (--experimental-vm-modules), so
 * module mocking uses `jest.unstable_mockModule()` + dynamic `import()`
 * instead of the CJS-only `jest.mock()` hoisting API.
 * ============================================================================
 */

import { jest } from '@jest/globals';
import React from 'react';
import { render } from '@testing-library/react';

const createThemeMock = jest.fn();

jest.unstable_mockModule('../../src/tokens/index.js', () => ({
  createTheme: createThemeMock,
  tokenRegistry: { subscribe: jest.fn(() => () => {}) },
}));

const { ThemeProvider } = await import('../../src/react/ThemeProvider.js');

describe('ThemeProvider', () => {
  beforeEach(() => {
    createThemeMock.mockClear();
  });

  it('does not re-inject the theme on re-render when an inline theme object has the same content', () => {
    function App({ counter }) {
      return (
        <ThemeProvider theme={{ colors: { primary: '#3b82f6' } }}>
          <div>{counter}</div>
        </ThemeProvider>
      );
    }

    const { rerender } = render(<App counter={0} />);
    expect(createThemeMock).toHaveBeenCalledTimes(1);

    // Re-render with a brand new inline object literal of identical content —
    // this is exactly what happens on every parent re-render in real usage.
    rerender(<App counter={1} />);
    rerender(<App counter={2} />);

    expect(createThemeMock).toHaveBeenCalledTimes(1);
  });

  it('re-injects the theme when its content actually changes', () => {
    function App({ primary }) {
      return (
        <ThemeProvider theme={{ colors: { primary } }}>
          <div />
        </ThemeProvider>
      );
    }

    const { rerender } = render(<App primary="#3b82f6" />);
    expect(createThemeMock).toHaveBeenCalledTimes(1);

    rerender(<App primary="#ef4444" />);
    expect(createThemeMock).toHaveBeenCalledTimes(2);
  });
});
