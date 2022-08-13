import React, { useEffect, useMemo, useRef, useState } from "react";
// import PropTypes from 'prop-types';
import styles from "./CheckOut.module.scss";
import clsx from "clsx";
import SvgIcon from "svg";
import { getParent } from "util/RandomProduct";
import "./CheckOut.css";
import convertPrice from "util/convertNumber";

import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
// import User from '../User/User';
import UserFormik from "../User/UserFormik/UserFormik";
import { addUser } from "redux/userInfo";

import "./Notics.css";
import { NavLink, useNavigate } from "react-router-dom";
import CartItem from "../ShoppingCart/CartItem";

CheckOut.propTypes = {};

function CheckOut() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // thông tin khách Hàng
    const users = useSelector((state) => state.usersInfo);
    // các sản phẩm trong giỏ hàng
    const data = useSelector((state) => state.productsCart);
    const dataProdcuts = useMemo(() => [...data], [data]);
    const [total, setTotal] = useState(0);
    const [shipper, setShipper] = useState(0);
    const userRef = useRef();

    useEffect(() => {
        const total = dataProdcuts.reduce((acc, k) => {
            const t = Number(k.price) * Number(k.quantily);
            return acc + t;
        }, 0);
        setTotal(total);
    }, [dataProdcuts]);

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

    // Submit
    const handleSubmitContinue = (values) => {
        const usersLength = users.length;
        const user = { ...values, id: usersLength };
        const action = addUser(user);
        dispatch(action);
        setActiveSubmit(!activeSubmit);

        // tạo bảng thông tin khách Hàng
        const a = document.createElement("div");
        a.classList.add("notice");
        a.innerHTML = `
            <div class='notice_icon'>
                <img src="https://img.icons8.com/external-flatarticons-blue-flatarticons/65/000000/external-info-hotel-services-flatarticons-blue-flatarticons.png" alt='Info'/>
            </div>
            <div class='notice_body'>
                <h3 class='notice_title'>Thông tin khách hàng:</h3>
                <p>Họ tên: ${values.fullname}</p>
                <p>Số điện thoại: ${values.billing_address_phone}</p>
                <p>Địa chỉ gửi hàng: ${values.province}</p>
                <p>Mô tả số đường, tên đường: ${values.billing_address}</p>
            </div>
            <div class='notice_close'>
                <img src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-delete-user-interface-flatart-icons-flat-flatarticons.png" alt='close'/>
            </div>
        `;

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
            userRef.current.appendChild(a);
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
    const handleSubmit = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                navigate("/cart");
                resolve(true);
            }, 1000);
        });
    };
    return (
        <div className={clsx(styles.checkout_details_container)}>
            <div className="grid wide">
                <div className={clsx(styles.checkout_details)}>
                    <div className={clsx(styles.checkout_details_main)}>
                        <NavLink
                            to="/home"
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
                            {/* <User 
                    activeSubmit={activeSubmit}
                    handleSubmit={handleSubmit}    
                /> */}
                            <div
                                className={clsx(styles.customer_infor_heading)}
                            >
                                <h1>Contact information</h1>
                                <span>
                                    Already have an account?
                                    <NavLink to="/login">Login</NavLink>
                                </span>
                            </div>
                            <UserFormik handleSubmit={handleSubmitContinue} />
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
                                                src="https://img.icons8.com/external-itim2101-lineal-itim2101/40/000000/external-banking-finance-itim2101-lineal-itim2101-1.png"
                                                alt="Banking"
                                            />
                                        </div>
                                    </div>
                                    {/* <div 
                                className={clsx(styles.checkout_method_item, {[styles.active]: Number(dataSet) === 2})}
                                onClick={handleClickMethod}
                                ref={methodItemRef}
                                data-index='2'
                            >
                                <p>Momo</p>
                                <div className={clsx(styles.checkout_method_logo)}>
                                    <img 
                                        className={clsx(styles.momo_logo)} src={SvgIcon.MOMO_ICON} 
                                        alt='MOMO' />
                                </div>
                            </div> */}
                                    <div
                                        className={clsx(
                                            styles.checkout_method_item,
                                            {
                                                [styles.active]:
                                                    Number(dataSet) === 3,
                                            }
                                        )}
                                        onClick={handleClickMethod}
                                        ref={methodItemRef}
                                        data-index="3"
                                    >
                                        <p>Thanh toán khi nhận hàng</p>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                            <div className={clsx(styles.checkout_method_qr)}>
                                <img
                                    src="./../../../assets/image/qr.jpg"
                                    alt="QR"
                                />
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
                                            (shipper + total).toString()
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
                                {/* <div className={clsx(styles.form_checkbox)}>
                            <input type='checkbox' name='xacnhan' value='yes' className={clsx(styles.form_checkbox_input)} />
                            <p>
                                Khách hàng có thể chọn hình thức chuyển trước 50% tổng số tiền phải thanh toán, sau khi nhận hàng thì thanh toán số tiền còn lại.
                            </p>
                        </div> */}
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
                            <div className={clsx(styles.btn_submit)}>
                                <button
                                    className={clsx(styles.btn)}
                                    onClick={handleSubmit}
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles.checkout_details_notice)}>
                        {/* <div
                            className={clsx(styles.checkout_warning)}
                            data-aos="fade-up"
                            data-aos-easing="ease-out"
                            data-aos-duration="600"
                        >
                            <div className={clsx(styles.header)}>
                                <img
                                    src="https://img.icons8.com/emoji/36/000000/warning-emoji.png"
                                    alt="Warning"
                                />
                                <p> Lưu ý trước khi đặt hàng: </p>
                            </div>
                            <p className={clsx(styles.title)}>
                                - Do các sản phẩm có kích thước lớn nên chi phí
                                tiền gửi hàng có thể lớn tại một số tỉnh, thành
                                phố. <br />- Tại một số tỉnh, thành phố cửa hàng
                                sẽ gửi bằng các xe khách thường xuyên di chuyển
                                qua khu vực, do vậy khách hàng có thể phải di
                                chuyển một đoạn đường để nhận hàng.
                            </p>
                            <p>
                                - Thời gian hoàn thành sản phẩm và thời gian
                                giao hàng có thể lâu hơn dự kiến.
                            </p>
                            <p>Mong khách hàng thông cảm</p>
                        </div> */}
                        <div
                            className={clsx(styles.product_cart)}
                            data-aos="fade-up"
                            data-aos-easing="ease-out"
                            data-aos-duration="800"
                        >
                            <div className={clsx(styles.product_cart_list)}>
                                {dataProdcuts.map((item) => {
                                    return <CartItem item={item} />;
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
                                    <p>{`$${convertPrice(
                                        total.toString()
                                    )} `}</p>
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
                                    >{`USD $${convertPrice(
                                        (shipper + total).toString()
                                    )}`}</h1>
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
