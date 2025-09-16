export const MediaTypeOptions = { Images: 'Images', All: 'All' };
export const requestMediaLibraryPermissionsAsync = jest.fn(async () => ({ granted: true }));
export const launchImageLibraryAsync = jest.fn(async () => ({
  canceled: false, assets: [{ uri: 'file:///fake.jpg' }]
}));
