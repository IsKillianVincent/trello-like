export const collection = jest.fn();
export const addDoc = jest.fn().mockResolvedValue({ id: 'new-id' });
export const onSnapshot = jest.fn((_ref, onNext, _onErr) => { onNext?.({ docs: [] }); return () => {}; });
export const doc = jest.fn();
export const getDoc = jest.fn(async () => ({
  exists: () => true,
  data: () => ({ name: 'Projet X', columns: ['Backlog','À faire','En cours','Fait'] })
}));
export const updateDoc = jest.fn().mockResolvedValue(null);
export const deleteDoc = jest.fn().mockResolvedValue(null);
export const serverTimestamp = jest.fn(() => new Date());
export const query = jest.fn();
export const where = jest.fn();
