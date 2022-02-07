import React from 'react';
import styles from './Footer.module.scss'
import clsx from 'clsx'
import SvgIcon from 'svg';


const Footer = () => {
    return (
        <footer>
            <div className={clsx(styles.footer)}>
                <div className="grid wide">
                    <div className={clsx(styles.header)}>
                        <p>Xưởng cơ khí <br /> Đức hải </p>
                    </div>
                    <div className={clsx(styles.content)}>
                        <div className="row">
                            <div className="col l-3">
                                <div className={clsx(styles.footer_about)}>
                                    <p>Cửa hàng</p>
                                    <ul>
                                        <li>
                                            Giới thiệu
                                        </li>
                                        <li>
                                            Vận chuyển
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col l-3">
                                <div className={clsx(styles.footer_about)}>
                                    <p>Hệ thống</p>
                                    <ul>
                                        <li>SĐT: 0971939340</li>
                                        <li>Địa chỉ: thôn Phong Doanh, xã Bình Dương, huyện Vĩnh Tường, tỉnh Vĩnh Phúc</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col l-3">
                                <div className={clsx(styles.footer_about)}>
                                    <p>Sản phẩm</p>
                                    <ul>
                                        <li>
                                            Khuôn hàng rào
                                        </li>
                                        <li>
                                            Khuôn đấu trụ
                                        </li>
                                        <li>
                                            Khuôn gạch hoa
                                        </li>
                                        <li>
                                            Khuôn bê tông
                                        </li>
                                        <li>
                                            Sản phẩm nổi bật
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col l-3">
                                <div className={clsx(styles.footer_about)}>
                                    <p>Fanpage</p>
                                    <div className={clsx(styles.footer_fanpage)}>
                                        <a 
                                            href='https://www.facebook.com/X%C6%B0%E1%BB%9Fng-c%C6%A1-kh%C3%AD-%C4%90%E1%BB%A9c-H%E1%BA%A3i-410086636054420' 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            <img className={clsx(styles.footer_icon)} src={SvgIcon.FACEBOOK_ICON} alt='Facebook Shop'/> 
                                        </a>
                                        <a 
                                            href='https://www.facebook.com/X%C6%B0%E1%BB%9Fng-c%C6%A1-kh%C3%AD-%C4%90%E1%BB%A9c-H%E1%BA%A3i-410086636054420' 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                        >
                                            <img style={{width: '3.6rem'}} className={clsx(styles.footer_icon)} src={SvgIcon.ZALO_ICON} alt='Zalo'/> 
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles.footer_caption)}>
                        <div className={clsx(styles.footer_caption_heading)}>Copyright @ 2021 by NDH</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer