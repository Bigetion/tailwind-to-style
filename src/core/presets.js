/**
 * Preset System - Pre-configured Themes
 * Material Design, Ant Design, Bootstrap-like configurations
 */

import { configure } from "../index.js";

/**
 * Material Design 3 Preset
 */
export const materialPreset = {
  name: "Material Design 3",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e8eaf6",
          100: "#c5cae9",
          200: "#9fa8da",
          300: "#7986cb",
          400: "#5c6bc0",
          500: "#3f51b5",
          600: "#3949ab",
          700: "#303f9f",
          800: "#283593",
          900: "#1a237e",
        },
        secondary: {
          50: "#fce4ec",
          100: "#f8bbd0",
          200: "#f48fb1",
          300: "#f06292",
          400: "#ec407a",
          500: "#e91e63",
          600: "#d81b60",
          700: "#c2185b",
          800: "#ad1457",
          900: "#880e4f",
        },
        surface: {
          DEFAULT: "#ffffff",
          variant: "#f5f5f5",
        },
        error: {
          DEFAULT: "#b00020",
          container: "#fdecea",
        },
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "28px",
        full: "9999px",
      },
      boxShadow: {
        1: "0 1px 2px 0 rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)",
        2: "0 1px 2px 0 rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)",
        3: "0 1px 3px 0 rgba(0,0,0,0.3), 0 4px 8px 3px rgba(0,0,0,0.15)",
        4: "0 2px 3px 0 rgba(0,0,0,0.3), 0 6px 10px 4px rgba(0,0,0,0.15)",
        5: "0 4px 4px 0 rgba(0,0,0,0.3), 0 8px 12px 6px rgba(0,0,0,0.15)",
      },
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
      },
    },
  },
};

/**
 * Ant Design Preset
 */
export const antDesignPreset = {
  name: "Ant Design",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e6f7ff",
          100: "#bae7ff",
          200: "#91d5ff",
          300: "#69c0ff",
          400: "#40a9ff",
          500: "#1890ff",
          600: "#096dd9",
          700: "#0050b3",
          800: "#003a8c",
          900: "#002766",
        },
        success: {
          DEFAULT: "#52c41a",
          hover: "#73d13d",
          active: "#389e0d",
        },
        warning: {
          DEFAULT: "#faad14",
          hover: "#ffc53d",
          active: "#d48806",
        },
        error: {
          DEFAULT: "#ff4d4f",
          hover: "#ff7875",
          active: "#d9363e",
        },
        neutral: {
          1: "#ffffff",
          2: "#fafafa",
          3: "#f5f5f5",
          4: "#f0f0f0",
          5: "#d9d9d9",
          6: "#bfbfbf",
          7: "#8c8c8c",
          8: "#595959",
          9: "#434343",
          10: "#262626",
          11: "#1f1f1f",
          12: "#141414",
          13: "#000000",
        },
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "6px",
        lg: "8px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px 0 rgba(0,0,0,0.02)",
        DEFAULT:
          "0 3px 6px -4px rgba(0,0,0,0.12), 0 6px 16px 0 rgba(0,0,0,0.08), 0 9px 28px 8px rgba(0,0,0,0.05)",
        lg: "0 6px 16px -8px rgba(0,0,0,0.08), 0 9px 28px 0 rgba(0,0,0,0.05), 0 12px 48px 16px rgba(0,0,0,0.03)",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
        ],
      },
    },
  },
};

/**
 * Bootstrap 5 Preset
 */
export const bootstrapPreset = {
  name: "Bootstrap 5",
  theme: {
    extend: {
      colors: {
        primary: "#0d6efd",
        secondary: "#6c757d",
        success: "#198754",
        danger: "#dc3545",
        warning: "#ffc107",
        info: "#0dcaf0",
        light: "#f8f9fa",
        dark: "#212529",
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.375rem",
        lg: "0.5rem",
        pill: "50rem",
      },
      boxShadow: {
        sm: "0 0.125rem 0.25rem rgba(0,0,0,0.075)",
        DEFAULT: "0 0.5rem 1rem rgba(0,0,0,0.15)",
        lg: "0 1rem 3rem rgba(0,0,0,0.175)",
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
};

/**
 * Chakra UI Preset
 */
export const chakraPreset = {
  name: "Chakra UI",
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#F7FAFC",
          100: "#EDF2F7",
          200: "#E2E8F0",
          300: "#CBD5E0",
          400: "#A0AEC0",
          500: "#718096",
          600: "#4A5568",
          700: "#2D3748",
          800: "#1A202C",
          900: "#171923",
        },
        blue: {
          50: "#ebf8ff",
          100: "#bee3f8",
          200: "#90cdf4",
          300: "#63b3ed",
          400: "#4299e1",
          500: "#3182ce",
          600: "#2b6cb0",
          700: "#2c5282",
          800: "#2a4365",
          900: "#1A365D",
        },
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
        inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
        none: "none",
      },
    },
  },
};

/**
 * Glassmorphism Preset
 */
export const glassmorphismPreset = {
  name: "Glassmorphism",
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px",
      },
      backgroundColor: {
        glass: "rgba(255, 255, 255, 0.1)",
        "glass-dark": "rgba(0, 0, 0, 0.1)",
      },
      borderColor: {
        glass: "rgba(255, 255, 255, 0.2)",
      },
    },
  },
};

/**
 * Neumorphism Preset
 */
export const neumorphismPreset = {
  name: "Neumorphism",
  theme: {
    extend: {
      colors: {
        neubg: {
          light: "#e0e5ec",
          dark: "#2e333d",
        },
      },
      boxShadow: {
        neu: "9px 9px 16px rgba(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)",
        "neu-inset":
          "inset 9px 9px 16px rgba(163,177,198,0.6), inset -9px -9px 16px rgba(255,255,255, 0.5)",
        "neu-dark":
          "9px 9px 16px rgba(0,0,0,0.4), -9px -9px 16px rgba(255,255,255, 0.05)",
        "neu-dark-inset":
          "inset 9px 9px 16px rgba(0,0,0,0.4), inset -9px -9px 16px rgba(255,255,255, 0.05)",
      },
    },
  },
};

/**
 * Apply preset
 * @param {Object} preset - Preset to apply
 */
export function applyPreset(preset) {
  configure(preset.theme);
  return preset;
}

/**
 * Merge multiple presets
 * @param {...Object} presets - Presets to merge
 */
export function mergePresets(...presets) {
  const merged = {
    name: presets.map((p) => p.name).join(" + "),
    theme: {
      extend: {},
    },
  };

  for (const preset of presets) {
    if (preset.theme?.extend) {
      for (const [key, value] of Object.entries(preset.theme.extend)) {
        if (!merged.theme.extend[key]) {
          merged.theme.extend[key] = {};
        }
        Object.assign(merged.theme.extend[key], value);
      }
    }
  }

  return merged;
}

/**
 * Create custom preset
 * @param {string} name - Preset name
 * @param {Object} theme - Theme configuration
 */
export function createPreset(name, theme) {
  return { name, theme };
}
