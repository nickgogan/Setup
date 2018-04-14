import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'; // eslint-disable-line

function HighlightHead(isLabHead) {
  if (isLabHead) {
    return { color: 'red', };
  }
}

const PrincipalInvestigator = props => (
  <Card>
    <Image src='http://via.placeholder.com/500x500' />
    <Card.Content>
      <Card.Header>{props.name}</Card.Header>
      <Card.Meta>
        <span style={HighlightHead(props.isLabHead)}>{props.position}</span>
      </Card.Meta>
      <Card.Description>{props.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Icon name='lab' />
      {props.currentWork}
    </Card.Content>
  </Card>
);

export default PrincipalInvestigator;
