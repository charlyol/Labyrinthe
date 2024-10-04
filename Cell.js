// Cell.js
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
