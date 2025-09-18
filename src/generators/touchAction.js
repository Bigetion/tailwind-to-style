import { createArrayOptionsGenerator } from '../utils/baseGenerator.js';

export default createArrayOptionsGenerator('touch', 'touch-action', [
  'auto',
  'none',
  'pan-x',
  'pan-left',
  'pan-right',
  'pan-y',
  'pan-up',
  'pan-down',
  'pinch-zoom',
  'manipulation'
]);
