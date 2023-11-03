import firebase from 'firebase/compat/app';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB2D3FJGf9QAq3jRRt1VYmfNEFeiU8dJJo",
  authDomain: "osce-76d30.firebaseapp.com",
  databaseURL: "https://osce-76d30-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "osce-76d30",
  storageBucket: "osce-76d30.appspot.com",
  messagingSenderId: "774599215418",
  appId: "1:774599215418:web:45b1ed0f16f863af332803"
};

if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
}

const db =getDatabase();

export {db}