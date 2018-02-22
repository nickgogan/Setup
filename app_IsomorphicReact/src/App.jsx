// @flow
// @ts-check

import React from 'react';
import Checkbox from './inputbox';

type Props = {
  test: string,
};

export default class AppDisplay extends React.Component<Props> {
  render() {
    return (
      <div>
        <h1>Isomorphic React - {this.props.test}!</h1>
        <Checkbox />
      </div>
    );
  }
}
