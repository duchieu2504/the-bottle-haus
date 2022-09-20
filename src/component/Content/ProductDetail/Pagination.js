import { getAllReviewProduct } from "apiServices/reviewServices";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import SvgIcon from "svg";
import Loading from "util/Loading";
import ItemReview from "./ItemReview";
import styles from "./ProductReview.module.scss";

const Pagination = ({
    productId,
    setLoadingPaginationReviews,
    loadingPaginationReviews,
}) => {
    const [pagination, setPagination] = useState({
        _page: 1,
        _limit: 3,
        totalReviews: 1,
    });
    const [filter, setFilter] = useState({
        _page: 1,
        _limit: 3,
    });
    const [dataReviews, setDataReviews] = useState([]);
    const [pageArray, setPageArray] = useState([]);
    const [loading, setLoading] = useState(false);

    const btnPaginationRef = useRef();
    const reviewItemStarRef = useRef();

    const { totalReviews } = pagination;
    const { _page, _limit } = filter;
    const pageTotal = Math.ceil(totalReviews / _limit);

    const [getWidth, setGetWidth] = useState(0);
    const [translate, setTranslate] = useState(0);

    useEffect(() => {
        if (btnPaginationRef.current) {
            const width = btnPaginationRef.current.clientWidth;
            setGetWidth(width + 16);
        }
    }, [loadingPaginationReviews]);

    // const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    useEffect(() => {
        const getAllReview = async () => {
            await setLoading(true);
            const result = await getAllReviewProduct(productId, _page, _limit);
            if (result) {
                await setPagination(result.pagination);
                await setDataReviews(result.data);
                await setLoading(false);
                await setLoadingPaginationReviews(false);
                return;
            }
        };
        getAllReview();
    }, [filter, loadingPaginationReviews]);

    useEffect(() => {
        let result = [];
        for (let i = 1; i <= pageTotal; i++) {
            result.push(i);
        }
        setPageArray(result);
    }, [pageTotal]);

    const handleClickPrevPageReview = () => {
        setFilter({ ...filter, _page: _page - 1 });

        if (_page >= 2 && _page <= pageTotal - 2) {
            setTranslate(getWidth * (_page - 4));
            return;
        }
    };

    const handleClickNextPageReview = () => {
        setFilter({ ...filter, _page: _page + 1 });

        if (_page + 1 >= 4 && _page <= pageTotal - 3) {
            setTranslate(getWidth * (_page - 2));

            return;
        }
    };

    const handleClickNumPagi = (e) => {
        setFilter({ ...filter, _page: +e.target.innerText });

        if (+e.target.innerText >= pageTotal - 2) {
            setTranslate(getWidth * (_page - 2));

            return;
        }
        if (+e.target.innerText <= 3) {
            setTranslate(0);
            return;
        }
        setTranslate(getWidth * (+e.target.innerText - 3));
    };

    // DOule Click
    const handleClickDoulePrevPageReview = () => {
        setFilter({ ...filter, _page: 1 });
        setTranslate(0);
    };
    const handleClickDouleNextPageReview = () => {
        setFilter({ ...filter, _page: pageTotal });
        setTranslate(getWidth * (pageTotal - 5));
    };

    return (
        <div>
            {loadingPaginationReviews ? (
                <Loading />
            ) : (
                <div className={clsx(styles.product_reviews_customers_all)}>
                    <ul className={clsx(styles.product_reviews_customers_list)}>
                        {dataReviews.map((review) => {
                            return <ItemReview review={review} />;
                        })}
                    </ul>
                    {loading ? <Loading /> : <></>}
                    <div
                        className={clsx(
                            styles.product_reviews_customers_pagination_buttons
                        )}
                    >
                        <button
                            type="button"
                            className={clsx(
                                styles.product_reviews_customers_pagination_btn,
                                styles.btn_bold
                            )}
                            onClick={handleClickDoulePrevPageReview}
                            disabled={_page <= 3}
                        >
                            <img
                                src={SvgIcon.LEFT_DOULE_ARROW}
                                alt="Left Arrow"
                            />
                        </button>
                        <button
                            type="button"
                            className={clsx(
                                styles.product_reviews_customers_pagination_btn,
                                styles.btn_bold
                            )}
                            onClick={handleClickPrevPageReview}
                            disabled={_page <= 1}
                        >
                            <img src={SvgIcon.LEFTARROW} alt="Left Arrow" />
                        </button>

                        <div
                            className={clsx(
                                styles.product_reviews_customers_pagination_buttons_number
                            )}
                            style={{ maxWidth: `${getWidth * 5}px` }}
                        >
                            <div
                                className={
                                    styles.product_reviews_customers_pagination_buttons_slider
                                }
                                style={{
                                    width: getWidth * pageArray.length,
                                    transform: `translate(-${translate}px, 0)`,
                                    transition: "transform 0.5s ease-in-out",
                                }}
                            >
                                {pageArray.length > 0 &&
                                    pageArray.map((number) => (
                                        <button
                                            type="button"
                                            className={clsx(
                                                styles.product_reviews_customers_pagination_btn,
                                                {
                                                    [styles.active]:
                                                        _page === number,
                                                }
                                            )}
                                            onClick={handleClickNumPagi}
                                            ref={btnPaginationRef}
                                        >
                                            {number}
                                        </button>
                                    ))}
                            </div>
                        </div>

                        <button
                            type="button"
                            className={clsx(
                                styles.product_reviews_customers_pagination_btn,
                                styles.btn_bold
                            )}
                            disabled={_page >= pageTotal}
                            onClick={handleClickNextPageReview}
                        >
                            <img src={SvgIcon.RIGHTARROW} alt="RIght ARROW" />
                        </button>
                        <button
                            type="button"
                            className={clsx(
                                styles.product_reviews_customers_pagination_btn,
                                styles.btn_bold
                            )}
                            disabled={_page >= pageTotal - 2}
                            onClick={handleClickDouleNextPageReview}
                        >
                            <img
                                src={SvgIcon.RIGHT_DOULE_ARROW}
                                alt="RIght ARROW"
                            />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pagination;
