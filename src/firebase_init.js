import {initializeApp} from 'firebase/app';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDtzjcawQ7BqPclNI97yTDtYfSmwlbYR3s",
  authDomain: "simpel-d0665.firebaseapp.com",
  databaseURL: "https://simpel-d0665.firebaseio.com",
  projectId: "simpel-d0665",
  storageBucket: "simpel-d0665.appspot.com",
  messagingSenderId: "639440256441",
  appId: "1:639440256441:web:1cbb587cdb63272896ca68",
  measurementId: "G-HPH80GZQQ3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
export default database;