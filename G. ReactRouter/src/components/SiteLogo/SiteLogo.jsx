import React from 'react';
import styles from './SiteLogo.postcss';

const SiteLogo = () => (
  <a href='/' className={styles.logo}>
    <h1 className={styles.fitch}>FITCH</h1>
    <br />
    <h2 className={styles.lab}>Laboratory</h2>
  </a>
);

export default SiteLogo;
