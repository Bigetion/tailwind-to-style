import { createStaticOptionsGenerator } from '../utils/baseGenerator.js';

export default createStaticOptionsGenerator('snap', 'scroll-snap-align', {
  values: {
    start: 'start',
    end: 'end',
    center: 'center',
    'align-none': 'none'
  }
});
