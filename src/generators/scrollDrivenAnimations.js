/**
 * Scroll-Driven Animations Generator
 * 
 * CSS Scroll Animations (Chrome 115+):
 * - view-timeline (element visibility in scrollport)
 * - scroll-timeline (scroll position based)
 * - animation-timeline
 * - animation-range
 * - scroll-driven keyframes presets
 * 
 * @module generators/scrollDrivenAnimations
 */

import { generateCssString } from "../utils/index";

export default function generator(configOptions = {}) {
  const { prefix: globalPrefix } = configOptions;
  const prefix = `${globalPrefix}`;

  const responsiveCssString = generateCssString(() => {
    let cssString = "";

    // ========================================
    // VIEW-TIMELINE
    // ========================================
    cssString += `
      ${prefix}view-timeline {
        view-timeline: --view block;
      }
      ${prefix}view-timeline-block {
        view-timeline: --view block;
      }
      ${prefix}view-timeline-inline {
        view-timeline: --view inline;
      }
      ${prefix}view-timeline-x {
        view-timeline: --view x;
      }
      ${prefix}view-timeline-y {
        view-timeline: --view y;
      }
    `;

    // ========================================
    // ANIMATION-TIMELINE
    // ========================================
    cssString += `
      ${prefix}animation-timeline-view {
        animation-timeline: view();
      }
      ${prefix}animation-timeline-scroll {
        animation-timeline: scroll();
        animation-range: entry 0% cover 50%;
      }
      ${prefix}animation-timeline-view-block {
        animation-timeline: view(block);
      }
      ${prefix}animation-timeline-view-inline {
        animation-timeline: view(inline);
      }
      ${prefix}animation-timeline-auto {
        animation-timeline: auto;
      }
      ${prefix}animation-timeline-none {
        animation-timeline: none;
      }
    `;

    // ========================================
    // ANIMATION-RANGE
    // ========================================
    cssString += `
      ${prefix}animation-range-entry {
        animation-range: entry 0% entry 100%;
      }
      ${prefix}animation-range-exit {
        animation-range: exit 0% exit 100%;
      }
      ${prefix}animation-range-cover {
        animation-range: cover 0% cover 100%;
      }
      ${prefix}animation-range-contain {
        animation-range: contain 0% contain 100%;
      }
      ${prefix}animation-range-entry-crossing {
        animation-range: entry-crossing 0% entry-crossing 100%;
      }
      ${prefix}animation-range-exit-crossing {
        animation-range: exit-crossing 0% exit-crossing 100%;
      }
      ${prefix}animation-range-entry-cover {
        animation-range: entry 0% cover 50%;
      }
      ${prefix}animation-range-cover-exit {
        animation-range: cover 50% exit 100%;
      }
    `;

    // ========================================
    // SCROLL-DRIVEN ANIMATION PRESETS
    // ========================================
    cssString += `
      ${prefix}scroll-fade-in {
        animation: scrollFadeIn linear both;
        animation-timeline: view();
        animation-range: entry 0% cover 40%;
      }
      ${prefix}scroll-fade-out {
        animation: scrollFadeOut linear both;
        animation-timeline: view();
        animation-range: contain 60% exit 100%;
      }
      ${prefix}scroll-scale-up {
        animation: scrollScaleUp linear both;
        animation-timeline: view();
        animation-range: entry 0% cover 50%;
      }
      ${prefix}scroll-scale-down {
        animation: scrollScaleDown linear both;
        animation-timeline: view();
        animation-range: contain 50% exit 100%;
      }
      ${prefix}scroll-slide-up {
        animation: scrollSlideUp linear both;
        animation-timeline: view();
        animation-range: entry 0% cover 50%;
      }
      ${prefix}scroll-slide-down {
        animation: scrollSlideDown linear both;
        animation-timeline: view();
        animation-range: contain 50% exit 100%;
      }
      ${prefix}scroll-reveal {
        animation: scrollReveal linear both;
        animation-timeline: view();
        animation-range: entry 0% cover 40%;
      }
      ${prefix}scroll-blur-in {
        animation: scrollBlurIn linear both;
        animation-timeline: view();
        animation-range: entry 0% cover 50%;
      }
      ${prefix}scroll-rotate-in {
        animation: scrollRotateIn linear both;
        animation-timeline: view();
        animation-range: entry 0% cover 50%;
      }
      ${prefix}scroll-progress-bar {
        animation: scrollProgress linear both;
        animation-timeline: scroll();
      }
      ${prefix}scroll-parallax-slow {
        animation: scrollParallaxSlow linear both;
        animation-timeline: view();
        animation-range: entry 0% exit 100%;
      }
      ${prefix}scroll-parallax-fast {
        animation: scrollParallaxFast linear both;
        animation-timeline: view();
        animation-range: entry 0% exit 100%;
      }
    `;

    // ========================================
    // KEYFRAMES FOR SCROLL-DRIVEN ANIMATIONS
    // ========================================
    cssString += `
      @keyframes scrollFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes scrollFadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
      @keyframes scrollScaleUp {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      @keyframes scrollScaleDown {
        from { transform: scale(1); opacity: 1; }
        to { transform: scale(0.8); opacity: 0; }
      }
      @keyframes scrollSlideUp {
        from { transform: translateY(60px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes scrollSlideDown {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(60px); opacity: 0; }
      }
      @keyframes scrollReveal {
        from { clip-path: inset(0 100% 0 0); opacity: 0; }
        to { clip-path: inset(0 0 0 0); opacity: 1; }
      }
      @keyframes scrollBlurIn {
        from { filter: blur(10px); opacity: 0; }
        to { filter: blur(0); opacity: 1; }
      }
      @keyframes scrollRotateIn {
        from { transform: rotate(-5deg) scale(0.9); opacity: 0; }
        to { transform: rotate(0) scale(1); opacity: 1; }
      }
      @keyframes scrollProgress {
        from { transform: scaleX(0); }
        to { transform: scaleX(1); }
      }
      @keyframes scrollParallaxSlow {
        from { transform: translateY(-50px); }
        to { transform: translateY(50px); }
      }
      @keyframes scrollParallaxFast {
        from { transform: translateY(-150px); }
        to { transform: translateY(150px); }
      }
    `;

    // ========================================
    // TIMELINE-SCOPE (for named timelines)
    // ========================================
    cssString += `
      ${prefix}timeline-scope-view {
        timeline-scope: --view;
      }
      ${prefix}timeline-scope-scroll {
        timeline-scope: --scroll;
      }
    `;

    return cssString;
  }, configOptions);

  return responsiveCssString;
}
