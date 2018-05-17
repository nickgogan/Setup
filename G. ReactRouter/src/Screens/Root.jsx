import React from 'react';
import { HashRouter as Router } from 'react-router-dom'; // eslint-disable-line
import { Responsive } from 'semantic-ui-react'; // eslint-disable-line
import Loadable from 'react-loadable'; // eslint-disable-line

import Placeholder from '../components/UI/Loading';
import styles from './Root.postcss';

const Mobile = Loadable({
  loader: () => import(/* webpackChunkName: "Mobile" */ './Mobile/Mobile.jsx'),
  loading: Placeholder,
  delay: 500,
});

const Desktop = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Desktop" */ './Desktop/Desktop.jsx'),
  loading: Placeholder,
  delay: 500,
});

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <article>
          <Responsive maxWidth={800}>
            <Mobile size='small' />
          </Responsive>
          <Responsive minWidth={801} maxWidth={1276}>
            <Mobile />
          </Responsive>
          <Responsive minWidth={1277}>
            <Desktop />
          </Responsive>
        </article>
      </Router>
    );
  }
}
