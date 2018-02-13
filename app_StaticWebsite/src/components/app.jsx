// @flow
import * as React from 'react';

type Props = {
  foo: string,
};

export default class Test extends React.Component<Props> {
  render() {
    return <h1 className='sidebar'>{this.props.foo}</h1>;
  }
}
