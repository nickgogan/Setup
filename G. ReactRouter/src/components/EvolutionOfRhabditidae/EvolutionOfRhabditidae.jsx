import React from 'react';
import Loadable from 'react-loadable'; // eslint-disable-line
import Placeholder from '../../components/UI/Loading';

import styles from './EvolutionOfRhabditidae.postcss';

const MaleTailEvolution = Loadable({
  loader: () =>
    import(/* webpackChunkName: "MaleTailEvolution" */ '../../components/MaleTailEvolution/MaleTailEvolution.jsx'),
  loading: Placeholder,
  delay: 500,
});

const EvolutionOfOtherFeatures = Loadable({
  loader: () =>
    import(/* webpackChunkName: "EvolutionOfOtherFeatures" */ '../../components/EvolutionOfOtherFeatures/EvolutionOfOtherFeatures.jsx'),
  loading: Placeholder,
  delay: 500,
});

const EvolutionOfRhabditidae = () => <div>EvolutionOfRhabditidae</div>;

export default EvolutionOfRhabditidae;
