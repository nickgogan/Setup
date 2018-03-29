import React from 'react';
import { Card } from 'semantic-ui-react'; // eslint-disable-line
import Person from '../../components/Person/Person';

import styles from './People.postcss';

const people = [
  {
    fullname: 'Project Report - April',
    description:
      'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    topics: 'Topic 1, Topic 2, Topic 3',
    publications: 'Paper 1, Paper 2',
  },
  {
    fullname: 'Project Report - May',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    topics: 'Topic 1, Topic 2, Topic 3',
    publications: 'Paper 1, Paper 2',
  },
  {
    fullname: 'Project Report - June',
    description:
      'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    topics: 'Topic 1, Topic 2, Topic 3',
    publications: 'Paper 1, Paper 2',
  },
  {
    fullname: 'Project Report - April',
    description:
      'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    topics: 'Topic 1, Topic 2, Topic 3',
    publications: 'Paper 1, Paper 2',
  },
  {
    fullname: 'Project Report - May',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    topics: 'Topic 1, Topic 2, Topic 3',
    publications: 'Paper 1, Paper 2',
  },
  {
    fullname: 'Project Report - June',
    description:
      'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    topics: 'Topic 1, Topic 2, Topic 3',
    publications: 'Paper 1, Paper 2',
  },
  {
    fullname: 'Project Report - April',
    description:
      'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    topics: 'Topic 1, Topic 2, Topic 3',
    publications: 'Paper 1, Paper 2',
  },
  {
    fullname: 'Project Report - May',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    topics: 'Topic 1, Topic 2, Topic 3',
    publications: 'Paper 1, Paper 2',
  },
  {
    fullname: 'Project Report - June',
    description:
      'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    topics: 'Topic 1, Topic 2, Topic 3',
    publications: 'Paper 1, Paper 2, Paper 3, Paper 4, Paper 5',
  },
];

const People = () => (
  <Card.Group itemsPerRow={1} stackable centered textAlign='center'>
    {people.map((person, i) => (
      <Person
        key={i}
        fullname={person.fullname}
        description={person.description}
        topics={person.topics}
        publications={person.publications}
        className={styles.container}
      />
    ))}
  </Card.Group>
);

export default People;
