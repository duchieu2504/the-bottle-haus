import React, { useState, useEffect, useRef } from "react";
import SliderDowContent from "./SliderDowShow/SliderDowContent.js";
import "./Slider_dow.scss";

const SliderImg = (props) => {
    const { slides, times } = props;
    const firstSlide = slides[0];
    const lastSlide = slides[slides.length - 1];
    const slidesCopy = [lastSlide, ...slides, firstSlide]; //WEB
    const [getHeight, setGetHeight] = useState();
    const [state, setState] = useState({
        translate: getHeight,
        transition: 0.45,
        activeIndex: 0,
        transitioning: false,
        _slides: [...slidesCopy], //F8
    });
    const { translate, transition, activeIndex, _slides, transitioning } =
        state;
    const autoPlayRef = useRef();
    const transitionRef = useRef();
    const throttleRef = useRef();
    const resizeRef = useRef();
    const sliderDowRef = useRef();
    useEffect(() => {
        setState({ ...state, translate: getHeight });
    }, [getHeight]);
    useEffect(() => {
        const height = document.querySelector(".slider_dow_item").clientHeight;
        setGetHeight(height);
    }, []);

    useEffect(() => {
        autoPlayRef.current = nextSlide;
        transitionRef.current = smoothTransition;
        throttleRef.current = throttleArrows;
        resizeRef.current = handleResize;
    });

    //ComponentDidMount
    useEffect(() => {
        const sliderDowElement = sliderDowRef.current;
        const smooth = (e) => {
            if (e.target.className.includes("slider_dow_list"))
                transitionRef.current();
        };
        const throttle = (e) => {
            if (e.target.className.includes("slider_dow_list"))
                throttleRef.current();
        };
        const resize = () => {
            resizeRef.current();
        };
        // // khi hiệu ứng bắt đầu
        const transitionStart = sliderDowElement.addEventListener(
            "transitionstart",
            throttle
        );
        // // khi kết thúc hiệu ứng
        const transitionEnd = sliderDowElement.addEventListener(
            "transitionend",
            smooth
        );
        // //
        const onResize = window.addEventListener("resize", resize);
        return () => {
            //     // khi sự kiện chuyển đổi kết thúc
            sliderDowElement.removeEventListener(
                "transitionend",
                transitionEnd
            );
            //     // sự kiện khi kết thúc bắt đầu
            sliderDowElement.removeEventListener(
                "transitionstart",
                transitionStart
            );
            //     // thay đổi kích thước trình duyệt
            window.removeEventListener("resize", onResize);
        };
    }, []);

    //ComponentDidUpdate
    useEffect(() => {
        // const play = () => {
        //     autoPlayRef.current();
        // };
        // let interval = null;
        // if (times) interval = setInterval(play, times * 1000);
        // return () => {
        //     if (times) clearInterval(interval);
        // };
    }, [times, activeIndex]);
    useEffect(() => {
        if (transition === 0) setState({ ...state, transition: 0.45 });
    }, [transition]);

    const handleResize = () => {
        // khi thay đổi trình duyệt thì gán gias trị chuyển đổi bằng 0
        setState({ ...state, translate: getHeight, transition: 0 });
    };

    const throttleArrows = () => {
        // khi sự kiện chuyển đổi bắt đầu
        setState({ ...state, transitioning: true });
    };

    // click vào nút prev
    const prevSlide = () => {
        // Cách 1: F8
        setState({
            ...state,
            activeIndex:
                activeIndex === 0 ? slides.length - 1 : activeIndex - 1,
            translate: activeIndex * getHeight,
        });
    };

    //Click vào nút next
    const nextSlide = () => {
        setState({
            ...state,
            activeIndex:
                activeIndex === slides.length - 1 ? 0 : activeIndex + 1,
            translate: (activeIndex + 2) * getHeight,
        });
    };
    const smoothTransition = () => {
        // khi trình duyệt trang tính đang ở cuối trang tính và chuyển slider lên trang tính đầu
        if (activeIndex + slides.length === _slides.length - 2) {
            setState({
                ...state,
                transition: 0,
                translate: getHeight,
            });
        }

        // khi trình duyệt đang hiển thị trang tính đang ở đầu trang tính(Slider Image vị trí 2), sau đó chuyển động trượt để hiện thị trang tính cuối (Slider Image vị trsi thứ 1), sau khi kết thúc chuyển động sẽ set lại các giá trị của state
        else if (activeIndex + 1 === slides.length) {
            return setState({
                ...state,
                transition: 0,
                translate: getHeight * slides.length,
            });
        }
    };
    return (
        <>
            <div className="slider_dow" ref={sliderDowRef}>
                <SliderDowContent
                    activeIndex={activeIndex}
                    slides={_slides}
                    translate={translate}
                    transition={transition}
                    height={getHeight * slidesCopy.length}
                />
            </div>
            <div className="button_arrow">
                <div className="button">
                    <div
                        className="button_arrow_btn button_arrow_left"
                        onClick={nextSlide}
                    >
                        <img
                            src="https://img.icons8.com/carbon-copy/100/000000/right-squared.png"
                            alt="image"
                        />
                    </div>
                    <div
                        className="button_arrow_btn button_arrow_right"
                        onClick={prevSlide}
                    >
                        <img
                            src="https://img.icons8.com/carbon-copy/100/000000/left-squared.png"
                            alt="Image"
                        />
                    </div>
                    {/* <ArrowDow
                        direction="left"
                        activeArrow="active"
                        handleClick={prevSlide}
                    />
                    <ArrowDow
                        direction="right"
                        activeArrow="active"
                        handleClick={nextSlide}
                    /> */}
                </div>
                <div className="button_arrow_text">
                    <h2>Next Slide</h2>
                    <p>{_slides[activeIndex + 2].name}</p>
                </div>
            </div>
        </>
    );
};
const images = [
    {
        id: 1,
        name: "Lightning Fast Delivery",
        title: "Crown Royal Peach ",
        description:
            "To create this extraordinary blend, crown royal whiskies are carefully selected by their master blender and infused with the juicy flavor of fresh Georgia peaches",
        image: "https://cdn.shopify.com/s/files/1/0313/6228/5699/files/crown-royal-peach-bottle-690x1024_2_2048x_d1e42353-aadc-40a6-aaa6-afdebb304e10_2048x.png?v=1637221111",
    },

    {
        id: 2,
        name: "Haus of Rye",
        title: "Willett Rye ",
        description:
            "This Willett Family Estate Small Batch rye is matured for four years in hand selected White Oak barrels for four years.",
        image: "https://cdn.shopify.com/s/files/1/0313/6228/5699/files/Untitled_400_x_400_px_2048x.png?v=1639618567",
    },

    {
        id: 3,
        name: "Haus of Bourbon",
        title: "Weller 12 Year ",
        description:
            "As part of the wheated bourbon family, this twelve year old W.L. Weller is aged far longer than most wheated bourbons. This offering is a smooth, easy-going and balanced offering with a beautiful deep bronze color.",
        image: "https://cdn.shopify.com/s/files/1/0313/6228/5699/files/2331e2baec76084511d010168836c43a639e1322_2048x.png?v=1639612742",
    },
];
const SliderDow = (props) => <SliderImg slides={images} times={10} />;
export default SliderDow;
