import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { clickNavbar } from 'redux/Login.js';
import removeVN from 'util/removeVN';
import { NavbarTitles } from '../../../redux/navbarState.js';
import styles from './Navbar.module.scss';


const  Navbar = (props) => {
    const [styleLine, setStyleLine] = useState({})
    const [ active, setActive ] = useState(0)
    // const [styleTitleNavbar, setStyleTitle] = useState({})

    const activeNavbar = useSelector(state => state.activeLogin.activeNavbar)
    const dispatch = useDispatch()

    const indexRef = useRef(-1)
    
    const handleMouseEnter = (e) => {
        const navIndex = e.target.parentElement.dataset.index
 
        if(navIndex > 0) {
            indexRef.current = Number(navIndex) - 1
            // setStyleTitle({
            //     left: e.target.offsetLeft + 'px',
            //     width: e.target.offsetWidth + 'px',
            //     opacity: '1',
            //     visibility: 'visible',

            // })
        } else {
            indexRef.current = null
            // setStyleTitle({
            //     left: e.target.offsetLeft + 'px',
            //     width: e.target.offsetWidth + 'px',
            //     visibility: 'hidden',
            //     opacity: '0',
            // })
        }

        setStyleLine({
            left: e.target.offsetLeft + 'px',
            width: e.target.offsetWidth + 'px',
            transitionDelay: '200ms',
            transform: 'scaleX(1)',
        })
        

    }

    const handleMouseLeave = (e) => {

        indexRef.current = null

        const resetStyle = setTimeout(() => {
                setStyleLine({
                    left: null,
                    width: null,
                    transitionDelay: null,
                    transform: null,
                })
                // setStyleTitle({
                //     left: null,
                //     width: null,
                //     visibility: null,
                //     opacity: null,
                // })
        }, 500)
        return () => clearTimeout(resetStyle)
    }

    const handleMouseLeaveItem = (e) => {

        setStyleLine({
            left: e.target.offsetLeft + 'px',
            width: e.target.offsetWidth + 'px',
            transitionDelay: '300ms',
            transform: 'scaleX(0)',
        })
        // setStyleTitle({
        //     left: e.target.offsetLeft + 'px',
        //     width: e.target.offsetWidth + 'px',
        //     visibility: 'hidden',
        //     opacity: '0',
        // })
    }
    // const handleMouseEnterTitleNavbar = (e) => {
    //     const titleNavbarElemet = e.target.parentElement.parentElement.childNodes
    //     const titleNavbarArray = [...titleNavbarElemet]
    //     // console.log(titleNavbarArray);
    //     titleNavbarArray.forEach((item) => {
    //         item.addEventListener('mouseenter', (e) => {
    //             const titleIndex = e.target.dataset.index
    //             indexRef.current = titleIndex
    //         })
    //     })
    // }

    // sự kiện click vào các li
    const handleClick = (e) => {
        const i = e.target.dataset.index
        const action = clickNavbar(+i)
        dispatch(action)
    }
    return (
        <>
            <ul 
                className={clsx(styles.navbar)} 
                // onMouseLeave={e => handleMouseLeave(e)} 
            >    
                <li 
                    className={clsx(styles.navbar_item)}
                    // onMouseEnter={handleMouseEnter} 
                    // onMouseLeave={handleMouseLeaveItem}
                    data-index='0'
                >
                    <NavLink 
                        className={clsx(styles.navbar_link, {[styles.active]: +activeNavbar === 0})} 
                        onClick={handleClick}
                        data-index='0'
                        to='/home' 
                    > 
                        Trang chủ 
                    </NavLink>
                </li>
                {NavbarTitles.map((title, i) => {
                    const path = removeVN(title)

                    return (
                        <li 
                            className={clsx(styles.navbar_item)}  
                            key={i}
                            // onMouseEnter={handleMouseEnter}
                            // onMouseLeave={handleMouseLeaveItem}
                            data-index={i+1}
                        >
                            <NavLink 
                                className={clsx(styles.navbar_link, {[styles.active]: +activeNavbar === (i + 1)})} 
                                onClick={handleClick}
                                to={path}
                                data-index={i+1}
                            >
                                <span data-index={i+1}>{title}</span>
                            </NavLink>
                        </li>
                    )
                })}
                {/* <span style={styleLine} className={clsx(styles.navbar_line)}></span> */}
                
            </ul>
        </>        
    );
}

export default Navbar;