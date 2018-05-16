import React from 'react';
import { Container, Header } from 'semantic-ui-react'; // eslint-disable-line
import Markdown from 'markdown-to-jsx'; // eslint-disable-line

import styles from './People.postcss';
import PrincipalInvestigator from '../../components/PrincipalInvestigator/PrincipalInvestigator';
import Undergrads from '../../containers/Undergrads/Undergrads';
import Grads from '../../containers/Grads/Grads';
import Divider from '../../components/UI/Divider/Divider';

const principalDescription = "David's description";
const principalCurrentWork = 'Current work includes...';

const ViewPeople = () => (
  <div className={styles.container}>
    <div className={`${styles.text_body} ${styles.principalInvestigator}`}>
      <PrincipalInvestigator
        name='David Fitch'
        position='Lab Head'
        description={principalDescription}
        currentWork={principalCurrentWork}
        isLabHead
      />
    </div>
    <br />
    <Divider horizontal />
    <div className={`${styles.text_body} ${styles.grads}`}>
      <h3 className={styles.header}>PostDocs and Graduate Students</h3>
      <br />
      <Grads />
    </div>
    <br />
    <Divider horizontal />
    <div className={`${styles.text_body} ${styles.undergrads}`}>
      <h3 className={styles.header}>Undergraduates</h3>
      <br />
      <Undergrads />
    </div>
  </div>
);

export default ViewPeople;
