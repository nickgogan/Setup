// @flow

import React from 'react';
import styles from './side-panel.postcss';

type Props = {
  sidebarText: string,
};

export default class Sidepanel extends React.Component<Props> {
  render() {
    return (
      <div className='sidebar'>
        <ul id='log' />
      </div>
    );
  }
}
