export class RenderCanvas {
    constructor(grid) {
        this.grid = grid;
        this._showStroke = true;
        this._prevMode = null;

        this._offsetX = 0;
        this._offsetY = 0;
        this._isDragging = false;
        this._lastMousePos = { x: 0, y: 0 };
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
        let isPainting = false;

        const size = cellSize;

        // Обработчик для покраски поля
        const paint = (e, isLeftMouseClick = true) => {
            const activeMode = this.grid.activeMode;

            if (activeMode === "move") return;

            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const row = Math.floor(y / cellSize);
            const col = Math.floor(x / cellSize);

            const color = isLeftMouseClick
                ? (this.grid.activeMode === "erase" ? this.grid.cellColor : this.grid.currentColor)
                : this.grid.cellColor;

            // Перерисовать только одну ячейку
            if (row >= 0 && row < this.grid.gridHeight && col >= 0 && col < this.grid.gridWidth) {
                this.grid.setCellColor(row, col, color);

                ctx.fillStyle = color;
                ctx.fillRect(col * size, row * size, size, size);
                if (this.showStroke) {
                    ctx.strokeStyle = this.grid.strokeColor;
                    ctx.strokeRect(col * size, row * size, size, size);
                };
            };
        };

        canvas.addEventListener("mousedown", (e) => {
            if (e.button === 0) {
                if (this.grid.activeMode === "draw") {
                    isPainting = true;
                    paint(e);
                };

                if (this.grid.activeMode === "erase") {
                    isPainting = true;
                    paint(e);
                };

                if (this.grid.activeMode === "move") {
                    this._isDragging = true;
                    this._lastMousePos = { x: e.clientX, y: e.clientY };
                };
            } else if (e.button === 1) {
                // Сохраняем предыдущий режим
                this._prevMode = this.grid.activeMode

                this.grid.activeMode = "move";
                this._isDragging = true;
                this._lastMousePos = { x: e.clientX, y: e.clientY };
            } else if (e.button === 2) {
                // Сохраняем предыдущий режим
                this._prevMode = this.grid.activeMode

                this.grid.activeMode = "erase";
                paint(e);
            };
        });

        canvas.addEventListener("mousemove", (e) => {
            if (isPainting) {
                paint(e);
            };

            if (this._isDragging) {
                const dx = e.clientX - this._lastMousePos.x;
                const dy = e.clientY - this._lastMousePos.y;

                this._offsetX += dx;
                this._offsetY += dy;

                this._lastMousePos = { x: e.clientX, y: e.clientY };
                canvas.style.transform = `translate(${this._offsetX}px, ${this._offsetY}px)`;
            };
        });

        canvas.addEventListener("mouseleave", () => {
            isPainting = false;
        });

        canvas.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });

        window.addEventListener("mouseup", (e) => {
            isPainting = false;
            this._isDragging = false;

            if (([1,2].includes(e.button)) && this._prevMode) {
                this.grid.activeMode = this._prevMode;
                this._prevMode = null;
            };
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

                if (this.showStroke) {
                    ctx.strokeStyle = this.grid.strokeColor;
                    ctx.strokeRect(col * size, row * size, size, size);
                };
            };
        };
    }

    // Рендер
    render() {
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

                if (this.showStroke) {
                    ctx.lineWidth = this.grid.strokeWidth;
                    ctx.strokeStyle = this.grid.strokeColor;
                    ctx.strokeRect(col * size, row * size, size, size);

                    switch (this.grid.strokeStyle) {
                        case "solid":
                            ctx.setLineDash([]);
                            ctx.lineCap = "butt";
                            break;
                        case "dashed":
                            ctx.setLineDash([5, 3]);
                            ctx.lineCap = "butt";
                            break;
                        case "dotted":
                            ctx.setLineDash([1, 3]);
                            ctx.lineCap = "round";
                            break;
                        default:
                            ctx.setLineDash([]);
                            ctx.lineCap = "butt";
                            break;
                    };
                };
            };
        };

        canvas.style.position = "relative";
        canvas.style.transform = `translate(${this._offsetX}px, ${this._offsetY}px)`;

        return canvas;
    }

    // показать-ли обводку сетки
    get showStroke() {
        return this._showStroke;
    }

    set showStroke(value) {
        this._showStroke = value;
    }
}