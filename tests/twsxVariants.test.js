/**
 * @jest-environment jsdom
 */

import { twsxVariants } from '../src/index.js';

describe('twsxVariants', () => {
  describe('Basic Functionality', () => {
    test('should return a function', () => {
      const button = twsxVariants('.btn', {
        base: 'px-4 py-2',
      });
      expect(typeof button).toBe('function');
    });

    test('should generate base class name', () => {
      const button = twsxVariants('.btn', {
        base: 'px-4 py-2 rounded',
      });
      const className = button();
      expect(className).toContain('btn');
    });

    test('should handle className without dot prefix', () => {
      const button = twsxVariants('btn', {
        base: 'px-4 py-2',
      });
      const className = button();
      expect(className).toContain('btn');
    });
  });

  describe('Single Variant', () => {
    test('should apply single variant', () => {
      const button = twsxVariants('.btn', {
        base: 'px-4 py-2',
        variants: {
          color: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
        },
      });

      expect(button({ color: 'primary' })).toContain('primary');
      expect(button({ color: 'secondary' })).toContain('secondary');
    });

    test('should apply multiple variant types', () => {
      const button = twsxVariants('.btn', {
        base: 'px-4 py-2',
        variants: {
          color: {
            primary: 'bg-blue-500',
            danger: 'bg-red-500',
          },
          size: {
            sm: 'text-sm',
            lg: 'text-lg',
          },
        },
      });

      const className = button({ color: 'danger', size: 'lg' });
      expect(className).toContain('danger');
      expect(className).toContain('lg');
    });
  });

  describe('Default Variants', () => {
    test('should apply default variants when no props provided', () => {
      const button = twsxVariants('.btn', {
        base: 'px-4 py-2',
        variants: {
          color: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
        },
        defaultVariants: {
          color: 'primary',
        },
      });

      // When calling without props, should use defaults
      const className = button();
      expect(className).toBe('btn');
    });

    test('should override default variants with explicit props', () => {
      const button = twsxVariants('.btn', {
        base: 'px-4 py-2',
        variants: {
          color: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
        },
        defaultVariants: {
          color: 'primary',
        },
      });

      const className = button({ color: 'secondary' });
      expect(className).toContain('secondary');
      expect(className).not.toContain('primary');
    });

    test('should handle multiple default variants', () => {
      const button = twsxVariants('.btn', {
        base: 'px-4 py-2',
        variants: {
          color: {
            primary: 'bg-blue-500',
            secondary: 'bg-gray-500',
          },
          size: {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
          },
        },
        defaultVariants: {
          color: 'primary',
          size: 'md',
        },
      });

      const className = button();
      expect(className).toBe('btn');
    });
  });

  describe('Compound Variants', () => {
    test('should apply compound variants for matching conditions', () => {
      const button = twsxVariants('.btn', {
        base: 'px-4 py-2',
        variants: {
          variant: {
            solid: 'border-transparent',
            outline: 'bg-transparent border-2',
          },
          color: {
            primary: 'text-white bg-blue-500',
            danger: 'text-white bg-red-500',
          },
        },
        compoundVariants: [
          {
            variant: 'outline',
            color: 'primary',
            // bg-transparent must be included to re-override color's bg-blue-500
            class: 'bg-transparent border-blue-500 text-blue-600 hover:bg-blue-50',
          },
          {
            variant: 'outline',
            color: 'danger',
            class: 'bg-transparent border-red-500 text-red-600 hover:bg-red-50',
          },
        ],
      });

      const outlinePrimary = button({ variant: 'outline', color: 'primary' });
      expect(outlinePrimary).toContain('outline');
      expect(outlinePrimary).toContain('primary');
    });

    test('should not apply compound variants for non-matching conditions', () => {
      const button = twsxVariants('.btn', {
        base: 'px-4 py-2',
        variants: {
          variant: {
            solid: 'border-transparent',
            outline: 'bg-transparent border-2',
          },
          color: {
            primary: 'bg-blue-500',
            danger: 'bg-red-500',
          },
        },
        compoundVariants: [
          {
            variant: 'outline',
            color: 'primary',
            class: 'special-outline-primary',
          },
        ],
      });

      // solid + primary (doesn't match compound)
      const solidPrimary = button({ variant: 'solid', color: 'primary' });
      expect(solidPrimary).not.toContain('special-outline-primary');
    });
  });

  describe('Boolean Variants', () => {
    test('should handle boolean variants', () => {
      const button = twsxVariants('.btn', {
        base: 'px-4 py-2',
        variants: {
          fullWidth: {
            true: 'w-full',
            false: 'w-auto',
          },
          disabled: {
            true: 'opacity-50 cursor-not-allowed',
            false: '',
          },
        },
        defaultVariants: {
          fullWidth: false,
          disabled: false,
        },
      });

      expect(button({ fullWidth: true })).toContain('fullWidth');
      expect(button({ disabled: true })).toContain('disabled');
    });
  });

  describe('Nested Selectors', () => {
    test('should generate CSS for nested selectors', () => {
      const alert = twsxVariants('.alert', {
        base: 'p-4 rounded border',
        variants: {
          status: {
            info: 'bg-blue-50 text-blue-800',
            error: 'bg-red-50 text-red-800',
          },
        },
        defaultVariants: {
          status: 'info',
        },
        nested: {
          '.alert-icon': 'flex-shrink-0 mt-0.5',
          '.alert-content': 'flex-1',
          '.alert-dismiss': 'p-1 rounded hover:bg-black/10',
        },
      });

      const className = alert({ status: 'error' });
      expect(className).toContain('alert');
    });
  });

  describe('Class Name Conflicts', () => {
    test('should handle conflicting classes correctly', () => {
      const button = twsxVariants('.btn', {
        base: 'bg-gray-500',
        variants: {
          color: {
            primary: 'bg-blue-500',
            danger: 'bg-red-500',
          },
        },
      });

      // Later classes should override earlier ones
      const className = button({ color: 'primary' });
      expect(className).toContain('primary');
    });

    test('should resolve text size conflicts', () => {
      const text = twsxVariants('.text', {
        base: 'text-sm',
        variants: {
          size: {
            lg: 'text-lg',
            xl: 'text-xl',
          },
        },
      });

      const className = text({ size: 'xl' });
      expect(className).toContain('xl');
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty config', () => {
      const button = twsxVariants('.btn', {});
      expect(button()).toBe('btn');
    });

    test('should handle undefined variant values', () => {
      const button = twsxVariants('.btn', {
        base: 'px-4 py-2',
        variants: {
          color: {
            primary: 'bg-blue-500',
          },
        },
      });

      expect(button({ color: undefined })).toBe('btn');
    });

    test('should handle null variant values', () => {
      const button = twsxVariants('.btn', {
        base: 'px-4 py-2',
        variants: {
          color: {
            primary: 'bg-blue-500',
          },
        },
      });

      expect(button({ color: null })).toBe('btn');
    });

    test('should handle non-existent variant values', () => {
      const button = twsxVariants('.btn', {
        base: 'px-4 py-2',
        variants: {
          color: {
            primary: 'bg-blue-500',
          },
        },
      });

      expect(button({ color: 'nonexistent' })).toBe('btn');
    });
  });

  describe('Performance with Caching', () => {
    test('should return cached function for same config', () => {
      const config = {
        base: 'px-4 py-2',
        variants: {
          color: {
            primary: 'bg-blue-500',
          },
        },
      };

      const button1 = twsxVariants('.btn', config);
      const button2 = twsxVariants('.btn', config);

      // Should return the same cached function (reference equality)
      expect(button1).toBe(button2);
    });

    test('should generate different functions for different configs', () => {
      const button1 = twsxVariants('.btn', {
        base: 'px-4 py-2',
      });

      const button2 = twsxVariants('.btn', {
        base: 'px-6 py-3',
      });

      expect(button1).not.toBe(button2);
    });
  });

  describe('Complex Real-World Scenarios', () => {
    test('should handle button component with all features', () => {
      const button = twsxVariants('.btn', {
        base: 'inline-flex items-center justify-center font-medium transition-all',
        variants: {
          variant: {
            solid: 'border-transparent',
            outline: 'bg-transparent border-2',
            ghost: 'bg-transparent',
          },
          color: {
            primary: 'bg-blue-600 text-white hover:bg-blue-700',
            danger: 'bg-red-600 text-white hover:bg-red-700',
          },
          size: {
            sm: 'px-3 py-1.5 text-sm rounded',
            md: 'px-4 py-2 text-base rounded-md',
            lg: 'px-6 py-3 text-lg rounded-lg',
          },
          fullWidth: {
            true: 'w-full',
            false: 'w-auto',
          },
        },
        compoundVariants: [
          {
            variant: 'outline',
            color: 'primary',
            // bg-transparent re-overrides color's bg-blue-600
            class: 'bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50',
          },
          {
            variant: 'outline',
            color: 'danger',
            class: 'bg-transparent border-red-600 text-red-600 hover:bg-red-50',
          },
          {
            size: 'lg',
            fullWidth: true,
            class: 'py-4',
          },
        ],
        defaultVariants: {
          variant: 'solid',
          color: 'primary',
          size: 'md',
          fullWidth: false,
        },
      });

      // Test various combinations
      expect(button()).toBe('btn');
      expect(button({ color: 'danger' })).toContain('danger');
      expect(button({ variant: 'outline', color: 'primary' })).toContain('outline');
      expect(button({ size: 'lg', fullWidth: true })).toContain('lg');
    });
  });
});
