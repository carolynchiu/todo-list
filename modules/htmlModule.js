export const HtmlModule = (() => {
    const createHtmlElement = (elementProperties) => {
        const {
            element,
            id,
            className,
            innerText,
            innerHTML,
            value,
            disabled,
        } = elementProperties;
        let domElement = document.createElement(element);
        if (id) domElement.setAttribute("id", id);
        if (className) domElement.classList.add(className);
        if (innerText) domElement.innerText = innerText;
        if (innerHTML) domElement.innerHTML = innerHTML;
        if (value) domElement.value = value;
        if (disabled) domElement.setAttribute("disabled", null);
        return domElement;
    };

    return { createHtmlElement };
})();

