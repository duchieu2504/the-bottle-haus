import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import clsx from "clsx";

import SvgIcon from "svg";
import { useDispatch, useSelector } from "react-redux";
import { showPageLogin, clickNavbar } from "redux/Login";
import ShoppingCart from "component/Content/ShoppingCart";
import { GetAllProdcts } from "api/apiProduct";
import { AuthContext } from "Context/AuthProvider";
import SearchProduct from "component/Content/SearchProduct";
import { getSearchProduct } from "apiServices/productsServices";
import { SET_PRODUCTS_SEARCH } from "redux/productSearch";

const Header = (props) => {
    const [showShoppingCart, setShowShoppingCart] = useState(false);
    const [activeSearch, setActiveSearch] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const [dataSession, setDataSession] = useState(false);
    const [apiSearchProduct, setApiSearchProduct] = useState([]);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [showSearchProduct, setShowSearchProduct] = useState(false);

    const activeLogin = useSelector((state) => state.activeLogin.activeLogin);
    const productSearch = useSelector((state) => state.productSearch.items);

    // san phâm trong giỏ hàng
    const orderUnpaid = useSelector((state) => state.orderUnpaid.items) || [];
    const dataCartSession =
        JSON.parse(sessionStorage.getItem("productIds")) || [];

    // const activeNavbar = useSelector(state => state.activeLogin.activeNavbar)
    const dispatch = useDispatch();

    const cartRef = useRef();
    const searchRef = useRef();
    const scrollYwindow = useRef();

    const {
        user: { uid, photoURL },
    } = useContext(AuthContext);

    // dispatch(action);
    // bấm ngoài element cart sẽ tắt tab giỏ hàng
    useEffect(() => {
        const handleOut = (e) => {
            const isCheck =
                cartRef.current && cartRef.current.contains(e.target);
            if (!isCheck) {
                setShowShoppingCart(isCheck);
            }
        };
        const handleOutSearch = (e) => {
            const isCheckSearch =
                searchRef.current && searchRef.current.contains(e.target);

            if (!isCheckSearch) {
                setActiveSearch(isCheckSearch);
                setShowSearchProduct(false);
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
        if (productSearch.length > 0) {
            setShowSearchProduct(true);
        }
    };

    //Bấm vào cart sẽ hiện bảng giỏ hàng
    const handleClickCart = () => {
        setShowShoppingCart(!showShoppingCart);
    };
    //Bấm vào xem tất cả giỏ hàng
    const handleClickAllCart = () => {
        setShowShoppingCart(!showShoppingCart);
    };

    // Bấm icon login hiện thị trang login
    const handleClickLogin = (e) => {
        e.preventDefault();
        const action = showPageLogin(activeLogin);
        dispatch(action);
    };

    // handleChangeSearch
    const handleChangeSearch = async (e) => {
        const time = setTimeout(async () => {
            if (e.target.value !== "") {
                setShowSearchProduct(true);
                await setLoadingSearch(true);
                const res = await getSearchProduct(e.target.value);
                await setApiSearchProduct(res);
                await dispatch(SET_PRODUCTS_SEARCH(res));
                await setLoadingSearch(false);
                return;
            } else {
                await dispatch(SET_PRODUCTS_SEARCH([]));
                await setApiSearchProduct([]);
                return;
            }
        }, 500);
        return () => clearTimeout(time);
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
                        {/* logo  */}
                        <div className={clsx(styles.header_wrap_logo)}>
                            <NavLink
                                to="/the-bottle-haus/home"
                                className={clsx(styles.header_wrap_logo_link)}
                            >
                                <img
                                    src="https://cdn.shopify.com/s/files/1/0313/6228/5699/files/logo_d7a04cee-992d-4fe7-a757-7113f9927484_200x.png?v=1637139812"
                                    alt="Image logo"
                                />
                            </NavLink>
                        </div>

                        {/* menu mobile phone */}
                        <div className={clsx(styles.header_wrap_menu)}></div>

                        {/* Search */}
                        <div
                            className={clsx(styles.header_wrap_search, {
                                [styles.active]: activeSearch,
                            })}
                            ref={searchRef}
                        >
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
                                    onChange={handleChangeSearch}
                                />
                                <div
                                    className={clsx(
                                        styles.header_wrap_search_input_searchProduct,
                                        {
                                            [styles.showSearchProduct]:
                                                showSearchProduct,
                                        }
                                    )}
                                >
                                    <SearchProduct
                                        loadingSearch={loadingSearch}
                                        apiSearchProduct={apiSearchProduct}
                                    />
                                </div>
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

                        {/* Sign In */}
                        <div className={clsx(styles.header_wrap_signIn)}>
                            {uid ? (
                                <NavLink to="/the-bottle-haus/account">
                                    <img
                                        src={photoURL}
                                        alt="Image"
                                        className={clsx(styles.user_image)}
                                    />
                                </NavLink>
                            ) : (
                                <div onClick={handleClickLogin}>
                                    <div className={clsx(styles.icon_login)}>
                                        <i className="far fa-user"></i>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Cart */}
                        <div
                            ref={cartRef}
                            className={clsx(styles.cart, {
                                [styles.hasCart]: orderUnpaid.length > 0,
                                [styles.hasCart]: dataCartSession.length > 0,
                            })}
                        >
                            <div
                                onClick={handleClickCart}
                                className={clsx(styles.cart_icon)}
                            >
                                <img src={SvgIcon.CART_ICON} alt="Cart" />
                            </div>
                            <ShoppingCart
                                showShoppingCart={showShoppingCart}
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
