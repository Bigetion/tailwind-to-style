// ESLint 9+ Flat Config
// Modern ESLint configuration for ES2024+

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        performance: 'readonly',
        // Node.js globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        global: 'readonly',
        Buffer: 'readonly',
      },
    },
    rules: {
      // Error prevention
      'no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_' 
      }],
      'no-undef': 'error',
      'no-constant-condition': ['error', { checkLoops: false }],
      
      // Best practices
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-console': 'off', // We use logger now
      'prefer-const': 'warn',
      'no-var': 'error',
      
      // Style
      'semi': ['error', 'always'],
      'quotes': ['warn', 'double', { avoidEscape: true }],
      'comma-dangle': ['warn', 'only-multiline'],
    },
  },
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly',
      },
    },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      '*.min.js',
      'rollup.config.js',
      'rollup.config.mjs',
    ],
  },
];
