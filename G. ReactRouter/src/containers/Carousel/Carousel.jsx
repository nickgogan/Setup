import React from 'react';
import { Image } from 'semantic-ui-react'; // eslint-disable-line

import styles from './Carousel.postcss';
import Carousel from '../../components/Carousel/Carousel';

const images = [];

const CarouselContainer = () => <Carousel images={images} />;

export default CarouselContainer;
