import React, { useEffect, useRef } from "react";
import Slider from "../../../util/Slider/Slider.js";
import ProductsFeatured from "../../Content/ProductsFeatured/ProductsFeatured.js";
import clsx from "clsx";
import styles from "./Main.module.scss";
import "aos/dist/aos.css";
import AOS from "aos";
import "./Main.css";
import Slider_3d from "util/Slider_3d/Slider_3d.js";
import ProductCard from "component/Content/ProductCard/ProductCard.js";
import { useSelector } from "react-redux";
import SliderDow from "util/Slider_dow/index.js";
import SliderReviews from "util/Slider_reviews/index.js";
import { NavLink } from "react-router-dom";

const Main = () => {
    const h1Ref = useRef();

    const data = useSelector((state) => state.products);

    const dataProdcut = [...data];
    const dataProdcuts = dataProdcut.slice(0, dataProdcut.length - 5);

    useEffect(() => {
        AOS.init();
    });
    useEffect(() => {
        var i = 0;
        var text =
            "Chào mừng đến với xưởng Cơ khí Đức Hải, chuyển sản xuất các hàng khuôn sắt phục vụ trong ngành công nghiệp xây dựng.";
        var typeWrite = () => {
            if (i < text.length && h1Ref.current) {
                h1Ref.current.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWrite, 80);
            }
        };
        var time = () => {
            setTimeout(() => {
                typeWrite();
            }, 2000);
        };
        document.addEventListener("scroll", () => {
            if (window.scrollY === 400) {
                time();
            }
        });
        return () => {
            document.removeEventListener("scroll", () => {
                if (window.scrollY === 400) {
                    time();
                }
            });
        };
    }, []);

    return (
        <div>
            {/* thư viện react-slick */}
            <div
                className={clsx(styles.slider_container)}
                style={{ padding: "24px 0" }}
            >
                <div className="grid wide">
                    <Slider />
                </div>
            </div>

            {/* under legend */}
            <div className={clsx(styles.under_legend)}>
                <div className="grid wide" style={{ height: "100%" }}>
                    <div className="row" style={{ height: "100%" }}>
                        <div className="col l-4">
                            <div
                                className={clsx(styles.under_legend_item)}
                                data-aos="fade-up"
                                data-aos-delay="50"
                            >
                                <div className={clsx(styles.under_legend_img)}>
                                    <video
                                        width="130"
                                        borderradius="20"
                                        preload="auto"
                                        controls={false}
                                        muted
                                        autoPlay
                                        data-play="hover"
                                        loop
                                        playsInline
                                        id="video_backgroud"
                                    >
                                        <source
                                            src="//cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/gif-1.mp4?v=100106980929638375871642089717"
                                            type="video/mp4"
                                        ></source>
                                    </video>
                                    <img
                                        src="//cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/draw-1.png?v=21001993641126917431642089713"
                                        alt="Image"
                                    />
                                </div>
                                <h3>Seacrh</h3>
                                <p>
                                    1500+ bottles <br /> to choose from
                                </p>
                            </div>
                        </div>
                        <div className="col l-4">
                            <div
                                className={clsx(styles.under_legend_item)}
                                data-aos="fade-up"
                                data-aos-delay="100"
                            >
                                <div className={clsx(styles.under_legend_img)}>
                                    <video
                                        width="130"
                                        borderradius="20"
                                        preload="auto"
                                        controls={false}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        id="video_backgroud"
                                    >
                                        <source
                                            src="//cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/gif-2.mp4?v=65327965822726038571642089718"
                                            type="video/mp4"
                                        ></source>
                                    </video>
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/draw-3.png?v=14863949714463418361642089715"
                                        alt="Image"
                                    />
                                </div>
                                <h3>Tap</h3>
                                <p>
                                    Checkout in seconds <br />
                                    with express checkout
                                </p>
                            </div>
                        </div>
                        <div className="col l-4">
                            <div
                                className={clsx(styles.under_legend_item)}
                                data-aos="fade-up"
                                data-aos-delay="150"
                            >
                                <div className={clsx(styles.under_legend_img)}>
                                    <video
                                        width="130"
                                        borderradius="20"
                                        preload="auto"
                                        controls={false}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        id="video_backgroud"
                                    >
                                        <source
                                            src="//cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/gif-4.mp4?v=81052329630051545831642089718"
                                            type="video/mp4"
                                        ></source>
                                    </video>
                                    <img
                                        src="https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/draw-2.png?v=36843252368110017251642089714"
                                        alt="Image"
                                    />
                                </div>
                                <h3>Drink</h3>
                                <p>
                                    Delivered to your <br /> door within days
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* catalog_wrap */}
            <div className={clsx(styles.catalog_wrap_container)}>
                {/* Sản phẩm nổi bật */}
                <div className="grid wide">
                    <ProductsFeatured title="Sản phẩm nổi bật" />
                </div>
            </div>

            {/* slider_3d_container */}
            <div className={clsx(styles.slider_3d)}>
                {/* slider_3d */}
                <div className="grid wide">
                    <div className={clsx(styles.slider_3d_content)}>
                        <div className={clsx(styles.slider_3d_wrap)}>
                            <Slider_3d />
                        </div>
                        <div className={clsx(styles.slider_3d_title)}>
                            <p>
                                TheBottleHaus.com (hereinafter the “Website” or
                                “Site”) is an online store owned and operated by
                                The Bottle Haus, a California company
                                (hereinafter “The Bottle Haus”). All prices are
                                subject to change without notice. The Bottle
                                Haus is not responsible for typographical errors
                                and reserves the right to change incorrect
                                pricing at its sole and absolute discretion. The
                                Bottle Haus reserves the right, at its sole and
                                absolute discretion, to revise these terms and
                                conditions at any time. Your continued and
                                ongoing use of the Website following any such
                                changes acknowledges your acceptance of those
                                changes and their applicability to you. If you
                                do not agree with these terms and conditions of
                                use, please do not use this Website.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* //RARE_CONTAINER */}
            <div className={clsx(styles.rare_container)}>
                <div className="grid wide">
                    <div style={{ position: "relative" }}>
                        <div className={clsx(styles.rare_text)}>
                            <div className={clsx(styles.rare_text_center)}>
                                <h3 className={clsx(styles.text_stroke)}>
                                    RARE & HARD TO FIND
                                </h3>
                                {/* <img
                                    src="//cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/rare_stroke-img.svg?v=163658585255637154151642089736"
                                    alt="Image"
                                    className={clsx(
                                        styles.rare_text_center_img
                                    )}
                                ></img> */}
                            </div>
                            <div className={clsx(styles.rare_text_left)}>
                                <h3
                                    className={clsx(styles.rare_text_left_wrap)}
                                >
                                    Louis XIII Cognac
                                </h3>

                                <p>The oldest being over 100 years old</p>
                            </div>
                            <img
                                src="https://cdn.shopify.com/s/files/1/0313/6228/5699/files/rare_bottle-img.png?v=1637215460"
                                className={clsx(styles.rare_text_img)}
                                alt="Image Rare"
                            />
                            <div className={clsx(styles.rare_text_right)}>
                                <h3
                                    className={clsx(
                                        styles.rare_text_right_wrap
                                    )}
                                >
                                    The Bottle Haus's team of <br />{" "}
                                    connoisseurs have done all the hard <br />{" "}
                                    work for you.
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className={clsx(styles.rare_products_list)}>
                        <div className="row">
                            {dataProdcuts.map((item) => {
                                return (
                                    <div className="col l-3" key={item.id}>
                                        <ProductCard item={item} />
                                    </div>
                                );
                            })}
                        </div>
                        <h2>
                            Whether you're sending a gift to someone special or
                            simply just adding <br /> to your collection, let
                            The Bottle Haus be your one stop shop for <br />
                            everything rare.
                        </h2>
                        <div className={clsx(styles.btn_show_all)}>
                            <NavLink
                                to="/"
                                className={clsx(styles.btn_show_all_link)}
                            >
                                <p>Show all</p>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customs_review */}
            <div className={clsx(styles.customers_reviews_container)}>
                <div className="grid wide">
                    <div className={clsx(styles.customers_reviews_text)}>
                        <h1 className={clsx(styles.text_fill)}>
                            Read what others
                        </h1>
                        <h2 className={clsx(styles.text_stroke)}>Are Saying</h2>
                    </div>
                    <div className={clsx(styles.customers_reviews_slider)}>
                        <div className="grid wide">
                            <SliderReviews />
                        </div>
                    </div>
                </div>
            </div>

            {/* SliderDow */}
            <div className={clsx(styles.slider_dow_container)}>
                <div className="grid wide">
                    <SliderDow />
                </div>
            </div>

            {/* //FEATURES_container */}
            <div className={clsx(styles.features_collections)}>
                <div className="grid wide">
                    <div className={clsx(styles.features_collections_text)}>
                        <div className={clsx(styles.text_fill)}>Feature</div>
                        <div className={clsx(styles.text_stroke)}>
                            Collections
                        </div>
                    </div>
                    <div className={clsx(styles.content_link)}>
                        <div
                            className={clsx(styles.float_height)}
                            style={{ width: "70%" }}
                        >
                            <div className="flex" style={{ height: "50%" }}>
                                <div
                                    className={clsx(styles.content_item_1)}
                                    style={{ flex: "1" }}
                                    data-aos="fade-down-right"
                                    data-aos-delay="50"
                                    data-aos-offset="0"
                                    data-aos-easing="linear"
                                    data-aos-duration="500"
                                >
                                    <NavLink to="/">
                                        <p
                                            className={clsx(
                                                styles.content_heading
                                            )}
                                        >
                                            Facebook
                                        </p>
                                        <div
                                            className={clsx(styles.content_img)}
                                            style={{
                                                backgroundImage:
                                                    "url(https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/Champane.png?v=9858192519269513351642089687)",
                                            }}
                                        ></div>
                                    </NavLink>
                                </div>
                                <div
                                    className="flex"
                                    style={{
                                        flexWrap: "wrap",
                                        flexDirection: "column",
                                    }}
                                >
                                    <div
                                        className={clsx(styles.content_item_2)}
                                        data-aos="fade-down-right"
                                        data-aos-delay="100"
                                        data-aos-offset="0"
                                        data-aos-easing="linear"
                                        data-aos-duration="800"
                                    >
                                        <NavLink to="/">
                                            <p
                                                className={clsx(
                                                    styles.content_heading
                                                )}
                                            >
                                                Facebook
                                            </p>
                                            <div
                                                className={clsx(
                                                    styles.content_img
                                                )}
                                                style={{
                                                    backgroundImage:
                                                        "url(https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/Liqueuer.png?v=4349399019452901951642089726)",
                                                }}
                                            ></div>
                                        </NavLink>
                                    </div>
                                    <div
                                        className={clsx(styles.content_item_2)}
                                        data-aos="fade-down-right"
                                        data-aos-delay="400"
                                        data-aos-offset="0"
                                        data-aos-easing="linear"
                                        data-aos-duration="900"
                                    >
                                        <NavLink to="/">
                                            <p
                                                className={clsx(
                                                    styles.content_heading
                                                )}
                                            >
                                                Facebook
                                            </p>
                                            <div
                                                className={clsx(
                                                    styles.content_img
                                                )}
                                                style={{
                                                    backgroundImage:
                                                        "url(https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80)",
                                                }}
                                            ></div>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>

                            <div className="flex" style={{ height: "50%" }}>
                                <div
                                    className={clsx(styles.content_item_2)}
                                    data-aos="fade-down-left"
                                    data-aos-delay="150"
                                    data-aos-offset="0"
                                    data-aos-easing="linear"
                                    data-aos-duration="1100"
                                >
                                    <NavLink to="/">
                                        <p
                                            className={clsx(
                                                styles.content_heading
                                            )}
                                        >
                                            Facebook
                                        </p>
                                        <div
                                            className={clsx(styles.content_img)}
                                            style={{
                                                backgroundImage:
                                                    "url(https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/Cognac.png?v=65697864465483199331642089689)",
                                            }}
                                        ></div>
                                    </NavLink>
                                </div>
                                <div
                                    className={clsx(styles.content_item_2)}
                                    data-aos="fade-down-left"
                                    data-aos-delay="400"
                                    data-aos-offset="0"
                                    data-aos-easing="linear"
                                    data-aos-duration="1100"
                                >
                                    <NavLink to="/">
                                        <p
                                            className={clsx(
                                                styles.content_heading
                                            )}
                                        >
                                            Facebook
                                        </p>
                                        <div
                                            className={clsx(styles.content_img)}
                                            style={{
                                                backgroundImage:
                                                    "url(https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80)",
                                            }}
                                        ></div>
                                    </NavLink>
                                </div>
                                <div
                                    className={clsx(styles.content_item_2)}
                                    data-aos="fade-down-left"
                                    data-aos-delay="450"
                                    data-aos-offset="0"
                                    data-aos-easing="linear"
                                    data-aos-duration="1100"
                                >
                                    <NavLink to="/">
                                        <p
                                            className={clsx(
                                                styles.content_heading
                                            )}
                                        >
                                            Facebook
                                        </p>
                                        <div
                                            className={clsx(styles.content_img)}
                                            style={{
                                                backgroundImage:
                                                    "url(https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/Rum.png?v=59420678705492364741642089739)",
                                            }}
                                        ></div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div
                            className={clsx(styles.float_height)}
                            style={{ width: "15%" }}
                        >
                            <div
                                className="flex"
                                style={{
                                    flexDirection: "column",
                                    height: "100%",
                                }}
                            >
                                <div
                                    className={clsx(styles.content_item_2)}
                                    data-aos="fade-down-right"
                                    data-aos-delay="100"
                                    data-aos-offset="0"
                                    data-aos-easing="linear"
                                    data-aos-duration="700"
                                >
                                    <NavLink to="/">
                                        <p
                                            className={clsx(
                                                styles.content_heading
                                            )}
                                        >
                                            Facebook
                                        </p>
                                        <div
                                            className={clsx(styles.content_img)}
                                            style={{
                                                backgroundImage:
                                                    "url(https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/Wine.png?v=147209919728934386821642089765)",
                                            }}
                                        ></div>
                                    </NavLink>
                                </div>
                                <div
                                    className={clsx(styles.content_item_4)}
                                    data-aos="fade-down-right"
                                    data-aos-delay="200"
                                    data-aos-offset="0"
                                    data-aos-easing="linear"
                                    data-aos-duration="650"
                                >
                                    <NavLink to="/">
                                        <p
                                            className={clsx(
                                                styles.content_heading
                                            )}
                                        >
                                            Facebook
                                        </p>
                                        <div
                                            className={clsx(styles.content_img)}
                                            style={{
                                                backgroundImage:
                                                    "url(https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/Vodka.png?v=6157743395413032501642089764)",
                                            }}
                                        ></div>
                                    </NavLink>
                                </div>
                                <div
                                    className={clsx(styles.content_item_2)}
                                    data-aos="fade-down-right"
                                    data-aos-delay="150"
                                    data-aos-offset="0"
                                    data-aos-easing="linear"
                                    data-aos-duration="600"
                                >
                                    <NavLink to="/">
                                        <p
                                            className={clsx(
                                                styles.content_heading
                                            )}
                                        >
                                            Facebook
                                        </p>
                                        <div
                                            className={clsx(styles.content_img)}
                                            style={{
                                                backgroundImage:
                                                    "url(https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/Whiskey.png?v=30541173243483273651642089765)",
                                            }}
                                        ></div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div
                            className={clsx(styles.float_height)}
                            style={{ width: "15%" }}
                        >
                            <div
                                className="flex"
                                style={{
                                    flexDirection: "column",
                                    height: "100%",
                                }}
                            >
                                <div
                                    className={clsx(styles.content_item_2)}
                                    data-aos="fade-down-left"
                                    data-aos-delay="200"
                                    data-aos-offset="0"
                                    data-aos-easing="linear"
                                    data-aos-duration="800"
                                >
                                    <NavLink to="/">
                                        <p
                                            className={clsx(
                                                styles.content_heading
                                            )}
                                        >
                                            Facebook
                                        </p>
                                        <div
                                            className={clsx(styles.content_img)}
                                            style={{
                                                backgroundImage:
                                                    "url(https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80)",
                                            }}
                                        ></div>
                                    </NavLink>
                                </div>
                                <div
                                    className={clsx(styles.content_item_3)}
                                    data-aos="fade-down-left"
                                    data-aos-delay="100"
                                    data-aos-offset="0"
                                    data-aos-easing="linear"
                                    data-aos-duration="700"
                                >
                                    <NavLink to="/">
                                        <p
                                            className={clsx(
                                                styles.content_heading
                                            )}
                                        >
                                            Facebook
                                        </p>
                                        <div
                                            className={clsx(styles.content_img)}
                                            style={{
                                                backgroundImage:
                                                    "url(https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/Haus.png?v=142052691175864194651642089723)",
                                            }}
                                        ></div>
                                    </NavLink>
                                </div>
                                <div
                                    className={clsx(styles.content_item_4)}
                                    data-aos="fade-down-left"
                                    data-aos-delay="150"
                                    data-aos-offset="0"
                                    data-aos-easing="linear"
                                    data-aos-duration="800"
                                >
                                    <NavLink to="/">
                                        <p
                                            className={clsx(
                                                styles.content_heading
                                            )}
                                        >
                                            Facebook
                                        </p>
                                        <div
                                            className={clsx(styles.content_img)}
                                            style={{
                                                backgroundImage:
                                                    "url(https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80)",
                                            }}
                                        ></div>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* our_blog_container */}
            <div className={clsx(styles.our_blog_container)}>
                <div className={clsx(styles.our_blog_wrap)}>
                    <div className="grid wide">
                        <div className="row">
                            <div className="col l-3">
                                <div className={clsx(styles.our_blog_text)}>
                                    <h2> Our Blog </h2>
                                    <p
                                        className={clsx(
                                            styles.our_blog_text_description
                                        )}
                                    >
                                        To create this extraordinary blend,
                                        crown blender and infused with the juicy
                                        flavor
                                    </p>

                                    <a
                                        href="/"
                                        className={clsx(styles.our_blog_link)}
                                    >
                                        <button
                                            type="button"
                                            className={clsx(
                                                styles.our_blog_btn
                                            )}
                                        >
                                            <p>Read All</p>
                                        </button>
                                    </a>
                                </div>
                            </div>
                            <div className="col l-3">
                                <div className={clsx(styles.our_blog_item)}>
                                    <a
                                        href="/"
                                        className={clsx(
                                            styles.our_blog_item_link
                                        )}
                                    >
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0313/6228/5699/articles/gettyimages-515421956_grande.jpg?v=1658187098"
                                            className={clsx(
                                                styles.our_blog_img
                                            )}
                                            alt="Image"
                                        />
                                        <h3>
                                            What’s The Best Gin For Tom Collins?
                                        </h3>
                                        <p>
                                            Posted by{" "}
                                            <span>The Bottle Haus</span> <br />
                                            •March 1, 2022
                                        </p>
                                    </a>
                                </div>
                            </div>
                            <div className="col l-3">
                                <div className={clsx(styles.our_blog_item)}>
                                    <a
                                        href="/"
                                        className={clsx(
                                            styles.our_blog_item_link
                                        )}
                                    >
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0313/6228/5699/articles/Screen_Shot_2022-07-18_at_4.36.19_PM_grande.png?v=1658187434"
                                            className={clsx(
                                                styles.our_blog_img
                                            )}
                                            alt="Image"
                                        />
                                        <h3>Best Tequila Under $100</h3>
                                        <p>
                                            Posted by{" "}
                                            <span>The Bottle Haus</span> <br />
                                            •March 1, 2022
                                        </p>
                                    </a>
                                </div>
                            </div>
                            <div className="col l-3">
                                <div className={clsx(styles.our_blog_item)}>
                                    <a
                                        href="/"
                                        className={clsx(
                                            styles.our_blog_item_link
                                        )}
                                    >
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0313/6228/5699/articles/blog10_grande.png?v=1646128757"
                                            className={clsx(
                                                styles.our_blog_img
                                            )}
                                            alt="Image"
                                        />
                                        <h3>
                                            What is the best gin for a French
                                            75?
                                        </h3>
                                        <p>
                                            Posted by{" "}
                                            <span>The Bottle Haus</span> <br />
                                            •March 1, 2022
                                        </p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Main;
