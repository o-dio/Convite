import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC0MJvEq35E9r2loxD71togXrtd__7zX54",
    authDomain: "convite-aniversario-603d0.firebaseapp.com",
    databaseURL: "https://convite-aniversario-603d0-default-rtdb.firebaseio.com",
    projectId: "convite-aniversario-603d0",
    storageBucket: "convite-aniversario-603d0.firebasestorage.app",
    messagingSenderId: "758975909414",
    appId: "1:758975909414:web:2ef4d669a97da0347d60e7"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);