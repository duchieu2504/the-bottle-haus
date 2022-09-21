
const styleSlide = (props) => {
    return {
        transform: `translateX(-${props.translate}px)`,
        transition: `transform ease-out ${props.transition}s`,
        width: `${props.width}px`,
    }
  }
export default styleSlide