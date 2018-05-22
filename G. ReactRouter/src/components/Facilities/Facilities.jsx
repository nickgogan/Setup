import React from 'react';
import { List } from 'semantic-ui-react'; // eslint-disable-line

import styles from './Facilities.postcss';

const Facilities = () => (
  <List relaxed animated selection verticalAlign='middle'>
    <List.Item>
      <List.Content>
        <List.Header as='h4' className={styles.text_title}>
          Genetics Analysis Facility (GAF)
        </List.Header>
        <List.Description as='p' className={styles.text_body}>
          An interdepartmental facility (supervised by Dr. Fitch) for analysis
          of DNA, including sequencing, PCR, fragment size analysis,
          phylogenetic analysis, etc. Funded by a partnership between the
          National Science Foundation and NYU.
        </List.Description>
      </List.Content>
    </List.Item>
  </List>
);

export default Facilities;
