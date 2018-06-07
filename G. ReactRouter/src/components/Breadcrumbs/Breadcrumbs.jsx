import React from 'react';
import { Breadcrumb } from 'semantic-ui-react'; // eslint-disable-line

import styles from './Breadcrumbs.postcss';

const sections = [
  { label: 'Rhabditidae Systematics', subsections: [], },
  {
    label: 'Evolution of Rhabditidae',
    subsections: ['Male Tail Evolution', 'Evolution of Other Features',],
  },
  { label: 'Male Tail Morphogenesis', subsections: [], },
];

const stylesLink = {
  color: 'var(--color-header)',
};
const stylesActiveLink = {
  textDecoration: 'underline',
  color: 'var(--color-header)',
};

export default class Breadcrumbs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeLabel: '',
      sections,
    };

    // Weird Finding # : this.setState doesnt work with Babel when binding event handlers in the constructor
    // Ref: https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate/issues/25 (occult)
    // TODO: Upgrading the react hot loader to the latest version (f0c9042) fixes this problems. 👍 (samuelsimoes)
  }

  buildCrumb() {
    return this.state.sections.map(crumb => {
      {
        if (crumb.subsections.length > 0) {
          return (
            <Breadcrumb size='big' key={crumb.label}>
              <Breadcrumb.Section
                link
                onClick={this.props.updateBreadcrumb.bind(this)}
                active={crumb.label === this.state.activeLabel}
                style={
                  crumb.label === this.state.activeLabel
                    ? stylesActiveLink
                    : stylesLink
                }
              >
                {crumb.label}
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon='right chevron' />
              {crumb.subsections
                ? crumb.subsections.map(subcrumb => (
                    <Breadcrumb size='big' key={subcrumb}>
                      <Breadcrumb.Section
                        link
                        onClick={this.props.updateBreadcrumb.bind(this)}
                        active={crumb.subsection === this.state.activeLabel}
                        style={
                          crumb.label === this.state.activeLabel
                            ? stylesActiveLink
                            : stylesLink
                        }
                      >
                        {subcrumb}
                      </Breadcrumb.Section>
                      {crumb.subsections.indexOf(subcrumb) + 1 ===
                      crumb.subsections.length ? (
                        ''
                      ) : (
                        <Breadcrumb.Divider>/</Breadcrumb.Divider>
                      )}
                    </Breadcrumb>
                  ))
                : ''}
              <Breadcrumb.Divider>|</Breadcrumb.Divider>
            </Breadcrumb>
          );
          crumb.subsections.map(subsection => console.log(subsection));
          return '';
        }
        return (
          <Breadcrumb size='big' key={crumb.label}>
            <Breadcrumb.Section
              link
              onClick={this.props.updateBreadcrumb.bind(this)}
              active={crumb.label === this.state.activeLabel}
              style={
                crumb.label === this.state.activeLabel
                  ? stylesActiveLink
                  : stylesLink
              }
            >
              {crumb.label}
            </Breadcrumb.Section>
            {this.state.sections.indexOf(crumb) + 1 !==
            this.state.sections.length ? (
              <Breadcrumb.Divider>|</Breadcrumb.Divider>
            ) : (
              ''
            )}
            {crumb.subsections
              ? crumb.subsections.map(subcrumb => (
                  <Breadcrumb size='big' key={subcrumb}>
                    <Breadcrumb.Section>{subcrumb}</Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron' />
                  </Breadcrumb>
                ))
              : ''}
          </Breadcrumb>
        );
      }
    });
  }

  render() {
    return (
      <div className={styles.container}>
        {this.buildCrumb()}
        <br />
        {this.props.getContent.apply(this)}
      </div>
    );
  }
}
