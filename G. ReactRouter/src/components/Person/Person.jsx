import React from 'react';
import { Segment, Image, Container } from 'semantic-ui-react'; // eslint-disable-line

import styles from './Person.postcss';
import Divider from '../UI/Divider/Divider';
import Text from '../UI/Text';

const Person = props => (
  <Segment fluid vertical className={styles.person}>
    <Image
      size='small'
      circular
      src='http://via.placeholder.com/350x150'
      className={styles.bio}
    />
    <Container className={styles.work}>
      <p className={styles.summary}>Summary goes here</p>
      <Divider horizontal />
      <div className={styles.publications}>Publications go here</div>
    </Container>
  </Segment>
);

export default Person;
