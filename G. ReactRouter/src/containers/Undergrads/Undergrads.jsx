import React from 'react';
import { Segment } from 'semantic-ui-react'; // eslint-disable-line
import Person from '../../components/Person/Person';

import styles from './Undergrads.postcss';

const people = [
  {
    fullname: 'Nick Gogan',
    description:
      'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    topics: 'Topic 1, Topic 2, Topic 3',
    publications: 'Paper 1, Paper 2',
  },
  {
    fullname: 'JohnRene Malaya',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    topics: 'Topic 1, Topic 2, Topic 3',
    publications: 'Paper 1, Paper 2',
  },
  {
    fullname: 'JohnBernard Malaya',
    description:
      'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    topics: 'Topic 1, Topic 2, Topic 3',
    publications: 'Paper 1, Paper 2',
  },
  {
    fullname: 'Autora Fitch',
    description:
      'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    topics: 'Topic 1, Topic 2, Topic 3',
    publications: 'Paper 1, Paper 2',
  },
  {
    fullname: 'May Fitch',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    topics: 'Topic 1, Topic 2, Topic 3',
    publications: 'Paper 1, Paper 2',
  },
  {
    fullname: 'Sam Ahn',
    description:
      'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    topics: 'Topic 1, Topic 2, Topic 3',
    publications: 'Paper 1, Paper 2',
  },
  {
    fullname: 'Khushbu Shah',
    description:
      'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
    topics: 'Topic 1, Topic 2, Topic 3',
    publications: 'Paper 1, Paper 2',
  },
  {
    fullname: 'Daniel Martin',
    description:
      'Bring to the table win-win survival strategies to ensure proactive domination.',
    topics: 'Topic 1, Topic 2, Topic 3',
    publications: 'Paper 1, Paper 2',
  },
  {
    fullname: 'Cody Scarborough',
    description:
      'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
    topics: 'Topic 1, Topic 2, Topic 3',
    publications: 'Paper 1, Paper 2, Paper 3, Paper 4, Paper 5',
  },
];

const People = () => (
  <Segment.Group itemsPerRow={1} stackable centered raised textAlign='center'>
    {people.map(person => (
      <Person
        key={person.fullname}
        fullname={person.fullname}
        description={person.description}
        topics={person.topics}
        publications={person.publications}
        className={styles.container}
      />
    ))}
  </Segment.Group>
);

export default People;
