export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        useESM: true,
      },
    ],
    '^.+\\.[jt]sx?$': 'babel-jest', // This line is crucial for JS/TS/JSX/TSX files
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};