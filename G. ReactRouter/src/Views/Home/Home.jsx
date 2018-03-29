import React from 'react';
import { Grid, Container, List, Image, } from 'semantic-ui-react';
import Markdown from 'markdown-to-jsx';

import Text from '../../components/UI/Text';
import Divider from '../../components/UI/Divider/Divider';
import styles from './Home.postcss';
import introContent from './Home.md';

const ViewHome = props => (
  <Grid
    stackable
    centered
    divided
    container
    columns={2}
    className={styles.container}
    style={{ paddingLeft: '1.5rem', }}
  >
    <Grid.Column>
      {/* <Markdown className={styles.text}>{introContent}</Markdown> */}
      <h1 style={{ textAlign: 'center', marginBottom: '1rem', }}>Objectives</h1>
      <Text>Our longterm goals are to understand:</Text>
      <List ordered verticalAlign='middle'>
        <List.Item>How genes control form.</List.Item>
        <List.Item>
          How evolutionary changes produce diversity in form.
        </List.Item>
      </List>
    </Grid.Column>

    <Grid.Column style={{ paddingLeft: '1rem', }}>
      <h1 style={{ textAlign: 'center', }}>Facilities</h1>
      <List selection verticalAlign='middle'>
        <List.Item>
          <List.Content>
            <List.Header as='h4'>Genetics Analysis Facility (GAF)</List.Header>
            <List.Description>
              An interdepartmental facility (supervised by Dr. Fitch) for
              analysis of DNA, including sequencing, PCR, fragment size
              analysis, phylogenetic analysis, etc. Funded by a partnership
              between the National Science Foundation and NYU.
            </List.Description>
          </List.Content>
        </List.Item>
      </List>

      <Divider horizontal />

      <h1 style={{ textAlign: 'center', }}>Education</h1>
      <List bulleted animated divided selection verticalAlign='middle'>
        <List.Item>
          <List.Content>
            <List.Header as='h4'>Evolution (V23.0058):</List.Header>
            <List.Description>
              An upper-level undergraduate course offered every Fall.
            </List.Description>
          </List.Content>
        </List.Item>

        <List.Item>
          <List.Content>
            <List.Header as='h4'>
              Principles of Evolution (G23.1069):
            </List.Header>
            <List.Description>
              A graduate course offered every other Spring.
            </List.Description>
          </List.Content>
        </List.Item>

        <List.Item>
          <List.Content>
            <List.Header as='h4'>
              Precellular Evolution and Early Cell Evolution lectures for
              Molecular and Cell Biology (V23.0022):
            </List.Header>
            <List.Description>
              An undergraduate course offered every Spring.
            </List.Description>
          </List.Content>
        </List.Item>

        <List.Item>
          <List.Content>
            <List.Header as='h4'>
              Foundations of Developmental Genetics:
            </List.Header>
            <List.Description>
              A PhD graduate year-long course, with lectures every Fall and a
              practical laboratory course every Spring. Associated with the
              inter-school Developmental Genetics Track.
            </List.Description>
          </List.Content>
        </List.Item>
      </List>

      <Text>
        Lectures are also taught in Principles of Biology (V23.0011), Molecular
        and Cell Biology II (V23.0022), Molecular Genetics (G23.2127), and Cell
        Biology (G23.1051).
      </Text>
      <Text>
        For more information about the Department of Biology at NYU, click here.
        For information and application forms for our PhD program in the NYU
        Graduate School of Arts and Sciences, click here.
      </Text>
    </Grid.Column>
  </Grid>
);

export default ViewHome;
