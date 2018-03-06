// @flow

import React from 'react';
import styles from './article.postcss';

type Props = {
  articleText: string,
};

const Article = (props: Props) => (
  <div className={styles.article}>
    <h1>{props.articleText}</h1>
  </div>
);

export default Article;
