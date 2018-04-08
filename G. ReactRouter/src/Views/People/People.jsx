import React from 'react';
import Markdown from 'markdown-to-jsx'; // eslint-disable-line

import styles from './People.postcss';
import People from '../../containers/People/People';
import content from './People.md';

const ViewPeople = props => (
  <div className={styles.container}>
    <People />
  </div>
);

export default ViewPeople;
