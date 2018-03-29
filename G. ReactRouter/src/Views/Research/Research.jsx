import React from 'react';
import Markdown from 'markdown-to-jsx';

import styles from './Research.postcss';
import content from './Research.md';

const Research = props => (
  <div className={styles.container}>
    <Markdown>{content}</Markdown>
  </div>
);

export default Research;
