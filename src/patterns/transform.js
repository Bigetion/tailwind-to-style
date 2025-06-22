const transform = {
  transform: {
    regex: /^transform$/,
    cssProp: "transform",
    formatter: () =>
      "translateX(var(--transform-translate-x, 0)) translateY(var(--transform-translate-y, 0)) rotate(var(--transform-rotate, 0)) skewX(var(--transform-skew-x, 0)) skewY(var(--transform-skew-y, 0)) scaleX(var(--transform-scale-x, 1)) scaleY(var(--transform-scale-y, 1))",
  },
  transformNone: {
    regex: /^transform-none$/,
    cssProp: "transform",
    formatter: () => "none",
  },
  transformTranslateX: {
    regex: /^translate-x-(.+)$/,
    cssProp: "--transform-translate-x",
    formatter: (value) => (value.endsWith("px") ? value : `${value}px`),
  },
  transformTranslateY: {
    regex: /^translate-y-(.+)$/,
    cssProp: "--transform-translate-y",
    formatter: (value) => (value.endsWith("px") ? value : `${value}px`),
  },
  transformRotate: {
    regex: /^rotate-(.+)$/,
    cssProp: "--transform-rotate",
    formatter: (value) => `${value}deg`,
  },
  transformSkewX: {
    regex: /^skew-x-(.+)$/,
    cssProp: "--transform-skew-x",
    formatter: (value) => `${value}deg`,
  },
  transformSkewY: {
    regex: /^skew-y-(.+)$/,
    cssProp: "--transform-skew-y",
    formatter: (value) => `${value}deg`,
  },
  transformScaleX: {
    regex: /^scale-x-(.+)$/,
    cssProp: "--transform-scale-x",
    formatter: (value) => parseFloat(value) / 100,
  },
  transformScaleY: {
    regex: /^scale-y-(.+)$/,
    cssProp: "--transform-scale-y",
    formatter: (value) => parseFloat(value) / 100,
  },
  transformScale: {
    regex: /^scale-(.+)$/,
    cssProp: "--transform-scale-x",
    formatter: (value) => parseFloat(value) / 100,
    additionalStyles: (value) => ({
      "--transform-scale-y": parseFloat(value) / 100,
    }),
  },

  backfaceVisibility: {
    regex: /^backface-(visible|hidden)$/,
    cssProp: "backface-visibility",
    formatter: (value) => value,
  },
  perspective: {
    regex: /^perspective-(.+)$/,
    cssProp: "perspective",
    formatter: (value) => (value.endsWith("px") ? value : `${value}px`),
  },
  perspectiveOrigin: {
    regex:
      /^perspective-origin-(top|right|bottom|left|center|top-right|top-left|bottom-right|bottom-left)$/,
    cssProp: "perspective-origin",
    formatter: (value) => {
      const positions = {
        top: "top",
        right: "right",
        bottom: "bottom",
        left: "left",
        center: "center",
        "top-right": "top right",
        "top-left": "top left",
        "bottom-right": "bottom right",
        "bottom-left": "bottom left",
      };
      return positions[value] || "center";
    },
  },

  rotateX: {
    regex: /^rotate-x-(.+)$/,
    cssProp: "transform",
    formatter: (value) => `rotateX(${value}deg)`,
  },
  rotateY: {
    regex: /^rotate-y-(.+)$/,
    cssProp: "transform",
    formatter: (value) => `rotateY(${value}deg)`,
  },
  rotateZ: {
    regex: /^rotate-z-(.+)$/,
    cssProp: "transform",
    formatter: (value) => `rotateZ(${value}deg)`,
  },
  rotate3d: {
    regex: /^rotate-3d-(.+)$/,
    cssProp: "transform",
    formatter: (value) => {
      const values = value.split("-");
      if (values.length === 4) {
        return `rotate3d(${values[0]}, ${values[1]}, ${values[2]}, ${values[3]}deg)`;
      }
      return `rotate3d(0, 0, 1, ${value}deg)`;
    },
  },

  transformOrigin: {
    regex:
      /^origin-(top|right|bottom|left|center|top-right|top-left|bottom-right|bottom-left)$/,
    cssProp: "transform-origin",
    formatter: (value) => {
      const positions = {
        top: "top",
        right: "right",
        bottom: "bottom",
        left: "left",
        center: "center",
        "top-right": "top right",
        "top-left": "top left",
        "bottom-right": "bottom right",
        "bottom-left": "bottom left",
      };
      return positions[value] || "center";
    },
  },

  transformStyle: {
    regex: /^transform-(flat|preserve-3d)$/,
    cssProp: "transform-style",
    formatter: (value) => value,
  },

  translate: {
    regex: /^translate-(.+)-(.+)$/,
    cssProp: "transform",
    formatter: (x, y) =>
      `translate(${x.endsWith("px") ? x : `${x}px`}, ${y.endsWith("px") ? y : `${y}px`})`,
  },
  translate3d: {
    regex: /^translate-3d-(.+)$/,
    cssProp: "transform",
    formatter: (value) => {
      const values = value.split("-");
      if (values.length === 3) {
        return `translate3d(${values[0]}px, ${values[1]}px, ${values[2]}px)`;
      }
      return `translate3d(0, 0, ${value}px)`;
    },
  },
  translateZ: {
    regex: /^translate-z-(.+)$/,
    cssProp: "transform",
    formatter: (value) =>
      `translateZ(${value.endsWith("px") ? value : `${value}px`})`,
  },

  skew3d: {
    regex: /^skew-(.+)-(.+)$/,
    cssProp: "transform",
    formatter: (x, y) => `skew(${x}deg, ${y}deg)`,
  },
};

export default transform;
