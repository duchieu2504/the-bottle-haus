import React from "react";
import clsx from "clsx";
import styles from "./Footer.module.scss";

const Footer = () => {
    return (
        <footer>
            <div className={clsx(styles.footer)}>
                <div className="grid wide">
                    <div className="row">
                        <div className="col c-12 l-3">
                            <h2>Proposition 65 Warning</h2>
                            <p>
                                WARNING: Drinking distilled spirits, beer,
                                coolers, wine and other alcoholic beverages may
                                increase cancer risk, and, during pregnancy, can
                                cause birth defects. For more information go to
                                www.P65Warnings.ca.gov/alcohol
                            </p>
                        </div>
                        <div className="col c-12 l-6">
                            <div className={clsx(styles.text_center)}>
                                <h2>Newsleter</h2>
                                <p>
                                    Subscribe to be the first to hear about our
                                    exclusive offers <br />
                                    and latest arrivals.
                                </p>
                                <form
                                    className={clsx(styles.form_email)}
                                    action="#"
                                    method=""
                                >
                                    <input
                                        name="email"
                                        type="text"
                                        id="email"
                                        className={clsx(styles.form_control)}
                                        placeholder="Email"
                                    />
                                    <button
                                        type="submit"
                                        className={clsx(styles.form_button)}
                                    >
                                        Go
                                    </button>
                                </form>
                                <div className={clsx(styles.text_payment)}>
                                    <span>Accepted</span>
                                    <span>Payments</span>
                                </div>
                                <div
                                    className={clsx(styles.payments_list)}
                                ></div>
                                <h4>Please Drink Responsibly</h4>
                            </div>
                        </div>
                        <div className="col c-12 l-3">
                            <div className={clsx(styles.text_right)}>
                                <h2>Resources</h2>
                                <div className={clsx(styles.resources_list)}>
                                    <li className={clsx(styles.resources_item)}>
                                        <a href="/">Terms and Conditions</a>
                                    </li>
                                    <li className={clsx(styles.resources_item)}>
                                        <a href="/">Privacy Policy</a>
                                    </li>
                                    <li className={clsx(styles.resources_item)}>
                                        <a href="/">Shipping & Return Policy</a>
                                    </li>
                                    <li className={clsx(styles.resources_item)}>
                                        <a href="/">Contact Us</a>
                                    </li>
                                    <li className={clsx(styles.resources_item)}>
                                        <a href="/">Order Tracking </a>
                                    </li>
                                    <li className={clsx(styles.resources_item)}>
                                        <a href="/">Terms of Service</a>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
