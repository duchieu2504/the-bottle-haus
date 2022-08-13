import clsx from "clsx";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clickLogin } from "redux/Login";
import styles from "./PageLogin.module.scss";
const PageLogin = () => {
    const dispatch = useDispatch();
    const activeLogin = useSelector((state) => state.activeLogin.active);
    const handleClickClose = () => {
        const action = clickLogin(activeLogin);
        dispatch(action);
    };
    return (
        <div
            className={clsx(styles.pageLogin_container, {
                [styles.active]: activeLogin,
            })}
        >
            <div className={clsx(styles.pageLogin_overlay)}></div>
            <div className={clsx(styles.pageLogin_wrap)}>
                <div className={clsx(styles.pageLogin_wrap_img)}>
                    <img
                        className={clsx(styles.img)}
                        src="https://cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/Rectangle_69.png?v=126420870272759889431642089737"
                    />
                    <div className={clsx(styles.pageLogin_wrap_img_text)}>
                        <h4>
                            <span>Premium </span>Spirits Shipped <br /> Right To
                            Your Door
                        </h4>
                    </div>
                </div>
                <div className={clsx(styles.pageLogin_content)}>
                    <div className={clsx(styles.pageLogin_content_header)}>
                        <h1>Sign in</h1>
                        <p>
                            Don't have an account yet?
                            <a href="/"> Sign up here</a>
                        </p>
                    </div>
                    <div className={clsx(styles.pageLogin_content_social)}>
                        <a
                            href="/"
                            className={clsx(
                                styles.pageLogin_content_social_link
                            )}
                        >
                            <div
                                className={clsx(
                                    styles.pageLogin_content_social_logo
                                )}
                            >
                                <svg
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18px"
                                    height="18px"
                                    viewBox="0 0 48 48"
                                >
                                    <g>
                                        <path
                                            fill="#EA4335"
                                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                        ></path>
                                        <path
                                            fill="#4285F4"
                                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                        ></path>
                                        <path
                                            fill="#FBBC05"
                                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                        ></path>
                                        <path
                                            fill="#34A853"
                                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                        ></path>
                                        <path
                                            fill="none"
                                            d="M0 0h48v48H0z"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                            <p>Đăng nhập</p>
                        </a>
                    </div>
                    <div className={clsx(styles.pageLogin_content_divider)}>
                        <span>OR</span>
                    </div>
                    <div className={clsx(styles.pageLogin_content_form)}>
                        <form className={clsx(styles.form_submit)}>
                            <div className={clsx(styles.form_group)}>
                                <input
                                    id="email_login"
                                    name="email"
                                    autoComplete="username"
                                    placeholder=" "
                                    type="text"
                                    className={clsx(styles.form_control)}
                                />
                                <label className={clsx(styles.form_label)}>
                                    Email
                                </label>
                                {/* <span className={clsx(styles.form_border)}>
                                    <i></i>
                                </span> */}
                                <span
                                    className={clsx(styles.form_message)}
                                ></span>
                            </div>

                            <div className={clsx(styles.form_group)}>
                                <input
                                    id="password"
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder=" "
                                    type="password"
                                    className={clsx(styles.form_control)}
                                />
                                <label className={clsx(styles.form_label)}>
                                    Mật khẩu
                                </label>
                                {/* <span className={clsx(styles.form_border)}>
                                    <i></i>
                                </span> */}
                                <span
                                    className={clsx(styles.form_message)}
                                ></span>
                            </div>
                        </form>
                    </div>
                    <div className={clsx(styles.pageLogin_content_forgot_pass)}>
                        <a href="/">Forgot Password</a>
                    </div>
                    <div className={clsx(styles.footer)}>
                        <button type="submit">Sign in</button>
                    </div>
                    <div
                        className={clsx(styles.close, {
                            [styles.open]: !activeLogin,
                        })}
                        onClick={handleClickClose}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default PageLogin;
