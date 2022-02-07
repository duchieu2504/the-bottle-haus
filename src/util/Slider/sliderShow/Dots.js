import React from 'react'

const Dot = (active) => {
    return {
        background: `${active ? 'black' : 'white'}`,
    }
    
}

const Dots = ({slides, activeIndex}) => {
    return (
        <div className="slider__dots">
            {slides.map((slider, i) => {
                const active = activeIndex === i
                return (
                    <span key={slider} className="slider__dot" style={Dot(active)}></span>
                )}
            )}
        </div>
    )
}
export default Dots