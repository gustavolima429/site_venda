import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

// Função auxiliar simples para proteger seu HTML contra códigos maliciosos (XSS)
function escaparHTML(texto) {
    if (!texto) return '';
    return texto
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

carregarCodigos();

async function carregarCodigos() {
    const containerLista = document.getElementById('listaCodigos');
    if (!containerLista) return; // Segurança caso a div não exista na tela

    containerLista.innerHTML = '<div class="carregando">Buscando seus códigos na nuvem...</div>';

    try {
        // 1. DESCOMENTADO: Faz a busca ordenada no Firebase
        const q = query(codigosCollection, orderBy("criadoEm", "desc"));
        const querySnapshot = await getDocs(q);

        // Verifica se a coleção está vazia
        if (querySnapshot.empty) {
            containerLista.innerHTML = `<div class="sem-codigos">Nenhum código na nuvem ainda!</div>`;
            return;
        }

        let html = '';

        // 2. DESCOMENTADO E AJUSTADO: Passa por cada item real do Firebase
        querySnapshot.forEach((doc) => {
            const item = doc.data();

            // Monta o cartão com os dados reais salvos no banco
            html += `
                <div class="Cartao">
                    <div class="topo-Cartao">
                        <h3>${escaparHTML(item.titulo)}</h3>
                    </div>
                    <p class="descricao-Cartao">${escaparHTML(item.descricao || 'Sem descrição')}</p>
                    <small>Código/Qtd: ${escaparHTML(item.quantidade)}</small>
                </div>
            `;
        });

        // Injeta todas as linhas geradas dentro do container do HTML
        containerLista.innerHTML = html;

    } catch (error) {
        console.error("Erro ao carregar: ", error);
        containerLista.innerHTML = '<div class="sem-codigos" style="color: red">Erro ao carregar dados da nuvem. Verifique o console.</div>';
    }
}

// Executa a função assim que a página abre
