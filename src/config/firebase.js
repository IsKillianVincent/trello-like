import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBoqup0PgTCNhVfNTSMMKyU2qeQce1ufjw",
  authDomain: "trello-rn-v2.firebaseapp.com",
  projectId: "trello-rn-v2",
  storageBucket: "trello-rn-v2.appspot.com",
  messagingSenderId: "726740458439",
  appId: "1:726740458439:web:8c8be799c1be1743e8d7e2"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

const storage = getStorage(app);

export { auth, db, storage };
