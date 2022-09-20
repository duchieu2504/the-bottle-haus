import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import productsCart from "./productsCart";
import activeLogin from "./Login";
import orderUnpaid from "./orderUnpaid";
import orderProducts from "./orderProducts";
import productSearch from "./productSearch";

const rootReducer = {
    products: productReducer,
    activeLogin: activeLogin,
    productsCart: productsCart,
    orderProducts: orderProducts,
    orderUnpaid: orderUnpaid,
    productSearch: productSearch,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
