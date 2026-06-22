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

    const containerLista = document.getElementById('listaCodigos');
    containerLista.innerHTML = '<div class="carregando">Buscando seus códigos na nuvem...</div>';

    try {
        // Busca os dados ordenando pelos mais recentes
        const q = query(codigosCollection, orderBy("criadoEm", "desc"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            containerLista.innerHTML = `<div class="sem-codigos">Nenhum código na nuvem ainda!</div>`;
            return;
        }

        let html = '';
        querySnapshot.forEach((doc) => {
            const item = doc.data();
            html += `
                        <div class="card-codigo">
                            <div class="topo-card">
                                <h3>${escaparHTML(item.titulo)}</h3>
                                <button class="btn-deletar" onclick="deletarCodigo('${doc.id}')">Excluir</button>
                            </div>
                            ${item.descricao ? `<p class="descricao">${escaparHTML(item.descricao)}</p>` : ''}
                            <pre><code>${escaparHTML(item.codigo)}</code></pre>
                        </div>
                    `;
        });
        containerLista.innerHTML = html;
    } catch (error) {
        console.error("Erro ao carregar: ", error);
        containerLista.innerHTML = '<div class="sem-codigos" style="color: var(--cor-perigo)">Erro ao carregar dados da nuvem. Verifique suas chaves de configuração.</div>';
    }
