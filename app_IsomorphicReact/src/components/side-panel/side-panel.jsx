// @flow

import React from 'react';
import styles from './side-panel.postcss';

type Props = {
  sidepanelText: string,
};

const Sidepanel = (props: Props) => (
  <div className={styles.sidepanel}>
    <h1>{props.sidepanelText}</h1>
  </div>
);

export default Sidepanel;
