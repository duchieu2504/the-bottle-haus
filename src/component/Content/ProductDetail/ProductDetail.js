import clsx from "clsx";
import styles from "./ProductDetail.module.scss";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { buyProduct } from "redux/productsCart";
import "./ProductImg.css";
import convertPrice from "util/convertNumber";
import ProductReview from "./ProductReview";
import { Notice } from "util/NoticeOfPurchase/Notice";
import styleImageDetail from "./styleImage";
import { randomProduct } from "util/RandomProduct";
import { AuthContext } from "Context/AuthProvider";
import { getAddressesDefault } from "apiServices/addressServices";
import {
    getOrderUnpaid,
    postOrder,
    postOrderUnpaid,
} from "apiServices/orderServices";
import Loading from "util/Loading";
import ProductsRandom from "../ProductsRandom/ProductsRandom";
import { setLoading } from "redux/orderUnpaid";

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

    // hình ảnh sản phẩm

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

    //kiểm tra xem đã có sản phẩm trong cửa hàng chưa

    // lựa chọn kích thước sản phẩm
    const handleClickSize = (e) => {
        // const i = e.target.dataset.index;
        // setSizeIndex(i);
        // setQuanti(1);
        // setSizeText(e.target.innerHTML);
    };

    // sự kiện click vào mua hàng --kiểm tra xem đã có sản phẩm chưa -- sẽ hiện thông báo đã có sản phẩm
    const handleClickAddProduct = async () => {
        console.log(orderUnpaid);
        let isCheckIdCart = dataSession.find((item) => item.productId === _id);
        let isCheckIdCart1 = orderUnpaid.productIds.find(
            (item) => item.productId === _id
        );

        // nếu đã có trong giỏ hàng sẽ tạo thông báo
        const notice = () => {
            console.log(1);
            const time = setTimeout(function () {
                setActiveImageFake(false);
            }, 1000);
            setActiveImageFake(true);
            // return clearTimeout(time);
        };
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

                setTimeout(function () {
                    const notice_element =
                        document.querySelector("div .notice");
                    if (toastRef.current && notice_element)
                        toastRef.current.removeChild(notice_element);
                }, 3400);
                // a.onclick = function (e) {
                //     if (e.target.closest(".notice_close")) {
                //         toastRef.current.removeChild(a);
                //         clearTimeout(autoRemoveId);
                //     }
                // };
                toastRef.current.appendChild(Notice());

                const data = { productId: _id, quantily: quanti };
                await postOrderUnpaid(uid, data);
            }

            // lấy dữ liệu đơn hàng chưa thanh toán
            // const orderUnpaid = async () => {
            //     await dispatch(setLoading());
            //     const resultOrderUnpaid = await getOrderUnpaid(uid);

            //     if (resultOrderUnpaid) {
            //         const data = await [...resultOrderUnpaid.productIds]
            //             .reverse()
            //             .slice(0, 2);
            //         await setDataOrderUnipadShow(data);
            //     }

            //     // dispatch lên store orderUnpaid
            //     const actionGetOrder = await setItems(resultOrderUnpaid);
            //     await dispatch(actionGetOrder);
            //     // await setLoading(false);
            // };
            // orderUnpaid();
        } else {
            // TH người dùng chưa tạo tài khoản lưu sản phẩm chọn mua vào store redux
            if (!isCheckIdCart) {
                const dataProductLength = dataProdcutsCart.length;
                // xư lý hình ảnh chuyển động

                setTimeout(function () {
                    const notice_element =
                        document.querySelector("div .notice");
                    if (toastRef.current && notice_element)
                        toastRef.current.removeChild(notice_element);
                }, 3400);
                // a.onclick = function (e) {
                //     if (e.target.closest(".notice_close")) {
                //         toastRef.current.removeChild(a);
                //         clearTimeout(autoRemoveId);
                //     }
                // };
                toastRef.current.appendChild(Notice());

                setTimeout(function () {
                    setActiveImageFake(false);
                }, 1000);
                setActiveImageFake(true);
                // Lấy id của sản phẩm cuối cùng trong giỏ hàng
                // const idPro =
                //     dataProductLength > 0 &&
                //     dataProdcutsCart[dataProductLength - 1].id;
                // const idProduct = Number(idPro) + 1;

                // // Tạo mới 1 id cho sản phẩm cần mua bằng cách lấy id của sản phẩm cuối cùng trong giỏ hàng + 1.
                // // Khi đó, nếu xóa sản phẩm có id ở giữa array sản phẩm trong giỏ hàng và thêm 1 sản phẩm khác vào sẽ không bị trùng id
                // const idP = dataProductLength === 0 ? 0 : idProduct;
                // const productCart = {
                //     productId: _id,
                //     id: `${idP}`,
                //     quantily: `${quanti}`,
                //     // size: `${sizeText}`,
                // };
                // const action = buyProduct(productCart);
                // dispatch(action);

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
                                            <span
                                                className={clsx(
                                                    styles.product_rating_star
                                                )}
                                            ></span>
                                            <span
                                                className={clsx(
                                                    styles.product_rating_star
                                                )}
                                            ></span>
                                            <span
                                                className={clsx(
                                                    styles.product_rating_star
                                                )}
                                            ></span>
                                            <span
                                                className={clsx(
                                                    styles.product_rating_star
                                                )}
                                            ></span>
                                        </div>
                                        <div
                                            className={clsx(
                                                styles.product_rating_title
                                            )}
                                        >
                                            3 reviews
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
                <ProductReview />
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
                <div ref={toastRef} id={clsx(styles.notice)}>
                    {/* <Notice activeNotice={activeNotice} /> */}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
