import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/__tests__'], // This tells Jest to look for tests in the root directory
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js|jsx)', '**/?(*.)+(spec|test).+(ts|tsx|js|jsx)'], // This defines the pattern Jest uses to detect test files
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // This specifies the file extensions Jest will look for
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
};

export default config;
