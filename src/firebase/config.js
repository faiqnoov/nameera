import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAI063gbwVAVc0f3GQhC1EItR4cCopUnSM",
  authDomain: "nameera-spa.firebaseapp.com",
  projectId: "nameera-spa",
  storageBucket: "nameera-spa.appspot.com",
  messagingSenderId: "559579440267",
  appId: "1:559579440267:web:9ef7910f258c6e5cd7608e"
};

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

export { db }