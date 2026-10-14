import { register } from "tailmantic/collector";

register("bench-button", {
  tw: "inline-flex items-center justify-center rounded-lg border font-medium transition-colors focus:outline-none focus:ring-2",
  modifiers: {
    primary: { tw: "border-blue-600 bg-blue-600 text-white hover:bg-blue-700" },
    secondary: { tw: "border-gray-200 bg-gray-100 text-gray-800 hover:bg-gray-200" },
    outline: { tw: "border-gray-300 bg-white text-gray-700 hover:bg-gray-50" },
    danger: { tw: "border-red-600 bg-red-600 text-white hover:bg-red-700" },
    success: { tw: "border-green-200 bg-green-100 text-green-800" },
    warning: { tw: "border-yellow-200 bg-yellow-100 text-yellow-800" },
    neutral: { tw: "border-gray-200 bg-gray-100 text-gray-700" },
    sm: { tw: "px-3 py-1.5 text-xs" },
    md: { tw: "px-4 py-2 text-sm" },
    lg: { tw: "px-5 py-2.5 text-base" },
  },
});

register("bench-badge", {
  tw: "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
  modifiers: {
    neutral: { tw: "border-gray-200 bg-gray-100 text-gray-700" },
    primary: { tw: "border-blue-200 bg-blue-100 text-blue-700" },
    success: { tw: "border-green-200 bg-green-100 text-green-800" },
    warning: { tw: "border-yellow-200 bg-yellow-100 text-yellow-800" },
  },
});

register.group("bench-card", {
  root: { tw: "overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm" },
  header: { tw: "border-b border-gray-100 px-5 py-4 text-sm" },
  body: { tw: "space-y-4 p-5" },
});

register("bench-input", {
  tw: "block w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2",
  modifiers: {
    default: { tw: "border-gray-300 focus:border-blue-500 focus:ring-blue-100" },
    error: { tw: "border-red-400 focus:border-red-500 focus:ring-red-100" },
  },
});

register("bench-field", { tw: "flex flex-col gap-1.5 text-sm font-medium text-gray-700" });
register("bench-page", { tw: "mx-auto max-w-4xl space-y-6 px-5 py-10" });
register("bench-intro", { tw: "space-y-2" });
register("bench-grid", { tw: "grid gap-5 md:grid-cols-2" });
register("bench-row", { tw: "flex flex-wrap items-center gap-2" });
register("bench-fields", { tw: "space-y-3" });
