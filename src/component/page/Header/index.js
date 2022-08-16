import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import clsx from "clsx";

import SvgIcon from "svg";
import { useDispatch, useSelector } from "react-redux";
import { clickLogin, clickNavbar } from "redux/Login";
import Cart from "component/Content/ShoppingCart";

const Header = (props) => {
    const [activeCart, setActiveCart] = useState(false);
    const [activeSearch, setActiveSearch] = useState(false);
    const [showHeader, setShowHeader] = useState(false);

    const activeLogin = useSelector((state) => state.activeLogin.activeLogin);
    const dataProductsCart = useSelector((state) => state.productsCart);
    // const activeNavbar = useSelector(state => state.activeLogin.activeNavbar)
    const dispatch = useDispatch();

    const cartRef = useRef();
    const searchRef = useRef();
    const scrollYwindow = useRef();

    // bấm ngoài element cart sẽ tắt tab giỏ hàng
    useEffect(() => {
        const handleOut = (e) => {
            if (cartRef.current) {
                const isCheck = cartRef.current.contains(e.target);
                if (!isCheck) {
                    setActiveCart(false);
                }
            }
        };
        const handleOutSearch = (e) => {
            if (searchRef.current) {
                const isCheck = searchRef.current.contains(e.target);
                if (!isCheck) {
                    setActiveSearch(false);
                }
            }
        };
        document.addEventListener("click", handleOut);
        document.addEventListener("click", handleOutSearch);

        return () => {
            document.removeEventListener("click", handleOut);
            document.removeEventListener("click", handleOutSearch);
        };
    }, []);

    // listen onscroll window
    useEffect(() => {
        scrollYwindow.current = 0;
        document.addEventListener("scroll", (e) => {
            // console.log("scrollYwindow.current", scrollYwindow.current);
            const height = window.scrollY;
            // console.log("height", window.innerHeight);
            if (height > scrollYwindow.current) {
                setShowHeader(true);
            } else {
                setShowHeader(false);
            }
            scrollYwindow.current = height;
        });
    }, []);

    //Bấm vào icon tìm kiếm sẽ hiện ra ô tìm kiếm
    const handleClickSearch = () => {
        setActiveSearch(true);
    };

    //Bấm vào cart sẽ hiện bảng giỏ hàng
    const handleClickCart = () => {
        setActiveCart(!activeCart);
    };

    //Bấm vào xem tất cả giỏ hàng
    const handleClickAllCart = () => {
        const action = clickNavbar(8);
        dispatch(action);
        setActiveCart(!activeCart);
    };

    // Bấm icon login hiện thị trang login
    const handleClickLogin = (e) => {
        e.preventDefault();
        const action = clickLogin(activeLogin);
        dispatch(action);
    };
    return (
        <header>
            <div
                className={clsx(styles.header_container, {
                    [styles.active]: showHeader,
                })}
            >
                <div className="grid wide">
                    <div className={clsx(styles.header_wrap)}>
                        <div className={clsx(styles.header_wrap_logo)}>
                            <NavLink
                                to="/the-bottle-haus/home"
                                className={clsx(styles.header_logo)}
                            >
                                <img
                                    src="https://cdn.shopify.com/s/files/1/0313/6228/5699/files/logo_d7a04cee-992d-4fe7-a757-7113f9927484_200x.png?v=1637139812"
                                    alt="Image logo"
                                />
                            </NavLink>
                        </div>

                        <div
                            className={clsx(styles.header_wrap_search, {
                                [styles.active]: activeSearch,
                            })}
                            ref={searchRef}
                        >
                            {/* <div
                                className={clsx(
                                    styles.header_wrap_search_border
                                )}
                            ></div> */}
                            <div
                                className={clsx(
                                    styles.header_wrap_search_input
                                )}
                            >
                                <input
                                    className={clsx(
                                        styles.header_wrap_search_input_btn
                                    )}
                                    placeholder="Search"
                                    type="text"
                                />
                            </div>

                            <button
                                className={clsx(styles.btn)}
                                onClick={handleClickSearch}
                            >
                                <i
                                    className={clsx(
                                        styles.btn_icon,
                                        "fas fa-search"
                                    )}
                                ></i>
                            </button>
                        </div>

                        <NavLink
                            to="/the-bottle-haus/user_name"
                            onClick={handleClickLogin}
                            className={clsx(styles.header_wrap_signIn)}
                        >
                            <div className={clsx(styles.user)}>
                                <i className="far fa-user"></i>
                                <p className={clsx(styles.user_name)}>
                                    Đức Hiếu
                                </p>
                                {/* <span>Sign In</span> */}
                            </div>
                        </NavLink>

                        <div
                            ref={cartRef}
                            className={clsx(styles.cart, {
                                [styles.hasCart]: dataProductsCart.length > 0,
                            })}
                        >
                            <div
                                onClick={handleClickCart}
                                className={clsx(styles.cart_icon)}
                            >
                                <img src={SvgIcon.CART_ICON} alt="Cart" />
                            </div>
                            <Cart
                                activeCart={activeCart}
                                handleClickAllCart={handleClickAllCart}
                            />
                        </div>
                    </div>
                    <div className={clsx(styles.navbar_container)}>
                        <ul className={clsx(styles.navbar_list)}>
                            <li className={clsx(styles.navbar_item)}>
                                <NavLink
                                    to="/the-bottle-haus/all_product"
                                    className={clsx(styles.navbar_item_link)}
                                >
                                    <p
                                        className={clsx(
                                            styles.navbar_item_link_text_last
                                        )}
                                    >
                                        All Products
                                    </p>
                                    <p
                                        className={clsx(
                                            styles.navbar_item_link_text_first
                                        )}
                                    >
                                        All Products
                                    </p>
                                </NavLink>
                            </li>
                            <li
                                className={clsx(
                                    styles.navbar_item,
                                    styles.navbar_item_tabs_nav
                                )}
                            >
                                <NavLink
                                    to="/the-bottle-haus/whiskey"
                                    className={clsx(styles.navbar_item_link)}
                                >
                                    <p
                                        className={clsx(
                                            styles.navbar_item_link_text_last
                                        )}
                                    >
                                        Whiskey
                                    </p>
                                    <p
                                        className={clsx(
                                            styles.navbar_item_link_text_first
                                        )}
                                    >
                                        Whiskey
                                    </p>
                                </NavLink>
                                <ul className={clsx(styles.navbar_tabs_list)}>
                                    <li
                                        className={clsx(
                                            styles.navbar_tabs_item
                                        )}
                                    >
                                        <NavLink
                                            to="/the-bottle-haus/all_whisley"
                                            className={clsx(
                                                styles.navbar_tabs_item_link
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    styles.navbar_tabs_item_link_img
                                                )}
                                                style={{
                                                    backgroundImage:
                                                        "url(https://cdn.shopify.com/s/files/1/0313/6228/5699/files/k1_a35b83b1-6e4e-4494-a6ca-d61f4fc6c043.png?v=1638542303)",
                                                }}
                                            ></div>
                                            <span>All Whiskey</span>
                                        </NavLink>
                                    </li>
                                    <li
                                        className={clsx(
                                            styles.navbar_tabs_item
                                        )}
                                    >
                                        <NavLink
                                            to="/the-bottle-haus/american"
                                            className={clsx(
                                                styles.navbar_tabs_item_link
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    styles.navbar_tabs_item_link_img
                                                )}
                                                style={{
                                                    backgroundImage:
                                                        "url(https://cdn.shopify.com/s/files/1/0313/6228/5699/files/American_2fddd5e7-0e4d-4cd8-96ba-d75032ea2586.png?v=1641907102)",
                                                }}
                                            ></div>
                                            <span>American</span>
                                        </NavLink>
                                    </li>
                                    <li
                                        className={clsx(
                                            styles.navbar_tabs_item
                                        )}
                                    >
                                        <NavLink
                                            to="/the-bottle-haus/bourbon"
                                            className={clsx(
                                                styles.navbar_tabs_item_link
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    styles.navbar_tabs_item_link_img
                                                )}
                                                style={{
                                                    backgroundImage:
                                                        "url(https://cdn.shopify.com/s/files/1/0313/6228/5699/files/Bourbon.png?v=1641907102)",
                                                }}
                                            ></div>
                                            <span>Bourbon</span>
                                        </NavLink>
                                    </li>
                                    <li
                                        className={clsx(
                                            styles.navbar_tabs_item
                                        )}
                                    >
                                        <NavLink
                                            to="/the-bottle-haus/canadian"
                                            className={clsx(
                                                styles.navbar_tabs_item_link
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    styles.navbar_tabs_item_link_img
                                                )}
                                                style={{
                                                    backgroundImage:
                                                        "url(https://cdn.shopify.com/s/files/1/0313/6228/5699/files/Canadian.png?v=1641907103)",
                                                }}
                                            ></div>
                                            <span>Canadian</span>
                                        </NavLink>
                                    </li>
                                    <li
                                        className={clsx(
                                            styles.navbar_tabs_item
                                        )}
                                    >
                                        <NavLink
                                            to="/the-bottle-haus/irish"
                                            className={clsx(
                                                styles.navbar_tabs_item_link
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    styles.navbar_tabs_item_link_img
                                                )}
                                                style={{
                                                    backgroundImage:
                                                        "url(https://cdn.shopify.com/s/files/1/0313/6228/5699/files/Irish.png?v=1641907102)",
                                                }}
                                            ></div>
                                            <span>Irish</span>
                                        </NavLink>
                                    </li>
                                    <li
                                        className={clsx(
                                            styles.navbar_tabs_item
                                        )}
                                    >
                                        <NavLink
                                            to="/the-bottle-haus/japanese"
                                            className={clsx(
                                                styles.navbar_tabs_item_link
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    styles.navbar_tabs_item_link_img
                                                )}
                                                style={{
                                                    backgroundImage:
                                                        "url(https://cdn.shopify.com/s/files/1/0313/6228/5699/files/Japanese.png?v=1641907102)",
                                                }}
                                            ></div>
                                            <span>Japanese</span>
                                        </NavLink>
                                    </li>
                                    <li
                                        className={clsx(
                                            styles.navbar_tabs_item
                                        )}
                                    >
                                        <NavLink
                                            to="/the-bottle-haus/canadian"
                                            className={clsx(
                                                styles.navbar_tabs_item_link
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    styles.navbar_tabs_item_link_img
                                                )}
                                                style={{
                                                    backgroundImage:
                                                        "url(https://cdn.shopify.com/s/files/1/0313/6228/5699/files/Canadian.png?v=1641907103)",
                                                }}
                                            ></div>
                                            <span>Canadian</span>
                                        </NavLink>
                                    </li>
                                    <li
                                        className={clsx(
                                            styles.navbar_tabs_item
                                        )}
                                    >
                                        <NavLink
                                            to="/the-bottle-haus/rye"
                                            className={clsx(
                                                styles.navbar_tabs_item_link
                                            )}
                                        >
                                            <div
                                                className={clsx(
                                                    styles.navbar_tabs_item_link_img
                                                )}
                                                style={{
                                                    backgroundImage:
                                                        "url(https://cdn.shopify.com/s/files/1/0313/6228/5699/files/Rye.png?v=1641907102)",
                                                }}
                                            ></div>
                                            <span>Rye</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li
                                className={clsx(
                                    styles.navbar_item,
                                    styles.navbar_item_tabs_nav
                                )}
                            >
                                <NavLink
                                    to="/the-bottle-haus/shop_alcohol"
                                    className={clsx(styles.navbar_item_link)}
                                >
                                    <p
                                        className={clsx(
                                            styles.navbar_item_link_text_last
                                        )}
                                    >
                                        Shop Alcohol
                                    </p>
                                    <p
                                        className={clsx(
                                            styles.navbar_item_link_text_first
                                        )}
                                    >
                                        Shop Alcohol
                                    </p>
                                </NavLink>
                            </li>
                            <li className={clsx(styles.navbar_item)}>
                                <NavLink
                                    to="/the-bottle-haus/shop_wine"
                                    className={clsx(styles.navbar_item_link)}
                                >
                                    <p
                                        className={clsx(
                                            styles.navbar_item_link_text_last
                                        )}
                                    >
                                        Shop Wine
                                    </p>
                                    <p
                                        className={clsx(
                                            styles.navbar_item_link_text_first
                                        )}
                                    >
                                        Shop Wine
                                    </p>
                                </NavLink>
                            </li>
                            <li className={clsx(styles.navbar_item)}>
                                <NavLink
                                    to="/the-bottle-haus/celebrity_spritis"
                                    className={clsx(styles.navbar_item_link)}
                                >
                                    <p
                                        className={clsx(
                                            styles.navbar_item_link_text_last
                                        )}
                                    >
                                        Celebrity Spritis
                                    </p>
                                    <p
                                        className={clsx(
                                            styles.navbar_item_link_text_first
                                        )}
                                    >
                                        Celebrity Spritis
                                    </p>
                                </NavLink>
                            </li>
                            <li className={clsx(styles.navbar_item)}>
                                <NavLink
                                    to="/the-bottle-haus/barrel_pick"
                                    className={clsx(styles.navbar_item_link)}
                                >
                                    <p
                                        className={clsx(
                                            styles.navbar_item_link_text_last
                                        )}
                                    >
                                        Barrel Pick
                                    </p>
                                    <p
                                        className={clsx(
                                            styles.navbar_item_link_text_first
                                        )}
                                    >
                                        Barrel Pick
                                    </p>
                                </NavLink>
                            </li>
                            <li className={clsx(styles.navbar_item)}>
                                <NavLink
                                    to="/the-bottle-haus/huas_barrel"
                                    className={clsx(styles.navbar_item_link)}
                                >
                                    <p
                                        className={clsx(
                                            styles.navbar_item_link_text_last
                                        )}
                                    >
                                        Haus Barrel
                                    </p>
                                    <p
                                        className={clsx(
                                            styles.navbar_item_link_text_first
                                        )}
                                    >
                                        Haus Barrel
                                    </p>
                                </NavLink>
                            </li>
                            <li className={clsx(styles.navbar_item)}>
                                <NavLink
                                    to="/the-bottle-haus/corporate_gifting"
                                    className={clsx(styles.navbar_item_link)}
                                >
                                    <p
                                        className={clsx(
                                            styles.navbar_item_link_text_last
                                        )}
                                    >
                                        Corporate Gifting
                                    </p>
                                    <p
                                        className={clsx(
                                            styles.navbar_item_link_text_first
                                        )}
                                    >
                                        Corporate Gifting
                                    </p>
                                </NavLink>
                            </li>
                            <li className={clsx(styles.navbar_item)}>
                                <NavLink
                                    to="/the-bottle-haus/clearance"
                                    className={clsx(styles.navbar_item_link)}
                                >
                                    <p
                                        className={clsx(
                                            styles.navbar_item_link_text_last
                                        )}
                                    >
                                        Clearance
                                    </p>
                                    <p
                                        className={clsx(
                                            styles.navbar_item_link_text_first
                                        )}
                                    >
                                        Clearance
                                    </p>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header;
