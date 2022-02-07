import clsx from 'clsx';
import styles from './ProductDetail.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { byProduct } from 'redux/productsCart';
import './Notice.css'
import './ProductImg.css'
import convertPrice from 'util/convertNumber';

const ProductDetail = () => {
    const dispatch = useDispatch()
    const { productId } = useParams()
    const toastRef = useRef()
    const productImgRef = useRef()

    // Lấy data sản phẩm
    const data = useSelector(state => state.products)
    const dataProdcuts = [...data]
    const product = dataProdcuts.find(item => item.id === productId)
    const { img, description, quantily, code, size, price, category, title} = product

    // Lấy data sản phẩm đã có trong cửa hàng tr
    const dataProdcutsCart = useSelector(state => state.productsCart)
    const [ quanti, setQuanti ] = useState(Number(quantily))
    const [ sizeIndex , setSizeIndex ] = useState(0)
    const [ sizeText , setSizeText ] = useState(size[0])
    
    // Tạo chuyển động của hình ảnh khi khách hàng bấm vào thẻ 'thêm hàng'
    const [ animation, setAnimation] = useState({
        transform: 'translate(897px, -250px) scale(0.1)',
        opacity: 0.5,
        zIndex: 11,
        visibility: 'hidden',
    })
   
    // Cuộn chuột sẽ thay đối chiều cao tạo chuyển động hình ảnh khi click vào 'thêm hàng'
    useEffect(() => {

        // const b = document.createElement('div')
        // b.classList.add('product_img')
        // b.innerHTML = `
        //     <img class=${clsx(styles.img)} src='${img}' alt='${description}' />
        // `
        // if(typeof productImgRef.current === 'object') {
        //     productImgRef.current.appendChild(b)
        // }

        const handleScroll = () => {
            const height = window.scrollY
            const newHeight = -250 + height
            setAnimation({
                transform: `translate(897px, ${newHeight}px) scale(0.1)`,
                opacity: 0.5,
                zIndex: 11,
                visibility: 'hidden',
            })
        }
        document.addEventListener('scroll', handleScroll)
        return () => document.removeEventListener('scroll', handleScroll)
    }, [])
    
    //kiểm tra xem đã có sản phẩm trong cửa hàng chưa
    let isCheckIdCart = dataProdcutsCart.filter(item => item.code === code)
    let isCheckSizeCart = isCheckIdCart.find(i => i.size === sizeText)

    // lựa chọn kích thước sản phẩm
    const handleClickSize = e => {
        const i = e.target.dataset.index
        setSizeIndex(i)
        setQuanti(1)
        setSizeText(e.target.innerHTML)
    }

    const { transform } = animation
    
    // sự kiện click vào mua hàng
    const handleClickAddProduct = () => {

    // Tạo thông báo khi đã có sản phẩm và kích thước đã có trong giở hàng
        const a = document.createElement('div');
        a.classList.add('notice')
        a.innerHTML = `
            <div class='notice_icon'>
                <img src="https://img.icons8.com/external-flatarticons-blue-flatarticons/65/000000/external-info-hotel-services-flatarticons-blue-flatarticons.png" alt='Info'/>
            </div>
            <div class='notice_body'>
                <h3 class='notice_title'>Thông tin</h3>
                <p class='notice_msg'>Bạn đã có sản phẩm và kích thước này trong giỏ hàng vui lòng xem thông tin chi tiết trong giỏ hàng</p>
            </div>
            <div class='notice_close'>
                <img src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-delete-user-interface-flatart-icons-flat-flatarticons.png" alt='close'/>
            </div>
        `

        if(typeof toastRef.current === 'object' && isCheckSizeCart) {
             setTimeout(function () {
                if(toastRef.current) toastRef.current.removeChild(a);
            }, 4000);
            // a.onclick = function (e) {
            //     if (e.target.closest(".notice_close")) {
            //         toastRef.current.removeChild(a);
            //         clearTimeout(autoRemoveId);
            //     }
            // };
            toastRef.current.appendChild(a)
        }

        // Sự kiện khi click vào thêm vào giỏ hàng sẽ có hình ảnh sản phẩm chuyển động
        const b = document.createElement('div')
        b.classList.add('product_img_fake')
        b.innerHTML = `
            <img class=${clsx(styles.img_fake)} src='${img}' alt='${description}' />
        `
        if(typeof productImgRef.current === 'object' ) {
            setTimeout(() => {
                const check = productImgRef.current.querySelector('.product_img_fake')
                // console.log(transform, opacity, visibility);
                // console.log(check);
                if(check) check.style.imgFakeFrom = transform
                // check.style.fontSize = '2px'
            }, 500)
        }


        if(typeof productImgRef.current === 'object' && !isCheckSizeCart) {
            setTimeout(function () {
                productImgRef.current.removeChild(b);
            }, 1000);
            productImgRef.current.appendChild(b)
        }

        if(!isCheckSizeCart) {
            //
            const dataProductLength = dataProdcutsCart.length 

            // Lấy id của sản phẩm cuối cùng trong giỏ hàng
            const idPro = dataProductLength > 0 && dataProdcutsCart[dataProductLength - 1].id
            const idProduct = Number(idPro) + 1

            // Tạo mới 1 id cho sản phẩm cần mua bằng cách lấy id của sản phẩm cuối cùng trong giỏ hàng + 1.
            // Khi đó, nếu xóa sản phẩm có id ở giữa array sản phẩm trong giỏ hàng và thêm 1 sản phẩm khác vào sẽ không bị trùng id
            const idP = dataProductLength === 0 ? 0 : idProduct 
            const productCart = {...product, id: `${idP}`, quantily: `${quanti}`, size: `${sizeText}`}
            const action = byProduct(productCart)
            dispatch(action)
        }
    }

    // hiệu ứng của hình ảnh khi 'thêm hàng'
    // const styleAnimationImg = !isCheckSizeCart ? {} : transform
    // console.log({...transform});

    
    return (
        <div className={clsx(styles.product_detail)}>
            <div className='grid wide'>
                <div className={clsx(styles.product_briefing)}>
                    <div className='row'>
                        <div ref={productImgRef} className={clsx(styles.product_img, 'col l-5')}>
                            <img className={clsx(styles.img)} src={img} alt={description} />
                            {/* <div className={styles.product_img_fake}>
                            </div> */}
                        </div>
                        <div data-aos="fade-left" data-aos-duration="0.3" className='col l-7'>
                            <div className={styles.product_content}>
                                <div className={clsx(styles.product_header)}>
                                    <h2>{category}</h2>
                                    <h3>{title}</h3>
                                </div>
                                <div className={clsx(styles.product_price)}>
                                    <div className={clsx(styles.product_quantity)}>
                                        <button 
                                            className={clsx(styles.btn)}
                                            disabled={quanti <= 1}
                                            onClick={() => setQuanti(quanti - 1)}
                                        >
                                            -
                                        </button>
                                        <span>{quanti}</span>
                                        <button 
                                            className={clsx(styles.btn)}
                                            onClick={() => setQuanti(quanti + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <h3>{convertPrice(price)}</h3>
                                </div>

                                <div className={clsx(styles.product_size)}>
                                    <h1 className={clsx(styles.product_size_heading)}>Kích thước: </h1>
                                    {size.map((i, k) => {
                                        return (
                                            <div 
                                                key={k} 
                                                className={clsx(styles.size_item, {[styles.active]: Number(sizeIndex) === Number(k)})}
                                                data-index={k}
                                                onClick={handleClickSize}
                                            >
                                                {i}
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className={clsx(styles.product_rating)}>
                                    
                                </div>

                                <div className={clsx(styles.product_des)}>
                                    <p>{description}</p>
                                </div>
                                <div className={clsx(styles.product_footer)}>
                                    <div className={clsx(styles.product_btn)}>
                                        <button 
                                            className={clsx(styles.btn)}
                                            onClick={handleClickAddProduct}
                                        >
                                            Thêm vào giỏ hàng
                                        </button>
                                        <button className={clsx(styles.btn)}>Mua ngay</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles.recommendation)}>
                    <p>Có thể bạn thích</p>
                    <div className='row'>
                        <ProductCard item={product} col='col l-3'/>
                    </div>
                </div>
                <div ref={toastRef} id={clsx(styles.notice)}>

                </div>
            </div>
        </div>
    );
};

export default ProductDetail;