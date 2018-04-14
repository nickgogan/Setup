import React from 'react';
import Markdown from 'markdown-to-jsx'; // eslint-disable-line

import styles from './About.postcss';
import content from './About.md';

const About = () => (
  <div className={styles.container}>
    <Markdown>{content}</Markdown>
  </div>
);

export default About;
