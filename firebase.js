// Import the functions you need from the SDKs you need
//import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG3mAgLrPrfmVfbR06xW8L4t0d2bsGjpI",
  authDomain: "todoapp-2ad98.firebaseapp.com",
  projectId: "todoapp-2ad98",
  storageBucket: "todoapp-2ad98.appspot.com",
  messagingSenderId: "931889341653",
  appId: "1:931889341653:web:7f02aee0577bcf44286e5c"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const handleSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
  };
  
  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
  };
  

  export { auth };
