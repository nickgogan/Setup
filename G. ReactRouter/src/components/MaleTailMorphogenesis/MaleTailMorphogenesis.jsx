import React from 'react';
import { Image } from 'semantic-ui-react'; // eslint-disable-line

import styles from './MaleTailMorphogenesis.postcss';

const MaleTailEvolution = () => (
  <Image.Group>
    <Image src={require('../../assets/images/Tipcells.gif')} />
    <Image src={require('../../assets/images/TipCellsAnim.gif')} />
    <Image src={require('../../assets/images/RetractnAnim.gif')} />
    <Image src={require('../../assets/images/Wildtyp.gif')} />
    <Image src={require('../../assets/images/Lep1.gif')} />
  </Image.Group>
);

export default MaleTailEvolution;
