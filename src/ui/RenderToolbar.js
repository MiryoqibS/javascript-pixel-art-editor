// Импорт под настроек для панели настроек 
import { GlobalSettings } from "./subsettings/GlobalSettings";
import { EditModesSettings } from "./subsettings/EditModesSettings";
import { GridSettings } from "./subsettings/GridSettings";
import { GridLinesSettings } from "./subsettings/GridLinesSettings";

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

        const actionGlobal = new GlobalSettings(this.toolbarLogic).render();
        const actionEditModes = new EditModesSettings(this.toolbarLogic).render();
        const actionGridSettings = new GridSettings(this.toolbarLogic).render();
        const actionGridLines = new GridLinesSettings(this.toolbarLogic).render();

        // Добавляем все настройки в панель настроек
        toolbar.appendChild(actionGlobal);
        toolbar.appendChild(actionEditModes);
        toolbar.appendChild(actionGridSettings);
        toolbar.appendChild(actionGridLines);

        return toolbar;
    }
}