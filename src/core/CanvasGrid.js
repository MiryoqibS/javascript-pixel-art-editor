export class CanvasGrid {
    constructor() {
        this._gridHeight = 16;
        this._gridWidth = 16;
        this._cellSize = 20;
        this._cellColor = "#FFFFFF";
        this._currentColor = "#000000"; // Текущий цвет по умолчанию
        this._strokeColor = "#cccccc"; // Цвет обводки по умолчанию
        this._strokeStyle = "solid"; // Стиль обводки по умолчанию
        this._strokeWidth = 1; // Ширина обводки по умолчанию

        this.grid = this.createGrid();

        this.modes = ["draw", "erase", "move"];
        this._activeMode = "draw";
    }

    get activeMode() {
        return this._activeMode;
    }

    set activeMode(mode) {
        this._activeMode = mode; 
    }

    // Создание сетки
    createGrid(oldGrid = []) {
        const grid = [];

        for (let row = 0; row < this.gridHeight; row++) {
            const rowGrid = [];

            for (let col = 0; col < this.gridWidth; col++) {
                const oldGridRow = oldGrid[row];
                const oldGridCell = oldGridRow && oldGridRow[col] ? oldGridRow[col] : null;

                if (oldGridCell && oldGridCell.color !== this.cellColor) {
                    rowGrid.push({ color: oldGrid[row][col].color });
                } else {
                    rowGrid.push({ color: this.cellColor });
                };
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

    // Стиль обводки стеки
    get strokeStyle() {
        return this._strokeStyle;
    }

    set strokeStyle(style) {
        this._strokeStyle = style;
    }

    // Цвет обводки ячейки
    get strokeColor() {
        return this._strokeColor;
    }

    set strokeColor(color) {
        this._strokeColor = color;
    }

    // Ширина обводки ячейки
    get strokeWidth() {
        return this._strokeWidth;
    }

    set strokeWidth(width) {
        this._strokeWidth = width;
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