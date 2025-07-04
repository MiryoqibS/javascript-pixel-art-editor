import { helper } from "../Utils/Helper";

class RenderActions {
    // Глобальные действия (Сброс и загрузка)
    actionGlobal(toolbarLogic) {
        const actionsSection = document.createElement("div");
        actionsSection.className = "toolbar-action";

        // Заголовок секции
        const sectionTitle = document.createElement("h3");
        sectionTitle.className = "toolbar-action__title";
        sectionTitle.innerText = "Actions";

        // Контейнер кнопок
        const actionsContainer = document.createElement("div");
        actionsContainer.className = "toolbar-action__actions";

        // Кнопка: Сохранить изображение
        const downloadButton = document.createElement("button");
        downloadButton.className = "toolbar-action__button";
        const downloadIcon = helper.createIcon("download", 16);
        downloadButton.appendChild(downloadIcon);
        downloadButton.append("Download Image");

        downloadButton.addEventListener("click", () => {
            const canvas = document.querySelector(".canvas");
            const image = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = image;
            link.download = "pixel-art.png";
            link.click();
        });

        actionsContainer.appendChild(downloadButton);

        // Кнопка: Очистить холст
        const clearButton = document.createElement("button");
        clearButton.className = "toolbar-action__button clear";
        const clearIcon = helper.createIcon("delete", 16);
        clearButton.appendChild(clearIcon);
        clearButton.append("Clear Canvas");

        clearButton.addEventListener("click", () => {
            toolbarLogic.resetGrid();
        });

        actionsContainer.appendChild(clearButton);

        // Собираем блок
        actionsSection.appendChild(sectionTitle);
        actionsSection.appendChild(actionsContainer);

        return actionsSection;
    }

    // Режимы для редактирования
    actionEditModes(toolbarLogic) {
        const editSection = document.createElement("div");
        editSection.className = "toolbar-action";

        // Заголовок секции
        const sectionTitle = document.createElement("h3");
        sectionTitle.className = "toolbar-action__title";
        sectionTitle.innerText = "Drawing tools";
        editSection.appendChild(sectionTitle);

        // Контейнер для кнопок режимов
        const toolsContainer = document.createElement("div");
        toolsContainer.className = "toolbar-action__modes";
        let isFirstMode = true;

        toolbarLogic.modes.forEach(mode => {
            const toolButton = document.createElement("div");
            toolButton.className = "toolbar-action__button mode";
            if (isFirstMode) {
                toolButton.classList.add("active");
                isFirstMode = false;
            }
            toolButton.innerText = helper.capitalize(mode.name);
            toolsContainer.appendChild(toolButton);
        });

        // Блок выбора цвета
        const colorPickerSection = document.createElement("div");
        colorPickerSection.className = "toolbar-action__color";

        const colorPickerTitle = document.createElement("p");
        colorPickerTitle.className = "toolbar-action__title small";
        colorPickerTitle.innerText = "Pick a color";

        const colorPickerControls = document.createElement("div");
        colorPickerControls.className = "toolbar-action__color-body";

        const colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.className = "toolbar-action__color-input";
        colorInput.addEventListener("input", () => {
            toolbarLogic.setCurrentColor(colorInput.value);
            const colorValueLabel = document.querySelector(".toolbar-action__color-view");

            if (colorValueLabel) {
                colorValueLabel.innerText = colorInput.value;
            }
        });

        const colorValueLabel = document.createElement("p");
        colorValueLabel.className = "toolbar-action__color-view";
        colorValueLabel.innerText = colorInput.value;

        colorPickerControls.appendChild(colorInput);
        colorPickerControls.appendChild(colorValueLabel);

        colorPickerSection.appendChild(colorPickerTitle);
        colorPickerSection.appendChild(colorPickerControls);

        editSection.appendChild(toolsContainer);
        editSection.appendChild(colorPickerSection);

        return editSection;
    }

    // Настройки сетки
    actionGridSettings(toolbarLogic) {
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
            toolbarLogic.setGridWidth(Number(widthInput.value));
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
            toolbarLogic.setGridHeight(Number(heightInput.value));
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

        const cellSizeSlider = this.#renderSlider(5, 40, 1, 20);

        // Обработчик изменения размера ячеек
        cellSizeSlider.addEventListener("input", () => {
            cellSizeLabel.innerText = `Cell Size (${cellSizeSlider.value}px)`;
            toolbarLogic.setCellSize(cellSizeSlider.value);

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

    // Настройка линий ячейки
    actionGridLines(toolbarLogic) {
        const gridLinesSection = document.createElement("div");
        gridLinesSection.className = "grid-lines toolbar-action";

        // Верхняя часть блока
        const sectionHeader = document.createElement("header");
        sectionHeader.className = "grid-lines__header";

        // Заголовок блока
        const sectionTitle = document.createElement("h3");
        sectionTitle.className = "toolbar-action__title";
        sectionTitle.innerText = "Grid Lines";

        // Переключатель видимости
        const visibilityToggler = document.createElement("div");
        visibilityToggler.className = "grid-lines__visibility";

        const { toggler, togglerInput } = this.#renderToggler();

        const togglerIcon = document.createElement("div");
        const eyeIcon = helper.createIcon("eye-on", 24);
        togglerIcon.appendChild(eyeIcon);

        togglerInput.addEventListener("input", () => {
            // Переключение видимости линий ячейки
            if (togglerInput.checked) {
                const eyeIconOn = helper.createIcon("eye-on", 24);
                togglerIcon.innerHTML = "";
                togglerIcon.appendChild(eyeIconOn);
                toolbarLogic.showCanvasStroke();
            } else {
                const eyeIconOff = helper.createIcon("eye-off", 24);
                togglerIcon.innerHTML = "";
                togglerIcon.appendChild(eyeIconOff);
                toolbarLogic.hideCanvasStroke();
            };
        });

        visibilityToggler.appendChild(toggler);
        visibilityToggler.appendChild(togglerIcon);

        // Добавляем элементы в шапку секции
        sectionHeader.appendChild(sectionTitle)
        sectionHeader.appendChild(visibilityToggler);

        // Основная часть
        const sectionMain = document.createElement("main");
        sectionMain.className = "grid-lines__main";

        const strokeColorPicker = this.#renderStrokeColorPicker(toolbarLogic); // Выбор цвета обводки
        const strokeStyleSettings = this.#renderStrokeStyleSettings(toolbarLogic); // // Выбор стиля обводки
        const strokeWidthSlider = this.#renderStrokeWidthRange(toolbarLogic);

        // Добавляем элементы в основную часть
        sectionMain.appendChild(strokeColorPicker);
        sectionMain.appendChild(strokeStyleSettings);
        sectionMain.appendChild(strokeWidthSlider);

        // Собираем секцию
        gridLinesSection.appendChild(sectionHeader);
        gridLinesSection.appendChild(sectionMain);

        return gridLinesSection;
    }

    // Вспомогательные рендеры
    #renderToggler() {
        const toggler = document.createElement("div");
        toggler.className = "toggle";

        const togglerInput = document.createElement("input");
        togglerInput.type = "checkbox";
        togglerInput.checked = true;
        togglerInput.className = "toggle__input";

        const togglerBar = document.createElement("span");
        togglerBar.className = "toggle__bar";

        toggler.appendChild(togglerInput);
        toggler.appendChild(togglerBar);

        return { toggler, togglerInput };
    }

    #renderSlider(min, max, step, initialValue) {
        const slider = document.createElement("input");
        slider.className = "toolbar-action__slider";
        slider.type = "range";
        slider.min = min;
        slider.max = max;
        slider.step = step;
        slider.value = initialValue;

        // Инициализация градиента
        const percent = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, var(--color-dark) ${percent}%, var(--color-background) ${percent}%)`;

        return slider;
    }

    // Выбор цвета обводки
    #renderStrokeColorPicker(toolbarLogic) {
        const colorPickerSection = document.createElement("div");
        colorPickerSection.className = "grid-lines__color";

        // Заголовок секции
        const sectionTitle = document.createElement("h3");
        sectionTitle.className = "toolbar-action__title small";
        sectionTitle.innerText = "Line Color";

        // Контейнер для выбора цвета 
        const sectionBody = document.createElement("div");
        sectionBody.className = "grid-lines__color-body";

        // Input для выбора цвета
        const colorPicker = document.createElement("input");
        colorPicker.className = "toolbar-action__color-input";
        colorPicker.type = "color";

        // Span для отображения выбранного цвета
        const colorPickerView = document.createElement("span");
        colorPickerView.className = "toolbar-action__color-view";
        colorPickerView.innerText = colorPicker.value;

        colorPicker.addEventListener("input", () => {
            toolbarLogic.setCanvasStrokeColor(colorPicker.value);
            colorPickerView.innerText = colorPicker.value;
        });

        // Добавляем элементы в секцию выбора цвета
        sectionBody.appendChild(colorPicker);
        sectionBody.appendChild(colorPickerView);

        // Собираем блок выбора цвета обводки
        colorPickerSection.appendChild(sectionTitle);
        colorPickerSection.appendChild(sectionBody);

        return colorPickerSection;
    }

    // Выбор стиля обводки
    #renderStrokeStyleSettings(toolbarLogic) {
        const lineStye = document.createElement("div");
        lineStye.className = "grid-lines__style";

        const lineStyeTitle = document.createElement("h3");
        lineStyeTitle.className = "toolbar-action__title small";
        lineStyeTitle.innerText = "Line Style";

        const lineStyleSelect = document.createElement("button");
        lineStyleSelect.className = "grid-lines__style-select";
        lineStyleSelect.innerText = helper.capitalize(toolbarLogic.getCanvasLineStyle());

        lineStyleSelect.addEventListener("click", () => {
            lineStyleOptions.classList.remove("hide");
        });

        const lineStyleOptions = document.createElement("div");
        lineStyleOptions.className = "grid-lines__style-options hide";

        const OPTIONS = ["solid", "dashed", "dotted"];

        OPTIONS.forEach(option => {
            const lineStyleOption = document.createElement("div");
            lineStyleOption.className = "grid-lines__style-option";

            lineStyleOption.addEventListener("click", () => {
                const oldActive = document.querySelector(".grid-lines__style-option.selected");

                if (oldActive) {
                    oldActive.classList.remove("selected");
                };

                lineStyleOption.classList.add("selected");
                toolbarLogic.setCanvasLineStyle(option);
                lineStyleOptions.classList.add("hide");
                lineStyleSelect.innerText = helper.capitalize(toolbarLogic.getCanvasLineStyle());
            });

            lineStyleOption.value = option;
            lineStyleOption.innerText = helper.capitalize(option);
            lineStyleOptions.appendChild(lineStyleOption);
        });

        // Собираем блок выбора стиля обводки сетки
        lineStye.appendChild(lineStyeTitle);
        lineStye.appendChild(lineStyleSelect);
        lineStye.appendChild(lineStyleOptions);

        return lineStye;
    }

    #renderStrokeWidthRange(toolbarLogic) {
        const strokeWidthSection = document.createElement("div");
        strokeWidthSection.className = "grid-lines__width";

        const strokeWidthRange = document.createElement("div");
        strokeWidthRange.className = "grid-lines__width-range";

        const strokeWidthPreview = document.createElement("h3");
        strokeWidthPreview.className = "toolbar-action__title small";
        strokeWidthPreview.innerText = "Line Width (1px)";

        const strokeWidthSlider = this.#renderSlider(0.1, 5, 0.1, 1);

        // Обработчик изменения размера ячеек
        strokeWidthSlider.addEventListener("input", () => {
            strokeWidthPreview.innerText = `Line Width (${strokeWidthSlider.value}px)`;
            toolbarLogic.setStrokeWidth(strokeWidthSlider.value);

            // Обновление градиента фона слайдера
            const percent = (strokeWidthSlider.value - strokeWidthSlider.min) / (strokeWidthSlider.max - strokeWidthSlider.min) * 100;
            strokeWidthSlider.style.background = `linear-gradient(to right, var(--color-dark) ${percent}%, var(--color-background) ${percent}%)`;
        });

        // Добавляем элементы в блок range ширины обводки
        strokeWidthRange.appendChild(strokeWidthPreview)
        strokeWidthRange.appendChild(strokeWidthSlider)

        // Собираем блок ширины обводки
        strokeWidthSection.appendChild(strokeWidthRange);

        return strokeWidthSection;
    }
}

export const renderActions = new RenderActions();