/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/src/cssstub.ts'
  }
};