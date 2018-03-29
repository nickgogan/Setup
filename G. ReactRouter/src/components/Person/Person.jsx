import React from 'react';
import { Card, Image, Container, Header, } from 'semantic-ui-react';

import styles from './Person.postcss';
import Divider from '../UI/Divider/Divider';

const Person = props => (
  <Card fluid style={{ display: 'flex', }} className={styles.person}>
    <Image
      size='small'
      circular
      centered
      src='http://via.placeholder.com/350x150'
    />
    <Card.Content>
      <Card.Header>{props.fullname}</Card.Header>
      <Card.Meta>{props.topics}</Card.Meta>
      <Card.Description style={{ marginBottom: '1rem', }}>
        {props.description}
      </Card.Description>
      <Divider horizontal />
      <Container className={styles.publications}>
        {props.publications}
      </Container>
    </Card.Content>
  </Card>
);

export default Person;
