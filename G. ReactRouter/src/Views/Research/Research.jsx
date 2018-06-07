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
  constructor(props) {
    super(props);

    this.state = {
      activeSection: 'ResearchDefault',
    };
  }

  getContent() {
    const label = this.state.activeLabel;

    switch (label) {
      default: {
        return <ResearchDefault />;
      }
      case 'Rhabditidae Systematics': {
        return <RhabditidaeSystematics />;
      }
      case 'Evolution of Rhabditidae': {
        return <MaleTailMorphogenesis />;
      }
      case 'Male Tail Evolution': {
        return <MaleTailEvolution />;
      }
      case 'Evolution Of Other Features': {
        return <EvolutionOfOtherFeatures />;
      }
      case 'Male Tail Morphogenesis': {
        return <EvolutionOfRhabditidae />;
      }
    }
  }

  updateBreadcrumb(event, data) {
    const label = data.children;
    console.log(label);

    switch (label) {
      case 'Rhabditidae Systematics': {
        this.setState({ activeLabel: label, });
        break;
      }
      case 'Evolution of Rhabditidae': {
        this.setState({ activeLabel: label, });
        break;
      }
      case 'Male Tail Morphogenesis': {
        this.setState({ activeLabel: label, });
        break;
      }
      default: {
        break;
      }
    }
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
