import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'videoapp-fef3a.firebaseapp.com',
  projectId: 'videoapp-fef3a',
  storageBucket: 'videoapp-fef3a.appspot.com',
  messagingSenderId: '669130824854',
  appId: '1:669130824854:web:e64bc6256cc7d0086e36b7',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
