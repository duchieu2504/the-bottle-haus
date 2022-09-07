const { createSlice } = require("@reduxjs/toolkit");

const init = {
    loading: false,
    error: false,
    items: [],
};
const products = createSlice({
    name: "products",
    initialState: init,
    reducers: {
        setLoadingProducts: (state, action) => {
            state.loading = true;
        },
        GET_ALL_PRODUCTS: (state, action) => {
            state.loading = false;
            state.error = false;
            state.items = action.payload;
        },
    },
});

const { reducer, actions } = products;
export const { GET_ALL_PRODUCTS, setLoadingProducts } = actions;
export default reducer;
