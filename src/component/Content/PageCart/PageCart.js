import React, { useEffect, useState, useMemo } from 'react';
// import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './PageCart.module.scss';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from 'redux/productsCart';
import convertPrice from 'util/convertNumber';
import { NavLink } from 'react-router-dom';

import 'aos/dist/aos.css';


PageCart.propTypes = {
    
};

function PageCart(props) {
    const dispatch = useDispatch()
    const data = useSelector(state => state.productsCart)
    const dataProdcuts = useMemo(() => [...data], [data])
    
    const [total, setTotal] = useState(0)
    
    useEffect(() => {
        const total = dataProdcuts.reduce((acc, k) => {
            const t = Number(k.price) * Number(k.quantily)
            return acc + t
        }, 0)
        setTotal(total)
    }, [dataProdcuts])
    
    // Xóa sản phẩm ra khỏi giỏ Hàng
    const handleDeleteProduct = (id) => {
        const action = removeProduct(id)
        dispatch(action)
    }

    return (
        <div className={clsx(styles.my_cart)}>
            <div className='grid wide'>
                <div className={clsx(styles.header)}>
                    <p>Giỏ hàng </p>
                    <p>của tôi</p>
                </div>
                <div className={clsx(styles.header_line)}></div>
                <div className={clsx(styles.container)}>
                    <div className={clsx(styles.products)}>
                        <div 
                            className={clsx(styles.products_navbar)}
                            data-aos="fade-up"
                            data-aos-easing='ease'
                        >
                            <p>Sản phẩm</p>
                            <p>Giá</p>
                            <p>Số lượng</p>
                            <p>Tiền</p>
                        </div>
                        <div className={clsx(styles.product)}>
                            { dataProdcuts.length === 0 ?
                                ( 
                                    <div 
                                        className={clsx(styles.no_product)}
                                        data-aos="fade-up"
                                        data-aos-easing="ease-out"
                                    >
                                        <img src="https://img.icons8.com/emoji/36/000000/warning-emoji.png" alt='Warning' />
                                        <p>Bạn chưa có sản phẩm nào, vui lòng chọn mua một sản phẩm</p>
                                    </div>
                                ) :
                                dataProdcuts.map((item, k) => {
                                    const timeDelay = (k + 4) * 50
                                    return (
                                        <div key={item.id}>
                                            <CartItem item={item} timeDelay={timeDelay} handleDeleteProduct={handleDeleteProduct}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div 
                        className={clsx(styles.checkout)}
                        data-aos="fade-up"
                        data-aos-easing='ease'
                    >
                        <div className={clsx(styles.checkout_total)}>
                            <p>Tổng tiền</p>
                            <span>{convertPrice(total.toString())}</span>
                        </div>

                        <div className={clsx(styles.checkout_warning)}>
                            <img src="https://img.icons8.com/emoji/36/000000/warning-emoji.png" alt='Warning' />
                            <p  className={clsx(styles.checkout_warning_title)}>Vui lòng kiểm tra lại các sản phẩm và số lượng sản phẩm trước khi thanh toán.</p>
                        </div>

                        <div  
                            className={clsx(styles.checkout_button)}
                        >
                            <button className={clsx(styles.btn_no_click, {[styles.btn_active]: total === 0})}>Tiếp tục</button>
                            <NavLink to='/checkout'>
                                    <button className={clsx(styles.btn, {[styles.btn_active]: total > 0})}>Tiếp tục</button>
                            </NavLink>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageCart;