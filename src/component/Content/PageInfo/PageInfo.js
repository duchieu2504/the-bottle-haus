import Aos from "aos";
import "aos/dist/aos.css";
import clsx from "clsx";
import React, { useEffect } from "react";
import styles from "./PageInfo.module.scss";

function NavabarInfo(props) {
    useEffect(() => {
        Aos.init();
    }, []);
    return (
        <div className={clsx(styles.navbarInfo, "grid wide")}>
            <div className={clsx(styles.heading)}>
                <p>
                    Xưởng cơ khí <br /> Đức Hải{" "}
                </p>
                <div className={clsx(styles.date)}>
                    <div className={clsx(styles.line)}></div>
                    <h1>16/12/2021</h1>
                    <div className={clsx(styles.line)}></div>
                </div>
            </div>
            <div className={clsx(styles.img)}>
                <img
                    alt="product_img"
                    src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
                    className={clsx(styles.img)}
                />
            </div>
            <div
                data-aos="fade-down-right"
                data-aos-duration="1000"
                className={clsx(styles.info)}
            >
                <p>
                    Xưởng cơ khí Đức Hải là xưởng cơ khí chuyên sản xuất các mặt
                    hàng khuôn sắt và khuôn bằng bê tông phục vụ cho các công
                    trình. Bên cạnh đó, xưởng cũng cung cấp các mặt hàng khác
                    như sắt ly, khuôn nhựa. Các sản phẩm khuôn nổi tiếng với
                    chất lượng đi kèm và luôn được khách hàng đánh giá cao.
                </p>
                <br />
                <p>
                    Thành lập ngày 10/10/2018 bắt đầu với cơ sở nhỏ, ít nhân
                    công, bằng sự nỗ lực không ngừng nghỉ, với kinh nghiệm hơn
                    10 năm trong nghề xưởng đã dần khẳng định thương hiệu. Hiện
                    tại xưởng chỉ có một cở sở duy nhất.{" "}
                </p>
                <br />
                <p className={clsx(styles.title_bord)}>Thông tin liên hệ:</p>
                <li>
                    {" "}
                    Địa chỉ: thôn Phong Doanh, xã Bình Dương, huyện Vĩnh Tường,
                    tỉnh Vĩnh Phúc.
                </li>
                <li> Số điện thoại: 0971939340</li>
                <br />
                <p className={clsx(styles.title_bord)}>Xưởng cơ khí Đức Hải</p>
            </div>
            <div
                data-aos="fade-down-right"
                data-aos-duration="1000"
                className={clsx(styles.map)}
            >
                <iframe
                    title="Map"
                    className={clsx(styles.map_iframe)}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.5738993491514!2d105.52821231493635!3d21.248738885879717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134f16a6d8e4771%3A0x2a07797c1e8ce63e!2zWMaw4bufbmcgQ8ahIGtoaSDEkOG7qWMgSOG6o2k!5e0!3m2!1svi!2sjp!4v1646449947768!5m2!1svi!2sjp"
                    width="600"
                    height="300"
                    allowfullscreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
}

export default NavabarInfo;
