import React from "react";
// import PropTypes from 'prop-types';
import clsx from "clsx";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "./CartItem.module.scss";

import { convertPrice } from "util/Func";

CartItem.propTypes = {};

function CartItem({ item }) {
    const { productId, quantily } = item;

    // lấy thông tin sản phẩm
    const dataCategory = useSelector((state) => state.products.items);
    const dataProdcuts = [...dataCategory];
    const product = dataProdcuts.find((item) => item._id === productId) || {};
    return (
        <NavLink
            to={`/the-bottle-haus/${product.category}/${productId}`}
            className={clsx(styles.cart_item)}
        >
            <div className={clsx(styles.cart_item_img)}>
                <img src={product.image || ""} alt={product.title} />
                <span>{quantily}</span>
            </div>
            <div className={clsx(styles.cart_item_content)}>
                <p className={clsx(styles.cart_item_price)}>
                    $ {convertPrice(product.price)}
                </p>
                <p className={clsx(styles.cart_item_title)}>{product.title}</p>
            </div>
        </NavLink>
    );
}

export default CartItem;
