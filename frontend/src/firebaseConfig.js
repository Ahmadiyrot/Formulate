// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY-R0lpEM1PeEok31XMtaH2PrJB1u5ghs",
  authDomain: "formulate-137ae.firebaseapp.com",
  projectId: "formulate-137ae",
  storageBucket: "formulate-137ae.appspot.com",
  messagingSenderId: "506096171510",
  appId: "1:506096171510:web:ce52c476ce6b2d76486fd7",
  measurementId: "G-J9F4EFJ47Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // Initialize Firebase storage

export { storage };
