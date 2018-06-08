import React from 'react';
import Loadable from 'react-loadable'; // eslint-disable-line
import Placeholder from '../../components/UI/Loading';

import styles from './Research.postcss';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ResearchContent from '../../containers/ResearchContent/ResearchContent';
import ResearchDefault from '../../components/ResearchDefault/ResearchDefault';

const RhabditidaeSystematics = Loadable({
  loader: () =>
    import(/* webpackChunkName: "RhabditidaeSystematics" */ '../../components/RhabditidaeSystematics/RhabditidaeSystematics'),
  loading: Placeholder,
  delay: 500,
});

const MaleTailMorphogenesis = Loadable({
  loader: () =>
    import(/* webpackChunkName: MaleTailMorphogenesis */ '../../components/MaleTailMorphogenesis/MaleTailMorphogenesis'),
  loading: Placeholder,
  delay: 500,
});

const EvolutionOfRhabditidae = Loadable({
  loader: () =>
    import(/* webpackChunkName: EvolutionOfRhabditidae */ '../../components/EvolutionOfRhabditidae/EvolutionOfRhabditidae'),
  loading: Placeholder,
  delay: 500,
});

const MaleTailEvolution = Loadable({
  loader: () =>
    import(/* webpackChunkName: MaleTailEvolution */ '../../components/MaleTailEvolution/MaleTailEvolution'),
  loading: Placeholder,
  delay: 500,
});

const EvolutionOfOtherFeatures = Loadable({
  loader: () =>
    import(/* webpackChunkName: EvolutionOfOtherFeatures */ '../../components/EvolutionOfOtherFeatures/EvolutionOfOtherFeatures'),
  loading: Placeholder,
  delay: 500,
});

export default class Research extends React.Component {
  getContent() {
    const label = this.state.activeLabel;

    switch (label) {
      case 'Rhabditidae Systematics': {
        console.log(`RESEARCH/getContent: ${label}\tRhabditidae Systematics`);
        return <RhabditidaeSystematics />;
      }
      case 'Evolution of Rhabditidae': {
        console.log(`RESEARCH/getContent: ${label}\tEvolution of Rhabditidae`);
        return <EvolutionOfRhabditidae />;
      }
      case 'Male Tail Evolution': {
        console.log(`RESEARCH/getContent: ${label}\tMale Tail Evolution`);
        return <MaleTailEvolution />;
      }
      case 'Evolution of Other Features': {
        console.log(
          `RESEARCH/getContent: ${label}\tEvolution Of Other Features`
        );
        return <EvolutionOfOtherFeatures />;
      }
      case 'Male Tail Morphogenesis': {
        console.log(`RESEARCH/getContent: ${label}\tMale Tail Morphogenesis`);
        return <MaleTailMorphogenesis />;
      }
      default: {
        console.log(`RESEARCH/getContent: ${label}\tResearch Default`);
        console.log(
          `RESEARCH/getContent: ${label === 'Evolution Of Other Features'}`
        );
        console.log(
          `RESEACH.getContent:\t${label}\tEvolution Of Other Features`
        );
        return <ResearchDefault />;
      }
    }
  }

  updateBreadcrumb(event, data) {
    this.setState({ activeLabel: data.children, });
    console.log(`RESEARCH/updateBreadcrumb: ${data.children}`);
  }

  render() {
    return (
      <div className={styles.container}>
        <Breadcrumbs
          updateBreadcrumb={this.updateBreadcrumb}
          getContent={this.getContent}
        />
      </div>
    );
  }
}
