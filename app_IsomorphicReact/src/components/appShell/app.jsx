// @flow

import React from 'react';
// import React, {Component} from 'react';
import Checkbox from './DEPRECATED_inputbox';
import styles from './index.postcss';
// import styles from './app.postcss';
// import Article from '../article/article';

export default class App extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <p className={styles.test}>TEST!</p>
        <Checkbox />
        <img
          src={require('../../assets/images/test.svg')}
          className={styles.img}
          alt='test'
        />
      </div>
    );
  }
}
