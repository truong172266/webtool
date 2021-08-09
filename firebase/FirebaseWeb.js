import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCpCE9jyqrLkDEUstipfzXfhKdSAU-yvfM",
    authDomain: "template-ui.firebaseapp.com",
    projectId: "template-ui",
    storageBucket: "template-ui.appspot.com",
    messagingSenderId: "678691011139",
    appId: "1:678691011139:web:3de78eefde36b5d4a972f6",
    measurementId: "G-BDLJF5C0EV"
};

export const FirebaseWeb = firebase.initializeApp(firebaseConfig);
