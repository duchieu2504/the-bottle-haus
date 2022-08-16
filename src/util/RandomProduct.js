export const randomProduct = (length, dataLength, id) => {
    const c = [];
    let b;
    do {
        b = Math.floor(Math.random() * dataLength);
        if (typeof id === "number") {
            if (!c.includes(b) && b !== id) c.push(b);
        } else {
            if (!c.includes(b)) c.push(b);
        }
    } while (c.length < length);
    return c;
};

export const getParent = (element, selector) => {
    while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
};
