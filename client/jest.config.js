export default  {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [],
    
    // ModuleNameMapper only if we need to import CSS into our components for testing
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js',
    },
}