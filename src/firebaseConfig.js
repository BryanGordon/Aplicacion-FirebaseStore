import firebase from 'firebase/app';
import 'firebase/firestore'

const config= {
    apiKey: "AIzaSyBeIgCW9EE5-TYBMqoVqFgM55DzLRNr4pM",
    authDomain: "react-practica1.firebaseapp.com",
    projectId: "react-practica1",
    storageBucket: "react-practica1.appspot.com",
    messagingSenderId: "527073604761",
    appId: "1:527073604761:web:cfc7929991e02fc220f408",
    measurementId: "G-W6L73LRS4R"
  };

  const fire=firebase.initializeApp(config);
  const store=fire.firestore()

  export {store}