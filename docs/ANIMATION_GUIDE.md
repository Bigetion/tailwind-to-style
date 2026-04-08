# Animation System Guide

This guide explains when and how to use the different animation systems in `tailwind-to-style`.

## Decision Matrix

Use this matrix to choose the right animation approach for your use case:

| Use Case | Approach | Reason |
|----------|----------|--------|
| Simple hover effects | `twsxClassName` with `hover:` | CSS-only, no JS needed |
| Page transitions | `animate()` | Full control, interruptible |
| Enter/exit animations | `twsxClassName` with `enter/exit` | Declarative, easy to use |
| Sequential animations | `chain()` | Step-by-step timing |
| List animations | `stagger()` | Coordinated delays |
| Interactive animations | `animate()` with controls | Play/pause/reverse |
| Loading spinners | Tailwind `animate-spin` | Zero config |
| Scroll-triggered | External library | Use Intersection Observer |

## Quick Reference

### CSS Transitions (Simple State Changes)

Best for: hover, focus, active states

```javascript
import { twsxClassName } from 'tailwind-to-style';

const button = twsxClassName({
  _: 'bg-blue-500 transition-colors duration-200',
  hover: 'bg-blue-600',
  active: 'bg-blue-700'
});
```

### CSS Keyframe Animations (Looping/Predefined)

Best for: spinners, pulsing, continuous animations

```javascript
// Using Tailwind animation utilities
const spinner = twsxClassName({
  _: 'animate-spin'
});

// Custom animation
const pulse = twsxClassName({
  animation: {
    keyframes: {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.5 }
    },
    duration: '2s',
    iteration: 'infinite'
  }
});
```

### Enter/Exit Transitions (Component Mounting)

Best for: modals, dropdowns, notifications

```javascript
const modal = twsxClassName({
  _: 'bg-white rounded-lg shadow-xl',
  // Enter animation
  enter: 'transition-all duration-300',
  enterFrom: 'opacity-0 scale-95',
  enterTo: 'opacity-100 scale-100',
  // Exit animation
  exit: 'transition-all duration-200',
  leaveFrom: 'opacity-100 scale-100',
  leaveTo: 'opacity-0 scale-95'
});
```

### Imperative Animations (JavaScript Control)

Best for: complex sequences, user interactions, interruptible animations

```javascript
import { animate, chain, stagger } from 'tailwind-to-style';

// Single element animation
const ctrl = animate(element, 'fadeIn', { duration: 400 });

// Sequential animations
await chain(element, ['fadeIn', 'slideUp', 'pulse']);

// Staggered list animation
stagger('.list-item', 'fadeIn', { delay: 50 });
```

## Animation APIs

### 1. `twsxClassName` Animation Config

Declarative CSS-based animations:

```javascript
const notification = twsxClassName({
  name: 'notification',
  _: 'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg',
  
  // Animation preset
  animation: 'slideInRight', // or 'fadeIn', 'bounce', etc.
  
  // OR custom keyframes
  animation: {
    keyframes: {
      '0%': { transform: 'translateX(100%)' },
      '100%': { transform: 'translateX(0)' }
    },
    duration: '300ms',
    timing: 'ease-out'
  }
});
```

### 2. `animate()` Function

For programmatic control:

```javascript
import { animate } from 'tailwind-to-style';

// Basic usage
const animation = animate(element, 'fadeIn');

// With options
const animation = animate(element, 'slideUp', {
  duration: 500,
  easing: 'spring',
  delay: 100,
  onComplete: () => console.log('Done!')
});

// Control methods
animation.pause();
animation.play();
animation.reverse();
animation.cancel();
animation.seek(0.5); // Jump to 50%
```

### 3. `chain()` Function

For sequential animations:

```javascript
import { chain } from 'tailwind-to-style';

// Sequential execution
await chain(element, [
  'fadeIn',
  { name: 'slideUp', delay: 200 },
  'pulse'
]);

// With progress tracking
const controller = chain(element, ['fadeIn', 'slideUp']);
console.log(controller.progress); // 0 to 1
console.log(controller.currentStep); // 0, 1, 2...
```

### 4. `stagger()` Function

For list animations:

```javascript
import { stagger } from 'tailwind-to-style';

// Stagger elements with delay
const controller = stagger('.card', 'fadeIn', {
  delay: 50, // 50ms between each
  from: 'start' // 'start', 'end', 'center', 'random'
});

// Control all animations
controller.pauseAll();
controller.playAll();
await controller.waitAll();
```

## Animation Presets

| Preset | Description | Best For |
|--------|-------------|----------|
| `fadeIn` / `fadeOut` | Opacity change | General transitions |
| `slideUp` / `slideDown` | Vertical slide | Lists, menus |
| `slideLeft` / `slideRight` | Horizontal slide | Sidebars, notifications |
| `zoomIn` / `zoomOut` | Scale transform | Modals, images |
| `bounce` | Bouncing effect | Attention, success |
| `shake` | Horizontal shake | Error, validation |
| `pulse` | Subtle scale pulse | Loading, highlight |
| `spin` | Continuous rotation | Loading spinners |

## Easing Presets

| Easing | Feeling | Use Case |
|--------|---------|----------|
| `linear` | Mechanical | Progress bars |
| `ease` | Natural | General |
| `easeIn` | Accelerating | Exits |
| `easeOut` | Decelerating | Entries |
| `easeInOut` | Natural | Switches |
| `spring` | Bouncy | Interactive |
| `bounce` | Very bouncy | Playful UI |

## Performance Tips

### Do's

- ✅ Animate `transform` and `opacity` (GPU accelerated)
- ✅ Use `will-change` for known animations
- ✅ Cancel animations when component unmounts
- ✅ Use `stagger` delay for perceived performance

### Don'ts

- ❌ Animate `width`, `height`, `margin` (triggers layout)
- ❌ Animate many elements simultaneously
- ❌ Use long durations (> 500ms feels slow)
- ❌ Animate on scroll without throttling

## Examples

### Loading Button

```javascript
const loadingButton = twsxClassName({
  base: 'px-4 py-2 rounded-lg font-medium',
  variants: {
    loading: {
      true: 'opacity-75 cursor-wait',
      false: ''
    }
  }
});

// Usage
<button className={loadingButton({ loading: isLoading })}>
  {isLoading && <span className="animate-spin mr-2">⏳</span>}
  Submit
</button>
```

### Toast Notification

```javascript
const toast = twsxClassName({
  _: 'fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-lg',
  enter: 'transition-all duration-300 ease-out',
  enterFrom: 'opacity-0 translate-x-full',
  enterTo: 'opacity-100 translate-x-0',
  exit: 'transition-all duration-200 ease-in',
  leaveFrom: 'opacity-100 translate-x-0',
  leaveTo: 'opacity-0 translate-x-full'
});
```

### Staggered List

```javascript
import { stagger } from 'tailwind-to-style';

function showItems() {
  stagger('.list-item', 'fadeIn', {
    delay: 50,
    from: 'start',
    onAllComplete: () => console.log('All items visible')
  });
}
```

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| CSS Transitions | ✅ | ✅ | ✅ | ✅ |
| CSS Animations | ✅ | ✅ | ✅ | ✅ |
| Web Animations API | ✅ 84+ | ✅ 75+ | ✅ 13.1+ | ✅ 84+ |

## See Also

- [ARBITRARY_VALUES.md](./ARBITRARY_VALUES.md) - Arbitrary value syntax
- [BROWSER_SUPPORT.md](./BROWSER_SUPPORT.md) - Browser compatibility
- [README.md](../README.md) - Main documentation
