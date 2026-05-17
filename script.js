const questions = [
    { q: "¿HTML es un lenguaje de programación?", a: ["Sí", "No"], correct: 1 },
    { q: "¿Qué significa CSS?", a: ["Cascading Style Sheets", "Creative Style System"], correct: 0 },
    // ... Agrega las 12 preguntas aquí
];

let currentLevel = 0;

const levelTxt = document.getElementById('level-number');
const modal = document.getElementById('modal');
const questionTxt = document.getElementById('question-text');
const opt1 = document.getElementById('opt-1');
const opt2 = document.getElementById('opt-2');

document.getElementById('open-challenge').addEventListener('click', () => {
    if (currentLevel >= 12) return showPrize();
    showQuestion();
});

function showQuestion() {
    const data = questions[currentLevel];
    questionTxt.innerText = data.q;
    opt1.innerText = data.a[0];
    opt2.innerText = data.a[1];
    modal.classList.remove('hidden');
}

function checkAnswer(index) {
    if (index === questions[currentLevel].correct) {
        currentLevel++;
        alert("¡Correcto! Avanzas.");
    } else {
        currentLevel = Math.max(0, currentLevel - 1);
        alert("Incorrecto... retrocedes un nivel.");
    }
    
    modal.classList.add('hidden');
    updateUI();
}

function updateUI() {
    levelTxt.innerText = currentLevel + 1;
    if (currentLevel === 12) {
        showPrize();
    }
}

function showPrize() {
    document.body.innerHTML = `
        <div class="prize-container">
            <h1>¡Felicidades! 🏆</h1>
            <p>Has superado los 12 niveles.</p>
            <div class="invitation">
                <h2>ESTÁS INVITADO A: [TU EVENTO]</h2>
                <p>Fecha: 20 de mayo | Lugar: El mapa interactivo</p>
            </div>
        </div>
    `;
}

opt1.onclick = () => checkAnswer(0);
opt2.onclick = () => checkAnswer(1);