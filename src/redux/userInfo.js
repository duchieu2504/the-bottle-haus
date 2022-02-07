const { createSlice } = require("@reduxjs/toolkit");


const init = []

const usersInfo = createSlice({
    name: 'usersInfo',
    initialState: init,
    reducers: {
      addUser: (state, action) => {
        const newUser = action.payload
        state.push(newUser)
      },
    }
})

const { reducer, actions } = usersInfo
export const { addUser } = actions
export default reducer