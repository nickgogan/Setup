// @flow

import React from 'react';
import styles from './app.postcss';
import grid from '../global-styles/grid.postcss';
import Header from '../header/header';
import Article from '../article/article';
import Sidepanel from '../side-panel/side-panel';
import Footer from '../footer/footer';

export default class App extends React.Component {
  render() {
    return (
      <div className={grid.grid}>
        <Header headerText='Home' />
        <Article articleText='Article' />
        <Sidepanel sidepanelText='Sidepanel' />
        <button
          type='button'
          className={`${styles.footer} ${styles.btn} ${styles.disabled}`}
        >
          Click me
        </button>
        <img
          src={require('../../assets/images/test.svg')}
          className={styles.logo}
          alt='test'
        />
        <Footer footerText='Footer' />
      </div>
    );
  }
}
