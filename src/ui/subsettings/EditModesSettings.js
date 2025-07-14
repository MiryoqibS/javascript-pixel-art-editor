import { helper } from "../../utils/Helper.js";

// Режимы для редактирования
export class EditModesSettings {
    constructor(toolbarLogic) {
        this.toolbarLogic = toolbarLogic;
    }

    render() {
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
        const modes = this.toolbarLogic.getModes();
        modes.forEach(mode => {
            const toolButton = document.createElement("div");
            toolButton.className = "toolbar-action__button mode";

            if (mode == "draw") {
                toolButton.classList.add("active");
            };

            toolButton.innerText = helper.capitalize(mode);

            toolButton.addEventListener("click", () => {
                const prevActiveButton = document.querySelector(".toolbar-action__button.mode.active");
                prevActiveButton.classList.remove("active");
                toolButton.classList.add("active");
                this.toolbarLogic.changeMode(mode);
            });

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
            this.toolbarLogic.setCurrentColor(colorInput.value);
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
}