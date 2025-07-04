import { helper } from "../Utils/Helper";
import { renderActions } from "./RenderActions";

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

        const actionGlobal = renderActions.actionGlobal(this.toolbarLogic);
        const actionEditModes = renderActions.actionEditModes(this.toolbarLogic);
        const actionGridSettings = renderActions.actionGridSettings(this.toolbarLogic);
        const actionGridLines = renderActions.actionGridLines(this.toolbarLogic);

        // Добавляем все настройки в панель настроек
        toolbar.appendChild(actionGlobal);
        toolbar.appendChild(actionEditModes);
        toolbar.appendChild(actionGridSettings);
        toolbar.appendChild(actionGridLines);

        return toolbar;
    }
}