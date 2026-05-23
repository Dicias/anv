// // 12 posiciones (x, y en porcentajes) para formar un corazón
// const heartPositions = [
//     { x: 50, y: 25 }, // 1. Hendidura superior
//     { x: 65, y: 15 }, // 2. Borde superior derecho
//     { x: 85, y: 20 }, // 3. Derecha alta
//     { x: 90, y: 40 }, // 4. Derecha media
//     { x: 80, y: 60 }, // 5. Bajando a la derecha
//     { x: 65, y: 75 }, // 6. Cerca de la punta derecha
//     { x: 50, y: 90 }, // 7. Punta inferior
//     { x: 35, y: 75 }, // 8. Cerca de la punta izquierda
//     { x: 20, y: 60 }, // 9. Bajando a la izquierda
//     { x: 10, y: 40 }, // 10. Izquierda media
//     { x: 15, y: 20 }, // 11. Izquierda alta
//     { x: 35, y: 15 }  // 12. Borde superior izquierdo
// ];

// // Aquí van tus 12 preguntas
// const questions = [
//     { q: "Pregunta Nivel 1", a: ["Opción A", "Opción B"], correct: 0 },
//     { q: "Pregunta Nivel 2", a: ["A", "B"], correct: 1 },
//     { q: "Pregunta Nivel 3", a: ["A", "B"], correct: 0 },
//     { q: "Pregunta Nivel 4", a: ["A", "B"], correct: 1 },
//     { q: "Pregunta Nivel 5", a: ["A", "B"], correct: 0 },
//     { q: "Pregunta Nivel 6", a: ["A", "B"], correct: 1 },
//     { q: "Pregunta Nivel 7", a: ["A", "B"], correct: 0 },
//     { q: "Pregunta Nivel 8", a: ["A", "B"], correct: 1 },
//     { q: "Pregunta Nivel 9", a: ["A", "B"], correct: 0 },
//     { q: "Pregunta Nivel 10", a: ["A", "B"], correct: 1 },
//     { q: "Pregunta Nivel 11", a: ["A", "B"], correct: 0 },
//     { q: "Pregunta Nivel 12", a: ["A", "B"], correct: 1 },
// ];

// let currentLevel = 0;

// // Referencias del DOM
// const starsContainer = document.getElementById('stars-container');
// const svgContainer = document.getElementById('constellation-lines');
// const modalQuestion = document.getElementById('modal-question');
// const modalFeedback = document.getElementById('modal-feedback');
// const modalFinal = document.getElementById('modal-final');
// const questionTxt = document.getElementById('question-text');
// const feedbackTxt = document.getElementById('feedback-text');
// const opt1 = document.getElementById('opt-1');
// const opt2 = document.getElementById('opt-2');

// // Generar fondo de estrellas aleatorias
// for (let i = 0; i < 150; i++) {
//     const bgStar = document.createElement('div');
//     bgStar.className = 'bg-star';
//     bgStar.style.left = Math.random() * 100 + 'vw';
//     bgStar.style.top = Math.random() * 100 + 'vh';
//     bgStar.style.width = bgStar.style.height = (Math.random() * 2 + 1) + 'px';
//     bgStar.style.animationDelay = Math.random() * 2 + 's';
//     document.getElementById('space-background').appendChild(bgStar);
// }

// // Dibujar las 12 estrellas del corazón
// heartPositions.forEach((pos, index) => {
//     const star = document.createElement('div');
//     star.className = 'star';
//     star.id = `star-${index}`;
//     star.style.left = `${pos.x}%`;
//     star.style.top = `${pos.y}%`;
    
//     star.addEventListener('click', () => {
//         if (index === currentLevel) openQuestion(index);
//     });
    
//     starsContainer.appendChild(star);
// });

// // Inicializar el estado de la UI
// updateUI();

// function openQuestion(index) {
//     const data = questions[index];
//     questionTxt.innerText = data.q;
//     opt1.innerText = data.a[0];
//     opt2.innerText = data.a[1];
    
//     // Remover eventos previos y asignar nuevos
//     opt1.onclick = () => checkAnswer(0);
//     opt2.onclick = () => checkAnswer(1);
    
//     modalQuestion.classList.remove('hidden');
// }

// function checkAnswer(selectedIndex) {
//     modalQuestion.classList.add('hidden');
//     const isCorrect = selectedIndex === questions[currentLevel].correct;

//     if (isCorrect) {
//         feedbackTxt.innerText = "¡Correcto!";
//         feedbackTxt.style.color = "#a8ff78";
//     } else {
//         feedbackTxt.innerText = "Incorrecto... La constelación se desvanece.";
//         feedbackTxt.style.color = "#ff4b2b";
//     }
    
//     modalFeedback.classList.remove('hidden');

//     // Esperar 1.5 segundos para mostrar el feedback y luego hacer la animación
//     setTimeout(() => {
//         modalFeedback.classList.add('hidden');
        
//         if (isCorrect) {
//             drawConnection(currentLevel);
//             currentLevel++;
//             updateUI();
            
//             if (currentLevel === 12) {
//                 setTimeout(() => modalFinal.classList.remove('hidden'), 1000);
//             }
//         } else {
//             if (currentLevel > 0) {
//                 removeLastConnection();
//                 currentLevel--;
//             }
//             updateUI();
//         }
//     }, 1500);
// }

// function drawConnection(level) {
//     const p1 = heartPositions[level];
//     // Conecta con el siguiente, y si es el nivel 12, conecta el último con el primero (0)
//     const p2 = heartPositions[(level + 1) % 12];
    
//     const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
//     line.setAttribute('x1', `${p1.x}%`);
//     line.setAttribute('y1', `${p1.y}%`);
//     line.setAttribute('x2', `${p2.x}%`);
//     line.setAttribute('y2', `${p2.y}%`);
//     line.setAttribute('id', `line-${level}`);
//     svgContainer.appendChild(line);
// }

// function removeLastConnection() {
//     const lineToRemove = document.getElementById(`line-${currentLevel - 1}`);
//     if (lineToRemove) lineToRemove.remove();
// }

// function updateUI() {
//     for (let i = 0; i < 12; i++) {
//         const star = document.getElementById(`star-${i}`);
//         star.className = 'star'; // Resetear clases
        
//         if (i < currentLevel) {
//             star.classList.add('completed');
//         } else if (i === currentLevel) {
//             star.classList.add('active');
//         } else {
//             star.classList.add('inactive');
//         }
//     }
// }