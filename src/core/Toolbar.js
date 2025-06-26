export class Toolbar {
    constructor(canvasGrid, canvasGridRender) {
        this.canvasGrid = canvasGrid,
        this.canvasGridRender = canvasGridRender;
        this.modes = [
            {
                name: "draw"
            },
            {
                name: "erase"
            },
            {
                name: "move"
            }
        ]
    }

    // Изменение выбранного цвет
    setCurrentColor(color) {
        this.canvasGrid.currentColor = color;
    }

    // Изменение цвета ячейки
    setCellColor(color) {
        this.canvasGrid.cellColor = color;
    }

    // Изменение размера ячейки
    setCellSize(size) {
        this.canvasGrid.cellSize = Number(size);

        const oldCanvas = document.querySelector(".canvas");
        const newCanvas = this.canvasGridRender.render();
        const ctx = newCanvas.getContext("2d");

        if (oldCanvas) {
            this.canvasGridRender.setEventListener(newCanvas, ctx, this.canvasGrid.cellSize);
            oldCanvas.replaceWith(newCanvas);
        };
    }

    // Изменение цвет обводки ячейки
    setStrokeColor(color) {
        this.canvasGrid.strokeColor = color;
    }

    // Изменение высоты сетки
    setGridHeight(height) {
        this.canvasGrid.gridHeight = height;
    }

    // Изменение ширины сетки
    setGridWidth(width) {
        this.canvasGrid.setGridWidth = width;
    }

    // Сброс сетки
    resetGrid() {
        this.canvasGrid.resetGrid();
        this.canvasGridRender.clear();
    }
}