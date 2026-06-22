import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ==========================================
// ⚠️ SUBSTITUA OS DADOS ABAIXO COM OS SEUS DO FIREBASE
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyAdV9bTYlrYfHEzd3di09XODm-5UFn1Awk",
    authDomain: "meu-bau-de-codigos.firebaseapp.com",
    projectId: "meu-bau-de-codigos",
    storageBucket: "meu-bau-de-codigos.firebasestorage.app",
    messagingSenderId: "363691561825",
    appId: "1:363691561825:web:6913caaa57036117f5eb20"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const codigosCollection = collection(db, "codigos");