import React from 'react';
import { Loader } from 'semantic-ui-react'; // eslint-disable-line

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
