// @flow

import React from 'react';

import styles from './DesktopFooter.postcss';
import Sponsors from '../Sponsors/Sponsors';
import Divider from '../../components/UI/Divider/Divider';
import LegalInfo from '../../components/LegalInfo/LegalInfo';

const LargeFooter = () => (
  <div className={styles.container}>
    <Sponsors className={styles.sponsors} />
    <Divider vertical />
    <LegalInfo className={styles.legalinfo} />
  </div>
);

export default LargeFooter;
