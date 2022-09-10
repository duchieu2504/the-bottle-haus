import React, { useEffect, useState, useMemo, useContext } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./ShoppingCart.module.scss";
import { NavLink } from "react-router-dom";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import convertPrice from "util/convertNumber";
import { TotalContext } from "Context/TotalProvider";
import { AuthContext } from "Context/AuthProvider";
import { getOrderUnpaid } from "apiServices/orderServices";
import Loading from "util/Loading";
import { setItems, setLoading } from "redux/orderUnpaid";

ShoppingCart.propTypes = {
    showShoppingCart: PropTypes.bool,
    handleClickAllCart: PropTypes.func,
};
ShoppingCart.defaultProps = {
    showShoppingCart: false,
    handleClickAllCart: null,
};

function ShoppingCart({ showShoppingCart, handleClickAllCart }) {
    const {
        user: { uid },
    } = useContext(AuthContext);

    const [dataOrderUnipadShow, setDataOrderUnipadShow] = useState([]);
    // const [loading, setLoading] = useState(true);

    // const data = useSelector((state) => state.productsCart);
    const orderUnpaid = useSelector((state) => state.orderUnpaid.items) || {};
    const loading = useSelector((state) => state.orderUnpaid.loading);
    const dispatch = useDispatch();

    const dataSession = JSON.parse(sessionStorage.getItem("productIds")) || [];
    const totalSession = JSON.parse(sessionStorage.getItem("total")) || 0;

    const dataArray = [...dataSession];

    // const dataArray = [...data];

    const dataShow = useMemo(() => {
        const data = dataSession.reverse().slice(0, 2);
        return data;
    }, [dataSession]);

    // lấy đơn hàng chưa thanh toán để hiện thị ra các sản phẩm trong giỏ hàng chưa thanh toán
    useEffect(() => {
        const orderUnpaid = async () => {
            await dispatch(setLoading());
            const resultOrderUnpaid = await getOrderUnpaid(uid);

            if (resultOrderUnpaid) {
                const data = await [...resultOrderUnpaid.productIds]
                    .reverse()
                    .slice(0, 2);
                await setDataOrderUnipadShow(data);
            }

            // dispatch lên store orderUnpaid
            const actionGetOrder = await setItems(resultOrderUnpaid);
            await dispatch(actionGetOrder);
            // await setLoading(false);
        };
        orderUnpaid();
    }, [uid, showShoppingCart]);

    const Item = () => {
        if (uid) {
            if (!loading && orderUnpaid.productIds?.length > 0) {
                return (
                    <div>
                        <div className={clsx(styles.cart_list)}>
                            {dataOrderUnipadShow.map((item) => (
                                <CartItem item={item} key={item.productId} />
                            ))}
                        </div>
                        {orderUnpaid.productIds.length > 2 ? (
                            <div
                                className={clsx(styles.title)}
                            >{`You have all ${orderUnpaid.productIds.length} products in your cart`}</div>
                        ) : (
                            <div></div>
                        )}
                        <div className={clsx(styles.cart_total)}>
                            <p>TOTAL</p>
                            <span>
                                ${" "}
                                {convertPrice(
                                    orderUnpaid.totalPrice.toString()
                                )}
                            </span>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className={clsx(styles.cart_list)}>
                        <div className={clsx(styles.no_product)}>
                            <img
                                src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-cart-ecommerce-flatart-icons-outline-flatarticons-3.png"
                                alt="You don't have any products in your store yet"
                            />
                            <p>You don't have any products in your store yet</p>
                        </div>
                    </div>
                );
            }
        } else {
            if (dataArray.length > 0) {
                return (
                    <div>
                        <div className={clsx(styles.cart_list)}>
                            {dataShow.map((item) => {
                                return <CartItem item={item} key={item.id} />;
                            })}
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
                            <span>
                                $ {convertPrice(totalSession.toString())}
                            </span>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className={clsx(styles.cart_list)}>
                        <div className={clsx(styles.no_product)}>
                            <img
                                src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-cart-ecommerce-flatart-icons-outline-flatarticons-3.png"
                                alt="You don't have any products in your store yet"
                            />
                            <p>You don't have any products in your store yet</p>
                        </div>
                    </div>
                );
            }
        }
    };
    return (
        <div
            className={clsx(styles.cart, { [styles.active]: showShoppingCart })}
        >
            <h1>SHOPPING CART</h1>
            <Item />
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
