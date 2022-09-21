import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
// import PropTypes from 'prop-types';
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import styles from "./ProductsRandom.module.scss";

import { clickNavbar } from "dataLocal/redux/Login";

import { randomProduct } from "util/Func";

import ProductCard from "component/ProductCard";

ProductsRandom.propTypes = {};

function ProductsRandom() {
    const data = useSelector((state) => state.products.items);
    const loading = useSelector((state) => state.products.loading);
    const dispatch = useDispatch();

    const dataProdcut = [...data];

    const [dataSimilarProducts, setDataSimilarProducts] = useState([]);
    // const [state, setState] = useState({});

    //Random products
    const dataSimilar = useMemo(() => {
        if (dataProdcut.length > 0) {
            const maxLength = dataProdcut.length;
            const d = randomProduct(6, maxLength);
            const data = d.map((i) => {
                const dataItemProduct = dataProdcut.find(
                    (k, index) => Number(index) === Number(i)
                );
                return { ...dataItemProduct };
            });
            return data;
        }
    }, [loading]);
    useEffect(() => {
        if (dataProdcut.length > 0) {
            setDataSimilarProducts(dataSimilar);
        }
    }, [data]);

    useEffect(() => {
        AOS.init({
            once: true,
        });
    }, []);

    // click vào xem tất cả
    const handleClickAllView = () => {
        const action = clickNavbar(1);
        dispatch(action);
    };

    // const styleList = { transition, translate, width };
    return (
        <div className={clsx(styles.product_ramdom)}>
            <div className="grid wide">
                <div className={clsx(styles.product_list)}>
                    <div className="row">
                        {dataSimilarProducts.map((item, index) => {
                            return (
                                <div className="col l-3" key={item.id}>
                                    <ProductCard item={item} index={index} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsRandom;
