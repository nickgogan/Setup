import React from 'react';
import { List } from 'semantic-ui-react'; // eslint-disable-line

import styles from './CurrentModels.postcss';

const CurrentModels = () => (
  <List relaxed animated divided selection verticalAlign='middle'>
    <List.Item>
      <List.Content>
        <List.Header as='h4' className={styles.text_title}>
          Rhabditidae
        </List.Header>
        <List.Description as='p' className={styles.text_body}>
          A family of nematodes (roundworms) which comprises a large number (>
          250) of small (1-2 mm), predominantly free-living worms found
          everywhere among the microflora of many different saprobic habitats.
        </List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content>
        <List.Header as='h4' className={styles.text_title}>
          Worm Male Tails
        </List.Header>
        <List.Description as='p' className={styles.text_body}>
          As a model form, it is a structure required for copulation which has
          an array of sensilla (rays) usually arranged in a lateral extension of
          the cuticle (fan). Despite the small number of cells (ca. 100), these
          structures vary substantially in Rhabditidae.
        </List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content>
        <List.Header as='h4' className={styles.text_title}>
          Caenorhabditis elegans
        </List.Header>
        <List.Description as='p' className={styles.text_body}>
          A member of the Rhabditidae family, C. elegans is used as a model
          organism for isolating and understanding the functions of genes
          controlling the male tail form. The male tail is rounded (PELODERAN)
          at the tip, a form that is due to a morphogenetic event in the last
          larval stage in which the tail tip cells fuse together and change
          shape. This event does not occur in females, which have pointy tails.
        </List.Description>
      </List.Content>
    </List.Item>
  </List>
);

export default CurrentModels;
