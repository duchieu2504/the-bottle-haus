import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import clsx from 'clsx';

import Navbar from 'component/Content/Navbar';
import SvgIcon from 'svg';
import { useDispatch, useSelector } from 'react-redux';
import { clickLogin, clickNavbar } from 'redux/Login';
import Cart from 'component/Content/Cart/Cart';

const Header = (props) => {
    
    const [activeCart, setActiveCart] = useState(false);
    const [activeSearch, setActiveSearch] = useState(false);

    const activeLogin = useSelector(state => state.activeLogin.activeLogin)
    // const activeNavbar = useSelector(state => state.activeLogin.activeNavbar)
    const dispatch = useDispatch()

    const cartRef = useRef()
    const searchRef = useRef()

    // bấm ngoài element cart sẽ tắt tab giỏ hàng
    useEffect(() => {
        const handleOut =  e => {
            if(cartRef.current) {
                const isCheck = cartRef.current.contains(e.target)
                if(!isCheck) {setActiveCart(false)}
            }
        }
        const handleOutSearch = e => {
            if(searchRef.current) {
                const isCheck = searchRef.current.contains(e.target)
                if(!isCheck) {setActiveSearch(false)}
            }
        }
        document.addEventListener('click', handleOut);
        document.addEventListener('click', handleOutSearch);

        return () => {
            document.removeEventListener('click', handleOut)
            document.removeEventListener('click', handleOutSearch);
        };
    }, [])

    //Bấm vào icon tìm kiếm sẽ hiện ra ô tìm kiếm
    const handleClickSearch = () => {
        setActiveSearch(true)
    }

    //Bấm vào cart sẽ hiện bảng giỏ hàng
    const handleClickCart = () => {
        setActiveCart(!activeCart)
    }
    
    //Bấm vào xem tất cả giỏ hàng
    const handleClickAllCart = () => {
        const action = clickNavbar(8)
        dispatch(action)
        setActiveCart(!activeCart)
    }

    // Bấm icon login hiện thị trang login
    const handleClickLogin = (e) => {
        e.preventDefault()
        const action = clickLogin(activeLogin)
        dispatch(action)
    }
    return (
        <header>
            <div className="grid wide" style={{height: '100%'}}>

                <div className={clsx(styles.header, '')}>

                    <NavLink to='/home' className={clsx(styles.header_heading)} >
                        Xưởng cơ khí <br /> Đức Hải
                    </NavLink>

                    <Navbar />

                    <div 
                        className={clsx(styles.search)} 
                        ref={searchRef}>
                        <div 
                            className={clsx(styles.borderSearch, {[styles.active]: activeSearch})}
                            onClick={handleClickSearch}
                        ></div>
                        <div className={clsx(styles.input, {[styles.active]: activeSearch})}>
                            <input 
                                className={clsx(styles.search_input)} 
                                placeholder="Tìm kiếm" 
                                type="text"
                            />
                        </div>

                        <button 
                            className={clsx(styles.btn)}
                        >
                            <i className={clsx(styles.btn_icon, 'fas fa-search')}></i>
                        </button>
                    </div>

                    <NavLink to='/user_name' onClick={handleClickLogin} className={clsx(styles.sign_in)}>
                        <div className={clsx(styles.user)}>
                                <i className="far fa-user"></i>
                                <p className={clsx(styles.user_name)}>Đức Hiếu</p>
                                {/* <span>Sign In</span> */}
                        </div>
                    </NavLink>

                    <div ref={cartRef} className={clsx(styles.cart)}>
                        <div onClick={handleClickCart} className={clsx(styles.cart_icon)}>
                            <img src={SvgIcon.CART_ICON} alt='Cart'/>
                        </div>
                        <Cart 
                            activeCart={activeCart}
                            handleClickAllCart={handleClickAllCart}
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;