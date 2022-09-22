import React, { useContext, useRef, useState, useEffect } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import styles from "./ProductReview.module.scss";

import { AuthContext } from "dataLocal/Context/AuthProvider";
import { showPageLogin } from "dataLocal/redux/Login";

import {
    getReviewFeatures,
    getReviewProductUser,
    postReviewRequest,
    putReviewProduct,
} from "connectApi/apiServices/reviewServices";
import { getAllOrder } from "connectApi/apiServices/orderServices";

import { NoticeNoOrderProducts } from "component/NoticeOfPurchase/Notice";
import Loading from "component/Loading";

import FormReview from "../FormReview";
import ListStar from "../ListStar";

import Pagination from "features/ProductDetail/Pagination";
import { StarSvg } from "features/ProductDetail/component/StarSvg";
import ItemReview from "../ItemReveiw";

const ProductReview = ({ productId, parameterReviews }) => {
    const dispatch = useDispatch();
    const [errorStar, setErrorStar] = useState(false);
    const [activeWriteRevew, setActiveWriteRevew] = useState(false);
    const [yourReviewProduct, setYourReviewProduct] = useState(null);
    const [reviewFeature, setReviewFeature] = useState([]);
    const [loadingFormReview, setLoadingFormReview] = useState(false);
    const [loadingReviewFeature, setLoadingReviewFeature] = useState(false);
    const [loadingPaginationReviews, setLoadingPaginationReviews] =
        useState(false);
    const [activeShowPagination, setActiveShowPagination] = useState(false);

    const {
        user: { uid },
    } = useContext(AuthContext);
    const activeLogin = useSelector((state) => state.activeLogin.activeLogin);

    const toastRef = useRef();

    // thông số đánh giá san pham
    const { totalReviews, parameter } = parameterReviews;
    // du lieu danh gia san pham
    useEffect(() => {
        const getReviewUser = async () => {
            const res = await getReviewProductUser(productId, uid);
            if (res.length > 0) {
                const { comment, createdAt, displayName, star, title } = res[0];

                // set đánh giá sao

                const inputStar = document.querySelector(
                    `input[type="radio"][value="${star}"]`
                );
                inputStar.setAttribute("checked", "");
                await setYourReviewProduct({
                    comment,
                    createdAt,
                    displayName,
                    star,
                    title,
                });

                return;
            } else {
                setYourReviewProduct(null);
            }
        };
        getReviewUser();

        // danh sách đánh giá nổi bật

        const getReviewFeature = async () => {
            // await setLoading(true);

            const res = await getReviewFeatures(productId);
            if (res.length > 0) {
                await setReviewFeature(res);
                // await setLoading(true);
            }
        };
        getReviewFeature();
    }, [productId]);

    const handleClickWriteReview = async () => {
        if (uid) {
            await setLoadingFormReview(true);
            const getAll = await getAllOrder(uid);

            const isCheckProductId = getAll.find((item) => {
                return item.productIds.find((i) => i.productId === productId);
            });

            if (isCheckProductId) {
                // nếu từng mua sản phẩm
                await setActiveWriteRevew(true);
            } else {
                // chưa tưng mua sản phẩm

                setTimeout(function () {
                    const notice_element =
                        document.querySelector("div .notice");
                    if (toastRef.current && notice_element)
                        toastRef.current.removeChild(notice_element);
                }, 3400);

                toastRef.current.appendChild(NoticeNoOrderProducts(0));
            }
            await setLoadingFormReview(false);

            return;
        } else {
            //  chưa đăng nhập
            const action = showPageLogin(activeLogin);
            dispatch(action);
            return;
        }
    };
    const handleSubmitReview = async (values) => {
        const starChecked = document.querySelector(
            'input[type="radio"]:checked'
        );
        if (starChecked) {
            setErrorStar(false);
            if (yourReviewProduct) {
                // nếu sản phẩm đã đánh giá thì hiển thị cập nhật đánh giá
                const reviewUpdate = {
                    ...values,
                    star: starChecked.value,
                };
                await putReviewProduct(productId, uid, reviewUpdate);
                await setTimeout(function () {
                    const notice_element =
                        document.querySelector("div .notice");
                    if (toastRef.current && notice_element)
                        toastRef.current.removeChild(notice_element);
                }, 3400);
                await toastRef.current.appendChild(NoticeNoOrderProducts(2));
                return;
            } else {
                // chưa có đáh giá
                const reviews = {
                    ...values,
                    uid: uid,
                    star: starChecked.value,
                };
                await postReviewRequest(productId, reviews);
                await setTimeout(function () {
                    const notice_element =
                        document.querySelector("div .notice");
                    if (toastRef.current && notice_element)
                        toastRef.current.removeChild(notice_element);
                }, 3400);
                await toastRef.current.appendChild(NoticeNoOrderProducts(1));
                return;
            }
        } else {
            setErrorStar(true);
            return;
        }
    };

    const handleClickCancelWriteReview = () => {
        setActiveWriteRevew(false);
    };
    const handleChangeStar = () => {
        setErrorStar(false);
    };

    const handleClickShowAllReviews = () => {
        setActiveShowPagination(true);
        setLoadingPaginationReviews(true);
    };

    return (
        <div className={clsx(styles.product_reviews)}>
            <div className={clsx(styles.product_reviews_title)}>
                <h1>What our customer</h1>
                <p>Are Saying</p>
            </div>
            {parameterReviews.totalReviews > 0 ? (
                <div
                    className={clsx(styles.product_reviews_customers, {
                        [styles.showPagination]: activeShowPagination === true,
                    })}
                >
                    <div
                        className={clsx(
                            styles.product_reviews_customers_features
                        )}
                    >
                        <div className="row justify-center">
                            {reviewFeature.map((review) => {
                                return (
                                    <div className="col l-4">
                                        <ItemReview review={review} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div
                        className={clsx(
                            styles.product_reviews_customers_pagination
                        )}
                    >
                        <Pagination
                            setLoadingPaginationReviews={
                                setLoadingPaginationReviews
                            }
                            loadingPaginationReviews={loadingPaginationReviews}
                            productId={productId}
                        />
                    </div>
                    <button
                        type="submit"
                        className={clsx(
                            styles.product_reviews_customers_show_all
                        )}
                        onClick={handleClickShowAllReviews}
                    >
                        All Reviews
                    </button>
                </div>
            ) : (
                <div className={clsx(styles.product_reviews_customers_no)}>
                    <span>There are no product reviews yet</span>
                </div>
            )}

            <div
                className={clsx(styles.product_reviews_graph)}
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="700"
            >
                <div className={clsx(styles.product_reviews_graph_text)}>
                    <h2> Customer Reviews</h2>
                    <div
                        className={clsx(
                            styles.product_reviews_graph_text_summary
                        )}
                    >
                        Based on {totalReviews || 0} reviews
                    </div>
                </div>
                <div className={clsx(styles.customers_reviews_histogram_list)}>
                    {parameter?.map((para) => {
                        const average =
                            para.amount === 0
                                ? 0
                                : ((para.amount * 100) / totalReviews).toFixed(
                                      2
                                  );
                        return (
                            <div
                                className={clsx(
                                    styles.customers_reviews_histogram_item
                                )}
                            >
                                <div
                                    className={clsx(
                                        styles.customers_reviews_histogram_star
                                    )}
                                >
                                    <ListStar star={para.star} />
                                </div>
                                <div
                                    className={clsx(
                                        styles.customers_reviews_histogram_bar
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            styles.customers_reviews_histogram_bar_content
                                        )}
                                        style={{ width: `${average}%` }}
                                    ></div>
                                </div>
                                <h5
                                    className={clsx(
                                        styles.customers_reviews_histogram_percentage
                                    )}
                                >
                                    {average}%
                                </h5>
                                <span
                                    className={clsx(
                                        styles.customers_reviews_histogram_frequency
                                    )}
                                >
                                    ({para.amount})
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div className={clsx(styles.widget_actions_wrapper)}>
                    {!activeWriteRevew ? (
                        <button
                            type="button"
                            className={clsx(styles.widget_actions_wrapper_btn, {
                                [styles.have_evaluated]: yourReviewProduct,
                            })}
                            onClick={handleClickWriteReview}
                        >
                            {yourReviewProduct
                                ? "Your review"
                                : "Write a review"}
                        </button>
                    ) : (
                        <button
                            type="button"
                            className={clsx(styles.widget_actions_wrapper_btn, {
                                [styles.have_evaluated]: yourReviewProduct,
                            })}
                            onClick={handleClickCancelWriteReview}
                        >
                            Cancel review
                        </button>
                    )}
                </div>
            </div>

            {/* BAng đánh giá sản phẩm */}

            <div
                className={clsx(styles.product_reviews_write, {
                    [styles.active]: activeWriteRevew,
                })}
            >
                <h3> ratings</h3>
                <div
                    className={clsx(styles.product_reviews_write_star)}
                    onChange={handleChangeStar}
                >
                    <input id="radio5" type="radio" name="star" value="5" />
                    <label for="radio5">
                        <StarSvg />
                    </label>
                    <input id="radio4" type="radio" name="star" value="4" />
                    <label for="radio4">
                        <StarSvg />
                    </label>
                    <input id="radio3" type="radio" name="star" value="3" />
                    <label for="radio3">
                        <StarSvg />
                    </label>
                    <input id="radio2" type="radio" name="star" value="2" />
                    <label for="radio2">
                        <StarSvg />
                    </label>
                    <input id="radio1" type="radio" name="star" value="1" />
                    <label for="radio1">
                        <StarSvg />
                    </label>
                    {errorStar ? (
                        <span className={clsx(styles.form_message)}>
                            This field is required
                        </span>
                    ) : (
                        <></>
                    )}
                </div>

                {loadingFormReview ? (
                    <Loading />
                ) : (
                    <FormReview
                        yourReview={yourReviewProduct}
                        handleSubmit={handleSubmitReview}
                    />
                )}
            </div>
            <div ref={toastRef} id={clsx(styles.notice_no_product)}></div>
        </div>
    );
};

ProductReview.propTypes = {};

export default ProductReview;
