module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-community|react-native-vector-icons|expo(-.*)?|@expo(-.*)?)/)',
  ],
  moduleNameMapper: {
    '\\.(png|jpg|jpeg|gif|webp)$': '<rootDir>/__mocks__/fileMock.js',
    '^react-native-vector-icons/(.*)$': '<rootDir>/__mocks__/react-native-vector-icons.js',
  },
};