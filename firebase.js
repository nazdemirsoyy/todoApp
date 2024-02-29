import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, initializeAuth,getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc  } from 'firebase/firestore';



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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

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
  
  const addTaskToFirestore = async (userId, task) => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        userId: userId,
        task: task,
        createdAt: new Date(),
      });
      console.log("Task added!");
      return docRef;
    } catch (error) {
      console.error("Error adding task: ", error);
      throw error; 
    }
  };
    
  
  const getTasksFromFirestore = async (userId) => {
    const q = query(collection(db, "tasks"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    return tasks;
  };
  
  const deleteTaskFromFirestore = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      console.log("Task deleted!");
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };


  export { addTaskToFirestore, getTasksFromFirestore, deleteTaskFromFirestore };
  export { auth, db };
