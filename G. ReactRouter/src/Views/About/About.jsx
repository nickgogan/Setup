import React from 'react';
import Markdown from 'markdown-to-jsx';

import styles from './About.postcss';
import content from './About.md';

const About = props => (
  <div className={styles.container}>
    <Markdown>{content}</Markdown>
  </div>
);

export default About;
