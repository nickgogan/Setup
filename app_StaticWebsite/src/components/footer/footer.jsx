// @flow

import React from 'react';
import './footer.postcss';

type Props = {
  footerText: string,
};

export default class Footer extends React.Component<Props> {
  render() {
    return (
      <div className='footer'>
        <h1>{this.props.footerText}</h1>
      </div>
    );
  }
}
