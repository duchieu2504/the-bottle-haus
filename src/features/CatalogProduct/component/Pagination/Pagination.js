import clsx from "clsx";
import React from "react";
import styles from "./Pagination.module.scss";
// import PropTypes from 'prop-types';

Pagination.propTypes = {};

function Pagination({ numTotalPage, pageActive, setPageActive }) {
    const _page = [];
    const num = numTotalPage === 0 ? 1 : numTotalPage;
    for (let i = 1; i < num + 1; i++) {
        _page.push(i);
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    };
    // for (let i = 1; i < 5; i++) {
    //     console.log("random lần i", getRandomInt(10));
    // }

    const handlePrevClick = () => {
        setPageActive(pageActive - 1);
    };
    const handleNextClick = () => {
        setPageActive(pageActive + 1);
    };
    const handleClickButton = (e) => {
        setPageActive(Number(e.target.innerText));
    };

    return (
        <div className={clsx(styles.pagination)}>
            <button
                disabled={pageActive === 1}
                className={clsx(styles.button)}
                onClick={handlePrevClick}
            >
                <img
                    src="https://img.icons8.com/metro/26/ffffff/chevron-left.png"
                    alt="Next icon"
                />
            </button>
            {_page.map((i, k) => (
                <div
                    key={i}
                    className={clsx(styles.page, {
                        [styles.active]: pageActive === k + 1,
                    })}
                    onClick={handleClickButton}
                >
                    <p>{i}</p>
                </div>
            ))}

            <button
                disabled={pageActive === num}
                className={clsx(styles.button)}
                onClick={handleNextClick}
            >
                <img
                    src="https://img.icons8.com/metro/26/ffffff/chevron-right.png"
                    alt="Next icon"
                />
            </button>
        </div>
    );
}

export default Pagination;
