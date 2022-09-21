import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "aos/dist/aos.css";

import styles from "./ProductCard.module.scss";

import { removeVN, convertPrice } from "util/Func";

const ProductCard = ({ item, itemRef, index }) => {
    const { _id, price, title, category, image } = item;
    const num = Number(index) % 4 || 0;
    const url = removeVN(category);

    return (
        <div
            key={_id}
            data-aos="fade-up"
            ref={itemRef}
            data-aos-delay={(num + 1) * 50}
            className={clsx(styles.product_card)}
        >
            <NavLink
                className={clsx(styles.product_link)}
                to={`/the-bottle-haus/${url}/${_id}`}
            >
                <div className={clsx(styles.product_card_img)}>
                    <div
                        className={clsx(styles.img)}
                        style={{ backgroundImage: `url(${image})` }}
                    >
                        {/* <img src={img} alt={title} /> */}
                    </div>
                </div>
                <h4 className={clsx(styles.title)}>{title}</h4>
                <h5 className={clsx(styles.price)}>${convertPrice(price)}</h5>
            </NavLink>
        </div>
    );
};

ProductCard.propTypes = {
    item: PropTypes.object,
    itemRef: PropTypes.object,
    col: PropTypes.string,
};
ProductCard.defaultProps = {
    item: {},
    itemRef: null,
    col: "",
};

export default ProductCard;
