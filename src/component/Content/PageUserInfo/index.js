import { getAllAddresses, putApiAdress } from "apiServices/addressServices";
import { getAllOrder } from "apiServices/orderServices";
import clsx from "clsx";
import { AuthContext } from "Context/AuthProvider";
import { auth } from "firebase/config";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import Loading from "util/Loading";
import FormAddress from "../FormAddress";
import OrderProductItem from "./OrderProductItem";
import styles from "./PageUserInfo.module.scss";

const PageUserInfo = () => {
    const navigate = useNavigate();
    const [orderUser, setOrderUser] = useState([]);
    const [addressUser, setAddressUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingSetDefault, setLoadingSetDefault] = useState(true);

    const {
        user: { uid, displayName },
    } = useContext(AuthContext);

    useEffect(() => {
        if (uid) {
            const getOrderProduct = async () => {
                // danh sách order
                const resultOrder = await getAllOrder(uid);
                await setOrderUser(resultOrder);

                // danh sachs địa chỉ khách hàng"
                const resultAddress = await getAllAddresses(uid);
                await setAddressUser(resultAddress);

                await setLoading(true);
            };
            getOrderProduct();
            return;
        }
        return setOrderUser([]);
    }, [uid, loadingSetDefault]);

    const handleLogOut = async () => {
        await auth.signOut();
        navigate("/the-bottle-haus/home");
    };

    const orderProductLength = () => {
        if (orderUser) {
            return orderUser.length;
        }
        return 0;
    };
    const totalMoney = () => {
        if (orderUser) {
            const total = orderUser.reduce(
                (result, item) => result + Number(item.totalPrice),
                0
            );
            return total;
        }
        return 0;
    };

    // set default address
    const handleClickSetDefault = (e) => {
        const id = e.target.dataset.index;
        setLoadingSetDefault(false);
        const editDefaultAdress = async () => {
            const data = { isDefault: true };
            await putApiAdress(id, data);
            await setLoadingSetDefault(true);
        };
        editDefaultAdress();
    };
    return (
        <div className="container">
            <div className="grid wide">
                <div className={clsx(styles.account)}>
                    <div className={clsx(styles.account_user)}>
                        <h2>
                            Account : <span>{displayName}</span>
                        </h2>
                        <button
                            type="button"
                            className={clsx(styles.account_user_info_logout)}
                            onClick={handleLogOut}
                        >
                            <img
                                src="https://img.icons8.com/pastel-glyph/64/000000/user-male-circle.png"
                                alt="Log out"
                            />
                            <p>Log out</p>
                        </button>
                    </div>
                    <div className={clsx(styles.account_details)}>
                        <h1>Account details</h1>
                    </div>
                    <div className={clsx(styles.account_address)}>
                        <div className={clsx(styles.account_address_list)}>
                            {addressUser.map((address) => (
                                <div
                                    className={clsx(
                                        styles.account_address_item
                                    )}
                                    key={address._id}
                                >
                                    <p
                                        className={clsx(
                                            styles.account_address_item_wrap
                                        )}
                                    >
                                        Full Name:{" "}
                                        <span>{address.fullName}</span>
                                    </p>
                                    <p
                                        className={clsx(
                                            styles.account_address_item_wrap
                                        )}
                                    >
                                        Address: <span>{address.province}</span>
                                    </p>
                                    <p
                                        className={clsx(
                                            styles.account_address_item_wrap
                                        )}
                                    >
                                        Phone Number:{" "}
                                        <span>{address.phoneNumber}</span>
                                    </p>
                                    <div
                                        className={clsx(
                                            styles.account_address_item_buttons
                                        )}
                                    >
                                        <button
                                            data-index={address._id}
                                            onClick={handleClickSetDefault}
                                            className={clsx(
                                                styles.account_address_item_btn,
                                                {
                                                    [styles.default]:
                                                        address.isDefault,
                                                }
                                            )}
                                        >
                                            Default
                                        </button>
                                        <NavLink
                                            className={clsx(
                                                styles.account_address_item_btn_edit
                                            )}
                                            to={`/the-bottle-haus/account/address/${address._id}`}
                                        >
                                            Edit
                                        </NavLink>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={clsx(styles.account_address_new)}>
                            <NavLink
                                className={clsx(
                                    styles.account_address_new_link
                                )}
                                to="/the-bottle-haus/account/address"
                            >
                                Create new shipping address
                            </NavLink>
                        </div>
                        {loadingSetDefault ? <></> : <Loading />}
                    </div>
                    <div className={clsx(styles.account_order_history)}>
                        <h1>Order History</h1>
                        {orderUser.length > 0 ? (
                            <ul
                                className={clsx(
                                    styles.account_order_history_list
                                )}
                            >
                                {orderUser.map((item) => {
                                    return <OrderProductItem item={item} />;
                                })}
                            </ul>
                        ) : (
                            <p
                                className={clsx(
                                    styles.account_order_history_notice
                                )}
                            >
                                You haven't placed any orders yet.
                            </p>
                        )}
                    </div>
                    <div className={clsx(styles.account_order_subTotal)}>
                        <p>
                            Total number of orders purchased:
                            <span>{orderProductLength()}</span>
                        </p>
                        <p>
                            Total amount spent: <span>{totalMoney()}</span>
                        </p>
                    </div>
                </div>
            </div>
            {loading ? <div></div> : <Loading />}
        </div>
    );
};

export default PageUserInfo;
