import { helper } from "../Utils/Helper";

export class RenderToolbar {
    constructor(toolbarLogic) {
        this.toolbarLogic = toolbarLogic;
    }

    init() {
        const toolbar = this.render();

        return toolbar;
    }

    render() {
        const toolbar = document.createElement("aside");
        toolbar.className = "toolbar";

        const editModes = this.#renderEditModes();
        const actions = this.#renderActions();
        const gridSettings = this.#renderGridSettings();

        // Добавляем все настройки в панель настроек
        toolbar.appendChild(actions);
        toolbar.appendChild(editModes);
        toolbar.appendChild(gridSettings);

        return toolbar;
    }

    // Глобальные действия (Сброс и загрузка)
    #renderActions() {
        const actions = document.createElement("div");
        actions.className = "toolbar-action";

        // Заголовок
        const title = document.createElement("h3");
        title.className = "toolbar-action__title";
        title.innerText = "Actions";

        // Блок для кнопок
        const buttons = document.createElement("div");
        buttons.className = "toolbar-action__actions";

        // Кнопка для загрузки
        const download = document.createElement("button");
        download.className = "toolbar-action__button";
        const downloadIcon = helper.createIcon("download", 16);
        download.appendChild(downloadIcon);
        download.append("Download Image");

        download.addEventListener("click", () => {
            const canvas = document.querySelector(".canvas");
            const image = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = image;
            link.download = "pixel-art.png";
            link.click();
        });

        buttons.appendChild(download);

        // Кнопка для очистки
        const clear = document.createElement("button");
        clear.className = "toolbar-action__button clear";
        const clearIcon = helper.createIcon("delete", 16);
        clear.appendChild(clearIcon);
        clear.append("Clear Canvas");

        clear.addEventListener("click", () => {
            this.toolbarLogic.resetGrid();
        });

        buttons.appendChild(clear);

        // Добавляем дочерние элементы в основной блок настроек
        actions.appendChild(title);
        actions.appendChild(buttons);

        return actions;
    }

    // Режимы для редактирования
    #renderEditModes() {
        const editTools = document.createElement("div");
        editTools.className = "toolbar-action";

        // Заголовок
        const title = document.createElement("h3");
        title.className = "toolbar-action__title";
        title.innerText = "Drawing tools";
        editTools.appendChild(title);

        // Режимы
        const toolModes = document.createElement("div");
        toolModes.className = "toolbar-action__modes";
        let isFirstMode = true;

        this.toolbarLogic.modes.forEach(mode => {
            const toolMode = document.createElement("div");
            toolMode.className = "toolbar-action__button mode";
            if (isFirstMode) {
                toolMode.classList.add("active");
                isFirstMode = false;
            }
            toolMode.innerText = helper.capitalize(mode.name);
            toolModes.appendChild(toolMode);
        });

        // Выбор цвета
        const toolColor = document.createElement("div");
        toolColor.className = "toolbar-action__color";

        // Заголовок
        const toolColorTitle = document.createElement("p");
        toolColorTitle.className = "toolbar-action__title small";
        toolColorTitle.innerText = "Pick a color";

        // Блок для выбора цвета
        const toolColorInput = document.createElement("div");
        toolColorInput.className = "toolbar-action__color-body";

        // Input для выбора цвета
        const input = document.createElement("input");
        input.type = "color";
        input.className = "toolbar-action__color-input";
        input.addEventListener("input", () => {
            this.toolbarLogic.setCurrentColor(input.value);
            const view = document.querySelector(".toolbar-action__color-view");

            if (view) {
                view.innerText = input.value;
            };
        });

        // Текст показывающий выбранный цвет
        const inputView = document.createElement("p");
        inputView.className = "toolbar-action__color-view";
        inputView.innerText = input.value;
        toolColorInput.appendChild(input);
        toolColorInput.appendChild(inputView);

        toolColor.appendChild(toolColorTitle);
        toolColor.appendChild(toolColorInput);

        editTools.appendChild(toolModes);
        editTools.appendChild(toolColor);

        return editTools;
    }

    // Настройки сетки
    #renderGridSettings() {
        const toolbarAction = document.createElement("div");
        toolbarAction.className = "toolbar-action";

        // Заголовок
        const title = document.createElement("h3");
        title.className = "toolbar-action__title";
        title.innerText = "Grid Settings";

        // Блок настроек сетки
        const gridSettings = document.createElement("div");
        gridSettings.className = "toolbar-action__settings";

        const gridWidthSettings = document.createElement("div");
        gridWidthSettings.className = "toolbar-action__setting";
        const gridWidthTitle = document.createElement("h3");
        gridWidthTitle.className = "toolbar-action__title small";
        gridWidthTitle.innerText = "Grid Width";
        const gridWidthInput = document.createElement("input");
        gridWidthInput.type = "number";
        gridWidthInput.value = 16;
        gridWidthSettings.appendChild(gridWidthTitle);
        gridWidthSettings.appendChild(gridWidthInput);

        const gridHeightSettings = document.createElement("div");
        gridHeightSettings.className = "toolbar-action__setting";
        const gridHeightTitle = document.createElement("h3");
        gridHeightTitle.className = "toolbar-action__title small";
        gridHeightTitle.innerText = "Grid Height";
        const gridHeightInput = document.createElement("input");
        gridHeightInput.type = "number";
        gridHeightInput.value = 16;
        gridHeightSettings.appendChild(gridHeightTitle);
        gridHeightSettings.appendChild(gridHeightInput);

        gridSettings.appendChild(gridWidthSettings);
        gridSettings.appendChild(gridHeightSettings);

        const gridCellSettings = document.createElement("div");
        gridCellSettings.className = "toolbar-action__setting";
        const gridSettingsTitle = document.createElement("h3");
        gridSettingsTitle.className = "toolbar-action__title small";
        gridSettingsTitle.innerText = "Cell Size (20px)";
        const cellSizeRange = document.createElement("input");
        cellSizeRange.type = "range";
        cellSizeRange.min = 5;
        cellSizeRange.max = 40;
        cellSizeRange.step = 1;
        cellSizeRange.value = 20;
        const percent = (cellSizeRange.value - cellSizeRange.min) / (cellSizeRange.max - cellSizeRange.min) * 100;
        cellSizeRange.style.background = `linear-gradient(to right, var(--color-dark) ${percent}%, var(--color-background) ${percent}%)`;
        cellSizeRange.addEventListener("input", () => {
            gridSettingsTitle.innerText = `Cell Size (${cellSizeRange.value}px)`;
            this.toolbarLogic.setCellSize(cellSizeRange.value);
            const percent = (cellSizeRange.value - cellSizeRange.min) / (cellSizeRange.max - cellSizeRange.min) * 100;
            cellSizeRange.style.background = `linear-gradient(to right, var(--color-dark) ${percent}%, var(--color-background) ${percent}%)`;
        });

        gridCellSettings.appendChild(gridSettingsTitle);
        gridCellSettings.appendChild(cellSizeRange);

        toolbarAction.appendChild(title);
        toolbarAction.appendChild(gridSettings);
        toolbarAction.appendChild(gridCellSettings);

        return toolbarAction;
    }

}