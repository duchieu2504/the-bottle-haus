import { React } from "react";
import { NavLink } from "react-router-dom";
import styleSliderDow from "../styleSliderDow.js";

const SliderDowContent = ({
    slides,
    transition,
    translate,
    height,
    activeIndex,
}) => {
    // const [img, setImg] = useState('')
    const data = { transition, translate, height };
    return (
        <div className="slider_list" style={styleSliderDow(data)}>
            {slides.map((slide, i) => (
                <div
                    className="slider_item"
                    key={i}
                    data-index={i - 1}
                    aria-hidden={activeIndex === i - 1 ? "false" : "true"}
                >
                    <div className="slider_item_text">
                        <h2>{slide.name}</h2>
                        <h1>{slide.title}</h1>
                        <span className="slider_item_text_stroke">
                            in Stock
                        </span>
                        <p>{slide.description}</p>
                        <button type="button" className="btn_shop_show">
                            <NavLink to="/" className="btn_shop_show_link">
                                Shop Show
                            </NavLink>
                        </button>
                        <div className="text_number">
                            <span>0{i}</span>
                            <div className="text_line"></div>
                        </div>
                    </div>

                    <div className="slider_item_img">
                        <div
                            className="img"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                            }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SliderDowContent;
