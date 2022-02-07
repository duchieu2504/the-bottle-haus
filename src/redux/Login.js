import { createSlice } from "@reduxjs/toolkit"

const init = {
    activeLogin: false,
    activeNavbar: 0,
}

const products = createSlice({
    name: 'activeLogin',
    initialState: init,
    reducers: {
      clickLogin: (state, action) => {
        state.active = !action.payload
        return state
      },
      clickNavbar: (state, action) => {
        state.activeNavbar = action.payload
        return state
      },
    }
})

const { reducer, actions } = products
export const { clickLogin, clickNavbar } = actions
export default reducer