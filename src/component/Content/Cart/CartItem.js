import React from 'react';
// import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Cart.module.scss'
import convertPrice from 'util/convertNumber';

CartItem.propTypes = {
    
};

function CartItem({ item }) {
    const { img, price, title } = item;
    return (
        <div className={clsx(styles.cart_item)}>
            <img 
                src={img}
                alt='img' 
                className={clsx(styles.cart_item_img)}
            />
            <div className={clsx(styles.cart_item_content)}>
                <p className={clsx(styles.cart_item_price)}>
                    {convertPrice(price)}
                    {/* <span> x 2</span> */}
                </p>
                <p className={clsx(styles.cart_item_title)}>
                    {title}
                </p>
            </div>
        </div>
    );
}

export default CartItem;