// Type definitions for tailwind-to-style/animations

export type AnimationPresetName =
  | 'fadeIn' | 'fadeOut'
  | 'slideInUp' | 'slideInDown' | 'slideInLeft' | 'slideInRight'
  | 'scaleIn' | 'scaleOut'
  | 'bounce' | 'shake' | 'pulse' | 'spin' | 'ping';

export interface AnimationKeyframe {
  [property: string]: string;
}

export interface AnimationConfig {
  keyframes: AnimationKeyframe[];
  duration?: string;
  easing?: string;
  delay?: string;
  iterations?: string | number;
  fillMode?: string;
}

export interface AnimateOptions {
  duration?: string;
  easing?: string;
  delay?: string;
  iterations?: string | number;
  fillMode?: string;
}

/**
 * Apply a named animation, returning a className with the animation injected.
 */
export declare function animate(name: AnimationPresetName | string, options?: AnimateOptions): string;

/**
 * Define a custom animation preset.
 */
export declare function defineAnimation(name: string, config: AnimationConfig): void;

/**
 * Get all available animation names (built-in + custom).
 */
export declare function getAnimationNames(): string[];

/**
 * Get an animation preset config by name.
 */
export declare function getPreset(name: string): AnimationConfig | undefined;

/**
 * Clear all injected keyframes and custom animations.
 */
export declare function clearAnimations(): void;

/**
 * Built-in animation presets.
 */
export declare const ANIMATION_PRESETS: Record<AnimationPresetName, AnimationConfig>;
