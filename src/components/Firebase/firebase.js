import * as firebase from "firebase";
import firestore from "firebase/firestore";



const config = {
    apiKey: "AIzaSyDWBNWSuT6LNCBpwz5XfjDKrcB2KACuSf8",
    authDomain: "collection-app-65580.firebaseapp.com",
    databaseURL: "https://collection-app-65580.firebaseio.com",
    projectId: "collection-app-65580",
    storageBucket: "collection-app-65580.appspot.com",
    messagingSenderId: "518410931929",
    appId: "1:518410931929:web:03ab16c63df9f94cb178c8"
};

firebase.initializeApp(config);



export default firebase;