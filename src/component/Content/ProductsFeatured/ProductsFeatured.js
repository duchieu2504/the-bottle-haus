import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
// import PropTypes from 'prop-types';

import AOS from "aos";
import "aos/dist/aos.css";

import styles from "./ProductsFeatured.module.scss";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import { clickNavbar } from "redux/Login";
import { useDispatch } from "react-redux";
import { randomProduct } from "util/RandomProduct";

ProductsFeatured.propTypes = {};

function ProductsFeatured(props) {
    const data = useSelector((state) => state.products.items);
    const dispatch = useDispatch();

    const dataProdcut = [...data];

    const [dataSimilarProducts, setDataSimilarProducts] = useState([]);
    // const [state, setState] = useState({});

    //Random products
    const dataSimilar = useMemo(() => {
        const d = randomProduct(6, 10);
        const data = d.map((i) => {
            const dataItemProduct = dataProdcut.find(
                (k, index) => Number(index) === Number(i)
            );
            return { ...dataItemProduct };
        });
        return data;
    });
    useEffect(() => {
        setDataSimilarProducts(dataSimilar);
    }, [data]);

    useEffect(() => {
        AOS.init({
            once: true,
        });
        // const time = () => {
        //     const itemWidth = itemRef.current.offsetWidth;
        //     const listWidth =
        //         itemWidth * dataProdcuts.length + (1200 - 186 - itemWidth * 2);
        //     setState({
        //         translate: 0,
        //         transition: 0.45,
        //         activeIndex: 0,
        //         width: listWidth,
        //         itemWidth: itemWidth,
        //         activeArrowLeft: "none",
        //         activeArrowRight: "active",
        //     });
        // };
        // time();
    }, []);

    // const {
    //     translate,
    //     transition,
    //     activeIndex,
    //     width,
    //     itemWidth,
    //     activeArrowLeft,
    //     activeArrowRight,
    // } = state;

    // // Khi bấm prev slide
    // const prevSlide = () => {
    //     setState({
    //         ...state,
    //         activeIndex: activeIndex === 0 ? 0 : activeIndex - 1,
    //         translate: (activeIndex - 1) * (itemWidth + 63),
    //         activeArrowLeft: activeIndex - 1 === 0 ? "none" : "active",
    //         activeArrowRight: "active",
    //     });
    // };

    // // Khi bấm next slide
    // const nextSlide = () => {
    //     setState({
    //         ...state,
    //         activeIndex:
    //             activeIndex === dataProdcuts.length - 3
    //                 ? dataProdcuts.length - 3
    //                 : activeIndex + 1,
    //         translate: (activeIndex + 1) * (itemWidth + 63),
    //         activeArrowLeft: "active",
    //         activeArrowRight:
    //             activeIndex === dataProdcuts.length - 4 ? "none" : "active",
    //     });
    // };
    // click vào xem tất cả
    const handleClickAllView = () => {
        const action = clickNavbar(1);
        dispatch(action);
    };

    // const styleList = { transition, translate, width };
    return (
        <div className={clsx(styles.products_featured_container)}>
            <div className={clsx(styles.products_featured_headingWrap)}>
                <div className={clsx(styles.products_featured_text)}>
                    <div className={clsx(styles.text_fill)}>Shop</div>
                    <div className={clsx(styles.text_stroke)}>Whiskey</div>
                </div>
                <span className={clsx(styles.products_featured_line)}></span>

                <div
                    className={clsx(styles.btn_show_all)}
                    onClick={handleClickAllView}
                >
                    <NavLink to="/" className={clsx(styles.btn_show_all_link)}>
                        <p>Show all</p>
                    </NavLink>
                </div>
            </div>
            <div className={clsx(styles.product)}>
                <div className="grid wide">
                    <div className={clsx(styles.product_list)}>
                        <div className="row">
                            {dataSimilarProducts.map((item, index) => {
                                return (
                                    <div className="col l-3" key={item.id}>
                                        <ProductCard
                                            item={item}
                                            index={index}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/* <div>
                    <Arrow
                        direction="left"
                        activeArrow={activeArrowLeft}
                        handleClick={prevSlide}
                    />
                    <Arrow
                        direction="right"
                        activeArrow={activeArrowRight}
                        handleClick={nextSlide}
                    />
                </div> */}
                {/* <div className={clsx(styles.scrollbar_horizontal)}>
                    <div className={clsx(styles.scrollbar_handle)}>

                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default ProductsFeatured;
