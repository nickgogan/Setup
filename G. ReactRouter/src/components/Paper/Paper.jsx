import React from 'React'; // eslint-disable-line
import { Card } from 'semantic-ui-react'; // eslint-disable-line

function setLinks(urls) {}

const Publication = props => {
  <Card fluid>
    <Card.Header>{props.title}</Card.Header>
    <Card.Meta>{props.authors.map(author => <span>author</span>)}</Card.Meta>
    <Card.Content extra textAlign='right'>
      <div>{props.urls.map(url => <span>url</span>)}</div>
    </Card.Content>
  </Card>;
};

export default Publication;
