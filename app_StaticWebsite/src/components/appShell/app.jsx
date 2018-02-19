// @ts-check
// @flow

import * as React from 'react';
import * as styles from './app.postcss';

type Props = {
  foo: string,
};

export default class Test extends React.Component<Props> {
  render() {
    return (
      <div className='main'>
        <h1>{this.props.foo}</h1>
        <br />
        <ul id='log' />
      </div>
    );
  }
}
