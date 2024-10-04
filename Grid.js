// Grid.js
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
    
        // Conteneur principal pour la grille
        const fullGrid = document.createElement('div');
        fullGrid.classList.add('grid');
    
        // Ajuster le style pour la taille des cellules
        fullGrid.style.gridTemplateColumns = `repeat(${this.cols + 1}, ${this.cellSize}px)`; // Inclure la cellule vide
        fullGrid.style.gridTemplateRows = `repeat(${this.rows + 1}, ${this.cellSize}px)`; // Inclure la cellule vide
    
        // Première cellule vide dans le coin supérieur gauche
        const emptyCorner = document.createElement('div');
        emptyCorner.classList.add('coord-cell');
        emptyCorner.style.width = `${this.cellSize}px`;
        emptyCorner.style.height = `${this.cellSize}px`;
        emptyCorner.style.backgroundImage = "url('Pictures/your-image.png')"; // Remplacer par le chemin de ton image
        emptyCorner.style.backgroundSize = 'cover'; // Couvrir toute la cellule
        fullGrid.appendChild(emptyCorner);
    
        // Coordonnées x sur la première ligne
        for (let x = 0; x < this.cols; x++) {
            const xCoordCell = document.createElement('div');
            xCoordCell.classList.add('coord-cell');
            xCoordCell.textContent = x; // Ajouter l'indice de colonne ici, si nécessaire
            xCoordCell.style.width = `${this.cellSize}px`;
            xCoordCell.style.height = `${this.cellSize}px`;
            fullGrid.appendChild(xCoordCell);
        }
    
        // Remplissage de la grille principale avec coordonnées y
        for (let y = 0; y < this.rows; y++) {
            // Première colonne (coordonnée y)
            const yCoordCell = document.createElement('div');
            yCoordCell.classList.add('coord-cell');
            yCoordCell.textContent = y; // Ajouter l'indice de ligne ici, si nécessaire
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
