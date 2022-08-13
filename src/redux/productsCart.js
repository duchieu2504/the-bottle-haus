const { createSlice } = require("@reduxjs/toolkit");

const init = [];

const products = createSlice({
    name: "productsCart",
    initialState: init,
    reducers: {
        buyProduct: (state, action) => {
            const newProduct = action.payload;
            state.push(newProduct);
        },
        removeProduct: (state, action) => {
            const id = action.payload;
            const product = state.find((i) => i.id === id);
            const index = state.indexOf(product);
            state.splice(index, 1);
        },
        changeQuantity: (state, action) => {
            const newProduct = action.payload;
            const index = state.findIndex((i) => i.id === newProduct.id);
            state[index] = newProduct;
            // return state
        },
    },
});

const { reducer, actions } = products;
export const { buyProduct, removeProduct, changeQuantity } = actions;
export default reducer;
