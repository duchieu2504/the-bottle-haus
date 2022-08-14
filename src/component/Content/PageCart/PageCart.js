import React, { useEffect, useState, useMemo, useContext } from "react";
// import PropTypes from 'prop-types';
import clsx from "clsx";
import styles from "./PageCart.module.scss";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "redux/productsCart";
import convertPrice from "util/convertNumber";
import { NavLink } from "react-router-dom";

import "aos/dist/aos.css";
import { TotalContext } from "Context/TotalProvider";

PageCart.propTypes = {};

function PageCart(props) {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.productsCart);
    const dataProdcuts = useMemo(() => [...data], [data]);

    const total = useContext(TotalContext);

    // Xóa sản phẩm ra khỏi giỏ Hàng
    const handleDeleteProduct = (id) => {
        const action = removeProduct(id);
        dispatch(action);
    };
    return (
        <div className={clsx(styles.my_cart)}>
            <div className="grid wide">
                <div className={clsx(styles.header)}>
                    <p className={clsx(styles.text_fill)}>My</p>
                    <p className={clsx(styles.text_stroke)}>Cart</p>
                    <p className={clsx(styles.text_stroke)}>
                        ({dataProdcuts.length})
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
                                        You don't have any products, please
                                        choose to buy one
                                    </p>
                                </div>
                            ) : (
                                dataProdcuts.map((item, k) => {
                                    const timeDelay = (k + 4) * 50;
                                    return (
                                        <div key={item.id}>
                                            <CartItem
                                                item={item}
                                                timeDelay={timeDelay}
                                                handleDeleteProduct={
                                                    handleDeleteProduct
                                                }
                                            />
                                        </div>
                                    );
                                })
                            )}
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
                                    {convertPrice(total.toString())} USD
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
                                            [styles.no_submit]:
                                                Number(total) === 0,
                                        }
                                    )}
                                    onClick={(e) =>
                                        Number(total) === 0 &&
                                        e.preventDefault()
                                    }
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
}

export default PageCart;
