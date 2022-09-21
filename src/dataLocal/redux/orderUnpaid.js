const { createSlice } = require("@reduxjs/toolkit");

const init = {
    loading: false,
    error: false,
    items: [],
};

const orderUnpaid = createSlice({
    name: "orderUnpaid",
    initialState: init,
    reducers: {
        setLoading: (state, action) => {
            state.loading = true;
        },
        setItems: (state, action) => {
            state.loading = false;
            state.error = false;
            state.items = action.payload;
        },
        setError: (state) => {
            state.error = true;
        },
    },
});

const { reducer, actions } = orderUnpaid;
export const { setLoading, setItems, setError } = actions;
export default reducer;
