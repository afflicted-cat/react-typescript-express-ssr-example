const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig');

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  collectCoverage: false,
  coverageThreshold: {
    global: {
      lines: 70,
      branches: 70,
      functions: 80,
      statements: -10
    }
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
    ...pathsToModuleNameMapper(compilerOptions.paths)
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/*.+(ts|js)', '**/*.test.(ts|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
};
