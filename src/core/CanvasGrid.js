export class CanvasGrid {
    constructor() {
        this._gridHeight = 16;
        this._gridWidth = 16;
        this._cellSize = 20;
        this._currentColor = "#000000";
        this._cellColor = "#FFFFFF";
        this._strokeColor = "#cccccc";

        this.grid = this.createGrid();
    }

    // Создание сетки
    createGrid() {
        const grid = [];

        for (let row = 0; row < this.gridHeight; row++) {
            const rowGrid = [];
            
            for (let col = 0; col < this.gridWidth; col++) {
                rowGrid.push({ color: this.cellColor });
            };
                
            grid.push(rowGrid);
        };

        return grid;
    }

    // Сброс сетки
    resetGrid() {
        const newGrid = this.createGrid();
        this.grid = newGrid;
    }

    // Получение цвета ячейки
    getCellColor(row, col) {
        const cell = this.grid[row][col]
        if (cell) {
            return cell.color;
        }
        return null;
    }

    // Установка цвета ячейки
    setCellColor(row, col, color) {
        this.grid[row][col].color = color;
    }

    // Выбранный цвет
    get currentColor() {
        return this._currentColor;
    }

    set currentColor(color) {
        this._currentColor = color;
    }

    // Цвет ячейки
    get cellColor() {
        return this._cellColor;
    }

    set cellColor(color) {
        this._cellColor = color;
    }

    // Цвет обводки ячейки
    get strokeColor() {
        return this._strokeColor;
    }

    set strokeColor(color) {
        this._strokeColor = color;
    }

    // Высота сетки
    get gridHeight() {
        return this._gridHeight;
    }

    set gridHeight(height) {
        this._gridHeight = height
    }

    // Ширина сетки
    get gridWidth() {
        return this._gridWidth;
    }

    set gridWidth(width) {
        this._gridWidth = width;
    }

    // Размеры ячейки
    get cellSize() {
        return this._cellSize;
    }

    set cellSize(size) {
        this._cellSize = size;
    }
}