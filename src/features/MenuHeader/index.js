import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./Menu.module.scss";
import clsx from "clsx";
import Catalog from "./component/Catalog";
import SvgIcon from "assets/svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showMenuCatalog } from "dataLocal/redux/Login";

const MenuHeader = (props) => {
    const showCatalogMenu = useSelector(
        (state) => state.activeLogin.showCatalog
    );
    const [showCatalog, setShowCatalog] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setShowCatalog(false);
    }, [showCatalogMenu]);

    const handleClickShowCatalog = () => {
        setShowCatalog(!showCatalog);
    };
    const handleCloseMenuCatalog = () => {
        const action = !showCatalogMenu;
        dispatch(showMenuCatalog(action));
    };
    return (
        <div
            className={clsx(styles.menu_header, {
                [styles.active]: showCatalogMenu,
            })}
        >
            <div className={clsx(styles.menu_header_toggle)}>
                <div className={clsx(styles.menu_header_toggle_catalog)}>
                    <Catalog
                        handleClickShowCatalog={handleClickShowCatalog}
                        showCatalog={showCatalog}
                    />
                </div>
                <div className={clsx(styles.menu_header_item)}>
                    <NavLink
                        to="/open_haus"
                        className={clsx(styles.menu_header_item_link)}
                    >
                        Open hau$
                    </NavLink>
                </div>
                <div className={clsx(styles.menu_header_item)}>
                    <NavLink
                        to="/open_haus"
                        className={clsx(styles.menu_header_item_link)}
                    >
                        Loyalty and Rewards
                    </NavLink>
                </div>
                <div className={clsx(styles.menu_header_item)}>
                    <NavLink
                        to="/blog"
                        className={clsx(styles.menu_header_item_link)}
                    >
                        Blog
                    </NavLink>
                </div>
                <div className={clsx(styles.menu_header_flex)}>
                    <div className={clsx(styles.menu_header_flex_button)}>
                        <img src={SvgIcon.itemMenuHeader_1} alt="Login" />
                        <button
                            type="button"
                            className={clsx(styles.menu_header_flex_btn)}
                        >
                            Log in
                        </button>
                    </div>
                    <div className={clsx(styles.menu_header_flex_button)}>
                        <img src={SvgIcon.itemMenuHeader_2} alt="Login" />
                        <NavLink
                            to="#"
                            className={clsx(styles.menu_header_flex_btn)}
                        >
                            All Products
                        </NavLink>
                    </div>
                </div>
                <div className={clsx(styles.menu_header_flex)}>
                    <div className={clsx(styles.menu_header_flex_button)}>
                        <img src={SvgIcon.itemMenuHeader_3} alt="Login" />
                        <NavLink
                            to="#"
                            className={clsx(styles.menu_header_flex_btn)}
                        >
                            Gift sets
                        </NavLink>
                    </div>
                    <div className={clsx(styles.menu_header_flex_button)}>
                        <img src={SvgIcon.itemMenuHeader_4} alt="Login" />
                        <NavLink
                            to="#"
                            className={clsx(styles.menu_header_flex_btn)}
                        >
                            Contact Us
                        </NavLink>
                    </div>
                </div>

                <div
                    className={clsx(styles.menu_header_close)}
                    onClick={handleCloseMenuCatalog}
                >
                    <img src={SvgIcon.closeSvg} alt="Close Catalog" />
                </div>
            </div>
        </div>
    );
};

MenuHeader.propTypes = {};

export default MenuHeader;
