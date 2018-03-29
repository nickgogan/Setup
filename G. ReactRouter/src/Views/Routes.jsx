import React from 'react';
import { Switch, Route, } from 'react-router-dom';
import Loadable from 'react-loadable';

import Placeholder from '../components/UI/Loading';

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ './Home/Home.jsx'),
  loading: Placeholder,
  delay: 500,
});
const Research = Loadable({
  loader: () =>
    import(/* webpackChunkName: "Reserarch" */ './Research/Research.jsx'),
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
const About = Loadable({
  loader: () => import(/* webpackChunkName: "About" */ './About/About.jsx'),
  loading: Placeholder,
  delay: 500,
});

const Routes = () => (
  <Switch>
    <Route
      exact
      path='/'
      render={() => <Home columns='2' columnSpace='10rem' />}
    />

    <Route path='/research' render={() => <Research />} />

    <Route path='/resources' render={() => <Resources />} />

    <Route path='/people' render={() => <People />} />

    <Route path='/about' render={() => <About />} />
  </Switch>
);

export default Routes;
