import { helper } from "../utils/Helper.js";

/**
 * Рендерит переключатель (toggle) с чекбоксом.
 */
export const renderToggler = () => {
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

/**
 * Рендерит слайдер с фоном.
 */
export const renderSlider = (min, max, step, initialValue) => {
    const slider = document.createElement("input");
    slider.className = "toolbar-action__slider";
    slider.type = "range";
    slider.min = min;
    slider.max = max;
    slider.step = step;
    slider.value = initialValue;

    const percent = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.background = `linear-gradient(to right, var(--color-dark) ${percent}%, var(--color-background) ${percent}%)`;

    return slider;
}

/**
 * Рендерит блок выбора цвета обводки с color input.
 */
export const renderStrokeColorPicker = (toolbarLogic) => {
    const section = document.createElement("div");
    section.className = "grid-lines__color";

    const title = document.createElement("h3");
    title.className = "toolbar-action__title small";
    title.innerText = "Line Color";

    const body = document.createElement("div");
    body.className = "grid-lines__color-body";

    const colorPicker = document.createElement("input");
    colorPicker.className = "toolbar-action__color-input";
    colorPicker.type = "color";

    const colorPickerView = document.createElement("span");
    colorPickerView.className = "toolbar-action__color-view";
    colorPickerView.innerText = colorPicker.value;

    colorPicker.addEventListener("input", () => {
        toolbarLogic.setCanvasStrokeColor(colorPicker.value);
        colorPickerView.innerText = colorPicker.value;
    });

    body.appendChild(colorPicker);
    body.appendChild(colorPickerView);

    section.appendChild(title);
    section.appendChild(body);

    return section;
}

/**
 * Рендерит выбор стиля обводки (solid, dashed, dotted).
 */
export const renderStrokeStyleSettings = (toolbarLogic) => {
    const lineStye = document.createElement("div");
    lineStye.className = "grid-lines__style";

    const title = document.createElement("h3");
    title.className = "toolbar-action__title small";
    title.innerText = "Line Style";

    const select = document.createElement("button");
    select.className = "grid-lines__style-select";
    select.innerText = helper.capitalize(toolbarLogic.getCanvasLineStyle());

    select.addEventListener("click", () => {
        optionsContainer.classList.remove("hide");
    });

    const optionsContainer = document.createElement("div");
    optionsContainer.className = "grid-lines__style-options hide";

    const LINE_STYLES = ["solid", "dashed", "dotted"];

    LINE_STYLES.forEach(option => {
        const optionContainer = document.createElement("div");
        optionContainer.className = "grid-lines__style-option";

        optionContainer.addEventListener("click", () => {
            const oldActive = document.querySelector(".grid-lines__style-option.selected");

            if (oldActive) {
                oldActive.classList.remove("selected");
            };

            optionContainer.classList.add("selected");
            toolbarLogic.setCanvasLineStyle(option);
            optionsContainer.classList.add("hide");
            select.innerText = helper.capitalize(toolbarLogic.getCanvasLineStyle());
        });

        optionContainer.value = option;
        optionContainer.innerText = helper.capitalize(option);
        optionsContainer.appendChild(optionContainer);
    });

    lineStye.appendChild(title);
    lineStye.appendChild(select);
    lineStye.appendChild(optionsContainer);

    return lineStye;
}

/**
 * Рендерит слайдер для настройки ширины обводки.
 */
export const renderStrokeWidthRange = (toolbarLogic) => {
    const section = document.createElement("div");
    section.className = "grid-lines__width";

    const range = document.createElement("div");
    range.className = "grid-lines__width-range";

    const preview = document.createElement("h3");
    preview.className = "toolbar-action__title small";
    preview.innerText = "Line Width (1px)";

    const slider = renderSlider(0.1, 5, 0.1, 1);

    slider.addEventListener("input", () => {
        preview.innerText = `Line Width (${slider.value}px)`;
        toolbarLogic.setStrokeWidth(slider.value);

        const percent = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, var(--color-dark) ${percent}%, var(--color-background) ${percent}%)`;
    });

    range.appendChild(preview)
    range.appendChild(slider)

    section.appendChild(range);

    return section;
}