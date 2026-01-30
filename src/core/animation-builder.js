/**
 * Animation Builder - Fluent API for creating animations
 */

/**
 * Easing functions
 */
export const easings = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  easeInSine: "cubic-bezier(0.12, 0, 0.39, 0)",
  easeOutSine: "cubic-bezier(0.61, 1, 0.88, 1)",
  easeInOutSine: "cubic-bezier(0.37, 0, 0.63, 1)",
  easeInQuad: "cubic-bezier(0.11, 0, 0.5, 0)",
  easeOutQuad: "cubic-bezier(0.5, 1, 0.89, 1)",
  easeInOutQuad: "cubic-bezier(0.45, 0, 0.55, 1)",
  easeInCubic: "cubic-bezier(0.32, 0, 0.67, 0)",
  easeOutCubic: "cubic-bezier(0.33, 1, 0.68, 1)",
  easeInOutCubic: "cubic-bezier(0.65, 0, 0.35, 1)",
  easeInQuart: "cubic-bezier(0.5, 0, 0.75, 0)",
  easeOutQuart: "cubic-bezier(0.25, 1, 0.5, 1)",
  easeInOutQuart: "cubic-bezier(0.76, 0, 0.24, 1)",
  easeInQuint: "cubic-bezier(0.64, 0, 0.78, 0)",
  easeOutQuint: "cubic-bezier(0.22, 1, 0.36, 1)",
  easeInOutQuint: "cubic-bezier(0.83, 0, 0.17, 1)",
  easeInExpo: "cubic-bezier(0.7, 0, 0.84, 0)",
  easeOutExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  easeInOutExpo: "cubic-bezier(0.87, 0, 0.13, 1)",
  easeInCirc: "cubic-bezier(0.55, 0, 1, 0.45)",
  easeOutCirc: "cubic-bezier(0, 0.55, 0.45, 1)",
  easeInOutCirc: "cubic-bezier(0.85, 0, 0.15, 1)",
  easeInBack: "cubic-bezier(0.36, 0, 0.66, -0.56)",
  easeOutBack: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  easeInOutBack: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
  spring: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  bounce: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
};

/**
 * Animation Builder Class
 */
export class AnimationBuilder {
  constructor(name) {
    this.name = name || `anim-${Date.now()}`;
    this.keyframes = [];
    this.config = {
      duration: "1s",
      timingFunction: "ease",
      delay: "0s",
      iterationCount: "1",
      direction: "normal",
      fillMode: "none",
      playState: "running",
    };
  }

  /**
   * Add keyframe
   */
  at(percentage, styles) {
    this.keyframes.push({ percentage, styles });
    return this;
  }

  /**
   * Convenience method for 0%
   */
  from(styles) {
    return this.at(0, styles);
  }

  /**
   * Convenience method for 100%
   */
  to(styles) {
    return this.at(100, styles);
  }

  /**
   * Set duration
   */
  duration(value) {
    this.config.duration = typeof value === "number" ? `${value}ms` : value;
    return this;
  }

  /**
   * Set easing
   */
  ease(value) {
    this.config.timingFunction = easings[value] || value;
    return this;
  }

  /**
   * Set delay
   */
  delay(value) {
    this.config.delay = typeof value === "number" ? `${value}ms` : value;
    return this;
  }

  /**
   * Set iteration count
   */
  repeat(count) {
    this.config.iterationCount = count === "infinite" ? "infinite" : String(count);
    return this;
  }

  /**
   * Set direction
   */
  direction(value) {
    this.config.direction = value;
    return this;
  }

  /**
   * Set fill mode
   */
  fillMode(value) {
    this.config.fillMode = value;
    return this;
  }

  /**
   * Generate CSS keyframes
   */
  toKeyframes() {
    const frames = this.keyframes
      .sort((a, b) => a.percentage - b.percentage)
      .map((frame) => {
        const styles = Object.entries(frame.styles)
          .map(([prop, value]) => {
            const cssProp = prop.replace(
              /[A-Z]/g,
              (letter) => `-${letter.toLowerCase()}`
            );
            return `${cssProp}: ${value}`;
          })
          .join("; ");
        return `${frame.percentage}% { ${styles}; }`;
      })
      .join("\n  ");

    return `@keyframes ${this.name} {
  ${frames}
}`;
  }

  /**
   * Generate CSS animation property
   */
  toCss() {
    const { duration, timingFunction, delay, iterationCount, direction, fillMode } =
      this.config;

    return `${this.name} ${duration} ${timingFunction} ${delay} ${iterationCount} ${direction} ${fillMode}`;
  }

  /**
   * Generate inline styles
   */
  toStyles() {
    return {
      animation: this.toCss(),
    };
  }

  /**
   * Clone builder
   */
  clone() {
    const cloned = new AnimationBuilder(this.name);
    cloned.keyframes = [...this.keyframes];
    cloned.config = { ...this.config };
    return cloned;
  }
}

/**
 * Create animation builder
 */
export function createAnimation(name) {
  return new AnimationBuilder(name);
}

/**
 * Pre-built animations
 */
export const animations = {
  /**
   * Fade in
   */
  fadeIn: (duration = "300ms") =>
    createAnimation("fadeIn")
      .from({ opacity: "0" })
      .to({ opacity: "1" })
      .duration(duration)
      .ease("easeOut"),

  /**
   * Fade out
   */
  fadeOut: (duration = "300ms") =>
    createAnimation("fadeOut")
      .from({ opacity: "1" })
      .to({ opacity: "0" })
      .duration(duration)
      .ease("easeIn"),

  /**
   * Slide in from left
   */
  slideInLeft: (duration = "300ms", distance = "100%") =>
    createAnimation("slideInLeft")
      .from({ transform: `translateX(-${distance})`, opacity: "0" })
      .to({ transform: "translateX(0)", opacity: "1" })
      .duration(duration)
      .ease("easeOut"),

  /**
   * Slide in from right
   */
  slideInRight: (duration = "300ms", distance = "100%") =>
    createAnimation("slideInRight")
      .from({ transform: `translateX(${distance})`, opacity: "0" })
      .to({ transform: "translateX(0)", opacity: "1" })
      .duration(duration)
      .ease("easeOut"),

  /**
   * Slide in from top
   */
  slideInTop: (duration = "300ms", distance = "100%") =>
    createAnimation("slideInTop")
      .from({ transform: `translateY(-${distance})`, opacity: "0" })
      .to({ transform: "translateY(0)", opacity: "1" })
      .duration(duration)
      .ease("easeOut"),

  /**
   * Slide in from bottom
   */
  slideInBottom: (duration = "300ms", distance = "100%") =>
    createAnimation("slideInBottom")
      .from({ transform: `translateY(${distance})`, opacity: "0" })
      .to({ transform: "translateY(0)", opacity: "1" })
      .duration(duration)
      .ease("easeOut"),

  /**
   * Scale in
   */
  scaleIn: (duration = "300ms") =>
    createAnimation("scaleIn")
      .from({ transform: "scale(0)", opacity: "0" })
      .to({ transform: "scale(1)", opacity: "1" })
      .duration(duration)
      .ease("easeOut"),

  /**
   * Scale out
   */
  scaleOut: (duration = "300ms") =>
    createAnimation("scaleOut")
      .from({ transform: "scale(1)", opacity: "1" })
      .to({ transform: "scale(0)", opacity: "0" })
      .duration(duration)
      .ease("easeIn"),

  /**
   * Bounce
   */
  bounce: (duration = "600ms") =>
    createAnimation("bounce")
      .from({ transform: "translateY(0)" })
      .at(25, { transform: "translateY(-20px)" })
      .at(50, { transform: "translateY(0)" })
      .at(75, { transform: "translateY(-10px)" })
      .to({ transform: "translateY(0)" })
      .duration(duration)
      .ease("easeInOut"),

  /**
   * Shake
   */
  shake: (duration = "500ms") =>
    createAnimation("shake")
      .from({ transform: "translateX(0)" })
      .at(10, { transform: "translateX(-10px)" })
      .at(20, { transform: "translateX(10px)" })
      .at(30, { transform: "translateX(-10px)" })
      .at(40, { transform: "translateX(10px)" })
      .at(50, { transform: "translateX(-10px)" })
      .at(60, { transform: "translateX(10px)" })
      .at(70, { transform: "translateX(-10px)" })
      .at(80, { transform: "translateX(10px)" })
      .at(90, { transform: "translateX(-10px)" })
      .to({ transform: "translateX(0)" })
      .duration(duration),

  /**
   * Pulse
   */
  pulse: (duration = "600ms") =>
    createAnimation("pulse")
      .from({ transform: "scale(1)" })
      .at(50, { transform: "scale(1.05)" })
      .to({ transform: "scale(1)" })
      .duration(duration)
      .ease("easeInOut"),

  /**
   * Spin
   */
  spin: (duration = "1000ms") =>
    createAnimation("spin")
      .from({ transform: "rotate(0deg)" })
      .to({ transform: "rotate(360deg)" })
      .duration(duration)
      .ease("linear")
      .repeat("infinite"),

  /**
   * Wiggle
   */
  wiggle: (duration = "500ms") =>
    createAnimation("wiggle")
      .from({ transform: "rotate(0deg)" })
      .at(25, { transform: "rotate(5deg)" })
      .at(50, { transform: "rotate(0deg)" })
      .at(75, { transform: "rotate(-5deg)" })
      .to({ transform: "rotate(0deg)" })
      .duration(duration),

  /**
   * Heartbeat
   */
  heartbeat: (duration = "1200ms") =>
    createAnimation("heartbeat")
      .from({ transform: "scale(1)" })
      .at(14, { transform: "scale(1.3)" })
      .at(28, { transform: "scale(1)" })
      .at(42, { transform: "scale(1.3)" })
      .at(70, { transform: "scale(1)" })
      .duration(duration),

  /**
   * Flash
   */
  flash: (duration = "500ms") =>
    createAnimation("flash")
      .from({ opacity: "1" })
      .at(25, { opacity: "0" })
      .at(50, { opacity: "1" })
      .at(75, { opacity: "0" })
      .to({ opacity: "1" })
      .duration(duration),

  /**
   * Flip
   */
  flip: (duration = "600ms") =>
    createAnimation("flip")
      .from({ transform: "perspective(400px) rotateY(0)" })
      .at(40, { transform: "perspective(400px) rotateY(170deg)" })
      .at(50, { transform: "perspective(400px) rotateY(190deg)" })
      .at(80, { transform: "perspective(400px) rotateY(360deg)" })
      .to({ transform: "perspective(400px) rotateY(360deg)" })
      .duration(duration),
};

/**
 * Animation Sequence Builder
 */
export class AnimationSequence {
  constructor() {
    this.steps = [];
  }

  /**
   * Add step to sequence
   */
  step(animation, options = {}) {
    this.steps.push({ animation, options });
    return this;
  }

  /**
   * Generate CSS for sequence
   */
  toCss() {
    let totalDelay = 0;
    const animations = [];

    for (const { animation, options } of this.steps) {
      const cloned = animation.clone();
      cloned.delay(totalDelay);

      if (options.duration) {
        cloned.duration(options.duration);
      }

      animations.push(cloned.toCss());

      // Parse duration
      const durationMs =
        typeof cloned.config.duration === "string"
          ? parseFloat(cloned.config.duration)
          : cloned.config.duration;
      totalDelay += durationMs;
    }

    return animations.join(", ");
  }

  /**
   * Generate inline styles
   */
  toStyles() {
    return {
      animation: this.toCss(),
    };
  }
}

/**
 * Create animation sequence
 */
export function createSequence() {
  return new AnimationSequence();
}

/**
 * Timeline builder (parallel animations)
 */
export class AnimationTimeline {
  constructor() {
    this.tracks = [];
  }

  /**
   * Add track to timeline
   */
  add(animation, startTime = 0) {
    this.tracks.push({ animation, startTime });
    return this;
  }

  /**
   * Generate CSS for timeline
   */
  toCss() {
    const animations = this.tracks.map(({ animation, startTime }) => {
      const cloned = animation.clone();
      cloned.delay(startTime);
      return cloned.toCss();
    });

    return animations.join(", ");
  }

  /**
   * Generate inline styles
   */
  toStyles() {
    return {
      animation: this.toCss(),
    };
  }
}

/**
 * Create animation timeline
 */
export function createTimeline() {
  return new AnimationTimeline();
}
