import React from 'react';
import { List } from 'semantic-ui-react'; // eslint-disable-line

import styles from './Education.postcss';

const Education = () => (
  <div>
    <List relaxed animated divided selection verticalAlign='middle'>
      <List.Item>
        <List.Content>
          <List.Header as='h4' className={styles.text_title}>
            Evolution (V23.0058):
          </List.Header>
          <List.Description as='p' className={styles.text_body}>
            An upper-level undergraduate course offered every Fall.
          </List.Description>
        </List.Content>
      </List.Item>

      <List.Item>
        <List.Content>
          <List.Header as='h4' className={styles.text_title}>
            Principles of Evolution (G23.1069):
          </List.Header>
          <List.Description as='p' className={styles.text_body}>
            A graduate course offered every other Spring.
          </List.Description>
        </List.Content>
      </List.Item>

      <List.Item>
        <List.Content>
          <List.Header as='h4' className={styles.text_title}>
            Precellular Evolution and Early Cell Evolution lectures for
            Molecular and Cell Biology (V23.0022):
          </List.Header>
          <List.Description as='p' className={styles.text_body}>
            An undergraduate course offered every Spring.
          </List.Description>
        </List.Content>
      </List.Item>

      <List.Item>
        <List.Content>
          <List.Header as='h4' className={styles.text_title}>
            Foundations of Developmental Genetics:
          </List.Header>
          <List.Description as='p' className={styles.text_body}>
            A PhD graduate year-long course, with lectures every Fall and a
            practical laboratory course every Spring. Associated with the
            inter-school Developmental Genetics Track.
          </List.Description>
        </List.Content>
      </List.Item>
    </List>

    <p className={styles.text_lectures}>
      Lectures are also taught in Principles of Biology (V23.0011), Molecular
      and Cell Biology II (V23.0022), Molecular Genetics (G23.2127), and Cell
      Biology (G23.1051).
    </p>
    <br />
    <p className={styles.text_lectures}>
      For more information about the Department of Biology at NYU, click here.
      For information and application forms for our PhD program in the NYU
      Graduate School of Arts and Sciences, click here.
    </p>
  </div>
);

export default Education;
