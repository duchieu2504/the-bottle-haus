import { React } from "react";

const rightArrow =
    "https://raw.githubusercontent.com/DZuz14/react-hooks-image-slider/651b4ef7f435c923bbadb1452481bae4f7f4d5f5/src/img/right-arrow.svg";
const leftArrow =
    "https://raw.githubusercontent.com/DZuz14/react-hooks-image-slider/651b4ef7f435c923bbadb1452481bae4f7f4d5f5/src/img/left-arrow.svg";

const ArrowReview = ({ direction, handleClick, activeArrow }) => {
    const displayArrow =
        activeArrow === "active" ? { display: "flex" } : { display: "none" };

    const distance =
        direction === "right" ? { right: "25px" } : { left: "25px" };
    const styleImg =
        direction === "right"
            ? { transform: "translateX: 2px" }
            : { transform: "translateX: -2px" };
    const styleArrow = { ...displayArrow, ...distance };
    return (
        // <div className="slider__arrow">
        <div
            className={
                direction === "right"
                    ? "slider_reviews_arrow slider_reviews_arrow-right"
                    : "slider_reviews_arrow slider_reviews_arrow-left"
            }
            style={styleArrow}
            onClick={handleClick}
        >
            {direction === "right" ? (
                <img style={styleImg} src={rightArrow} alt="ArrowRight" />
            ) : (
                <img style={styleImg} src={leftArrow} alt="ArrowLeft" />
            )}
        </div>
        // </div>
    );
};

export default ArrowReview;
