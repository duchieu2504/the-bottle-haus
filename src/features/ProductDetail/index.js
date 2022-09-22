import React, { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./ProductDetail.module.scss";
import "./ProductImg.css";
import styleImageDetail from "./styleImage";

import { Notice } from "component/NoticeOfPurchase/Notice";
import Loading from "component/Loading";
import ProductReview from "./component/ReviewProduct";
import ProductsRandom from "component/ProductsRandom";
import ListStar from "./component/ListStar";

import { setItems, setLoading } from "dataLocal/redux/orderUnpaid";
import { AuthContext } from "dataLocal/Context/AuthProvider";

import {
    getOrderUnpaid,
    postOrderUnpaid,
} from "connectApi/apiServices/orderServices";
import { getReviewParameter } from "connectApi/apiServices/reviewServices";

import { convertPrice } from "util/Func";

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const toastRef = useRef();
    const productImgRef = useRef();

    // Lấy tất cả dữ liệu sản phẩm
    const data = useSelector((state) => state.products.items);
    const loading = useSelector((state) => state.products.loading);
    const dataProdcuts = [...data];

    //dữ liệu chi tiết sản phẩm đang hiện thị
    const product = dataProdcuts.find((item) => item._id === productId) || {};
    const { descriptions, category, price, title, _id, image } = product;

    // Lấy tất cả dữ liệu sản phẩm đã có trong cửa hàng
    const orderUnpaid = useSelector((state) => state.orderUnpaid.items) || {};
    const dataSession = JSON.parse(sessionStorage.getItem("productIds")) || [];

    const dataProdcutsCart = useSelector((state) => state.productsCart);
    const [quanti, setQuanti] = useState(1);
    const [sizeIndex, setSizeIndex] = useState(0);

    // div product description
    const [activeMore, setActiveMore] = useState(true);

    // thông số đánh giá san pham
    const [parameterReviews, setParameterReviews] = useState({});

    // aactiveImageFake
    const [activeImageFake, setActiveImageFake] = useState(false);

    // lưu địa chỉ mặc định
    // const [addressDefault, setAddressDefault] = useState("");

    const {
        user: { uid },
    } = useContext(AuthContext);
    // Tạo chuyển động của hình ảnh khi khách hàng bấm vào thẻ 'thêm hàng'
    const [animation, setAnimation] = useState({
        transform: "translate(897px, -250px) scale(0.1)",
        opacity: 0.5,
        zIndex: 11,
        visibility: "hidden",
    });

    // Cuộn chuột sẽ thay đối chiều cao tạo chuyển động hình ảnh khi click vào 'thêm hàng'
    useEffect(() => {
        const handleScroll = () => {
            const height = window.scrollY;
            const newHeight = -250 + height;
            setAnimation({
                transform: `translate(897px, ${newHeight}px) scale(0.1)`,
                opacity: 0.5,
                zIndex: 11,
                visibility: "hidden",
            });
        };
        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);
    }, []);

    // lấy thông số các đánh giá san pham
    useEffect(() => {
        const getParameter = async () => {
            const result = await getReviewParameter(productId);
            await setParameterReviews(result);
        };
        getParameter();
    }, []);
    //kiểm tra xem đã có sản phẩm trong cửa hàng chưa

    // lựa chọn kích thước sản phẩm
    const handleClickSize = (e) => {
        // const i = e.target.dataset.index;
        // setSizeIndex(i);
        // setQuanti(1);
        // setSizeText(e.target.innerHTML);
    };

    // sự kiện click vào mua hàng --kiểm tra xem đã có sản phẩm chưa -- sẽ hiện thông báo đã có sản phẩm
    let isCheckIdCart = dataSession.find((item) => item.productId === _id);
    let isCheckIdCart1 =
        orderUnpaid.productIds?.find((item) => item.productId === _id) || false;
    const handleClickAddProduct = async () => {
        // nếu đã có trong giỏ hàng sẽ tạo thông báo

        //action add product in cart
        if (uid) {
            // TH người dùng đã có tài khoản thì lưu trên database
            if (!isCheckIdCart1) {
                // xư lý hình ảnh chuyển động

                setTimeout(function () {
                    setActiveImageFake(false);
                }, 1000);
                setActiveImageFake(true);
                // notice();

                const data = { productId: _id, quantily: quanti };
                await postOrderUnpaid(uid, data);
            } else {
                setTimeout(function () {
                    const notice_element =
                        document.querySelector("div .notice");
                    if (toastRef.current && notice_element)
                        toastRef.current.removeChild(notice_element);
                }, 3400);

                toastRef.current.appendChild(Notice());
            }

            const orderUnpaid = async () => {
                await dispatch(setLoading());
                const resultOrderUnpaid = await getOrderUnpaid(uid);

                // dispatch lên store orderUnpaid
                const actionGetOrder = await setItems(resultOrderUnpaid);
                await dispatch(actionGetOrder);
                // await setLoading(false);
            };
            orderUnpaid();
        } else {
            // TH người dùng chưa tạo tài khoản lưu sản phẩm chọn mua vào store redux
            if (!isCheckIdCart) {
                const dataProductLength = dataProdcutsCart.length;
                // xư lý hình ảnh chuyển động

                setTimeout(function () {
                    setActiveImageFake(false);
                }, 1000);
                setActiveImageFake(true);

                // lưu vào sessionStorage
                if (typeof Storage !== "undefined") {
                    const productIds = JSON.parse(
                        sessionStorage.getItem("productIds")
                    );
                    const total = JSON.parse(sessionStorage.getItem("total"));

                    // thêm san phâm
                    if (productIds !== null) {
                        const product = [...productIds];
                        product.push({
                            productId: _id,
                            quantily: `${quanti}`,
                        });
                        sessionStorage.setItem(
                            "productIds",
                            JSON.stringify(product)
                        );
                    } else {
                        sessionStorage.setItem(
                            "productIds",
                            JSON.stringify([
                                {
                                    productId: _id,
                                    quantily: `${quanti}`,
                                },
                            ])
                        );
                    }

                    // tông money
                    if (total !== null) {
                        sessionStorage.setItem(
                            "total",
                            JSON.stringify(
                                `${Number(price) * quanti + Number(total)}`
                            )
                        );
                    } else {
                        sessionStorage.setItem(
                            "total",
                            JSON.stringify(`${Number(price) * quanti}`)
                        );
                    }
                } else {
                    alert(
                        "Trình duyệt của bạn đã quá cũ. Hãy nâng cấp trình duyệt ngay!"
                    );
                }
                return;
            } else {
                setTimeout(function () {
                    const notice_element =
                        document.querySelector("div .notice");
                    if (toastRef.current && notice_element)
                        toastRef.current.removeChild(notice_element);
                }, 3400);

                toastRef.current.appendChild(Notice());
            }
        }
    };

    return (
        <div className={clsx(styles.product_detail)}>
            <div className="grid wide">
                {loading ? (
                    <Loading />
                ) : (
                    <div className={clsx(styles.product_briefing)}>
                        <div className="row">
                            <div
                                ref={productImgRef}
                                className={clsx(styles.product_img, "col l-6")}
                            >
                                <img
                                    className={clsx(styles.img)}
                                    src={image}
                                    alt={title}
                                />
                                <div
                                    className={clsx(styles.product_img_fake, {
                                        [styles.active]: activeImageFake,
                                    })}
                                    style={styleImageDetail()}
                                >
                                    <img
                                        className={clsx(styles.img_fake)}
                                        src={image}
                                        alt={title}
                                    />
                                </div>
                            </div>
                            <div
                                data-aos="fade-left"
                                data-aos-duration="0.3"
                                className="col l-6"
                            >
                                <div className={styles.product_content}>
                                    <div
                                        className={clsx(styles.product_header)}
                                    >
                                        <h2>
                                            {category &&
                                                category
                                                    .charAt(0)
                                                    .toLocaleUpperCase() +
                                                    category.slice(1)}
                                        </h2>
                                        <h3>{title}</h3>
                                    </div>
                                    <div
                                        className={clsx(
                                            styles.product_price_quantity
                                        )}
                                    >
                                        <div
                                            className={clsx(
                                                styles.product_quantity
                                            )}
                                        >
                                            <button
                                                className={clsx(styles.btn)}
                                                disabled={quanti <= 1}
                                                onClick={() =>
                                                    setQuanti(quanti - 1)
                                                }
                                            >
                                                -
                                            </button>
                                            <span>{quanti}</span>
                                            <button
                                                className={clsx(styles.btn)}
                                                onClick={() =>
                                                    setQuanti(quanti + 1)
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                        <h3>${convertPrice(price)}</h3>
                                    </div>

                                    <div className={clsx(styles.product_size)}>
                                        <h1
                                            className={clsx(
                                                styles.product_size_heading
                                            )}
                                        >
                                            Kích thước:
                                        </h1>
                                        {/* {size.map((i, k) => {
                                        return (
                                            <div
                                                key={k}
                                                className={clsx(
                                                    styles.size_item,
                                                    {
                                                        [styles.active]:
                                                            Number(
                                                                sizeIndex
                                                            ) === Number(k),
                                                    }
                                                )}
                                                data-index={k}
                                                onClick={handleClickSize}
                                            >
                                                {i}
                                            </div>
                                        );
                                    })} */}
                                    </div>

                                    <div
                                        className={clsx(styles.product_rating)}
                                    >
                                        <div
                                            className={clsx(
                                                styles.product_rating_list_start
                                            )}
                                        >
                                            <ListStar
                                                star={Math.ceil(
                                                    parameterReviews.average_rating
                                                )}
                                            />
                                        </div>
                                        <div
                                            className={clsx(
                                                styles.product_rating_title
                                            )}
                                        >
                                            {parameterReviews?.totalReviews ||
                                                0}
                                            reviews
                                        </div>
                                    </div>

                                    <div
                                        className={clsx(styles.product_des, {
                                            [styles.show_content]: !activeMore,
                                        })}
                                    >
                                        <p
                                            className={clsx(styles.text, {
                                                [styles.show_content]:
                                                    activeMore,
                                            })}
                                        >
                                            {descriptions}
                                        </p>
                                        {activeMore ? (
                                            <span
                                                onClick={() =>
                                                    setActiveMore(false)
                                                }
                                            >
                                                More Learn
                                            </span>
                                        ) : (
                                            <span
                                                onClick={() =>
                                                    setActiveMore(true)
                                                }
                                            >
                                                Less Learn
                                            </span>
                                        )}
                                    </div>
                                    <div
                                        className={clsx(styles.product_footer)}
                                    >
                                        <div
                                            className={clsx(styles.product_btn)}
                                        >
                                            <div
                                                className={clsx(
                                                    styles.btn_show_all,
                                                    styles.btn_show_all_color
                                                )}
                                                onClick={handleClickAddProduct}
                                            >
                                                <div
                                                    className={clsx(
                                                        styles.btn_show_all_link
                                                    )}
                                                >
                                                    <img
                                                        src="https://img.icons8.com/windows/32/ffffff/shopping-cart.png"
                                                        alt="Cart"
                                                    />
                                                    <p>Add to cart</p>
                                                </div>
                                            </div>

                                            <button
                                                className={clsx(
                                                    styles.btn_add_gift
                                                )}
                                            >
                                                Add a Personalized Gift Note
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <ProductReview
                    productId={_id}
                    parameterReviews={parameterReviews}
                />
                <div className={clsx(styles.recommendation)}>
                    <div className={clsx(styles.recommendation_header)}>
                        <div className={clsx(styles.recommendation_text)}>
                            <div className={clsx(styles.text_fill)}>
                                Similar
                            </div>
                            <div className={clsx(styles.text_stroke)}>
                                Products
                            </div>
                        </div>
                    </div>

                    <div className={clsx(styles.recommendation_products_list)}>
                        <ProductsRandom />
                    </div>
                </div>
                <div ref={toastRef} id={clsx(styles.notice)}></div>
            </div>
        </div>
    );
};

export default ProductDetail;
