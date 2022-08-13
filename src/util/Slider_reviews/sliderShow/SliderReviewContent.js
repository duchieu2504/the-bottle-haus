import clsx from "clsx";
import { React } from "react";
import styleSliderReview from "../styleSlider.js";
import styles from "./SliderReview.module.scss";

const SliderReviewContent = ({
    slides,
    transition,
    translate,
    width,
    activeIndex,
}) => {
    // const [img, setImg] = useState('')
    const data = { transition, translate, width };

    return (
        <div
            className={clsx(styles.slider_reviews_list)}
            style={styleSliderReview(data)}
        >
            {slides.map((slide, i) => (
                <div
                    className={clsx(styles.slider_reviews_item)}
                    key={i}
                    data-aos="zoom-in-right"
                    data-aos-delay={(i + 1) * 50}
                    data-aos-duration={(i + 5) * 150}
                    data-index={i - 3}
                    aria-hidden={activeIndex === i - 3 ? "false" : "true"}
                >
                    <div className={clsx(styles.slider_reviews_item_text)}>
                        <p>{slide.text}</p>
                        <h2>{slide.name}</h2>
                    </div>
                    <div className={clsx(styles.slider_reviews_item_img)}>
                        {slide.image ? (
                            <img src={slide.image} alt="" />
                        ) : (
                            <div
                                className={clsx(
                                    styles.slider_reviews_item_no_img
                                )}
                            ></div>
                        )}
                    </div>
                    <div className={clsx(styles.slider_reviews_item_product)}>
                        {slide.product}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SliderReviewContent;
