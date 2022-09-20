import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";
import Loading from "util/Loading";
import styles from "./SearchProduct.module.scss";

const SearchProduct = ({ loadingSearch, apiSearchProduct }) => {
    const ProductCard = () => {
        if (apiSearchProduct.length > 0) {
            const result = apiSearchProduct.map((product) => {
                return (
                    <li className={clsx(styles.searchProduct_item)}>
                        <NavLink
                            to={`/the-bottle-haus/${product.category}/${product._id}`}
                            className={clsx(styles.searchProduct_item_link)}
                        >
                            <img src={product.image} alt="Image Product" />
                            <p>{product.title}</p>
                        </NavLink>
                    </li>
                );
            });
            return result;
        } else {
            return (
                <li className={clsx(styles.searchProduct_no_product)}>
                    No products found
                </li>
            );
        }
    };
    return (
        <ul className={clsx(styles.searchProduct_list)}>
            {loadingSearch ? <Loading /> : <ProductCard />}
        </ul>
    );
};

export default SearchProduct;
