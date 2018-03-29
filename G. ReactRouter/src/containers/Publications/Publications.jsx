import React from 'react';
import { Card } from 'semantic-ui-react'; // eslint-disable-line

import Paper from '../../components/Paper/Paper';

const papers = [
  {
    title: 'Title',
    authors: ['Author 1', 'Author 2',],
    date: new Date().toLocaleTimeString(),
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title: 'Title',
    authors: ['Author 1', 'Author 2',],
    date: new Date().toLocaleTimeString(),
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
  {
    title: 'Title',
    authors: ['Author 1', 'Author 2',],
    date: new Date().toLocaleTimeString(),
    pdf: 'pdfURL',
    msdoc: 'msdocURL',
  },
];

export default class Publications extends React.Component {
  render() {
    return (
      <Card.Group stackable>
        {papers.map(paper => <Paper>{paper}</Paper>)}
      </Card.Group>
    );
  }
}
