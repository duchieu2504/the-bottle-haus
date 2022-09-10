import clsx from "clsx";
import React, { useEffect } from "react";
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
    updateProfile,
    sendPasswordResetEmail,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import SvgIcon from "svg";
import { useState } from "react";
import FormSignUp from "./FormSignUp";
import FormSignIn from "./FormSignIn";
import FormForgot from "./FormForgot";

const fbProvider = new firebase.auth.FacebookAuthProvider();

const PageLogin = () => {
    const [showPageSignUp, setShowPageSignUp] = useState(false);
    const [showPageVerify, setShowPageVerify] = useState(false);
    const [showPageForgotPassword, setShowPageForgotPassword] = useState(false);
    const [user, setUser] = useState("");

    const [errorLogin, setErrorLogin] = useState("");
    const [isTimeSendMail, setIsTimeSendMail] = useState(false);
    const [timeSendMail, setTimeSendMail] = useState(15);

    const dispatch = useDispatch();
    const activeLogin = useSelector((state) => state.activeLogin.active);
    const handleClickClose = () => {
        const action = showPageLogin(activeLogin);
        dispatch(action);
    };

    useEffect(() => {
        const time = setTimeout(() => {
            if (isTimeSendMail) {
                setTimeSendMail(timeSendMail - 1);
                if (timeSendMail === 1) {
                    setIsTimeSendMail(false);
                    return;
                }
            } else {
                return;
            }
        }, 1000);
        return () => clearTimeout(time);
    }, [timeSendMail, isTimeSendMail]);
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
        switch (id) {
            //  đăng nhập
            case 1: {
                try {
                    const { email_signIn, password_signIn } = values;
                    let email = email_signIn;
                    let password = password_signIn;
                    const res = await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );
                    const user = res.user;
                    setUser(auth.currentUser);
                    if (user.emailVerified) {
                        return;
                    } else {
                        await auth.signOut();
                        const action = showPageLogin(false);
                        dispatch(action);
                        await setShowPageVerify(true);
                        console.log("No Verified");
                        return;
                    }
                    // login
                } catch (error) {
                    const errorMessageLogin = {
                        INVALID_PASSWORD: "auth/wrong-password",
                        USER_NOT_FOUND: "auth/user-not-found",
                    };

                    const errorMessage = (error) => {
                        let errorCode = "";
                        switch (error.code) {
                            case errorMessageLogin.INVALID_PASSWORD:
                                errorCode = "INVALID_PASSWORD";
                                break;

                            case errorMessageLogin.USER_NOT_FOUND:
                                errorCode = "USER_NOT_FOUND";
                                break;

                            default:
                                console.log(`Orther`);
                                break;
                        }
                        return errorCode;
                    };
                    setErrorLogin(errorMessage(error));
                }
                break;
            }
            //  đăng ký
            case 2: {
                try {
                    const { email_signUp, password_signUp, fullName_signUp } =
                        values;
                    let email = email_signUp;
                    let password = password_signUp;
                    let displayName = fullName_signUp;
                    let photoURL =
                        "https://graph.facebook.com/1242173403237473/picture";
                    const response = await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password,
                        displayName,
                        photoURL
                    );
                    const user = response.user;
                    setUser(auth.currentUser);
                    await updateProfile(user, {
                        displayName: fullName_signUp,
                        photoURL:
                            "https://graph.facebook.com/1242173403237473/picture",
                    });

                    await console.log("Update successful");
                    // Update successful
                    // ...

                    await addDoc(collection(db, "users"), {
                        displayName: fullName_signUp,
                        email: email,
                        photoURL:
                            "https://graph.facebook.com/1242173403237473/picture",
                        uid: user.uid,
                        providerId: user.providerData[0].providerId,
                        date: null,
                        createdAt:
                            firebase.firestore.FieldValue.serverTimestamp(),
                    });
                    if (!user.emailVerified) {
                        await auth.signOut();
                        const action = showPageLogin(false);
                        dispatch(action);
                        await setShowPageVerify(true);
                    }
                } catch (error) {
                    const errorCode = error.code;
                    console.log("Error");
                }
            }
            case 3: {
                try {
                    console.log(values);
                    const actionCodeSettings = {
                        url: "http://localhost:3000/the-bottle-haus/home",
                        handleCodeInApp: true,
                    };
                    await sendPasswordResetEmail(
                        auth,
                        values.email_forgot,
                        actionCodeSettings
                    );
                    await console.log("SUCCESS SEND EMAIL FORGOT PASSWORD");
                } catch (error) {}
                break;
            }
            default: {
                console.log("Default");
                break;
            }
        }
        // if (id === 1) {
        // } else if (id === 2) {
        //     //  đăng ký
        // } else {
        //     return;
        // }
    };

    const handleActionVerifyEmail = async () => {
        const actionCodeSettings = {
            url: "http://localhost:3000/the-bottle-haus/home",
            handleCodeInApp: true,
        };
        await sendEmailVerification(user, actionCodeSettings);
        await setIsTimeSendMail(true);
    };

    const handleActionForgotPassword = async () => {
        const actionCodeSettings = {
            url: "http://localhost:3000/the-bottle-haus/home",
            handleCodeInApp: true,
        };
        // await sendPasswordResetEmail(user, email, actionCodeSettings);
        // await setIsTimeSendMail(true);
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
                    [styles.showPageVerify]: showPageVerify === true,
                    [styles.showPageForgotPassword]:
                        showPageForgotPassword === true,
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
                                onClick={() => {
                                    setShowPageSignUp(true);
                                    setShowPageForgotPassword(false);
                                }}
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
                        <FormSignIn
                            handleClickClose={handleClickClose}
                            handleSubmit={(values) =>
                                handleClickAction(1, values)
                            }
                        />
                    </div>
                    <div className={clsx(styles.pageLogin_content_forgot_pass)}>
                        <button
                            className={clsx(
                                styles.pageLogin_content_forgot_btn
                            )}
                            onClick={() => setShowPageForgotPassword(true)}
                        >
                            Forgot Password
                        </button>
                    </div>
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
                                onClick={() => {
                                    setShowPageSignUp(false);
                                    setShowPageForgotPassword(false);
                                }}
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
                </div>

                {/* Verify Email */}
                <div
                    className={clsx(styles.emailVerified, {
                        [styles.showTimeVerify]: isTimeSendMail === true,
                    })}
                >
                    <div className={clsx(styles.emailVerified_wrap)}>
                        <p className={clsx(styles.emailVerified_title)}>
                            For security reasons. Please verify this gmail is
                            yours. We will send you a gmail for verification,
                            please check in spam box
                        </p>
                        <div>
                            <img
                                src="https://img.icons8.com/external-icongeek26-outline-colour-icongeek26/64/000000/external-send-mail-communication-icongeek26-outline-colour-icongeek26.png"
                                alt="Send mail Verify"
                            />
                        </div>
                        <div className={clsx(styles.emailVerified_btn)}>
                            <button
                                type="button"
                                onClick={handleActionVerifyEmail}
                            >
                                Send mail
                            </button>
                        </div>
                        <div className={clsx(styles.emailVerified_time)}>
                            {timeSendMail}
                        </div>
                    </div>
                </div>

                {/* Forgot Password */}
                <div className={clsx(styles.pageLogin_content_forgot)}>
                    <div className={clsx(styles.pageLogin_content_header)}>
                        <h1>Forgot Password</h1>
                        <p>
                            You have an account yet?{" "}
                            <button
                                type="button"
                                className={clsx(
                                    styles.pageLogin_content_header_btn
                                )}
                                onClick={() => {
                                    setShowPageSignUp(false);
                                    setShowPageForgotPassword(false);
                                }}
                            >
                                Sign in here
                            </button>
                        </p>
                    </div>
                    <div className={clsx(styles.pageLogin_content_form_forgot)}>
                        <FormForgot
                            handleSubmit={(values) =>
                                handleClickAction(3, values)
                            }
                        />
                    </div>
                </div>

                <div
                    className={clsx(styles.close, {
                        [styles.open]: !activeLogin,
                    })}
                    onClick={handleClickClose}
                ></div>
            </div>
        </div>
    );
};

export default PageLogin;
