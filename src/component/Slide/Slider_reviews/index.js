import React, { useState, useEffect, useRef } from "react";

import "./Slider_review.scss";

import SliderReviewContent from "./sliderShow/SliderReviewContent.js";
import ArrowReview from "./sliderShow/Arrow";

//https://betterprogramming.pub/react-hooks-slider-how-to-build-an-image-slider-with-smooth-transitions-automatic-resizing-8a99859ac471
// fake 1.1.1.1
// const getWidth = () => window.innerWidth;
const SliderImg = (props) => {
    const { slides, times } = props;
    const firstSlide = slides[0];
    const twoSlide = slides[1];
    const threeSlide = slides[2];
    const lastSlide = slides[slides.length - 1];
    const lastTwoSlide = slides[slides.length - 2];
    const lastThreeSlide = slides[slides.length - 3];
    const slidesCopy = [
        lastThreeSlide,
        lastTwoSlide,
        lastSlide,
        ...slides,
        firstSlide,
        twoSlide,
        threeSlide,
    ]; //WEB

    const [getWidth, setGetWidth] = useState();

    const [state, setState] = useState({
        translate: getWidth * 2,
        transition: 0.45,
        activeIndex: 1,
        transitioning: false,
        _slides: [...slidesCopy], //F8
        // _slides: [lastSlide, firstSlide, secondSlide],  //WEB
    });
    const { translate, transition, activeIndex, _slides, transitioning } =
        state;

    const autoPlayRef = useRef();
    const transitionRef = useRef();
    const throttleRef = useRef();
    const resizeRef = useRef();
    const sliderReviewRef = useRef();

    useEffect(() => {
        setState({ ...state, translate: getWidth * 3 });
    }, [getWidth]);

    useEffect(() => {
        const width = document.querySelector(".slider_reviews").clientWidth;
        let translateWidth;
        if (window.innerWidth < 768) {
            translateWidth = width;
        } else if (768 <= window.innerWidth < 1024) {
            translateWidth = width;
        } else {
            console.log("1");
        }
        if (window.innerWidth > 1024) {
            translateWidth = width / 3;
        }
        setGetWidth(translateWidth);
    }, []);

    useEffect(() => {
        autoPlayRef.current = nextSlide;
        transitionRef.current = smoothTransition;
        throttleRef.current = throttleArrows;
        resizeRef.current = handleResize;
    });

    //ComponentDidMount
    useEffect(() => {
        const sliderElement = sliderReviewRef.current;
        const smooth = (e) => {
            if (e.target.className.includes("slider_reviews_list"))
                transitionRef.current();
        };

        const throttle = (e) => {
            if (e.target.className.includes("slider_reviews_list"))
                throttleRef.current();
        };

        const resize = () => {
            resizeRef.current();
        };
        // khi hi???u ???ng b???t ?????u
        const transitionStart = sliderElement.addEventListener(
            "transitionstart",
            throttle
        );

        // khi k???t th??c hi???u ???ng
        const transitionEnd = sliderElement.addEventListener(
            "transitionend",
            smooth
        );

        //
        const onResize = window.addEventListener("resize", resize);
        return () => {
            // khi s??? ki???n chuy???n ?????i k???t th??c
            sliderElement.removeEventListener("transitionend", transitionEnd);

            // s??? ki???n khi k???t th??c b???t ?????u
            sliderElement.removeEventListener(
                "transitionstart",
                transitionStart
            );

            // thay ?????i k??ch th?????c tr??nh duy???t
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
        // khi thay ?????i tr??nh duy???t th?? g??n gias tr??? chuy???n ?????i b???ng 0
        setState({ ...state, translate: getWidth, transition: 0 });
    };

    const throttleArrows = () => {
        // khi s??? ki???n chuy???n ?????i b???t ?????u
        setState({ ...state, transitioning: true });
    };

    // click v??o n??t prev
    const prevSlide = () => {
        // C??ch 1: F8
        if (transitioning) {
            setState({
                ...state,
                activeIndex:
                    activeIndex === 1 ? slides.length : activeIndex - 1,
                translate: (activeIndex + 1) * getWidth,
            });
        }
    };

    //Click v??o n??t next
    const nextSlide = () => {
        //F8
        if (transitioning) {
            setState({
                ...state,
                activeIndex:
                    activeIndex === slides.length ? 1 : activeIndex + 1,
                translate: (activeIndex + 3) * getWidth,
            });
        }
    };

    const smoothTransition = () => {
        // khi tr??nh duy???t trang t??nh ??ang ??? cu???i trang t??nh v?? chuy???n slider l??n trang t??nh ?????u
        if (activeIndex + slides.length === _slides.length - 5) {
            setState({
                ...state,
                transition: 0,
                translate: getWidth * 3,
            });
        }
        // khi tr??nh duy???t ??ang hi???n th??? trang t??nh ??ang ??? ?????u trang t??nh(Slider Image v??? tr?? 2), sau ???? chuy???n ?????ng tr?????t ????? hi???n th??? trang t??nh cu???i (Slider Image v??? trsi th??? 1),
        // sau khi k???t th??c chuy???n ?????ng s??? set l???i c??c gi?? tr??? c???a state
        else if (activeIndex === slides.length) {
            return setState({
                ...state,
                transition: 0,
                translate: getWidth * (slides.length + 2),
            });
        }
    };
    return (
        <div className="slider_reviews" ref={sliderReviewRef}>
            <SliderReviewContent
                activeIndex={activeIndex}
                slides={_slides}
                translate={translate}
                transition={transition}
                width={getWidth * slidesCopy.length}
            />
            {/* <Dots slides={slides} activeIndex={activeIndex} /> */}
            <div className="slider_reviews_btn">
                <ArrowReview
                    direction="left"
                    activeArrow="active"
                    handleClick={prevSlide}
                />
                <ArrowReview
                    direction="right"
                    activeArrow="active"
                    handleClick={nextSlide}
                />
            </div>
        </div>
    );
};
const images = [
    {
        name: " Busy Guy in Peachtree City ",
        text: "Summertime is for G&T, and Aviation American Gin has the legs to stand up to tonic with double lime, as my late Father-in-Law taught me. He was a lifelong native of New Orleans, where people take their drinking seriously. He also introduced me to Aviation American Gin. Despite the flavorings of the quinine and lime, the robust botanicals of Aviation American Gin come through. Five stars no matter how you drink it.",
        image: null,
        product: " Aviation American Gin ",
    },
    {
        name: "  Kevin Rust  ",
        text: "This is a favorite of mine. Excellent sipper neat or on an ice ball.",
        image: "",
        product: " Devils River Small Batch Bourbon Whiskey ",
    },
    {
        name: " Sabrina hill ",
        text: "It's very delicious I love it and I will be getting more when I get my money!!",
        image: "",
        product:
            " Black Irish By Mariah Carey Salted Caramel Irish Cream Liqueur ",
    },
    {
        name: " whiskey drinker ",
        text: "Old school sour mash at it's finest. A true sipping whiskey.",
        image: "",
        product: " George Dickel Superior No. 12 Tennessee Whiskey ",
    },
    {
        name: " Burt Halstead ",
        text: "The Bottle Haus Shipping Protection",
        image: "",
        product: " The Bottle Haus Shipping Protection ",
    },
    {
        name: " Thomas Redfern ",
        text: " I like my bourbon. This Cooperstown is very good!! Goes down smoothly and easy to drink. I wasn't going to drink my first bottle, but alas I did and had to buy another one. Likely I will have to get another one.",
        image: "",
        product: " Cooperstown Doubleday Baseball Bourbon Whiskey ",
    },
];
const SliderReviews = (props) => <SliderImg slides={images} times={10} />;
export default SliderReviews;
