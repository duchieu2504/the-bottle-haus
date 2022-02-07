import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import productsCart from './productsCart'
import activeLogin from './Login'
import usersInfo from './userInfo'

const rootReducer = {
    products: productReducer,
    activeLogin: activeLogin,
    productsCart: productsCart,
    usersInfo: usersInfo
}

const store = configureStore({
    reducer: rootReducer
})

export default store