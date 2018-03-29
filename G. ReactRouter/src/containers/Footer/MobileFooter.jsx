// @flow

import React from 'react';

import Sponsors from '../Sponsors/Sponsors';
import Divider from '../../components/UI/Divider/Divider';
import LegalInfo from '../../components/LegalInfo/LegalInfo';
import styles from './MobileFooter.postcss';

const MobileFooter = () => (
  <div className={styles.footer}>
    <Divider horizontal className={styles.divider} />
    <Sponsors className={styles.sponsors} />
    <LegalInfo className={styles.legalinfo} />
  </div>
);

export default MobileFooter;
