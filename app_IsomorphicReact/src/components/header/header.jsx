// @flow

import React from 'react';
import styles from './header.postcss';

type Props = {
  headerText: string,
};

const Header = (props: Props) => (
  <nav className={styles.header}>
    <ul>
      <h1>
        <a href='#'>{props.headerText}</a>
      </h1>
    </ul>
  </nav>
);

export default Header;
