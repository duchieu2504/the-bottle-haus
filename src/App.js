import React, { useEffect } from "react";
import Header from "./component/page/Header/";
import Footer from "./component/page/Footer/Footer.js";
import Main from "./component/page/Main/index.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "scss/index.js";
import NavabarInfo from "component/Content/PageInfo/PageInfo.js";
import Products from "component/Content/PageProducts/PageProducts.js";
import ProductDetail from "component/Content/ProductDetail/ProductDetail.js";
import PageLogin from "component/Content/PageLogin/PageLogin.js";
import ScrollToTop from "util/ScrollToTop.js";
import AOS from "aos";
import PageCart from "component/Content/PageCart/PageCart.js";
import CheckOut from "component/Content/PageCheckOut/CheckOut.js";
import TotalProvider from "Context/TotalProvider";
import { useDispatch } from "react-redux";
import { GET_ALL_PRODUCTS, setLoadingProducts } from "redux/productSlice";
import { productsApi } from "apiServices/productsServices";
import AuthProvider from "Context/AuthProvider";
import PageUserInfo from "component/Content/PageUserInfo";
import FormAddress from "component/Content/FormAddress";
import styles from "./App.module.scss";
import clsx from "clsx";

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
                                    <Route
                                        path="/the-bottle-haus/"
                                        element={<Main />}
                                    ></Route>
                                    <Route path="/the-bottle-haus/">
                                        <Route
                                        // path="/the-bottle-haus/home"
                                        // element={
                                        //     <Navigate replace to="/home" />
                                        // }
                                        // element={<Main /> }
                                        />
                                        <Route
                                            exact
                                            path="account"
                                            element={<PageUserInfo />}
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
                                            exact
                                            path="home"
                                            element={<Main />}
                                        />
                                        <Route
                                            path="login"
                                            element={<PageLogin />}
                                        />
                                        <Route
                                            path="thong_tin"
                                            element={<NavabarInfo />}
                                        />
                                        <Route
                                            path="cart"
                                            element={<PageCart />}
                                        />
                                        <Route
                                            path="checkout"
                                            element={<CheckOut />}
                                        />
                                        <Route
                                            path=":url"
                                            element={<Products />}
                                        />
                                        <Route
                                            path=":url/:productId"
                                            element={<ProductDetail />}
                                        />
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
