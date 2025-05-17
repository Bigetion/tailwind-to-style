'use strict';

const theme = {
  accentColor: ({ theme }) => ({
    ...theme("colors"),
    auto: "auto",
    custom: "custom_value",
  }),
  aspectRatio: {
    auto: "auto",
    square: "1 / 1",
    video: "16 / 9",
    custom: "custom_value",
  },
  backdropBlur: ({ theme }) => theme("blur"),
  backdropBrightness: ({ theme }) => theme("brightness"),
  backdropContrast: ({ theme }) => theme("contrast"),
  backdropGrayscale: ({ theme }) => theme("grayscale"),
  backdropHueRotate: ({ theme }) => theme("hueRotate"),
  backdropInvert: ({ theme }) => theme("invert"),
  backdropOpacity: ({ theme }) => theme("opacity"),
  backdropSaturate: ({ theme }) => theme("saturate"),
  backdropSepia: ({ theme }) => theme("sepia"),
  backgroundColor: ({ theme }) => theme("colors"),
  backgroundImage: {
    none: "none",
    "gradient-to-t": "linear-gradient(to top, var(--gradient-color-stops))",
    "gradient-to-tr":
      "linear-gradient(to top right, var(--gradient-color-stops))",
    "gradient-to-r": "linear-gradient(to right, var(--gradient-color-stops))",
    "gradient-to-br":
      "linear-gradient(to bottom right, var(--gradient-color-stops))",
    "gradient-to-b": "linear-gradient(to bottom, var(--gradient-color-stops))",
    "gradient-to-bl":
      "linear-gradient(to bottom left, var(--gradient-color-stops))",
    "gradient-to-l": "linear-gradient(to left, var(--gradient-color-stops))",
    "gradient-to-tl":
      "linear-gradient(to top left, var(--gradient-color-stops))",
  },
  backgroundOpacity: ({ theme }) => theme("opacity"),
  backgroundPosition: {
    bottom: "bottom",
    center: "center",
    left: "left",
    "left-bottom": "left bottom",
    "left-top": "left top",
    right: "right",
    "right-bottom": "right bottom",
    "right-top": "right top",
    top: "top",
  },
  backgroundSize: {
    auto: "auto",
    cover: "cover",
    contain: "contain",
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
    custom: "custom_value",
  },
  borderColor: ({ theme }) => ({
    ...theme("colors"),
    DEFAULT: "#e5e7eb",
  }),
  borderOpacity: ({ theme }) => theme("opacity"),
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
    custom: "custom_value",
  },
  borderSpacing: ({ theme }) => ({
    ...theme("spacing"),
  }),
  borderWidth: {
    DEFAULT: "1px",
    0: "0px",
    2: "2px",
    4: "4px",
    8: "8px",
    custom: "custom_value",
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
    custom: "custom_value",
  },
  boxShadowColor: ({ theme }) => theme("colors"),
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
    custom: "custom_value",
  },
  caretColor: ({ theme }) => theme("colors"),
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
      900: "#0f172a",
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
      900: "#111827",
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
      900: "#18181b",
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
      900: "#171717",
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
      900: "#1c1917",
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
      900: "#7f1d1d",
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
      900: "#7c2d12",
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
      900: "#78350f",
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
      900: "#713f12",
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
      900: "#365314",
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
      900: "#14532d",
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
      900: "#064e3b",
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
      900: "#134e4a",
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
      900: "#164e63",
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
      900: "#0c4a6e",
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
      900: "#1e3a8a",
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
      900: "#312e81",
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
      900: "#4c1d95",
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
      900: "#581c87",
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
      900: "#701a75",
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
      900: "#831843",
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
      900: "#881337",
    },
    custom: "custom_value",
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
    custom: "custom_value",
  },
  content: {
    none: "none",
    custom: "custom_value",
  },
  contrast: {
    0: "0",
    50: ".5",
    75: ".75",
    100: "1",
    125: "1.25",
    150: "1.5",
    200: "2",
    custom: "custom_value",
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
    "zoom-out": "zoom-out",
  },
  divideColor: ({ theme }) => theme("borderColor"),
  divideOpacity: ({ theme }) => theme("borderOpacity"),
  divideWidth: ({ theme }) => theme("borderWidth"),
  dropShadow: {
    sm: "0 1px 1px rgb(0 0 0 / 0.05)",
    DEFAULT: "0 1px 2px rgb(0 0 0 / 0.1) , 0 1px 1px rgb(0 0 0 / 0.06)",
    md: "0 4px 3px rgb(0 0 0 / 0.07) , 0 2px 2px rgb(0 0 0 / 0.06)",
    lg: "0 10px 8px rgb(0 0 0 / 0.04) , 0 4px 3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 13px rgb(0 0 0 / 0.03) , 0 8px 5px rgb(0 0 0 / 0.08)",
    "2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
    none: "0 0 #0000",
  },
  fill: ({ theme }) => ({
    none: "none",
    ...theme("colors"),
  }),
  flex: {
    1: "1 1 0%",
    auto: "1 1 auto",
    initial: "0 1 auto",
    none: "none",
  },
  flexBasis: ({ theme }) => ({
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
  }),
  flexGrow: {
    0: "0",
    DEFAULT: "1",
  },
  flexShrink: {
    0: "0",
    DEFAULT: "1",
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
    custom: "custom_value",
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
    custom: "custom_value",
  },
  gap: ({ theme }) => theme("spacing"),
  gradientColorStops: ({ theme }) => theme("colors"),
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
    "100%": "100%",
  },
  grayscale: {
    0: "0",
    DEFAULT: "100%",
  },
  gridAutoColumns: {
    auto: "auto",
    min: "min-content",
    max: "max-content",
    fr: "minmax(0, 1fr)",
  },
  gridAutoRows: {
    auto: "auto",
    min: "min-content",
    max: "max-content",
    fr: "minmax(0, 1fr)",
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
    "span-full": "1 / -1",
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
    13: "13",
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
    13: "13",
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
    "span-full": "1 / -1",
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
    13: "13",
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
    13: "13",
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
    12: "repeat(12, minmax(0, 1fr))",
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
    12: "repeat(12, minmax(0, 1fr))",
  },
  height: ({ theme }) => ({
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
    custom: "custom_value",
  }),
  hueRotate: {
    0: "0deg",
    15: "15deg",
    30: "30deg",
    60: "60deg",
    90: "90deg",
    180: "180deg",
  },
  inset: ({ theme }) => ({
    auto: "auto",
    ...theme("spacing"),
    "1/2": "50%",
    "1/3": "33.333333%",
    "2/3": "66.666667%",
    "1/4": "25%",
    "2/4": "50%",
    "3/4": "75%",
    full: "100%",
  }),
  invert: {
    0: "0",
    DEFAULT: "100%",
  },
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
    custom: "custom_value",
  },
  lineClamp: {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    custom: "custom_value",
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
    custom: "custom_value",
  },
  listStyleType: {
    none: "none",
    disc: "disc",
    decimal: "decimal",
  },
  margin: ({ theme }) => ({
    auto: "auto",
    ...theme("spacing"),
  }),
  maxHeight: ({ theme }) => ({
    ...theme("spacing"),
    none: "none",
    full: "100%",
    screen: "100vh",
    svh: "100svh",
    lvh: "100lvh",
    dvh: "100dvh",
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
  }),
  maxWidth: ({ theme }) => ({
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
    prose: "65ch",
  }),
  minHeight: ({ theme }) => ({
    ...theme("spacing"),
    full: "100%",
    screen: "100vh",
    svh: "100svh",
    lvh: "100lvh",
    dvh: "100dvh",
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
  }),
  minWidth: ({ theme }) => ({
    ...theme("spacing"),
    full: "100%",
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
  }),
  objectPosition: {
    bottom: "bottom",
    center: "center",
    left: "left",
    "left-bottom": "left bottom",
    "left-top": "left top",
    right: "right",
    "right-bottom": "right bottom",
    "right-top": "right top",
    top: "top",
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
    custom: "custom_value",
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
    custom: "custom_value",
  },
  outlineColor: ({ theme }) => theme("colors"),
  outlineOffset: {
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px",
    custom: "custom_value",
  },
  outlineOpacity: ({ theme }) => theme("opacity"),
  outlineWidth: {
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px",
    custom: "custom_value",
  },
  padding: ({ theme }) => theme("spacing"),
  ringColor: ({ theme }) => ({
    DEFAULT: "#3b82f6",
    ...theme("colors"),
  }),
  ringOffsetColor: ({ theme }) => theme("colors"),
  ringOffsetWidth: {
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px",
    custom: "custom_value",
  },
  ringOpacity: ({ theme }) => ({
    DEFAULT: "0.5",
    ...theme("opacity"),
  }),
  ringWidth: {
    DEFAULT: "3px",
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px",
    custom: "custom_value",
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
    custom: "custom_value",
  },
  saturate: {
    0: "0",
    50: ".5",
    100: "1",
    150: "1.5",
    200: "2",
    custom: "custom_value",
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
    custom: "custom_value",
  },
  scrollMargin: ({ theme }) => ({
    ...theme("spacing"),
  }),
  scrollPadding: ({ theme }) => theme("spacing"),
  sepia: {
    0: "0",
    DEFAULT: "100%",
  },
  skew: {
    0: "0deg",
    1: "1deg",
    2: "2deg",
    3: "3deg",
    6: "6deg",
    12: "12deg",
    custom: "custom_value",
  },
  space: ({ theme }) => ({
    ...theme("spacing"),
  }),
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
    custom: "custom_value",
  },
  stroke: ({ theme }) => ({
    none: "none",
    ...theme("colors"),
  }),
  strokeWidth: {
    0: "0",
    1: "1",
    2: "2",
    custom: "custom_value",
  },
  textColor: ({ theme }) => theme("colors"),
  textDecorationColor: ({ theme }) => theme("colors"),
  textDecorationThickness: {
    auto: "auto",
    "from-font": "from-font",
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px",
    custom: "custom_value",
  },
  textIndent: ({ theme }) => ({
    ...theme("spacing"),
  }),
  textOpacity: ({ theme }) => theme("opacity"),
  textShadowBlur: ({ theme }) => theme("blur"),
  textShadowColor: ({ theme }) => ({
    ...theme("colors"),
    DEFAULT: "#e5e7eb",
  }),
  textShadowOpacity: ({ theme }) => theme("opacity"),
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
    custom: "custom_value",
  },
  textShadowY: ({ theme }) => theme("textShadowX"),
  textUnderlineOffset: {
    auto: "auto",
    0: "0px",
    1: "1px",
    2: "2px",
    4: "4px",
    8: "8px",
    custom: "custom_value",
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
    "top-left": "top left",
  },
  translate: ({ theme }) => ({
    ...theme("spacing"),
    "1/2": "50%",
    "1/3": "33.333333%",
    "2/3": "66.666667%",
    "1/4": "25%",
    "2/4": "50%",
    "3/4": "75%",
    full: "100%",
  }),
  size: ({ theme }) => ({
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
    fit: "fit-content",
  }),
  width: ({ theme }) => ({
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
    fit: "fit-content",
  }),
  willChange: {
    auto: "auto",
    scroll: "scroll-position",
    contents: "contents",
    transform: "transform",
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
    custom: "custom_value",
  },
};

const configOptions = {
  theme,
};

function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
}

function getConfigOptions(options = {}) {
  const { theme = {} } = options;

  const { extend: themeExtend = {} } = theme;

  const newTheme = {};
  const themeKeys = Object.keys(configOptions.theme);

  themeKeys.forEach((key) => {
    newTheme[key] = theme[key] || configOptions.theme[key];
    if (isFunction(newTheme[key])) {
      newTheme[key] = newTheme[key]({
        theme: (keyRef) => {
          return configOptions.theme[keyRef];
        },
      });
    }
  });
  themeKeys.forEach((key) => {
    if (isFunction(newTheme[key])) {
      newTheme[key] = newTheme[key]({
        theme: (keyRef) => {
          return newTheme[keyRef];
        },
      });
    }
    if (themeExtend[key]) {
      newTheme[key] = Object.assign({}, newTheme[key], themeExtend[key]);
    }
  });

  return {
    prefix: "",
    ...options,
    theme: newTheme,
  };
}

function generateCssString(getCssString = () => {}) {
  let orientationPrefix = "";

  const hexToRgb = (hex) => {
    const rgba = hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (...args) =>
          "#" + args[1] + args[1] + args[2] + args[2] + args[3] + args[3]
      )
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16))
      .join(",");

    if (rgba.indexOf("NaN") >= 0) return "";
    return rgba;
  };

  const getCssByOptions = (options = {}, getStr = () => {}) => {
    let nOptions = Object.assign({}, options);
    if (Array.isArray(options)) {
      nOptions = options.reduce(
        (currentObj, value) =>
          Object.assign({}, currentObj, { [value]: value }),
        {}
      );
    }
    let str = "";
    Object.entries(nOptions).forEach(([key, value]) => {
      str += getStr(key.replace("/", `\\/`).replace(".", "\\."), value);
    });
    return str;
  };

  const getCssByColors = (colors, getStr = () => {}) => {
    let str = "";
    Object.entries(colors).forEach(([key1, value1]) => {
      if (typeof value1 === "string") {
        str += `${getStr(key1, value1, hexToRgb(value1))} `;
      } else if (typeof value1 === "object") {
        Object.entries(value1).forEach(([key2, value2]) => {
          str += `${getStr(`${key1}-${key2}`, value2, hexToRgb(value2))} `;
        });
      }
    });
    return str;
  };

  const isValidCssColor = (value) => {
    if (typeof value !== "string") return false;

    const hexColor = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    const rgbColor = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
    const rgbaColor = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0?\.\d+)\s*\)$/;
    const hslColor = /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/;
    const hslaColor = /^hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*(0|1|0?\.\d+)\s*\)$/;

    return [
      hexColor.test(value),
      rgbColor.test(value),
      rgbaColor.test(value),
      hslColor.test(value),
      hslaColor.test(value),
    ].includes(true);
  };

  const cssString = getCssString({
    orientationPrefix,
    getCssByOptions,
    getCssByColors,
    isValidCssColor,
  });

  return cssString;
}

function generator$2r(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}accent`;

  const { accentColor, opacity = {} } = theme;

  const responsiveCssString = generateCssString(
    ({ getCssByColors, getCssByOptions }) => {
      let cssString = getCssByColors(accentColor, (key, value, rgbValue) => {
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
      cssString += getCssByOptions(
        opacity,
        (key, value) => `
          ${prefix}-${key} {
            --accent-opacity: ${value};
          }
        `
      );
      return cssString;
    });

  return responsiveCssString;
}

function generator$2q(configOptions = {}) {
  const { prefix } = configOptions;

  const responsiveCssString = generateCssString(() => {
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
  });

  return responsiveCssString;
}

function generator$2p(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}content`;

  const propertyOptions = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            align-content: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$2o(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}items`;

  const propertyOptions = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    baseline: "baseline",
    stretch: "stretch",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            align-items: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$2n(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}self`;

  const propertyOptions = {
    auto: "auto",
    start: "flex-start",
    end: "flex-end",
    center: "center",
    stretch: "stretch",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            align-self: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$2m(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = ["auto", "none"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}appearance-${key} {
            appearance: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$2l(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}aspect`;

  const { spacing = {} } = theme;

  let responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      spacing,
      (key) => `
          ${prefix}-h-${key} {
            --aspect-h: ${key};
          }
          ${prefix}-w-${key} {
            position: relative;
            padding-bottom: calc(var(--aspect-h) / var(--aspect-w) * 100%);
            --aspect-w: ${key};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$2k(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}bg`;

  const propertyOptions = ["fixed", "local", "scroll"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            background-attachment: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$2j(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}bg-clip`;

  const propertyOptions = {
    border: "border-box",
    padding: "padding-box",
    content: "content-box",
    text: "text",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            -webkit-background-clip: ${value};
            background-clip: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$2i(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}bg`;

  const { backgroundColor = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors, isValidCssColor }) => {
    const cssString = getCssByColors(
      backgroundColor,
      (key, value, rgbValue) => {
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
      }
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$2h(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}bg`;

  const { backgroundImage = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      backgroundImage,
      (key, value) => `
          ${prefix}-${key} {
            background-image: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$2g(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}bg-opacity`;

  const { backgroundOpacity = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      backgroundOpacity,
      (key, value) => `
          ${prefix}-${key} {
            --bg-opacity: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$2f(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}bg-origin`;

  const propertyOptions = {
    border: "border-box",
    padding: "padding-box",
    content: "content-box",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            -webkit-background-origin: ${value};
            background-origin: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$2e(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}bg`;

  const { backgroundPosition = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      backgroundPosition,
      (key, value) => `
          ${prefix}-${key} {
            background-position: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$2d(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}bg`;

  const propertyOptions = {
    repeat: "repeat",
    "no-repeat": "no-repeat",
    "repeat-x": "repeat-x",
    "repeat-y": "repeat-y",
    "repeat-round": "round",
    "repeat-space": "space",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            background-repeat: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$2c(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}bg`;

  const { backgroundSize = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      backgroundSize,
      (key, value) => `
          ${prefix}-${key} {
            background-size: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$2b(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}blur`;
  const basePrefix = prefix.replace(globalPrefix, "");

  const { blur = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(blur, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --blur: blur(${value}) !important;
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}${key} {
            --backdrop-blur: blur(${value}) !important;
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$2a(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}border`;

  const propertyOptions = ["collapse", "separate"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            border-collapse: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$29(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}border`;

  const { borderColor = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    const cssString = getCssByColors(borderColor, (keyTmp, value, rgbValue) => {
      if (keyTmp.toLowerCase() === "default") {
        return "";
      }
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      let rgbPropertyValue = "";
      if (rgbValue) {
        rgbPropertyValue = `border-color: rgba(${rgbValue}, var(--border-opacity));`;
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
  });

  return responsiveCssString;
}

function generator$28(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}border-opacity`;

  const { borderOpacity = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      borderOpacity,
      (key, value) => `
          ${prefix}-${key} {
            --border-opacity: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$27(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}rounded`;

  const { borderRadius = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
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
  });

  return responsiveCssString;
}

function generator$26(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}border-spacing`;

  const { borderSpacing = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
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
  });

  return responsiveCssString;
}

function generator$25(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}border`;

  const propertyOptions = ["solid", "dashed", "dotted", "double", "none"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            border-style: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$24(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}border`;

  const { borderWidth = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(borderWidth, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
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
  });

  return responsiveCssString;
}

function generator$23(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}box-decoration`;

  const propertyOptions = ["slice", "clone"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            box-decoration-break: ${value};
            -webkit-box-decoration-break: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$22(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}shadow`;

  const { boxShadowColor, boxShadow = {} } = theme;

  const responsiveCssString = generateCssString(
    ({ getCssByOptions, getCssByColors }) => {
      let cssString = getCssByOptions(boxShadow, (keyTmp, value) => {
        const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
        const valueSplit = value.split(" ");
        return `
          ${prefix}${key} {
            --shadow: ${value};
            --shadow-colored: ${valueSplit
              .slice(0, 4)
              .join(" ")} var(--shadow-color);
            box-shadow: var(--ring-offset-shadow, 0 0 #0000),var(--ring-shadow, 0 0 #0000),var(--shadow);
          }
        `;
      });
      cssString += getCssByColors(boxShadowColor, (...colorArgs) => {
        const key = colorArgs[0];
        const rgbValue = colorArgs[2];
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
    });

  return responsiveCssString;
}

function generator$21(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}box`;

  const propertyOptions = {
    border: "border-box",
    content: "content-box",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            box-sizing: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$20(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}brightness`;
  const basePrefix = prefix.replace(globalPrefix, "");

  const { brightness = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(brightness, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --brightness: brightness(${value}) !important;
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}${key} {
            --backdrop-brightness: brightness(${value}) !important;
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$1$(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}caption`;

  const propertyOptions = ["top", "bottom"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            caption-side: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1_(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}caret`;

  const { caretColor, opacity = {} } = theme;

  const responsiveCssString = generateCssString(
    ({ getCssByColors, getCssByOptions }) => {
      let cssString = getCssByColors(caretColor, (key, value, rgbValue) => {
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
      cssString += getCssByOptions(
        opacity,
        (key, value) => `
          ${prefix}-${key} {
            --caret-opacity: ${value};
          }
        `
      );
      return cssString;
    });

  return responsiveCssString;
}

function generator$1Z(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}clear`;

  const propertyOptions = ["left", "right", "both", "none"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            clear: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1Y(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}content`;

  const { content = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      content,
      (key, value) => `
          ${prefix}-${key} {
            content: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1X(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}contrast`;
  const basePrefix = prefix.replace(globalPrefix, "");

  const { contrast = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(contrast, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --contrast: contrast(${value}) !important;
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}${key} {
            --backdrop-contrast: contrast(${value}) !important;
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$1W(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}cursor`;

  const propertyOptions = [
    "auto",
    "default",
    "pointer",
    "wait",
    "text",
    "move",
    "help",
    "not-allowed",
    "none",
    "context-menu",
    "progress",
    "cell",
    "crosshair",
    "vertical-text",
    "alias",
    "copy",
    "no-drop",
    "grab",
    "grabbing",
    "all-scroll",
    "col-resize",
    "row-resize",
    "n-resize",
    "e-resize",
    "s-resize",
    "w-resize",
    "ne-resize",
    "nw-resize",
    "se-resize",
    "sw-resize",
    "ew-resize",
    "ns-resize",
    "nesw-resize",
    "nwse-resize",
    "zoom-in",
    "zoom-out",
  ];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            cursor: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1V(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = [
    "block",
    "inline-block",
    "inline",
    "flex",
    "inline-flex",
    "table",
    "table-caption",
    "table-cell",
    "table-column",
    "table-column-group",
    "table-header-group",
    "table-footer-group",
    "table-row-group",
    "table-row",
    "flow-root",
    "grid",
    "inline-grid",
    "contents",
    "none",
  ];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${key === "none" ? `${prefix}hidden` : `${prefix}${key}`} {
            display: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1U(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}divide`;

  const { divideColor = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
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
  });

  return responsiveCssString;
}

function generator$1T(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}divide-opacity`;

  const { divideOpacity = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      divideOpacity,
      (key, value) => `
          ${prefix}-${key} {
            --divide-opacity: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1S(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}divide`;

  const propertyOptions = ["solid", "dashed", "dotted", "double", "none"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            border-style: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1R(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}divide`;

  const { divideWidth = {} } = theme;

  const responsiveCssString = generateCssString(() => {
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
    Object.entries(divideWidth).forEach(([key, value]) => {
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
  });

  return responsiveCssString;
}

function generator$1Q(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}drop-shadow`;

  const { dropShadow = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(dropShadow, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      const values = value.split(",").map((o) => `drop-shadow(${o.trim()})`);
      return `
          ${prefix}${key} {
            --drop-shadow:  ${values.join(" ")} !important;
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$1P(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}fill`;

  const { fill = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    const cssString = getCssByColors(fill, (key, value) => {
      return `
            ${prefix}-${key} {
              fill: ${value};
            }
          `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$1O({ prefix }) {
  return `    
  ${prefix}filter {
    --blur: ;
    --brightness: ;
    --contrast: ;
    --grayscale: ;
    --hue-rotate: ;
    --invert: ;
    --saturate: ;
    --sepia: ;
    --drop-shadow: ;
    filter: var(--blur) var(--brightness) var(--contrast) var(--grayscale) var(--hue-rotate) var(--invert) var(--saturate) var(--sepia) var(--drop-shadow);

    --backdrop-blur: ;
    --backdrop-brightness: ;
    --backdrop-contrast: ;
    --backdrop-grayscale: ;
    --backdrop-hue-rotate: ;
    --backdrop-invert: ;
    --backdrop-opacity: ;
    --backdrop-saturate: ;
    --backdrop-sepia: ;
    -webkit-backdrop-filter: var(--backdrop-blur) var(--backdrop-brightness) var(--backdrop-contrast) var(--backdrop-grayscale) var(--backdrop-hue-rotate) var(--backdrop-invert) var(--backdrop-opacity) var(--backdrop-saturate) var(--backdrop-sepia);
    backdrop-filter: var(--backdrop-blur) var(--backdrop-brightness) var(--backdrop-contrast) var(--backdrop-grayscale) var(--backdrop-hue-rotate) var(--backdrop-invert) var(--backdrop-opacity) var(--backdrop-saturate) var(--backdrop-sepia);
  }
  ${prefix}filter-none {
    filter: none;
    backdrop-filter: none;
  }
`;
}

function generator$1N(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}flex`;

  const { flex = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      flex,
      (key, value) => `
          ${prefix}-${key} {
            flex: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1M(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}basis`;

  const { flexBasis = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      flexBasis,
      (key, value) => `
          ${prefix}-${key} {
            flex-basis: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1L(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}flex`;

  const propertyOptions = {
    row: "row",
    "row-reverse": "row-reverse",
    col: "column",
    "col-reverse": "column-reverse",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            flex-direction: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1K(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}grow`;

  const { flexGrow = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      flexGrow,
      (key, value) => `
          ${key.toLowerCase() === "default" ? prefix : `${prefix}-${key}`} {
            flex-grow: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1J(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}shrink`;

  const { flexShrink = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      flexShrink,
      (key, value) => `
          ${key.toLowerCase() === "default" ? prefix : `${prefix}-${key}`} {
            flex-shrink: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1I(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}flex`;

  const propertyOptions = {
    wrap: "wrap",
    "wrap-reverse": "wrap-reverse",
    "no-wrap": "nowrap",
    nowrap: "nowrap",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            flex-wrap: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1H(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}float`;

  const propertyOptions = ["left", "right", "none"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    let cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            float: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1G(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}text`;

  const { fontSize = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      fontSize,
      (key, value) => `
          ${prefix}-${key} {
            font-size: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1F(configOptions = {}) {
  const { prefix } = configOptions;

  const responsiveCssString = generateCssString(() => {
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
  });

  return responsiveCssString;
}

function generator$1E(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = {
    italic: "italic",
    "not-italic": "normal",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}${key} {
            font-style: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1D(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = {
    "normal-nums": "normal",
    ordinal: "ordinal",
    "slashed-zero": "slashed-zero",
    "lining-nums": "lining-nums",
    "oldstyle-nums": "oldstyle-nums",
    "proportional-nums": "proportional-nums",
    "tabular-nums": "tabular-nums",
    "diagonal-fractions": "diagonal-fractions",
    "stacked-fractions": "stacked-fractions",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            font-variant-numeric: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1C(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}font`;

  const { fontWeight = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      fontWeight,
      (key, value) => `
          ${prefix}-${key} {
            font-weight: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1B(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}gap`;

  const { gap = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      gap,
      (key, value) => `
          ${prefix}-${key} {
            gap: ${value};
          }
          ${prefix}-x-${key} {
            column-gap: ${value};
          }
          ${prefix}-y-${key} {
            row-gap: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1A(configOptions = {}) {
  const { prefix, theme = {} } = configOptions;

  const { gradientColorStops = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    const cssString = getCssByColors(
      gradientColorStops,
      (key, value, rgbValue) => {
        let rgbFromPropertyValue =
          "--gradient-color-stops: var(--gradient-from-color),var(--gradient-to-color,rgba(255,255,255,0));";
        let rgbViaPropertyValue =
          "--gradient-color-stops: var(--gradient-from-color),var(--gradient-via-color),var(--gradient-to-color,rgba(255,255,255,0));";
        let rgbToPropertyValue =
          "--gradient-color-stops: var(--gradient-from-color),var(--gradient-to-color,rgba(255,255,255,0));";
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
      }
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1z(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}grayscale`;
  const basePrefix = prefix.replace(globalPrefix, "");

  const { grayscale = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(grayscale, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --grayscale: grayscale(${value}) !important;
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}${key} {
            --backdrop-grayscale: grayscale(${value}) !important;
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$1y(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  let prefix = `${globalPrefix}auto-cols`;

  const { gridAutoColumns = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      gridAutoColumns,
      (key, value) => `
          ${prefix}-${key} {
            grid-auto-columns: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1x(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}grid-flow`;

  const propertyOptions = {
    row: "row",
    col: "column",
    "row-dense": "row dense",
    "col-dense": "column dense",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            grid-auto-flow: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1w(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  let prefix = `${globalPrefix}auto-rows`;

  const { gridAutoRows = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      gridAutoRows,
      (key, value) => `
          ${prefix}-${key} {
            grid-auto-rows: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1v(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  let prefix = `${globalPrefix}col`;

  const { gridColumn = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      gridColumn,
      (key, value) => `
          ${prefix}-${key} {
            grid-column: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1u(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  let prefix = `${globalPrefix}col-end`;

  const { gridColumnEnd = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      gridColumnEnd,
      (key, value) => `
          ${prefix}-${key} {
            grid-column-end: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1t(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  let prefix = `${globalPrefix}col-start`;

  const { gridColumnStart = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      gridColumnStart,
      (key, value) => `
          ${prefix}-${key} {
            grid-column-start: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1s(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  let prefix = `${globalPrefix}row`;

  const { gridRow = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      gridRow,
      (key, value) => `
          ${prefix}-${key} {
            grid-row: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1r(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  let prefix = `${globalPrefix}row-end`;

  const { gridRowEnd = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      gridRowEnd,
      (key, value) => `
          ${prefix}-${key} {
            grid-row-end: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1q(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  let prefix = `${globalPrefix}row-start`;

  const { gridRowStart = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      gridRowStart,
      (key, value) => `
          ${prefix}-${key} {
            grid-row-start: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1p(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  let prefix = `${globalPrefix}grid-cols`;

  const { gridTemplateColumns = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    let cssString = getCssByOptions(
      gridTemplateColumns,
      (key, value) => `
          ${prefix}-${key} {
            grid-template-columns: ${
              isNaN(value) ? value : `repeat(${value}, minmax(0, 1fr))`
            };
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1o(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  let prefix = `${globalPrefix}grid-rows`;

  const { gridTemplateRows = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    let cssString = getCssByOptions(
      gridTemplateRows,
      (key, value) => `
          ${prefix}-${key} {
            grid-template-rows: ${
              isNaN(value) ? value : `repeat(${value}, minmax(0, 1fr));`
            };
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1n(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}h`;

  const { height = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      height,
      (key, value) => `
          ${prefix}-${key} {
            height: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1m(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const { hueRotate = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
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
            --hue-rotate: hue-rotate(${value}) !important;
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}-${key} {
            --backdrop-hue-rotate: hue-rotate(${value}) !important;
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$1l(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}hyphens`;

  const propertyOptions = ["none", "manual", "auto"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            -webkit-hyphens: ${value};
            hyphens: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1k(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const { inset = {} } = theme;

  Object.entries(inset).forEach(([key, value]) => {
    inset[`-${key}`] = `-${value}`.replace("--", "-");
  });

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
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
  });

  return responsiveCssString;
}

function generator$1j(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}invert`;
  const basePrefix = prefix.replace(globalPrefix, "");

  const { invert = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(invert, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --invert: invert(${value}) !important;
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}${key} {
            --backdrop-invert: invert(${value}) !important;
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$1i(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}`;

  const propertyOptions = {
    isolate: "isolate",
    "isolation-auto": "no-repeat",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}${key} {
            isolation: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1h(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}justify`;

  const propertyOptions = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            justify-content: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1g(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}justify-items`;

  const propertyOptions = ["auto", "start", "end", "center", "stretch"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            justify-items: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1f(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}justify-self`;

  const propertyOptions = ["auto", "start", "end", "center", "stretch"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            justify-self: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1e(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}tracking`;

  const { letterSpacing = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      letterSpacing,
      (key, value) => `
          ${prefix}-${key} {
            letter-spacing: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1d(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}line-clamp`;

  const { lineClamp = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      lineClamp,
      (key, value) => `
          ${prefix}-${key} {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: ${value === "none" ? "horizontal" : "vertical"};
            -webkit-line-clamp: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1c(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}leading`;

  const { lineHeight = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      lineHeight,
      (key, value) => `
          ${prefix}-${key} {
            line-height: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1b(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}list`;

  const propertyOptions = ["inside", "outside"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            list-style-position: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$1a(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}list`;

  const { listStyleType = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      listStyleType,
      (key, value) => `
          ${prefix}-${key} {
            list-style-type: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$19(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const { margin = {} } = theme;

  Object.entries(margin).forEach(([key, value]) => {
    margin[`-${key}`] = `-${value}`.replace("--", "-");
  });

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
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
  });

  return responsiveCssString;
}

function generator$18(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}max-h`;

  const { maxHeight = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      maxHeight,
      (key, value) => `
          ${prefix}-${key} {
            max-height: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$17(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}max-w`;

  const { maxWidth = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      maxWidth,
      (key, value) => `
          ${prefix}-${key} {
            max-width: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$16(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}min-h`;

  const { minHeight = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      minHeight,
      (key, value) => `
          ${prefix}-${key} {
            min-height: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$15(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}min-w`;

  const { minWidth = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      minWidth,
      (key, value) => `
          ${prefix}-${key} {
            min-width: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$14(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}mix-blend`;

  const propertyOptions = [
    "normal",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity",
    "plus-lighter",
  ];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    let cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            mix-blend-mode: ${value};
          }
        `
    );
    cssString += getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix.replace("mix", "bg")}-${key} {
            background-blend-mode: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$13(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}object`;

  const propertyOptions = ["contain", "cover", "fill", "none", "scale-down"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            object-fit: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$12(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}object`;

  const propertyOptions = [
    "bottom",
    "center",
    "left",
    "left-bottom",
    "left-top",
    "right",
    "right-bottom",
    "right-top",
    "top",
  ];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            object-position: ${value.split("-").join(" ")};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$11(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}opacity`;
  const basePrefix = prefix.replace(globalPrefix, "");

  const { opacity = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      opacity,
      (key, value) => `
          ${prefix}-${key} {
            opacity: ${value};
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}-${key} {
            --backdrop-opacity: opacity(${value});
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$10(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}order`;

  const { order = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      order,
      (key, value) => `
          ${prefix}-${key} {
            order: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$$(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}outline`;

  const { outlineColor = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    const cssString = getCssByColors(
      outlineColor,
      (keyTmp, value, rgbValue) => {
        if (keyTmp.toLowerCase() === "default") {
          return "";
        }
        const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
        let rgbPropertyValue = "";
        if (rgbValue) {
          rgbPropertyValue = `outline-color: rgba(${rgbValue}, var(--outline-opacity));`;
        }
        return `
            ${prefix}${key} {
              --outline-opacity: 1;
              outline-color: ${value};
              ${rgbPropertyValue}
            }
          `;
      }
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$_(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}outline-offset`;

  const { outlineOffset = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(outlineOffset, (key, value) => {
      return `
          ${prefix}-${key} {
            outline-offset: ${value};
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$Z(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}outline-opacity`;

  const { outlineOpacity = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(outlineOpacity, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --outline-opacity: ${value};
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$Y(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}outline`;

  const propertyOptions = ["none", "solid", "dashed", "dotted", "double"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
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
  });

  return responsiveCssString;
}

function generator$X(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}outline`;

  const { outlineWidth = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(outlineWidth, (key, value) => {
      return `
          ${prefix}-${key} {
            outline-width: ${value};
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$W(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}overflow`;

  const propertyOptions = ["auto", "hidden", "visible", "scroll"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    let cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            overflow: ${value};
          }
          ${prefix}-x-${key} {
            overflow-x: ${value};
          }
          ${prefix}-y-${key} {
            overflow-y: ${value};
          }
        `
    );
    cssString += `
        ${globalPrefix}scrolling-touch {
          -webkit-overflow-scrolling: touch;
        }
        ${globalPrefix}scrolling-auto {
          -webkit-overflow-scrolling: auto;
        }
      `;
    return cssString;
  });

  return responsiveCssString;
}

function generator$V(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}overscroll`;

  const propertyOptions = ["auto", "contain", "none"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            overscroll-behavior: ${value};
          }
          ${prefix}-x-${key} {
            overscroll-behavior-x: ${value};
          }
          ${prefix}-y-${key} {
            overscroll-behavior-y: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$U(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}p`;

  const { padding = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      padding,
      (key, value) => `
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
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$T(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}place-content`;

  const propertyOptions = {
    start: "start",
    end: "end",
    center: "center",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
    stretch: "stretch",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            place-content: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$S(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}place-items`;

  const propertyOptions = ["auto", "start", "end", "center", "stretch"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            place-items: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$R(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}place-self`;

  const propertyOptions = ["auto", "start", "end", "center", "stretch"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            place-self: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$Q(configOptions = {}) {
  const { prefix } = configOptions;

  const responsiveCssString = generateCssString(() => {
    return `
        ${prefix}pointer-events-none {
          pointer-events: none;
        }
        ${prefix}pointer-events-auto {
          pointer-events: auto;
        }
      `;
  });

  return responsiveCssString;
}

function generator$P(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = ["static", "fixed", "absolute", "relative", "sticky"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}${key} {
            position: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$O(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}resize`;

  const propertyOptions = {
    none: "none",
    y: "vertical",
    x: "horizontal",
    default: "both",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(propertyOptions, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            resize: ${value};
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$N(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}ring`;

  const { ringColor = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
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
  });

  return responsiveCssString;
}

function generator$M(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}ring-offset`;

  const { ringOffsetColor = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    const cssString = getCssByColors(
      ringOffsetColor,
      (key, value) => `
          ${prefix}-${key} {
            --ring-offset-color: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$L(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}ring-offset`;

  const { ringOffsetWidth = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      ringOffsetWidth,
      (key, value) => `
          ${prefix}-${key} {
            --ring-offset-width: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$K(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}ring-opacity`;

  const { ringOpacity = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(ringOpacity, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --ring-opacity: ${value};
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$J(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}ring`;

  const { ringWidth = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
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
  });

  return responsiveCssString;
}

function generator$I(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}saturate`;
  const basePrefix = prefix.replace(globalPrefix, "");

  const { saturate = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(saturate, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --saturate: saturate(${value}) !important;
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}${key} {
            --backdrop-saturate: saturate(${value}) !important;
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$H(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const { rotate = {} } = theme;

  Object.entries(rotate).forEach(([key, value]) => {
    rotate[`-${key}`] = `-${value}`.replace("--", "-");
  });

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
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
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$G(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}scale`;

  const { scale = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      scale,
      (key, value) => `
          ${prefix}-${key} {
            --transform-scale-x: ${value};
            --transform-scale-y: ${value};
          }
          ${prefix}-x-${key} {
            --transform-scale-x: ${value};
          }
          ${prefix}-y-${key} {
            --transform-scale-y: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$F(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = ["auto", "smooth"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}scroll-${key} {
            scroll-behavior: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$E(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const { scrollMargin = {} } = theme;

  Object.entries(scrollMargin).forEach(([key, value]) => {
    scrollMargin[`-${key}`] = `-${value}`.replace("--", "-");
  });

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
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
  });

  return responsiveCssString;
}

function generator$D(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const { scrollPadding = {} } = theme;

  Object.entries(scrollPadding).forEach(([key, value]) => {
    scrollPadding[`-${key}`] = `-${value}`.replace("--", "-");
  });

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
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
  });

  return responsiveCssString;
}

function generator$C(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}snap`;

  const propertyOptions = {
    start: "start",
    end: "end",
    center: "center",
    "align-none": "none",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            scroll-snap-align: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$B(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}snap`;

  const propertyOptions = ["normal", "always"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            scroll-snap-stop: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$A(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}snap`;

  const propertyOptions = {
    none: "none",
    x: "x var(--scroll-snap-strictness)",
    y: "y var(--scroll-snap-strictness)",
    both: "both var(--scroll-snap-strictness)",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    let cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            --scroll-snap-strictness: proximity;
            scroll-snap-type: ${value};
          }
        `
    );
    cssString += getCssByOptions(
      ["mandatory", "proximity"],
      (key, value) => `
          ${prefix}-${key} {
            --scroll-snap-strictness: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$z(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}sepia`;
  const basePrefix = prefix.replace(globalPrefix, "");

  const { sepia = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(sepia, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --sepia: sepia(${value}) !important;
          }
          ${prefix.replace(basePrefix, `backdrop-${basePrefix}`)}${key} {
            --backdrop-sepia: sepia(${value}) !important;
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$y(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}size`;

  const { size = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      size,
      (key, value) => `
          ${prefix}-${key} {
            width: ${value};
            height: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$x(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const { skew = {} } = theme;

  Object.entries(skew).forEach(([key, value]) => {
    skew[`-${key}`] = `-${value}`.replace("--", "-");
  });

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
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
          }
          ${prefix}-y-${key} {
            --transform-skew-y: ${value};
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$w(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}space`;

  const { space = {} } = theme;

  const responsiveCssString = generateCssString(() => {
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
    Object.entries(space).forEach(([space, spaceValue]) => {
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
  });

  return responsiveCssString;
}

function generator$v(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}stroke`;

  const { stroke } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    const cssString = getCssByColors(stroke, (key, value) => {
      return `
            ${prefix}-${key} {
              stroke: ${value};
            }
          `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$u(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}stroke`;

  const { strokeWidth = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      strokeWidth,
      (key, value) => `
          ${prefix}-${key} {
            stroke-width: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$t(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}table`;

  const propertyOptions = ["auto", "fixed"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            table-layout: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$s(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}text`;

  const propertyOptions = ["left", "center", "right", "justify"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            text-align: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$r(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}text`;

  const { textColor } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    const cssString = getCssByColors(textColor, (key, value, rgbValue) => {
      let rgbPropertyValue = "";
      if (rgbValue) {
        rgbPropertyValue = `color: rgba(${rgbValue}, var(--text-opacity));`;
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
  });

  return responsiveCssString;
}

function generator$q(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = {
    underline: "underline",
    overline: "overline",
    "line-through": "line-through",
    "no-underline": "none",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}${key} {
            text-decoration: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$p(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}decoration`;

  const { textDecorationColor = {}, opacity = {} } = theme;

  const responsiveCssString = generateCssString(
    ({ getCssByColors, getCssByOptions }) => {
      let cssString = getCssByColors(
        textDecorationColor,
        (key, value, rgbValue) => {
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
        }
      );
      cssString += getCssByOptions(
        opacity,
        (key, value) => `
          ${prefix}-opacity-${key} {
            --text-decoration-opacity: ${value};
          }
        `
      );
      return cssString;
    });

  return responsiveCssString;
}

function generator$o(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}decoration`;

  const propertyOptions = ["solid", "double", "dotted", "dashed", "wavy"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            text-decoration-style: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$n(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}decoration`;

  const { textDecorationThickness = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      textDecorationThickness,
      (key, value) => `
          ${prefix}-${key} {
            text-decoration-thickness: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$m(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const { textIndent = {} } = theme;

  Object.entries(textIndent).forEach(([key, value]) => {
    textIndent[`-${key}`] = `-${value}`.replace("--", "-");
  });

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
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
  });

  return responsiveCssString;
}

function generator$l(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}text-opacity`;

  const { textOpacity = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      textOpacity,
      (key, value) => `
          ${prefix}-${key} {
            --text-opacity: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$k(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = ["ellipsis", "clip"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}truncate {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          ${prefix}text-${key} {
            text-overflow: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$j(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}text-shadow-blur`;

  const { textShadowBlur = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(textShadowBlur, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --text-shadow-blur: ${value};
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$i(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}text-shadow`;

  const { textShadowColor = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByColors }) => {
    const cssString = getCssByColors(
      textShadowColor,
      (keyTmp, value, rgbValue) => {
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
      }
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$h(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}text-shadow-opacity`;

  const { textShadowOpacity = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(textShadowOpacity, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --text-shadow-opacity: ${value};
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$g(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}text-shadow-x`;

  const { textShadowX = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(textShadowX, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --text-shadow-x: ${value};
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$f(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}text-shadow-y`;

  const { textShadowY = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(textShadowY, (keyTmp, value) => {
      const key = keyTmp.toLowerCase() !== "default" ? `-${keyTmp}` : "";
      return `
          ${prefix}${key} {
            --text-shadow-y: ${value};
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$e(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = {
    uppercase: "uppercase",
    lowercase: "lowercase",
    capitalize: "capitalize",
    "normal-case": "none",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}${key} {
            text-transform: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$d(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}underline-offset`;

  const { textUnderlineOffset = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      textUnderlineOffset,
      (key, value) => `
          ${prefix}-${key} {
            text-underline-offset: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$c(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = ["wrap", "nowrap", "balance", "pretty"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}text-${key} {
            text-wrap: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$b(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}touch`;

  const propertyOptions = [
    "auto",
    "none",
    "pan-x",
    "pan-left",
    "pan-right",
    "pan-y",
    "pan-up",
    "pan-down",
    "pinch-zoom",
    "manipulation",
  ];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            touch-action: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$a({ prefix }) {
  return `    
  ${prefix}transform {
    --transform-translate-x: 0;
    --transform-translate-y: 0;
    --transform-rotate: 0;
    --transform-skew-x: 0;
    --transform-skew-y: 0;
    --transform-scale-x: 1;
    --transform-scale-y: 1;
    transform: translateX(var(--transform-translate-x)) translateY(var(--transform-translate-y)) rotate(var(--transform-rotate)) skewX(var(--transform-skew-x)) skewY(var(--transform-skew-y)) scaleX(var(--transform-scale-x)) scaleY(var(--transform-scale-y));
  }
  ${prefix}transform-none {
    transform: none;
  }
`;
}

function generator$9(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}origin`;

  const propertyOptions = [
    "center",
    "top",
    "top-right",
    "right",
    "bottom-right",
    "bottom",
    "bottom-left",
    "left",
    "top-left",
  ];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            transform-origin: ${value.replace("-", " ")} !important;
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$8(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const { translate = {} } = theme;

  Object.entries(translate).forEach(([key, value]) => {
    translate[`-${key}`] = `-${value}`.replace("--", "-");
  });

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
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
          }
          ${prefix}-y-${key} {
            --transform-translate-y: ${value};
          }
        `;
    });
    return cssString;
  });

  return responsiveCssString;
}

function generator$7(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}select`;

  const propertyOptions = ["none", "text", "all", "auto"];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            -webkit-user-select: ${value};
            -moz-user-select: ${value};
            -ms-user-select: ${value};
            user-select: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$6(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}align`;

  const propertyOptions = [
    "baseline",
    "top",
    "middle",
    "bottom",
    "text-top",
    "text-bottom",
    "text-sub",
    "text-super",
  ];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            vertical-align: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$5(configOptions = {}) {
  const { prefix } = configOptions;

  const propertyOptions = {
    visible: "visible",
    collapse: "collapse",
    invisible: "hidden",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}${key} {
            visibility: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$4(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}whitespace`;

  const propertyOptions = [
    "normal",
    "nowrap",
    "nowrap",
    "pre",
    "pre-line",
    "pre-wrap",
    "break-spaces",
  ];

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            white-space: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$3(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const prefix = `${globalPrefix}w`;

  const { width = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      width,
      (key, value) => `
          ${prefix}-${key} {
            width: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator$2(configOptions = {}) {
  const { prefix } = configOptions;

  const responsiveCssString = generateCssString(() => {
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
  });

  return responsiveCssString;
}

function generator$1(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;

  const prefix = `${globalPrefix}will-change`;

  const propertyOptions = {
    auto: "auto",
    scroll: "scroll-position",
    contents: "contents",
    transform: "transform",
  };

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
    const cssString = getCssByOptions(
      propertyOptions,
      (key, value) => `
          ${prefix}-${key} {
            will-change: ${value};
          }
        `
    );
    return cssString;
  });

  return responsiveCssString;
}

function generator(configOptions = {}) {
  const { prefix: globalPrefix, theme = {} } = configOptions;

  const { zIndex = {} } = theme;

  const responsiveCssString = generateCssString(({ getCssByOptions }) => {
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
  });

  return responsiveCssString;
}

const plugins = {
  accentColor: generator$2r,
  accessibility: generator$2q,
  alignContent: generator$2p,
  alignItems: generator$2o,
  alignSelf: generator$2n,
  appearance: generator$2m,
  aspect: generator$2l,
  backgroundAttachment: generator$2k,
  backgroundClip: generator$2j,
  backgroundColor: generator$2i,
  backgroundImage: generator$2h,
  backgroundOpacity: generator$2g,
  backgroundOrigin: generator$2f,
  backgroundPosition: generator$2e,
  backgroundRepeat: generator$2d,
  backgroundSize: generator$2c,
  blur: generator$2b,
  borderCollapse: generator$2a,
  borderColor: generator$29,
  borderOpacity: generator$28,
  borderRadius: generator$27,
  borderSpacing: generator$26,
  borderStyle: generator$25,
  borderWidth: generator$24,
  boxDecorationBreak: generator$23,
  boxShadow: generator$22,
  boxSizing: generator$21,
  brightness: generator$20,
  captionSide: generator$1$,
  caretColor: generator$1_,
  clear: generator$1Z,
  content: generator$1Y,
  contrast: generator$1X,
  cursor: generator$1W,
  display: generator$1V,
  divideColor: generator$1U,
  divideOpacity: generator$1T,
  divideStyle: generator$1S,
  divideWidth: generator$1R,
  dropShadow: generator$1Q,
  fill: generator$1P,
  filter: generator$1O,
  flex: generator$1N,
  flexBasis: generator$1M,
  flexDirection: generator$1L,
  flexGrow: generator$1K,
  flexShrink: generator$1J,
  flexWrap: generator$1I,
  float: generator$1H,
  fontSize: generator$1G,
  fontSmoothing: generator$1F,
  fontStyle: generator$1E,
  fontVariantNumeric: generator$1D,
  fontWeight: generator$1C,
  gap: generator$1B,
  gradientColorStops: generator$1A,
  grayscale: generator$1z,
  gridAutoColumns: generator$1y,
  gridAutoFlow: generator$1x,
  gridAutoRows: generator$1w,
  gridColumn: generator$1v,
  gridColumnEnd: generator$1u,
  gridColumnStart: generator$1t,
  gridRow: generator$1s,
  gridRowEnd: generator$1r,
  gridRowStart: generator$1q,
  gridTemplateColumns: generator$1p,
  gridTemplateRows: generator$1o,
  height: generator$1n,
  hueRotate: generator$1m,
  hyphens: generator$1l,
  inset: generator$1k,
  invert: generator$1j,
  isolation: generator$1i,
  justifyContent: generator$1h,
  justifyItems: generator$1g,
  justifySelf: generator$1f,
  letterSpacing: generator$1e,
  lineClamp: generator$1d,
  lineHeight: generator$1c,
  listStylePosition: generator$1b,
  listStyleType: generator$1a,
  margin: generator$19,
  maxHeight: generator$18,
  maxWidth: generator$17,
  minHeight: generator$16,
  minWidth: generator$15,
  objectFit: generator$13,
  mixBlendMode: generator$14,
  objectPosition: generator$12,
  opacity: generator$11,
  order: generator$10,
  outlineColor: generator$$,
  outlineOffset: generator$_,
  outlineOpacity: generator$Z,
  outlineStyle: generator$Y,
  outlineWidth: generator$X,
  overflow: generator$W,
  overscrollBehavior: generator$V,
  padding: generator$U,
  placeContent: generator$T,
  placeItems: generator$S,
  placeSelf: generator$R,
  pointerEvents: generator$Q,
  position: generator$P,
  resize: generator$O,
  ringColor: generator$N,
  ringOffsetColor: generator$M,
  ringOffsetWidth: generator$L,
  ringOpacity: generator$K,
  ringWidth: generator$J,
  rotate: generator$H,
  saturate: generator$I,
  scale: generator$G,
  scrollBehavior: generator$F,
  scrollMargin: generator$E,
  scrollPadding: generator$D,
  scrollSnapAlign: generator$C,
  scrollSnapStop: generator$B,
  scrollSnapType: generator$A,
  sepia: generator$z,
  size: generator$y,
  skew: generator$x,
  space: generator$w,
  stroke: generator$v,
  strokeWidth: generator$u,
  tableLayout: generator$t,
  textAlign: generator$s,
  textColor: generator$r,
  textDecoration: generator$q,
  textDecorationColor: generator$p,
  textDecorationStyle: generator$o,
  textDecorationThickness: generator$n,
  textIndent: generator$m,
  textOpacity: generator$l,
  textOverflow: generator$k,
  textShadowBlur: generator$j,
  textShadowColor: generator$i,
  textShadowOpacity: generator$h,
  textShadowX: generator$g,
  textShadowY: generator$f,
  textTransform: generator$e,
  textUnderlineOffset: generator$d,
  textWrap: generator$c,
  touchAction: generator$b,
  transform: generator$a,
  transformOrigin: generator$9,
  translate: generator$8,
  userSelect: generator$7,
  verticalAlign: generator$6,
  visibility: generator$5,
  whitespace: generator$4,
  width: generator$3,
  willChange: generator$1,
  wordBreak: generator$2,
  zIndex: generator,
};

function generateTailwindCssString(options = {}) {
  const configOptions = getConfigOptions(options);
  const { corePlugins = {} } = configOptions;
  const corePluginKeys = Object.keys(corePlugins);

  let cssString = ``;
  Object.keys(plugins).forEach((key) => {
    if (corePluginKeys.indexOf(key) >= 0 && !corePlugins[key]) {
      cssString += "";
    } else {
      cssString += plugins[key](configOptions);
    }
  });
  return cssString;
}

const twString = generateTailwindCssString().replace(/\s\s+/g, " ");

function convertCssToObject(cssString) {
  const cssObject = {};
  const regex = /([a-zA-Z0-9\-_\\/.]+)\s*{\s*([^}]+)\s*}/g;
  let match;

  while ((match = regex.exec(cssString)) !== null) {
    const className = match[1].replace(/\\\\/g, "\\").replace(/^_/, ""); // Perbaiki unescaping dan hapus _ di awal jika ada
    const cssRules = match[2].trim().replace(/\s+/g, " ");
    cssObject[className] = cssRules;
  }

  return cssObject;
}

function inlineStyleToJson(styleString) {
  const styles = styleString.split(";").filter((style) => style.trim() !== "");
  const styleObject = {};

  styles.forEach((style) => {
    const [key, value] = style.split(":").map((s) => s.trim());
    if (key && value) {
      const camelCaseKey = key.replace(/-([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      styleObject[camelCaseKey] = value;
    }
  });

  return styleObject;
}

function separateAndResolveCSS(arr) {
  const cssProperties = {};
  arr.forEach((item) => {
    const declarations = item
      .split(";")
      .map((decl) => decl.trim())
      .filter((decl) => decl);

    declarations.forEach((declaration) => {
      const [key, value] = declaration.split(":").map((part) => part.trim());
      cssProperties[key] = value;
    });
  });

  const resolvedProperties = { ...cssProperties };

  const resolveValue = (value, variables) => {
    return value.replace(
      /var\((--[a-zA-Z0-9-]+)(?:,\s*([^)]+))?\)/g,
      (match, variable, fallback) => {
        return variables[variable] || fallback || match;
      }
    );
  };

  Object.keys(resolvedProperties).forEach((key) => {
    resolvedProperties[key] = resolveValue(
      resolvedProperties[key],
      resolvedProperties
    );
  });

  Object.keys(resolvedProperties).forEach((key) => {
    if (key.startsWith("--")) {
      delete resolvedProperties[key];
    }
  });

  return Object.entries(resolvedProperties)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");
}

const cssObject = convertCssToObject(twString);

function tws(classNames, convertToJson) {
  if (
    [
      !classNames,
      typeof classNames !== "string",
      classNames.trim() === "",
    ].includes(true)
  ) {
    return convertToJson ? {} : "";
  }

  const classes = classNames.match(/[\w-]+\[[^\]]+\]|[\w-]+\.\d+|[\w-]+/g);

  let cssResult = classes.map((className) => {
    if (cssObject[className]) {
      return cssObject[className];
    } else if (className.includes("[")) {
      const match = className.match(/\[([^\]]+)\]/);
      if (match) {
        const customValue = match[1];
        const baseKey = className.split("[")[0];
        if (cssObject[`${baseKey}custom`]) {
          return cssObject[`${baseKey}custom`].replace(
            /custom_value/g,
            customValue
          );
        }
      }
    }
    return "";
  });

  cssResult = separateAndResolveCSS(cssResult);

  if (convertToJson) {
    cssResult = inlineStyleToJson(cssResult);
  }

  return cssResult;
}

const breakpoints = {
  sm: "@media (min-width: 640px)",
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 1024px)",
  xl: "@media (min-width: 1280px)",
  "2xl": "@media (min-width: 1536px)",
};

const pseudoVariants = new Set([
  "hover",
  "focus",
  "focus-within",
  "active",
  "visited",
  "disabled",
  "first",
  "last",
  "checked",
  "invalid",
  "required",
]);

const specialVariants = {
  group: (state, sel) => `.group:${state} ${sel}`,
  peer: (state, sel) => `.peer:${state} ~ ${sel}`,
};

const selectorVariants = {
  first: () => `> :first-child`,
  last: () => `> :last-child`,
  odd: () => `> :nth-child(odd)`,
  even: () => `> :nth-child(even)`,
  not: (arg) => `> :not(${arg})`,
  number: (arg) => `> :nth-child(${arg})`,
};

function encodeBracketValues(input) {
  return input.replace(/\[([^\]]+)\]/g, (_, content) => {
    const encoded = encodeURIComponent(content)
      .replace(/\(/g, "__P__")
      .replace(/\)/g, "__C__");
    return `[${encoded}]`;
  });
}

function decodeBracketValues(input) {
  return decodeURIComponent(input)
    .replace(/__P__/g, "(")
    .replace(/__C__/g, ")");
}

function replaceSelector(selector) {
  return selector.replace(
    /c-(first|last|odd|even|\d+|not\([^)]+\))/g,
    (_, raw) => {
      if (/^\d+$/.test(raw)) return selectorVariants.number(raw);
      const notMatch = raw.match(/^not\(([^)]+)\)$/);
      if (notMatch) return selectorVariants.not(notMatch[1]);
      if (selectorVariants[raw]) return selectorVariants[raw]();
      return raw;
    }
  );
}

function resolveVariants(selector, variants) {
  let media = null;
  let finalSelector = selector;

  for (const v of variants) {
    if (breakpoints[v]) {
      media = breakpoints[v];
    } else if (pseudoVariants.has(v)) {
      finalSelector += `:${v}`;
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

  return { media, finalSelector };
}

function twsx(obj) {
  const styles = {};

  function expandGroupedClass(input) {
    function expandDirectiveGroups(str) {
      return str.replace(/(\w+)\(([^()]+)\)/g, (_, directive, content) => {
        return content
          .trim()
          .split(/\s+/)
          .map((val) => {
            if (val.includes(":")) {
              const [variant, v] = val.split(":");
              const prefix = v.startsWith("-") ? "-" : "";
              const value = v.startsWith("-") ? v.slice(1) : v;
              return `${variant}:${prefix}${directive}-${value}`;
            }
            const prefix = val.startsWith("-") ? "-" : "";
            const value = val.startsWith("-") ? val.slice(1) : val;
            return `${prefix}${directive}-${value}`;
          })
          .join(" ");
      });
    }

    function expandVariants(str, parent = "") {
      return str.replace(
        /(\w+):\(([^()]+(?:\((?:[^()]+)\))?[^()]*)\)/g,
        (_, variant, content) => {
          return content
            .trim()
            .split(/\s+/)
            .map((c) => {
              if (/\w+:\(.*\)/.test(c)) {
                return expandVariants(
                  c,
                  parent ? `${parent}:${variant}` : variant
                );
              }
              return `${parent ? `${parent}:${variant}` : variant}:${c}`;
            })
            .join(" ");
        }
      );
    }

    let result = encodeBracketValues(input);
    let prev;

    do {
      prev = result;
      result = expandVariants(result);
      result = expandDirectiveGroups(result);
    } while (result !== prev);

    return result;
  }

  function walk(selector, val) {
    if (Array.isArray(val)) {
      const [base, nested] = val;
      if (typeof base !== "string") return;

      for (const cls of base.split(" ")) {
        const [rawVariants, className] = cls.includes(":")
          ? [cls.split(":").slice(0, -1), cls.split(":").slice(-1)[0]]
          : [[], cls];

        let isImportant = false;
        let pureClassName = className;

        if (className.startsWith("!")) {
          isImportant = true;
          pureClassName = className.slice(1);
        }

        const { media, finalSelector } = resolveVariants(selector, rawVariants);

        let declarations =
          cssObject[pureClassName] ||
          cssObject[pureClassName.replace(/(\/)/g, "\\$1")];

        if (!declarations && pureClassName.includes("[")) {
          const match = pureClassName.match(/^(.+?)\[(.+)\]$/);
          if (match) {
            const [, prefix, dynamicValue] = match;
            const customKey = `${prefix}custom`;
            const template = cssObject[customKey];
            if (template) {
              declarations = template.replace(
                /custom_value/g,
                decodeBracketValues(dynamicValue)
              );
            }
          }
        }

        if (!declarations) continue;

        if (isImportant) {
          declarations = declarations.replace(
            /([^:;]+):([^;]+)(;?)/g,
            (_, prop, value) => {
              return prop.trim().startsWith("--")
                ? `${prop}:${value};`
                : `${prop}:${value.trim()} !important;`;
            }
          );
        }

        const isSpaceOrDivide = [
          "space-x-",
          "-space-x-",
          "space-y-",
          "-space-y-",
          "divide-",
        ].some((prefix) => pureClassName.startsWith(prefix));

        const expandedSelector = replaceSelector(finalSelector);
        const targetSelector = isSpaceOrDivide
          ? `${expandedSelector} > :not([hidden]) ~ :not([hidden])`
          : expandedSelector;

        if (media) {
          styles[media] = styles[media] || {};
          styles[media][targetSelector] = styles[media][targetSelector] || "";
          styles[media][targetSelector] += declarations + "\n";
        } else {
          styles[targetSelector] = styles[targetSelector] || "";
          styles[targetSelector] += declarations + "\n";
        }
      }

      for (const nestedSel in nested) {
        const nestedVal = nested[nestedSel];
        const combinedSel = nestedSel.includes("&")
          ? nestedSel.replace(/&/g, selector)
          : `${selector} ${nestedSel}`;
        walk(combinedSel, nestedVal);
      }
    } else if (typeof val === "string") {
      walk(selector, [expandGroupedClass(val)]);
    }
  }

  function isSelectorObject(val) {
    return typeof val === "object" && val !== null && !Array.isArray(val);
  }

  function flatten(obj, parentSelector = "") {
    const result = {};

    for (const selector in obj) {
      const val = obj[selector];
      const currentSelector = parentSelector
        ? selector.includes("&")
          ? selector.replace(/&/g, parentSelector)
          : `${parentSelector} ${selector}`
        : selector;

      if (typeof val === "string") {
        result[currentSelector] = val;
      } else if (Array.isArray(val)) {
        const flatArray = [];
        for (const item of val) {
          if (typeof item === "string") {
            flatArray.push(item);
          } else if (isSelectorObject(item)) {
            const nested = flatten(item, currentSelector);
            Object.assign(result, nested);
          }
        }
        if (flatArray.length > 0) {
          result[currentSelector] = result[currentSelector] || [];
          result[currentSelector].push(...flatArray);
        }
      } else if (isSelectorObject(val)) {
        const nested = flatten(val, currentSelector);
        Object.assign(result, nested);
      }
    }

    return result;
  }

  const flattened = flatten(obj);

  for (const selector in flattened) {
    let val = flattened[selector];
    let baseClass = "";
    let nested = {};

    if (typeof val === "string") {
      baseClass = expandGroupedClass(val);
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

  let cssString = "";

  const baseStyles = [];
  const mediaStyles = [];

  for (const sel in styles) {
    if (!sel.startsWith("@media")) {
      baseStyles.push({ sel, css: styles[sel] });
    } else {
      mediaStyles.push({ sel, content: styles[sel] });
    }
  }

  for (const { sel, css } of baseStyles) {
    cssString += `${sel}{${css.trim().replace(/\n/g, "")}}`;
  }

  function mediaPriority(sel) {
    const match = sel.match(/@media \(min-width: (\d+)px\)/);
    return match ? parseInt(match[1], 10) : 99999;
  }

  mediaStyles.sort((a, b) => mediaPriority(a.sel) - mediaPriority(b.sel));

  for (const { sel, content } of mediaStyles) {
    cssString += `${sel}{`;
    for (const subSel in content) {
      cssString += `${subSel}{${content[subSel].trim().replace(/\n/g, "")}}`;
    }
    cssString += `}`;
  }

  return cssString.trim();
}

exports.tws = tws;
exports.twsx = twsx;
