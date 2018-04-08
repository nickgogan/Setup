// @flow

import React from 'react';

import Routes from '../../Views/Routes';
import DesktopHeader from '../../containers/Header/DesktopHeader';
import DesktopFooter from '../../containers/Footer/DesktopFooter';
import styles from './Desktop.postcss';

export default class LargeView extends React.Component {
  render() {
    return (
      <div>
        <DesktopHeader />
        <Routes />
        <DesktopFooter />
      </div>
    );
  }
}