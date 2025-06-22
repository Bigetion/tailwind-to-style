export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/'],  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
