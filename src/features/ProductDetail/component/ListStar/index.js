import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./ListStar.module.scss";
import { StarSvg } from "../StarSvg";

const ListStar = ({ star }) => {
    const numberStar = [5, 4, 3, 2, 1];
    return (
        <div className={clsx(styles.star_rating_list)}>
            {numberStar.map((number) => {
                return (
                    <div
                        className={clsx(styles.star_rating_item, {
                            [styles.showStar]: +star >= number,
                        })}
                    >
                        <StarSvg />
                    </div>
                );
            })}
        </div>
    );
};

ListStar.propTypes = {
    star: PropTypes.number,
};
ListStar.defaultProps = { star: 0 };

export default ListStar;
