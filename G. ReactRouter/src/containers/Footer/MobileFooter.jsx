// @flow

import React from 'react';

import styles from './MobileFooter.postcss';
import Sponsors from '../Sponsors/Sponsors';
import Divider from '../../components/UI/Divider/Divider';
import LegalInfo from '../../components/LegalInfo/LegalInfo';

const MobileFooter = () => (
  <div className={styles.container}>
    <Divider horizontal className={styles.divider} />
    <Sponsors className={styles.sponsors} />
    <LegalInfo className={styles.legalinfo} />
  </div>
);

export default MobileFooter;
