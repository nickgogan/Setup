// @flow

import React from 'react';
import styles from './Sidebar.postcss';

type Props = {
  sidebarText: string,
};

const Sidepanel = (props: Props) => (
  <div className={styles.sidepanel}>
    <h1>{props.sidebarText}</h1>
  </div>
);

export default Sidepanel;
