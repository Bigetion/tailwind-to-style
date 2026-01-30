/**
 * Composition API - Styled-system like utilities for design systems
 */

import { tws } from "../index.js";

/**
 * Create a styled component factory
 */
export function createStyled(baseStyles = {}) {
  return function styled(overrideStyles = {}) {
    const merged = { ...baseStyles, ...overrideStyles };
    return merged;
  };
}

/**
 * Box primitive with common layout props
 */
export function box(props = {}) {
  const {
    // Layout
    display,
    position,
    top,
    right,
    bottom,
    left,
    zIndex,

    // Flex/Grid
    flex,
    flexDirection,
    flexWrap,
    justifyContent,
    alignItems,
    alignContent,
    gap,
    gridTemplateColumns,
    gridTemplateRows,

    // Spacing
    m,
    mt,
    mr,
    mb,
    ml,
    mx,
    my,
    p,
    pt,
    pr,
    pb,
    pl,
    px,
    py,

    // Sizing
    w,
    h,
    minW,
    maxW,
    minH,
    maxH,

    // Border
    border,
    borderColor,
    borderRadius,
    borderWidth,

    // Background
    bg,
    bgGradient,

    // Typography
    color,
    fontSize,
    fontWeight,
    lineHeight,
    textAlign,

    // Effects
    opacity,
    shadow,
    transform,

    // Custom classes
    className,
    ...rest
  } = props;

  const classes = [];

  // Layout
  if (display) classes.push(display);
  if (position) classes.push(position);
  if (top) classes.push(`top-${top}`);
  if (right) classes.push(`right-${right}`);
  if (bottom) classes.push(`bottom-${bottom}`);
  if (left) classes.push(`left-${left}`);
  if (zIndex) classes.push(`z-${zIndex}`);

  // Flex/Grid
  if (flex) classes.push(`flex-${flex}`);
  if (flexDirection) classes.push(`flex-${flexDirection}`);
  if (flexWrap) classes.push(`flex-${flexWrap}`);
  if (justifyContent) classes.push(`justify-${justifyContent}`);
  if (alignItems) classes.push(`items-${alignItems}`);
  if (alignContent) classes.push(`content-${alignContent}`);
  if (gap) classes.push(`gap-${gap}`);
  if (gridTemplateColumns) classes.push(`grid-cols-${gridTemplateColumns}`);
  if (gridTemplateRows) classes.push(`grid-rows-${gridTemplateRows}`);

  // Spacing
  if (m) classes.push(`m-${m}`);
  if (mt) classes.push(`mt-${mt}`);
  if (mr) classes.push(`mr-${mr}`);
  if (mb) classes.push(`mb-${mb}`);
  if (ml) classes.push(`ml-${ml}`);
  if (mx) {
    classes.push(`mx-${mx}`);
  }
  if (my) {
    classes.push(`my-${my}`);
  }
  if (p) classes.push(`p-${p}`);
  if (pt) classes.push(`pt-${pt}`);
  if (pr) classes.push(`pr-${pr}`);
  if (pb) classes.push(`pb-${pb}`);
  if (pl) classes.push(`pl-${pl}`);
  if (px) {
    classes.push(`px-${px}`);
  }
  if (py) {
    classes.push(`py-${py}`);
  }

  // Sizing
  if (w) classes.push(`w-${w}`);
  if (h) classes.push(`h-${h}`);
  if (minW) classes.push(`min-w-${minW}`);
  if (maxW) classes.push(`max-w-${maxW}`);
  if (minH) classes.push(`min-h-${minH}`);
  if (maxH) classes.push(`max-h-${maxH}`);

  // Border
  if (border) classes.push(typeof border === "boolean" ? "border" : `border-${border}`);
  if (borderColor) classes.push(`border-${borderColor}`);
  if (borderRadius)
    classes.push(typeof borderRadius === "boolean" ? "rounded" : `rounded-${borderRadius}`);
  if (borderWidth) classes.push(`border-${borderWidth}`);

  // Background
  if (bg) classes.push(`bg-${bg}`);
  if (bgGradient) classes.push(bgGradient);

  // Typography
  if (color) classes.push(`text-${color}`);
  if (fontSize) classes.push(`text-${fontSize}`);
  if (fontWeight) classes.push(`font-${fontWeight}`);
  if (lineHeight) classes.push(`leading-${lineHeight}`);
  if (textAlign) classes.push(`text-${textAlign}`);

  // Effects
  if (opacity) classes.push(`opacity-${opacity}`);
  if (shadow) classes.push(`shadow-${shadow}`);
  if (transform) classes.push(transform);

  // Custom classes
  if (className) classes.push(className);

  const twsResult = tws(classes.join(" "));
  
  return {
    style: twsResult.style,
    ...rest,
  };
}

/**
 * Flex container
 */
export function flex(props = {}) {
  return box({ display: "flex", ...props });
}

/**
 * Grid container
 */
export function grid(props = {}) {
  return box({ display: "grid", ...props });
}

/**
 * Stack (vertical flex)
 */
export function stack(props = {}) {
  return box({ display: "flex", flexDirection: "col", ...props });
}

/**
 * HStack (horizontal flex)
 */
export function hstack(props = {}) {
  return box({ display: "flex", flexDirection: "row", ...props });
}

/**
 * VStack (vertical flex)
 */
export function vstack(props = {}) {
  return box({ display: "flex", flexDirection: "col", ...props });
}

/**
 * Center content
 */
export function center(props = {}) {
  return box({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...props,
  });
}

/**
 * Container with max width
 */
export function container(props = {}) {
  return box({ maxW: "7xl", mx: "auto", px: "4", ...props });
}

/**
 * Card component
 */
export function card(props = {}) {
  return box({
    bg: "white",
    borderRadius: "lg",
    shadow: "md",
    p: "6",
    ...props,
  });
}

/**
 * Button variants
 */
export function button(props = {}) {
  const { variant = "solid", colorScheme = "blue", size = "md", ...rest } = props;

  const variants = {
    solid: `bg-${colorScheme}-500 hover:bg-${colorScheme}-600 text-white`,
    outline: `border-2 border-${colorScheme}-500 text-${colorScheme}-500 hover:bg-${colorScheme}-50`,
    ghost: `text-${colorScheme}-500 hover:bg-${colorScheme}-50`,
    link: `text-${colorScheme}-500 hover:underline`,
  };

  const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  return box({
    className: `${variants[variant]} ${sizes[size]} rounded-md font-medium transition-colors cursor-pointer`,
    ...rest,
  });
}

/**
 * Badge component
 */
export function badge(props = {}) {
  const { variant = "solid", colorScheme = "gray", ...rest } = props;

  const variants = {
    solid: `bg-${colorScheme}-500 text-white`,
    subtle: `bg-${colorScheme}-100 text-${colorScheme}-800`,
    outline: `border border-${colorScheme}-500 text-${colorScheme}-500`,
  };

  return box({
    className: `${variants[variant]} px-2 py-0.5 text-xs font-medium rounded-full inline-block`,
    ...rest,
  });
}

/**
 * Input component
 */
export function input(props = {}) {
  const { size = "md", variant = "outline", ...rest } = props;

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const variants = {
    outline: "border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
    filled: "bg-gray-100 border-2 border-transparent focus:bg-white focus:border-blue-500",
    flushed: "border-b-2 border-gray-300 focus:border-blue-500 rounded-none",
  };

  return box({
    className: `${sizes[size]} ${variants[variant]} rounded-md transition-colors outline-none`,
    ...rest,
  });
}

/**
 * Text component
 */
export function text(props = {}) {
  const { as = "p", size = "base", weight = "normal", ...rest } = props;

  return box({
    className: `text-${size} font-${weight}`,
    ...rest,
  });
}

/**
 * Heading component
 */
export function heading(props = {}) {
  const { level = "1", size, weight = "bold", ...rest } = props;

  const sizes = {
    "1": size || "4xl",
    "2": size || "3xl",
    "3": size || "2xl",
    "4": size || "xl",
    "5": size || "lg",
    "6": size || "base",
  };

  return box({
    className: `text-${sizes[level]} font-${weight}`,
    ...rest,
  });
}

/**
 * Divider component
 */
export function divider(props = {}) {
  const { orientation = "horizontal", ...rest } = props;

  return box({
    className:
      orientation === "horizontal"
        ? "border-t border-gray-200 my-4"
        : "border-l border-gray-200 mx-4 h-full",
    ...rest,
  });
}

/**
 * Spacer component
 */
export function spacer(props = {}) {
  return box({ flex: "1", ...props });
}

/**
 * Create component variants
 */
export function createVariants(baseClasses, variants) {
  return function (props = {}) {
    const { variant = "default", ...rest } = props;
    const variantClasses = variants[variant] || "";

    return {
      style: tws(`${baseClasses} ${variantClasses}`),
      ...rest,
    };
  };
}

/**
 * Create responsive props
 */
export function createResponsive(propName, values) {
  const classes = [];

  if (typeof values === "object") {
    Object.entries(values).forEach(([breakpoint, value]) => {
      if (breakpoint === "base") {
        classes.push(`${propName}-${value}`);
      } else {
        classes.push(`${breakpoint}:${propName}-${value}`);
      }
    });
  } else {
    classes.push(`${propName}-${values}`);
  }

  return classes.join(" ");
}

/**
 * System props parser
 */
export function systemProps(props) {
  const {
    // Spacing
    m,
    margin,
    mt,
    marginTop,
    mr,
    marginRight,
    mb,
    marginBottom,
    ml,
    marginLeft,
    mx,
    marginX,
    my,
    marginY,
    p,
    padding,
    pt,
    paddingTop,
    pr,
    paddingRight,
    pb,
    paddingBottom,
    pl,
    paddingLeft,
    px,
    paddingX,
    py,
    paddingY,

    // Layout
    display,
    w,
    width,
    h,
    height,
    minW,
    minWidth,
    maxW,
    maxWidth,
    minH,
    minHeight,
    maxH,
    maxHeight,

    // Flexbox
    alignItems,
    alignContent,
    justifyItems,
    justifyContent,
    flexWrap,
    flexDirection,
    flex,
    flexGrow,
    flexShrink,
    flexBasis,

    // Grid
    gap,
    rowGap,
    columnGap,
    gridColumn,
    gridRow,
    gridAutoFlow,
    gridAutoColumns,
    gridAutoRows,
    gridTemplateColumns,
    gridTemplateRows,

    // Background
    bg,
    bgColor,
    backgroundColor,
    bgImage,
    backgroundImage,
    bgSize,
    backgroundSize,
    bgPosition,
    backgroundPosition,
    bgRepeat,
    backgroundRepeat,

    // Border
    border,
    borderWidth,
    borderStyle,
    borderColor,
    borderRadius,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,

    // Position
    position,
    zIndex,
    top,
    right,
    bottom,
    left,

    // Typography
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    textAlign,
    textDecoration,
    textTransform,
    color,

    // Shadow
    boxShadow,
    textShadow,

    // Others
    opacity,
    cursor,
    pointerEvents,
    userSelect,
    transition,
    transform,

    ...rest
  } = props;

  return {
    systemClasses: box(props).style,
    otherProps: rest,
  };
}

/**
 * Style function composer
 */
export function compose(...styleFns) {
  return function (props) {
    return styleFns.reduce((acc, fn) => {
      const result = fn(props);
      return {
        ...acc,
        style: { ...acc.style, ...result.style },
      };
    }, {});
  };
}

/**
 * Create theme-aware component
 */
export function createComponent(component, defaultProps = {}) {
  return function (props = {}) {
    return component({ ...defaultProps, ...props });
  };
}
