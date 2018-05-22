import React from 'react';

import Text from '../UI/Text/Text';

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexwrap: 'wrap',
};
const textStyles = {
  width: '10rem',
  fontSize: '0.75rem',
};

const LegalInfo = props => (
  <div style={styles}>
    <Text width='10rem' fontSize='0.9rem' lineHeight='1.2rem'>
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
    <Text width='10rem' fontSize='0.9rem' lineHeight='1.2rem'>
      Unless otherwise noted, all content copyright to David Fitch of New York
      University. All rights reserved.
    </Text>
  </div>
);

export default LegalInfo;
