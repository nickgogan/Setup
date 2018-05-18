import React from 'react';
import { Header, Icon } from 'semantic-ui-react'; // eslint-disable-line

import styles from './Datasources.postcss';

const Datasources = () => (
  <div>
    <Header as='h2'>
      <Icon name='code' />
      <Header.Content as='p' className={styles.text_title}>
        Morphological character matrices for Rhabditidae
      </Header.Content>
    </Header>

    <Header as='h2'>
      <Icon name='code' />
      <Header.Content as='p' className={styles.text_title}>
        18S ribosomal RNA sequences and alignments for Rhabditidae
      </Header.Content>
    </Header>

    <Header as='h2'>
      <Icon name='code' />
      <Header.Content as='p' className={styles.text_title}>
        Combined character matrices for Rhabditidae
      </Header.Content>
    </Header>
  </div>
);

export default Datasources;
