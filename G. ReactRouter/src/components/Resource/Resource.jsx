import React from 'react';
import { Card } from 'semantic-ui-react'; // eslint-disable-line

export default class Resource extends React.Component {
  render() {
    return (
      <Card>
        <Card.Header>{this.props.title}</Card.Header>
        <Card.Content>{this.props.contents}</Card.Content>
        <Card.Content extra>{this.props.date}</Card.Content>
      </Card>
    );
  }
}
