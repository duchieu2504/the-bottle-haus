import React from "react";
// import PropTypes from 'prop-types';
import clsx from "clsx";
import styles from "./CartItem.module.scss";
import convertPrice from "util/convertNumber";
import { useSelector } from "react-redux";

CartItem.propTypes = {};

function CartItem({ item }) {
    const { id_product, quantily } = item;

    // lấy thông tin sản phẩm
    const dataCategory = useSelector((state) => state.products);
    const dataProdcuts = [...dataCategory];
    const product = dataProdcuts.find((item) => item.id === id_product);
    return (
        <div className={clsx(styles.cart_item)}>
            <div className={clsx(styles.cart_item_img)}>
                <img src={product.img} alt="img" />
                <span>{quantily}</span>
            </div>
            <div className={clsx(styles.cart_item_content)}>
                <p className={clsx(styles.cart_item_price)}>
                    {convertPrice(product.price)}
                </p>
                <p className={clsx(styles.cart_item_title)}>{product.title}</p>
            </div>
        </div>
    );
}

export default CartItem;
