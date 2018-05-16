import React from 'react';
import { Card, Segment, Header } from 'semantic-ui-react'; // eslint-disable-line

import styles from './Publications.postcss';
import Paper from '../../components/Paper/Paper';

const Publications = props => {
  const papers = props.publicationSet.map(paper => (
    <Paper
      key={paper.title}
      title={paper.title}
      authors={paper.authors}
      description={paper.description}
      citation={paper.citation}
      datePublished={paper.date}
      urls={paper.urls}
    />
  ));
  return (
    <Segment.Group stackable centered raised>
      {papers}
    </Segment.Group>
  );
};

export default Publications;
