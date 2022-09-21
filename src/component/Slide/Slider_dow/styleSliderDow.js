const styleSliderDow = (props) => {
    return {
        transform: `translateY(-${props.translate}px)`,
        transition: `transform ease-out ${props.transition}s`,
        height: `${props.height}px`,
    };
};
export default styleSliderDow;
