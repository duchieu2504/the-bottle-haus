const styleSlide_3d = (props) => {
    return {
        transform: `translateX(-${props.translate}px)`,
        transition: `transform ease-out ${props.transition}s`,
    }
  }
export default styleSlide_3d