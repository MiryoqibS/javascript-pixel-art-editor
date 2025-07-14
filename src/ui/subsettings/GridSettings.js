import { renderSlider } from "../ToolbarRendererUtils";

// Настройки сетки
export class GridSettings {
    constructor(toolbarLogic) {
        this.toolbarLogic = toolbarLogic
    }

    render() {
        const gridSettingsSection = document.createElement("div");
        gridSettingsSection.className = "toolbar-action";

        // Заголовок блока
        const sectionTitle = document.createElement("h3");
        sectionTitle.className = "toolbar-action__title";
        sectionTitle.innerText = "Grid Settings";

        // Контейнер для настроек ширины и высоты
        const sizeControlsContainer = document.createElement("div");
        sizeControlsContainer.className = "toolbar-action__settings";

        // ➤ Ширина сетки
        const widthControl = document.createElement("div");
        widthControl.className = "toolbar-action__setting";

        const widthLabel = document.createElement("h3");
        widthLabel.className = "toolbar-action__title small";
        widthLabel.innerText = "Grid Width";

        const widthInput = document.createElement("input");
        widthInput.type = "number";
        widthInput.value = 16;
        widthInput.addEventListener("input", () => {
            this.toolbarLogic.setGridWidth(Number(widthInput.value));
        });

        widthControl.appendChild(widthLabel);
        widthControl.appendChild(widthInput);

        // ➤ Высота сетки
        const heightControl = document.createElement("div");
        heightControl.className = "toolbar-action__setting";

        const heightLabel = document.createElement("h3");
        heightLabel.className = "toolbar-action__title small";
        heightLabel.innerText = "Grid Height";

        const heightInput = document.createElement("input");
        heightInput.type = "number";
        heightInput.value = 16;
        heightInput.addEventListener("input", () => {
            this.toolbarLogic.setGridHeight(Number(heightInput.value));
        });

        heightControl.appendChild(heightLabel);
        heightControl.appendChild(heightInput);

        sizeControlsContainer.appendChild(widthControl);
        sizeControlsContainer.appendChild(heightControl);

        // ➤ Размер ячеек
        const cellSizeControl = document.createElement("div");
        cellSizeControl.className = "toolbar-action__setting";

        const cellSizeLabel = document.createElement("h3");
        cellSizeLabel.className = "toolbar-action__title small";
        cellSizeLabel.innerText = "Cell Size (20px)";

        const cellSizeSlider = renderSlider(5, 40, 1, 20);

        // Обработчик изменения размера ячеек
        cellSizeSlider.addEventListener("input", () => {
            cellSizeLabel.innerText = `Cell Size (${cellSizeSlider.value}px)`;
            this.toolbarLogic.setCellSize(cellSizeSlider.value);

            // Обновление градиента фона слайдера
            const percent = (cellSizeSlider.value - cellSizeSlider.min) / (cellSizeSlider.max - cellSizeSlider.min) * 100;
            cellSizeSlider.style.background = `linear-gradient(to right, var(--color-dark) ${percent}%, var(--color-background) ${percent}%)`;
        });

        cellSizeControl.appendChild(cellSizeLabel);
        cellSizeControl.appendChild(cellSizeSlider);

        // Собираем секцию
        gridSettingsSection.appendChild(sectionTitle);
        gridSettingsSection.appendChild(sizeControlsContainer);
        gridSettingsSection.appendChild(cellSizeControl);

        return gridSettingsSection;
    }
}