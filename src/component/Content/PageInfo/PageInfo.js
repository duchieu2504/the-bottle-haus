import Aos from 'aos';
import 'aos/dist/aos.css';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import styles from './PageInfo.module.scss';

function NavabarInfo(props) {
    useEffect(() => {
        Aos.init()
    }, [])
    return (
        <div className={clsx(styles.navbarInfo, "grid wide")}>
            <div className={clsx(styles.heading)}>
                <p>Xưởng cơ khí <br /> Đức Hải </p>
                <div className={clsx(styles.date)}>
                    <div className={clsx(styles.line)}></div>
                    <h1>16/12/2021</h1>
                    <div className={clsx(styles.line)}></div>
                </div>
            </div>
            <div className={clsx(styles.img)}>
                <img 
                    alt="product_img" 
                    src='https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80' 
                    className={clsx(styles.img)} 
                />
            </div>
            <div data-aos='fade-down-right'  data-aos-duration='1000' className={clsx(styles.info)}>
                <p >Xưởng cơ khí Đức Hải là xưởng cơ khí chuyên sản xuất các mặt hàng khuôn sắt và khuôn bằng bê tông phục vụ cho các công trình. Bên cạnh đó, xưởng cũng cung cấp các mặt hàng khác như sắt ly, khuôn nhựa. Các sản phẩm khuôn nổi tiếng với chất lượng đi kèm và luôn được khách hàng đánh giá cao.</p>
                <br />
                <p>Thành lập ngày 10/10/2018 bắt đầu với cơ sở nhỏ, ít nhân công, bằng sự nỗ lực không ngừng nghỉ, với kinh nghiệm hơn 10 năm trong nghề xưởng đã dần khẳng định thương hiệu. Hiện tại xưởng chỉ có một cở sở duy nhất. </p>
                <br/>
                <p className={clsx(styles.title_bord)}>Thông tin liên hệ:</p>
                <li> Địa chỉ: thôn Phong Doanh, xã Bình Dương, huyện Vĩnh Tường, tỉnh Vĩnh Phúc.</li>
                <li> Số điện thoại: 0971939340</li>
                <br/>
                <p className={clsx(styles.title_bord)}>Xưởng cơ khí Đức Hải</p>
            </div>
        </div>
    );
}

export default NavabarInfo;