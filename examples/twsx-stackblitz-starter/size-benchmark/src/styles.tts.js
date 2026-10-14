import { cx, tw } from "tailwind-to-style";

const button = tw({
  name: "bench-button",
  hash: false,
  base: "inline-flex items-center justify-center rounded-lg border font-medium transition-colors focus:outline-none focus:ring-2",
  variants: {
    tone: {
      primary: "border-blue-600 bg-blue-600 text-white hover:bg-blue-700",
      secondary: "border-gray-200 bg-gray-100 text-gray-800 hover:bg-gray-200",
      outline: "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
      danger: "border-red-600 bg-red-600 text-white hover:bg-red-700",
      success: "border-green-200 bg-green-100 text-green-800",
      warning: "border-yellow-200 bg-yellow-100 text-yellow-800",
      neutral: "border-gray-200 bg-gray-100 text-gray-700",
    },
    size: {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5 text-base",
    },
  },
  defaultVariants: { tone: "primary", size: "md" },
});

const badge = tw({
  name: "bench-badge",
  hash: false,
  base: "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
  variants: {
    tone: {
      neutral: "border-gray-200 bg-gray-100 text-gray-700",
      primary: "border-blue-200 bg-blue-100 text-blue-700",
      success: "border-green-200 bg-green-100 text-green-800",
      warning: "border-yellow-200 bg-yellow-100 text-yellow-800",
    },
  },
  defaultVariants: { tone: "neutral" },
});

const card = tw({
  name: "bench-card",
  hash: false,
  slots: {
    root: "overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm",
    header: "border-b border-gray-100 px-5 py-4 text-sm",
    body: "space-y-4 p-5",
  },
});

const input = tw({
  name: "bench-input",
  hash: false,
  base: "block w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2",
  variants: {
    state: {
      default: "border-gray-300 focus:border-blue-500 focus:ring-blue-100",
      error: "border-red-400 focus:border-red-500 focus:ring-red-100",
    },
  },
  defaultVariants: { state: "default" },
});

export const styles = {
  button,
  badge,
  card,
  input,
  field: tw("bench-field", "flex flex-col gap-1.5 text-sm font-medium text-gray-700"),
  page: tw("bench-page", "mx-auto max-w-4xl space-y-6 px-5 py-10"),
  intro: tw("bench-intro", "space-y-2"),
  grid: tw("bench-grid", "grid gap-5 md:grid-cols-2"),
  row: tw("bench-row", "flex flex-wrap items-center gap-2"),
  fields: tw("bench-fields", "space-y-3"),
};

export { cx };
