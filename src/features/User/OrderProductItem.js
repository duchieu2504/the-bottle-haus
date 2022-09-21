import clsx from "clsx";
import React, { useState } from "react";

import styles from "./PageUserInfo.module.scss";
import SvgIcon from "assets/svg";

import CartItem from "component/ItemCartShopping";

const OrderProductItem = ({ item }) => {
    const {
        billingAddress,
        code,
        email,
        fullName,
        phoneNumber,
        productIds,
        province,
        totalPrice,
    } = item;

    const [showAllOrder, setShowAllOrder] = useState(false);

    const handleClickShowAll = () => {
        setShowAllOrder(!showAllOrder);
    };
    return (
        <li
            className={clsx(styles.account_order_history_item, {
                [styles.active]: showAllOrder,
            })}
        >
            <div className={clsx(styles.account_order_history_item_product)}>
                <div className={clsx(styles.set_height)}>
                    {productIds.map((productId) => {
                        return (
                            <CartItem
                                key={productId.productId.productId}
                                item={productId}
                            />
                        );
                    })}
                </div>
                <div className={clsx(styles.account_total_price)}>
                    Total: $ {totalPrice}
                </div>
            </div>
            <div className={clsx(styles.account_order_history_item_address)}>
                <h3>Address</h3>
                <div className={clsx(styles.address_item)}>
                    <p className={clsx(styles.address_label)}>FullName :</p>
                    <p className={clsx(styles.address_title)}>{fullName}</p>
                </div>
                <div className={clsx(styles.address_item)}>
                    <p className={clsx(styles.address_label)}>Email :</p>
                    <p className={clsx(styles.address_title)}>{email}</p>
                </div>
                <div className={clsx(styles.address_item)}>
                    <p className={clsx(styles.address_label)}>Phone Number :</p>
                    <p className={clsx(styles.address_title)}>{phoneNumber}</p>
                </div>
                <div className={clsx(styles.address_item)}>
                    <p className={clsx(styles.address_label)}>Province :</p>
                    <p className={clsx(styles.address_title)}>{province}</p>
                </div>
                <div className={clsx(styles.address_item)}>
                    <p className={clsx(styles.address_label)}>
                        Billing Address :
                    </p>
                    <p className={clsx(styles.address_title)}>
                        {billingAddress}
                    </p>
                </div>
                <div className={clsx(styles.address_item)}>
                    <p className={clsx(styles.address_label)}>Order code :</p>
                    <p className={clsx(styles.address_title)}>{code}</p>
                </div>
            </div>
            <div className={clsx(styles.btn_down)} onClick={handleClickShowAll}>
                <img
                    className={clsx(styles.btn_down_icon)}
                    src={SvgIcon.DOUBLE_DOWN_ARROW}
                    alt="Icon down svg"
                />
            </div>
        </li>
    );
};

export default OrderProductItem;
