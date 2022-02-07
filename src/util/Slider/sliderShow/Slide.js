import React from 'react'
import  styleSlide  from '../style/styleSlide.js';

const Slide = ({transition, translate, width}) => {
  const data= {transition, translate, width}
  return (
  <div style={styleSlide(data)}></div>
)}

export default Slide