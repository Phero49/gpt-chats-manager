// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCGheRlGVBQZ7EP6MYCePltS9JD_1uAevc",
    authDomain: "xulhub-4bcfc.firebaseapp.com",
    projectId: "xulhub-4bcfc",
    storageBucket: "xulhub-4bcfc.appspot.com",
    messagingSenderId: "50867701292",
    appId: "1:50867701292:web:ebf1650fe2f610e3293389",
    measurementId: "G-6R0HF2JCWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {
    app,
    analytics
}