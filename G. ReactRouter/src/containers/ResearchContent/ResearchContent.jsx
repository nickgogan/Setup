import React from 'react';

import styles from './ResearchContent.postcss';
import ResearchDefault from '../../components/ResearchDefault/ResearchDefault';

export default class ResearchContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeLabel: 'DefaultContent',
    };
  }

  render() {
    return <div className='container'>{this.props.getContent()}</div>;
  }
}
