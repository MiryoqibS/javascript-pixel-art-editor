import { helper } from "../../utils/Helper";
import { renderStrokeColorPicker, renderStrokeStyleSettings, renderStrokeWidthRange, renderToggler } from "../ToolbarRendererUtils";

// Настройка линий ячейки
export class GridLinesSettings {
    constructor(toolbarLogic) {
        this.toolbarLogic = toolbarLogic;
    }

    render() {
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

        const { toggler, togglerInput } = renderToggler();

        const togglerIcon = document.createElement("div");
        const eyeIcon = helper.createIcon("eye-on", 24);
        togglerIcon.appendChild(eyeIcon);

        togglerInput.addEventListener("input", () => {
            // Переключение видимости линий ячейки
            if (togglerInput.checked) {
                const eyeIconOn = helper.createIcon("eye-on", 24);
                togglerIcon.innerHTML = "";
                togglerIcon.appendChild(eyeIconOn);
                this.toolbarLogic.showCanvasStroke();
            } else {
                const eyeIconOff = helper.createIcon("eye-off", 24);
                togglerIcon.innerHTML = "";
                togglerIcon.appendChild(eyeIconOff);
                this.toolbarLogic.hideCanvasStroke();
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

        const strokeColorPicker = renderStrokeColorPicker(this.toolbarLogic); // Выбор цвета обводки
        const strokeStyleSettings = renderStrokeStyleSettings(this.toolbarLogic); // // Выбор стиля обводки
        const strokeWidthSlider = renderStrokeWidthRange(this.toolbarLogic);

        // Добавляем элементы в основную часть
        sectionMain.appendChild(strokeColorPicker);
        sectionMain.appendChild(strokeStyleSettings);
        sectionMain.appendChild(strokeWidthSlider);

        // Собираем секцию
        gridLinesSection.appendChild(sectionHeader);
        gridLinesSection.appendChild(sectionMain);

        return gridLinesSection;
    }

}