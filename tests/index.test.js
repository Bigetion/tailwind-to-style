import { tws, twsx } from '../dist/index.esm.js';

describe('tws function', () => {  test('converts tailwind classes to inline CSS', () => {    const result = tws('bg-white mx-auto');
    // Add debug output here too
    console.log('DEBUG - tws CSS output:', result);
    
    expect(result).toContain('background-color: rgba(255,255,255, 1)');
    expect(result).toContain('margin-left: auto');
    expect(result).toContain('margin-right: auto');
  });
  test('converts tailwind classes to JSON object', () => {
    const result = tws('bg-white mx-auto', 1);
    // Debug output to see what we're actually getting
    console.log('DEBUG - tws output:', JSON.stringify(result, null, 2));
    
    expect(result).toHaveProperty('backgroundColor', 'rgba(255,255,255, 1)');
    expect(result).toHaveProperty('marginLeft', 'auto');
    expect(result).toHaveProperty('marginRight', 'auto');
  });
});

describe('twsx function', () => {
  test('handles nested styles', () => {
    const result = twsx({
      '.card': [
        'bg-white p-4 rounded-lg',
        {
          '&:hover': 'shadow-lg',
          '.title': 'text-lg font-bold'
        }
      ]
    });
    
    // Add debug output for twsx result
    console.log('DEBUG - twsx output:', result);
    
    expect(result).toContain('.card');
    expect(result).toContain('.card:hover');
    expect(result).toContain('.card .title');
  });
});
