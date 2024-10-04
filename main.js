// main.js
// Fonction pour générer la grille aléatoire
function generateRandomCircuit() {
    const rows = parseInt(document.getElementById('rows').value, 10);
    const cols = parseInt(document.getElementById('cols').value, 10);

    const grid = new Grid(rows, cols);
    grid.render();
    grid.setStartAndGoal();
}

document.getElementById('generate').addEventListener('click', generateRandomCircuit);
window.onload = generateRandomCircuit;
