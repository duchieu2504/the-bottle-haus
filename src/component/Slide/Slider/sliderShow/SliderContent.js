import { React } from "react";
import styleSlide from "../style/styleSlide.js";

const SliderContent = ({
    slides,
    transition,
    translate,
    width,
    activeIndex,
}) => {
    // const [img, setImg] = useState('')
    const data = { transition, translate, width };
    return (
        <div className="slider_horizontal_list" style={styleSlide(data)}>
            {slides.map((slide, i) => (
                <div
                    className="slider_horizontal_item"
                    key={i}
                    data-index={i - 1}
                    aria-hidden={activeIndex === i - 1 ? "false" : "true"}
                >
                    <div
                        className="slider_horizontal_item_img"
                        style={{ backgroundImage: `url(${slide})` }}
                    ></div>
                </div>
            ))}
        </div>
    );
};

export default SliderContent;
