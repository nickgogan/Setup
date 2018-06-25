import React from 'react';
import Loadable from 'react-loadable'; // eslint-disable-line

import styles from './EvolutionOfRhabditidae.postcss';

const EvolutionOfRhabditidae = () => (
  <div className={styles.container}>
    <p className={styles.text_body}>
      The evolution of male tail morphology has been our primary focus.
    </p>
    <br />
    <p className={styles.text_body}>
      We have used our preliminary estimate of Rhabditidae phylogeny (Tree 2) to
      trace the evolution of some interesting features of Rhabditidae morphology
      and biology.
    </p>
  </div>
);

export default EvolutionOfRhabditidae;
