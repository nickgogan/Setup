import React from 'react';
import { Icon } from 'semantic-ui-react'; // eslint-disable-line

import styles from './MobileHeader.postcss';
import SiteLogo from '../../components/SiteLogo/SiteLogo';

const Navigation = () => (
  <div className={styles.navbar}>
    <div className={styles.iconContainer}>
      <Icon name='sidebar' className={styles.icon} />
    </div>
    <SiteLogo />
  </div>
);

export default Navigation;
