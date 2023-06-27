// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATwh6Zw7-fG5lcbaPJUx21mmIWSzwDurU",
  authDomain: "coslike-uploads.firebaseapp.com",
  projectId: "coslike-uploads",
  storageBucket: "coslike-uploads.appspot.com",
  messagingSenderId: "176126108349",
  appId: "1:176126108349:web:503615f82f18d11df14dd4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
