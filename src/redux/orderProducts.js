const { createSlice } = require("@reduxjs/toolkit");

const init = {
    items: [],
    message: "",
    address: "",
};

const orderProducts = createSlice({
    name: "orderProducts",
    initialState: init,
    reducers: {
        addOrderProduct: (state, action) => {
            const newOrder = action.payload;
            state.items = newOrder;
        },
        addMessage: (state, action) => {
            state.message = action.payload;
        },
        // allOrderProduct: (state, action) => {
        //     const order = action.payload;
        //     return [...state, ...order];
        // },
    },
});

const { reducer, actions } = orderProducts;
export const { addOrderProduct, addMessage } = actions;
export default reducer;
