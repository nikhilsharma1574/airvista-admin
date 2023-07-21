// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC4y1Z2Y11he8pKIqdbU1OJsunNLxOrymY",
    authDomain: "airvista-655b4.firebaseapp.com",
    projectId: "airvista-655b4",
    storageBucket: "airvista-655b4.appspot.com",
    messagingSenderId: "229677248226",
    appId: "1:229677248226:web:b257a8a0b8a95531df38bb",
    measurementId: "G-YJ4P2Q23Y2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);