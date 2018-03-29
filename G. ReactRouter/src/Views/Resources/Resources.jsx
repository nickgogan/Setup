import React from 'react';
import { Grid, Header, Icon, List } from 'semantic-ui-react'; // eslint-disable-line
import Text from '../../components/UI/Text';
import Resource from '../../components/Resource/Resource';

// import Markdown from 'markdown-to-jsx';
// import content from './Resources.md';
import styles from './Resources.postcss';

// <div className={styles.container}>
//   <Markdown>{content}</Markdown>
// </div>

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
      <Header
        as='h2'
        style={{ textAlign: 'center', }}
        className={styles.headerText}
      >
        <Icon name='database' />
        <Header.Content>DATABASES & SOFTWARE</Header.Content>
      </Header>
      <h1 className={styles.headerText}>DATABASES & SOFTWARE</h1>
      <List bulleted>
        <List.Item>Worm Systematics Resource Network (WSRN)</List.Item>
        <List.Item>
          CODEVOLV (our software for codon evolutionary analysis)
        </List.Item>
        <List.Item>
          PopGen2 and SIMUL8 (simulation software from Joe Felsenstein for
          population genetics studies and instruction)
        </List.Item>
      </List>
    </Grid.Column>
    <Grid.Column>
      <Header as='h2' style={{ textAlign: 'center', }}>
        <Icon name='code' />
        <Header.Content>
          Morphological character matrices for Rhabditidae
        </Header.Content>
      </Header>
      <Header as='h2' style={{ textAlign: 'center', }}>
        <Icon name='code' />
        <Header.Content>
          18S ribosomal RNA sequences and alignments for Rhabditidae
        </Header.Content>
      </Header>
      <Header as='h2' style={{ textAlign: 'center', }}>
        <Icon name='code' />
        <Header.Content>
          Combined character matrices for Rhabditidae
        </Header.Content>
      </Header>
    </Grid.Column>
  </Grid>
);

export default Resources;
