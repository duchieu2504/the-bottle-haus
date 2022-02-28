import React, {useState, useEffect, useRef} from 'react'
import './Slider.scss'
import SliderContent from './sliderShow/SliderContent.js'
import Dots from './sliderShow/Dots.js'
import Arrow from './sliderShow/Arrow.js'

//https://betterprogramming.pub/react-hooks-slider-how-to-build-an-image-slider-with-smooth-transitions-automatic-resizing-8a99859ac471
const getWidth = () => window.innerWidth
const SliderImg = props => {
    const { slides, times } = props
    const firstSlide = slides[0]
    // const secondSlide = slides[1]
    const lastSlide = slides[slides.length - 1]
    const slidesCopy = [lastSlide ,...slides, firstSlide] //WEB
    
    const [state, setState] = useState({
        translate: getWidth(),
        transition: 0.45,
        activeIndex: 0,
        transitioning: false,
        _slides: [...slidesCopy], //F8
        // _slides: [lastSlide, firstSlide, secondSlide],  //WEB
      })
    const { translate, transition, activeIndex, _slides, transitioning} = state
    const autoPlayRef = useRef()
    const transitionRef = useRef()
    const throttleRef = useRef()
    const resizeRef = useRef()

    useEffect(() => {
        autoPlayRef.current = nextSlide
        transitionRef.current = smoothTransition
        throttleRef.current = throttleArrows
        resizeRef.current = handleResize
    }, )

    //ComponentDidMount
    useEffect(() => {
        
        const smooth = () => {
            transitionRef.current()
        }

        const throttle = (e) => {
            throttleRef.current()
        }

        const resize = () => {
            resizeRef.current()
        }
        window.addEventListener('transitionstart', throttle)
        window.addEventListener('transitionend', smooth)
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('transitionend', smooth)
            window.removeEventListener('transitionstart', throttle)
            window.removeEventListener('resize', resize)
        }
    }, [])

    //ComponentDidUpdate
    useEffect(() => {
        const play = () => {
            autoPlayRef.current()
        }
        let interval = null
        if(times) {
            interval = setInterval(play, times * 1000)
        }
        return () => {
            if(times) {
                clearInterval(interval)
            }
        }
    }, [times, activeIndex])
    useEffect(() => {
        if (transition === 0) setState({...state, transition: 0.45 })
    }, [transition, state])
    
    const handleResize = () => {
        setState({ ...state, translate: getWidth(), transition: 0 })
    }

    const throttleArrows = () => {
        setState({ ...state, transitioning: true})
    }

    // click vào nút prev
    const prevSlide = () => {
        if(transitioning) {
            setState({
                ...state,
                activeIndex: activeIndex === 0 ? slides.length - 1 : activeIndex - 1,
                translate: activeIndex  * getWidth()
              })
        }
    }
    //     setState({
    //     ...state,
    //     translate: 0,
    //     activeIndex: activeIndex === 0 ? slides.length - 1 : activeIndex - 1
    //   })

    //Click vào nút next
    const nextSlide = () => {
//F8
        // if(transitioning) {
            setState({
              ...state,
              activeIndex: activeIndex === slides.length - 1 ? 0 : activeIndex + 1,
              translate: (activeIndex + 2) * getWidth()
            })
        // }
      }
// WEB
        // setState({
        //     ...state,
        //     translate: translate + getWidth(),
        //     activeIndex: activeIndex === slides.length - 1 ? 0 : activeIndex + 1
        // })

        
    const smoothTransition = () => {
// THEO SLIDERSHOW OF WEB
        // let _slides = []
        // if(activeIndex === slides.length - 1) 
        //     _slides = [slides[slides.length - 2], lastSlide, firstSlide]
        // else if(activeIndex === 0) _slides = [lastSlide, firstSlide, secondSlide]
        // else _slides = slides.slice(activeIndex - 1, activeIndex + 2)
        // setState ({
        //     ...state,
        //     _slides,
        //     transition: 0,
        //     translate: getWidth(),
        // })

// THEO SLIDERSHOW OF F8
        if (activeIndex + slides.length === _slides.length - 2) {
            setState ({
                    ...state,
                    transition: 0,
                    translate: getWidth(),
                })
        } 
        else if (activeIndex + 1 === slides.length ) {
            return setState ({
                ...state,
                transition: 0,
                translate: getWidth() * slides.length,
            })
        }
    }
    return (
        <div className="slider">
            <SliderContent 
                activeIndex={activeIndex}
                slides={_slides}
                translate={translate}
                transition={transition}
                width={getWidth() * slidesCopy.length}
                />
            <Dots 
                slides={slides}
                activeIndex={activeIndex}
            />
            <Arrow direction='left' activeArrow='active' handleClick={prevSlide}/>
            <Arrow direction='right' activeArrow='active' handleClick={nextSlide}/>
            
        </div>
    )
}
const images = [
    'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
    'https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80',
    'https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80',
    'https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80'
  ]
const Slider = props => (<SliderImg slides={images} times={10}/>)
export default Slider