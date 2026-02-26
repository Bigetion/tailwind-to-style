/**
 * tailwind-to-style v3.2.0
 * Runtime Tailwind CSS to inline styles converter
 * 
 * @author Bigetion
 * @license MIT
 */
'use strict';

const theme = {
  accentColor: _ref => {
    let {
      theme
    } = _ref;
    return {
      ...theme("colors"),
      auto: "auto",
      custom: "custom_value"
    };
  },
  animation: {
    none: "none",
    spin: "spin 1s linear infinite",
    ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
    pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    bounce: "bounce 1s infinite",
    "fade-in": "fadeIn 2s ease-in-out infinite",
    "slide-up": "slideUp 2s ease-in-out infinite",
    custom: "custom_value"
  },
  aspectRatio: {
    auto: "auto",
    square: "1 / 1",
    video: "16 / 9",
    custom: "custom_value"
  },
  backdropBlur: _ref2 => {
    let {
      theme
    } = _ref2;
    return theme("blur");
  },
  backdropBrightness: _ref3 => {
    let {
      theme
    } = _ref3;
    return theme("brightness");
  },
  backdropContrast: _ref4 => {
    let {
      theme
    } = _ref4;
    return theme("contrast");
  },
  backdropGrayscale: _ref5 => {
    let {
      theme
    } = _ref5;
    return theme("grayscale");
  },
  backdropHueRotate: _ref6 => {
    let {
      theme
    } = _ref6;
    return theme("hueRotate");
  },
  backdropInvert: _ref7 => {
    let {
      theme
    } = _ref7;
    return theme("invert");
  },
  backdropOpacity: _ref8 => {
    let {
      theme
    } = _ref8;
    return theme("opacity");
  },
  backdropSaturate: _ref9 => {
    let {
      theme
    } = _ref9;
    return theme("saturate");
  },
  backdropSepia: _ref0 => {
    let {
      theme
    } = _ref0;
    return theme("sepia");
  },
  backgroundColor: _ref1 => {
    let {
      theme
    } = _ref1;
    return theme("colors");
  },
  backgroundImage: {
    none: "none",
    "gradient-to-t": "linear-gradient(to top, var(--gradient-color-stops))",
    "gradient-to-tr": "linear-gradient(to top right, var(--gradient-color-stops))",
    "gradient-to-r": "linear-gradient(to right, var(--gradient-color-stops))",
    "gradient-to-br": "linear-gradient(to bottom right, var(--gradient-color-stops))",
    "gradient-to-b": "linear-gradient(to bottom, var(--gradient-color-stops))",
    "gradient-to-bl": "linear-gradient(to bottom left, var(--gradient-color-stops))",
    "gradient-to-l": "linear-gradient(to left, var(--gradient-color-stops))",
    "gradient-to-tl": "linear-gradient(to top left, var(--gradient-color-stops))"
  },
  backgroundOpacity: _ref10 => {
    let {
      theme
    } = _ref10;
    return theme("opacity");
  },
  backgroundPosition: {
    bottom: "bottom",
    center: "center",
    left: "left",
    "left-bottom": "left bottom",
    "left-top": "left top",
    right: "right",
    "right-bottom": "right bottom",
    "right-top": "right top",
    top: "top"
  },
  backgroundSize: {
    auto: "auto",
    cover: "cover",
    contain: "contain"
  },
  blur: {
    0: "0",
    none: "0",
    sm: "4px",
    DEFAULT: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "40px",
    "3xl": "64px",
    custom: "custom_value"
  },
  borderColor: _ref11 => {
    let {
      theme
    } = _ref11;
    return {
      ...theme("colors"),
      DEFAULT: "#e5e7eb"
    };
  },
  borderOpacity: _ref12 => {
    let {
      theme
    } = _ref12;
    return theme("opacity");
  },
  borderRadius: {
    none: "0px",
    sm: "0.125rem",
    DEFAULT: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
    custom: "custom_value"
  },
  borderSpacing: _ref13 => {
    let {
      theme
    } = _ref13;
    return {
      ...theme("spacing")
    };
  },
  borderWidth: {
    DEFAULT: "1px",
    0: "0px",
    2: "2px",
    4: "4px",
    8: "8px",
    custom: "custom_value"
  },
  boxShadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    none: "none",
    custom: "custom_value"
  },
  boxShadowColor: _ref14 => {
    let {
      theme
    } = _ref14;
    return theme("colors");
  },
  brightness: {
    0: "0",
    50: ".5",
    75: ".75",
    90: ".9",
    95: ".95",
    100: "1",
    105: "1.05",
    110: "1.1",
    125: "1.25",
    150: "1.5",
    200: "2",
    custom: "custom_value"
  },
  caretColor: _ref15 => {
    let {
      theme
    } = _ref15;
    return theme("colors");
  },
  colors: {
    transparent: "transparent",
    current: "currentColor",
    black: "#000000",
    white: "#ffffff",
    slate: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a"
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827"
    },
    zinc: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b"
    },
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717"
    },
    stone: {
      50: "#fafaf9",
      100: "#f5f5f4",
      200: "#e7e5e4",
      300: "#d6d3d1",
      400: "#a8a29e",
      500: "#78716c",
      600: "#57534e",
      700: "#44403c",
      800: "#292524",
      900: "#1c1917"
    },
    red: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d"
    },
    orange: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12"
    },
    amber: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f"
    },
    yellow: {
      50: "#fefce8",
      100: "#fef9c3",
      200: "#fef08a",
      300: "#fde047",
      400: "#facc15",
      500: "#eab308",
      600: "#ca8a04",
      700: "#a16207",
      800: "#854d0e",
      900: "#713f12"
    },
    lime: {
      50: "#f7fee7",
      100: "#ecfccb",
      200: "#d9f99d",
      300: "#bef264",
      400: "#a3e635",
      500: "#84cc16",
      600: "#65a30d",
      700: "#4d7c0f",
      800: "#3f6212",
      900: "#365314"
    },
    green: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d"
    },
    emerald: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
      700: "#047857",
      800: "#065f46",
      900: "#064e3b"
    },
    teal: {
      50: "#f0fdfa",
      100: "#ccfbf1",
      200: "#99f6e4",
      300: "#5eead4",
      400: "#2dd4bf",
      500: "#14b8a6",
      600: "#0d9488",
      700: "#0f766e",
      800: "#115e59",
      900: "#134e4a"
    },
    cyan: {
      50: "#ecfeff",
      100: "#cffafe",
      200: "#a5f3fc",
      300: "#67e8f9",
      400: "#22d3ee",
      500: "#06b6d4",
      600: "#0891b2",
      700: "#0e7490",
      800: "#155e75",
      900: "#164e63"
    },
    sky: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e"
    },
    blue: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a"
    },
    indigo: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81"
    },
    violet: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95"
    },
    purple: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
      700: "#7e22ce",
      800: "#6b21a8",
      900: "#581c87"
    },
    fuchsia: {
      50: "#fdf4ff",
      100: "#fae8ff",
      200: "#f5d0fe",
      300: "#f0abfc",
      400: "#e879f9",
      500: "#d946ef",
      600: "#c026d3",
      700: "#a21caf",
      800: "#86198f",
      900: "#701a75"
    },
    pink: {
      50: "#fdf2f8",
      100: "#fce7f3",
      200: "#fbcfe8",
      300: "#f9a8d4",
      400: "#f472b6",
      500: "#ec4899",
      600: "#db2777",
      700: "#be185d",
      800: "#9d174d",
      900: "#831843"
    },
    rose: {
      50: "#fff1f2",
      100: "#ffe4e6",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
      700: "#be123c",
      800: "#9f1239",
      900: "#881337"
    },
    custom: "custom_value"
  },
  columns: {
    auto: "auto",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12",
    "3xs": "16rem",
    "2xs": "18rem",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem",
    custom: "custom_value"
  },
  content: {
    none: "none",
    custom: "custom_value"
  },
  contrast: {
    0: "0",
    50: ".5",
    75: ".75",
    100: "1",
    125: "1.25",
    150: "1.5",
    200: "2",
    custom: "custom_value"
  },
  cursor: {
    auto: "auto",
    default: "default",
    pointer: "pointer",
    wait: "wait",
    text: "text",
    move: "move",
    help: "help",
    "not-allowed": "not-allowed",
    none: "none",
    "context-menu": "context-menu",
    progress: "progress",
    cell: "cell",
    crosshair: "crosshair",
    "vertical-text": "vertical-text",
    alias: "alias",
    copy: "copy",
    "no-drop": "no-drop",
    grab: "grab",
    grabbing: "grabbing",
    "all-scroll": "all-scroll",
    "col-resize": "col-resize",
    "row-resize": "row-resize",
    "n-resize": "n-resize",
    "e-resize": "e-resize",
    "s-resize": "s-resize",
    "w-resize": "w-resize",
    "ne-resize": "ne-resize",
    "nw-resize": "nw-resize",
    "se-resize": "se-resize",
    "sw-resize": "sw-resize",
    "ew-resize": "ew-resize",
    "ns-resize": "ns-resize",
    "nesw-resize": "nesw-resize",
    "nwse-resize": "nwse-resize",
    "zoom-in": "zoom-in",
    "zoom-out": "zoom-out"
  },
  divideColor: _ref16 => {
    let {
      theme
    } = _ref16;
    return theme("borderColor");
  },
  divideOpacity: _ref17 => {
    let {
      theme
    } = _ref17;
    return theme("borderOpacity");
  },
  divideWidth: _ref18 => {
    let {
      theme
    } = _ref18;
    return theme("borderWidth");
  },
  dropShadow: {
    sm: "0 1px 1px rgb(0 0 0 / 0.05)",
    DEFAULT: "0 1px 2px rgb(0 0 0 / 0.1) , 0 1px 1px rgb(0 0 0 / 0.06)",
    md: "0 4px 3px rgb(0 0 0 / 0.07) , 0 2px 2px rgb(0 0 0 / 0.06)",
    lg: "0 10px 8px rgb(0 0 0 / 0.04) , 0 4px 3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 13px rgb(0 0 0 / 0.03) , 0 8px 5px rgb(0 0 0 / 0.08)",
    "2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
    none: "0 0 #0000"
  },
  fill: _ref19 => {
    let {
      theme
    } = _ref19;
    return {
      none: "none",
      ...theme("colors")
    };
  },
  flex: {
    1: "1 1 0%",
    auto: "1 1 auto",
    initial: "0 1 auto",
    none: "none"
  },
  flexBasis: _ref20 => {
    let {
      theme
    } = _ref20;
    return {
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      "1/12": "8.333333%",
      "2/12": "16.666667%",
      "3/12": "25%",
      "4/12": "33.333333%",
      "5/12": "41.666667%",
      "6/12": "50%",
      "7/12": "58.333333%",
      "8/12": "66.666667%",
      "9/12": "75%",
      "10/12": "83.333333%",
      "11/12": "91.666667%",
      full: "100%"
    };
  },
  flexGrow: {
    0: "0",
    DEFAULT: "1"
  },
  flexShrink: {
    0: "0",
    DEFAULT: "1"
  },
  fontFamily: {
    sans: ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", '"Noto Sans"', "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'].join(", "),
    serif: ["ui-serif", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"].join(", "),
    mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", '"Liberation Mono"', '"Courier New"', "monospace"].join(", ")
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
    custom: "custom_value"
  },
  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
    custom: "custom_value"
  },
  gap: _ref21 => {
    let {
      theme
    } = _ref21;
    return theme("spacing");
  },
  gradientColorStops: _ref22 => {
    let {
      theme
    } = _ref22;
    return theme("colors");
  },
  gradientColorStopPositions: {
    "0%": "0%",
    "5%": "5%",
    "10%": "10%",
    "15%": "15%",
    "20%": "20%",
    "25%": "25%",
    "30%": "30%",
    "35%": "35%",
    "40%": "40%",
    "45%": "45%",
    "50%": "50%",
    "55%": "55%",
    "60%": "60%",
    "65%": "65%",
    "70%": "70%",
    "75%": "75%",
    "80%": "80%",
    "85%": "85%",
    "90%": "90%",
    "95%": "95%",
    "100%": "100%"
  },
  grayscale: {
    0: "0",
    DEFAULT: "100%"
  },
  gridAutoColumns: {
    auto: "auto",
    min: "min-content",
    max: "max-content",
    fr: "minmax(0, 1fr)"
  },
  gridAutoRows: {
    auto: "auto",
    min: "min-content",
    max: "max-content",
    fr: "minmax(0, 1fr)"
  },
  gridColumn: {
    auto: "auto",
    "span-1": "span 1 / span 1",
    "span-2": "span 2 / span 2",
    "span-3": "span 3 / span 3",
    "span-4": "span 4 / span 4",
    "span-5": "span 5 / span 5",
    "span-6": "span 6 / span 6",
    "span-7": "span 7 / span 7",
    "span-8": "span 8 / span 8",
    "span-9": "span 9 / span 9",
    "span-10": "span 10 / span 10",
    "span-11": "span 11 / span 11",
    "span-12": "span 12 / span 12",
    "span-full": "1 / -1"
  },
  gridColumnEnd: {
    auto: "auto",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12",
    13: "13"
  },
  gridColumnStart: {
    auto: "auto",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12",
    13: "13"
  },
  gridRow: {
    auto: "auto",
    "span-1": "span 1 / span 1",
    "span-2": "span 2 / span 2",
    "span-3": "span 3 / span 3",
    "span-4": "span 4 / span 4",
    "span-5": "span 5 / span 5",
    "span-6": "span 6 / span 6",
    "span-7": "span 7 / span 7",
    "span-8": "span 8 / span 8",
    "span-9": "span 9 / span 9",
    "span-10": "span 10 / span 10",
    "span-11": "span 11 / span 11",
    "span-12": "span 12 / span 12",
    "span-full": "1 / -1"
  },
  gridRowEnd: {
    auto: "auto",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12",
    13: "13"
  },
  gridRowStart: {
    auto: "auto",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12",
    13: "13"
  },
  gridTemplateColumns: {
    none: "none",
    subgrid: "subgrid",
    1: "repeat(1, minmax(0, 1fr))",
    2: "repeat(2, minmax(0, 1fr))",
    3: "repeat(3, minmax(0, 1fr))",
    4: "repeat(4, minmax(0, 1fr))",
    5: "repeat(5, minmax(0, 1fr))",
    6: "repeat(6, minmax(0, 1fr))",
    7: "repeat(7, minmax(0, 1fr))",
    8: "repeat(8, minmax(0, 1fr))",
    9: "repeat(9, minmax(0, 1fr))",
    10: "repeat(10, minmax(0, 1fr))",
    11: "repeat(11, minmax(0, 1fr))",
    12: "repeat(12, minmax(0, 1fr))"
  },
  gridTemplateRows: {
    none: "none",
    subgrid: "subgrid",
    1: "repeat(1, minmax(0, 1fr))",
    2: "repeat(2, minmax(0, 1fr))",
    3: "repeat(3, minmax(0, 1fr))",
    4: "repeat(4, minmax(0, 1fr))",
    5: "repeat(5, minmax(0, 1fr))",
    6: "repeat(6, minmax(0, 1fr))",
    7: "repeat(7, minmax(0, 1fr))",
    8: "repeat(8, minmax(0, 1fr))",
    9: "repeat(9, minmax(0, 1fr))",
    10: "repeat(10, minmax(0, 1fr))",
    11: "repeat(11, minmax(0, 1fr))",
    12: "repeat(12, minmax(0, 1fr))"
  },
  height: _ref23 => {
    let {
      theme
    } = _ref23;
    return {
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      full: "100%",
      screen: "100vh",
      svh: "100svh",
      lvh: "100lvh",
      dvh: "100dvh",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
      custom: "custom_value"
    };
  },
  hueRotate: {
    0: "0deg",
    15: "15deg",
    30: "30deg",
    60: "60deg",
    90: "90deg",
    180: "180deg"
  },
  inset: _ref24 => {
    let {
      theme
    } = _ref24;
    return {
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      full: "100%"
    };
  },
  invert: {
    0: "0",
    DEFAULT: "100%"
  },
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
    custom: "custom_value"
  },
  lineClamp: {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    custom: "custom_value"
  },
  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
    3: ".75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    custom: "custom_value"
  },
  listStyleType: {
    none: "none",
    disc: "disc",
    decimal: "decimal"
  },
  margin: _ref25 => {
    let {
      theme
    } = _ref25;
    return {
      auto: "auto",
      ...theme("spacing")
    };
  },
  maxHeight: _ref26 => {
    let {
      theme
    } = _ref26;
    return {
      ...theme("spacing"),
      none: "none",
      full: "100%",
      screen: "100vh",
      svh: "100svh",
      lvh: "100lvh",
      dvh: "100dvh",
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    };
  },
  maxWidth: _ref27 => {
    let {
      theme
    } = _ref27;
    return {
      ...theme("spacing"),
      none: "none",
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5xl": "64rem",
      "6xl": "72rem",
      "7xl": "80rem",
      full: "100%",
      min: "min-content",
      max: "max-content",
      fit: "fit-content",
      prose: "65ch"
    };
  },
  minHeight: _ref28 => {
    let {
      theme
    } = _ref28;
    return {
      ...theme("spacing"),
      full: "100%",
      screen: "100vh",
      svh: "100svh",
      lvh: "100lvh",
      dvh: "100dvh",
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    };
  },
  minWidth: _ref29 => {
    let {
      theme
    } = _ref29;
    return {
      ...theme("spacing"),
      full: "100%",
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    };
  },
  objectPosition: {
    bottom: "bottom",
    center: "center",
    left: "left",
    "left-bottom": "left bottom",
    "left-top": "left top",
    right: "right",
    "right-bottom": "right bottom",
    "right-top": "right top",
    top: "top"
  },
  opacity: {
    0: "0",
    5: "0.05",
    10: "0.1",
    15: "0.15",
    20: "0.2",
    25: "0.25",
    30: "0.3",
    35: "0.35",
    40: "0.4",
    45: "0.45",
    50: "0.5",
    55: "0.55",
    60: "0.6",
    65: "0.65",
    70: "0.7",
    75: "0.75",
    80: "0.8",
    85: "0.85",
    90: "0.9",
    95: "0.95",
    100: "1",
    custom: "custom_value"
  },
  order: {
    first: "-9999",
    last: "9999",
    none: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10",
    11: "11",
    12: "12",
    custom: "custom_value"
  },
  outlineColor: _ref30 => {
    let {
      theme
    } = _ref30;
    return theme("colors");
  },
  outlineOffset: {
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px",
    custom: "custom_value"
  },
  outlineOpacity: _ref31 => {
    let {
      theme
    } = _ref31;
    return theme("opacity");
  },
  outlineWidth: {
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px",
    custom: "custom_value"
  },
  padding: _ref32 => {
    let {
      theme
    } = _ref32;
    return theme("spacing");
  },
  ringColor: _ref33 => {
    let {
      theme
    } = _ref33;
    return {
      DEFAULT: "#3b82f6",
      ...theme("colors")
    };
  },
  ringOffsetColor: _ref34 => {
    let {
      theme
    } = _ref34;
    return theme("colors");
  },
  ringOffsetWidth: {
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px",
    custom: "custom_value"
  },
  ringOpacity: _ref35 => {
    let {
      theme
    } = _ref35;
    return {
      DEFAULT: "0.5",
      ...theme("opacity")
    };
  },
  ringWidth: {
    DEFAULT: "3px",
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px",
    custom: "custom_value"
  },
  rotate: {
    0: "0deg",
    1: "1deg",
    2: "2deg",
    3: "3deg",
    6: "6deg",
    12: "12deg",
    45: "45deg",
    90: "90deg",
    180: "180deg",
    custom: "custom_value"
  },
  saturate: {
    0: "0",
    50: ".5",
    100: "1",
    150: "1.5",
    200: "2",
    custom: "custom_value"
  },
  scale: {
    0: "0",
    50: ".5",
    75: ".75",
    90: ".9",
    95: ".95",
    100: "1",
    105: "1.05",
    110: "1.1",
    125: "1.25",
    150: "1.5",
    custom: "custom_value"
  },
  scrollMargin: _ref36 => {
    let {
      theme
    } = _ref36;
    return {
      ...theme("spacing")
    };
  },
  scrollPadding: _ref37 => {
    let {
      theme
    } = _ref37;
    return theme("spacing");
  },
  sepia: {
    0: "0",
    DEFAULT: "100%"
  },
  skew: {
    0: "0deg",
    1: "1deg",
    2: "2deg",
    3: "3deg",
    6: "6deg",
    12: "12deg",
    custom: "custom_value"
  },
  space: _ref38 => {
    let {
      theme
    } = _ref38;
    return {
      ...theme("spacing")
    };
  },
  spacing: {
    px: "1px",
    0: "0px",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    3.5: "0.875rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    11: "2.75rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    28: "7rem",
    32: "8rem",
    36: "9rem",
    40: "10rem",
    44: "11rem",
    48: "12rem",
    52: "13rem",
    56: "14rem",
    60: "15rem",
    64: "16rem",
    72: "18rem",
    80: "20rem",
    96: "24rem",
    "screen-sm": "640px",
    "screen-md": "768px",
    "screen-lg": "1024px",
    "screen-xl": "1280px",
    "screen-2xl": "1536px",
    custom: "custom_value"
  },
  stroke: _ref39 => {
    let {
      theme
    } = _ref39;
    return {
      none: "none",
      ...theme("colors")
    };
  },
  strokeWidth: {
    0: "0",
    1: "1",
    2: "2",
    custom: "custom_value"
  },
  textColor: _ref40 => {
    let {
      theme
    } = _ref40;
    return theme("colors");
  },
  textDecorationColor: _ref41 => {
    let {
      theme
    } = _ref41;
    return theme("colors");
  },
  textDecorationThickness: {
    auto: "auto",
    "from-font": "from-font",
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px",
    custom: "custom_value"
  },
  textIndent: _ref42 => {
    let {
      theme
    } = _ref42;
    return {
      ...theme("spacing")
    };
  },
  textOpacity: _ref43 => {
    let {
      theme
    } = _ref43;
    return theme("opacity");
  },
  textShadowBlur: _ref44 => {
    let {
      theme
    } = _ref44;
    return theme("blur");
  },
  textShadowColor: _ref45 => {
    let {
      theme
    } = _ref45;
    return {
      ...theme("colors"),
      DEFAULT: "#e5e7eb"
    };
  },
  textShadowOpacity: _ref46 => {
    let {
      theme
    } = _ref46;
    return theme("opacity");
  },
  textShadowX: {
    0: "0px",
    1: "1px",
    2: "2px",
    3: "3px",
    4: "4px",
    5: "5px",
    6: "6px",
    7: "7px",
    8: "8px",
    9: "9px",
    10: "10px",
    custom: "custom_value"
  },
  textShadowY: _ref47 => {
    let {
      theme
    } = _ref47;
    return theme("textShadowX");
  },
  textUnderlineOffset: {
    auto: "auto",
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px",
    custom: "custom_value"
  },
  transformOrigin: {
    center: "center",
    top: "top",
    "top-right": "top right",
    right: "right",
    "bottom-right": "bottom right",
    bottom: "bottom",
    "bottom-left": "bottom left",
    left: "left",
    "top-left": "top left"
  },
  translate: _ref48 => {
    let {
      theme
    } = _ref48;
    return {
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      full: "100%"
    };
  },
  size: _ref49 => {
    let {
      theme
    } = _ref49;
    return {
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      "1/12": "8.333333%",
      "2/12": "16.666667%",
      "3/12": "25%",
      "4/12": "33.333333%",
      "5/12": "41.666667%",
      "6/12": "50%",
      "7/12": "58.333333%",
      "8/12": "66.666667%",
      "9/12": "75%",
      "10/12": "83.333333%",
      "11/12": "91.666667%",
      full: "100%",
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    };
  },
  width: _ref50 => {
    let {
      theme
    } = _ref50;
    return {
      auto: "auto",
      ...theme("spacing"),
      "1/2": "50%",
      "1/3": "33.333333%",
      "2/3": "66.666667%",
      "1/4": "25%",
      "2/4": "50%",
      "3/4": "75%",
      "1/5": "20%",
      "2/5": "40%",
      "3/5": "60%",
      "4/5": "80%",
      "1/6": "16.666667%",
      "2/6": "33.333333%",
      "3/6": "50%",
      "4/6": "66.666667%",
      "5/6": "83.333333%",
      "1/12": "8.333333%",
      "2/12": "16.666667%",
      "3/12": "25%",
      "4/12": "33.333333%",
      "5/12": "41.666667%",
      "6/12": "50%",
      "7/12": "58.333333%",
      "8/12": "66.666667%",
      "9/12": "75%",
      "10/12": "83.333333%",
      "11/12": "91.666667%",
      full: "100%",
      screen: "100vw",
      svw: "100svw",
      lvw: "100lvw",
      dvw: "100dvw",
      min: "min-content",
      max: "max-content",
      fit: "fit-content"
    };
  },
  willChange: {
    auto: "auto",
    scroll: "scroll-position",
    contents: "contents",
    transform: "transform"
  },
  zIndex: {
    0: "0",
    10: "10",
    20: "20",
    30: "30",
    40: "40",
    50: "50",
    60: "60",
    70: "70",
    80: "80",
    90: "90",
    100: "100",
    auto: "auto",
    custom: "custom_value"
  },
  keyframes: {
    spin: {
      "0%": {
        transform: "rotate(0deg)"
      },
      "100%": {
        transform: "rotate(360deg)"
      }
    },
    ping: {
      "75%, 100%": {
        transform: "scale(2)",
        opacity: "0"
      }
    },
    pulse: {
      "50%": {
        opacity: ".5"
      }
    },
    bounce: {
      "0%, 100%": {
        transform: "translateY(-25%)",
        animationTimingFunction: "cubic-bezier(0.8,0,1,1)"
      },
      "50%": {
        transform: "none",
        animationTimingFunction: "cubic-bezier(0,0,0.2,1)"
      }
    },
    fadeIn: {
      "0%": {
        opacity: "0"
      },
      "50%": {
        opacity: "1"
      },
      "100%": {
        opacity: "0"
      }
    },
    slideUp: {
      "0%": {
        transform: "translateY(20px)",
        opacity: "0"
      },
      "50%": {
        transform: "translateY(0)",
        opacity: "1"
      },
      "100%": {
        transform: "translateY(-20px)",
        opacity: "0"
      }
    }
  },
  transitionProperty: {
    none: "none",
    all: "all",
    DEFAULT: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
    colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
    opacity: "opacity",
    shadow: "box-shadow",
    transform: "transform"
  },
  transitionTimingFunction: {
    DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
  },
  transitionDuration: {
    0: "0s",
    75: "75ms",
    100: "100ms",
    150: "150ms",
    200: "200ms",
    300: "300ms",
    500: "500ms",
    700: "700ms",
    1000: "1000ms"
  },
  transitionDelay: {
    0: "0s",
    75: "75ms",
    100: "100ms",
    150: "150ms",
    200: "200ms",
    300: "300ms",
    500: "500ms",
    700: "700ms",
    1000: "1000ms"
  }
};

const vars = {
  transform: "transform: translateX(var(--transform-translate-x, 0)) translateY(var(--transform-translate-y, 0)) rotate(var(--transform-rotate, 0)) skewX(var(--transform-skew-x, 0)) skewY(var(--transform-skew-y, 0)) scaleX(var(--transform-scale-x, 1)) scaleY(var(--transform-scale-y, 1));",
  filter: "filter: blur(var(--blur, 0)) brightness(var(--brightness, 1)) contrast(var(--contrast, 1)) grayscale(var(--grayscale, 0)) hue-rotate(var(--hue-rotate, 0deg)) invert(var(--invert, 0)) saturate(var(--saturate, 1)) sepia(var(--sepia, 0)) drop-shadow(var(--drop-shadow, 0 0 #0000));",
  backdropFilter: "-webkit-backdrop-filter: blur(var(--backdrop-blur, 0)) brightness(var(--backdrop-brightness, 1)) contrast(var(--backdrop-contrast, 1)) grayscale(var(--backdrop-grayscale, 0)) hue-rotate(var(--backdrop-hue-rotate, 0deg)) invert(var(--backdrop-invert, 0)) opacity(var(--backdrop-opacity, 1)) saturate(var(--backdrop-saturate, 1)) sepia(var(--backdrop-sepia, 0)); backdrop-filter: blur(var(--backdrop-blur, 0)) brightness(var(--backdrop-brightness, 1)) contrast(var(--backdrop-contrast, 1)) grayscale(var(--backdrop-grayscale, 0)) hue-rotate(var(--backdrop-hue-rotate, 0deg)) invert(var(--backdrop-invert, 0)) opacity(var(--backdrop-opacity, 1)) saturate(var(--backdrop-saturate, 1)) sepia(var(--backdrop-sepia, 0));"
};

const configOptions = {
  theme,
  vars
};

/**
 * TailwindCache singleton for managing generated Tailwind CSS
 * Replaces global state with proper encapsulation
 */
class TailwindCache {
  constructor() {
    this.twString = null;
    this.cssObject = null;
    this.initialized = false;
  }

  /**
   * Get or generate the CSS object
   * @param {Function} generateFn - Function to generate CSS string
   * @param {Function} convertFn - Function to convert CSS string to object
   * @returns {Object} CSS object lookup
   */
  getOrGenerate(generateFn, convertFn) {
    if (!this.initialized) {
      this.twString = generateFn().replace(/\s\s+/g, " ");
      this.cssObject = convertFn(this.twString);
      this.initialized = true;
    }
    return this.cssObject;
  }

  /**
   * Get the CSS string
   */
  getCssString() {
    return this.twString;
  }

  /**
   * Get the CSS object
   */
  getCssObject() {
    return this.cssObject;
  }

  /**
   * Check if cache is initialized
   */
  isInitialized() {
    return this.initialized;
  }

  /**
   * Reset the cache (useful for testing)
   */
  reset() {
    this.twString = null;
    this.cssObject = null;
    this.initialized = false;
  }
}

// Singleton instance
let instance = null;

/**
 * Get the TailwindCache singleton instance
 * @returns {TailwindCache} The cache instance
 */
function getTailwindCache() {
  if (!instance) {
    instance = new TailwindCache();
  }
  return instance;
}

/**
 * Logger class with configurable log levels
 * Prevents console spam in production
 */
class Logger {
  constructor() {
    let level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "warn";
    this.level = level;
    this.levels = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
      silent: 4
    };
  }

  /**
   * Set the log level
   * @param {string} level - One of 'debug', 'info', 'warn', 'error', 'silent'
   */
  setLevel(level) {
    if (this.levels[level] !== undefined) {
      this.level = level;
    }
  }

  /**
   * Get current log level
   */
  getLevel() {
    return this.level;
  }

  /**
   * Check if a message should be logged
   */
  shouldLog(level) {
    return this.levels[level] >= this.levels[this.level];
  }

  /**
   * Log debug message
   */
  debug(message) {
    if (this.shouldLog("debug")) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      console.debug(`[twsx:debug] ${message}`, ...args);
    }
  }

  /**
   * Log info message
   */
  info(message) {
    if (this.shouldLog("info")) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      console.info(`[twsx:info] ${message}`, ...args);
    }
  }

  /**
   * Log warning message
   */
  warn(message) {
    if (this.shouldLog("warn")) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      console.warn(`[twsx:warn] ${message}`, ...args);
    }
  }

  /**
   * Log error message
   */
  error(message) {
    if (this.shouldLog("error")) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }
      console.error(`[twsx:error] ${message}`, ...args);
    }
  }
}

// Create singleton instance with silent defaults
// Can be enabled via TWSX_LOG_LEVEL environment variable
let logLevel = "silent";
try {
  if (typeof process !== "undefined" && process && process.env) {
    // Allow explicit log level override via environment variable
    // e.g., TWSX_LOG_LEVEL=debug or TWSX_LOG_LEVEL=warn
    logLevel = process.env.TWSX_LOG_LEVEL || "silent";
  }
} catch {
  // Silently fail - in browser environment, default to silent
  logLevel = "silent";
}
const logger = new Logger(logLevel);

/**
 * User Configuration Management
 * Handles theme extensions and custom plugin registration
 */


/**
 * User configuration state
 */
let userConfig = {
  theme: {
    extend: {}
  },
  plugins: [],
  corePlugins: {},
  prefix: "",
  styled: {
    prefix: "twsx",
    // Global prefix for styled components
    separator: "-",
    // Separator between prefix and component
    hashLength: 6,
    // Length of generated hash
    includeComponentName: true // Include component type in classname
  }
};

// Cache for extended theme to avoid redundant lookups
const extendedThemeCache = new Map();

/**
 * Get current user configuration
 * @returns {Object} Current configuration
 */
function getConfig() {
  return {
    ...userConfig
  };
}

/**
 * Get extended theme value
 * @param {string} key - Theme key (e.g., 'colors', 'spacing')
 * @returns {Object} Extended theme values
 */
function getExtendedTheme(key) {
  // Check cache first
  if (extendedThemeCache.has(key)) {
    return extendedThemeCache.get(key);
  }
  const result = userConfig.theme.extend[key] || {};

  // Cache the result
  extendedThemeCache.set(key, result);
  return result;
}

/**
 * Get all registered plugins
 * @returns {Array} Array of plugins
 */
function getPlugins() {
  return userConfig.plugins;
}

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === "[object Function]";
}
function getConfigOptions() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    theme = {}
  } = options;
  const {
    extend: themeExtend = {}
  } = theme;
  const newTheme = {};
  const themeKeys = Object.keys(configOptions.theme);
  themeKeys.forEach(key => {
    newTheme[key] = theme[key] || configOptions.theme[key];
    if (isFunction(newTheme[key])) {
      newTheme[key] = newTheme[key]({
        theme: keyRef => {
          return configOptions.theme[keyRef];
        }
      });
    }
  });
  themeKeys.forEach(key => {
    if (isFunction(newTheme[key])) {
      newTheme[key] = newTheme[key]({
        theme: keyRef => {
          return newTheme[keyRef];
        }
      });
    }
    if (themeExtend[key]) {
      newTheme[key] = Object.assign({}, newTheme[key], themeExtend[key]);
    }
  });
  themeKeys.forEach(key => {
    const extended = getExtendedTheme(key);
    if (extended && Object.keys(extended).length > 0) {
      newTheme[key] = Object.assign({}, newTheme[key], extended);
    }
  });

  // Re-resolve theme functions after all extensions are applied
  // This ensures that theme functions like backgroundColor: ({ theme }) => theme("colors")
  // get the updated colors including custom theme extensions
  themeKeys.forEach(key => {
    if (isFunction(configOptions.theme[key])) {
      newTheme[key] = configOptions.theme[key]({
        theme: keyRef => {
          return newTheme[keyRef];
        }
      });
    }
  });
  const finalPrefix = options.prefix || "";
  return {
    prefix: finalPrefix,
    ...configOptions,
    ...options,
    theme: newTheme
  };
}
function generateCssString$1() {
  let getCssString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : () => {};
  const orientationPrefix = "";
  const hexToRgb = hex => {
    const rgba = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function () {
      return "#" + (arguments.length <= 1 ? undefined : arguments[1]) + (arguments.length <= 1 ? undefined : arguments[1]) + (arguments.length <= 2 ? undefined : arguments[2]) + (arguments.length <= 2 ? undefined : arguments[2]) + (arguments.length <= 3 ? undefined : arguments[3]) + (arguments.length <= 3 ? undefined : arguments[3]);
    }).substring(1).match(/.{2}/g).map(x => parseInt(x, 16)).join(",");
    if (rgba.indexOf("NaN") >= 0) return "";
    return rgba;
  };
  const getCssByOptions = function () {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let getStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
    let nOptions = Object.assign({}, options);
    if (Array.isArray(options)) {
      nOptions = options.reduce((currentObj, value) => Object.assign({}, currentObj, {
        [value]: value
      }), {});
    }
    let str = "";
    Object.entries(nOptions).forEach(_ref => {
      let [key, value] = _ref;
      str += getStr(key.replace("/", "\\/").replace(".", "\\."), value);
    });
    return str;
  };
  const getCssByColors = function (colors) {
    let getStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => {};
    let str = "";
    Object.entries(colors).forEach(_ref2 => {
      let [key1, value1] = _ref2;
      if (typeof value1 === "string") {
        str += `${getStr(key1, value1, hexToRgb(value1))} `;
      } else if (typeof value1 === "object") {
        Object.entries(value1).forEach(_ref3 => {
          let [key2, value2] = _ref3;
          str += `${getStr(`${key1}-${key2}`, value2, hexToRgb(value2))} `;
        });
      }
    });
    return str;
  };
  const isValidCssColor = value => {
    if (typeof value !== "string") return false;
    const hexColor = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    const rgbColor = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
    const rgbaColor = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0?\.\d+)\s*\)$/;
    const hslColor = /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/;
    const hslaColor = /^hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*(0|1|0?\.\d+)\s*\)$/;
    return [hexColor.test(value), rgbColor.test(value), rgbaColor.test(value), hslColor.test(value), hslaColor.test(value)].includes(true);
  };
  const cssString = getCssString({
    orientationPrefix,
    getCssByOptions,
    getCssByColors,
    isValidCssColor
  });
  return cssString;
}

function generator$2N() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}accent`;
  const {
    accentColor,
    opacity = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByColors,
      getCssByOptions
    } = _ref;
    let cssString = getCssByColors(accentColor, (key, value, rgbValue) => {
      if (value === "custom_value") {
        return `
            ${prefix}-${key} {
              accent-color: ${value};
            }
          `;
      }
      let rgbPropertyValue = "";
      if (rgbValue) {
        rgbPropertyValue = `accent-color: rgba(${rgbValue}, var(--accent-opacity));`;
      }
      return `
            ${prefix}-${key} {
              --accent-opacity: 1;
              accent-color: ${value};
              ${rgbPropertyValue}
            }
          `;
    });
    cssString += getCssByOptions(opacity, (key, value) => {
      // Skip 'custom' to avoid overwriting accent-custom from colors
      if (key === "custom") return "";
      return `
            ${prefix}-${key} {
              --accent-opacity: ${value};
            }
          `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2M() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const responsiveCssString = generateCssString$1(() => {
    return `
        ${prefix}sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        ${prefix}not-sr-only {
          position: static;
          width: auto;
          height: auto;
          padding: 0;
          margin: 0;
          overflow: visible;
          clip: auto;
          white-space: normal;
        }
        ${prefix}forced-color-adjust-auto {
          forced-color-adjust: auto;
        }
        ${prefix}forced-color-adjust-none {
          forced-color-adjust: none;
        }
      `;
  }, configOptions);
  return responsiveCssString;
}

function generator$2L() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}content`;
  const propertyOptions = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            align-content: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2K() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}items`;
  const propertyOptions = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    baseline: "baseline",
    stretch: "stretch"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            align-items: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2J() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}self`;
  const propertyOptions = {
    auto: "auto",
    start: "flex-start",
    end: "flex-end",
    center: "center",
    stretch: "stretch"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            align-self: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

/**
 * Inline Animation System
 * Generate animation properties directly without keyframes
 */

/* eslint-disable no-undef */

/**
 * Convert animation config to inline transition properties
 */
function animationToTransition(animationConfig) {
  const {
    property = "all",
    duration = 300,
    easing = "ease-out",
    delay = 0
  } = animationConfig;
  return {
    transitionProperty: property,
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: easing,
    transitionDelay: `${delay}ms`
  };
}

/**
 * Built-in animation configs that work with transitions
 */
const INLINE_ANIMATIONS = {
  "fade-in": {
    initial: {
      opacity: 0
    },
    final: {
      opacity: 1
    },
    transition: {
      duration: 500,
      easing: "ease-out"
    }
  },
  "slide-up": {
    initial: {
      transform: "translateY(20px)",
      opacity: 0
    },
    final: {
      transform: "translateY(0)",
      opacity: 1
    },
    transition: {
      duration: 500,
      easing: "ease-out"
    }
  },
  "slide-down": {
    initial: {
      transform: "translateY(-20px)",
      opacity: 0
    },
    final: {
      transform: "translateY(0)",
      opacity: 1
    },
    transition: {
      duration: 500,
      easing: "ease-out"
    }
  },
  "zoom-in": {
    initial: {
      transform: "scale(0.8)",
      opacity: 0
    },
    final: {
      transform: "scale(1)",
      opacity: 1
    },
    transition: {
      duration: 400,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)"
    }
  },
  "zoom-out": {
    initial: {
      transform: "scale(1.2)",
      opacity: 0
    },
    final: {
      transform: "scale(1)",
      opacity: 1
    },
    transition: {
      duration: 400,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)"
    }
  }
};

/**
 * Animation Generator
 * Generates animation utility classes with dynamic inline animations
 */

function generator$2I() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}animate`;
  const {
    animation = {},
    keyframes = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    // Generate keyframes first
    let keyframesCSS = "";
    for (const [name, keyframe] of Object.entries(keyframes)) {
      keyframesCSS += `@keyframes ${name} {\n`;
      for (const [percentage, styles] of Object.entries(keyframe)) {
        keyframesCSS += `  ${percentage} {\n`;
        for (const [prop, value] of Object.entries(styles)) {
          const cssProp = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
          keyframesCSS += `    ${cssProp}: ${value};\n`;
        }
        keyframesCSS += "  }\n";
      }
      keyframesCSS += "}\n";
    }

    // Merge theme animations with inline animations (but skip inline if keyframes exist)
    const allAnimations = {
      ...animation,
      // Add inline animations to the mix, but skip if keyframes version exists
      ...Object.keys(INLINE_ANIMATIONS).reduce((acc, key) => {
        // Check if keyframes version exists (both camelCase and kebab-case)
        const camelCaseKey = key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
        const hasKeyframes = keyframes[key] || keyframes[camelCaseKey];
        if (!hasKeyframes) {
          acc[key] = `inline-${key}`; // Special marker for inline animations
        }
        return acc;
      }, {})
    };
    const cssString = getCssByOptions(allAnimations, (key, value) => {
      // Check if this is an inline animation
      if (value.startsWith("inline-")) {
        const animationKey = value.replace("inline-", "");
        const inlineAnimation = INLINE_ANIMATIONS[animationKey];
        if (inlineAnimation) {
          // Generate CSS for inline animation (initial state + transition)
          const transitionProps = animationToTransition(inlineAnimation.transition);
          const initialProps = inlineAnimation.initial;
          let css = `${prefix}-${key} {\n`;

          // Add initial state properties
          for (const [prop, val] of Object.entries(initialProps)) {
            const cssProp = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
            css += `  ${cssProp}: ${val};\n`;
          }

          // Add transition properties
          for (const [prop, val] of Object.entries(transitionProps)) {
            const cssProp = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
            css += `  ${cssProp}: ${val};\n`;
          }
          css += "}\n";

          // Add hover/active state for final animation
          css += `${prefix}-${key}:hover, ${prefix}-${key}.animate-active {\n`;
          for (const [prop, val] of Object.entries(inlineAnimation.final)) {
            const cssProp = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
            css += `  ${cssProp}: ${val};\n`;
          }
          css += "}\n";
          return css;
        }
      }

      // Fallback to traditional animation property
      return `
          ${prefix}-${key} {
            animation: ${value};
          }
        `;
    });

    // Combine keyframes and animation classes
    return keyframesCSS + cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2H() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const propertyOptions = ["auto", "none"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}appearance-${key} {
            appearance: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2G() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}aspect`;
  const {
    spacing = {},
    aspectRatio = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    // Generate aspect-ratio utilities (aspect-auto, aspect-square, aspect-video, etc.)
    let cssString = getCssByOptions(aspectRatio, (key, value) => {
      if (value === "custom_value") {
        return `
            ${prefix}-${key} {
              aspect-ratio: ${value};
            }
          `;
      }
      return `
          ${prefix}-${key} {
            aspect-ratio: ${value};
          }
        `;
    });

    // Generate legacy aspect-h and aspect-w utilities
    cssString += getCssByOptions(spacing, key => `
          ${prefix}-h-${key} {
            --aspect-h: ${key};
          }
          ${prefix}-w-${key} {
            position: relative;
            padding-bottom: calc(var(--aspect-h) / var(--aspect-w) * 100%);
            --aspect-w: ${key};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2F() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}bg`;
  const propertyOptions = ["fixed", "local", "scroll"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            background-attachment: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2E() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}bg-clip`;
  const propertyOptions = {
    border: "border-box",
    padding: "padding-box",
    content: "content-box",
    text: "text"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            -webkit-background-clip: ${value};
            background-clip: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2D() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}bg`;
  const {
    backgroundColor = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByColors,
      isValidCssColor
    } = _ref;
    const cssString = getCssByColors(backgroundColor, (key, value, rgbValue) => {
      let rgbPropertyValue = "";
      if (rgbValue) {
        rgbPropertyValue = `background-color: rgba(${rgbValue}, var(--bg-opacity));`;
      }
      if (value === "custom_value") {
        return `
              ${prefix}-${key} {
                ${isValidCssColor(value) ? "background-color" : "background"}: ${value};
              }
            `;
      }
      return `
            ${prefix}-${key} {
              --bg-opacity: 1;
              background-color: ${value};
              ${rgbPropertyValue}
            }
          `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2C() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}bg`;
  const customPrefix = `${globalPrefix}bg-image`;
  const {
    backgroundImage = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(backgroundImage, (key, value) => {
      if (value === "custom_value") {
        return `
            ${customPrefix}-${key} {
              background-image: ${value};
            }
          `;
      }
      return `
          ${prefix}-${key} {
            background-image: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2B() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}bg-opacity`;
  const {
    backgroundOpacity = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(backgroundOpacity, (key, value) => `
          ${prefix}-${key} {
            --bg-opacity: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2A() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}bg-origin`;
  const propertyOptions = {
    border: "border-box",
    padding: "padding-box",
    content: "content-box"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            -webkit-background-origin: ${value};
            background-origin: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2z() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}bg`;
  const customPrefix = `${globalPrefix}bg-position`;
  const {
    backgroundPosition = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(backgroundPosition, (key, value) => {
      if (value === "custom_value") {
        return `
            ${customPrefix}-${key} {
              background-position: ${value};
            }
          `;
      }
      return `
          ${prefix}-${key} {
            background-position: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2y() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}bg`;
  const propertyOptions = {
    repeat: "repeat",
    "no-repeat": "no-repeat",
    "repeat-x": "repeat-x",
    "repeat-y": "repeat-y",
    "repeat-round": "round",
    "repeat-space": "space"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            background-repeat: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2x() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}bg`;
  const customPrefix = `${globalPrefix}bg-size`;
  const {
    backgroundSize = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(backgroundSize, (key, value) => {
      if (value === "custom_value") {
        return `
            ${customPrefix}-${key} {
              background-size: ${value};
            }
          `;
      }
      return `
          ${prefix}-${key} {
            background-size: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2w() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const prefix = `${globalPrefix}backdrop-blur`;
  const {
    backdropBlur = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(backdropBlur, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
        ${prefix}${key} {
          --tw-backdrop-blur: blur(${value});
          ${vars.backdropFilter}
        }
      `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2v() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const prefix = `${globalPrefix}backdrop-brightness`;
  const {
    backdropBrightness = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(backdropBrightness, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
        ${prefix}${key} {
          --tw-backdrop-brightness: brightness(${value});
          ${vars.backdropFilter}
        }
      `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2u() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const prefix = `${globalPrefix}backdrop-contrast`;
  const {
    backdropContrast = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(backdropContrast, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
        ${prefix}${key} {
          --tw-backdrop-contrast: contrast(${value});
          ${vars.backdropFilter}
        }
      `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2t() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix,
    vars = {}
  } = configOptions;
  const responsiveCssString = generateCssString$1(() => {
    const cssString = `
      ${prefix}backdrop-filter {
        ${vars.backdropFilter}
      }
      ${prefix}backdrop-filter-none {
        backdrop-filter: none;
      }
    `;
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2s() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const prefix = `${globalPrefix}backdrop-grayscale`;
  const {
    backdropGrayscale = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(backdropGrayscale, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
        ${prefix}${key} {
          --tw-backdrop-grayscale: grayscale(${value});
          ${vars.backdropFilter}
        }
      `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2r() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const prefix = `${globalPrefix}backdrop-hue-rotate`;
  const {
    backdropHueRotate = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(backdropHueRotate, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
        ${prefix}${key} {
          --tw-backdrop-hue-rotate: hue-rotate(${value});
          ${vars.backdropFilter}
        }
      `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2q() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const prefix = `${globalPrefix}backdrop-invert`;
  const {
    backdropInvert = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(backdropInvert, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
        ${prefix}${key} {
          --tw-backdrop-invert: invert(${value});
          ${vars.backdropFilter}
        }
      `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2p() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const prefix = `${globalPrefix}backdrop-opacity`;
  const {
    backdropOpacity = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(backdropOpacity, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
        ${prefix}${key} {
          --tw-backdrop-opacity: opacity(${value});
          ${vars.backdropFilter}
        }
      `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2o() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const prefix = `${globalPrefix}backdrop-saturate`;
  const {
    backdropSaturate = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(backdropSaturate, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
        ${prefix}${key} {
          --tw-backdrop-saturate: saturate(${value});
          ${vars.backdropFilter}
        }
      `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2n() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const prefix = `${globalPrefix}backdrop-sepia`;
  const {
    backdropSepia = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(backdropSepia, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
        ${prefix}${key} {
          --tw-backdrop-sepia: sepia(${value});
          ${vars.backdropFilter}
        }
      `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2m() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const prefix = `${globalPrefix}blur`;
  const basePrefix = prefix.replace(globalPrefix, "");
  const {
    blur = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(blur, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --blur: ${value};
            ${vars.filter}
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}${key} {
            --backdrop-blur: ${value};
            ${vars.backdropFilter}
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2l() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}border`;
  const propertyOptions = ["collapse", "separate"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            border-collapse: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2k() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}border`;
  const customPrefix = `${globalPrefix}border-color`;
  const {
    borderColor = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByColors
    } = _ref;
    const cssString = getCssByColors(borderColor, (keyTmp, value, rgbValue) => {
      if (keyTmp.toLowerCase() === "default") {
        return "";
      }
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      let rgbPropertyValue = "";
      if (rgbValue) {
        rgbPropertyValue = `border-color: rgba(${rgbValue}, var(--border-opacity));`;
      }
      if (value === "custom_value") {
        return `
          ${customPrefix}${key} {
            border-color: ${value};
          }
          ${prefix}${key} {
            border-color: ${value};
          }
        `;
      }
      return `
        ${prefix}${key} {
          --border-opacity: 1;
          border-color: ${value};
          ${rgbPropertyValue}
        }
        ${prefix}-x${key} {
          --border-opacity: 1;
          border-left-color: ${value};
          ${rgbPropertyValue}
          border-right-color: ${value};
          ${rgbPropertyValue}
        }
        ${prefix}-y${key} {
          --border-opacity: 1;
          border-top-color: ${value};
          ${rgbPropertyValue}
          border-bottom-color: ${value};
          ${rgbPropertyValue}
        }
        ${prefix}-s${key} {
          --border-opacity: 1;
          border-inline-start-color: ${value};
          ${rgbPropertyValue}
        }
        ${prefix}-e${key} {
          --border-opacity: 1;
          border-inline-end-color: ${value};
          ${rgbPropertyValue}
        }
        ${prefix}-t${key} {
          --border-opacity: 1;
          border-top-color: ${value};
          ${rgbPropertyValue}
        }
        ${prefix}-r${key} {
          --border-opacity: 1;
          border-right-color: ${value};
          ${rgbPropertyValue}
        }
        ${prefix}-b${key} {
          --border-opacity: 1;
          border-bottom-color: ${value};
          ${rgbPropertyValue}
        }
        ${prefix}-l${key} {
          --border-opacity: 1;
          border-left-color: ${value};
          ${rgbPropertyValue}
        }
      `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2j() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}border-opacity`;
  const {
    borderOpacity = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(borderOpacity, (key, value) => `
          ${prefix}-${key} {
            --border-opacity: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2i() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}rounded`;
  const {
    borderRadius = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(borderRadius, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            border-radius: ${value};
          }
          ${prefix}-s${key} {
            border-start-start-radius: ${value};
            border-end-start-radius: ${value};
          }
          ${prefix}-e${key} {
            border-start-end-radius: ${value};
            border-end-end-radius: ${value};
          }
          ${prefix}-t${key} {
            border-top-left-radius: ${value};
            border-top-right-radius: ${value};
          }
          ${prefix}-r${key} {
            border-top-right-radius: ${value};
            border-bottom-right-radius: ${value};
          }
          ${prefix}-b${key} {
            border-bottom-right-radius: ${value};
            border-bottom-left-radius: ${value};
          }
          ${prefix}-l${key} {
            border-top-left-radius: ${value};
            border-bottom-left-radius: ${value};
          }
          ${prefix}-ss${key} {
            border-start-start-radius: ${value};
          }
          ${prefix}-se${key} {
            border-start-end-radius: ${value};
          }
          ${prefix}-ee${key} {
            border-end-end-radius: ${value};
          }
          ${prefix}-es${key} {
            border-end-start-radius: ${value};
          }
          ${prefix}-tl${key} {
            border-top-left-radius: ${value};
          }
          ${prefix}-tr${key} {
            border-top-right-radius: ${value};
          }
          ${prefix}-br${key} {
            border-bottom-right-radius: ${value};
          }
          ${prefix}-bl${key} {
            border-bottom-left-radius: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2h() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}border-spacing`;
  const {
    borderSpacing = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(borderSpacing, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            border-spacing: ${value};
          }
          ${prefix}-x${key} {
            --border-spacing-x: ${value};
            border-spacing: var(--border-spacing-x) var(--border-spacing-y, 0);
          }
          ${prefix}-y${key} {
            --border-spacing-y: ${value};
            border-spacing: var(--border-spacing-x, 0) var(--border-spacing-y);
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2g() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}border`;
  const propertyOptions = ["solid", "dashed", "dotted", "double", "none"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            border-style: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2f() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}border`;
  const customPrefix = `${globalPrefix}border-width`;
  const {
    borderWidth = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(borderWidth, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      if (value === "custom_value") {
        return `
          ${customPrefix}-${key} {
            border-width: ${value};
          }
        `;
      }
      return `
        ${prefix}${key} {
          border-style: solid;
          border-top-width: ${value};
          border-bottom-width: ${value};
          border-left-width: ${value};
          border-right-width: ${value};
        }
        ${prefix}-x${key} {
          border-left-width: ${value};
          border-right-width: ${value};
        }
        ${prefix}-y${key} {
          border-top-width: ${value};
          border-bottom-width: ${value};
        }
        ${prefix}-s${key} {
          border-inline-start-width: ${value};
        }
        ${prefix}-e${key} {
          border-inline-end-width: ${value};
        }
        ${prefix}-t${key} {
          border-top-width: ${value};
        }
        ${prefix}-r${key} {
          border-right-width: ${value};
        }
        ${prefix}-b${key} {
          border-bottom-width: ${value};
        }
        ${prefix}-l${key} {
          border-left-width: ${value};
        }
      `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2e() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}box-decoration`;
  const propertyOptions = ["slice", "clone"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            box-decoration-break: ${value};
            -webkit-box-decoration-break: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2d() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}shadow`;
  const customPrefix = `${globalPrefix}box-shadow`;
  const {
    boxShadowColor,
    boxShadow = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions,
      getCssByColors
    } = _ref;
    let cssString = getCssByOptions(boxShadow, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      const valueSplit = value.split(" ");
      if (value === "custom_value") {
        return `
            ${customPrefix}${key} {
              box-shadow: ${value};
            }
          `;
      }
      return `
          ${prefix}${key} {
            --shadow: ${value};
            --shadow-colored: ${valueSplit.slice(0, 4).join(" ")} var(--shadow-color);
            box-shadow: var(--ring-offset-shadow, 0 0 #0000),var(--ring-shadow, 0 0 #0000),var(--shadow);
          }
        `;
    });
    cssString += getCssByColors(boxShadowColor, function () {
      const key = arguments.length <= 0 ? undefined : arguments[0];
      const rgbValue = arguments.length <= 2 ? undefined : arguments[2];
      let str = "";
      if (rgbValue) {
        str += `
            ${prefix}-${key} {
              --shadow-color: rgba(${rgbValue}, 0.5) !important;
              --shadow: var(--shadow-colored);
            }
          `;
      }
      return str;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2c() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}box`;
  const propertyOptions = {
    border: "border-box",
    content: "content-box"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            box-sizing: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2b() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const propertyOptions = ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
        ${prefix}break-after-${key} {
          break-after: ${value};
        }
      `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2a() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const propertyOptions = ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
        ${prefix}break-before-${key} {
          break-before: ${value};
        }
      `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$29() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const propertyOptions = ["auto", "avoid", "avoid-page", "avoid-column"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
        ${prefix}break-inside-${key} {
          break-inside: ${value};
        }
      `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$28() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const prefix = `${globalPrefix}brightness`;
  const basePrefix = prefix.replace(globalPrefix, "");
  const {
    brightness = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(brightness, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --brightness: ${value};
            ${vars.filter}
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}${key} {
            --backdrop-brightness: ${value};
            ${vars.backdropFilter}
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$27() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}caption`;
  const propertyOptions = ["top", "bottom"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            caption-side: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$26() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}caret`;
  const {
    caretColor,
    opacity = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByColors,
      getCssByOptions
    } = _ref;
    let cssString = getCssByColors(caretColor, (key, value, rgbValue) => {
      if (value === "custom_value") {
        return `
            ${prefix}-${key} {
              caret-color: ${value};
            }
          `;
      }
      let rgbPropertyValue = "";
      if (rgbValue) {
        rgbPropertyValue = `caret-color: rgba(${rgbValue}, var(--caret-opacity));`;
      }
      return `
            ${prefix}-${key} {
              --caret-opacity: 1;
              caret-color: ${value};
              ${rgbPropertyValue}
            }
          `;
    });
    cssString += getCssByOptions(opacity, (key, value) => {
      // Skip 'custom' to avoid overwriting caret-custom from colors
      if (key === "custom") return "";
      return `
            ${prefix}-${key} {
              --caret-opacity: ${value};
            }
          `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$25() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}clear`;
  const propertyOptions = ["left", "right", "both", "none"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            clear: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$24() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix,
    theme = {}
  } = configOptions;
  const {
    columns = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(columns, (key, value) => `
        ${prefix}columns-${key} {
          columns: ${value};
        }
      `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$23() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const responsiveCssString = generateCssString$1(() => {
    const cssString = `
      ${prefix}container {
        width: 100%;
      }
    `;
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$22() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}content`;
  const {
    content = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(content, (key, value) => `
          ${prefix}-${key} {
            content: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$21() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const prefix = `${globalPrefix}contrast`;
  const basePrefix = prefix.replace(globalPrefix, "");
  const {
    contrast = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(contrast, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --contrast: ${value};
            ${vars.filter}
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}${key} {
            --backdrop-contrast: ${value};
            ${vars.backdropFilter}
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$20() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}cursor`;
  const propertyOptions = ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            cursor: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1$() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const propertyOptions = ["block", "inline-block", "inline", "flex", "inline-flex", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-header-group", "table-footer-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "none"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${key === "none" ? `${prefix}hidden` : `${prefix}${key}`} {
            display: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1_() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}divide`;
  const {
    divideColor = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByColors
    } = _ref;
    const cssString = getCssByColors(divideColor, (key, value, rgbValue) => {
      let rgbPropertyValue = "";
      if (rgbValue) {
        rgbPropertyValue = `border-color: rgba(${rgbValue}, var(--divide-opacity));`;
      }
      return `
            ${prefix}-${key} {
              --divide-opacity: 1;
              border-color: ${value};${rgbPropertyValue}
            }
          `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1Z() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}divide-opacity`;
  const {
    divideOpacity = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(divideOpacity, (key, value) => `
          ${prefix}-${key} {
            --divide-opacity: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1Y() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}divide`;
  const propertyOptions = ["solid", "dashed", "dotted", "double", "none"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            border-style: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1X() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}divide`;
  const {
    divideWidth = {}
  } = theme;
  const responsiveCssString = generateCssString$1(() => {
    const generateDivideWidth = (position, keyTmp, value) => {
      let dividePosition = "x";
      let borderPosition1 = "left";
      let borderPosition2 = "right";
      if (position === "y") {
        dividePosition = "y";
        borderPosition1 = "top";
        borderPosition2 = "bottom";
      }
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}-${dividePosition}${key} {
            --divide-${dividePosition}-reverse: 0;
            border-${borderPosition1}-width: calc(${value} * calc(1 - var(--divide-${dividePosition}-reverse)));
            border-${borderPosition2}-width: calc(${value} * var(--divide-${dividePosition}-reverse));
          }
        `;
    };
    let cssString = "";
    Object.entries(divideWidth).forEach(_ref => {
      let [key, value] = _ref;
      cssString += generateDivideWidth("y", key, value);
      cssString += generateDivideWidth("x", key, value);
    });
    cssString += `
        ${prefix}-y-reverse$ {
          --divide-y-reverse: 1;
        }
        ${prefix}-x-reverse {
          --divide-x-reverse: 1;
        }
      `;
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1W() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}drop-shadow`;
  const {
    dropShadow = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(dropShadow, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      const values = value.split(",").map(o => `drop-shadow(${o.trim()})`);
      return `
          ${prefix}${key} {
            --drop-shadow:  ${values.join(" ")} !important;
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1V() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}fill`;
  const {
    fill = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByColors
    } = _ref;
    const cssString = getCssByColors(fill, (key, value) => {
      return `
            ${prefix}-${key} {
              fill: ${value};
            }
          `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1U(_ref) {
  let {
    prefix
  } = _ref;
  return `
  ${prefix}filter-none {
    filter: none !important;
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
  }
`;
}

function generator$1T() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}flex`;
  const {
    flex = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(flex, (key, value) => `
          ${prefix}-${key} {
            flex: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1S() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}basis`;
  const {
    flexBasis = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(flexBasis, (key, value) => `
          ${prefix}-${key} {
            flex-basis: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1R() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}flex`;
  const propertyOptions = {
    row: "row",
    "row-reverse": "row-reverse",
    col: "column",
    "col-reverse": "column-reverse"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            flex-direction: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1Q() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}grow`;
  const {
    flexGrow = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(flexGrow, (key, value) => `
          ${key.toLowerCase() === "default" ? prefix : `${prefix}-${key}`} {
            flex-grow: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1P() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}shrink`;
  const {
    flexShrink = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(flexShrink, (key, value) => `
          ${key.toLowerCase() === "default" ? prefix : `${prefix}-${key}`} {
            flex-shrink: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1O() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}flex`;
  const propertyOptions = {
    wrap: "wrap",
    "wrap-reverse": "wrap-reverse",
    "no-wrap": "nowrap",
    nowrap: "nowrap"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            flex-wrap: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1N() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}float`;
  const propertyOptions = ["left", "right", "none"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            float: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1M() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}font`;
  const {
    fontFamily = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(fontFamily, (key, value) => {
      return `
          ${prefix}-${key} {
            font-family: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1L() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}text`;
  const customPrefix = `${globalPrefix}text-size`;
  const {
    fontSize = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(fontSize, (key, value) => {
      if (value === "custom_value") {
        return `
            ${customPrefix}${key} {
              font-size: ${value};
            }
          `;
      }
      return `
          ${prefix}-${key} {
            font-size: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1K() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const responsiveCssString = generateCssString$1(() => {
    return `
        ${prefix} {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        ${prefix}subpixel-antialiased {
          -webkit-font-smoothing: auto;
          -moz-osx-font-smoothing: auto;
        }
      `;
  }, configOptions);
  return responsiveCssString;
}

function generator$1J() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const propertyOptions = {
    italic: "italic",
    "not-italic": "normal"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}${key} {
            font-style: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1I() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const propertyOptions = {
    "normal-nums": "normal",
    ordinal: "ordinal",
    "slashed-zero": "slashed-zero",
    "lining-nums": "lining-nums",
    "oldstyle-nums": "oldstyle-nums",
    "proportional-nums": "proportional-nums",
    "tabular-nums": "tabular-nums",
    "diagonal-fractions": "diagonal-fractions",
    "stacked-fractions": "stacked-fractions"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            font-variant-numeric: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1H() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}font`;
  const customPrefix = `${globalPrefix}font-weight`;
  const {
    fontWeight = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(fontWeight, (key, value) => {
      if (value === "custom_value") {
        return `
            ${customPrefix}${key} {
              font-weight: ${value};
            }
          `;
      }
      return `
          ${prefix}-${key} {
            font-weight: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1G() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}gap`;
  const {
    gap = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(gap, (key, value) => `
          ${prefix}-${key} {
            gap: ${value};
          }
          ${prefix}-x-${key} {
            column-gap: ${value};
          }
          ${prefix}-y-${key} {
            row-gap: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1F() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix,
    theme = {}
  } = configOptions;
  const {
    gradientColorStops = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByColors
    } = _ref;
    const cssString = getCssByColors(gradientColorStops, (key, value, rgbValue) => {
      let rgbFromPropertyValue = "--gradient-color-stops: var(--gradient-from-color),var(--gradient-to-color,rgba(255,255,255,0));";
      let rgbViaPropertyValue = "--gradient-color-stops: var(--gradient-from-color),var(--gradient-via-color),var(--gradient-to-color,rgba(255,255,255,0));";
      let rgbToPropertyValue = "--gradient-color-stops: var(--gradient-from-color),var(--gradient-to-color,rgba(255,255,255,0));";
      if (rgbValue) {
        rgbFromPropertyValue = `--gradient-color-stops: var(--gradient-from-color),var(--gradient-to-color,rgba(${rgbValue},0));`;
        rgbViaPropertyValue = `--gradient-color-stops: var(--gradient-from-color),var(--gradient-via-color),var(--gradient-to-color,rgba(${rgbValue},0));`;
        rgbToPropertyValue = `--gradient-color-stops: var(--gradient-from-color),var(--gradient-to-color,rgba(${rgbValue},0));`;
      }
      return `
            ${prefix}from-${key} {
              --gradient-from-color: ${value};${rgbFromPropertyValue}
            }
            ${prefix}via-${key} {
              --gradient-via-color: ${value};${rgbViaPropertyValue}
            }
            ${prefix}to-${key} {
              --gradient-to-color: ${value};${rgbToPropertyValue}
            }
          `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1E() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const prefix = `${globalPrefix}grayscale`;
  const basePrefix = prefix.replace(globalPrefix, "");
  const {
    grayscale = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(grayscale, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --grayscale: ${value};
            ${vars.filter}
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}${key} {
            --backdrop-grayscale: ${value};
            ${vars.backdropFilter}
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1D() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}auto-cols`;
  const {
    gridAutoColumns = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(gridAutoColumns, (key, value) => `
          ${prefix}-${key} {
            grid-auto-columns: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1C() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}grid-flow`;
  const propertyOptions = {
    row: "row",
    col: "column",
    "row-dense": "row dense",
    "col-dense": "column dense"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            grid-auto-flow: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1B() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}auto-rows`;
  const {
    gridAutoRows = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(gridAutoRows, (key, value) => `
          ${prefix}-${key} {
            grid-auto-rows: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1A() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}col`;
  const {
    gridColumn = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(gridColumn, (key, value) => `
          ${prefix}-${key} {
            grid-column: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1z() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}col-end`;
  const {
    gridColumnEnd = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(gridColumnEnd, (key, value) => `
          ${prefix}-${key} {
            grid-column-end: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1y() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}col-start`;
  const {
    gridColumnStart = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(gridColumnStart, (key, value) => `
          ${prefix}-${key} {
            grid-column-start: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1x() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}row`;
  const {
    gridRow = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(gridRow, (key, value) => `
          ${prefix}-${key} {
            grid-row: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1w() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}row-end`;
  const {
    gridRowEnd = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(gridRowEnd, (key, value) => `
          ${prefix}-${key} {
            grid-row-end: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1v() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}row-start`;
  const {
    gridRowStart = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(gridRowStart, (key, value) => `
          ${prefix}-${key} {
            grid-row-start: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1u() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}grid-cols`;
  const {
    gridTemplateColumns = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(gridTemplateColumns, (key, value) => `
          ${prefix}-${key} {
            grid-template-columns: ${isNaN(value) ? value : `repeat(${value}, minmax(0, 1fr))`};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1t() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}grid-rows`;
  const {
    gridTemplateRows = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(gridTemplateRows, (key, value) => `
          ${prefix}-${key} {
            grid-template-rows: ${isNaN(value) ? value : `repeat(${value}, minmax(0, 1fr));`};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1s() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}h`;
  const {
    height = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(height, (key, value) => `
          ${prefix}-${key} {
            height: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1r() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const {
    hueRotate = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(hueRotate, (keyTmp, value) => {
      let prefix = `${globalPrefix}hue-rotate`;
      const basePrefix = prefix.replace(globalPrefix, "");
      let key = keyTmp;
      if (`${key}`.indexOf("-") >= 0) {
        key = key.split("-").join("");
        prefix = `${globalPrefix}-hue-rotate`;
      }
      return `
          ${prefix}-${key} {
            --hue-rotate: ${value};
            ${vars.filter}
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}-${key} {
            --backdrop-hue-rotate: ${value};
            ${vars.backdropFilter}
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1q() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}hyphens`;
  const propertyOptions = ["none", "manual", "auto"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            -webkit-hyphens: ${value};
            hyphens: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1p() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const {
    inset = {}
  } = theme;
  Object.entries(inset).forEach(_ref => {
    let [key, value] = _ref;
    inset[`-${key}`] = `-${value}`.replace("--", "-");
  });
  const responsiveCssString = generateCssString$1(_ref2 => {
    let {
      getCssByOptions
    } = _ref2;
    const cssString = getCssByOptions(inset, (keyTmp, value) => {
      let prefix = globalPrefix;
      let key = keyTmp;
      if (`${key}`.indexOf("-") >= 0) {
        key = key.split("-").join("");
        prefix += "-";
      }
      return `
          ${prefix}inset-${key} {
            right: ${value};
            left: ${value};
            top: ${value};
            bottom: ${value};
          }
          ${prefix}inset-x-${key} {
            right: ${value};
            left: ${value};
          }
          ${prefix}inset-y-${key} {
            top: ${value};
            bottom: ${value};
          }
          ${prefix}right-${key} {
            right: ${value};
          }
          ${prefix}left-${key} {
            left: ${value};
          }
          ${prefix}top-${key} {
            top: ${value};
          }
          ${prefix}bottom-${key} {
            bottom: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1o() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const prefix = `${globalPrefix}invert`;
  const basePrefix = prefix.replace(globalPrefix, "");
  const {
    invert = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(invert, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --invert: ${value};
            ${vars.filter}
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}${key} {
            --backdrop-invert: ${value};
            ${vars.backdropFilter}
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1n() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}`;
  const propertyOptions = {
    isolate: "isolate",
    "isolation-auto": "no-repeat"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}${key} {
            isolation: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1m() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}justify`;
  const propertyOptions = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            justify-content: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1l() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}justify-items`;
  const propertyOptions = ["auto", "start", "end", "center", "stretch"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            justify-items: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1k() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}justify-self`;
  const propertyOptions = ["auto", "start", "end", "center", "stretch"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            justify-self: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1j() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}tracking`;
  const {
    letterSpacing = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(letterSpacing, (key, value) => `
          ${prefix}-${key} {
            letter-spacing: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1i() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}line-clamp`;
  const {
    lineClamp = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(lineClamp, (key, value) => `
          ${prefix}-${key} {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: ${value === "none" ? "horizontal" : "vertical"};
            -webkit-line-clamp: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1h() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}leading`;
  const {
    lineHeight = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(lineHeight, (key, value) => `
          ${prefix}-${key} {
            line-height: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1g() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const responsiveCssString = generateCssString$1(() => {
    const cssString = `
      ${prefix}list-image-none {
        list-style-image: none;
      }
    `;
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1f() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}list`;
  const propertyOptions = ["inside", "outside"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            list-style-position: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1e() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}list`;
  const {
    listStyleType = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(listStyleType, (key, value) => `
          ${prefix}-${key} {
            list-style-type: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1d() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const {
    margin = {}
  } = theme;
  Object.entries(margin).forEach(_ref => {
    let [key, value] = _ref;
    margin[`-${key}`] = `-${value}`.replace("--", "-");
  });
  const responsiveCssString = generateCssString$1(_ref2 => {
    let {
      getCssByOptions
    } = _ref2;
    const cssString = getCssByOptions(margin, (keyTmp, value) => {
      let prefix = `${globalPrefix}m`;
      let key = keyTmp;
      if (`${key}`.indexOf("-") >= 0) {
        key = key.split("-").join("");
        prefix = `${globalPrefix}-m`;
      }
      return `
          ${prefix}-${key} {
            margin: ${value};
          }
          ${prefix}y-${key} {
            margin-top: ${value};
            margin-bottom: ${value};
          }
          ${prefix}x-${key} {
            margin-left: ${value};
            margin-right: ${value};
          }
          ${prefix}t-${key} {
            margin-top: ${value};
          }
          ${prefix}r-${key} {
            margin-right: ${value};
          }
          ${prefix}b-${key} {
            margin-bottom: ${value};
          }
          ${prefix}l-${key} {
            margin-left: ${value};
          }
          ${prefix}s-${key} {
            margin-inline-start: ${value};
          }
          ${prefix}e-${key} {
            margin-inline-end: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1c() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}max-h`;
  const {
    maxHeight = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(maxHeight, (key, value) => `
          ${prefix}-${key} {
            max-height: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1b() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}max-w`;
  const {
    maxWidth = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(maxWidth, (key, value) => `
          ${prefix}-${key} {
            max-width: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1a() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}min-h`;
  const {
    minHeight = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(minHeight, (key, value) => `
          ${prefix}-${key} {
            min-height: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$19() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}min-w`;
  const {
    minWidth = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(minWidth, (key, value) => `
          ${prefix}-${key} {
            min-width: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$18() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}mix-blend`;
  const propertyOptions = ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    let cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            mix-blend-mode: ${value};
          }
        `);
    cssString += getCssByOptions(propertyOptions, (key, value) => `
          ${prefix.replace("mix", "bg")}-${key} {
            background-blend-mode: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$17() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}object`;
  const propertyOptions = ["contain", "cover", "fill", "none", "scale-down"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            object-fit: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$16() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}object`;
  const propertyOptions = ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            object-position: ${value.split("-").join(" ")};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$15() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const prefix = `${globalPrefix}opacity`;
  const basePrefix = prefix.replace(globalPrefix, "");
  const {
    opacity = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(opacity, (key, value) => `
          ${prefix}-${key} {
            opacity: ${value};
            ${vars.filter}
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}-${key} {
            --backdrop-opacity: ${value};
            ${vars.backdropFilter}
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$14() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}order`;
  const {
    order = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(order, (key, value) => `
          ${prefix}-${key} {
            order: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$13() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}outline`;
  const customPrefix = `${globalPrefix}outline-color`;
  const {
    outlineColor = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByColors
    } = _ref;
    const cssString = getCssByColors(outlineColor, (keyTmp, value, rgbValue) => {
      if (keyTmp.toLowerCase() === "default") {
        return "";
      }
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      let rgbPropertyValue = "";
      if (rgbValue) {
        rgbPropertyValue = `outline-color: rgba(${rgbValue}, var(--outline-opacity));`;
      }
      if (value === "custom_value") {
        return `
            ${customPrefix}${key} {
              outline-color: ${value};
            }
          `;
      }
      return `
            ${prefix}${key} {
              --outline-opacity: 1;
              outline-color: ${value};
              ${rgbPropertyValue}
            }
          `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$12() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}outline-offset`;
  const {
    outlineOffset = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(outlineOffset, (key, value) => {
      return `
          ${prefix}-${key} {
            outline-offset: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$11() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}outline-opacity`;
  const {
    outlineOpacity = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(outlineOpacity, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --outline-opacity: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$10() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}outline`;
  const propertyOptions = ["none", "solid", "dashed", "dotted", "double"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (keyTmp, value) => {
      const key = keyTmp !== "solid" ? `-${keyTmp}` : "";
      if (key === "none") {
        return `
            ${prefix}-${key} {
              outline: 2px solid transparent;
              outline-offset: 2px;
            }
          `;
      }
      return `
          ${prefix}${key} {
            outline-style: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$$() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}outline`;
  const customPrefix = `${globalPrefix}outline-width`;
  const {
    outlineWidth = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(outlineWidth, (key, value) => {
      if (value === "custom_value") {
        return `
          ${customPrefix}-${key} {
            outline-width: ${value};
          }
        `;
      }
      return `
        ${prefix}-${key} {
          outline-width: ${value};
        }
      `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$_() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}overflow`;
  const propertyOptions = ["auto", "hidden", "visible", "scroll"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    let cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            overflow: ${value};
          }
          ${prefix}-x-${key} {
            overflow-x: ${value};
          }
          ${prefix}-y-${key} {
            overflow-y: ${value};
          }
        `);
    cssString += `
        ${globalPrefix}scrolling-touch {
          -webkit-overflow-scrolling: touch;
        }
        ${globalPrefix}scrolling-auto {
          -webkit-overflow-scrolling: auto;
        }
      `;
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$Z() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}overscroll`;
  const propertyOptions = ["auto", "contain", "none"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            overscroll-behavior: ${value};
          }
          ${prefix}-x-${key} {
            overscroll-behavior-x: ${value};
          }
          ${prefix}-y-${key} {
            overscroll-behavior-y: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$Y() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}p`;
  const {
    padding = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(padding, (key, value) => `
          ${prefix}-${key} {
            padding: ${value};
          }
          ${prefix}y-${key} {
            padding-top: ${value};
            padding-bottom: ${value};
          }
          ${prefix}x-${key} {
            padding-left: ${value};
            padding-right: ${value};
          }
          ${prefix}t-${key} {
            padding-top: ${value};
          }
          ${prefix}r-${key} {
            padding-right: ${value};
          }
          ${prefix}b-${key} {
            padding-bottom: ${value};
          }
          ${prefix}l-${key} {
            padding-left: ${value};
          }
          ${prefix}s-${key} {
            padding-inline-start: ${value};
          }
          ${prefix}e-${key} {
            padding-inline-end: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$X() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}place-content`;
  const propertyOptions = {
    start: "start",
    end: "end",
    center: "center",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
    stretch: "stretch"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            place-content: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$W() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}place-items`;
  const propertyOptions = ["auto", "start", "end", "center", "stretch"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            place-items: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$V() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}place-self`;
  const propertyOptions = ["auto", "start", "end", "center", "stretch"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            place-self: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$U() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const responsiveCssString = generateCssString$1(() => {
    return `
        ${prefix}pointer-events-none {
          pointer-events: none;
        }
        ${prefix}pointer-events-auto {
          pointer-events: auto;
        }
      `;
  }, configOptions);
  return responsiveCssString;
}

function generator$T() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const propertyOptions = ["static", "fixed", "absolute", "relative", "sticky"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}${key} {
            position: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$S() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}resize`;
  const propertyOptions = {
    none: "none",
    y: "vertical",
    x: "horizontal",
    default: "both"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            resize: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$R() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}ring`;
  const {
    ringColor = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByColors
    } = _ref;
    const cssString = getCssByColors(ringColor, (keyTmp, value, rgbValue) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      let rgbPropertyValue = "";
      if (rgbValue) {
        rgbPropertyValue = `--ring-color: rgba(${rgbValue}, var(--ring-opacity));`;
      }
      return `
            ${prefix}${key} {
              --ring-opacity: 1;
              --ring-color: ${value};
              ${rgbPropertyValue}
            }
          `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$Q() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}ring-offset`;
  const {
    ringOffsetColor = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByColors
    } = _ref;
    const cssString = getCssByColors(ringOffsetColor, (key, value) => `
          ${prefix}-${key} {
            --ring-offset-color: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$P() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}ring-offset`;
  const {
    ringOffsetWidth = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(ringOffsetWidth, (key, value) => `
          ${prefix}-${key} {
            --ring-offset-width: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$O() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}ring-opacity`;
  const {
    ringOpacity = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(ringOpacity, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --ring-opacity: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$N() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}ring`;
  const {
    ringWidth = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    let cssString = getCssByOptions(ringWidth, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --ring-inset: var(--empty,/*!*/ /*!*/);
            --ring-offset-width: 0px;
            --ring-offset-color: #fff;
            --ring-color: rgba(59, 130, 246, 0.5);
            --ring-offset-shadow: var(--ring-inset) 0 0 0 var(--ring-offset-width) var(--ring-offset-color);
            --ring-shadow: var(--ring-inset) 0 0 0 calc(${value} + var(--ring-offset-width)) var(--ring-color);
            box-shadow: var(--ring-offset-shadow), var(--ring-shadow);
          }
        `;
    });
    cssString += `  
        ${prefix}-inset {
          --ring-inset: inset;
        }
      `;
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$M() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const prefix = `${globalPrefix}saturate`;
  const basePrefix = prefix.replace(globalPrefix, "");
  const {
    saturate = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(saturate, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --saturate: ${value};
            ${vars.filter}
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}${key} {
            --backdrop-saturate: ${value};
            ${vars.backdropFilter}
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$L() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const {
    rotate = {}
  } = theme;
  Object.entries(rotate).forEach(_ref => {
    let [key, value] = _ref;
    rotate[`-${key}`] = `-${value}`.replace("--", "-");
  });
  const responsiveCssString = generateCssString$1(_ref2 => {
    let {
      getCssByOptions
    } = _ref2;
    const cssString = getCssByOptions(rotate, (keyTmp, value) => {
      let prefix = `${globalPrefix}rotate`;
      let key = keyTmp;
      if (`${key}`.indexOf("-") >= 0) {
        key = key.split("-").join("");
        prefix = `${globalPrefix}-rotate`;
      }
      return `
          ${prefix}-${key} {
            --transform-rotate: ${value};
            ${vars.transform}
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$K() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const prefix = `${globalPrefix}scale`;
  const {
    scale = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(scale, (key, value) => `
          ${prefix}-${key} {
            --transform-scale-x: ${value};
            --transform-scale-y: ${value};
            ${vars.transform}
          }
          ${prefix}-x-${key} {
            --transform-scale-x: ${value};
            ${vars.transform}
          }
          ${prefix}-y-${key} {
            --transform-scale-y: ${value};
            ${vars.transform}
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$J() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const propertyOptions = ["auto", "smooth"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}scroll-${key} {
            scroll-behavior: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$I() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const {
    scrollMargin = {}
  } = theme;
  Object.entries(scrollMargin).forEach(_ref => {
    let [key, value] = _ref;
    scrollMargin[`-${key}`] = `-${value}`.replace("--", "-");
  });
  const responsiveCssString = generateCssString$1(_ref2 => {
    let {
      getCssByOptions
    } = _ref2;
    const cssString = getCssByOptions(scrollMargin, (keyTmp, value) => {
      let prefix = `${globalPrefix}scroll-m`;
      let key = keyTmp;
      if (`${key}`.indexOf("-") >= 0) {
        key = key.split("-").join("");
        prefix = `${globalPrefix}-scroll-m`;
      }
      return `
          ${prefix}-${key} {
            scroll-margin: ${value};
          }
          ${prefix}y-${key} {
            scroll-margin-top: ${value};
            scroll-margin-bottom: ${value};
          }
          ${prefix}x-${key} {
            scroll-margin-left: ${value};
            scroll-margin-right: ${value};
          }
          ${prefix}t-${key} {
            scroll-margin-top: ${value};
          }
          ${prefix}r-${key} {
            scroll-margin-right: ${value};
          }
          ${prefix}b-${key} {
            scroll-margin-bottom: ${value};
          }
          ${prefix}l-${key} {
            scroll-margin-left: ${value};
          }
          ${prefix}s-${key} {
            scroll-margin-inline-start: ${value};
          }
          ${prefix}e-${key} {
            scroll-margin-inline-end: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$H() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const {
    scrollPadding = {}
  } = theme;
  Object.entries(scrollPadding).forEach(_ref => {
    let [key, value] = _ref;
    scrollPadding[`-${key}`] = `-${value}`.replace("--", "-");
  });
  const responsiveCssString = generateCssString$1(_ref2 => {
    let {
      getCssByOptions
    } = _ref2;
    const cssString = getCssByOptions(scrollPadding, (keyTmp, value) => {
      let prefix = `${globalPrefix}scroll-p`;
      let key = keyTmp;
      if (`${key}`.indexOf("-") >= 0) {
        key = key.split("-").join("");
        prefix = `${globalPrefix}-p`;
      }
      return `
          ${prefix}-${key} {
            scroll-padding: ${value};
          }
          ${prefix}y-${key} {
            scroll-padding-top: ${value};
            scroll-padding-bottom: ${value};
          }
          ${prefix}x-${key} {
            scroll-padding-left: ${value};
            scroll-padding-right: ${value};
          }
          ${prefix}t-${key} {
            scroll-padding-top: ${value};
          }
          ${prefix}r-${key} {
            scroll-padding-right: ${value};
          }
          ${prefix}b-${key} {
            scroll-padding-bottom: ${value};
          }
          ${prefix}l-${key} {
            scroll-padding-left: ${value};
          }
          ${prefix}s-${key} {
            scroll-padding-inline-start: ${value};
          }
          ${prefix}e-${key} {
            scroll-padding-inline-end: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$G() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}snap`;
  const propertyOptions = {
    start: "start",
    end: "end",
    center: "center",
    "align-none": "none"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            scroll-snap-align: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$F() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}snap`;
  const propertyOptions = ["normal", "always"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            scroll-snap-stop: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$E() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}snap`;
  const propertyOptions = {
    none: "none",
    x: "x var(--scroll-snap-strictness)",
    y: "y var(--scroll-snap-strictness)",
    both: "both var(--scroll-snap-strictness)"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    let cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            --scroll-snap-strictness: proximity;
            scroll-snap-type: ${value};
          }
        `);
    cssString += getCssByOptions(["mandatory", "proximity"], (key, value) => `
          ${prefix}-${key} {
            --scroll-snap-strictness: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$D() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const prefix = `${globalPrefix}sepia`;
  const basePrefix = prefix.replace(globalPrefix, "");
  const {
    sepia = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(sepia, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --sepia: ${value};
            ${vars.filter}
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}${key} {
            --backdrop-sepia: ${value};
            ${vars.backdropFilter}
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$C() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}size`;
  const {
    size = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(size, (key, value) => `
          ${prefix}-${key} {
            width: ${value};
            height: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$B() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const {
    skew = {}
  } = theme;
  Object.entries(skew).forEach(_ref => {
    let [key, value] = _ref;
    skew[`-${key}`] = `-${value}`.replace("--", "-");
  });
  const responsiveCssString = generateCssString$1(_ref2 => {
    let {
      getCssByOptions
    } = _ref2;
    const cssString = getCssByOptions(skew, (keyTmp, value) => {
      let prefix = `${globalPrefix}skew`;
      let key = keyTmp;
      if (`${key}`.indexOf("-") >= 0) {
        key = key.split("-").join("");
        prefix = `${globalPrefix}-skew`;
      }
      return `
          ${prefix}-x-${key} {
            --transform-skew-x: ${value};
            ${vars.transform}
          }
          ${prefix}-y-${key} {
            --transform-skew-y: ${value};
            ${vars.transform}
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$A() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}space`;
  const {
    space = {}
  } = theme;
  const responsiveCssString = generateCssString$1(() => {
    const generateSpace = (position, key, value) => {
      let spacePosition = "x";
      let margin1 = "left";
      let margin2 = "right";
      if (position === "y") {
        spacePosition = "y";
        margin1 = "top";
        margin2 = "bottom";
      }
      return `
        ${prefix}-${spacePosition}-${key} {
          --space-${spacePosition}-reverse: 0;
          margin-${margin1}: calc(${value} * calc(1 - var(--space-${spacePosition}-reverse)));
          margin-${margin2}: calc(${value} * var(--space-${spacePosition}-reverse));
        }
        -${prefix}-${spacePosition}-${key} {
          --space-${spacePosition}-reverse: 0;
          margin-${margin1}: calc(-${value} * calc(1 - var(--space-${spacePosition}-reverse)));
          margin-${margin2}: calc(-${value} * var(--space-${spacePosition}-reverse));
        }
      `;
    };
    let cssString = "";
    Object.entries(space).forEach(_ref => {
      let [space, spaceValue] = _ref;
      cssString += generateSpace("y", space, spaceValue);
      cssString += generateSpace("x", space, spaceValue);
    });
    cssString += `
      ${prefix}-x-reverse {
        --space-x-reverse: 1;
      }
      ${prefix}-y-reverse {
        --space-y-reverse: 1;
      }
    `;
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$z() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}stroke`;
  const {
    stroke
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByColors
    } = _ref;
    const cssString = getCssByColors(stroke, (key, value) => {
      return `
            ${prefix}-${key} {
              stroke: ${value};
            }
          `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$y() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}stroke`;
  const {
    strokeWidth = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(strokeWidth, (key, value) => `
          ${prefix}-${key} {
            stroke-width: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$x() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}table`;
  const propertyOptions = ["auto", "fixed"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            table-layout: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$w() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}text`;
  const propertyOptions = ["left", "center", "right", "justify"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            text-align: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$v() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}text`;
  const customPrefix = `${globalPrefix}text-color`;
  const {
    textColor
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByColors
    } = _ref;
    const cssString = getCssByColors(textColor, (key, value, rgbValue) => {
      let rgbPropertyValue = "";
      if (rgbValue) {
        rgbPropertyValue = `color: rgba(${rgbValue}, var(--text-opacity));`;
      }
      if (value === "custom_value") {
        return `
          ${customPrefix}-${key} {
            color: ${value};
          }
          ${prefix}-${key} {
            color: ${value};
          }
        `;
      }
      return `
        ${prefix}-${key} {
          --text-opacity: 1;
          color: ${value};
          ${rgbPropertyValue}
        }
      `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$u() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const propertyOptions = {
    underline: "underline",
    overline: "overline",
    "line-through": "line-through",
    "no-underline": "none"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}${key} {
            text-decoration: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$t() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}decoration`;
  const {
    textDecorationColor = {},
    opacity = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByColors,
      getCssByOptions
    } = _ref;
    let cssString = getCssByColors(textDecorationColor, (key, value, rgbValue) => {
      let rgbPropertyValue = "";
      if (rgbValue) {
        rgbPropertyValue = `text-decoration-color: rgba(${rgbValue}, var(--text-decoration-opacity));`;
      }
      return `
            ${prefix}-${key} {
              --text-decoration-opacity: 1;
              text-decoration-color: ${value};
              ${rgbPropertyValue}
            }
          `;
    });
    cssString += getCssByOptions(opacity, (key, value) => `
          ${prefix}-opacity-${key} {
            --text-decoration-opacity: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$s() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}decoration`;
  const propertyOptions = ["solid", "double", "dotted", "dashed", "wavy"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            text-decoration-style: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$r() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}decoration`;
  const {
    textDecorationThickness = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(textDecorationThickness, (key, value) => `
          ${prefix}-${key} {
            text-decoration-thickness: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$q() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const {
    textIndent = {}
  } = theme;
  Object.entries(textIndent).forEach(_ref => {
    let [key, value] = _ref;
    textIndent[`-${key}`] = `-${value}`.replace("--", "-");
  });
  const responsiveCssString = generateCssString$1(_ref2 => {
    let {
      getCssByOptions
    } = _ref2;
    const cssString = getCssByOptions(textIndent, (keyTmp, value) => {
      let prefix = `${globalPrefix}indent`;
      let key = keyTmp;
      if (`${key}`.indexOf("-") >= 0) {
        key = key.split("-").join("");
        prefix = `${globalPrefix}-indent`;
      }
      return `
          ${prefix}-${key} {
            text-indent: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$p() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}text-opacity`;
  const {
    textOpacity = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(textOpacity, (key, value) => `
          ${prefix}-${key} {
            --text-opacity: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$o() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const propertyOptions = ["ellipsis", "clip"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}truncate {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          ${prefix}text-${key} {
            text-overflow: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$n() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}text-shadow-blur`;
  const {
    textShadowBlur = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(textShadowBlur, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --text-shadow-blur: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$m() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}text-shadow`;
  const {
    textShadowColor = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByColors
    } = _ref;
    const cssString = getCssByColors(textShadowColor, (keyTmp, value, rgbValue) => {
      if (keyTmp.toLowerCase() === "default") {
        return "";
      }
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      let rgbPropertyValue = "";
      if (rgbValue) {
        rgbPropertyValue = `text-shadow: var(--text-shadow-x) var(--text-shadow-y) var(--text-shadow-blur, 0) rgba(${rgbValue}, var(--text-shadow-opacity));`;
      }
      return `
            ${prefix}${key} {
              --text-shadow-opacity: 1;
              --text-shadow-x: 1px;
              --text-shadow-y: 1px;
              text-shadow: var(--text-shadow-x) var(--text-shadow-y) var(--text-shadow-blur, 0) ${value};
              ${rgbPropertyValue}
            }
          `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$l() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}text-shadow-opacity`;
  const {
    textShadowOpacity = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(textShadowOpacity, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --text-shadow-opacity: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$k() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}text-shadow-x`;
  const {
    textShadowX = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(textShadowX, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --text-shadow-x: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$j() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}text-shadow-y`;
  const {
    textShadowY = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(textShadowY, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --text-shadow-y: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$i() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const propertyOptions = {
    uppercase: "uppercase",
    lowercase: "lowercase",
    capitalize: "capitalize",
    "normal-case": "none"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}${key} {
            text-transform: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$h() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}underline-offset`;
  const {
    textUnderlineOffset = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(textUnderlineOffset, (key, value) => `
          ${prefix}-${key} {
            text-underline-offset: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$g() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const propertyOptions = ["wrap", "nowrap", "balance", "pretty"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}text-${key} {
            text-wrap: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$f() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}touch`;
  const propertyOptions = ["auto", "none", "pan-x", "pan-left", "pan-right", "pan-y", "pan-up", "pan-down", "pinch-zoom", "manipulation"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            touch-action: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$e(_ref) {
  let {
    prefix
  } = _ref;
  return `
  ${prefix}transform-none {
    transform: none !important;
  }
`;
}

function generator$d() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}origin`;
  const propertyOptions = ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            transform-origin: ${value.replace("-", " ")};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

/**
 * Transition Delay Generator
 * Generates transition-delay utility classes
 */

function generator$c() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}delay`;
  const {
    transitionDelay = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(transitionDelay, (key, value) => {
      return `
          ${prefix}-${key} {
            transition-delay: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

/**
 * Transition Duration Generator
 * Generates transition-duration utility classes
 */

function generator$b() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}duration`;
  const {
    transitionDuration = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(transitionDuration, (key, value) => {
      return `
          ${prefix}-${key} {
            transition-duration: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

/**
 * Transition Property Generator
 * Generates transition-property utility classes
 */

function generator$a() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}transition`;
  const {
    transitionProperty = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(transitionProperty, (key, value) => {
      if (key === "DEFAULT") {
        return `
            ${globalPrefix}transition {
              transition-property: ${value};
              transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
              transition-duration: 150ms;
            }
          `;
      }
      return `
          ${prefix}-${key} {
            transition-property: ${value};
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

/**
 * Transition Timing Function Generator
 * Generates transition-timing-function utility classes (ease)
 */

function generator$9() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}ease`;
  const {
    transitionTimingFunction = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(transitionTimingFunction, (key, value) => {
      if (key === "DEFAULT") {
        return ""; // Skip DEFAULT for ease
      }
      return `
          ${prefix}-${key} {
            transition-timing-function: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$8() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {},
    vars = {}
  } = configOptions;
  const {
    translate = {}
  } = theme;
  Object.entries(translate).forEach(_ref => {
    let [key, value] = _ref;
    translate[`-${key}`] = `-${value}`.replace("--", "-");
  });
  const responsiveCssString = generateCssString$1(_ref2 => {
    let {
      getCssByOptions
    } = _ref2;
    const cssString = getCssByOptions(translate, (keyTmp, value) => {
      let prefix = `${globalPrefix}translate`;
      let key = keyTmp;
      if (`${key}`.indexOf("-") >= 0) {
        key = key.split("-").join("");
        prefix = `${globalPrefix}-translate`;
      }
      return `
          ${prefix}-x-${key} {
            --transform-translate-x: ${value};
            ${vars.transform}
          }
          ${prefix}-y-${key} {
            --transform-translate-y: ${value};
            ${vars.transform}
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$7() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}select`;
  const propertyOptions = ["none", "text", "all", "auto"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            -webkit-user-select: ${value};
            -moz-user-select: ${value};
            -ms-user-select: ${value};
            user-select: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$6() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}align`;
  const propertyOptions = ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "text-sub", "text-super"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            vertical-align: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$5() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const propertyOptions = {
    visible: "visible",
    collapse: "collapse",
    invisible: "hidden"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}${key} {
            visibility: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$4() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}whitespace`;
  const propertyOptions = ["normal", "nowrap", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"];
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            white-space: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$3() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const prefix = `${globalPrefix}w`;
  const {
    width = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(width, (key, value) => `
          ${prefix}-${key} {
            width: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$2() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix
  } = configOptions;
  const responsiveCssString = generateCssString$1(() => {
    const cssString = `
				${prefix}break-normal {
					overflow-wrap: normal;
					word-break: normal;
				}
				${prefix}break-words {
					overflow-wrap: break-word;
				}
				${prefix}break-all {
					word-break: break-all;
				}
				${prefix}break-keep {
					word-break: keep-all;
				}
			`;
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator$1() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix
  } = configOptions;
  const prefix = `${globalPrefix}will-change`;
  const propertyOptions = {
    auto: "auto",
    scroll: "scroll-position",
    contents: "contents",
    transform: "transform"
  };
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(propertyOptions, (key, value) => `
          ${prefix}-${key} {
            will-change: ${value};
          }
        `);
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

function generator() {
  let configOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    prefix: globalPrefix,
    theme = {}
  } = configOptions;
  const {
    zIndex = {}
  } = theme;
  const responsiveCssString = generateCssString$1(_ref => {
    let {
      getCssByOptions
    } = _ref;
    const cssString = getCssByOptions(zIndex, (keyTmp, value) => {
      let prefix = `${globalPrefix}z`;
      let key = keyTmp;
      if (`${key}`.indexOf("-") >= 0) {
        key = key.split("-").join("");
        prefix = `${globalPrefix}-z`;
      }
      return `
          ${prefix}-${key} {
            z-index: ${value};
          }
        `;
    });
    return cssString;
  }, configOptions);
  return responsiveCssString;
}

/**
 * Proper LRU (Least Recently Used) Cache implementation
 * Efficiently manages memory by removing least recently used items
 */
class LRUCache {
  constructor() {
    let maxSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
    this.maxSize = maxSize;
    this.cache = new Map();
  }

  /**
   * Get value from cache
   * Updates the item as most recently used
   */
  get(key) {
    if (!this.cache.has(key)) {
      return undefined;
    }
    const value = this.cache.get(key);
    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  /**
   * Set value in cache
   * Removes least recently used item if cache is full
   */
  set(key, value) {
    // If key exists, delete it first to update position
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  /**
   * Check if key exists in cache
   */
  has(key) {
    return this.cache.has(key);
  }

  /**
   * Clear all cache entries
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Get current cache size
   */
  get size() {
    return this.cache.size;
  }

  /**
   * Delete specific key
   */
  delete(key) {
    return this.cache.delete(key);
  }
}

/**
 * Custom error class for tailwind-to-style
 */
class TwsError extends Error {
  constructor(message) {
    let context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(message);
    this.name = "TwsError";
    this.context = context;
    this.timestamp = new Date().toISOString();
  }
}

/**
 * Error event handlers
 */
const errorHandlers = new Set();

/**
 * Handle and broadcast errors
 * @param {Error} error - The error that occurred
 * @param {Object} context - Additional context about the error
 */
function handleError(error) {
  let context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const twsError = error instanceof TwsError ? error : new TwsError(error.message, context);

  // Log the error
  logger.error(twsError.message, twsError.context);

  // Notify all registered handlers
  errorHandlers.forEach(handler => {
    try {
      handler(twsError);
    } catch (handlerError) {
      logger.error("Error in error handler:", handlerError);
    }
  });
  return twsError;
}

/**
 * Plugin API for tailwind-to-style
 * Allows users to create custom utilities and extend functionality
 */


/**
 * Convert plugin utilities to lookup object
 * @param {Object} plugin - Plugin object
 * @param {string} [prefix] - Optional prefix for all classes
 * @returns {Object} Lookup object
 */
function pluginToLookup(plugin) {
  let prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  const lookup = {};

  // Process utilities
  if (plugin.utilities) {
    for (const [className, props] of Object.entries(plugin.utilities)) {
      // Remove leading dot and add prefix
      const key = prefix ? `${prefix}${className.slice(1)}` : className.slice(1);
      if (typeof props === "string") {
        lookup[key] = props;
      } else {
        let cssString = "";
        for (const [prop, value] of Object.entries(props)) {
          cssString += `${prop}: ${value}; `;
        }
        lookup[key] = cssString.trim();
      }
    }
  }

  // Process components
  if (plugin.components) {
    for (const [className, props] of Object.entries(plugin.components)) {
      const key = prefix ? `${prefix}${className.slice(1)}` : className.slice(1);
      if (typeof props === "string") {
        lookup[key] = props;
      } else {
        let cssString = "";
        for (const [prop, value] of Object.entries(props)) {
          cssString += `${prop}: ${value}; `;
        }
        lookup[key] = cssString.trim();
      }
    }
  }
  return lookup;
}

const transition = {
  transitionNone: {
    regex: /^transition-none$/,
    cssProp: "transition-property",
    formatter: () => "none"
  },
  transitionAll: {
    regex: /^transition$/,
    cssProp: "transition-property",
    formatter: () => "all"
  },
  transitionProp: {
    regex: /^transition-(opacity|colors|color|background|background-color|transform|shadow|opacity|all|none)$/,
    cssProp: "transition-property",
    formatter: value => {
      if (value === "colors") return "color, background-color, border-color, text-decoration-color, fill, stroke";
      if (value === "color") return "color";
      if (value === "background") return "background-color";
      return value;
    }
  },
  duration: {
    regex: /^duration-(\d+)$/,
    cssProp: "transition-duration",
    formatter: value => `${value}ms`
  },
  delay: {
    regex: /^delay-(\d+)$/,
    cssProp: "transition-delay",
    formatter: value => `${value}ms`
  },
  ease: {
    regex: /^ease-(linear|in|out|in-out)$/,
    cssProp: "transition-timing-function",
    formatter: value => {
      switch (value) {
        case "in":
          return "cubic-bezier(0.4, 0, 1, 1)";
        case "out":
          return "cubic-bezier(0, 0, 0.2, 1)";
        case "in-out":
          return "cubic-bezier(0.4, 0, 0.2, 1)";
        case "linear":
        default:
          return "linear";
      }
    }
  }
};

const fontFamily = {
  fontCustom: {
    regex: /^font-\[([^\]]+)\]$/,
    cssProp: "font-family",
    formatter: value => {
      // Decode URL-encoded value first (in case it comes from bracket encoding)
      const decodedValue = decodeURIComponent(value.replace(/__P__/g, "(").replace(/__C__/g, ")"));

      // Split by comma and process each font
      const fonts = decodedValue.split(",").map(font => {
        let trimmedFont = font.trim();

        // Replace underscores with spaces (Tailwind convention)
        trimmedFont = trimmedFont.replace(/_/g, " ");

        // If font contains spaces and is not already quoted, add quotes
        if (trimmedFont.includes(" ") && !trimmedFont.startsWith('"') && !trimmedFont.startsWith("'")) {
          return `"${trimmedFont}"`;
        }
        return trimmedFont;
      });
      return fonts.join(", ");
    }
  }
};

const patterns = {
  ...transition,
  ...fontFamily
};

// ============================================================================
// SSR (Server-Side Rendering) Support
// Detect environment once at module load for zero-cost runtime checks
// ============================================================================
const IS_BROWSER = typeof window !== "undefined" && typeof document !== "undefined";

// SSR CSS collector - accumulates CSS strings during server rendering
let _ssrCollectedCss = [];
let _ssrCollecting = false;

// ============================================================================
// Bounded Caches (prevent memory leaks in long-running SPAs)
// ============================================================================
const MAX_CACHE_SIZE = 5000;
const MAX_SET_SIZE = 10000;

// Global registry to track injected keyframes (prevents duplication)
const _injectedKeyframes = new Set();

// Global cache Maps with bounded eviction
const _twsxInputCache = new Map();
const _twsxVariantsResultCache = new Map();

// WeakMap for object identity-based caching (fast lookup for repeated objects)
const _objectIdentityCache = new WeakMap();

/** Evict oldest entries from a Map when it exceeds maxSize */
function evictMap(map) {
  let maxSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MAX_CACHE_SIZE;
  if (map.size <= maxSize) return;
  const excess = map.size - maxSize;
  const iter = map.keys();
  for (let i = 0; i < excess; i++) {
    map.delete(iter.next().value);
  }
}

/** Evict oldest entries from a Set when it exceeds maxSize */
function evictSet(set) {
  let maxSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MAX_SET_SIZE;
  if (set.size <= maxSize) return;
  const excess = set.size - maxSize;
  const iter = set.values();
  for (let i = 0; i < excess; i++) {
    set.delete(iter.next().value);
  }
}

// Mapping of animation names to their keyframe definitions
const BUILTIN_KEYFRAMES = {
  spin: {
    "0%": {
      transform: "rotate(0deg)"
    },
    "100%": {
      transform: "rotate(360deg)"
    }
  },
  ping: {
    "75%, 100%": {
      transform: "scale(2)",
      opacity: "0"
    }
  },
  pulse: {
    "50%": {
      opacity: ".5"
    }
  },
  bounce: {
    "0%, 100%": {
      transform: "translateY(-25%)",
      animationTimingFunction: "cubic-bezier(0.8,0,1,1)"
    },
    "50%": {
      transform: "none",
      animationTimingFunction: "cubic-bezier(0,0,0.2,1)"
    }
  },
  fadeIn: {
    "0%": {
      opacity: "0"
    },
    "50%": {
      opacity: "1"
    },
    "100%": {
      opacity: "0"
    }
  },
  slideUp: {
    "0%": {
      transform: "translateY(20px)",
      opacity: "0"
    },
    "50%": {
      transform: "translateY(0)",
      opacity: "1"
    },
    "100%": {
      transform: "translateY(-20px)",
      opacity: "0"
    }
  }
};

// Generate minified keyframes CSS
function generateMinifiedKeyframes(animationNames) {
  let css = "";
  for (const name of animationNames) {
    const keyframe = BUILTIN_KEYFRAMES[name];
    if (!keyframe) continue;
    css += `@keyframes ${name}{`;
    for (const [percentage, styles] of Object.entries(keyframe)) {
      css += `${percentage}{`;
      for (const [prop, value] of Object.entries(styles)) {
        const cssProp = prop.replace(UPPERCASE_LETTER_REGEX, "-$1").toLowerCase();
        css += `${cssProp}:${value};`;
      }
      css += "}";
    }
    css += "}";
  }
  return css;
}

// Opacity modifiers
const OPACITY_MODIFIER_REGEX = /\/(\d+)$/;
const OPACITY_PROP_REGEXES = {
  "--text-opacity": /--text-opacity\s*:\s*[\d.]+/gi,
  "--bg-opacity": /--bg-opacity\s*:\s*[\d.]+/gi,
  "--border-opacity": /--border-opacity\s*:\s*[\d.]+/gi,
  "--ring-opacity": /--ring-opacity\s*:\s*[\d.]+/gi,
  "--divide-opacity": /--divide-opacity\s*:\s*[\d.]+/gi,
  "--placeholder-opacity": /--placeholder-opacity\s*:\s*[\d.]+/gi,
  "--text-decoration-opacity": /--text-decoration-opacity\s*:\s*[\d.]+/gi,
  "--outline-opacity": /--outline-opacity\s*:\s*[\d.]+/gi,
  "--accent-opacity": /--accent-opacity\s*:\s*[\d.]+/gi,
  "--caret-opacity": /--caret-opacity\s*:\s*[\d.]+/gi
};

// CSS parsing
const CSS_CLASS_REGEX = /([a-zA-Z0-9\-_\\/.]+)\s*{\s*([^}]+)\s*}/g;
const DOUBLE_BACKSLASH_REGEX = /\\\\/g;
const LEADING_UNDERSCORE_REGEX = /^_/;
const MULTIPLE_SPACES_REGEX = /\s+/g;

// Bracket encoding/decoding
const BRACKET_CONTENT_REGEX = /\[([^\]]+)\]/g;
const OPENING_PAREN_REGEX = /\(/g;
const CLOSING_PAREN_REGEX = /\)/g;
const ENCODED_PAREN_OPEN_REGEX = /__P__/g;
const ENCODED_PAREN_CLOSE_REGEX = /__C__/g;

// Variant expansion
const DIRECTIVE_GROUP_REGEX = /(\w+)\(([^()]+)\)/g;
const VARIANT_GROUP_REGEX = /(\w+):\(([^()]+(?:\((?:[^()]+)\))?[^()]*)\)/g;
const WHITESPACE_SPLIT_REGEX = /\s+/;
const VARIANT_COLON_SPLIT_REGEX = /:/;

// Animation detection
const ANIMATION_NAME_REGEX = /animation(?:-name)?:\s*([a-zA-Z0-9-]+)/gi;
const CUSTOM_VALUE_FULL_REGEX = /^(.+?)\[(.+)\]$/;

// Selector variants
const SELECTOR_VARIANT_REGEX = /c-(first|last|odd|even|\d+|not\([^)]+\))/g;
const NOT_SELECTOR_REGEX = /^not\(([^)]+)\)$/;
const DIGIT_ONLY_REGEX = /^\d+$/;

// Color property regex patterns (pre-compiled for each color property)
// Used in processOpacityModifier for 50-100x performance improvement
const COLOR_PROPERTIES = ["color", "background-color", "border-color", "text-decoration-color", "outline-color", "fill", "stroke", "caret-color", "accent-color"];

// Pre-compile regex patterns for each color property
const COLOR_REGEX_PATTERNS = new Map();
for (const prop of COLOR_PROPERTIES) {
  const escapedProp = prop.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  COLOR_REGEX_PATTERNS.set(prop, {
    rgb: new RegExp(`(${escapedProp}\\s*:\\s*)rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)`, "gi"),
    rgba: new RegExp(`(${escapedProp}\\s*:\\s*)rgba\\((\\d+),\\s*(\\d+),\\s*(\\d+),\\s*[\\d.]+\\)`, "gi"),
    hsl: new RegExp(`(${escapedProp}\\s*:\\s*)hsl\\((\\d+),\\s*([\\d.]+%),\\s*([\\d.]+%)\\)`, "gi"),
    hsla: new RegExp(`(${escapedProp}\\s*:\\s*)hsla\\((\\d+),\\s*([\\d.]+%),\\s*([\\d.]+%),\\s*[\\d.]+\\)`, "gi"),
    hex: new RegExp(`(${escapedProp}\\s*:\\s*)(#[0-9a-fA-F]{3,6})`, "gi")
  });
}

// CSS property name conversion
const UPPERCASE_LETTER_REGEX = /([A-Z])/g;

// Escape characters
const ESCAPE_SLASH_REGEX = /\//g;
const ESCAPE_DOT_REGEX = /\./g;
const plugins = {
  accentColor: generator$2N,
  accessibility: generator$2M,
  alignContent: generator$2L,
  alignItems: generator$2K,
  alignSelf: generator$2J,
  animation: generator$2I,
  appearance: generator$2H,
  aspect: generator$2G,
  backgroundAttachment: generator$2F,
  backgroundClip: generator$2E,
  backgroundColor: generator$2D,
  backgroundImage: generator$2C,
  backgroundOpacity: generator$2B,
  backgroundOrigin: generator$2A,
  backgroundPosition: generator$2z,
  backgroundRepeat: generator$2y,
  backgroundSize: generator$2x,
  backdropBlur: generator$2w,
  backdropBrightness: generator$2v,
  backdropContrast: generator$2u,
  backdropFilter: generator$2t,
  backdropGrayscale: generator$2s,
  backdropHueRotate: generator$2r,
  backdropInvert: generator$2q,
  backdropOpacity: generator$2p,
  backdropSaturate: generator$2o,
  backdropSepia: generator$2n,
  blur: generator$2m,
  borderCollapse: generator$2l,
  borderColor: generator$2k,
  borderOpacity: generator$2j,
  borderRadius: generator$2i,
  borderSpacing: generator$2h,
  borderStyle: generator$2g,
  borderWidth: generator$2f,
  boxDecorationBreak: generator$2e,
  boxShadow: generator$2d,
  boxSizing: generator$2c,
  breakAfter: generator$2b,
  breakBefore: generator$2a,
  breakInside: generator$29,
  brightness: generator$28,
  captionSide: generator$27,
  caretColor: generator$26,
  clear: generator$25,
  columns: generator$24,
  container: generator$23,
  content: generator$22,
  contrast: generator$21,
  cursor: generator$20,
  display: generator$1$,
  divideColor: generator$1_,
  divideOpacity: generator$1Z,
  divideStyle: generator$1Y,
  divideWidth: generator$1X,
  dropShadow: generator$1W,
  fill: generator$1V,
  filter: generator$1U,
  flex: generator$1T,
  flexBasis: generator$1S,
  flexDirection: generator$1R,
  flexGrow: generator$1Q,
  flexShrink: generator$1P,
  flexWrap: generator$1O,
  float: generator$1N,
  fontFamily: generator$1M,
  fontSize: generator$1L,
  fontSmoothing: generator$1K,
  fontStyle: generator$1J,
  fontVariantNumeric: generator$1I,
  fontWeight: generator$1H,
  gap: generator$1G,
  gradientColorStops: generator$1F,
  grayscale: generator$1E,
  gridAutoColumns: generator$1D,
  gridAutoFlow: generator$1C,
  gridAutoRows: generator$1B,
  gridColumn: generator$1A,
  gridColumnEnd: generator$1z,
  gridColumnStart: generator$1y,
  gridRow: generator$1x,
  gridRowEnd: generator$1w,
  gridRowStart: generator$1v,
  gridTemplateColumns: generator$1u,
  gridTemplateRows: generator$1t,
  height: generator$1s,
  hueRotate: generator$1r,
  hyphens: generator$1q,
  inset: generator$1p,
  invert: generator$1o,
  isolation: generator$1n,
  justifyContent: generator$1m,
  justifyItems: generator$1l,
  justifySelf: generator$1k,
  letterSpacing: generator$1j,
  lineClamp: generator$1i,
  lineHeight: generator$1h,
  listStyleImage: generator$1g,
  listStylePosition: generator$1f,
  listStyleType: generator$1e,
  margin: generator$1d,
  maxHeight: generator$1c,
  maxWidth: generator$1b,
  minHeight: generator$1a,
  minWidth: generator$19,
  objectFit: generator$17,
  mixBlendMode: generator$18,
  objectPosition: generator$16,
  opacity: generator$15,
  order: generator$14,
  outlineColor: generator$13,
  outlineOffset: generator$12,
  outlineOpacity: generator$11,
  outlineStyle: generator$10,
  outlineWidth: generator$$,
  overflow: generator$_,
  overscrollBehavior: generator$Z,
  padding: generator$Y,
  placeContent: generator$X,
  placeItems: generator$W,
  placeSelf: generator$V,
  pointerEvents: generator$U,
  position: generator$T,
  resize: generator$S,
  ringColor: generator$R,
  ringOffsetColor: generator$Q,
  ringOffsetWidth: generator$P,
  ringOpacity: generator$O,
  ringWidth: generator$N,
  rotate: generator$L,
  saturate: generator$M,
  scale: generator$K,
  scrollBehavior: generator$J,
  scrollMargin: generator$I,
  scrollPadding: generator$H,
  scrollSnapAlign: generator$G,
  scrollSnapStop: generator$F,
  scrollSnapType: generator$E,
  sepia: generator$D,
  size: generator$C,
  skew: generator$B,
  space: generator$A,
  stroke: generator$z,
  strokeWidth: generator$y,
  tableLayout: generator$x,
  textAlign: generator$w,
  textColor: generator$v,
  textDecoration: generator$u,
  textDecorationColor: generator$t,
  textDecorationStyle: generator$s,
  textDecorationThickness: generator$r,
  textIndent: generator$q,
  textOpacity: generator$p,
  textOverflow: generator$o,
  textShadowBlur: generator$n,
  textShadowColor: generator$m,
  textShadowOpacity: generator$l,
  textShadowX: generator$k,
  textShadowY: generator$j,
  textTransform: generator$i,
  textUnderlineOffset: generator$h,
  textWrap: generator$g,
  touchAction: generator$f,
  transform: generator$e,
  transformOrigin: generator$d,
  transitionDelay: generator$c,
  transitionDuration: generator$b,
  transitionProperty: generator$a,
  transitionTimingFunction: generator$9,
  translate: generator$8,
  userSelect: generator$7,
  verticalAlign: generator$6,
  visibility: generator$5,
  whitespace: generator$4,
  width: generator$3,
  willChange: generator$1,
  wordBreak: generator$2,
  zIndex: generator
};
function parseCustomClassWithPatterns(className) {
  for (const key in patterns) {
    const {
      regex,
      cssProp,
      formatter
    } = patterns[key];
    const match = className.match(regex);
    if (match) {
      const value = formatter(match[1]);
      return `${cssProp}: ${value};`;
    }
  }
  return null;
}

// Cache for getConfigOptions - use LRU cache
const configOptionsCache = new LRUCache(500);
function generateTailwindCssString() {
  var _options$theme, _userConfigData$theme;
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const pluginKeys = Object.keys(plugins);

  // Merge user config with options
  const userConfigData = getConfig();
  const mergedOptions = {
    ...options,
    theme: {
      ...options.theme,
      ...userConfigData.theme,
      extend: {
        ...((_options$theme = options.theme) === null || _options$theme === void 0 ? void 0 : _options$theme.extend),
        ...((_userConfigData$theme = userConfigData.theme) === null || _userConfigData$theme === void 0 ? void 0 : _userConfigData$theme.extend)
      }
    }
  };

  // Use cache to prevent unnecessary reprocessing
  // Include user config in cache key to ensure cache invalidation
  const key = JSON.stringify({
    options: mergedOptions,
    userConfigHash: JSON.stringify(userConfigData)
  });
  if (!configOptionsCache.has(key)) {
    const configOptions = getConfigOptions(mergedOptions, pluginKeys);
    configOptionsCache.set(key, configOptions);
  }
  const configOptions = configOptionsCache.get(key);
  const {
    corePlugins = {}
  } = configOptions;
  let cssString = "";
  const pluginNames = Object.keys(plugins);

  // Optimized loop - check corePlugins directly instead of indexOf
  for (let i = 0; i < pluginNames.length; i++) {
    const pluginName = pluginNames[i];
    // Skip if plugin is explicitly disabled in corePlugins
    if (corePlugins.hasOwnProperty(pluginName) && !corePlugins[pluginName]) {
      continue;
    }
    cssString += plugins[pluginName](configOptions);
  }
  return cssString;
}
function convertCssToObject(cssString) {
  const obj = {};
  let match;
  CSS_CLASS_REGEX.lastIndex = 0; // Reset global regex
  while ((match = CSS_CLASS_REGEX.exec(cssString)) !== null) {
    const className = match[1].replace(DOUBLE_BACKSLASH_REGEX, "\\").replace(LEADING_UNDERSCORE_REGEX, "");
    const cssRules = match[2].trim().replace(MULTIPLE_SPACES_REGEX, " ");
    obj[className] = cssRules;
  }

  // Add plugin utilities to the lookup object
  const plugins = getPlugins();
  const configOptions = getConfigOptions();
  const prefix = configOptions.prefix || "";
  plugins.forEach(plugin => {
    const pluginLookup = pluginToLookup(plugin, prefix);
    Object.assign(obj, pluginLookup);
  });
  return obj;
}

// Use singleton cache instead of global variables
const tailwindCache = getTailwindCache();
const fractionDenominators = [2, 3, 4, 5, 6, 12];
const fractionPrefixes = ["w-", "h-", "max-w-", "max-h-", "min-w-", "min-h-", "top-", "bottom-", "left-", "right-", "inset-", "inset-x-", "inset-y-", "translate-x-", "translate-y-", "rounded-t-", "rounded-b-", "rounded-l-", "rounded-r-", "rounded-bl-", "rounded-br-", "rounded-tl-", "rounded-tr-", "flex-basis-", "z-"];
const breakpoints = {
  sm: "@media (min-width: 640px)",
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 1024px)",
  xl: "@media (min-width: 1280px)",
  "2xl": "@media (min-width: 1536px)"
};
const pseudoVariants = new Set(["hover", "focus", "focus-within", "active", "visited", "disabled", "first", "last", "checked", "invalid", "required"]);
const specialVariants = {
  group: (state, sel) => `.group:${state} ${sel}`,
  peer: (state, sel) => `.peer:${state} ~ ${sel}`,
  dark: (state, sel) => `.dark ${sel}`
};
const selectorVariants = {
  first: () => "> :first-child",
  last: () => "> :last-child",
  odd: () => "> :nth-child(odd)",
  even: () => "> :nth-child(even)",
  not: arg => `> :not(${arg})`,
  number: arg => `> :nth-child(${arg})`
};

// Optimize encoding/decoding bracket values with memoization
const encodeBracketCache = new LRUCache(1000);
function encodeBracketValues(input) {
  if (!input) return input;
  if (encodeBracketCache.has(input)) return encodeBracketCache.get(input);
  BRACKET_CONTENT_REGEX.lastIndex = 0; // Reset global regex
  const result = input.replace(BRACKET_CONTENT_REGEX, (_, content) => {
    const encoded = encodeURIComponent(content).replace(OPENING_PAREN_REGEX, "__P__").replace(CLOSING_PAREN_REGEX, "__C__");
    return `[${encoded}]`;
  });
  encodeBracketCache.set(input, result);
  return result;
}
const decodeBracketCache = new LRUCache(1000);
function decodeBracketValues(input) {
  if (!input) return input;
  if (decodeBracketCache.has(input)) return decodeBracketCache.get(input);
  const result = decodeURIComponent(input).replace(ENCODED_PAREN_OPEN_REGEX, "(").replace(ENCODED_PAREN_CLOSE_REGEX, ")");
  decodeBracketCache.set(input, result);
  return result;
}
function replaceSelector(selector) {
  SELECTOR_VARIANT_REGEX.lastIndex = 0; // Reset global regex
  return selector.replace(SELECTOR_VARIANT_REGEX, (_, raw) => {
    if (DIGIT_ONLY_REGEX.test(raw)) return selectorVariants.number(raw);
    const notMatch = raw.match(NOT_SELECTOR_REGEX);
    if (notMatch) return selectorVariants.not(notMatch[1]);
    if (selectorVariants[raw]) return selectorVariants[raw]();
    return raw;
  });
}
function resolveVariants(selector, variants) {
  let media = null;
  let finalSelector = selector;
  for (const v of variants) {
    if (breakpoints[v]) {
      media = breakpoints[v];
    } else if (pseudoVariants.has(v)) {
      finalSelector += `:${v}`;
    } else if (v === "dark") {
      // Special handling for dark variant
      finalSelector = `.dark ${finalSelector}`;
    } else {
      for (const key in specialVariants) {
        if (v.startsWith(`${key}-`)) {
          const state = v.slice(key.length + 1);
          finalSelector = specialVariants[key](state, finalSelector);
          break;
        }
      }
    }
  }
  return {
    media,
    finalSelector
  };
}

/**
 * Process opacity modifier from class name (e.g., text-red-500/50 -> 50% opacity)
 * @param {string} className - Class name with potential opacity modifier
 * @param {string} cssDeclaration - CSS declaration to modify
 * @returns {string} Modified CSS declaration with opacity applied
 */
function processOpacityModifier(className, cssDeclaration) {
  const opacityMatch = OPACITY_MODIFIER_REGEX.exec(className);
  if (!opacityMatch) return cssDeclaration;
  const opacityValue = parseInt(opacityMatch[1], 10);
  if (opacityValue < 0 || opacityValue > 100) return cssDeclaration;
  const alphaValue = (opacityValue / 100).toString();

  // Handle Tailwind's CSS custom property pattern
  let modifiedDeclaration = cssDeclaration;

  // Replace opacity custom properties using pre-compiled regexes
  for (const prop in OPACITY_PROP_REGEXES) {
    const regex = OPACITY_PROP_REGEXES[prop];
    regex.lastIndex = 0; // Reset global regex
    modifiedDeclaration = modifiedDeclaration.replace(regex, `${prop}: ${alphaValue}`);
  }

  // Also handle direct color values using pre-compiled regex patterns
  for (const prop of COLOR_PROPERTIES) {
    const patterns = COLOR_REGEX_PATTERNS.get(prop);
    if (!patterns) continue;

    // Reset all regex lastIndex for reuse
    patterns.rgb.lastIndex = 0;
    patterns.rgba.lastIndex = 0;
    patterns.hsl.lastIndex = 0;
    patterns.hsla.lastIndex = 0;
    patterns.hex.lastIndex = 0;

    // Convert rgb to rgba with opacity
    modifiedDeclaration = modifiedDeclaration.replace(patterns.rgb, `$1rgba($2, $3, $4, ${alphaValue})`);

    // Update existing rgba opacity
    modifiedDeclaration = modifiedDeclaration.replace(patterns.rgba, `$1rgba($2, $3, $4, ${alphaValue})`);

    // Convert hsl to hsla with opacity
    modifiedDeclaration = modifiedDeclaration.replace(patterns.hsl, `$1hsla($2, $3, $4, ${alphaValue})`);

    // Update existing hsla opacity
    modifiedDeclaration = modifiedDeclaration.replace(patterns.hsla, `$1hsla($2, $3, $4, ${alphaValue})`);

    // Handle hex colors - convert to rgba
    modifiedDeclaration = modifiedDeclaration.replace(patterns.hex, (match, propPart, hexColor) => {
      // Convert hex to rgba
      const hex = hexColor.replace("#", "");
      let r, g, b;
      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
      } else {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      }
      return `${propPart}rgba(${r}, ${g}, ${b}, ${alphaValue})`;
    });
  }
  return modifiedDeclaration;
}

// Performance monitoring utilities
const performanceMonitor = {
  enabled: typeof performance !== "undefined",
  start(label) {
    if (!this.enabled) return null;
    return {
      label,
      startTime: performance.now()
    };
  },
  end(marker) {
    if (!this.enabled || !marker) return;
    const duration = performance.now() - marker.startTime;
    if (duration > 5) {
      // Only log if > 5ms
      logger.warn(`Slow ${marker.label}: ${duration.toFixed(2)}ms`);
    }
  },
  measure(fn, label) {
    const marker = this.start(label);
    try {
      const result = fn();
      this.end(marker);
      return result;
    } catch (error) {
      this.end(marker);
      throw error;
    }
  }
};

// Utility functions for class expansion
function expandDirectiveGroups(str) {
  DIRECTIVE_GROUP_REGEX.lastIndex = 0; // Reset global regex
  return str.replace(DIRECTIVE_GROUP_REGEX, (_, directive, content) => {
    // Special handling for dark mode syntax: dark:(classes)
    if (directive === "dark") {
      return content.trim().split(WHITESPACE_SPLIT_REGEX).map(cls => `dark:${cls}`).join(" ");
    }
    return content.trim().split(WHITESPACE_SPLIT_REGEX).map(val => {
      if (val.includes(":")) {
        const parts = val.split(VARIANT_COLON_SPLIT_REGEX);
        const variant = parts[0];
        const v = parts[1];
        const prefix = v.startsWith("-") ? "-" : "";
        const value = v.startsWith("-") ? v.slice(1) : v;
        return `${variant}:${prefix}${directive}-${value}`;
      }
      const prefix = val.startsWith("-") ? "-" : "";
      const value = val.startsWith("-") ? val.slice(1) : val;
      return `${prefix}${directive}-${value}`;
    }).join(" ");
  });
}
function expandVariants(str) {
  let parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  VARIANT_GROUP_REGEX.lastIndex = 0; // Reset global regex
  return str.replace(VARIANT_GROUP_REGEX, (_, variant, content) => {
    return content.trim().split(WHITESPACE_SPLIT_REGEX).map(c => {
      if (/\w+:\(.*\)/.test(c)) {
        return expandVariants(c, parent ? `${parent}:${variant}` : variant);
      }
      return `${parent ? `${parent}:${variant}` : variant}:${c}`;
    }).join(" ");
  });
}
function expandGroupedClass(input) {
  let result = encodeBracketValues(input);
  let prev;
  do {
    prev = result;
    result = expandVariants(result);
    result = expandDirectiveGroups(result);
  } while (result !== prev);
  return result;
}
// CSS Processing utilities
const parseSelectorCache = new LRUCache(500);
function parseSelector(selector) {
  if (parseSelectorCache.has(selector)) {
    return parseSelectorCache.get(selector);
  }
  let result;
  if (selector.includes("@css")) {
    var _parts$;
    const parts = selector.split("@css");
    const baseSelector = parts[0].trim();
    const cssProperty = (_parts$ = parts[1]) === null || _parts$ === void 0 ? void 0 : _parts$.trim();
    result = {
      baseSelector,
      cssProperty
    };
  } else {
    result = {
      baseSelector: selector,
      cssProperty: null
    };
  }
  parseSelectorCache.set(selector, result);
  return result;
}
function processClass(cls, selector, styles) {
  if (cls.trim() === "") return;
  const [rawVariants, className] = cls.includes(":") ? [cls.split(":").slice(0, -1), cls.split(":").slice(-1)[0]] : [[], cls];
  let isImportant = false;
  let pureClassName = className;
  if (className.startsWith("!")) {
    isImportant = true;
    pureClassName = className.slice(1);
  }
  const {
    media,
    finalSelector
  } = resolveVariants(selector, rawVariants);

  // Extract base class name without opacity modifier for CSS lookup
  // Only remove /digits if it's an opacity modifier (not a fraction like w-2/3)
  const opacityMatch = OPACITY_MODIFIER_REGEX.exec(pureClassName);
  let baseClassName = pureClassName;
  let hasOpacityModifier = false;
  if (opacityMatch) {
    const opacityValue = parseInt(opacityMatch[1], 10);
    // If it's a valid opacity value (0-100), treat it as opacity modifier
    if (opacityValue >= 0 && opacityValue <= 100) {
      // Check if this could be a fraction (e.g., w-2/3, h-1/2, top-1/2, etc.)
      const couldBeFraction = fractionDenominators.includes(opacityValue) && fractionPrefixes.some(prefix => pureClassName.startsWith(prefix) || pureClassName.startsWith(`-${prefix}`));
      if (!couldBeFraction) {
        baseClassName = pureClassName.replace(/\/\d+$/, "");
        hasOpacityModifier = true;
      }
    }
  }

  // Get cssObject from singleton cache
  const cssObject = tailwindCache.getOrGenerate(generateTailwindCssString, convertCssToObject);
  let declarations = cssObject[baseClassName] || cssObject[baseClassName.replace(ESCAPE_SLASH_REGEX, "\\$1")] || cssObject[baseClassName.replace(ESCAPE_DOT_REGEX, "\\.")];
  if (!declarations && baseClassName.includes("[")) {
    const match = CUSTOM_VALUE_FULL_REGEX.exec(baseClassName);
    if (match) {
      const [, prefix, dynamicValue] = match;
      const customKey = `${prefix}custom`;
      const template = cssObject[customKey];
      if (template) {
        declarations = template.replace(/custom_value/g, decodeBracketValues(dynamicValue));
      }
    }
  }
  if (!declarations) {
    declarations = parseCustomClassWithPatterns(baseClassName);
  }
  if (!declarations) {
    return;
  }

  // Apply opacity modifier if present
  if (hasOpacityModifier && pureClassName.includes("/") && /\/\d+$/.test(pureClassName)) {
    declarations = processOpacityModifier(pureClassName, declarations);
  }
  if (isImportant) {
    declarations = declarations.replace(/([^:;]+):([^;]+)(;?)/g, (_, prop, value) => {
      return prop.trim().startsWith("--") ? `${prop}:${value};` : `${prop}:${value.trim()} !important;`;
    });
  }
  const isSpaceOrDivide = ["space-x-", "-space-x-", "space-y-", "-space-y-", "divide-"].some(prefix => baseClassName.startsWith(prefix));
  const expandedSelector = replaceSelector(finalSelector);
  const targetSelector = isSpaceOrDivide ? `${expandedSelector} > :not([hidden]) ~ :not([hidden])` : expandedSelector;
  if (media) {
    styles[media] = styles[media] || {};
    styles[media][targetSelector] = styles[media][targetSelector] || "";
    styles[media][targetSelector] += declarations + "\n";
  } else {
    styles[targetSelector] = styles[targetSelector] || "";
    styles[targetSelector] += declarations + "\n";
  }
}
function processNestedSelectors(nested, selector, styles, walk) {
  for (const nestedSel in nested) {
    const nestedVal = nested[nestedSel];
    if (nestedSel === "@css" && typeof nestedVal === "object") {
      // For @css directive, use raw CSS values without any processing
      const cssDeclarations = Object.entries(nestedVal).map(_ref => {
        let [key, value] = _ref;
        // Convert camelCase to kebab-case (e.g., borderTopColor -> border-top-color)
        const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        // Ensure CSS values are properly formatted and not processed through Tailwind conversion
        const cleanValue = typeof value === "string" ? value.trim() : String(value);
        return `${cssKey}: ${cleanValue};`;
      }).join(" ");
      if (selector in styles) {
        styles[selector] += cssDeclarations + "\n";
      } else {
        styles[selector] = cssDeclarations + "\n";
      }
      continue;
    }
    const combinedSel = nestedSel.includes("&") ? nestedSel.replace(/&/g, selector) : `${selector} ${nestedSel}`;
    walk(combinedSel, nestedVal);
  }
}
function walkStyleTree(selector, val, styles, walk) {
  if (!selector || typeof selector !== "string") {
    logger.warn("Invalid selector in walk function:", selector);
    return;
  }
  const {
    baseSelector,
    cssProperty
  } = parseSelector(selector);
  if (cssProperty && typeof val === "object" && Array.isArray(val) && val.length > 0) {
    const cssValue = val[0];
    if (typeof cssValue === "string") {
      styles[baseSelector] = styles[baseSelector] || "";
      styles[baseSelector] += `${cssProperty}: ${cssValue};\n`;
      return;
    }
  }
  if (Array.isArray(val)) {
    const [base, nested] = val;
    if (typeof base !== "string") {
      return;
    }

    // Process base classes
    for (const cls of base.split(" ")) {
      processClass(cls, selector, styles);
    }

    // Process nested selectors
    processNestedSelectors(nested, selector, styles, walk);
  } else if (typeof val === "string") {
    if (val.trim() === "") return;
    // Handle @css string directive: '@css { ... }'
    const trimmedVal = val.trim();
    if (trimmedVal.startsWith('@css')) {
      const cssMatch = trimmedVal.match(/^@css\s*\{([\s\S]*)\}\s*$/);
      if (cssMatch) {
        const rawCss = cssMatch[1].trim();
        styles[selector] = styles[selector] || '';
        styles[selector] += rawCss.split(';').filter(d => d.trim()).map(d => d.trim() + ';').join(' ') + '\n';
        return;
      }
    }
    walk(selector, [expandGroupedClass(val)]);
  } else if (typeof val === "object" && val !== null) {
    const {
      baseSelector,
      cssProperty
    } = parseSelector(selector);
    if (cssProperty) {
      const cssValue = Object.values(val).join(" ");
      styles[baseSelector] = styles[baseSelector] || "";
      styles[baseSelector] += `${cssProperty}: ${cssValue};\n`;
      return;
    }

    // Check if this is a @css object within the current object
    if (val["@css"] && typeof val["@css"] === "object") {
      // Handle object with @css directive - process the @css part specially
      const cssDeclarations = Object.entries(val["@css"]).map(_ref2 => {
        let [key, value] = _ref2;
        // Convert camelCase to kebab-case (e.g., borderTopColor -> border-top-color)
        const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        // Keep CSS values intact without any processing
        const cleanValue = typeof value === "string" ? value.trim() : String(value);
        return `${cssKey}: ${cleanValue};`;
      }).join(" ");
      if (selector in styles) {
        styles[selector] += cssDeclarations + "\n";
      } else {
        styles[selector] = cssDeclarations + "\n";
      }

      // Process other properties in the object (non-@css)
      const otherProps = {
        ...val
      };
      delete otherProps["@css"];
      if (Object.keys(otherProps).length > 0) {
        processNestedSelectors(otherProps, selector, styles, walk);
      }
    } else {
      // Regular object processing - use processNestedSelectors to handle properly
      processNestedSelectors(val, selector, styles, walk);
    }
  }
}

// Object flattening utilities
function isSelectorObject(val) {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}
function flattenStyleObject(obj) {
  let parentSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  const result = {};
  for (const selector in obj) {
    const val = obj[selector];

    // Handle media queries specially - don't concatenate with parent
    if (selector.startsWith("@media")) {
      if (isSelectorObject(val)) {
        // Initialize media query in result if not exists
        if (!result[selector]) {
          result[selector] = {};
        }

        // Process nested selectors within media query
        for (const innerSel in val) {
          const innerVal = val[innerSel];

          // Calculate the target selector within media query context
          let targetSelector;
          if (parentSelector) {
            if (innerSel === "." || innerSel === "&") {
              // Self-reference - use parent selector
              targetSelector = parentSelector;
            } else if (innerSel.includes("&")) {
              // Replace & with parent
              targetSelector = innerSel.replace(/&/g, parentSelector);
            } else {
              // Descendant selector
              targetSelector = `${parentSelector} ${innerSel}`;
            }
          } else {
            targetSelector = innerSel;
          }

          // Recursively flatten inner value
          if (typeof innerVal === "string") {
            result[selector][targetSelector] = innerVal;
          } else if (isSelectorObject(innerVal)) {
            const nested = flattenStyleObject({
              [innerSel]: innerVal
            }, parentSelector);
            // Merge nested results into media query
            for (const nestedSel in nested) {
              if (nestedSel.startsWith("@media")) {
                // Nested media query - merge at top level
                Object.assign(result, nested);
              } else {
                result[selector][nestedSel] = nested[nestedSel];
              }
            }
          }
        }
      }
      continue;
    }
    const currentSelector = parentSelector ? selector.includes("&") ? selector.replace(/&/g, parentSelector) : `${parentSelector} ${selector}` : selector;
    if (typeof val === "string") {
      result[currentSelector] = val;
    } else if (Array.isArray(val)) {
      const flatArray = [];
      for (const item of val) {
        if (typeof item === "string") {
          flatArray.push(item);
        } else if (isSelectorObject(item)) {
          const nested = flattenStyleObject(item, currentSelector);
          Object.assign(result, nested);
        }
      }
      if (flatArray.length > 0) {
        result[currentSelector] = result[currentSelector] || [];
        result[currentSelector].push(...flatArray);
      }
    } else if (isSelectorObject(val)) {
      const nested = flattenStyleObject(val, currentSelector);
      Object.assign(result, nested);
    }
  }
  return result;
}

// CSS Generation utilities
function generateCssString(styles) {
  const baseStyles = [];
  const mediaStyles = [];
  for (const sel in styles) {
    if (!sel.startsWith("@media")) {
      baseStyles.push({
        sel,
        css: styles[sel]
      });
    } else {
      mediaStyles.push({
        sel,
        content: styles[sel]
      });
    }
  }
  let cssString = "";

  // Add base styles
  for (const {
    sel,
    css
  } of baseStyles) {
    cssString += `${sel}{${css.trim().replace(/\n/g, "")}}`;
  }

  // Sort and add media queries
  function mediaPriority(sel) {
    const match = sel.match(/@media \(min-width: (\d+)px\)/);
    return match ? parseInt(match[1], 10) : 99999;
  }
  mediaStyles.sort((a, b) => mediaPriority(a.sel) - mediaPriority(b.sel));
  for (const {
    sel,
    content
  } of mediaStyles) {
    cssString += `${sel}{`;
    for (const subSel in content) {
      cssString += `${subSel}{${content[subSel].trim().replace(/\n/g, "")}}`;
    }
    cssString += "}";
  }
  return cssString.trim();
}

/**
 * Generate CSS string from style object with SCSS-like syntax (NO CACHE)
 * This is the original non-cached version. Use twsx() for cached version.
 * Supports nested selectors, state variants, responsive variants, and @css directives
 * @param {Object} obj - Object with SCSS-like style format
 * @param {Object} [options] - Additional options, e.g. { inject: true/false }
 * @returns {string} Generated CSS string
 */
function twsxNoCache(obj) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const totalMarker = performanceMonitor.start("twsx:total");
  try {
    var _options$theme2, _userConfigData$theme2;
    if (!obj || typeof obj !== "object") {
      logger.warn("twsx: Expected an object but received:", obj);
      return "";
    }
    const {
      inject = true
    } = options;
    const styles = {};

    // Create walk function with closure over styles
    function walk(selector, val) {
      walkStyleTree(selector, val, styles, walk);
    }

    // Enhanced selector processing to handle responsive breakpoints
    const enhancedObj = {};
    for (const selector in obj) {
      const val = obj[selector];

      // Check if selector starts with breakpoint (e.g., 'md:.title')
      const breakpointMatch = selector.match(/^(sm|md|lg|xl|2xl):(.+)$/);
      if (breakpointMatch) {
        const [, breakpoint, baseSelector] = breakpointMatch;
        if (typeof val === "string") {
          // Convert 'md:.title': 'text-lg' to '.title': 'md:text-lg'
          if (!enhancedObj[baseSelector]) {
            enhancedObj[baseSelector] = "";
          }

          // Add responsive classes to the base selector
          const responsiveClasses = val.split(" ").map(cls => `${breakpoint}:${cls}`).join(" ");
          enhancedObj[baseSelector] += (enhancedObj[baseSelector] ? " " : "") + responsiveClasses;
        } else {
          // For non-string values (objects, arrays), keep original structure
          enhancedObj[selector] = val;
        }
      } else {
        // Regular selector - keep as is
        enhancedObj[selector] = val;
      }
    }

    // Flatten the enhanced input object
    const flattered = performanceMonitor.measure(() => flattenStyleObject(enhancedObj), "twsx:flatten");

    // Process each selector
    const processMarker = performanceMonitor.start("twsx:process");
    for (const selector in flattered) {
      const val = flattered[selector];

      // Handle media queries specially - don't process through walk
      if (selector.startsWith("@media")) {
        // Media query should have nested selectors with Tailwind classes
        if (typeof val === "object" && !Array.isArray(val)) {
          // Initialize media query in styles
          if (!styles[selector]) {
            styles[selector] = {};
          }

          // Process each selector within the media query
          for (const innerSelector in val) {
            const innerVal = val[innerSelector];
            const baseClass = typeof innerVal === "string" ? expandGroupedClass(innerVal) : "";

            // Process Tailwind classes for this selector
            if (baseClass) {
              for (const cls of baseClass.split(" ")) {
                if (cls.trim()) {
                  processClass(cls, innerSelector, styles[selector]);
                }
              }
            }
          }
        }
        continue;
      }
      let baseClass = "";
      const nested = {};
      if (typeof val === "string") {
        // Handle @css string directive: '@css { ... }'
        const trimmedVal = val.trim();
        if (trimmedVal.startsWith('@css')) {
          const cssMatch = trimmedVal.match(/^@css\s*\{([\s\S]*)\}\s*$/);
          if (cssMatch) {
            const rawCss = cssMatch[1].trim();
            styles[selector] = styles[selector] || '';
            styles[selector] += rawCss.split(';').filter(d => d.trim()).map(d => d.trim() + ';').join(' ') + '\n';
            continue;
          }
        }
        // Check if this is a @css property value - if so, don't process through expandGroupedClass
        if (selector.includes(" @css ")) {
          // This is a CSS property value from @css flattening - keep as-is
          baseClass = val;
        } else {
          // Regular Tailwind class - process normally
          baseClass = expandGroupedClass(val);
        }
      } else if (Array.isArray(val)) {
        for (const item of val) {
          if (typeof item === "string") {
            baseClass += (baseClass ? " " : "") + expandGroupedClass(item);
          } else if (typeof item === "object" && item !== null) {
            Object.assign(nested, item);
          }
        }
      }
      walk(selector, [baseClass, nested]);
    }
    performanceMonitor.end(processMarker);

    // Generate CSS string
    const cssString = performanceMonitor.measure(() => generateCssString(styles), "twsx:generate");

    // Smart keyframe injection - only inject what's used and not already injected
    const keyframesMarker = performanceMonitor.start("twsx:keyframes");

    // Scan CSS for animation names (support camelCase like fadeIn, slideUp)
    const usedAnimations = new Set();
    ANIMATION_NAME_REGEX.lastIndex = 0; // Reset global regex
    let match;
    while ((match = ANIMATION_NAME_REGEX.exec(cssString)) !== null) {
      const animName = match[1];
      // Check both original case and lowercase
      if (BUILTIN_KEYFRAMES[animName]) {
        usedAnimations.add(animName);
      } else if (BUILTIN_KEYFRAMES[animName.toLowerCase()]) {
        usedAnimations.add(animName.toLowerCase());
      }
    }

    // Filter out already injected keyframes
    const newKeyframes = [...usedAnimations].filter(name => !_injectedKeyframes.has(name));

    // Mark as injected
    newKeyframes.forEach(name => _injectedKeyframes.add(name));

    // Generate minified keyframes CSS only for new ones
    const keyframesCSS = generateMinifiedKeyframes(newKeyframes);

    // Also check for custom keyframes from user config
    const userConfigData = getConfig();
    const mergedOptions = {
      ...options,
      theme: {
        ...options.theme,
        ...userConfigData.theme,
        extend: {
          ...((_options$theme2 = options.theme) === null || _options$theme2 === void 0 ? void 0 : _options$theme2.extend),
          ...((_userConfigData$theme2 = userConfigData.theme) === null || _userConfigData$theme2 === void 0 ? void 0 : _userConfigData$theme2.extend)
        }
      }
    };
    const configOptions = getConfigOptions(mergedOptions, Object.keys(plugins));
    const {
      keyframes = {}
    } = configOptions.theme || {};
    let customKeyframesCSS = "";
    for (const [name, keyframe] of Object.entries(keyframes)) {
      // Skip if already in built-in keyframes or already injected
      if (BUILTIN_KEYFRAMES[name] || _injectedKeyframes.has(name)) continue;

      // Check if this custom keyframe is used
      const customRegex = new RegExp(`animation(?:-name)?:\\s*${name}`, "i");
      if (!customRegex.test(cssString)) continue;
      _injectedKeyframes.add(name);

      // Generate minified custom keyframe
      customKeyframesCSS += `@keyframes ${name}{`;
      for (const [percentage, styles] of Object.entries(keyframe)) {
        customKeyframesCSS += `${percentage}{`;
        for (const [prop, value] of Object.entries(styles)) {
          const cssProp = prop.replace(UPPERCASE_LETTER_REGEX, "-$1").toLowerCase();
          customKeyframesCSS += `${cssProp}:${value};`;
        }
        customKeyframesCSS += "}";
      }
      customKeyframesCSS += "}";
    }
    performanceMonitor.end(keyframesMarker);

    // Combine keyframes and regular CSS
    const finalCSS = keyframesCSS + customKeyframesCSS + cssString;

    // Auto-inject if needed
    if (inject && typeof window !== "undefined" && typeof document !== "undefined") {
      performanceMonitor.measure(() => autoInjectCss(finalCSS), "twsx:inject");
    }
    performanceMonitor.end(totalMarker);
    return finalCSS;
  } catch (error) {
    performanceMonitor.end(totalMarker);
    handleError(error, {
      obj,
      options
    });
    return "";
  }
}

/**
 * Create a variant-based style generator (NO CACHE)
 * This is the original non-cached version. Use twsxVariants() for cached version.
 * Supports base styles, variants, compound variants, and default variants
 *
 * @param {Object} config - Configuration object
 * @param {string} config.base - Base Tailwind classes applied to all variants
 * @param {Object} config.variants - Variant definitions with their options
 * @param {Array} config.compoundVariants - Compound variant rules for multi-variant combinations
 * @param {Object} config.defaultVariants - Default variant values
 * @returns {Function} A function that accepts variant props and returns merged classes
 *
 * @example
 * const button = twsxVariantsNoCache({
 *   base: 'px-4 py-2 rounded font-medium',
 *   variants: {
 *     color: {
 *       primary: 'bg-blue-500 text-white',
 *       secondary: 'bg-gray-500 text-white'
 *     },
 *     size: {
 *       sm: 'text-sm',
 *       lg: 'text-lg'
 *     }
 *   },
 *   compoundVariants: [
 *     { color: 'primary', size: 'lg', class: 'font-bold shadow-lg' }
 *   ],
 *   defaultVariants: {
 *     color: 'primary',
 *     size: 'sm'
 *   }
 * });
 *
 * // Usage:
 * button({ color: 'primary', size: 'lg' }) // Returns merged classes
 */
function twsxVariantsNoCache(className) {
  let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    base = "",
    variants = {},
    compoundVariants = [],
    defaultVariants = {},
    nested = {}
  } = config;

  /**
   * Check if a compound variant matches the current props
   * @param {Object} compound - Compound variant definition
   * @param {Object} props - Current variant props
   * @returns {boolean}
   */
  function matchesCompoundVariant(compound, props) {
    for (const key in compound) {
      if (key === "class" || key === "className") continue;
      const compoundValue = compound[key];
      const propValue = props[key];

      // Handle array values in compound (match any)
      if (Array.isArray(compoundValue)) {
        if (!compoundValue.includes(propValue)) return false;
      } else {
        // Handle boolean variants - convert string 'true'/'false' to boolean
        const normalizedCompound = compoundValue === "true" ? true : compoundValue === "false" ? false : compoundValue;
        const normalizedProp = propValue === "true" ? true : propValue === "false" ? false : propValue;
        if (normalizedCompound !== normalizedProp) return false;
      }
    }
    return true;
  }

  /**
   * Merge multiple class strings with conflict resolution
   * Later classes override earlier ones for the same CSS property
   * @param  {...string} classStrings - Class strings to merge
   * @returns {string}
   */
  function mergeClasses() {
    const result = [];
    const propertyMap = new Map(); // Track index by conflict key

    /**
     * Extract conflict key from Tailwind class
     * Classes that affect the same CSS property should have the same key
     */
    function getConflictKey(cls) {
      // Extract variant prefix (hover:, focus:, etc.)
      const variantMatch = cls.match(/^((?:[a-z-]+:)*)/);
      const variant = variantMatch ? variantMatch[1] : "";
      const baseClass = cls.slice(variant.length);

      // Check if it's a prefixed standalone (e.g., bg-transparent, text-transparent)
      const prefixedStandalone = baseClass.match(/^([a-z]+)-(transparent|current|inherit|auto)$/);
      if (prefixedStandalone) {
        const prefix = prefixedStandalone[1];
        return variant + prefix;
      }

      // Handle standalone utilities (no prefix)
      const standaloneGroups = {
        "inline-flex": "display",
        "inline-block": "display",
        inline: "display",
        block: "display",
        flex: "display",
        grid: "display",
        hidden: "display",
        static: "position",
        fixed: "position",
        absolute: "position",
        relative: "position",
        sticky: "position",
        visible: "visibility",
        invisible: "visibility",
        underline: "text-decoration",
        "line-through": "text-decoration",
        "no-underline": "text-decoration",
        uppercase: "text-transform",
        lowercase: "text-transform",
        capitalize: "text-transform",
        "normal-case": "text-transform",
        truncate: "text-overflow",
        italic: "font-style",
        "not-italic": "font-style",
        antialiased: "font-smoothing",
        "subpixel-antialiased": "font-smoothing"
      };
      if (standaloneGroups[baseClass]) {
        return variant + standaloneGroups[baseClass];
      }

      // Match pattern: prefix-value or prefix-modifier-value
      // bg-blue-500, text-xl, px-4, rounded-lg, shadow-md, border-2, etc.
      const match = baseClass.match(/^([a-z]+)-(.+)$/);
      if (match) {
        const prefix = match[1];
        const value = match[2];

        // Group related prefixes
        const prefixGroups = {
          // Background
          bg: "bg",
          // Text color vs text size
          text: /^(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/.test(value) ? "text-size" : "text-color",
          // Padding
          p: "p",
          px: "px",
          py: "py",
          pt: "pt",
          pb: "pb",
          pl: "pl",
          pr: "pr",
          // Margin
          m: "m",
          mx: "mx",
          my: "my",
          mt: "mt",
          mb: "mb",
          ml: "ml",
          mr: "mr",
          // Sizing
          w: "w",
          h: "h",
          min: baseClass.startsWith("min-w") ? "min-w" : "min-h",
          max: baseClass.startsWith("max-w") ? "max-w" : "max-h",
          // Border width vs color
          border: /^(\d|t-|b-|l-|r-|x-|y-)/.test(value) ? "border-width" : /^(solid|dashed|dotted|double|none|hidden)$/.test(value) ? "border-style" : "border-color",
          rounded: "rounded",
          // Effects
          shadow: "shadow",
          opacity: "opacity",
          // Typography
          font: /^(sans|serif|mono)$/.test(value) ? "font-family" : "font-weight",
          leading: "leading",
          tracking: "tracking",
          // Layout
          flex: "flex",
          grid: "grid",
          gap: "gap",
          justify: "justify",
          items: "items",
          self: "self",
          place: "place",
          // Position
          top: "top",
          bottom: "bottom",
          left: "left",
          right: "right",
          inset: "inset",
          z: "z",
          // Cursor
          cursor: "cursor",
          // Pointer events
          pointer: "pointer-events",
          // Transform
          scale: "scale",
          rotate: "rotate",
          translate: "translate",
          skew: "skew",
          // Transition
          transition: "transition",
          duration: "duration",
          ease: "ease",
          delay: "delay",
          // Ring
          ring: /^(\d|inset)/.test(value) ? "ring-width" : /^offset/.test(value) ? "ring-offset" : "ring-color",
          // Outline
          outline: /^(\d|none)/.test(value) ? "outline-width" : /^(dashed|dotted|double|solid)$/.test(value) ? "outline-style" : /^offset/.test(value) ? "outline-offset" : "outline-color",
          // Overflow
          overflow: "overflow",
          // Object
          object: "object",
          // Aspect
          aspect: "aspect",
          // Underline
          underline: "underline-offset",
          // Decoration
          decoration: "decoration",
          // Accent
          accent: "accent",
          // Caret
          caret: "caret",
          // Fill & Stroke
          fill: "fill",
          stroke: /^\d/.test(value) ? "stroke-width" : "stroke-color",
          // Backdrop
          backdrop: "backdrop",
          // Columns
          columns: "columns",
          col: "col",
          row: "row",
          // Order
          order: "order",
          // Grow/Shrink
          grow: "grow",
          shrink: "shrink",
          basis: "basis",
          // Content
          content: "content",
          // List
          list: "list",
          // Scroll
          scroll: "scroll",
          // Snap
          snap: "snap",
          // Touch
          touch: "touch",
          // Select
          select: "select",
          // Will change
          will: "will-change",
          // Appearance
          appearance: "appearance",
          // Break
          break: "break",
          // Hyphens
          hyphens: "hyphens",
          // Whitespace
          whitespace: "whitespace",
          // Word break
          word: "word-break",
          // Overscroll
          overscroll: "overscroll",
          // Resize
          resize: "resize",
          // Float
          float: "float",
          // Clear
          clear: "clear",
          // Isolation
          isolation: "isolation",
          // Mix blend
          mix: "mix-blend",
          // Background blend
          bg: "bg",
          // Filter
          filter: "filter",
          blur: "blur",
          brightness: "brightness",
          contrast: "contrast",
          grayscale: "grayscale",
          hue: "hue-rotate",
          invert: "invert",
          saturate: "saturate",
          sepia: "sepia",
          drop: "drop-shadow"
        };
        const group = prefixGroups[prefix] || prefix;
        return variant + group;
      }
      return null; // No conflict tracking
    }
    for (var _len2 = arguments.length, classStrings = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      classStrings[_key2] = arguments[_key2];
    }
    for (const str of classStrings) {
      if (!str) continue;
      const classes = str.trim().split(/\s+/);
      for (const cls of classes) {
        if (!cls) continue;
        const conflictKey = getConflictKey(cls);
        if (conflictKey) {
          // Remove previous class with same conflict key
          const prevIndex = propertyMap.get(conflictKey);
          if (prevIndex !== undefined) {
            result[prevIndex] = null; // Mark for removal
          }
          propertyMap.set(conflictKey, result.length);
        }
        result.push(cls);
      }
    }
    return result.filter(Boolean).join(" ");
  }

  /**
   * Generate classes for a specific variant combination
   * @param {Object} props - Variant props
   * @returns {string} Merged Tailwind classes
   */
  function generateClasses() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // Merge props with defaults
    const mergedProps = {
      ...defaultVariants,
      ...props
    };

    // Start with base classes
    const classes = [base];

    // Add variant classes
    for (const variantKey in variants) {
      const variantValue = mergedProps[variantKey];
      const variantOptions = variants[variantKey];
      if (variantValue !== undefined && variantOptions[variantValue]) {
        classes.push(variantOptions[variantValue]);
      }
    }

    // Add compound variant classes
    for (const compound of compoundVariants) {
      if (matchesCompoundVariant(compound, mergedProps)) {
        classes.push(compound.class || compound.className || "");
      }
    }

    // Merge all classes
    return mergeClasses(...classes);
  }

  // If className is provided, auto-generate and inject CSS
  if (className) {
    const baseClassName = className.startsWith(".") ? className.slice(1) : className;
    const baseCss = {};
    const variantCss = {};

    // Get all variant keys and their options
    const variantKeys = Object.keys(variants);

    // Helper to generate all combinations
    function generateCombinations(keys) {
      let current = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (keys.length === 0) {
        // Generate class name from current combination
        const parts = [baseClassName];
        let isBaseOnly = true;
        for (const key of variantKeys) {
          if (current[key] !== undefined && current[key] !== defaultVariants[key]) {
            isBaseOnly = false;
            // Skip boolean 'false' values
            if (current[key] === false || current[key] === "false") continue;
            // For boolean 'true', just add the key name
            if (current[key] === true || current[key] === "true") {
              parts.push(key);
            } else {
              parts.push(current[key]);
            }
          }
        }
        const selector = "." + parts.join("-");
        const classes = generateClasses(current);

        // Separate base class from variant classes
        if (isBaseOnly) {
          baseCss[selector] = classes;
        } else {
          variantCss[selector] = classes;
        }
        return;
      }
      const [firstKey, ...restKeys] = keys;
      const options = variants[firstKey];

      // If this variant has no default, also generate without it (undefined)
      const hasDefault = defaultVariants[firstKey] !== undefined;
      if (!hasDefault) {
        // Generate combinations without this variant
        generateCombinations(restKeys, current);
      }
      for (const optionValue of Object.keys(options)) {
        generateCombinations(restKeys, {
          ...current,
          [firstKey]: optionValue
        });
      }
    }

    // Generate all combinations
    generateCombinations(variantKeys);

    // Inject base CSS first, then variant CSS (order matters for specificity)
    twsx(baseCss);
    twsx(variantCss);

    // Handle nested selectors - generate CSS for child elements
    if (Object.keys(nested).length > 0) {
      const nestedCss = {};
      for (const [nestedSelector, nestedClasses] of Object.entries(nested)) {
        // Build full selector: .alert .icon or .alert.icon (if starts with &)
        let fullSelector;
        if (nestedSelector.startsWith("&")) {
          // &.active -> .alert.active (attached to parent)
          fullSelector = className + nestedSelector.slice(1);
        } else {
          // .icon -> .alert .icon (descendant)
          fullSelector = className + " " + nestedSelector;
        }
        nestedCss[fullSelector] = nestedClasses;
      }
      twsx(nestedCss);
    }
  }

  /**
   * Build class name string from props (for component usage)
   * @param {Object} props - Variant props
   * @returns {string} Class name string like "alert alert-warning" or "btn btn-outline-danger"
   */
  function buildClassName() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (!className) {
      // No className defined, return generated classes directly
      return generateClasses(props);
    }
    const baseClass = className.startsWith(".") ? className.slice(1) : className;
    const variantParts = [baseClass];
    for (const key of Object.keys(variants)) {
      const value = props[key];
      if (value === undefined || value === null) continue;

      // Skip if it's the default value
      if (value === defaultVariants[key]) continue;

      // Handle boolean variants
      if (value === true || value === "true") {
        variantParts.push(key);
      } else if (value !== false && value !== "false") {
        variantParts.push(value);
      }
    }
    const variantClass = variantParts.join("-");

    // Always include base class for consistency and nested selector support
    // e.g., "btn btn-outline-danger" instead of just "btn-outline-danger"
    if (variantClass !== baseClass) {
      return baseClass + " " + variantClass;
    }
    return variantClass;
  }

  // Always return the buildClassName function
  return buildClassName;
}

// ============================================================================
// FAST HASHING UTILITIES FOR OBJECT CACHING
// ============================================================================

/**
 * FNV-1a hash algorithm - Fast and good distribution for strings
 * @param {string} str - String to hash
 * @returns {number} 32-bit hash
 */
function hashString(str) {
  let hash = 2166136261; // FNV offset basis
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619); // FNV prime
  }
  return hash >>> 0; // Convert to unsigned 32-bit
}

/**
 * Fast deep hash for objects - Optimized for style objects
 * Strategy:
 * 1. Use object identity (WeakMap) for exact same object references
 * 2. For different objects, create stable hash from sorted keys + values
 * 3. Cache hash per object to avoid recomputation
 *
 * @param {any} obj - Object to hash
 * @param {Object} options - Additional options to include in hash
 * @returns {string} Hash key for caching
 */
function fastObjectHash(obj) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // Handle primitives
  if (obj === null || obj === undefined) return "null";
  if (typeof obj !== "object") return String(obj);

  // Try object identity cache first (FASTEST - O(1))
  const identityKey = _objectIdentityCache.get(obj);
  if (identityKey) {
    // Include options in key if provided
    return options && Object.keys(options).length > 0 ? `${identityKey}:${JSON.stringify(options)}` : identityKey;
  }

  // Generate hash from object structure
  const parts = [];

  // Collect keys and sort for stability
  const keys = Object.keys(obj).sort();
  for (const key of keys) {
    const value = obj[key];
    if (value && typeof value === "object") {
      // Nested object: recursively hash
      parts.push(`${key}:${fastObjectHash(value)}`);
    } else {
      // Primitive: direct conversion
      parts.push(`${key}:${value}`);
    }
  }

  // Hash the concatenated string (faster than storing full string)
  const structureStr = parts.join("|");
  const hash = hashString(structureStr);

  // Create compact key: hash + length (collision detection)
  const hashKey = `h${hash}_l${keys.length}`;

  // Store in WeakMap for future O(1) lookups
  _objectIdentityCache.set(obj, hashKey);

  // Include options if provided
  return options && Object.keys(options).length > 0 ? `${hashKey}:${JSON.stringify(options)}` : hashKey;
}

/**
 * 🚀 CACHED VERSION OF TWSX (DEFAULT)
 * Generate CSS string with input-level caching for repeated calls
 * Uses fast FNV-1a hash + WeakMap for 10-100x performance improvement
 *
 * @param {Object} obj - Object with SCSS-like style format
 * @param {Object} [options] - Additional options, e.g. { inject: true/false }
 * @returns {string} Generated CSS string
 *
 * @example
 * const styles = { '.btn': 'bg-blue-500 text-white p-4' };
 * twsx(styles); // First call: ~40ms
 * twsx(styles); // Cached: ~0.1ms (100x faster!)
 *
 * // For non-cached version (rare case):
 * twsxNoCache(styles);
 */
function twsx(obj) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // Create fast hash key from input (100x faster than JSON.stringify)
  const cacheKey = fastObjectHash(obj, options);

  // Check cache first
  if (_twsxInputCache.has(cacheKey)) {
    const cached = _twsxInputCache.get(cacheKey);

    // Handle injection for cached result
    const {
      inject = true
    } = options;
    if (inject && (IS_BROWSER || _ssrCollecting)) {
      autoInjectCss(cached);
    }
    return cached;
  }

  // Cache miss: call original twsxNoCache and cache result
  const result = twsxNoCache(obj, options);
  _twsxInputCache.set(cacheKey, result);
  evictMap(_twsxInputCache);
  return result;
}

/**
 * 🚀 CACHED VERSION OF TWSXVARIANTS (DEFAULT)
 * Create variant-based style generator with config-level caching
 * Uses fast FNV-1a hash for 10-100x performance improvement
 *
 * @param {string} className - Base class name
 * @param {Object} config - Configuration object (base, variants, compoundVariants, etc.)
 * @returns {Function} A function that accepts variant props and returns merged classes
 *
 * @example
 * const button = twsxVariants('btn', {
 *   variants: { color: { primary: {...}, secondary: {...} } }
 * });
 * // First call: ~50ms to generate function
 * // Subsequent calls with same config: ~0.1ms (returns cached function)
 *
 * // For non-cached version (rare case):
 * twsxVariantsNoCache('btn', config);
 */
function twsxVariants(className) {
  let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // Create fast hash key from className and config (100x faster than JSON.stringify)
  const cacheKey = `${className}:${fastObjectHash(config)}`;

  // Check cache first
  if (_twsxVariantsResultCache.has(cacheKey)) {
    return _twsxVariantsResultCache.get(cacheKey);
  }

  // Cache miss: call original twsxVariantsNoCache and cache result
  const result = twsxVariantsNoCache(className, config);
  _twsxVariantsResultCache.set(cacheKey, result);
  evictMap(_twsxVariantsResultCache);
  return result;
}

// Simple hashCode function for CSS deduplication
function getCssHash(str) {
  let hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

// Enhanced auto-inject CSS with performance monitoring & SSR support
const injectedCssHashSet = new Set();
function autoInjectCss(cssString) {
  const marker = performanceMonitor.start("css:inject");
  try {
    // SSR mode: collect CSS strings instead of DOM injection
    if (_ssrCollecting) ;
    if (IS_BROWSER) {
      const cssHash = getCssHash(cssString);
      if (injectedCssHashSet.has(cssHash)) {
        performanceMonitor.end(marker);
        return;
      }
      injectedCssHashSet.add(cssHash);
      evictSet(injectedCssHashSet);
      let styleTag = document.getElementById("twsx-auto-style");
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "twsx-auto-style";
        styleTag.setAttribute("data-twsx", "");
        document.head.appendChild(styleTag);
      }

      // Use insertRule for better performance (avoids full stylesheet reparse)
      try {
        const sheet = styleTag.sheet;
        if (sheet) {
          // Split CSS by closing brace to insert individual rules
          const rules = cssString.split('}').filter(r => r.trim());
          for (const rule of rules) {
            const trimmed = rule.trim();
            if (trimmed) {
              try {
                sheet.insertRule(trimmed + '}', sheet.cssRules.length);
              } catch (e) {
                // Fallback for complex rules (e.g., @keyframes, @media)
                styleTag.textContent += `\n${trimmed}}`;
              }
            }
          }
        } else {
          styleTag.textContent += `\n${cssString}`;
        }
      } catch (e) {
        // Ultimate fallback
        styleTag.textContent += `\n${cssString}`;
      }

      // Log injection stats periodically
      if (injectedCssHashSet.size % 10 === 0) {
        logger.debug(`CSS injection stats: ${injectedCssHashSet.size} unique stylesheets injected`);
      }
    }
    performanceMonitor.end(marker);
  } catch (error) {
    performanceMonitor.end(marker);
    logger.error("Error injecting CSS:", error);
  }
}

exports.twsxVariants = twsxVariants;
