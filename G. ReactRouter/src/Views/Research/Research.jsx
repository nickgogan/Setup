import React from 'react';
// import Markdown from 'markdown-to-jsx'; // eslint-disable-line

import styles from './Research.postcss';
// import content from './Research.md';
import Publications from '../../containers/Publications/Publications';

const Research = () => (
  <div className={styles.container}>
    {/* <Markdown>{content}</Markdown> */}
    <Publications />
  </div>
);

export default Research;
