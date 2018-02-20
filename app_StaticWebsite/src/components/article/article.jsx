// @flow

import React from 'react';
import styles from './article.postcss';

type Props = {
  articleText: string,
};

export default class Article extends React.Component<Props> {
  render() {
    return (
      <div className='main'>
        <h1>{this.props.articleText}</h1>
      </div>
    );
  }
}
