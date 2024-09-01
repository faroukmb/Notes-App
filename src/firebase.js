
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAohqt9ZKuc84Ybb2Zs9KTAo78hJz5uiU0",
  authDomain: "note-app-5226e.firebaseapp.com",
  projectId: "note-app-5226e",
  storageBucket: "note-app-5226e.appspot.com",
  messagingSenderId: "35662563062",
  appId: "1:35662563062:web:96031f2466dc1571410ed7"
};


const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const notesCollection = collection(db,"notes");