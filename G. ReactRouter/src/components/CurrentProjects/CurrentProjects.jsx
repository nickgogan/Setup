import React from 'react';
import { List } from 'semantic-ui-react'; // eslint-disable-line

import styles from './CurrentProjects.postcss';

const CurrentProjects = () => (
  <List relaxed animated divided selection verticalAlign='middle'>
    <List.Item>
      <List.Content>
        <List.Header as='h4' className={styles.text_title}>
          [TODO] Title
        </List.Header>
        <List.Description as='p' className={styles.text_body}>
          Determination of the phylogenetic relationships of species in family
          Rhabditidae (funded by an NSF grant). We are using molecular sequences
          as well as morphology to infer these relationships.
        </List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content>
        <List.Header as='h4' className={styles.text_title}>
          [TODO] Title
        </List.Header>
        <List.Description as='p' className={styles.text_body}>
          Reconstruction of the evolutionary changes in morphogenesis and
          patterning in the male tails of species in family Rhabditidae (funded
          by an HFSP grant). Features of male tail development are used to
          assess character homologies. By following the evolution of these
          features on the Rhabditidae phylogeny, we also hope to identify
          correlations between particular forms and behaviors.
        </List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content>
        <List.Header as='h4' className={styles.text_title}>
          [TODO] Title
        </List.Header>
        <List.Description as='p' className={styles.text_body}>
          Discovery of genes and mechanisms involved in morphogenesis of the
          male tail tip of C. elegans (funded previously by an NSF CAREER
          grant). To identify the components and regulatory networks governing
          the developmental process of morphogenesis, we screen for mutations
          that fail in male tail tip morphogenesis. These mutants result in
          pointy (LEPTODERAN) adult male tails.
        </List.Description>
      </List.Content>
    </List.Item>
  </List>
);

export default CurrentProjects;
