import React from 'react';
import Checkbox from './checkbox';
import styles from './index.css';

export default class App extends React.Component<Props> {
  render() {
    return (
      <div>
        <p className={styles.test}>TEST</p>
        <Checkbox />
        <img src={require('./assets/images/tbd.png')} className={styles.img} />
      </div>
    );
  }
}
