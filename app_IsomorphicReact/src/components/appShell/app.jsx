// @flow

import * as React from 'react';

import Article from '../article/article';
import * as styles from './app.postcss';

type Props = {
  foo: string,
};

/*
########################################
                        TODO


1. Investigate production build
2. Fix text alignment issue in logo grid area.
########################################
*/

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
