import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAj14qsimNgLKUqqeaY2g5ApJ-Sh7fE5No",
    authDomain: "student-finance-app-8d822.firebaseapp.com",
    projectId: "student-finance-app-8d822",
    storageBucket: "student-finance-app-8d822.firebasestorage.app",
    messagingSenderId: "413163859254",
    appId: "1:413163859254:web:9323248e9e7d6a68a25797"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;