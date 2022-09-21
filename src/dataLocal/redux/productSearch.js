const { createSlice } = require("@reduxjs/toolkit");

const init = {
    loading: false,
    error: false,
    items: [],
};
const products = createSlice({
    name: "productSearch",
    initialState: init,
    reducers: {
        setLoadingSearch: (state, action) => {
            state.loading = true;
        },
        SET_PRODUCTS_SEARCH: (state, action) => {
            state.loading = false;
            state.error = false;
            state.items = action.payload;
        },
    },
});

const { reducer, actions } = products;
export const { SET_PRODUCTS_SEARCH, setLoadingSearch } = actions;
export default reducer;
