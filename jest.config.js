module.exports = {

  roots: ['<rootDir>/src'],
  collectCoverage: true,

  collectCoverageFrom: ['<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/*-protocols.ts',
    '!**/protocols/**'],
  coverageDirectory: 'coverage',

  testEnvironment: 'node',

  transform: { '.+\\.ts$': 'ts-jest' },
  preset: '@shelf/jest-mongodb'
}
