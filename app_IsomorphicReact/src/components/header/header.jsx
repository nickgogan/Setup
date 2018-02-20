// @flow

import React from 'react';
import styles from './header.postcss';

type Props = {
  headerText: string,
};

const Header = (props: Props) => (
  <div className='header'>
    <h1>{props.headerText}</h1>
  </div>
);

export default Header;
