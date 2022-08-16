import React, { useEffect, useState, useMemo, useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./ShoppingCart.module.scss";
import { NavLink } from "react-router-dom";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import convertPrice from "util/convertNumber";
import { TotalContext } from "Context/TotalProvider";

ShoppingCart.propTypes = {
    activeCart: PropTypes.bool,
    handleClickAllCart: PropTypes.func,
};
ShoppingCart.defaultProps = {
    activeCart: "",
    handleClickAllCart: null,
};

function ShoppingCart({ showShoppingCart, handleClickAllCart }) {
    // const [total, setTotal] = useState(0);

    const data = useSelector((state) => state.productsCart);
    const dataArray = useMemo(() => [...data], [data]);

    const dataShow = dataArray.reverse().slice(0, 2);

    const total = useContext(TotalContext);

    return (
        <div
            className={clsx(styles.cart, { [styles.active]: showShoppingCart })}
        >
            <h1>SHOPPING CART</h1>
            <div className={clsx(styles.cart_list)}>
                {dataArray.length === 0 ? (
                    <div className={clsx(styles.no_product)}>
                        <img
                            src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-cart-ecommerce-flatart-icons-outline-flatarticons-3.png"
                            alt="You don't have any products in your store yet"
                        />
                        <p>You don't have any products in your store yet</p>
                    </div>
                ) : (
                    dataShow.map((item) => {
                        return <CartItem item={item} key={item.id} />;
                    })
                )}
            </div>

            {dataArray.length > 2 ? (
                <div
                    className={clsx(styles.title)}
                >{`You have all ${dataArray.length} products in your cart`}</div>
            ) : (
                <div></div>
            )}

            <div className={clsx(styles.cart_total)}>
                <p>TOTAL</p>
                <span>$ {convertPrice(total.toString())}</span>
            </div>
            <div className={clsx(styles.cart_footer)}>
                <NavLink to="/the-bottle-haus/cart">
                    <button
                        onClick={handleClickAllCart}
                        className={clsx(styles.btn)}
                    >
                        View all
                    </button>
                </NavLink>
            </div>
        </div>
    );
}

export default ShoppingCart;
