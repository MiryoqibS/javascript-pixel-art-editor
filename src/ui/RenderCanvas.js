export class RenderCanvas {
    constructor(grid) {
        this.grid = grid;
    }

    // Инициализация
    init() {
        const container = document.createElement("div");
        container.className = "pixel-editor__canvas";

        const wrapper = document.createElement("div");
        wrapper.className = "pixel-editor__canvas-wrapper";

        const canvas = this.render();
        const ctx = canvas.getContext("2d");
        const size = this.grid.cellSize;

        this.setEventListener(canvas, ctx, size);

        wrapper.appendChild(canvas);
        container.appendChild(wrapper);

        return container;
    }

    // Добавляем обработчик событий для canvas
    setEventListener(canvas, ctx, cellSize) {
        let isDrawing = false;
        let isCleaning = false;
        const size = cellSize;

        // Обработчик для покраски поля
        const draw = (e, color) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const row = Math.floor(y / cellSize);
            const col = Math.floor(x / cellSize);

            // Перерисовать только одну ячейку
            if (row >= 0 && row < this.grid.gridHeight && col >= 0 && col < this.grid.gridWidth) {
                this.grid.setCellColor(row, col, color);

                ctx.fillStyle = color;
                ctx.fillRect(col * size, row * size, size, size);
                ctx.strokeStyle = this.grid.strokeColor;
                ctx.strokeRect(col * size, row * size, size, size);
            };
        };

        canvas.addEventListener("mousedown", (e) => {
            if (e.button === 0) {
                isDrawing = true;
                isCleaning = false;
                draw(e, this.grid.currentColor);
            } else if (e.button === 2) {
                isDrawing = false;
                isCleaning = true;
                draw(e, this.grid.cellColor);
            };
        });

        canvas.addEventListener("mousemove", (e) => {
            if (isDrawing) {
                draw(e, this.grid.currentColor);
            } else if (isCleaning) {
                draw(e, this.grid.cellColor);
            };
        });

        canvas.addEventListener("mouseleave", () => {
            isDrawing = false;
            isCleaning = false;
        });

        window.addEventListener("mouseup", () => {
            isDrawing = false;
            isCleaning = false;
        });
    }

    // Обновление сетки
    clear() {
        const rows = this.grid.gridHeight;
        const cols = this.grid.gridWidth;
        const size = this.grid.cellSize;

        const canvas = document.querySelector(".canvas");
        canvas.height = rows * size;
        canvas.width = cols * size;

        const ctx = canvas.getContext("2d");

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                ctx.fillStyle = this.grid.cellColor;
                ctx.fillRect(col * size, row * size, size, size);
                ctx.strokeStyle = this.grid.strokeColor;
                ctx.strokeRect(col * size, row * size, size, size);
            };
        };
    }

    // Рендер
    render() {
        console.log(this.grid);

        const rows = this.grid.gridHeight;
        const cols = this.grid.gridWidth;
        const size = this.grid.cellSize;

        const canvas = document.createElement("canvas");
        canvas.className = "canvas";
        canvas.height = rows * size;
        canvas.width = cols * size;

        const ctx = canvas.getContext("2d");

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const color = this.grid.getCellColor(row, col);
                ctx.fillStyle = color;
                ctx.fillRect(col * size, row * size, size, size);
                ctx.strokeStyle = this.grid.strokeColor;
                ctx.strokeRect(col * size, row * size, size, size);
            };
        };


        return canvas;
    }
}