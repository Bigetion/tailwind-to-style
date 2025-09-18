import { createStaticOptionsGenerator } from '../utils/baseGenerator.js';

export default createStaticOptionsGenerator('bg', 'background-repeat', {
  values: {
    repeat: 'repeat',
    'no-repeat': 'no-repeat',
    'repeat-x': 'repeat-x',
    'repeat-y': 'repeat-y',
    'repeat-round': 'round',
    'repeat-space': 'space'
  }
});
