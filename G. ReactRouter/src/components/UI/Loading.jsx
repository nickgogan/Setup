// @flow

import React from 'react';
import { Loader, Dimmer, } from 'semantic-ui-react';

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Loading = () => (
  <Loader inline active style={styles}>
    Loading...
  </Loader>
);

export default Loading;
