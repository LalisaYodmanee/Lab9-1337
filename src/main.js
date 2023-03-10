import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
 
import './assets/main.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvsLhg47V8Dg2B_MedzDyROhv3E0jldZY",
  authDomain: "lab9-1337.firebaseapp.com",
  projectId: "lab9-1337",
  storageBucket: "lab9-1337.appspot.com",
  messagingSenderId: "1030824969480",
  appId: "1:1030824969480:web:ba4cc423974624d85c58bd"
};

// Initialize Firebase
const initfirestore = initializeApp(firebaseConfig);
export const db = getFirestore(initfirestore);
const app = createApp(App);


app.use(createPinia())
app.use(router)

app.mount('#app')
