import { createStaticOptionsGenerator } from '../utils/baseGenerator.js';

export default createStaticOptionsGenerator('bg-clip', 'background-clip', {
  values: {
    border: 'border-box',
    padding: 'padding-box',
    content: 'content-box',
    text: 'text'
  },
  customHandler: (selector, key, value, cssProperty) => `
          ${selector} {
            -webkit-background-clip: ${value};
            ${cssProperty}: ${value};
          }
        `
});
