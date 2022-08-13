import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./ShoppingCart.module.scss";
import { NavLink } from "react-router-dom";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import convertPrice from "util/convertNumber";

Cart.propTypes = {
    activeCart: PropTypes.bool,
    handleClickAllCart: PropTypes.func,
};
Cart.defaultProps = {
    activeCart: "",
    handleClickAllCart: null,
};

function Cart({ activeCart, handleClickAllCart }) {
    const data = useSelector((state) => state.productsCart);

    const dataArray = useMemo(() => [...data], [data]);
    const [total, setTotal] = useState(0);

    const dataReverse = dataArray.reverse().slice(0, 2);

    useEffect(() => {
        const total = dataArray.reduce((acc, k) => {
            const t = Number(k.price) * Number(k.quantily);
            return acc + t;
        }, 0);
        setTotal(total);
    }, [dataArray]);

    return (
        <div className={clsx(styles.cart, { [styles.active]: activeCart })}>
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
                    dataReverse.map((item) => {
                        return (
                            <div key={item.id}>
                                <CartItem item={item} />
                            </div>
                        );
                    })
                )}
            </div>

            {dataArray.length > 2 ? (
                <div
                    className={clsx(styles.title)}
                >{`Bạn có tất cả ${dataArray.length} sản phẩm trong giỏ hàng`}</div>
            ) : (
                <div></div>
            )}

            <div className={clsx(styles.cart_total)}>
                <p>TOTAL</p>
                <span>{convertPrice(total.toString())}</span>
            </div>
            <div className={clsx(styles.cart_footer)}>
                {/* <button 
                    className={clsx(styles.btn)}
                >
                    Tiếp tục với cửa hàng
                </button> */}
                <NavLink to="/cart">
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

export default Cart;
