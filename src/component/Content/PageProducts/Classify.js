import clsx from "clsx";
import React from "react";
import styles from "./Products.module.scss";

const Classify = ({ i, k, index, filterItemRef, handleClickClassify }) => {
    const timeDelay = (k + 7) * 50;
    return (
        <div
            key={k}
            data-index={k}
            data-aos="fade-down-right"
            data-aos-delay={timeDelay}
            className={clsx(
                styles.filter_item,
                {
                    "aos-init": +k === +index,
                    "aos-animate": +k === +index,
                },
                {
                    [styles.active]: +k === +index,
                }
            )}
            ref={filterItemRef}
            onClick={handleClickClassify}
        >
            <p className={clsx(styles.filter_item_label)}>
                {/* {title.charAt(0).toLocaleUpperCase() + title.slice(1)} */}
            </p>
            {/* <img
                src={img[k]}
                className={clsx(styles.filter_item_img)}
                alt={i}
            /> */}
        </div>
    );
};

export default Classify;
