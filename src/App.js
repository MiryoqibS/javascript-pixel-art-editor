import { RenderToolbar } from "./ui/RenderToolbar";
import { RenderCanvas } from "./ui/RenderCanvas";
import { CanvasGrid } from "./core/CanvasGrid";
import { Toolbar } from "./core/Toolbar";

export class App {
    constructor(root) {
        this.root = root;
        this.canvas = new CanvasGrid();
        this.renderCanvas = new RenderCanvas(this.canvas);
        this.toolbar = new Toolbar(this.canvas, this.renderCanvas);
        this.renderToolbar = new RenderToolbar(this.toolbar);
    }

    init() {
        const container = document.createElement("div");
        container.className = "pixel-editor container";

        const toolbar = this.renderToolbar.init();
        const grid = this.renderCanvas.init();

        container.appendChild(toolbar)
        container.appendChild(grid);

        this.root.appendChild(container);
    }
}