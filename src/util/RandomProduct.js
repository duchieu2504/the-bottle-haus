// const randomProduct = (data) => {
//     let dataRandom = []
//     let index;
//     let num = Math.floor(Math.random() * data.length)
//     do {
//       index = Math.floor(Math.random() * data.length);
//     } while (index === num);
//     let i = [...num, index]
// }

export const getParent = (element, selector) => {
    while(element.parentElement) {
        if(element.parentElement.matches(selector)) {
            return element.parentElement
        }
        element = element.parentElement
    }
}