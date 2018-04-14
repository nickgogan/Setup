import React from 'React'; // eslint-disable-line
import { Card } from 'semantic-ui-react'; // eslint-disable-line

function setLinks(urls) {}

const Paper = props => (
  <Card fluid>
    <Card.Header>{props.title}</Card.Header>
    <Card.Meta>{props.datePublished}</Card.Meta>
    <Card.Content>TEST</Card.Content>
    <Card.Content extra textAlign='right'>
      TEST
    </Card.Content>
  </Card>
);

export default Paper;
