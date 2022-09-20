import clsx from "clsx";
import React from "react";
import { StarSvg } from "../StarSvg";
import styles from "./ItemReview.module.scss";

export const ListStar = ({ star }) => {
    const numberStar = [5, 4, 3, 2, 1];
    return (
        <div className={clsx(styles.customers_reviews_item_rating)}>
            {numberStar.map((number) => {
                return (
                    <div
                        className={clsx(
                            styles.customers_reviews_item_rating_star,
                            {
                                [styles.showStar]: +star >= number,
                            }
                        )}
                    >
                        <StarSvg />
                    </div>
                );
            })}
        </div>
    );
};

const ItemReview = ({ review }) => {
    const { comment, displayName, star, title, createdAt, updatedAt } = review;
    const date = new Date(updatedAt || createdAt);
    return (
        <div
            className={clsx(styles.customers_reviews_item)}
            data-aos="fade-left"
            data-aos-delay="50"
        >
            <ListStar star={star} />
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

export default ItemReview;
