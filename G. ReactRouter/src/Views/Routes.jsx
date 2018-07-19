import React from 'react';
import { Switch, Route } from 'react-router-dom'; // eslint-disable-line
import Loadable from 'react-loadable'; // eslint-disable-line

import Placeholder from '../components/UI/Loading';

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ './Home/Home.jsx'),
  loading: Placeholder,
  delay: 500,
});
const Research = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Research" */ './Research/Research.jsx'),
  loading: Placeholder,
  delay: 500,
});
const Papers = Loadable({
  loader: () => import(/* webpackChunkName: "About" */ './Papers/Papers.jsx'),
  loading: Placeholder,
  delay: 500,
});
const Resources = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Resources" */ './Resources/Resources.jsx'),
  loading: Placeholder,
  delay: 500,
});
const People = Loadable({
  loader: () => import(/* webpackChunkName: "People" */ './People/People.jsx'),
  loading: Placeholder,
  delay: 500,
});

const Routes = () => (
  <Switch>
    <Route exact path='/' render={() => <Home columns='2' />} />

    <Route path='/research' render={() => <Research />} />

    <Route path='/papers' render={() => <Papers />} />

    <Route path='/resources' render={() => <Resources />} />

    <Route path='/people' render={() => <People />} />
  </Switch>
);

export default Routes;
