// @flow

import React from 'react';
import styles from './footer.postcss';

type Props = {
  footerText: string,
};

const Footer = (props: Props) => (
  <div className={styles.footer}>
    <h1>{props.footerText}</h1>
  </div>
);

export default Footer;
