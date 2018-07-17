import React from 'react';
import { Grid, List } from 'semantic-ui-react'; // eslint-disable-line

import styles from './EvolutionOfOtherFeatures.postcss';

const EvolutionOfOtherFeatures = () => (
  <Grid stackable centered divided container className={styles.container}>
    <Grid.Column>
      <List as='ol'>
        <List.Header as='h4' className={styles.text_title}>
          Evolution of sexual systems
        </List.Header>
        <List.Item as='li' value='◉'>
          <List.Description as='p' className={styles.mainListItem}>
            In Rhabditidae, hermaphroditism (self-fertilization) evolved several
            times independently from gonochoristic (male-female) lineages (see
            figure).
          </List.Description>
        </List.Item>
        <List.Item as='li' value='◉'>
          <List.Description as='p' className={styles.mainListItem}>
            On the other hand, there is no convincing evidence for the converse.
          </List.Description>
        </List.Item>
        <List.Item as='li' value='◉'>
          <List.Description as='p' className={styles.mainListItem}>
            These data are consistent with the hypothesis that hermaphroditism
            offers short-term selective advantages under some conditions, but
            that such lineages may have a higher extinction rate.
          </List.Description>
        </List.Item>
      </List>
      <List as='ol'>
        <List.Header as='h4' className={styles.text_title}>
          Evolution of the "glottoid apparatus"
        </List.Header>
        <List.Item as='li' value='◉'>
          <List.Description as='p' className={styles.mainListItem}>
            The glottoid apparatus is a small swelling at the base of the buccal
            tube in many Rhabditidae, and distinguishes Rhabditidae from other
            species.
          </List.Description>
        </List.Item>
        <List.Item as='li' value='◉'>
          <List.Description as='p' className={styles.mainListItem}>
            The absence of this structure was classically deemed "primitive";
            species groups without a glottoid apparatus were assumed to have
            diverged ancestrally (e.g.,{' '}
            <em>Protorhabditis, Parasitorhabditis</em>).
          </List.Description>
        </List.Item>
        <List.Item as='li' value='◉'>
          <List.Description as='p' className={styles.mainListItem}>
            Out data show that the glottoid apparatus has been lost at least
            twice in Rhabditidae, and that these species groups are recently
            derived (see figure).
          </List.Description>
        </List.Item>
      </List>
      <List as='ol'>
        <List.Header as='h4' className={styles.text_title}>
          Heterotopy of the vulva correlates with gonad morphology
        </List.Header>
        <List.Item as='li' value='◉'>
          <List.Description as='p' className={styles.mainListItem}>
            In nematodes, heterotopy (evolutionary change in position) of the
            vulva occurs. For example, the vulva can be midbody or posterior.
          </List.Description>
        </List.Item>
        <List.Item as='li' value='◉'>
          <List.Description as='p' className={styles.mainListItem}>
            Female gonads can have 1 or 2 "arms" (mono- or didelphy), and the
            uteri can point anteriorly (prodelphy), posteriorly
            (opisthodelphic), or in opposite directions (amphidelphic).
          </List.Description>
        </List.Item>
        <List.Item as='li' value='◉'>
          <List.Description as='p' className={styles.mainListItem}>
            Our phylogenetic analyses show a significant correlation between a
            posterior vulva and loss of the posterior gonadal arm (prodelphic
            monodelphy) (see figure).
          </List.Description>
        </List.Item>
      </List>
    </Grid.Column>
  </Grid>
);

export default EvolutionOfOtherFeatures;
