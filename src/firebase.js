import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAHYWvEBINvpabaBdc5bod9oRc1IGXbGRY",
    authDomain: "student-finance-app-c2c11.firebaseapp.com",
    projectId: "student-finance-app-c2c11",
    storageBucket: "student-finance-app-c2c11.firebasestorage.app",
    messagingSenderId: "634786520135",
    appId: "1:634786520135:web:7efba08eee536fb92d2562"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;