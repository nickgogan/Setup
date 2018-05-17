import React from 'react';
import { Grid, Header, Icon, List } from 'semantic-ui-react'; // eslint-disable-line
// import Text from '../../components/UI/Text';
// import Resource from '../../components/Resource/Resource';

import styles from './Resources.postcss';

const data = [
  {
    title: 'Male tail character matrix for 10 Rhabditidae as used by Fitch',
    date: '(1997)',
  },
];

const Resources = props => (
  <Grid
    stackable
    centered
    divided
    container
    columns={2}
    style={{ paddingLeft: '1.5rem', }}
  >
    <Grid.Column>
      <Header as='h2'>
        <Icon name='database' />
        <Header.Content as='h2' className={styles.header}>
          DATABASES & SOFTWARE
        </Header.Content>
      </Header>

      <List bulleted>
        <List.Item>
          <List.Content>
            <List.Header as='h4' className={styles.text_title}>
              Worm Systematics Resource Network (WSRN)
            </List.Header>
            <List.Description as='p' className={styles.text_body}>
              [TODO]Lorem ipsum
            </List.Description>
          </List.Content>
        </List.Item>

        <List.Item>
          <List.Content>
            <List.Header as='h4' className={styles.text_title}>
              CODEVOLV (our software for codon evolutionary analysis)
            </List.Header>
            <List.Description as='p' className={styles.text_body}>
              [TODO]Lorem ipsum
            </List.Description>
          </List.Content>
        </List.Item>

        <List.Item>
          <List.Content>
            <List.Header as='h4' className={styles.text_title}>
              PopGen2 and SIMUL8 (simulation software from Joe Felsenstein for
              population genetics studies and instruction)
            </List.Header>
            <List.Description as='p' className={styles.text_body}>
              [TODO]Lorem ipsum
            </List.Description>
          </List.Content>
        </List.Item>
      </List>
    </Grid.Column>

    <Grid.Column>
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
    </Grid.Column>
  </Grid>
);

export default Resources;
