// @flow

import * as React from 'react';

import Article from '../article/article';
import * as styles from './app.postcss';

type Props = {
  foo: string,
};

export default class App extends React.Component<Props> {
  render() {
    return (
      <section className='global'>
        <Article articleText='ARTICLE' />
        <div className='logo'>LOGO</div>
      </section>
    );
  }
}
