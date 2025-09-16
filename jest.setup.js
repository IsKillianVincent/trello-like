import '@testing-library/jest-native/extend-expect';

jest.mock('./src/config/firebase', () => require('./__mocks__/firebaseApp'));
jest.mock('firebase/firestore', () => require('./__mocks__/firestore'));
jest.mock('firebase/auth', () => require('./__mocks__/firebase-auth'));
jest.mock('expo-image-picker', () => ({
  MediaTypeOptions: { Images: 'Images', All: 'All' },
  requestMediaLibraryPermissionsAsync: jest.fn(async () => ({ granted: true })),
  LaunchImageLibraryAsync: jest.fn(async () => ({
  canceled: false, assets: [{ uri: 'file:///fake.jpg' }]
  })),
    }), { virtual: true });
jest.mock('expo-av', () => ({ Video: () => null }), { virtual: true });
jest.mock('react-native-dropdown-picker', () => {
  // composant factice qui ne rend rien
  const React = require('react');
  return function DropDownPicker() { return null; };
}, { virtual: true });


const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  console.warn = (...args) => {
    if (typeof args[0] === 'string' &&
        (args[0].includes('Require cycle') || args[0].includes('deprecated'))) return;
    originalWarn(...args);
  };
  console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('not wrapped in act')) return;
  originalError(...args);
};
});

afterAll(() => {
  console.warn = originalWarn;
  console.error = originalError;
});
