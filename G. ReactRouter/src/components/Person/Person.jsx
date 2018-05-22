import React from 'react';
import { Segment, Image, Container, Header } from 'semantic-ui-react'; // eslint-disable-line

import styles from './Person.postcss';
import Divider from '../UI/Divider/Divider';

const Person = props => (
  <Segment fluid='true' vertical className={styles.container}>
    <div className={styles.avatar}>
      <Header className={styles.avatar_header}>{props.fullname}</Header>
      <Image
        size='small'
        circular
        src='http://via.placeholder.com/350x350'
        className={styles.avatar_bio}
      />
      <p className={styles.avatar_topics}>{props.topics}</p>
    </div>
    <Container className={styles.work}>
      <p className={styles.work_summary}>{props.description}</p>
      <Divider horizontal />
      <div className={styles.work_publications}>{props.publications}</div>
    </Container>
  </Segment>
);

export default Person;
