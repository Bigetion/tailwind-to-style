/**
 * Centralized generator imports
 * This file consolidates all generator imports to make the main index.js cleaner and more maintainable
 */

// Import all generators untuk plugins object
import accentColor from "../generators/accentColor.js";
import accessibility from "../generators/accessibility.js";
import alignContent from "../generators/alignContent.js";
import alignItems from "../generators/alignItems.js";
import alignSelf from "../generators/alignSelf.js";
import appearance from "../generators/appearance.js";
import aspect from "../generators/aspect.js";
import backgroundAttachment from "../generators/backgroundAttachment.js";
import backgroundClip from "../generators/backgroundClip.js";
import backgroundColor from "../generators/backgroundColor.js";
import backgroundImage from "../generators/backgroundImage.js";
import backgroundOpacity from "../generators/backgroundOpacity.js";
import backgroundOrigin from "../generators/backgroundOrigin.js";
import backgroundPosition from "../generators/backgroundPosition.js";
import backgroundRepeat from "../generators/backgroundRepeat.js";
import backgroundSize from "../generators/backgroundSize.js";
import blur from "../generators/blur.js";
import borderCollapse from "../generators/borderCollapse.js";
import borderColor from "../generators/borderColor.js";
import borderOpacity from "../generators/borderOpacity.js";
import borderRadius from "../generators/borderRadius.js";
import borderSpacing from "../generators/borderSpacing.js";
import borderStyle from "../generators/borderStyle.js";
import borderWidth from "../generators/borderWidth.js";
import boxDecorationBreak from "../generators/boxDecorationBreak.js";
import boxShadow from "../generators/boxShadow.js";
import boxSizing from "../generators/boxSizing.js";
import brightness from "../generators/brightness.js";
import captionSide from "../generators/captionSide.js";
import caretColor from "../generators/caretColor.js";
import clear from "../generators/clear.js";
import content from "../generators/content.js";
import contrast from "../generators/contrast.js";
import cursor from "../generators/cursor.js";
import display from "../generators/display.js";
import divideColor from "../generators/divideColor.js";
import divideOpacity from "../generators/divideOpacity.js";
import divideStyle from "../generators/divideStyle.js";
import divideWidth from "../generators/divideWidth.js";
import dropShadow from "../generators/dropShadow.js";
import fill from "../generators/fill.js";
import filter from "../generators/filter.js";
import flex from "../generators/flex.js";
import flexBasis from "../generators/flexBasis.js";
import flexDirection from "../generators/flexDirection.js";
import flexGrow from "../generators/flexGrow.js";
import flexShrink from "../generators/flexShrink.js";
import flexWrap from "../generators/flexWrap.js";
import float from "../generators/float.js";
import fontSize from "../generators/fontSize.js";
import fontSmoothing from "../generators/fontSmoothing.js";
import fontStyle from "../generators/fontStyle.js";
import fontVariantNumeric from "../generators/fontVariantNumeric.js";
import fontWeight from "../generators/fontWeight.js";
import gap from "../generators/gap.js";
import gradientColorStops from "../generators/gradientColorStops.js";
import grayscale from "../generators/grayscale.js";
import gridAutoColumns from "../generators/gridAutoColumns.js";
import gridAutoFlow from "../generators/gridAutoFlow.js";
import gridAutoRows from "../generators/gridAutoRows.js";
import gridColumn from "../generators/gridColumn.js";
import gridColumnEnd from "../generators/gridColumnEnd.js";
import gridColumnStart from "../generators/gridColumnStart.js";
import gridRow from "../generators/gridRow.js";
import gridRowEnd from "../generators/gridRowEnd.js";
import gridRowStart from "../generators/gridRowStart.js";
import gridTemplateColumns from "../generators/gridTemplateColumns.js";
import gridTemplateRows from "../generators/gridTemplateRows.js";
import height from "../generators/height.js";
import hueRotate from "../generators/hueRotate.js";
import hyphens from "../generators/hyphens.js";
import inset from "../generators/inset.js";
import invert from "../generators/invert.js";
import isolation from "../generators/isolation.js";
import justifyContent from "../generators/justifyContent.js";
import justifyItems from "../generators/justifyItems.js";
import justifySelf from "../generators/justifySelf.js";
import letterSpacing from "../generators/letterSpacing.js";
import lineClamp from "../generators/lineClamp.js";
import lineHeight from "../generators/lineHeight.js";
import listStylePosition from "../generators/listStylePosition.js";
import listStyleType from "../generators/listStyleType.js";
import margin from "../generators/margin.js";
import maxHeight from "../generators/maxHeight.js";
import maxWidth from "../generators/maxWidth.js";
import minHeight from "../generators/minHeight.js";
import minWidth from "../generators/minWidth.js";
import mixBlendMode from "../generators/mixBlendMode.js";
import objectFit from "../generators/objectFit.js";
import objectPosition from "../generators/objectPosition.js";
import opacity from "../generators/opacity.js";
import order from "../generators/order.js";
import outlineColor from "../generators/outlineColor.js";
import outlineOffset from "../generators/outlineOffset.js";
import outlineOpacity from "../generators/outlineOpacity.js";
import outlineStyle from "../generators/outlineStyle.js";
import outlineWidth from "../generators/outlineWidth.js";
import overflow from "../generators/overflow.js";
import overscrollBehavior from "../generators/overscrollBehavior.js";
import padding from "../generators/padding.js";
import placeContent from "../generators/placeContent.js";
import placeItems from "../generators/placeItems.js";
import placeSelf from "../generators/placeSelf.js";
import pointerEvents from "../generators/pointerEvents.js";
import position from "../generators/position.js";
import resize from "../generators/resize.js";
import ringColor from "../generators/ringColor.js";
import ringOffsetColor from "../generators/ringOffsetColor.js";
import ringOffsetWidth from "../generators/ringOffsetWidth.js";
import ringOpacity from "../generators/ringOpacity.js";
import ringWidth from "../generators/ringWidth.js";
import rotate from "../generators/rotate.js";
import saturate from "../generators/saturate.js";
import scale from "../generators/scale.js";
import scrollBehavior from "../generators/scrollBehavior.js";
import scrollMargin from "../generators/scrollMargin.js";
import scrollPadding from "../generators/scrollPadding.js";
import scrollSnapAlign from "../generators/scrollSnapAlign.js";
import scrollSnapStop from "../generators/scrollSnapStop.js";
import scrollSnapType from "../generators/scrollSnapType.js";
import sepia from "../generators/sepia.js";
import size from "../generators/size.js";
import skew from "../generators/skew.js";
import space from "../generators/space.js";
import stroke from "../generators/stroke.js";
import strokeWidth from "../generators/strokeWidth.js";
import tableLayout from "../generators/tableLayout.js";
import textAlign from "../generators/textAlign.js";
import textColor from "../generators/textColor.js";
import textDecoration from "../generators/textDecoration.js";
import textDecorationColor from "../generators/textDecorationColor.js";
import textDecorationStyle from "../generators/textDecorationStyle.js";
import textDecorationThickness from "../generators/textDecorationThickness.js";
import textIndent from "../generators/textIndent.js";
import textOpacity from "../generators/textOpacity.js";
import textOverflow from "../generators/textOverflow.js";
import textShadowBlur from "../generators/textShadowBlur.js";
import textShadowColor from "../generators/textShadowColor.js";
import textShadowOpacity from "../generators/textShadowOpacity.js";
import textShadowX from "../generators/textShadowX.js";
import textShadowY from "../generators/textShadowY.js";
import textTransform from "../generators/textTransform.js";
import textUnderlineOffset from "../generators/textUnderlineOffset.js";
import textWrap from "../generators/textWrap.js";
import touchAction from "../generators/touchAction.js";
import transform from "../generators/transform.js";
import transformOrigin from "../generators/transformOrigin.js";
import translate from "../generators/translate.js";
import userSelect from "../generators/userSelect.js";
import verticalAlign from "../generators/verticalAlign.js";
import visibility from "../generators/visibility.js";
import whitespace from "../generators/whitespace.js";
import width from "../generators/width.js";
import willChange from "../generators/willChange.js";
import wordBreak from "../generators/wordBreak.js";
import zIndex from "../generators/zIndex.js";

/**
 * Helper function to get all generators as a plugins object
 * This is more DRY than manually mapping each one
 */
export const plugins = {
  accentColor,
  accessibility,
  alignContent,
  alignItems,
  alignSelf,
  appearance,
  aspect,
  backgroundAttachment,
  backgroundClip,
  backgroundColor,
  backgroundImage,
  backgroundOpacity,
  backgroundOrigin,
  backgroundPosition,
  backgroundRepeat,
  backgroundSize,
  blur,
  borderCollapse,
  borderColor,
  borderOpacity,
  borderRadius,
  borderSpacing,
  borderStyle,
  borderWidth,
  boxDecorationBreak,
  boxShadow,
  boxSizing,
  brightness,
  captionSide,
  caretColor,
  clear,
  content,
  contrast,
  cursor,
  display,
  divideColor,
  divideOpacity,
  divideStyle,
  divideWidth,
  dropShadow,
  fill,
  filter,
  flex,
  flexBasis,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  float,
  fontSize,
  fontSmoothing,
  fontStyle,
  fontVariantNumeric,
  fontWeight,
  gap,
  gradientColorStops,
  grayscale,
  gridAutoColumns,
  gridAutoFlow,
  gridAutoRows,
  gridColumn,
  gridColumnEnd,
  gridColumnStart,
  gridRow,
  gridRowEnd,
  gridRowStart,
  gridTemplateColumns,
  gridTemplateRows,
  height,
  hueRotate,
  hyphens,
  inset,
  invert,
  isolation,
  justifyContent,
  justifyItems,
  justifySelf,
  letterSpacing,
  lineClamp,
  lineHeight,
  listStylePosition,
  listStyleType,
  margin,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  mixBlendMode,
  objectFit,
  objectPosition,
  opacity,
  order,
  outlineColor,
  outlineOffset,
  outlineOpacity,
  outlineStyle,
  outlineWidth,
  overflow,
  overscrollBehavior,
  padding,
  placeContent,
  placeItems,
  placeSelf,
  pointerEvents,
  position,
  resize,
  ringColor,
  ringOffsetColor,
  ringOffsetWidth,
  ringOpacity,
  ringWidth,
  rotate,
  saturate,
  scale,
  scrollBehavior,
  scrollMargin,
  scrollPadding,
  scrollSnapAlign,
  scrollSnapStop,
  scrollSnapType,
  sepia,
  size,
  skew,
  space,
  stroke,
  strokeWidth,
  tableLayout,
  textAlign,
  textColor,
  textDecoration,
  textDecorationColor,
  textDecorationStyle,
  textDecorationThickness,
  textIndent,
  textOpacity,
  textOverflow,
  textShadowBlur,
  textShadowColor,
  textShadowOpacity,
  textShadowX,
  textShadowY,
  textTransform,
  textUnderlineOffset,
  textWrap,
  touchAction,
  transform,
  transformOrigin,
  translate,
  userSelect,
  verticalAlign,
  visibility,
  whitespace,
  width,
  willChange,
  wordBreak,
  zIndex,
};
