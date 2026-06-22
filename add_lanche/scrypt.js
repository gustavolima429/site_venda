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

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const codigosCollection = collection(db, "codigos");

document.getElementById('btnSalvar').addEventListener('click', salvarCodigo);

async function salvarCodigo() {
    const tituloInput = document.getElementById('titulo');
    const descricaoInput = document.getElementById('descricao');
    const quantidadeInput = document.getElementById('quantidade');

    if (!tituloInput.value.trim() || !quantidadeInput.value.trim()) {
        alert('Preencha o Título e o Código!');
        return;
    }

    try {
        // Salva diretamente na nuvem do Firebase
        await addDoc(codigosCollection, {
            titulo: tituloInput.value,
            descricao: descricaoInput.value,
            quantidade: quantidadeInput.value,
            criadoEm: Date.now() // Usado para ordenar
        });

        tituloInput.value = '';
        descricaoInput.value = '';
        quantidadeInput.value = '';

    } catch (error) {
        console.error("Erro ao salvar: ", error);
        alert("Erro ao salvar na nuvem.");
    }
    
}
