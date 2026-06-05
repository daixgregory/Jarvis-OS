// --- VARIABLES GLOBALES (STOCKAGE TÉLÉPHONE) ---
let weightHistory = JSON.parse(localStorage.getItem('jarvis_weight')) || [];
let portfolio = JSON.parse(localStorage.getItem('jarvis_portfolio')) || [];

// --- GESTION DES ONGLETS ---
function openModule(name) {
    const appContainer = document.querySelector('.app');
    if (!appContainer) return;

    // 1. LE MODULE SPORT
    if (name === 'sport') {
        appContainer.innerHTML = `
            <div class="topbar">
                <h1>SPORT</h1>
                <div class="online"><div class="dot"></div><p>Jarvis Active</p></div>
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
                <form id="weightForm">
                    <input type="number" step="0.1" placeholder="Ex: 75.8" id="weightInput" inputmode="decimal" required>
                    <button type="button" onclick="saveWeight()">Enregistrer le poids</button>
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
        displayWeightLogs();
        return;
    }

    // 2. LE MODULE BOURSE (INVESTISSEMENTS)
    if (name === 'bourse') {
        appContainer.innerHTML = `
            <div class="topbar">
                <h1>INVEST</h1>
                <div class="online"><div class="dot" style="background:#38bdf8; box-shadow:0 0 12px #38bdf8;"></div><p>Market Active</p></div>
            </div>
            <div class="card">
                <h2>Portefeuille Global</h2>
                <div class="stat-line">
                    <span>Valeur Totale :</span>
                    <strong id="totalPortfolioValue" style="color: #7dd3fc;">0.00 €</strong>
                </div>
                <div class="bar"><div class="fill blue" style="width: 100%"></div></div>
            </div>
            <div class="card">
                <h2>Ajouter un Actif</h2>
                <form id="investForm">
                    <input type="text" placeholder="Nom (Ex: S&P 500, BRICS...)" id="assetName" required>
                    <input type="number" step="0.01" placeholder="Valeur totale possédée (€)" id="assetValue" inputmode="decimal" required>
                    <button type="button" onclick="addAsset()">Ajouter au Portefeuille</button>
                </form>
            </div>
            <div class="card">
                <h2>Mes Actifs</h2>
                <ul id="assetList" style="list-style: none; padding: 0;"></ul>
            </div>
            <button onclick="window.location.reload()" style="background: #0f172a; border: 1px solid rgba(59,130,246,0.3); margin-top: 10px;">
                ◀ Retour au Tableau de Bord
            </button>
        `;
        displayPortfolio();
        return;
    }

    // Si tu cliques sur un autre onglet pas encore créé
    alert("Module " + name + " en développement");
}

// --- FONCTIONS LOGIQUE : SPORT ---
function saveWeight() {
    const weightInput = document.getElementById('weightInput');
    if (!weightInput) return;
    
    const val = parseFloat(weightInput.value);
    if (!val || isNaN(val)) return;

    weightHistory.unshift({ date: new Date().toLocaleDateString('fr-FR'), weight: val });
    localStorage.setItem('jarvis_weight', JSON.stringify(weightHistory));
    
    weightInput.value = '';
    weightInput.blur(); 
    displayWeightLogs();
}

function displayWeightLogs() {
    const currentDisplay = document.getElementById('currentWeightDisplay');
    const diffDisplay = document.getElementById('weightDiffDisplay');
    const logList = document.getElementById('weightLogList');
    
    if (currentDisplay) currentDisplay.innerText = weightHistory.length > 0 ? weightHistory[0].weight + " kg" : "-- kg";
    
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
            logList.innerHTML += `<li style="font-size: 20px; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 1px solid rgba(59,130,246,0.15); display: flex; justify-content: space-between;"><span>📅 ${item.date}</span><strong style="color: #7dd3fc;">${item.weight} kg</strong></li>`;
        });
    }
}

// --- FONCTIONS LOGIQUE : BOURSE ---
function addAsset() {
    const nameInput = document.getElementById('assetName');
    const valueInput = document.getElementById('assetValue');
    if (!nameInput || !valueInput) return;

    const name = nameInput.value.trim();
    const value = parseFloat(valueInput.value);

    if (name === "" || isNaN(value) || value <= 0) return;

    portfolio.push({ id: Date.now(), name: name, value: value });
    localStorage.setItem('jarvis_portfolio', JSON.stringify(portfolio));

    nameInput.value = '';
    valueInput.value = '';
    valueInput.blur();
    displayPortfolio();
}

function deleteAsset(id) {
    portfolio = portfolio.filter(asset => asset.id !== id);
    localStorage.setItem('jarvis_portfolio', JSON.stringify(portfolio));
    displayPortfolio();
}

function displayPortfolio() {
    const totalDisplay = document.getElementById('totalPortfolioValue');
    const assetList = document.getElementById('assetList');
    if (!assetList) return;

    assetList.innerHTML = '';
    let total = 0;

    portfolio.forEach(asset => {
        total += asset.value;
        assetList.innerHTML += `
            <li style="font-size: 20px; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 1px solid rgba(59,130,246,0.15); display: flex; justify-content: space-between; align-items: center;">
                <span>📈 ${asset.name}</span>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <strong style="color: #7dd3fc;">${asset.value.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €</strong>
                    <span onclick="deleteAsset(${asset.id})" style="color: #ff453a; cursor: pointer; font-size: 16px;">❌</span>
                </div>
            </li>`;
    });

    if (totalDisplay) totalDisplay.innerText = total.toLocaleString('fr-FR', { minimumFractionDigits: 2 }) + " €";
}

// --- LOGIQUE RESTE (MISSIONS) ---
function addTask(){
    const input = document.getElementById("taskInput");
    if(input.value.trim() === "") return;
    const list = document.getElementById("missionList");
    const li = document.createElement("li");
    li.innerHTML = "🟢 " + input.value;
    list.appendChild(li);
    input.value = "";
}
