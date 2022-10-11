import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Catalog.module.scss";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

const Catalog = ({ handleClickShowCatalog, showCatalog }) => {
    return (
        <div className={clsx(styles.menu_catalog)}>
            <p
                className={clsx(styles.menu_catalog_title, {
                    [styles.active]: showCatalog,
                })}
                onClick={handleClickShowCatalog}
            >
                Catalog
            </p>
            <ul
                className={clsx(styles.menu_catalog_list, {
                    [styles.showCatalog]: showCatalog,
                })}
            >
                <li className={styles.menu_catalog_item}>
                    <NavLink
                        to="/the-bottle-haus/all_product"
                        className={styles.menu_catalog_link}
                    >
                        All Products
                    </NavLink>
                </li>
                <li className={styles.menu_catalog_item}>
                    <NavLink
                        to="/the-bottle-haus/whiskey"
                        className={styles.menu_catalog_link}
                    >
                        Whiskey
                    </NavLink>
                </li>
                <li className={styles.menu_catalog_item}>
                    <NavLink
                        to="/the-bottle-haus/shop_alcohol"
                        className={styles.menu_catalog_link}
                    >
                        ShopAlcohol
                    </NavLink>
                </li>
                <li className={styles.menu_catalog_item}>
                    <NavLink
                        to="/the-bottle-haus/shop_wine"
                        className={styles.menu_catalog_link}
                    >
                        ShopWine
                    </NavLink>
                </li>
                <li className={styles.menu_catalog_item}>
                    <NavLink
                        to="/the-bottle-haus/celebrity_spritis"
                        className={styles.menu_catalog_link}
                    >
                        Celebrity Spritis
                    </NavLink>
                </li>
                <li className={styles.menu_catalog_item}>
                    <NavLink
                        to="/the-bottle-haus/barrel_pick"
                        className={styles.menu_catalog_link}
                    >
                        Haus Bundles
                    </NavLink>
                </li>
                <li className={styles.menu_catalog_item}>
                    <NavLink
                        to="/the-bottle-haus/huas_barrel"
                        className={styles.menu_catalog_link}
                    >
                        Barrel Picks
                    </NavLink>
                </li>
                <li className={styles.menu_catalog_item}>
                    <NavLink
                        to="/the-bottle-haus/corporate_gifting"
                        className={styles.menu_catalog_link}
                    >
                        Corporate Gifting
                    </NavLink>
                </li>
                <li className={styles.menu_catalog_item}>
                    <NavLink
                        to="/the-bottle-haus/clearance"
                        className={styles.menu_catalog_link}
                    >
                        Clearance
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

Catalog.propTypes = {};

export default Catalog;
