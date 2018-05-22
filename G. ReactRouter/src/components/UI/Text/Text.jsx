import React from 'react';

import styles from './Text.postcss';

const Text = props =>
  props.src ? (
    <h1>{props.src}</h1>
  ) : (
    <p
      className={styles.text}
      style={{
        width: `${props.width}`,
        fontSize: `${props.fontSize}`,
        lineHeight: `${props.lineHeight}`,
      }}
    >
      {props.children}
    </p>
  );

export default Text;
