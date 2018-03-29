import React from 'react';

const Text = props =>
  props.src ? (
    <h1>{props.src}</h1>
  ) : (
    <p
      style={{
        fontSize: `${props.fontSize}`,
        width: `${props.width}`,
      }}
    >
      {props.children}
    </p>
  );

export default Text;
