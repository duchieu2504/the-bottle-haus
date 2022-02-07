import clsx from 'clsx';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clickLogin } from 'redux/Login';
import styles from './PageLogin.module.scss'
const PageLogin = () => {
    const dispatch = useDispatch()
    const activeLogin = useSelector(state => state.activeLogin.active)
    const handleClickClose = () => {
        const action = clickLogin(activeLogin)
        dispatch(action)
    }
    return (
        <div className={clsx(styles.pageLogin, {[styles.active]: activeLogin})}>
            <div className={clsx(styles.overlay)}></div>
            <div className={clsx(styles.login)}>
                <form className={clsx(styles.form_submit)}>
                    <div className={clsx(styles.login_img)}>
                        <div className={clsx(styles.img)} style={{backgroundImage : 'url(https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80)'}}></div>
                    </div>
                    <div className={clsx(styles.content)}>
                        <div className={clsx(styles.header)}>
                            <h1>Đăng ký</h1>
                            <p>Bạn đã có tài khoản? Đăng nhập</p>
                        </div>
                        <div className={clsx(styles.container)}>

                            <div className={clsx(styles.form_group)}>
                                <input 
                                    id='email' 
                                    name='email' 
                                    autoComplete='username' 
                                    placeholder=' ' 
                                    type='text' 
                                    className={clsx(styles.form_control)} 
                                />
                                <label 
                                    className={clsx(styles.form_label)}
                                >Email</label>
                                {/* <span className={clsx(styles.form_border)}>
                                    <i></i>
                                </span> */}
                                <span className={clsx(styles.form_message)}></span>
                            </div>

                            <div className={clsx(styles.form_group)}>
                                <input 
                                    id='password' 
                                    name='password' 
                                    autoComplete='current-password' 
                                    placeholder=' ' 
                                    type='password' 
                                    className={clsx(styles.form_control)} 
                                />
                                <label className={clsx(styles.form_label)}>Mật khẩu</label>
                                {/* <span className={clsx(styles.form_border)}>
                                    <i></i>
                                </span> */}
                                <span className={clsx(styles.form_message)}></span>
                            </div>
                        </div>
                        <div className={clsx(styles.footer)}>
                            <button>
                                Sign in
                            </button>
                        </div>
                        <div className={clsx(styles.close, {[styles.open]: !activeLogin})} onClick={handleClickClose}></div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PageLogin;