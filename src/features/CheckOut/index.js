import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
// import PropTypes from 'prop-types';
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "./CheckOut.module.scss";
import "./CheckOut.css";
import "aos/dist/aos.css";
import Image from "assets/image";

import {
    patchOrderUnpaid,
    postOrder,
} from "connectApi/apiServices/orderServices";
import {
    getAddressesDefault,
    postApiAdress,
} from "connectApi/apiServices/addressServices";

import Loading from "component/Loading";
import CartItem from "component/ItemCartShopping";
import UserFormik from "component/FormUser/UserFormik";

import { convertPrice, getParent } from "util/Func";

import { TotalContext } from "dataLocal/Context/TotalProvider";
import { AuthContext } from "dataLocal/Context/AuthProvider";

CheckOut.propTypes = {};

function CheckOut() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //người dùng
    const {
        user: { uid },
    } = useContext(AuthContext);

    //đon hàng
    const ordeProduct = useSelector((state) => state.orderProducts.items);
    const messOrdeProduct = useSelector((state) => state.orderProducts.message);
    const orderUnpaid = useSelector((state) => state.orderUnpaid.items);
    const loadingOrder = useSelector((state) => state.orderUnpaid.loading);
    const [totalUnipad, setTotalUnipad] = useState(0);

    // các sản phẩm trong giỏ hàng
    // const data = useSelector((state) => state.productsCart);
    const dataSession = JSON.parse(sessionStorage.getItem("productIds")) || [];
    const totalSession = JSON.parse(sessionStorage.getItem("total")) || 0;

    const dataProdcuts = useMemo(() => {
        if (uid) {
            if (orderUnpaid.productIds) {
                return [...orderUnpaid.productIds];
            } else {
                return [];
            }
        } else {
            return [...dataSession];
        }
    }, [orderUnpaid]);
    const [shipper, setShipper] = useState(0);
    const [addressDefault, setAddressDefault] = useState();
    const [loading, setLoading] = useState(false);
    const [addressNoUid, setAddressNoUid] = useState({});
    const userRef = useRef();

    const total = useContext(TotalContext);

    // hành động submit
    const [activeSubmit, setActiveSubmit] = useState(false);
    const [dataSet, setDataSet] = useState(1);

    const methodItemRef = useRef();
    const methodItemRefClass = useRef();

    useEffect(() => {
        methodItemRefClass.current =
            methodItemRef.current && methodItemRef.current.className;

        // Click bên ngoài các lựa chọn hình thức thanh toán
        const handleClick = (e) => {
            // if(methodItemRef.current) {
            //     const isCheck = methodItemRef.current.contains(e.target)
            //     if(!isCheck) {
            //         setDataSet(0)
            //     }
            // }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    // tổng tiền phải trả đã có tk
    useEffect(() => {
        if (orderUnpaid) {
            setTotalUnipad(orderUnpaid.totalPrice);
            return;
        }
    }, [loading, orderUnpaid]);

    // lấy địa chỉ mặc định nếu có.
    useEffect(() => {
        const getAddresses = async () => {
            const result = await getAddressesDefault(uid);
            if (result) {
                await setAddressDefault(result);
            }
            await setLoading(true);
        };
        getAddresses();
    }, [uid]);

    // Qay lạ tang home nế ko có san phâm
    useEffect(() => {
        if (uid) {
        } else {
            const dataSession = JSON.parse(
                sessionStorage.getItem("productIds")
            );
            if (!dataSession) {
                navigate("/the-bottle-haus/home");
                return;
            }
        }
    }, []);

    // nế chua có địa chi mặc định thì thông báo khách hàng đã thêm vào địa chi mặc định và cập nhật laj  addess tong  đon hang
    // nếu đã có địa chi mặc định mà muốn sưa thì thông báo đã thêm mới 1  địa chỉ. và cập nhật laj  addess tong  đon hang

    // nếu chưa có tài khoản thì lư mới địa chỉ với  userId: null;
    const handleSubmitContinue = async (values) => {
        // id sản phẩm
        const code = values.fullName;
        // Submit Th có tài khoản ng dùng

        if (uid) {
            if (addressDefault) {
                setActiveSubmit(!activeSubmit);

                return;
            } else {
                const addressUser = {
                    ...values,
                    userId: uid,
                };
                await postApiAdress(addressUser);
                await setActiveSubmit(!activeSubmit);

                await alert("Add a new sign of success");
            }
        } else {
            const orderProduct = {
                ...values,
            };
            setAddressNoUid(orderProduct);
            setActiveSubmit(!activeSubmit);
        }

        if (typeof userRef.current === "object" && !activeSubmit) {
            setTimeout(function () {
                // toastRef.current.removeChild(a);
            }, 4000);
            // a.onclick = function (e) {
            //     if (e.target.closest(".notice_close")) {
            //         toastRef.current.removeChild(a);
            //         clearTimeout(autoRemoveId);
            //     }
            // };
            // userRef.current.appendChild(Notice(values));
        }
    };

    // Lựa chọn phương thức chọn thanh toán
    const handleClickMethod = (e) => {
        if (methodItemRef.current) {
            const isCheck = getParent(
                e.target,
                `.${methodItemRefClass.current}`
            );
            if (isCheck) {
                setDataSet(Number(isCheck.dataset.index));
            }
        }
    };
    // Quay trở lại trang thông tin khách Hàng
    const handleClickPrev = (e) => {
        e.preventDefault();
        setActiveSubmit(!activeSubmit);
    };
    // xác nhận khi đã thanh toán
    const handleSubmit = async () => {
        const productIds = dataProdcuts.map((item) => {
            const { productId, quantily } = item;
            return {
                productId,
                quantily,
            };
        });

        if (uid) {
            const getAddresses = async () => {
                const result = await getAddressesDefault(uid);
                if (result) {
                    return result;
                }
                await setLoading(true);
            };
            const addressDefault1 = await getAddresses();

            await patchOrderUnpaid(uid, {
                unpaid: true,
                address: addressDefault1._id,
            });
        } else {
            const res = await postApiAdress(addressNoUid);
            const _idAdress = await res._id;
            const ordeProductNew = {
                address: _idAdress,
                productIds,
                code: "Hello",
                totalPrice: totalSession.toString(),
                message: messOrdeProduct,
                unpaid: true,
            };
            await postOrder(ordeProductNew);
            console.log("Chuyển khoản thành công");

            sessionStorage.removeItem("productIds");
            sessionStorage.removeItem("total");
            // const action = resetCartProduct([]);
            // dispatch(action);
        }
        navigate("/the-bottle-haus/home");
    };
    return (
        <div className={clsx(styles.checkout_details_container)}>
            <div className="grid wide">
                <div className={clsx(styles.checkout_details)}>
                    <div className={clsx(styles.checkout_details_main)}>
                        <NavLink
                            to="/the-bottle-haus/home"
                            className={clsx(styles.checkout_details_logo)}
                        >
                            <img
                                src="//cdn.shopify.com/s/files/1/0313/6228/5699/files/logo_d7a04cee-992d-4fe7-a757-7113f9927484.png?10308"
                                alt="The Bottle Haus"
                            />
                        </NavLink>
                        <div
                            className={clsx(styles.customer_infor, {
                                [styles.active]: activeSubmit,
                            })}
                            data-aos="fade-up"
                            data-aos-easing="ease-out-back"
                            data-aos-duration="600"
                        >
                            <div
                                className={clsx(styles.customer_infor_heading)}
                            >
                                <h1>Contact information</h1>
                                <span>
                                    Already have an account?
                                    <NavLink to="/the-bottle-haus/login">
                                        Login
                                    </NavLink>
                                </span>
                            </div>
                            {loading ? (
                                <UserFormik
                                    adderss={addressDefault}
                                    handleSubmit={handleSubmitContinue}
                                />
                            ) : (
                                <Loading />
                            )}
                        </div>
                        <div
                            className={clsx(styles.banking, {
                                [styles.active]: activeSubmit,
                            })}
                        >
                            <div
                                className={clsx(styles.prev_icon)}
                                onClick={handleClickPrev}
                            >
                                <img
                                    src="https://img.icons8.com/carbon-copy/100/000000/left-squared.png"
                                    alt="Quay trở lại"
                                />
                                <p>Trở lại</p>
                            </div>
                            <div className={clsx(styles.checkout_method)}>
                                <p>Payments</p>
                                <div
                                    className={clsx(
                                        styles.checkout_method_list
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            styles.checkout_method_item,
                                            {
                                                [styles.active]:
                                                    Number(dataSet) === 1,
                                            }
                                        )}
                                        onClick={handleClickMethod}
                                        ref={methodItemRef}
                                        data-index="1"
                                    >
                                        <p> Banking </p>
                                        <div
                                            className={clsx(
                                                styles.checkout_method_logo_banking
                                            )}
                                        >
                                            <img
                                                className={clsx(
                                                    styles.banking_logo
                                                )}
                                                src="https://img.icons8.com/ios/50/ffffff/merchant-account.png"
                                                alt="Banking"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                            <div className={clsx(styles.checkout_method_qr)}>
                                <div
                                    className={clsx(
                                        styles.checkout_method_qr_img
                                    )}
                                >
                                    <img src={Image.QrImage} alt="QR" />
                                </div>
                                <p>Scan QR code for faster payment</p>
                            </div>
                            <div
                                className={clsx(styles.transfer_method, {
                                    [styles.active]: Number(dataSet) === 1,
                                })}
                            >
                                <div className={clsx(styles.transfer_title)}>
                                    <p>
                                        Click confirm after transferring money
                                        to the account number below. The store
                                        will then contact the customer after
                                        confirming.
                                    </p>
                                </div>
                                <div className={clsx(styles.form_transfer)}>
                                    <p className={clsx(styles.form_header)}>
                                        Bank
                                    </p>
                                    <h1 className={clsx(styles.form_title)}>
                                        Quân đội (MB)
                                    </h1>
                                    {/* <div className={clsx(styles.form_line)}></div> */}
                                </div>
                                <div className={clsx(styles.form_transfer)}>
                                    <p className={clsx(styles.form_header)}>
                                        Account number
                                    </p>
                                    <h1 className={clsx(styles.form_title)}>
                                        888820010425
                                    </h1>
                                </div>
                                <div className={clsx(styles.form_transfer)}>
                                    <p className={clsx(styles.form_header)}>
                                        Account name
                                    </p>
                                    <h1 className={clsx(styles.form_title)}>
                                        NGUYEN DUC HIEU
                                    </h1>
                                </div>
                                <div className={clsx(styles.form_transfer)}>
                                    <p className={clsx(styles.form_header)}>
                                        Amount of money
                                    </p>
                                    <h1 className={clsx(styles.form_title)}>
                                        {convertPrice(
                                            (
                                                Number(shipper) +
                                                Number(totalSession)
                                            ).toString()
                                        )}
                                    </h1>
                                </div>
                                <div className={clsx(styles.form_transfer)}>
                                    <p className={clsx(styles.form_header)}>
                                        Money transfer content
                                    </p>
                                    <h1 className={clsx(styles.form_title)}>
                                        Mã code (chưa viết api)
                                    </h1>
                                </div>
                            </div>
                            <div
                                className={clsx(styles.payment_method, {
                                    [styles.active]: Number(dataSet) === 3,
                                })}
                            >
                                <p>
                                    Do sản phẩm có kích thước và trọng lượng lớn
                                    nên để đảm bảo tính xác thực, khách hàng lựa
                                    chọn hình thức này phải chuyển trước 25%
                                    tổng số tiền, sau khi nhận hàng thành công
                                    sẽ thanh toán khoản tiền còn lại.
                                </p>
                                <p>
                                    Sau khi chuyển khoản thành công tới số tài
                                    khoản hiển thị bên hình thức BANKING thì vui
                                    lòng bấm XÁC NHẬN.
                                </p>
                                <p>Cảm ơn khách hàng</p>
                            </div>
                            <div className={clsx(styles.btn_submit_return)}>
                                <NavLink
                                    to="/the-bottle-haus/cart"
                                    className={clsx(styles.button_return)}
                                >
                                    <img src="https://img.icons8.com/ios-glyphs/30/757575/return.png" />
                                    <button
                                        type="button"
                                        className={clsx(styles.btn_return)}
                                    >
                                        Return
                                    </button>
                                </NavLink>
                                <button
                                    className={clsx(styles.btn_submit)}
                                    onClick={handleSubmit}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles.checkout_details_notice)}>
                        <div
                            className={clsx(styles.product_cart)}
                            data-aos="fade-up"
                            data-aos-easing="ease-out"
                            data-aos-duration="800"
                        >
                            <div className={clsx(styles.product_cart_list)}>
                                {dataProdcuts.map((item) => {
                                    return (
                                        <CartItem key={item.id} item={item} />
                                    );
                                })}
                            </div>
                            <div className={clsx(styles.product_cart_heading)}>
                                {/* <p>{`Bạn đã đặt mua tất cả ${dataProdcuts.length} sản phẩm`}</p> */}
                                <div
                                    className={clsx(
                                        styles.product_cart_heading_title
                                    )}
                                >
                                    <p>Subtotal: </p>
                                    <p>
                                        USD{" "}
                                        {convertPrice(totalUnipad) ||
                                            convertPrice(totalSession)}
                                    </p>
                                </div>
                                <div
                                    className={clsx(
                                        styles.product_cart_heading_title
                                    )}
                                >
                                    <p>Shipping: </p>
                                    <p>{`$${convertPrice(
                                        shipper.toString()
                                    )} `}</p>
                                </div>

                                <div
                                    className={clsx(
                                        styles.product_cart_heading_title
                                    )}
                                >
                                    <p>Total: </p>
                                    <h1
                                        className={clsx(
                                            styles.product_cart_heading_total
                                        )}
                                    >
                                        USD{" "}
                                        {convertPrice(
                                            (
                                                Number(shipper) +
                                                Number(totalUnipad)
                                            ).toString()
                                        ) ||
                                            convertPrice(
                                                (
                                                    Number(shipper) +
                                                    Number(totalSession)
                                                ).toString()
                                            )}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div ref={userRef} id={clsx(styles.notice)}></div>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;
