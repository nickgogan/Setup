import React from 'react';

import Text from '../UI/Text';

const styleGrid = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexwrap: 'wrap',
};

const LegalInfo = props => (
  <div style={styleGrid}>
    <Text fontSize='0.75rem' width='10rem'>
      Developed and Designed by{' '}
      <a
        href='https://www.linkedin.com/in/nickgogan/'
        target='_blank'
        rel='noopener noreferrer'
      >
        Nick Gogan
      </a>{' '}
      (2018).
    </Text>
    <Text fontSize='0.75rem' width='10rem'>
      Unless otherwise noted, all content copyright to David Fitch of New York
      University. All rights reserved.
    </Text>
  </div>
);

export default LegalInfo;
