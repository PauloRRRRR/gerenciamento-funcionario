// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd6mXulvuRGPdyCtTgQykZ-apye0LpT3k",
  authDomain: "gerenciamento-funcionario.firebaseapp.com",
  projectId: "gerenciamento-funcionario",
  storageBucket: "gerenciamento-funcionario.firebasestorage.app",
  messagingSenderId: "172089784207",
  appId: "1:172089784207:web:0b01f4353d7e10ec3bfdfa",
  measurementId: "G-BGLP30Z89G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa e exporta os serviços
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);