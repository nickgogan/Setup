import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'; // eslint-disable-line

function HighlightHead(isLabHead) {
  if (isLabHead) {
    return { color: 'red', };
  }
}
function HighlightNYUEmployee(isNYUEmployee) {
  if (isNYUEmployee) {
    return { color: 'var(--color-header)', };
  }
}

const PrincipalInvestigator = props => (
  <Card>
    <Image src='http://via.placeholder.com/500x500' />
    <Card.Content>
      <Card.Header style={HighlightNYUEmployee(props.isNYUEmployee)}>
        {props.name}
      </Card.Header>
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
