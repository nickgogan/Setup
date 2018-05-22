import React from 'react';

import styles from './Divider.postcss';

const Divider = props =>
  props.horizontal ? (
    <hr className={styles.horizontal} />
  ) : (
    <div className={styles.verticalContainer}>
      <span className={styles.verticalGlyph} />
    </div>
  );

export default Divider;
