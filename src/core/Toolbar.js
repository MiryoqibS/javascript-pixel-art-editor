export class Toolbar {
    constructor(canvasGrid, canvasGridRender) {
        this.canvasGrid = canvasGrid,
            this.canvasGridRender = canvasGridRender;
        // Режимы
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

    // Обновление Canvas
    updateCanvas() {
        const oldCanvas = document.querySelector(".canvas");
        const newCanvas = this.canvasGridRender.render();
        const ctx = newCanvas.getContext("2d");

        if (oldCanvas) {
            this.canvasGridRender.setEventListener(newCanvas, ctx, this.canvasGrid.cellSize);
            oldCanvas.replaceWith(newCanvas);
        };
    }

    // Изменение выбранного цвет
    setCurrentColor(color) {
        this.canvasGrid.currentColor = color;
    }

    // Изменение цвета ячейки
    setCellColor(color) {
        this.canvasGrid.cellColor = color;
    }

    // Выключение обводки сетки
    hideCanvasStroke() {
        this.canvasGridRender.showStroke = false;
        this.updateCanvas();
    }

    // Включаем обводку сетки
    showCanvasStroke() {
        this.canvasGridRender.showStroke = true;
        this.updateCanvas();
    }

    // Изменение размера ячейки
    setCellSize(size) {
        this.canvasGrid.cellSize = Number(size);
        this.updateCanvas();
    }

    // Получение стиля обводки Canvas
    getCanvasLineStyle() {
        return this.canvasGrid.strokeStyle;
    }

    // Изменение стиля обводки Canvas
    setCanvasLineStyle(style) {
        this.canvasGrid.strokeStyle = style;
        this.updateCanvas();
    }

    // Изменение цвета обводки Canvas
    setCanvasStrokeColor(color) {
        this.canvasGrid.strokeColor = color;
        this.updateCanvas();
    }

    // Изменение цвет обводки ячейки
    setStrokeColor(color) {
        this.canvasGrid.strokeColor = color;
    }

    // Изменение ширины обводки ячейки
    setStrokeWidth(width) {
        this.canvasGrid.strokeWidth = Number(width);
        this.updateCanvas();
    }

    // Изменение высоты сетки
    setGridHeight(height) {
        this.canvasGrid.gridHeight = height;
        this.canvasGrid.grid = this.canvasGrid.createGrid(this.canvasGrid.grid);

        this.updateCanvas();
    }

    // Изменение ширины сетки
    setGridWidth(width) {
        this.canvasGrid.gridWidth = width;
        this.canvasGrid.grid = this.canvasGrid.createGrid(this.canvasGrid.grid);

        this.updateCanvas();
    }

    // Сброс сетки
    resetGrid() {
        this.canvasGrid.resetGrid();
        this.canvasGridRender.clear();
    }
}