import { createArrayOptionsGenerator } from '../utils/baseGenerator.js';

export default createArrayOptionsGenerator('box-decoration', 'box-decoration-break', ['slice', 'clone'], {
  customHandler: (selector, key, value, cssProperty) => `
          ${selector} {
            ${cssProperty}: ${value};
            -webkit-box-decoration-break: ${value};
          }
        `
});
