import clsx from "clsx";
import styles from "./ProductDetail.module.scss";
import React, { useEffect, useRef, useState } from "react";
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

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const toastRef = useRef();
    const productImgRef = useRef();

    // Lấy tất cả dữ liệu sản phẩm
    const data = useSelector((state) => state.products);
    const dataProdcuts = [...data];

    //dữ liệu chi tiết sản phẩm đang hiện thị
    const product = dataProdcuts.find((item) => item.id === Number(productId));
    const { img, description, price, category, title, id } = product;

    // Lấy tất cả dữ liệu sản phẩm đã có trong cửa hàng
    const dataProdcutsCart = useSelector((state) => state.productsCart);
    const [quanti, setQuanti] = useState(1);
    const [sizeIndex, setSizeIndex] = useState(0);
    // const [sizeText, setSizeText] = useState(size[0]);

    // div product description
    const desProductRef = useRef();
    const textDesProductRef = useRef();
    const [activeMore, setActiveMore] = useState(true);

    //dataSimilarProducts
    const [dataSimilarProducts, setDataSimilarProducts] = useState([]);

    // aactiveImageFake
    const [activeImageFake, setActiveImageFake] = useState(false);
    // Tạo chuyển động của hình ảnh khi khách hàng bấm vào thẻ 'thêm hàng'
    const [animation, setAnimation] = useState({
        transform: "translate(897px, -250px) scale(0.1)",
        opacity: 0.5,
        zIndex: 11,
        visibility: "hidden",
    });

    // Cuộn chuột sẽ thay đối chiều cao tạo chuyển động hình ảnh khi click vào 'thêm hàng'
    useEffect(() => {
        // const b = document.createElement('div')
        // b.classList.add('product_img')
        // b.innerHTML = `
        //     <img class=${clsx(styles.img)} src='${img}' alt='${description}' />
        // `
        // if(typeof productImgRef.current === 'object') {
        //     productImgRef.current.appendChild(b)
        // }

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
    let isCheckIdCart = dataProdcutsCart.find((item) => item.id_product === id);

    // lựa chọn kích thước sản phẩm
    const handleClickSize = (e) => {
        // const i = e.target.dataset.index;
        // setSizeIndex(i);
        // setQuanti(1);
        // setSizeText(e.target.innerHTML);
    };

    // sự kiện click vào mua hàng --kiểm tra xem đã có sản phẩm chưa -- sẽ hiện thông báo đã có sản phẩm
    const handleClickAddProduct = () => {
        if (typeof toastRef.current === "object" && isCheckIdCart) {
            setTimeout(function () {
                const notice_element = document.querySelector("div .notice");
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
        }

        // Sự kiện khi click vào thêm vào giỏ hàng sẽ có hình ảnh sản phẩm chuyển động

        if (typeof productImgRef.current === "object" && !isCheckIdCart) {
            setTimeout(() => {
                const check =
                    productImgRef.current.querySelector(".product_img_fake");
            }, 500);
        }

        if (typeof productImgRef.current === "object" && !isCheckIdCart) {
            setTimeout(function () {
                setActiveImageFake(false);
            }, 1000);
            setActiveImageFake(true);
        }

        //action add product in cart
        if (!isCheckIdCart) {
            //
            const dataProductLength = dataProdcutsCart.length;

            // Lấy id của sản phẩm cuối cùng trong giỏ hàng
            const idPro =
                dataProductLength > 0 &&
                dataProdcutsCart[dataProductLength - 1].id;
            const idProduct = Number(idPro) + 1;

            // Tạo mới 1 id cho sản phẩm cần mua bằng cách lấy id của sản phẩm cuối cùng trong giỏ hàng + 1.
            // Khi đó, nếu xóa sản phẩm có id ở giữa array sản phẩm trong giỏ hàng và thêm 1 sản phẩm khác vào sẽ không bị trùng id
            const idP = dataProductLength === 0 ? 0 : idProduct;
            const productCart = {
                id_product: id,
                id: `${idP}`,
                quantily: `${quanti}`,
                // size: `${sizeText}`,
            };
            // console.log(productCart);
            const action = buyProduct(productCart);
            dispatch(action);
        }
    };
    // random product similar product

    // const dataSimilarProduct = () => {

    useEffect(() => {
        // const c = [];
        // let b;
        // do {
        //     b = Math.floor(Math.random() * 10);
        //     if (!c.includes(b) && b !== id) c.push(b);
        // } while (c.length < 5);
        const c = randomProduct(5, 10, id);
        const dataSimilar = c.map((i) => {
            const dataItemProduct = dataProdcuts.find((k) => k.id === i);
            return { ...dataItemProduct };
        });
        setDataSimilarProducts(dataSimilar);
    }, []);
    return (
        <div className={clsx(styles.product_detail)}>
            <div className="grid wide">
                <div className={clsx(styles.product_briefing)}>
                    <div className="row">
                        <div
                            ref={productImgRef}
                            className={clsx(styles.product_img, "col l-6")}
                        >
                            <img
                                className={clsx(styles.img)}
                                src={img}
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
                                    src={img}
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
                                <div className={clsx(styles.product_header)}>
                                    <h2>
                                        {category
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

                                <div className={clsx(styles.product_rating)}>
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
                                    ref={desProductRef}
                                    className={clsx(styles.product_des, {
                                        [styles.show_content]: !activeMore,
                                    })}
                                >
                                    <p
                                        className={clsx(styles.text, {
                                            [styles.show_content]: activeMore,
                                        })}
                                        ref={textDesProductRef}
                                    >
                                        {description}
                                    </p>
                                    {activeMore ? (
                                        <span
                                            onClick={() => setActiveMore(false)}
                                        >
                                            More Learn
                                        </span>
                                    ) : (
                                        <span
                                            onClick={() => setActiveMore(true)}
                                        >
                                            Less Learn
                                        </span>
                                    )}
                                </div>
                                <div className={clsx(styles.product_footer)}>
                                    <div className={clsx(styles.product_btn)}>
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
                        <div className="row">
                            {dataSimilarProducts.map((i) => (
                                <div key={i.id} className="col l-3">
                                    <ProductCard item={i} />
                                </div>
                            ))}
                        </div>
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