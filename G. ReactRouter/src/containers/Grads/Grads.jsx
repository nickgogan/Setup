import React from 'react';
import { Card } from 'semantic-ui-react'; // eslint-disable-line

import styles from './Grads.postcss';
import PrincipalInvestigator from '../../containers/PrincipalInvestigator/PrincipalInvestigator';

const grads = [
  {
    name: 'Karin Kiontke',
    position: 'Postdoctoral Research Scientist',
    description: 'DESCRIPTION',
    currentWork: 'CURRENT WORK',
    nyu: true,
  },
  {
    name: 'Matthew D. Nelson',
    position: 'PhD Student',
    description: 'DESCRIPTION',
    currentWork: 'CURRENT WORK',
  },
  {
    name: 'R. Antonio Herrera',
    position: 'PhD Student',
    description: 'DESCRIPTION',
    currentWork: 'CURRENT WORK',
  },
  {
    name: 'Ji-Sup Yang',
    position: 'MS Student',
    description: 'test',
    currentWork: 'CURRENT WORK',
  },
];

const Grads = () => {
  const items = grads.map(person => (
    <PrincipalInvestigator
      key={person.name}
      name={person.name}
      position={person.position}
      description={person.description}
      currentWork={person.currentWork}
      className={styles.container}
      isNYUEmployee={person.nyu}
    />
  ));
  return (
    <Card.Group stackable centered>
      {items}
    </Card.Group>
  );
};

export default Grads;
