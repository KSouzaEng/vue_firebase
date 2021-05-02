import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
let firebaseConfig = {
    apiKey: "AIzaSyBx0bdSDfTS58MRCTOtnnRT-AZKdiagIRk",
    authDomain: "vueapp-4d71b.firebaseapp.com",
    projectId: "vueapp-4d71b",
    storageBucket: "vueapp-4d71b.appspot.com",
    messagingSenderId: "508813664095",
    appId: "1:508813664095:web:f0b271b7961e247e4060ea",
    measurementId: "G-1DDV2CDLXK"
  };
  // Initialize Firebase
  if(firebase.app.length){
  firebase.initializeApp(firebaseConfig)
  }
  export default firebase;