import React from 'react';
import { Container } from 'semantic-ui-react'; // eslint-disable-line
import { NavLink } from 'react-router-dom'; // eslint-disable-line

import Navigation from '../../components/Navigation/Navigation';
import SiteLogo from '../../components/SiteLogo/SiteLogo';
import styles from './DesktopHeader.postcss';

const LargeNavigation = () => (
  <div className={styles.container}>
    <Container>
      <SiteLogo />
    </Container>
    <Container>
      <Navigation size='large' />
    </Container>
  </div>
);

export default LargeNavigation;
