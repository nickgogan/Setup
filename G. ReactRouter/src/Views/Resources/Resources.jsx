import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react'; // eslint-disable-line

import styles from './Resources.postcss';
import DatabasesAndSoftware from '../../components/Databases&Software/Databases&Software';
import Datasources from '../../components/Datasources/Datasources';

const data = [
  {
    title: 'Male tail character matrix for 10 Rhabditidae as used by Fitch',
    date: '(1997)',
  },
];

const Resources = () => (
  <Grid
    stackable
    centered
    divided
    container
    columns={2}
    className={styles.container}
  >
    <Grid.Column>
      <Header as='h2'>
        <Icon name='database' />
        <Header.Content as='h2' className={styles.header}>
          DATABASES & SOFTWARE
        </Header.Content>
      </Header>
      <DatabasesAndSoftware />
    </Grid.Column>

    <Grid.Column>
      <Datasources />
    </Grid.Column>
  </Grid>
);

export default Resources;
