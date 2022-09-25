import React, { useEffect, useState, useMemo, useContext, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "./Store.module.scss";
import "aos/dist/aos.css";

import { convertPrice } from "util/Func";

import { AuthContext } from "dataLocal/Context/AuthProvider";
import { addMessage } from "dataLocal/redux/orderProducts";

import Loading from "component/Loading";
import CartItem from "./component/CartItem";

import { patchOrderUnpaid } from "connectApi/apiServices/orderServices";

// Store.propTypes = {};

const Store = (props) => {
    const {
        user: { uid },
    } = useContext(AuthContext);
    const [totalUnipad, setTotalUnipad] = useState(0);
    const [textArea, setTextArea] = useState("");
    const [lengthUnipad, setLengthUnipad] = useState(0);
    const [totalSession, setTotalSession] = useState(0);
    const [totalSessionLoading, setTotalSessionLoading] = useState(false);

    const orderUnpaid = useSelector((state) => state.orderUnpaid.items);
    const loadingOrder = useSelector((state) => state.orderUnpaid.loading);

    const loading = useSelector((state) => state.products.loading);

    // lưu sản phẩm trong  redux nếu chưa đăng  nhập
    const dispatch = useDispatch();
    // const data = useSelector((state) => state.productsCart);
    const dataSession = JSON.parse(sessionStorage.getItem("productIds")) || [];
    const totalLocalSession = JSON.parse(sessionStorage.getItem("total")) || 0;

    const dataProdcuts = useMemo(() => [...dataSession], [dataSession]);

    // const total = useContext(TotalContext);
    const textareaRef = useRef();

    // Xóa sản phẩm ra khỏi giỏ Hàng TH người dùng chưa đăng nhập.
    const handleDeleteProduct = (id) => {
        // const action = removeProduct(id);
        // dispatch(action);
    };

    useEffect(() => {
        const totalSession = JSON.parse(sessionStorage.getItem("total"));

        if (totalSession) {
            setTotalSession(totalSession);
            return;
        }
    }, [totalSessionLoading]);
    // console.log(totalSession);

    //TÔng  giá TH người dùng đã có tài khoản.
    useEffect(() => {
        if (orderUnpaid) {
            setTotalUnipad(orderUnpaid.totalPrice);
            setTextArea(orderUnpaid.message);
            orderUnpaid.productIds
                ? setLengthUnipad(orderUnpaid.productIds.length)
                : setLengthUnipad(0);
            return;
        }
    }, [loading, orderUnpaid]);

    const handleClickCheckOutBtn = async (e) => {
        if (uid) {
            if (Number(totalUnipad) === 0) {
                e.preventDefault();
                return;
            } else {
                const val = textareaRef.current.value;
                if (val !== "") {
                    await patchOrderUnpaid(uid, { message: val });
                    return;
                } else {
                    return;
                }
            }
        } else {
            if (Number(totalSession) === 0) {
                e.preventDefault();
                return;
            } else {
                const val = textareaRef.current.value;
                if (val !== "") {
                    const action = addMessage(val);
                    dispatch(action);
                    return;
                } else {
                    return;
                }
            }
        }
    };

    const StoreProduct = () => {
        if (uid) {
            if (orderUnpaid) {
                return (
                    <>
                        {orderUnpaid.productIds?.map((item, k) => {
                            const timeDelay = (k + 4) * 50;
                            return (
                                <div
                                    key={item.id}
                                    // data-aos="fade-up"
                                    // data-aos-delay={timeDelay}
                                    // data-aos-easing="ease-out"
                                    // data-aos-mirror="true"
                                >
                                    <CartItem
                                        item={item}
                                        timeDelay={timeDelay}
                                        handleDeleteProduct={
                                            handleDeleteProduct
                                        }
                                    />
                                </div>
                            );
                        })}
                    </>
                );
            } else {
                return (
                    <div
                        className={clsx(styles.no_product)}
                        data-aos="fade-up"
                        data-aos-easing="ease-out"
                    >
                        <img
                            src="https://img.icons8.com/emoji/36/000000/warning-emoji.png"
                            alt="Warning"
                        />
                        <p>
                            You don't have any products, please choose to buy
                            one
                        </p>
                    </div>
                );
            }
        } else {
            return (
                <div className={clsx(styles.product)}>
                    {dataProdcuts.length === 0 ? (
                        <div
                            className={clsx(styles.no_product)}
                            data-aos="fade-up"
                            data-aos-easing="ease-out"
                        >
                            <img
                                src="https://img.icons8.com/emoji/36/000000/warning-emoji.png"
                                alt="Warning"
                            />
                            <p>
                                You don't have any products, please choose to
                                buy one
                            </p>
                        </div>
                    ) : (
                        dataProdcuts.map((item, k) => {
                            const timeDelay = (k + 4) * 50;
                            return (
                                <div
                                    key={item.id}
                                    data-aos="fade-up"
                                    data-aos-delay={timeDelay}
                                    data-aos-easing="ease-out"
                                    data-aos-mirror="true"
                                >
                                    <CartItem
                                        item={item}
                                        totalSessionLoading={
                                            totalSessionLoading
                                        }
                                        setTotalSessionLoading={
                                            setTotalSessionLoading
                                        }
                                    />
                                </div>
                            );
                        })
                    )}
                </div>
            );
        }
    };
    return (
        <div className={clsx(styles.my_cart)}>
            <div className="grid wide">
                <div className={clsx(styles.header)}>
                    <p className={clsx(styles.text_fill)}>My</p>
                    <p className={clsx(styles.text_stroke)}>Cart</p>
                    <p className={clsx(styles.text_stroke)}>
                        ({orderUnpaid ? lengthUnipad : dataProdcuts.length})
                    </p>
                </div>
                <div className={clsx(styles.header_line)}></div>
                <div className={clsx(styles.container)}>
                    <div className={clsx(styles.products)}>
                        <div
                            className={clsx(styles.products_navbar)}
                            data-aos="fade-up"
                            data-aos-easing="ease"
                        >
                            <p>Product</p>
                            <p>Price</p>
                            <p>Quantity</p>
                            <p>Total</p>
                        </div>
                        <div className={clsx(styles.products_list)}>
                            {loading ? <Loading /> : <StoreProduct />}
                            {loadingOrder && <Loading />}
                        </div>
                    </div>
                    <div
                        className={clsx(styles.checkout)}
                        data-aos="fade-up"
                        data-aos-easing="ease"
                    >
                        <div className={clsx(styles.checkout_note)}>
                            <p>Special instructions for seller</p>
                            <textarea
                                id="checkout_note_text"
                                name="checkout_note_text"
                                rows="8"
                                placeholder="Message"
                                ref={textareaRef}
                                defaultValue={textArea}
                            ></textarea>
                        </div>
                        <div className={clsx(styles.checkout_body)}>
                            <div className={clsx(styles.checkout_warning)}>
                                {/* <img
                                    src="https://img.icons8.com/emoji/36/000000/warning-emoji.png"
                                    alt="Warning"
                                /> */}
                                <p
                                    className={clsx(
                                        styles.checkout_warning_title
                                    )}
                                >
                                    *By deselecting shipping protection, The
                                    Bottle Haus is not liable for lost, damaged,
                                    or stolen items
                                </p>
                            </div>
                            <div className={clsx(styles.checkout_total)}>
                                <p>SUBTOTAL</p>
                                <span>
                                    {convertPrice(totalUnipad) ||
                                        convertPrice(
                                            totalSession.toString()
                                        )}{" "}
                                    USD
                                </span>
                            </div>
                            <div className={clsx(styles.checkout_warning)}>
                                <h3>
                                    Taxes And Shipping Calculated At Checkout
                                </h3>
                                <p
                                    className={clsx(
                                        styles.checkout_warning_title
                                    )}
                                >
                                    *By deselecting shipping protection, The
                                    Bottle Haus. is not liable for items lost,
                                    damaged, or stolen in transit
                                </p>
                            </div>
                            <div
                                className={clsx(styles.checkout_button_submit)}
                            >
                                <NavLink
                                    className={clsx(
                                        styles.checkout_button_submit_link,
                                        {
                                            [styles.no_submit]: uid
                                                ? Number(totalUnipad) === 0
                                                : Number(totalSession) === 0,
                                        }
                                    )}
                                    onClick={handleClickCheckOutBtn}
                                    to="/the-bottle-haus/checkout"
                                >
                                    Check out
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Store;
