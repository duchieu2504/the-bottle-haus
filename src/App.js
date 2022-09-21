import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import AOS from "aos";

import Header from "./component/page/Header/";
import Footer from "./component/page/Footer/Footer.js";
import Main from "./component/page/Main/index.js";
import NotFound from "component/NotFound";

import ScrollToTop from "util/ScrollToTop.js";

import TotalProvider from "dataLocal/Context/TotalProvider";
import AuthProvider from "dataLocal/Context/AuthProvider";
import {
    GET_ALL_PRODUCTS,
    setLoadingProducts,
} from "dataLocal/redux/productSlice";

import { productsApi } from "connectApi/apiServices/productsServices";

import styles from "./App.module.scss";
import GlobalStyles from "assets/scss";

import Store from "features/Store";
import ProductDetail from "features/ProductDetail";
import CatalogProducts from "features/CatalogProduct";
import User from "features/User";
import CheckOut from "features/CheckOut";
import FormAddress from "features/FormAddress";
import ContactUs from "features/ContactUs/ContactUs";
import PageLogin from "features/Login";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getData = async () => {
            await dispatch(setLoadingProducts());
            const result = await productsApi();
            const action = GET_ALL_PRODUCTS(result);
            dispatch(action);
        };

        getData();

        AOS.init();
    }, []);
    return (
        <GlobalStyles>
            <BrowserRouter>
                <AuthProvider>
                    <TotalProvider>
                        <div
                            className="shop_demo"
                            style={{ overflow: "hidden" }}
                        >
                            <ScrollToTop />
                            <Header />
                            <main className={clsx(styles.container)}>
                                <Routes>
                                    <Route path="/the-bottle-haus/">
                                        <Route
                                            exact
                                            path="home"
                                            element={<Main />}
                                        />
                                        <Route
                                            path=""
                                            element={
                                                <Navigate
                                                    replace
                                                    to="/the-bottle-haus/home"
                                                />
                                            }
                                        />
                                        <Route
                                            exact
                                            path="account"
                                            element={<User />}
                                        />
                                        <Route
                                            exact
                                            path="account/address"
                                            element={<FormAddress />}
                                        />
                                        <Route
                                            exact
                                            path="account/address/:id"
                                            element={<FormAddress />}
                                        />
                                        <Route
                                            path="login"
                                            element={<PageLogin />}
                                        />
                                        <Route
                                            path="thong_tin"
                                            element={<ContactUs />}
                                        />
                                        <Route
                                            path="cart"
                                            element={<Store />}
                                        />
                                        <Route
                                            path="checkout"
                                            element={<CheckOut />}
                                        />
                                        <Route
                                            path=":url"
                                            element={<CatalogProducts />}
                                        />
                                        <Route
                                            path=":url/:productId"
                                            element={<ProductDetail />}
                                        />
                                        <Route element={<NotFound />} />
                                    </Route>
                                </Routes>
                                <PageLogin />
                            </main>
                            <Footer />
                        </div>
                    </TotalProvider>
                </AuthProvider>
            </BrowserRouter>
        </GlobalStyles>
    );
};
export default App;
