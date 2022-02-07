import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Arrow from 'util/Slider/sliderShow/Arrow';
import styleSlide from 'util/Slider/style/styleSlide';
// import PropTypes from 'prop-types';

import AOS from 'aos';
import 'aos/dist/aos.css';

import styles from './ProductsRecommended.module.scss';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import { clickNavbar } from 'redux/Login';
import { useDispatch } from 'react-redux';

ProductsFeatured.propTypes = {
    
};


function ProductsFeatured(props) {

    const { title,  allView } = props

    const data = useSelector(state => state.products)
    const dispatch = useDispatch()
    
    const dataProdcut = [...data]
    const dataProdcuts = dataProdcut.slice(0, dataProdcut.length - 5)
    const itemRef = useRef()
    const [state, setState] = useState({})
    // console.log( dataProdcuts);
    useEffect(() => {
        AOS.init({
            once: true
        })
        const time = () => {
                const itemWidth = itemRef.current.offsetWidth
                const listWidth = itemWidth * dataProdcuts.length + (1200 - 186 - itemWidth * 2)
                setState({
                    translate: 0,
                    transition: 0.45,
                    activeIndex: 0,
                    width: listWidth,
                    itemWidth: itemWidth,
                    activeArrowLeft: 'none',
                    activeArrowRight: 'active'
                })
        }
        time()
    }, [])

    const { translate, transition, activeIndex, width, itemWidth, activeArrowLeft, activeArrowRight } = state

    // Khi bấm prev slide
    const prevSlide = () => {
        setState ({
            ...state,
            activeIndex: activeIndex === 0 ? 0 : activeIndex - 1,
            translate: (activeIndex - 1)  * (itemWidth + 63 ),
            activeArrowLeft: activeIndex - 1 === 0 ? 'none' : 'active',
            activeArrowRight:  'active'
        })
    }

    // Khi bấm next slide
    const nextSlide = () => {
        setState ({
            ...state,
            activeIndex: activeIndex === dataProdcuts.length - 3 ? dataProdcuts.length - 3 : activeIndex + 1,
            translate: (activeIndex + 1) * (itemWidth + 63 ),
            activeArrowLeft:'active',
            activeArrowRight: activeIndex === dataProdcuts.length - 4 ? 'none' : 'active'
            
        })
    }
    // click vào xem tất cả
    const handleClickAllView = () => {
        const action = clickNavbar(1)
        dispatch(action)
    }

    const styleList = {transition, translate, width}
    return (
        <div className={clsx(styles.home_products)}>
            <div className={clsx(styles.headingWrap)}>
                <h3 className={clsx(styles.heading)}>{title}</h3>
                <span className={clsx(styles.line)}></span>
                { allView && <NavLink
                    onClick={handleClickAllView}
                    className={clsx(styles.viewAll)}
                    to='/khuon_sat'
                >
                    Xem tất cả
                    <i className={clsx(styles.viewAll_icon, 'fas fa-arrow-right')}></i>
                </NavLink> }
            </div>
            <div className={clsx(styles.product)}>
                <div className={clsx(styles.product_list)} style={styleSlide(styleList)}>
                    {dataProdcuts.map((item) => {
                            return (
                            <div key={item.id} style={{width: '350px'}}>
                                <ProductCard item={item} itemRef={itemRef}/>
                            </div>
                            )
                        })}
                </div>
                <div>
                    <Arrow 
                        direction='left' 
                        activeArrow={activeArrowLeft}
                        handleClick={prevSlide}
                     />
                    <Arrow 
                        direction='right'
                        activeArrow={activeArrowRight} 
                        handleClick={nextSlide}
                    />
                </div>
                {/* <div className={clsx(styles.scrollbar_horizontal)}>
                    <div className={clsx(styles.scrollbar_handle)}>

                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default ProductsFeatured;