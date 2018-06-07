import React from 'react';

import styles from './Carousel.postcss';

const ImageSlide = props => (
<div>
  {props.images.map(image => <img src='#' alt='Test'/>)}
</div>
);

export default ImageSlide;
