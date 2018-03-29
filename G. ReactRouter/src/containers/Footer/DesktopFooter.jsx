// @flow

import React from 'react';

import Sponsors from '../Sponsors/Sponsors';
import Divider from '../../components/UI/Divider/Divider';
import LegalInfo from '../../components/LegalInfo/LegalInfo';
import styles from './DesktopFooter.postcss';

const LargeFooter = () => (
  <div className={styles.footer}>
    <Sponsors className={styles.sponsors} />
    <Divider vertical />
    <LegalInfo className={styles.legalinfo} />
  </div>
);

export default LargeFooter;
