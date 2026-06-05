// Variable globale pour stocker l'historique du poids
let weightHistory = JSON.parse(localStorage.getItem('jarvis_weight')) || [];

function openModule(name) {
    // Si ce n'est pas le module sport, on garde l'alerte d'origine
    if (name !== 'sport') {
        alert("Module " + name + " en développement");
        return;
    }

    // --- LOGIQUE POUR LE MODULE SPORT ---
    // On récupère le conteneur principal (la div avec la classe .app)
    const appContainer = document.querySelector('.app');
    if (!appContainer) return;

    // On remplace le contenu de l'application par l'interface Sport (look Jarvis-OS)
    appContainer.innerHTML = `
        <div class="topbar">
            <h1>SPORT</h1>
            <div class="online">
                <div class="dot"></div>
                <p>Jarvis Active</p>
            </div>
        </div>

        <div class="card">
            <h2>Statistiques Poids</h2>
            <div class="stat-line">
                <span>Dernier poids :</span>
                <strong id="currentWeightDisplay" style="color: #7dd3fc;">-- kg</strong>
            </div>
            <p id="weightDiffDisplay" style="font-size: 16px; color: #94a3b8; margin-top: 5px;"></p>
        </div>

        <div class="card">
            <h2>Nouvelle Pesée</h2>
            <form id="weightForm" onsubmit="saveWeight(event)">
                <input type="number" step="0.1" placeholder="Ex: 75.8" id="weightInput" inputmode="decimal" required>
                <button type="submit">Enregistrer le poids</button>
            </form>
        </div>

        <div class="card">
            <h2>Historique des pesées</h2>
            <ul id="weightLogList" style="list-style: none; padding: 0;"></ul>
        </div>

        <button onclick="window.location.reload()" style="background: #0f172a; border: 1px solid rgba(59,130,246,0.3); margin-top: 10px;">
            ◀ Retour au Tableau de Bord
        </button>
    `;

    // On rafraîchit l'affichage des données sauvegardées
    displayWeightLogs();
}

// --- FONCTION DE SAUVEGARDE DU POIDS ---
function saveWeight(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const weightInput = document.getElementById('weightInput');
    if (!weightInput) return false;
    
    const val = parseFloat(weightInput.value);
    if (!val || isNaN(val)) {
        return false;
    }

    // Ajout à l'historique (le plus récent en premier)
    weightHistory.unshift({ 
        date: new Date().toLocaleDateString('fr-FR'), 
        weight: val 
    });
    
    // Sauvegarde définitive dans le téléphone
    localStorage.setItem('jarvis_weight', JSON.stringify(weightHistory));
    
    // Nettoyage de l'input et fermeture du clavier iOS
    weightInput.value = '';
    weightInput.blur(); 
    
    // Mise à jour visuelle immédiate
    displayWeightLogs();
    return false;
}

// --- FONCTION D'AFFICHAGE DES DONNÉES ---
function displayWeightLogs() {
    const currentDisplay = document.getElementById('currentWeightDisplay');
    const diffDisplay = document.getElementById('weightDiffDisplay');
    const logList = document.getElementById('weightLogList');
    
    if (currentDisplay) {
        currentDisplay.innerText = weightHistory.length > 0 ? weightHistory[0].weight + " kg" : "-- kg";
    }
    
    if (diffDisplay) {
        if (weightHistory.length > 1) {
            const diff = (weightHistory[0].weight - weightHistory[1].weight).toFixed(1);
            diffDisplay.innerText = diff > 0 ? `+${diff} kg depuis la dernière pesée` : `${diff} kg depuis la dernière pesée`;
        } else {
            diffDisplay.innerText = weightHistory.length === 1 ? "Première pesée enregistrée." : "Aucune donnée.";
        }
    }

    if (logList) {
        logList.innerHTML = '';
        weightHistory.forEach(item => {
            logList.innerHTML += `
                <li style="font-size: 20px; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 1px solid rgba(59,130,246,0.15); display: flex; justify-content: space-between;">
                    <span>📅 ${item.date}</span>
                    <strong style="color: #7dd3fc;">${item.weight} kg</strong>
                </li>`;
        });
    }
}

// --- TON CODE D'ORIGINE POUR LES MISSIONS (INCHANGÉ) ---
function addTask(){
    const input = document.getElementById("taskInput");
    if(input.value.trim() === ""){
        return;
    }
    const list = document.getElementById("missionList");
    const li = document.createElement("li");
    li.innerHTML = "🟢 " + input.value;
    list.appendChild(li);
    input.value = "";
}
