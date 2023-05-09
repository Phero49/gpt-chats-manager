// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1Llp4tlSn0swVLA8YYPsU5JBi3cWeJyQ",
    authDomain: "gpt-chat-manger.firebaseapp.com",
    projectId: "gpt-chat-manger",
    storageBucket: "gpt-chat-manger.appspot.com",
    messagingSenderId: "468883781787",
    appId: "1:468883781787:web:0e7447dae473888fd9ee3e",
    measurementId: "G-XLX0T6X0T0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);