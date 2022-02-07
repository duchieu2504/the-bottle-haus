import React, { useEffect, useRef } from 'react';
import Slider from '../../../util/Slider/Slider.js'
import ProductsFeatured from '../../Content/ProductsRecommended/ProductsRecommended.js';
import clsx from 'clsx';
import styles from './Main.module.scss'
import 'aos/dist/aos.css';
import AOS from 'aos';
import './Main.css'
import { BG1 } from 'svg/Image.js';



const Main = () => {

    const h1Ref = useRef()
    useEffect(() => {
        AOS.init()
    })
    useEffect(() => {
        var i = 0
        var text = 'Chào mừng đến với xưởng Cơ khí Đức Hải, chuyển sản xuất các hàng khuôn sắt phục vụ trong ngành công nghiệp xây dựng.'
        var typeWrite = () => {
            if(i < text.length && h1Ref.current) {
                h1Ref.current.innerHTML += text.charAt(i);
                i++
                setTimeout(typeWrite, 80)
            }
        }
        var time = () => {
            setTimeout(() => {
                typeWrite()
            }, 2000)
        }
        document.addEventListener('scroll', () => {
                if(window.scrollY === 400) {
                    time()
                }
            })
        return () => {
            document.removeEventListener('scroll', () => {
                if(window.scrollY === 400) {
                    time()
                }
            })
        }
    }, [])
    return (
            <div>
                <Slider />
                <div style={{padding: '0 0 24px 0'}}>
                    <div className={clsx(styles.welcome)}>
                        <div className="grid wide" style={{height: '100%'}}>
                            <div className='row'  style={{height: '100%'}}>
                                <div className={clsx(styles.header, 'col l-5')}>
                                    <p 
                                        data-aos="text-zoom-out-left" 
                                        data-aos-easing="ease-in-out"
                                        data-aos-delay="500" 
                                        data-aos-offset='0'
                                        data-aos-duration="1000"
                                        className={clsx(styles.heading, styles.aos_animate)}
                                    >
                                        Bạn đang tìm kiếm gì?
                                    </p>
                                    <div className={clsx(styles.btns)}>
                                        <a
                                            href='https://www.facebook.com/X%C6%B0%E1%BB%9Fng-c%C6%A1-kh%C3%AD-%C4%90%E1%BB%A9c-H%E1%BA%A3i-410086636054420'
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={clsx(styles.btn)}
                                        >   
                                            <div className={clsx(styles.btn_img)}>
                                                <BG1></BG1>
                                            <p>Facebook</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className={clsx(styles.content, 'col l-7')}>
                                    <h1 ref={h1Ref}>
                                    </h1>
                                    <div className={clsx(styles.content_link, 'flex')}>
                                            <div 
                                                className={clsx(styles.content_item_1)}
                                                data-aos="fade-down-right"
                                                data-aos-delay='400'
                                                data-aos-offset='0'
                                                data-aos-easing='linear'
                                                data-aos-duration='1100'
                                            >
                                                <p className={clsx(styles.content_heading)}>Facebook</p>
                                                <div 
                                                    
                                                    className={clsx(styles.content_img)} 
                                                    style={{backgroundImage: 'url(https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80)'}}>
                                                </div>
                                            </div>
                                            <div className='flex' style={{width: '250px', flexWrap: 'wrap'}}>
                                                <div 
                                                    className={clsx(styles.content_item_2)}
                                                    data-aos="zoom-in-left"
                                                    data-aos-delay='400'
                                                    data-aos-offset='0'
                                                    data-aos-easing='linear'
                                                    data-aos-duration='1100'    
                                                >
                                                    <p className={clsx(styles.content_heading)}>Khuôn sắt</p>
                                                    <div
                                                        className={clsx(styles.content_img)} 
                                                        style={{backgroundImage: 'url(https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80)'}}>
                                                    </div>
                                                </div>
                                            
                                                <div 
                                                    className={clsx(styles.content_item_3)}
                                                    data-aos="zoom-in-right-box"
                                                    data-aos-delay='400'
                                                    data-aos-offset='0'
                                                    data-aos-easing='linear'
                                                    data-aos-duration='1100'
                                                >
                                                    <p className={clsx(styles.content_heading)}>Facebook</p>
                                                    <div   
                                                        className={clsx(styles.content_img)} 
                                                        style={{backgroundImage: 'url(https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80)'}}>
                                                    </div>
                                                </div>
                                                <div 
                                                    className={clsx(styles.content_item_3)}
                                                    data-aos="zoom-in-up"
                                                    data-aos-delay='400'
                                                    data-aos-offset='0'
                                                    data-aos-duration='1100'
                                                    data-aos-easing='linear'
                                                >
                                                    <p className={clsx(styles.content_heading)}>Facebook</p>
                                                    <div 
                                                        className={clsx(styles.content_img)} 
                                                        style={{backgroundImage: 'url(https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80)'}}>
                                                    </div>
                                                </div>
                                                <div 
                                                    className={clsx(styles.content_item_2)}
                                                    data-aos="zoom-in-left"
                                                    data-aos-delay='400'
                                                    data-aos-offset='0'
                                                    data-aos-duration='1100'
                                                    data-aos-easing='linear'
                                                >
                                                    <p className={clsx(styles.content_heading)}>Facebook</p>
                                                    <div 
                                                        
                                                        className={clsx(styles.content_img)} 
                                                        style={{backgroundImage: 'url(https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80)'}}>
                                                    </div>
                                                </div>
                                            </div>
                                            <div 
                                                className={clsx(styles.content_item_1)}
                                                data-aos="fade-down-left"
                                                data-aos-delay='400'
                                                data-aos-offset='0'
                                                data-aos-duration='1100'
                                                data-aos-easing='linear'
                                            >
                                                <p className={clsx(styles.content_heading)}>Facebook</p>
                                                <div 
                                                    className={clsx(styles.content_img)} 
                                                    style={{backgroundImage: 'url(https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80)'}}>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid wide">
                        <ProductsFeatured title="Sản phẩm nổi bật" />
                        <ProductsFeatured title="Khuôn sắt" allView={true}/>
                    </div>
                </div>
            </div>
        )
}
export default Main