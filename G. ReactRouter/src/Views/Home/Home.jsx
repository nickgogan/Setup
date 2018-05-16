import React from 'react';
import { Grid, Container, List, Image } from 'semantic-ui-react'; // eslint-disable-line
import Markdown from 'markdown-to-jsx'; // eslint-disable-line

import styles from './Home.postcss';
import Text from '../../components/UI/Text';
import Divider from '../../components/UI/Divider/Divider';
import introContent from './Home.md';

const ViewHome = props => (
  // <p className={styles.text_body}>This is type normal face.</p>
  <Grid
    stackable
    centered
    divided
    container
    columns={2}
    className={styles.container}
  >
    <Grid.Row>
      <h1 className={styles.heading_objectives}>Objectives</h1>
      <div>
        <p className={styles.text_body}>
          Our longterm goals are to understand:
        </p>
        <List ordered verticalAlign='middle'>
          <List.Item className={styles.text_body}>
            How genes control form.
          </List.Item>
          <List.Item className={styles.text_body}>
            How evolutionary changes produce diversity in form.
          </List.Item>
        </List>
      </div>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <h1 className={styles.heading_currentProjects}>Current Projects</h1>
        <List bulleted animated divided selection verticalAlign='middle'>
          <List.Item>
            <List.Content>
              <List.Header as='h4' className={styles.text_title}>
                TEST
              </List.Header>
              <List.Description as='p' className={styles.text_body}>
                Determination of the phylogenetic relationships of species in
                family Rhabditidae (funded by an NSF grant). We are using
                molecular sequences as well as morphology to infer these
                relationships.
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header as='h4' className={styles.text_title}>
                TEST
              </List.Header>
              <List.Description as='p' className={styles.text_body}>
                Reconstruction of the evolutionary changes in morphogenesis and
                patterning in the male tails of species in family Rhabditidae
                (funded by an HFSP grant). Features of male tail development are
                used to assess character homologies. By following the evolution
                of these features on the Rhabditidae phylogeny, we also hope to
                identify correlations between particular forms and behaviors.
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header as='h4' className={styles.text_title}>
                TEST
              </List.Header>
              <List.Description as='p' className={styles.text_body}>
                Discovery of genes and mechanisms involved in morphogenesis of
                the male tail tip of C. elegans (funded previously by an NSF
                CAREER grant). To identify the components and regulatory
                networks governing the developmental process of morphogenesis,
                we screen for mutations that fail in male tail tip
                morphogenesis. These mutants result in pointy (LEPTODERAN) adult
                male tails.
              </List.Description>
            </List.Content>
          </List.Item>
        </List>
        <Divider horizontal />
        <h1 className={styles.heading_currentModels}>Current Models</h1>
        <List bulleted animated divided selection verticalAlign='middle'>
          <List.Item>
            <List.Content>
              <List.Header as='h4' className={styles.text_title}>
                Rhabditidae
              </List.Header>
              <List.Description as='p' className={styles.text_body}>
                A family of nematodes (roundworms) which comprises a large
                number (> 250) of small (1-2 mm), predominantly free-living
                worms found everywhere among the microflora of many different
                saprobic habitats.
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header as='h4' className={styles.text_title}>
                Worm Male Tails
              </List.Header>
              <List.Description as='p' className={styles.text_body}>
                As a model form, it is a structure required for copulation which
                has an array of sensilla (rays) usually arranged in a lateral
                extension of the cuticle (fan). Despite the small number of
                cells (ca. 100), these structures vary substantially in
                Rhabditidae.
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header as='h4' className={styles.text_title}>
                Caenorhabditis elegans
              </List.Header>
              <List.Description as='p' className={styles.text_body}>
                A member of the Rhabditidae family, C. elegans is used as a
                model organism for isolating and understanding the functions of
                genes controlling the male tail form. The male tail is rounded
                (PELODERAN) at the tip, a form that is due to a morphogenetic
                event in the last larval stage in which the tail tip cells fuse
                together and change shape. This event does not occur in females,
                which have pointy tails.
              </List.Description>
            </List.Content>
          </List.Item>
        </List>
      </Grid.Column>

      <Grid.Column className={styles.column_right}>
        <h1 className={styles.heading_facilities}>Facilities</h1>
        <List selection verticalAlign='middle'>
          <List.Item>
            <List.Content>
              <List.Header as='h4' className={styles.text_title}>
                Genetics Analysis Facility (GAF)
              </List.Header>
              <List.Description as='p' className={styles.text_body}>
                An interdepartmental facility (supervised by Dr. Fitch) for
                analysis of DNA, including sequencing, PCR, fragment size
                analysis, phylogenetic analysis, etc. Funded by a partnership
                between the National Science Foundation and NYU.
              </List.Description>
            </List.Content>
          </List.Item>
        </List>

        <Divider horizontal />

        <h1 className={styles.heading_education}>Education</h1>
        <List bulleted animated divided selection verticalAlign='middle'>
          <List.Item>
            <List.Content>
              <List.Header as='h4' className={styles.text_title}>
                Evolution (V23.0058):
              </List.Header>
              <List.Description as='p' className={styles.text_body}>
                An upper-level undergraduate course offered every Fall.
              </List.Description>
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content>
              <List.Header as='h4' className={styles.text_title}>
                Principles of Evolution (G23.1069):
              </List.Header>
              <List.Description as='p' className={styles.text_body}>
                A graduate course offered every other Spring.
              </List.Description>
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content>
              <List.Header as='h4' className={styles.text_title}>
                Precellular Evolution and Early Cell Evolution lectures for
                Molecular and Cell Biology (V23.0022):
              </List.Header>
              <List.Description as='p' className={styles.text_body}>
                An undergraduate course offered every Spring.
              </List.Description>
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content>
              <List.Header as='h4' className={styles.text_title}>
                Foundations of Developmental Genetics:
              </List.Header>
              <List.Description as='p' className={styles.text_body}>
                A PhD graduate year-long course, with lectures every Fall and a
                practical laboratory course every Spring. Associated with the
                inter-school Developmental Genetics Track.
              </List.Description>
            </List.Content>
          </List.Item>
        </List>

        <p className={styles.text_body}>
          Lectures are also taught in Principles of Biology (V23.0011),
          Molecular and Cell Biology II (V23.0022), Molecular Genetics
          (G23.2127), and Cell Biology (G23.1051).
        </p>
        <p className={styles.text_body}>
          For more information about the Department of Biology at NYU, click
          here. For information and application forms for our PhD program in the
          NYU Graduate School of Arts and Sciences, click here.
        </p>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default ViewHome;
