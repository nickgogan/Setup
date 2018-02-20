// @flow

import React from 'react';
import './footer.postcss';

type Props = {
  footerText: string,
};

const Footer = (props: Props) => (
  <div className='footer'>
    <h1>{props.footerText}</h1>
  </div>
);

export default Footer;
