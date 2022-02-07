import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SvgIcon from 'svg';
import styles from './PageCart.module.scss'
import convertPrice from 'util/convertNumber';
import { useDispatch } from 'react-redux';
import { changeQuantity } from 'redux/productsCart';
import 'aos/dist/aos.css';
import './CartItem.css'


CartItem.propTypes = {
    item: PropTypes.object,
    handleDeleteProduct: PropTypes.func,
    timeDelay: PropTypes.number
};
CartItem.defaultProps = {
    item: {},
    handleDeleteProduct: null,
    timeDelay: '',
};

function CartItem(props) {
    const { item, handleDeleteProduct, timeDelay } = props

    const dispatch = useDispatch()

    const {id, img, price, title, quantily, size} = item

    const [ quanti, setQuanti ] = useState(Number(quantily))
    const totalPrice = (price * quanti).toString()

    // Thay đổi số lượng khi click vào nút giảm
    const handlePrevQuantity = () => {
        setQuanti(quanti - 1) 
        const newP = {...item, quantily: `${quanti - 1}`}
        const action = changeQuantity(newP)
        dispatch(action)
    }

    // Thay đổi số lượng khi click vào nút tăng
    const handleNextQuantity = () => {
        setQuanti(quanti + 1) 
        const newP = {...item, quantily: `${quanti + 1}`}
        const action = changeQuantity(newP)
        dispatch(action)
    }

    return (
        <div 
            className={clsx(styles.product_item)}
            data-aos="fade-up"
            data-aos-delay={timeDelay}
            data-aos-easing="ease-out"
        >
            <img 
                src={img}
                alt='img' 
                className={clsx(styles.product_item_img)}
            />
            <div className={clsx(styles.product_item_content)}>
                <div className={clsx(styles.product_item_info)}>
                    <p className={clsx(styles.product_item_title)}>
                        {title} <br/>
                    </p>
                    <p className={clsx(styles.product_item_size)}>
                       Kích thước: {size}
                    </p>
                </div>
                <p className={clsx(styles.product_item_price)}>
                    {convertPrice(price)}
                </p>
                <div className={clsx(styles.product_item_quantily)}>
                    <button  
                        onClick={handlePrevQuantity}
                        className={clsx(styles.btn)}
                        disabled={ quanti <= 1}
                    >
                        {'<'}
                    </button>
                    <p>{quanti}</p>
                    <button 
                        className={clsx(styles.btn)}
                        onClick={handleNextQuantity}
                    >
                        {'>'}
                    </button>
                </div>
                <p className={clsx(styles.product_item_total)}>
                    {convertPrice(totalPrice)}
                </p>
            </div>
            <div 
                className={clsx(styles.product_delete)}
                onClick={() => handleDeleteProduct(id)}
            >
                <img 
                    className={clsx(styles.product_delete_img)} 
                    src={SvgIcon.DELETE_ICON} 
                    alt='DELETE' 
                />
                <div className={clsx(styles.product_delete_title)}>
                    <img src="https://img.icons8.com/ios/50/000000/topic.png" alt='Comment delete'/>
                    <p>Xóa</p>
                </div>
            </div>
        </div>
    );
}

export default CartItem;