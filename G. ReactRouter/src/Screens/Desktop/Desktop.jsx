import React from 'react';

import styles from './Desktop.postcss';
import Routes from '../../Views/Routes';
import DesktopHeader from '../../containers/Header/DesktopHeader';
import DesktopFooter from '../../containers/Footer/DesktopFooter';

export default class LargeView extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <DesktopHeader />
        <Routes />
        <DesktopFooter />
      </div>
    );
  }
}
