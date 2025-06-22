const patterns = {
  transitionNone: {
    regex: /^transition-none$/,
    cssProp: "transition-property",
    formatter: () => "none",
  },
  transitionAll: {
    regex: /^transition$/,
    cssProp: "transition-property",
    formatter: () => "all",
  },
  transitionProp: {
    regex: /^transition-(opacity|colors|color|background|background-color|transform|shadow|opacity|all|none)$/,
    cssProp: "transition-property",
    formatter: (value) => {
      if (value === "colors")
        return "color, background-color, border-color, text-decoration-color, fill, stroke";
      if (value === "color") return "color";
      if (value === "background") return "background-color";
      return value;
    },
  },
  duration: {
    regex: /^duration-(\d+)$/,
    cssProp: "transition-duration",
    formatter: (value) => `${value}ms`,
  },
  delay: {
    regex: /^delay-(\d+)$/,
    cssProp: "transition-delay",
    formatter: (value) => `${value}ms`,
  },
  ease: {
    regex: /^ease-(linear|in|out|in-out)$/,
    cssProp: "transition-timing-function",
    formatter: (value) => {
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
    },
  },
};

export default patterns;
