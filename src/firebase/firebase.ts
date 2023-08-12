// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE_o3VPo_iddViivSy5g3Ebpz1GNh-43c",
  authDomain: "seller-25c97.firebaseapp.com",
  projectId: "seller-25c97",
  storageBucket: "seller-25c97.appspot.com",
  messagingSenderId: "796610222896",
  appId: "1:796610222896:web:078715417a78dc4ef246f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage()
export const auth = getAuth()
export const db = getFirestore()