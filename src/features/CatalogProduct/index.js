import React, { useRef, useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./CatalogProducts.module.scss";
import "./PageProduct.css";
import AOS from "aos";
import "aos/dist/aos.css";

import Loading from "component/Loading";
import ProductCard from "component/ProductCard";
import Pagination from "./component/Pagination/Pagination";

import { removeVN, getParent } from "util/Func";

import SvgIcon from "assets/svg";
import { showMenuCatalog } from "dataLocal/redux/Login";

function CatalogProducts() {
    const { url } = useParams();

    const showCatalogMenu = useSelector(
        (state) => state.activeLogin.showCatalog
    );
    const dataCategory = useSelector((state) => state.products.items);
    const loading = useSelector((state) => state.products.loading);
    const dataProdcuts = [...dataCategory];

    const dataUrl = useMemo(() => {
        return dataProdcuts.filter((item) => removeVN(item.category) === url);
    }, [dataProdcuts]);

    // const [ data, setData ] = useState(dataUrl)

    // dữ liệu sản phẩm để lọc theo từng phân loại nhỏ
    const [dataClassify, setDataClassify] = useState([]);

    // dữ liệu sản phẩm sắp xếp theo giá
    const [dataSort, setDataSort] = useState([]);

    //dữ liệu phân trang
    const [dataProductPage, setDataProductPage] = useState([]);
    // active các phân loại nhỏ ~ classify
    const [index, setIndex] = useState(-1);

    // active classify
    const [indexPrev, setIndexPrev] = useState(0);

    // hiện bảng sắp xếp lại
    const [showModalSort, setShowModalSort] = useState(false);
    // index sort
    const [indexSort, setIndexSort] = useState(0);
    const [activeApply, setActiveApply] = useState(false);

    //Number page
    const [numTotalPage, setNumTotalPage] = useState(1);
    const [pageActive, setPageActive] = useState(1);

    const classifyCollection = [
        {
            title: "All Products",
            image: null,
        },
        {
            title: "Whiskey",
            image: "https://cdn.shopify.com/s/files/1/0313/6228/5699/files/k1.png?v=1637735185",
        },
        {
            title: "American",
            image: "https://cdn.shopify.com/s/files/1/0313/6228/5699/files/k2.png?v=1637735255",
        },
        {
            title: "Scotch",
            image: "https://cdn.shopify.com/s/files/1/0313/6228/5699/files/k3.png?v=1637735519",
        },
        {
            title: "Tequila",
            image: "https://cdn.shopify.com/s/files/1/0313/6228/5699/files/k4.png?v=1637735519",
        },
        {
            title: "Cognac",
            image: "https://cdn.shopify.com/s/files/1/0313/6228/5699/files/k6.png?v=1637735520",
        },
        {
            title: "Gin",
            image: "https://cdn.shopify.com/s/files/1/0313/6228/5699/files/k7.png?v=1637735519",
        },
        {
            title: "Liqueur",
            image: "https://cdn.shopify.com/s/files/1/0313/6228/5699/files/k8.png?v=1637735519",
        },
        {
            title: "Champagne",
            image: "https://cdn.shopify.com/s/files/1/0313/6228/5699/files/kk10.png?v=1637735519",
        },
    ];
    const listRef = useRef();
    const sortRef = useRef();
    const sortUlRef = useRef();
    const filterRef = useRef();
    const filterItemRef = useRef();
    const sortItemRef = useRef();

    const dispatch = useDispatch();
    // Thay đổi data khi chuyển sang mặt hàng khác
    useEffect(() => {
        // ẩn page menu catalog khi chuyển click vào navbar trong catalog menu
        const action = !showCatalogMenu;
        dispatch(showMenuCatalog(action));

        setDataClassify(dataUrl);
        // tạo giá trị khởi tạo cho index mỗi khi thay đổi url
        setIndex(0);
        setIndexSort(0);
    }, [loading, url]);
    // Gắn dữ liệu khi thay đổi sự sắp xếp
    useEffect(() => {
        setDataSort(dataClassify);
    }, [dataClassify]);

    // Khi thay đổi sự sắp xếp thì render lại dữ liệu sản phẩm
    useEffect(() => {
        const d = [...dataSort];

        switch (indexSort) {
            case 0:
                d.sort((a, b) => +a.id - +b.id);
                setDataSort(d);
                break;
            case 1:
                d.sort((a, b) => +a.price - +b.price);
                setDataSort(d);
                break;

            case 2:
                d.sort((a, b) => +b.price - +a.price);
                setDataSort(d);
                break;
            default:
                console.log("default");
                break;
        }
    }, [activeApply]);

    // set số page
    useEffect(() => {
        const num = Math.ceil(dataSort.length / 4);
        setNumTotalPage(num);
    }, [dataSort]);

    useEffect(() => {
        const start = (pageActive - 1) * 4;
        const end = pageActive * 4;
        const dataPage = dataSort.slice(start, end);
        setDataProductPage(dataPage);
    }, [dataSort, pageActive]);

    useEffect(() => {
        const dataPage = dataSort.slice(0, 4);
        setDataProductPage(dataPage);
    }, [dataClassify]);

    // Render hiệu ứng AOs tránh mất hiệu ứng khi click vào từng classify
    useEffect(() => {
        // danh sách các thẻ có class filter_item
        const filterItemClass = filterItemRef.current.className.split(" ");
        const filterItemAll = filterRef.current.querySelectorAll(
            `.${filterItemClass}`
        );

        // tìm thẻ div đang active
        const filterItemActive = [...filterItemAll].find(
            (acc) => acc.classList.length > 3
        );
        const time = setTimeout(() => {
            const index = filterItemActive.dataset.index;
            setIndexPrev(index);
        }, 100);
        // console.log(filterRef.current.querySelector('.Products_active__2KSV4'));
        // console.log(filterRef.current.querySelectorAll('.Products_filter_item__1YTmr')[indexPrev]);
        if (filterItemAll[indexPrev] !== undefined) {
            filterItemAll[indexPrev].classList.toggle("aos-animate", true);
            filterItemAll[indexPrev].classList.toggle("aos-init", true);
        }
        return () => clearTimeout(time);
    }, [index]);

    // Khi click bên ngoài thẻ  bảng giỏ hàng
    useEffect(() => {
        // khởi chạy aniamation
        AOS.init({
            once: true,
        });

        const handleClick = (e) => {
            if (sortRef.current) {
                const isCheckSort = sortRef.current.contains(e.target);
                if (!isCheckSort) {
                    setShowModalSort(false);
                }
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    // Click vào button 'sắp xếp theo' sẽ hiện bảng lựa chọn sắp xếp theo j đó.
    const handleClickSort = () => {
        setShowModalSort(!showModalSort);
    };

    // Lựa chọn sự sắp xếp giá theo cái gì
    const handleClickSortOption = (e) => {
        const isCheck = getParent(
            e.target,
            `.${sortItemRef.current.classList[0]}`
        );
        if (isCheck) {
            const newIndex =
                indexSort === +isCheck.dataset.index
                    ? 0
                    : isCheck.dataset.index;
            setIndexSort(+newIndex);
        }
        if (!isCheck) {
            const newIndex =
                indexSort === +e.target.dataset.index
                    ? 0
                    : e.target.dataset.index;
            setIndexSort(+newIndex);
        }
    };
    // Thay đổi dữ liệu sắp xếp sản phẩm theo giá
    const handleClickApply = () => {
        setActiveApply(!activeApply);
        setShowModalSort(!showModalSort);
    };

    // lọc sản phẩm theo phân loại nhỏ
    const handleClickClassify = (e) => {
        setIndexSort(0);

        const titleText = e.target.innerText;
        const titleConvert =
            titleText.charAt(0).toLocaleLowerCase() + titleText.slice(1);

        const dataClass = dataClassify.filter(
            (i) => removeVN(i.classify) === removeVN(titleConvert)
        );
        const titleAllProduct =
            classifyCollection[0].title.charAt(0).toLocaleLowerCase() +
            classifyCollection[0].title.slice(1);

        switch (titleConvert) {
            case titleAllProduct:
                setDataSort(dataClassify);
                break;
            default:
                setDataSort(dataClass);
                break;
        }

        const isCheck = getParent(e.target, ".aos-init");
        if (isCheck) setIndex(+isCheck.dataset.index);
        if (!isCheck) setIndex(+e.target.dataset.index);

        // gán lại giá trị num page = 1
        setPageActive(1);
    };
    return (
        <div className={clsx(styles.main_product)}>
            <div className="grid wide">
                <div className="row">
                    <div className="col c-12 l-2-4">
                        <div className={clsx(styles.filter_panel)}>
                            <div
                                ref={filterRef}
                                className={clsx(styles.filter_facet)}
                            >
                                {classifyCollection.map((i, k) => {
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
                                                    "aos-animate":
                                                        +k === +index,
                                                },
                                                {
                                                    [styles.active]:
                                                        +k === +index,
                                                }
                                            )}
                                            ref={filterItemRef}
                                            onClick={handleClickClassify}
                                        >
                                            <p
                                                className={clsx(
                                                    styles.filter_item_label
                                                )}
                                            >
                                                {i.title
                                                    .charAt(0)
                                                    .toLocaleUpperCase() +
                                                    i.title.slice(1)}
                                            </p>
                                            {i.image && (
                                                <img
                                                    src={i.image}
                                                    className={clsx(
                                                        styles.filter_item_img
                                                    )}
                                                    alt={i}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="col c-12 l-9-4">
                        <div className={clsx(styles.header)}>
                            <div
                                data-aos="fade-down-right"
                                ref={listRef}
                                className={clsx(styles.header_text)}
                            >
                                <div className={clsx(styles.heading)}>
                                    <p>
                                        {index !== -1 &&
                                            classifyCollection[index].title}
                                    </p>
                                </div>
                            </div>

                            <div
                                data-aos="fade-down-left"
                                ref={sortRef}
                                className={clsx(styles.sort)}
                            >
                                <div className={clsx(styles.content_sort)}>
                                    <p
                                        className={clsx(
                                            styles.content_sort_header
                                        )}
                                        onClick={handleClickSort}
                                    >
                                        Sort
                                    </p>
                                    <span className={clsx(styles.line)}></span>
                                    <ul
                                        ref={sortUlRef}
                                        className={clsx(styles.sort_list, {
                                            [styles.active]: showModalSort,
                                        })}
                                    >
                                        <li
                                            className={clsx(styles.sort_item, {
                                                [styles.active]:
                                                    indexSort === 1,
                                            })}
                                            data-index="1"
                                            onClick={handleClickSortOption}
                                            ref={sortItemRef}
                                        >
                                            <p
                                                className={clsx(
                                                    styles.sort_item_heading
                                                )}
                                            >
                                                Price, low to high
                                            </p>
                                            <img
                                                src={SvgIcon.DONE}
                                                alt="Done"
                                            />
                                        </li>
                                        <li
                                            className={clsx(styles.sort_item, {
                                                [styles.active]:
                                                    indexSort === 2,
                                            })}
                                            onClick={handleClickSortOption}
                                            data-index="2"
                                        >
                                            <p
                                                className={clsx(
                                                    styles.sort_item_heading
                                                )}
                                            >
                                                Price, high to low
                                            </p>
                                            <img
                                                src={SvgIcon.DONE}
                                                alt="Done"
                                            />
                                        </li>
                                        <button
                                            className={clsx(styles.apply)}
                                            onClick={handleClickApply}
                                        >
                                            Apply
                                        </button>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className={clsx(styles.product)}>
                            <div className={clsx(styles.product_list)}>
                                <div className="row" style={{ width: "100%" }}>
                                    {loading ? (
                                        <Loading />
                                    ) : (
                                        dataProductPage.map((item, index) => {
                                            return (
                                                <div
                                                    className="col c-6 l-3"
                                                    key={item.id}
                                                >
                                                    <ProductCard
                                                        item={item}
                                                        index={index}
                                                    />
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination
                numTotalPage={numTotalPage}
                pageActive={pageActive}
                setPageActive={setPageActive}
            />
        </div>
    );
}

export default CatalogProducts;
