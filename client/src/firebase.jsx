const dotenv = require("dotenv");

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

dotenv.config();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "coslike-uploads.firebaseapp.com",
  projectId: "coslike-uploads",
  storageBucket: "coslike-uploads.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
