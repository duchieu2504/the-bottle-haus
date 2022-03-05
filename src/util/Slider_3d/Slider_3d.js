import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Slider_3d.module.scss'


function Slider_3d(props) {
    const sliderImg = [
        'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80',
        'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80',
    ]
    const img = [ sliderImg[sliderImg.length - 1], ...sliderImg ]
    const [ styleSlider, setStyleSlide ] = useState({
        active: -1,
        slider: [...sliderImg]
    })

    const transitionRef = useRef()

    useEffect(() => {
        transitionRef.current = nextSlide
    })
    const {active, slider} = styleSlider

    // tạo mới mảng danh sách hình ảnh khi DOM đã tải xxong
    useEffect(() => {
        const slideCopy = [...slider]
        const sliderFirst = [...slideCopy].slice(0, slideCopy.length - 1)
        const lastSlide = [...slideCopy][slideCopy.length - 1]
        const img = [lastSlide, ...slideCopy]
        setStyleSlide({
            ...styleSlider,
            slider: [...img],
        })
    
    }, [])

    // khi click vào nút icon next
    const nextSlide = (e) => {
        setStyleSlide({
            ...styleSlider,
            active: 3,
        })

        // sử dụng setTimout : khi bấm nút next thì sẽ sắp xếp lại giá trị mảng slider mới
        const time = setTimeout(() => {
            const  sliderIm = [...slider].slice(0, slider.length - 1)
            const firstSlider = [...slider][[...slider].length - 2]
            const _slider= [firstSlider ,...sliderIm,]
            setStyleSlide({
                active: -1,
                slider: [..._slider]
            })
        }, 1200)
        return () => clearTimeout(time)
    }

    const prevSlide = () => {
        
    }
    return (
        <div className={clsx(styles.slider_3d)}>
            {/* <section id="slider">
                <input type="radio" name="slider" id="s1" />
                <input type="radio" name="slider" id="s2" />
                <input type="radio" name="slider" id="s3" checked />
                {images.map((image, i) => {
                    return (
                        <label for={`s${i + 1}`}   id={`slide${i + 1}`}>
                            <img src={image} height="100%" width="100%" />
                        </label>
                        )})}
            </section> */}
            <div className={clsx(styles.slider_3d_list, {[styles.active]: +active !== -1})}>
                {slider.map((i, k) => {
                    return (
                        <div
                            className={clsx(styles.slider_3d_item, {[styles.active]: +active === +k})}
                            key={k}
                        >
                            <img 
                                className={clsx(styles.slider_3d_img)}
                                alt="img"
                                src={i} 
                                height="100%" 
                                width="100%" />
                            <div className={clsx(styles.slider_3d_overlay)}></div>
                        </div>
                    )
                })} 
            </div>
            <div className={clsx(styles.slider_arrow)}>
                <div 
                    className={clsx(styles.slider_arrow_right)} 
                    onClick={nextSlide}
                >
                    <img className={clsx(styles.slider_arrow_icon)} src="https://img.icons8.com/ios/50/000000/circled-chevron-right.png" alt="Img arrow right"/>

                </div>
            </div>
        </div>
        
    );
}

export default Slider_3d;