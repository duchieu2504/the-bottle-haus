import clsx from "clsx";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { showPageLogin } from "redux/Login";
import styles from "./PageLogin.module.scss";

import firebase, { auth, db } from "firebase/config";
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import SvgIcon from "svg";
import { useState } from "react";
import FormSignUp from "./FormSignUp";

const fbProvider = new firebase.auth.FacebookAuthProvider();

const PageLogin = () => {
    const [showPageSignUp, setShowPageSignUp] = useState(false);
    const dispatch = useDispatch();
    const activeLogin = useSelector((state) => state.activeLogin.active);
    const handleClickClose = () => {
        const action = showPageLogin(activeLogin);
        dispatch(action);
    };

    const handleLoginFace = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(
            fbProvider
        );

        // Nếu là người dùng mới thì sẽ lưu vào firestore database
        if (additionalUserInfo?.isNewUser) {
            await addDoc(collection(db, "users"), {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                date: null, // ngày sinh khách hàng
                //     // lastOnline: firebase.firestore.FieldValue.serverTimestamp(),
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
            return;
        }
    };

    const handleClickAction = async (id, values) => {
        if (id === 1) {
            try {
                let email = "zero250401@gmail.com";
                let password = "123456";
                const res = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                console.log(res);
                const user = res.user;
                if (user.emailVerified) {
                } else {
                    console.log("Verified email");
                }
                // login
            } catch (error) {
                console.log("Lỗi ");
            }
        } else if (id === 2) {
            //  đăng ký
            try {
                const { email_signUp, password_signUp, fullName_signUp } =
                    values;
                let email = email_signUp;
                let password = password_signUp;
                const response = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const user = response.user;
                await sendEmailVerification(user);
                if (user.emailVerified) {
                    await addDoc(collection(db, "users"), {
                        displayName: fullName_signUp,
                        email: email_signUp,
                        photoURL: null,
                        uid: user.uid,
                        providerId: user.providerData.providerId,
                        date: null,
                        createdAt:
                            firebase.firestore.FieldValue.serverTimestamp(),
                    });
                    return response;
                } else {
                    return;
                }
            } catch (error) {
                console.log("Error");
            }
        } else {
            return;
        }
    };
    return (
        <div
            className={clsx(styles.pageLogin_container, {
                [styles.active]: activeLogin,
            })}
        >
            <div className={clsx(styles.pageLogin_overlay)}></div>
            <div
                className={clsx(styles.pageLogin_wrap, {
                    [styles.showPageSignUp]: showPageSignUp === true,
                })}
            >
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
                {/* // SIgn IN */}

                <div className={clsx(styles.pageLogin_content_signIn)}>
                    <div className={clsx(styles.pageLogin_content_header)}>
                        <h1>Sign in</h1>
                        <p>
                            Don't have an account yet?{" "}
                            <button
                                type="button"
                                className={clsx(
                                    styles.pageLogin_content_header_btn
                                )}
                                onClick={() => setShowPageSignUp(true)}
                            >
                                Sign up here
                            </button>
                        </p>
                    </div>
                    <div className={clsx(styles.pageLogin_content_social)}>
                        <button
                            type="button"
                            className={clsx(
                                styles.pageLogin_content_social_link
                            )}
                            onClick={handleLoginFace}
                        >
                            <div
                                className={clsx(
                                    styles.pageLogin_content_social_logo
                                )}
                            >
                                <img
                                    src={SvgIcon.FACEBOOK_ICON2}
                                    alt="facebook icon"
                                />
                            </div>
                            <p>Login</p>
                        </button>
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
                                    Password
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
                        <button
                            type="submit"
                            onClick={(values) => handleClickAction(1, values)}
                        >
                            Sign in
                        </button>
                    </div>
                    <div
                        className={clsx(styles.close, {
                            [styles.open]: !activeLogin,
                        })}
                        onClick={handleClickClose}
                    ></div>
                </div>

                {/* // SIgn UP */}
                <div className={clsx(styles.pageLogin_content_signUp)}>
                    <div className={clsx(styles.pageLogin_content_header)}>
                        <h1>Sign up</h1>
                        <p>
                            You have an account yet?
                            <button
                                type="button"
                                className={clsx(
                                    styles.pageLogin_content_header_btn
                                )}
                                onClick={() =>
                                    setShowPageSignUp(!showPageSignUp)
                                }
                            >
                                Sign in here
                            </button>
                        </p>
                    </div>

                    <div className={clsx(styles.pageLogin_content_form_signUp)}>
                        <FormSignUp
                            handleSubmit={(values) =>
                                handleClickAction(2, values)
                            }
                        />
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
