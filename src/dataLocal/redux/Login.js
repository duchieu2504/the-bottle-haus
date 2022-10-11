import { createSlice } from "@reduxjs/toolkit";

const init = {
    activeLogin: false,
    activeNavbar: 0,
    showCatalog: false,
};

const products = createSlice({
    name: "activeLogin",
    initialState: init,
    reducers: {
        showPageLogin: (state, action) => {
            state.active = !action.payload;
            return state;
        },
        clickNavbar: (state, action) => {
            state.activeNavbar = action.payload;
            return state;
        },
        showMenuCatalog: (state, action) => {
            state.showCatalog = action.payload;
            return state;
        },
    },
});

const { reducer, actions } = products;
export const { showPageLogin, clickNavbar, showMenuCatalog } = actions;
export default reducer;
