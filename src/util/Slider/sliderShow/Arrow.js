import Image from "assets/image";
import RightArrow from "assets/image/rightArrow.png";
import { React } from "react";

const rightArrow =
    "https://img.icons8.com/ios-filled/50/ffffff/chevron-right.png";

const leftArrow =
    "https://img.icons8.com/ios-filled/50/ffffff/chevron-left.png";

const Arrow = ({ direction, handleClick, activeArrow }) => {
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
        <div
            className={
                direction === "right"
                    ? "slider_arrow slider_arrow-right"
                    : "slider_arrow slider_arrow-left"
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
    );
};

export default Arrow;
