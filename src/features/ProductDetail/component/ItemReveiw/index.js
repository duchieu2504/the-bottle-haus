import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import styles from "./ItemReview.module.scss";
import ListStar from "../ListStar";

const ItemReview = ({ review }) => {
    const { comment, displayName, star, title, createdAt, updatedAt } = review;
    const date = new Date(updatedAt || createdAt);
    return (
        <div
            className={clsx(styles.customers_reviews_item)}
            data-aos="fade-left"
            data-aos-delay="50"
        >
            <div className={clsx(styles.customers_reviews_item_star)}>
                <ListStar star={star} />
            </div>
            <span className={clsx(styles.customers_reviews_item_verified)}>
                Verified
            </span>
            <h1>{title}</h1>
            <p>{comment}</p>
            <h2 className={clsx(styles.customers_reviews_item_name)}>
                {displayName}
            </h2>
            <span className={clsx(styles.customers_reviews_item_date)}>
                {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
            </span>
        </div>
    );
};

ListStar.propTypes = {
    review: PropTypes.object,
};
ListStar.defaultProps = { review: {} };

export default ItemReview;
