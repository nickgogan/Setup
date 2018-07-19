import React from 'react';

import styles from './People.postcss';
import PrincipalInvestigator from '../../containers/PrincipalInvestigator/PrincipalInvestigator';
import Undergrads from '../../containers/Undergrads/Undergrads';
import Grads from '../../containers/Grads/Grads';
import Divider from '../../components/UI/Divider/Divider';

const principalInvestigator = {
  name: 'David Fitch',
  position: 'Lab Head',
  description: "David's description",
  currentWork: 'Current work includes...',
  nyu: true,
};

const ViewPeople = () => (
  <div className={styles.container}>
    <div className={`${styles.text_body} ${styles.principalInvestigator}`}>
      <PrincipalInvestigator
        name={principalInvestigator.name}
        position={principalInvestigator.position}
        description={principalInvestigator.description}
        currentWork={principalInvestigator.currentWork}
        isLabHead
        isNYUEmployee={principalInvestigator.nyu}
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
