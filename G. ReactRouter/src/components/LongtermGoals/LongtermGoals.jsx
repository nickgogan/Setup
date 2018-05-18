import React from 'react';

import styles from './LongtermGoals.postcss';

const LongtermGoals = () => (
  <div>
    <div className={styles.goalsList}>
      <h1 className={styles.heading}>Longterm Goals</h1>
      <br />
      <h3 className={styles.goalsList_text}>How genes control form.</h3>
      <br />
      <h3 className={styles.goalsList_text}>
        How evolutionary changes produce diversity in form.
      </h3>
    </div>
  </div>
);

export default LongtermGoals;
