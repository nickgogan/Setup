import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom'; // eslint-disable-line
import { Grid, } from 'semantic-ui-react';

import styles from './Root.postcss';
import Placeholder from '../components/UI/Loading';
import Footer from '../containers/Footer/MobileFooter';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Grid stackable container divided celled>
          <Grid.Row columns={1}>
            <h1>Header</h1>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <h1>Col 1</h1>
            </Grid.Column>
            <Grid.Column>
              <h1>Col 2</h1>
            </Grid.Column>
            <Grid.Column>
              <h1>Col 3</h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Footer />
          </Grid.Row>
        </Grid>
      </Router>
    );
  }
}
