export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/generators/**/*.js', // Exclude generators from coverage for now
    '!src/**/*.test.js'
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 75,
      lines: 80,
      statements: 80
    }
  },
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  testPathIgnorePatterns: ['/node_modules/', '/benchmarks/'],
  transformIgnorePatterns: [
    'node_modules/(?!(react|react-dom)/)',
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
