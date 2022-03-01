import clsx from 'clsx';
import React, {useRef, useState, useEffect} from 'react';
import Pagination from '../Pagination/Pagination';
import styles from './Products.module.scss'
import './PageProduct.css'

import 'aos/dist/aos.css';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import { useParams } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';
import removeVN from 'util/removeVN';
import { getParent } from 'util/RandomProduct';
import SvgIcon from 'svg';

function Products() {

    const { url } = useParams()
    const dataCategory = useSelector(state => state.products)
    const dataProdcuts = [...dataCategory]

    const [ loading, setLoading ] = useState(false)

    const dataUrl = dataProdcuts.filter(item => removeVN(item.category) === url)
    const [ data, setData ] = useState(dataUrl)

    const [activeSort, setActiveSort] = useState(false);

    // dữ liệu sản phẩm để lọc theo từng phân loại nhỏ
    const [dataClassify, setDataClassify] = useState([])

    // dữ liệu sản phẩm sắp xếp theo giá
    const [dataArranging, setDataArranging] = useState([])

    // active các phân loại nhỏ ~ classify
    const [index , setIndex] = useState(-1)

    // active
    const [indexPrev, setIndexPrev] = useState(0)

    // index sort
    const [indexSort, setIndexSort] = useState(0)
    const [activeApply, setActiveApply] = useState(false)

    const classify = ['tất cả', 'hàng rào', 'đấu trụ', 'cửa sổ', 'gạch hoa']
    const [title, setTitle] = useState(classify[0])

    const listRef = useRef()
    const sortRef = useRef()
    const sortUlRef = useRef()
    const filterRef = useRef()
    
    // Thay đổi data khi chuyển sang mặt hàng khác
    useEffect(() => {
        setDataClassify(dataUrl)
        setLoading(true)
        // tạo giá trị khởi tạo cho index mỗi khi thay đổi url
        setIndex(0)
        setIndexSort(0)
    }, [url])

    // Render hiệu ứng AOs tránh mất hiệu ứng khi click vào từng classify
    useEffect(() => {
        const time = setTimeout(() => {
            const index = filterRef.current.querySelector('.Products_active__2KSV4') && filterRef.current.querySelector('.Products_active__2KSV4').dataset.index
            setIndexPrev(index)
        }, 100)
        // console.log(filterRef.current.querySelector('.Products_active__2KSV4'));
        // console.log(filterRef.current.querySelectorAll('.Products_filter_item__1YTmr')[indexPrev]);
        if (filterRef.current.querySelectorAll('.Products_filter_item__1YTmr')[indexPrev] !== undefined) {
            filterRef.current.querySelectorAll('.Products_filter_item__1YTmr')[indexPrev].classList.toggle('aos-animate', true);
            filterRef.current.querySelectorAll('.Products_filter_item__1YTmr')[indexPrev].classList.toggle('aos-init', true);
        }
        return () => clearTimeout(time)
    }, [index])

    // Khi thay đổi sự sắp xếp thì render lại dữ liệu sản phẩm
    useEffect(() => {
        if(indexSort === +0) {
            const d = [...dataArranging]
            d.sort((a, b) => +a.id - +b.id)
            setDataArranging(d)
        }
        if(indexSort === 1) {
            const d = [...dataArranging]
            d.sort((a, b) => +a.price - +b.price)
            setDataArranging(d)
        }
        if(indexSort === 2) {
            const d = [...dataArranging]
            d.sort((a, b) => +b.price - +a.price)
            setDataArranging(d)
        }
    }, [activeApply]) 

    // Gắn dữ liệu khi thay đổi sự sắp xếp
    useEffect(() => {
        setDataArranging(dataClassify)
    }, [dataClassify])

    // Khi click bên ngoài thẻ  bảng giỏ hàng
    useEffect(() => {
        // khởi chạy aniamation
        AOS.init({
            once: true,
        })
        
        const handleClick = e => {
            if(sortRef.current) {
                const isCheckSort = sortRef.current.contains(e.target)
                if(!isCheckSort) {
                    setActiveSort(false)
                }
            }
        }

        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])

    // Click vào button 'sắp xếp theo' sẽ hiện bảng lựa chọn sắp xếp theo j đó.
    const handleClickSort = () => {
        setActiveSort(!activeSort)
    }


    // Lựa chọn sự sắp xếp giá theo cái gì
    const handleClickSortOption = e => {
        const isCheck = getParent(e.target, '.Products_sort_item__p7tD8')
        if(isCheck) {
            const newIndex = indexSort === +isCheck.dataset.index ? 0 : isCheck.dataset.index
            setIndexSort(+newIndex)
        }
        if(!isCheck) {
            const newIndex = indexSort === +e.target.dataset.index ? 0 : e.target.dataset.index
            setIndexSort(+newIndex)
        }
    }


    // Thay đổi dữ liệu sắp xếp sản phẩm theo giá
    const handleClickApply = () => {
        setActiveApply(!activeApply)
        setActiveSort(!activeSort)
    }

    // lọc sản phẩm theo phân loại nhỏ
    const handleClickClassify = (e) => {
        setIndexSort(0)
        setTitle(e.target.innerText)

        const titleText = e.target.innerText
        const titleConvert = titleText.charAt(0).toLocaleLowerCase() + titleText.slice(1)

        if(titleConvert === classify[0]) {
            setDataArranging(dataClassify)
        } else {
            const dataClass = dataClassify.filter(i => removeVN(i.classify) === removeVN(titleConvert))
            setDataArranging(dataClass)
        }
        const isCheck = getParent(e.target, '.aos-init')
        if(isCheck) setIndex(+isCheck.dataset.index)
        if(!isCheck) setIndex(+e.target.dataset.index)
    }

    
    return (
        <div className={clsx(styles.main_product, 'grid wide')}>
            <div className='row'>
                <div className='col l-2'>
                    <div className={clsx(styles.filter_panel) }>
                        <div 
                            data-aos="fade-down-right" 
                            data-aos-delay='300'  
                            className={clsx(styles.filter_heading)}
                        >
                            <p>Khuôn sắt</p>
                        </div>
                        <div ref={filterRef} className={clsx(styles.filter_facet)}>
                            {
                                classify.map((i, k) => {
                                    const timeDelay = ( k + 7 ) * 50
                                    return (
                                        <div 
                                            key={k}
                                            data-index={k}
                                            data-aos="fade-down-right" 
                                            data-aos-delay={timeDelay}
                                            className={clsx(styles.filter_item, {'aos-init': +k === +index, 'aos-animate': +k === +index}, {[styles.active]: +k === +index })}
                                            onClick={handleClickClassify}
                                        >
                                            <span className={clsx(styles.filter_label)}>{i.charAt(0).toLocaleUpperCase() + i.slice(1)}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='col l-10'>
                    <div className={clsx(styles.header)}>
    
                        <div data-aos="fade-down-right" ref={listRef} className={clsx(styles.header_text)}>
                            <div className={clsx(styles.heading)}>
                                <p>{title}</p>
                            </div>
                        </div>

                        <div data-aos="fade-down-left" ref={sortRef} className={clsx(styles.sort)} >
                            <div className={clsx(styles.content_sort)} >
                                <p className={clsx(styles.content_sort_header)} onClick={handleClickSort}>Sắp xếp theo</p>
                                <span className={clsx(styles.line)}></span>
                                <ul ref={sortUlRef} className={clsx(styles.sort_list, {[styles.active] : activeSort})}>
                                    <li 
                                        className={clsx(styles.sort_item, {[styles.active] : indexSort === 1 })}
                                        data-index='1'
                                        onClick={handleClickSortOption}
                                    >
                                        {/* <input type='radio' name='sort_item' className={clsx(styles.input_sort)} />
                                            Giá từ thấp đến cao */}
                                        <p className={clsx(styles.sort_item_heading)}> Giá từ thấp đến cao</p>
                                        <img src={SvgIcon.DONE} alt="Done"/>   
                                    </li>
                                    <li 
                                        className={clsx(styles.sort_item, {[styles.active] : indexSort === 2 })}
                                        onClick={handleClickSortOption}
                                        data-index='2'
                                    >
                                        {/* <input type='radio' name='sort_item' className={clsx(styles.input_sort)} />
                                            Giá từ cao đến thấp */}
                                        <p className={clsx(styles.sort_item_heading)}> Giá từ cao đến thấp</p>
                                        <img src={SvgIcon.DONE} alt="Done"/>
                                    </li>
                                    <button 
                                        className={clsx(styles.apply)}
                                        onClick={handleClickApply}
                                    >
                                        Áp dụng
                                    </button>
                                </ul>
                            </div>
                        </div>
                    </div>

                    
                    <div className={clsx(styles.product)}>
                        <div className={clsx(styles.product_list)}>
                            <div className='row' style={{width: '100%'}}>
                                {dataArranging.map((item) => {
                                    return (
                                        <ProductCard item={item} col='col l-4'/>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

            <Pagination />
        </div>
    );
}

export default Products;