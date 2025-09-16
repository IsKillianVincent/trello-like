export const createUserWithEmailAndPassword = jest.fn((_a, email, pwd) =>
  email && pwd ? Promise.resolve({ user: { uid: 'u1', email } }) : Promise.reject(new Error('invalid'))
);
export const sendEmailVerification = jest.fn(() => Promise.resolve());
export const signInWithEmailAndPassword = jest.fn((_a, email, pwd) =>
  email === 'ok@demo.io' && pwd === 'secret'
    ? Promise.resolve({ user: { uid: 'u1' } })
    : Promise.reject(new Error('invalid'))
);
export const sendPasswordResetEmail = jest.fn(() => Promise.resolve());
export const updateProfile = jest.fn(() => Promise.resolve());
export const updateEmail = jest.fn(() => Promise.resolve());
export const updatePassword = jest.fn(() => Promise.resolve());
export const deleteUser = jest.fn(() => Promise.resolve());
