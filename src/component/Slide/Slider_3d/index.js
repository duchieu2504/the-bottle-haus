import clsx from "clsx";
import React, { useEffect, useState } from "react";
import styles from "./Slider_3d.module.scss";

function Slider_3d(props) {
    const sliderImg = [
        "https://cdn.shopify.com/s/files/1/0313/6228/5699/files/Group_487_2.jpg?v=1633630122",
        "https://cdn.shopify.com/s/files/1/0313/6228/5699/files/Group_493.png?v=1633630517",
        "https://cdn.shopify.com/s/files/1/0313/6228/5699/files/Group_491_2.png?v=1633630769",
    ];
    const [styleSlider, setStyleSlide] = useState({
        active: -1,
        slider: [...sliderImg],
    });

    const { active, slider } = styleSlider;

    // tạo 1 mới mảng danh sách hình ảnh khi DOM đã tải xong
    //  bao gồm mảng cũ thêm vào đầu mảng phần tử con của mảng [3, 1, 2, 3]
    useEffect(() => {
        const slideNew = [...slider];
        const lastSlider = [...slideNew][slideNew.length - 1];
        const img = [lastSlider, ...slideNew];
        setStyleSlide({
            ...styleSlider,
            slider: [...img],
        });
    }, []);

    // [3,1,2,3] => [2,3,1,2] => [1,2,3,1]
    // thay đổi thứ tự slider
    const changeSlider = () => {
        const sliderNew = [...slider].slice(0, slider.length - 1);
        const firstSlider = [...slider][[...slider].length - 2];
        const _slider = [firstSlider, ...sliderNew];
        setStyleSlide({
            active: -1,
            slider: [..._slider],
        });
    };

    // khi click vào nút icon next
    const nextSlide = (e) => {
        setStyleSlide({
            ...styleSlider,
            active: sliderImg.length,
        });

        // sử dụng : khi bấm nút next thì sẽ tạo mới mảng slider sau 0.8s, để chạy hiệu ứng
        const time = setTimeout(changeSlider, 800);
        return () => clearTimeout(time);
    };
    return (
        <div className={clsx(styles.slider_3d)}>
            <div
                className={clsx(styles.slider_3d_list, {
                    [styles.active]: +active !== -1,
                })}
            >
                {slider.map((i, k) => {
                    return (
                        <div
                            className={clsx(styles.slider_3d_item, {
                                [styles.active]: +active === +k,
                            })}
                            data-index={k - 1}
                            key={k}
                        >
                            <img
                                className={clsx(styles.slider_3d_img)}
                                alt="img"
                                src={i}
                                height="100%"
                                width="100%"
                            />
                            <div
                                className={clsx(styles.slider_3d_overlay)}
                            ></div>
                        </div>
                    );
                })}
            </div>
            <div className={clsx(styles.slider_arrow)}>
                <div
                    className={clsx(styles.slider_arrow_right)}
                    onClick={nextSlide}
                >
                    <img
                        className={clsx(styles.slider_arrow_icon)}
                        src="https://img.icons8.com/ios/50/000000/circled-chevron-right.png"
                        alt="Img arrow right"
                    />
                </div>
            </div>
        </div>
    );
}

export default Slider_3d;
