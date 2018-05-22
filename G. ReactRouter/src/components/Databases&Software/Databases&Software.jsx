import React from 'react';
import { List } from 'semantic-ui-react'; // eslint-disable-line

import styles from './Databases&Software.postcss';

const DatabasesAndSoftware = () => (
  <List relaxed animated divided selection>
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
);

export default DatabasesAndSoftware;
