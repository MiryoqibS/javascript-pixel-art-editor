import { helper } from "../../utils/Helper.js";

// Глобальные действия (Сброс и загрузка)
export class GlobalSettings {
    constructor(toolbarLogic) {
        this.toolbarLogic = toolbarLogic;
    }

    render() {
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
            this.toolbarLogic.resetGrid();
        });

        actionsContainer.appendChild(clearButton);

        // Собираем блок
        actionsSection.appendChild(sectionTitle);
        actionsSection.appendChild(actionsContainer);

        return actionsSection;
    }
}