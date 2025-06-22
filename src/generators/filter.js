export default function generator({ prefix }) {
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
