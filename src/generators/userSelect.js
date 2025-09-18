import { createArrayOptionsGenerator } from '../utils/baseGenerator.js';

export default createArrayOptionsGenerator('select', 'user-select', ['none', 'text', 'all', 'auto'], {
  customHandler: (selector, key, value, cssProperty) => `
          ${selector} {
            -webkit-user-select: ${value};
            -moz-user-select: ${value};
            -ms-user-select: ${value};
            ${cssProperty}: ${value};
          }
        `
});
