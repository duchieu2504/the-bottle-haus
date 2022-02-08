import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './ProductCard.module.scss'
import { NavLink } from 'react-router-dom';
import 'aos/dist/aos.css';
import removeVN from 'util/removeVN';
import convertPrice from 'util/convertNumber';


const ProductCard = ({ item, itemRef, col }) => {
    const { id, price, title, img, category } = item
    const num = (Number(item.id ) - 1) % 3
    const url = removeVN(category)
    return (
            <div 
                key={id} 
                data-aos="fade-up" 
                ref={itemRef}  
                data-aos-delay = {(num + 1 ) * 50} 
                className={clsx(styles.product_card, `${col}`)}
            >
                <NavLink 
                    className={clsx(styles.product_link)} 
                    to={`/${url}/${id}`}
                >
                    <img alt="product_img" src={img} className={clsx(styles.img)} />
                        <h4 className={clsx(styles.title)}>{title}</h4>
                        <h5 className={clsx(styles.price)}>{convertPrice(price)}</h5>
                </NavLink>
            </div>
    );
};

ProductCard.propTypes = {
    item: PropTypes.object,
    itemRef: PropTypes.object,
    col: PropTypes.string,
};
ProductCard.defaultProps = {
    item: {},
    itemRef: null,
    col: ''
};

export default ProductCard;