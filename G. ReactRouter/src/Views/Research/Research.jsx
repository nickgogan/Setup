import React from 'react';
import { Breadcrumb } from 'semantic-ui-react'; // eslint-disable-line

import styles from './Research.postcss';

const Research = () => (
  <div className={styles.container}>
    <Breadcrumb size='big'>
      <Breadcrumb.Section link>Home</Breadcrumb.Section>
      <Breadcrumb.Divider icon='right chevron' />
      <Breadcrumb.Section link>Registration</Breadcrumb.Section>
      <Breadcrumb.Divider icon='right arrow' />
      <Breadcrumb.Section active>Personal Information</Breadcrumb.Section>
    </Breadcrumb>
  </div>
);

export default Research;
