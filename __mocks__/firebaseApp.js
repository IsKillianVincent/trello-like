export const auth = {
  currentUser: { uid: 'uid_test', email: 'test@demo.io', displayName: 'Utilisateur' },
  onAuthStateChanged: (cb) => { cb({ uid: 'uid_test', email: 'test@demo.io' }); return () => {}; },
  signOut: jest.fn().mockResolvedValue(null),
};
export const db = {};
export const storage = {};
