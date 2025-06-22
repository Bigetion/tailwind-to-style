import { twsx } from '../src/index';

// Complex nested styles example
const styles = twsx({
  '.container': [
    'max-w-screen-lg mx-auto p-4',
    {
      '.header': [
        'flex items-center justify-between mb-6',
        {
          'h1': 'text-2xl font-bold text-gray-800',
          'nav': [
            'flex space-x-4',
            {
              'a': 'text-blue-500 hover:text-blue-700',
              'a.active': 'font-bold'
            }
          ]
        }
      ],
      '.content': 'bg-white p-6 rounded-lg shadow'
    }
  ]
});

console.log(styles);
