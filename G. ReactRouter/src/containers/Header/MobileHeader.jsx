// @flow

import React from 'react';
import { Icon } from 'semantic-ui-react'; // eslint-disable-line

import SiteLogo from '../../components/SiteLogo/SiteLogo';
import styles from './MobileHeader.postcss';

const Navigation = props => (
  <div className={styles.navbar}>
    <div className={styles.iconContainer}>
      <Icon name='sidebar' className={styles.icon} />
    </div>
    <SiteLogo />
  </div>
);

export default Navigation;
