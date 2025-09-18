import { createStaticOptionsGenerator } from '../utils/baseGenerator.js';

export default createStaticOptionsGenerator('bg-origin', 'background-origin', {
  values: {
    border: 'border-box',
    padding: 'padding-box',
    content: 'content-box'
  },
  customHandler: (selector, key, value, cssProperty) => `
          ${selector} {
            -webkit-background-origin: ${value};
            ${cssProperty}: ${value};
          }
        `
});
