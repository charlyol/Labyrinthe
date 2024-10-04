class Cell {
    constructor(x, y, traversable = true) {
        this.x = x;
        this.y = y;
        this.traversable = traversable;
        this.element = document.createElement('div');
        this.element.classList.add('grid-item');

        if (!traversable) {
            this.element.classList.add('wall');
        }

        this.element.setAttribute('data-x', x);
        this.element.setAttribute('data-y', y);
    }

    // Afficher la cellule dans le DOM
    render(parentElement, cellSize) {
        this.element.style.width = `${cellSize}px`;
        this.element.style.height = `${cellSize}px`;
        parentElement.appendChild(this.element);
    }

    setStart() {
        this.element.classList.add('start');
        this.element.innerText = 'S';
    }

    setGoal() {
        this.element.classList.add('goal');
        this.element.innerText = 'G';
    }
}

class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.createGrid();

        // Dimensions maximales pour la grille (peuvent être ajustées selon les besoins)
        this.maxGridWidth = 800;  // Largeur maximale de la grille en pixels
        this.maxGridHeight = 800; // Hauteur maximale de la grille en pixels

        // Calcul de la taille des cellules pour remplir le maximum d'espace
        this.cellSize = Math.min(
            Math.floor(this.maxGridWidth / (cols + 1)), // Inclure la colonne des coordonnées
            Math.floor(this.maxGridHeight / (rows + 1)) // Inclure la ligne des coordonnées
        );
    }

    // Création de la grille
    createGrid() {
        let grid = [];
        for (let y = 0; y < this.rows; y++) {
            let row = [];
            for (let x = 0; x < this.cols; x++) {
                const traversable = Math.random() >= 0.3;
                row.push(new Cell(x, y, traversable));
            }
            grid.push(row);
        }
        return grid;
    }

    render() {
        const gridContainer = document.getElementById('grid-container');
        gridContainer.innerHTML = '';

        // Conteneur principal avec coordonnées x et y intégrées
        const fullGrid = document.createElement('div');
        fullGrid.classList.add('grid');

        // Ajuster le style pour la taille des cellules
        fullGrid.style.gridTemplateColumns = `repeat(${this.cols + 1}, ${this.cellSize}px)`;
        fullGrid.style.gridTemplateRows = `repeat(${this.rows + 1}, ${this.cellSize}px)`;

        // Première cellule vide dans le coin supérieur gauche
        const emptyCorner = document.createElement('div');
        emptyCorner.classList.add('coord-cell');
        emptyCorner.style.width = `${this.cellSize}px`;
        emptyCorner.style.height = `${this.cellSize}px`;
        fullGrid.appendChild(emptyCorner);

        // Coordonnées x sur la première ligne
        for (let x = 0; x < this.cols; x++) {
            const xCoordCell = document.createElement('div');
            xCoordCell.classList.add('coord-cell');
            xCoordCell.textContent = x;
            xCoordCell.style.width = `${this.cellSize}px`;
            xCoordCell.style.height = `${this.cellSize}px`;
            fullGrid.appendChild(xCoordCell);
        }

        // Remplissage de la grille principale avec coordonnées y
        for (let y = 0; y < this.rows; y++) {
            // Première colonne (coordonnée y)
            const yCoordCell = document.createElement('div');
            yCoordCell.classList.add('coord-cell');
            yCoordCell.textContent = y;
            yCoordCell.style.width = `${this.cellSize}px`;
            yCoordCell.style.height = `${this.cellSize}px`;
            fullGrid.appendChild(yCoordCell);

            // Rendu des cellules de la grille
            for (let x = 0; x < this.cols; x++) {
                this.grid[y][x].render(fullGrid, this.cellSize);
            }
        }

        // Ajouter la grille complète au conteneur
        gridContainer.appendChild(fullGrid);
    }

    setStartAndGoal() {
        const startCell = this.grid[0][0];
        startCell.setStart();

        const goalCell = this.grid[Math.floor(this.rows / 2)][Math.floor(this.cols / 2)];
        goalCell.setGoal();
    }
}

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
