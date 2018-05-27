import React from 'react';
import { List } from 'semantic-ui-react'; // eslint-disable-line

import styles from './Publications.postcss';
import Paper from '../../components/Paper/Paper';

const Papers = props => {
  const papers = props.publicationSet.map(paper => (
    <Paper
      key={paper.title}
      title={paper.title}
      authors={paper.authors}
      description={paper.description}
      citation={paper.citation}
      datePublished={paper.date}
      urls={paper.urls}
      className={styles.container}
    />
  ));
  return (
    // <Segment.Group stacked raised>
    <List horizontal floated='left' animated>
      {papers}
    </List>
    // </Segment.Group>
  );
};

export default Papers;
