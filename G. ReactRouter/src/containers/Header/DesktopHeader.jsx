import React from 'react';
import { Container } from 'semantic-ui-react'; // eslint-disable-line

import styles from './DesktopHeader.postcss';
import Navigation from '../../containers/Navigation/Navigation';
import SiteLogo from '../../components/SiteLogo/SiteLogo';

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
