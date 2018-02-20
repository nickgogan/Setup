// @flow

import React from 'react';
import styles from './side-panel.postcss';

type Props = {
  sidebarText: string,
};

const Sidepanel = (props: Props) => (
  <div className='sidebar'>
    {/* <ul id='log' /> */}
    <h1>{props.sidebarText}</h1>
  </div>
);

export default Sidepanel;
