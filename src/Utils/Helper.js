class Helper {
    capitalize(str) {
        return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
    }

    createIcon(icon, size) {
        const SVG_NS = "http://www.w3.org/2000/svg";
        const XLINK_NS = "http://www.w3.org/1999/xlink";

        const svg = document.createElementNS(SVG_NS, "svg");
        svg.setAttribute("width", size);
        svg.setAttribute("height", size);

        const use = document.createElementNS(SVG_NS, "use");
        use.setAttributeNS(XLINK_NS, "xlink:href", `/public/sprites.svg#icon-${icon}`);

        svg.appendChild(use);

        return svg;
    }
}

export const helper = new Helper();