import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import SvgIcon from "svg";
import styles from "./PageCart.module.scss";
import convertPrice from "util/convertNumber";
import { useDispatch, useSelector } from "react-redux";
import { changeQuantity } from "redux/productsCart";
import "aos/dist/aos.css";
import "./CartItem.css";
import { AuthContext } from "Context/AuthProvider";
import {
    getOrderUnpaid,
    patchOrderUnpaidDeleteProductId,
    patchOrderUnpaidProductIds,
} from "apiServices/orderServices";
import { setItems, setLoading } from "redux/orderUnpaid";
import { NavLink } from "react-router-dom";

CartItem.propTypes = {
    item: PropTypes.object,
    timeDelay: PropTypes.number,
};
CartItem.defaultProps = {
    item: {},
    timeDelay: "",
};

function CartItem(props) {
    const { item, totalSessionLoading, setTotalSessionLoading } = props;
    const {
        user: { uid },
    } = useContext(AuthContext);

    const dispatch = useDispatch();

    const { quantily, productId } = item;

    // const [loading, setLoading] = useState(false);
    // lấy thông tin sản phẩm
    const dataCategory = useSelector((state) => state.products.items);

    const dataProdcuts = [...dataCategory];

    const product = dataProdcuts.find((item) => item._id === productId) || 0;

    const [quanti, setQuanti] = useState(Number(quantily));
    const totalPrice = (product.price * quanti).toString();

    // Thay đổi số lượng khi click vào nút giảm
    const handlePrevQuantity = async () => {
        setQuanti(quanti - 1);

        if (uid) {
            const data = {
                productId: productId,
                quantily: Number(quanti) - 1,
            };
            await patchOrderUnpaidProductIds(uid, data);

            await dispatch(setLoading());
            const resultOrderUnpaid = await getOrderUnpaid(uid);
            const actionGetOrde = await setItems(resultOrderUnpaid);
            await dispatch(actionGetOrde);
            return;

            //  TH có tài khoản
        } else {
            // TH chua co  tài khoản
            const dataSession = JSON.parse(
                sessionStorage.getItem("productIds")
            );
            const totalSession = JSON.parse(sessionStorage.getItem("total"));

            const dataSessionCopy = [...dataSession];
            const resultDataSession = dataSessionCopy.map((item) => {
                if (item.productId === productId) {
                    return { productId, quantily: `${Number(quanti) - 1}` };
                } else {
                    return { ...item };
                }
            });

            setTotalSessionLoading(!totalSessionLoading);

            sessionStorage.setItem(
                "productIds",
                JSON.stringify(resultDataSession)
            );

            sessionStorage.setItem(
                "total",
                JSON.stringify(
                    `${Number(totalSession) - Number(product.price)}`
                )
            );
            return;
        }
    };

    // Thay đổi số lượng khi click vào nút tăng
    const handleNextQuantity = async () => {
        setQuanti(quanti + 1);

        if (uid) {
            const data = {
                productId: productId,
                quantily: Number(quanti) + 1,
            };

            await patchOrderUnpaidProductIds(uid, data);

            await dispatch(setLoading());
            const resultOrderUnpaid = await getOrderUnpaid(uid);
            const actionGetOrder = await setItems(resultOrderUnpaid);
            await dispatch(actionGetOrder);
            return;
        } else {
            const productIdsSession = JSON.parse(
                sessionStorage.getItem("productIds")
            );
            const totalSession = JSON.parse(sessionStorage.getItem("total"));

            const dataSessionCopy = [...productIdsSession];
            const resultDataSession = dataSessionCopy.map((item) => {
                if (item.productId === productId) {
                    return { productId, quantily: `${Number(quanti) + 1}` };
                } else {
                    return { ...item };
                }
            });

            setTotalSessionLoading(!totalSessionLoading);

            sessionStorage.setItem(
                "productIds",
                JSON.stringify(resultDataSession)
            );

            sessionStorage.setItem(
                "total",
                JSON.stringify(
                    `${Number(totalSession) + Number(product.price)}`
                )
            );

            return;
        }
    };

    const handleDeleteProduct = async () => {
        if (uid) {
            //th: có tài khoản
            await patchOrderUnpaidDeleteProductId(uid, {
                productId: productId,
            });

            await dispatch(setLoading());
            const resultOrderUnpaid = await getOrderUnpaid(uid);
            const actionGetOrder = await setItems(resultOrderUnpaid);
            await dispatch(actionGetOrder);
        } else {
            // không có tài khoản
            const productIdsSession = JSON.parse(
                sessionStorage.getItem("productIds")
            );
            const totalSession = JSON.parse(sessionStorage.getItem("total"));

            const item = productIdsSession.find(
                (i) => i.productId === productId
            );
            const index = productIdsSession.indexOf(item);
            productIdsSession.splice(index, 1);

            setTotalSessionLoading(!totalSessionLoading);

            sessionStorage.setItem(
                "productIds",
                JSON.stringify(productIdsSession)
            );

            sessionStorage.setItem(
                "total",
                JSON.stringify(
                    `${Number(totalSession) - Number(product.price) * quanti}`
                )
            );
        }
    };

    return (
        <div className={clsx(styles.product_item)}>
            <div className={clsx(styles.product_item_wrap)}>
                <img
                    src={product.image}
                    alt="img"
                    className={clsx(styles.product_item_img)}
                />
                <NavLink
                    to={`/the-bottle-haus/${product.category}/${productId}`}
                    className={clsx(styles.product_item_title)}
                >
                    {product.title} <br />
                </NavLink>
            </div>
            <div className={clsx(styles.product_item_price)}>
                ${convertPrice(product.price)}
            </div>
            <div className={clsx(styles.product_item_quantily)}>
                <button
                    onClick={handlePrevQuantity}
                    className={clsx(styles.btn)}
                    disabled={quanti <= 1}
                >
                    {"-"}
                </button>
                <p>{quanti}</p>
                <button
                    className={clsx(styles.btn)}
                    onClick={handleNextQuantity}
                >
                    {"+"}
                </button>
            </div>
            <p className={clsx(styles.product_item_total)}>
                ${convertPrice(totalPrice)}
            </p>
            <div
                className={clsx(styles.product_delete)}
                onClick={handleDeleteProduct}
            >
                <img
                    className={clsx(styles.product_delete_img)}
                    src={SvgIcon.DELETE_ICON}
                    alt="DELETE"
                />
                {/* <div className={clsx(styles.product_delete_title)}>
                    <img
                        src="https://img.icons8.com/ios/50/000000/topic.png"
                        alt="Comment delete"
                    />
                    <p>Delete</p>
                </div> */}
            </div>
        </div>
    );
}

export default CartItem;
