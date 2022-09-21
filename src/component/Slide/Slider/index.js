import React, { useState, useEffect, useRef } from "react";
import "./Slider.scss";
import SliderContent from "./sliderShow/SliderContent.js";
import Arrow from "./sliderShow/Arrow.js";

//https://betterprogramming.pub/react-hooks-slider-how-to-build-an-image-slider-with-smooth-transitions-automatic-resizing-8a99859ac471
// fake 1.1.1.1
// const getWidth = () => window.innerWidth;
const SliderImg = (props) => {
    const { slides, times } = props;
    const firstSlide = slides[0];
    const lastSlide = slides[slides.length - 1];
    // const secondSlide = slides[[1]];
    const slidesCopy = [lastSlide, ...slides, firstSlide]; //WEB
    const [getWidth, setgetWidth] = useState();

    const [state, setState] = useState({
        translate: getWidth,
        transition: 0.45,
        activeIndex: 0,
        transitioning: false,
        _slides: [...slidesCopy], //F8
        // _slides: [lastSlide, firstSlide, secondSlide], //WEB
    });
    const { translate, transition, activeIndex, _slides, transitioning } =
        state;
    const autoPlayRef = useRef();
    const transitionRef = useRef();
    const throttleRef = useRef();
    const resizeRef = useRef();
    const sliderRef = useRef();

    useEffect(() => {
        const width = document.querySelector(".slider_horizontal").clientWidth;
        setgetWidth(width);
    }, []);

    useEffect(() => {
        setState({ ...state, translate: getWidth });
    }, [getWidth]);

    useEffect(() => {
        autoPlayRef.current = nextSlide;
        transitionRef.current = smoothTransition;
        throttleRef.current = throttleArrows;
        resizeRef.current = handleResize;
    });

    //ComponentDidMount
    useEffect(() => {
        const sliderElement = sliderRef.current;
        const smooth = (e) => {
            if (e.target.className.includes("slider_horizontal_list"))
                transitionRef.current();
        };

        const throttle = (e) => {
            if (e.target.className.includes("slider_horizontal_list"))
                throttleRef.current();
        };

        const resize = () => {
            resizeRef.current();
        };
        // khi hiệu ứng bắt đầu
        const transitionStart = sliderElement.addEventListener(
            "transitionstart",
            throttle
        );

        // khi kết thúc hiệu ứng
        const transitionEnd = sliderElement.addEventListener(
            "transitionend",
            smooth
        );

        //
        const onResize = window.addEventListener("resize", resize);
        return () => {
            // khi sự kiện chuyển đổi kết thúc
            sliderElement.removeEventListener("transitionend", transitionEnd);

            // sự kiện khi kết thúc bắt đầu
            sliderElement.removeEventListener(
                "transitionstart",
                transitionStart
            );

            // thay đổi kích thước trình duyệt
            window.removeEventListener("resize", onResize);
        };
    }, []);

    //ComponentDidUpdate
    useEffect(() => {
        const play = () => {
            autoPlayRef.current();
        };
        let interval = null;
        if (times) interval = setInterval(play, times * 1000);
        return () => {
            if (times) clearInterval(interval);
        };
    }, [times, activeIndex]);

    useEffect(() => {
        if (transition === 0) setState({ ...state, transition: 0.45 });
    }, [transition]);

    const handleResize = () => {
        // khi thay đổi trình duyệt thì gán gias trị chuyển đổi bằng 0
        setState({ ...state, translate: getWidth, transition: 0 });
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
            translate: activeIndex * getWidth,
        });
        // Cách 2: Web
        // if (transitioning) return;
        // setState({
        //     ...state,
        //     translate: 0,
        //     activeIndex:
        //         activeIndex === 0 ? slides.length - 1 : activeIndex - 1,
        // });
    };
    //Click vào nút next
    const nextSlide = () => {
        //F8
        setState({
            ...state,
            activeIndex:
                activeIndex === slides.length - 1 ? 0 : activeIndex + 1,
            translate: (activeIndex + 2) * getWidth,
        });
        // WEB

        // if (transitioning) return;
        // setState({
        //     ...state,
        //     translate: translate + getWidth,
        //     activeIndex:
        //         activeIndex === slides.length - 1 ? 0 : activeIndex + 1,
        // });
    };
    const smoothTransition = () => {
        // THEO SLIDERSHOW OF WEB
        // let _slides = [];
        // // Khi trình duyệt đang hiện thị trang tính cuối
        // if (activeIndex === slides.length - 1)
        //     _slides = [slides[slides.length - 2], lastSlide, firstSlide];
        // else if (activeIndex === 0)
        //     _slides = [lastSlide, firstSlide, secondSlide];
        // // Khi đang ở trang tính đầu
        // else _slides = slides.slice(activeIndex - 1, activeIndex + 2); // khi đang hiện thị các trang tính ở giữa slider
        // setState({
        //     ...state,
        //     _slides,
        //     transition: 0,
        //     translate: getWidth,
        // });
        // THEO SLIDERSHOW OF F8
        // khi trình duyệt trang tính đang ở cuối trang tính và chuyển slider lên trang tính đầu
        // khi đo activeIndex từ slides.length  -1 về 0 thì ,
        if (activeIndex + slides.length === _slides.length - 2) {
            setState({
                ...state,
                transition: 0,
                translate: getWidth,
            });
        }
        // khi trình duyệt đang hiển thị trang tính đang ở đầu trang tính(Slider Image vị trí 2), sau đó chuyển động trượt để hiện thị trang tính cuối (Slider Image vị trsi thứ 1),
        // sau khi kết thúc chuyển động sẽ set lại các giá trị của state
        else if (activeIndex + 1 === slides.length) {
            setState({
                ...state,
                transition: 0,
                translate: getWidth * slides.length,
            });
        }
    };

    return (
        <div className="slider_horizontal" ref={sliderRef}>
            <SliderContent
                activeIndex={activeIndex}
                slides={_slides}
                translate={translate}
                transition={transition}
                width={getWidth * slidesCopy.length}
            />
            <div className="slider_horizontal_wrap">
                <div className="slider_horizontal_length">
                    <span className="slider_horizontal_length_current">
                        {`0${activeIndex + 1}`}
                    </span>
                    <img
                        src="//cdn.shopify.com/s/files/1/0313/6228/5699/t/32/assets/legend_slider-nav.svg?v=87690718743178373891642089726"
                        alt="length Slider"
                    ></img>
                    <span className="slider_horizontal_length_last">04</span>
                </div>
                <div className="slider_horizontal_buttons">
                    <Arrow
                        direction="left"
                        activeArrow="active"
                        handleClick={prevSlide}
                    />
                    <Arrow
                        direction="right"
                        activeArrow="active"
                        handleClick={nextSlide}
                    />
                </div>
            </div>
        </div>
    );
};
const images = [
    "https://cdn.shopify.com/s/files/1/0313/6228/5699/files/Group_487_2.jpg?v=1633630122",
    "https://cdn.shopify.com/s/files/1/0313/6228/5699/files/Group_493.png?v=1633630517",
    "https://cdn.shopify.com/s/files/1/0313/6228/5699/files/Group_491_2.png?v=1633630769",
    "https://cdn.shopify.com/s/files/1/0313/6228/5699/files/Group_495_1.png?v=1633631040",
];
const Slider = (props) => <SliderImg slides={images} times={10} />;
export default Slider;
