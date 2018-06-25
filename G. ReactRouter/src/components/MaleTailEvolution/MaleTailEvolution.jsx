import React from 'react';
import { List } from 'semantic-ui-react'; // eslint-disable-line

import styles from './MaleTailEvolution.postcss';

const MaleTailMorphogenesis = () => (
  <List relaxed verticalAlign='middle' as='ol'>
    <List.Header
      as='h4'
      className={styles.text_title}
      styles={{ textAlign: 'center', }}
    >
      MH27: a tool for seeing apical cell boundaries
    </List.Header>
    <List.Item as='li' value='◉'>
      <List.Description as='p' className={styles.mainListItem}><strong>MH27 antibody</strong> recognizes an epitope in the belt adherens junctions that surround the apical surfaces of the hypodermal and sensilla cells.
      </List.Description>
    </List.Item>
    <List.Item as='li' value='◉'>
      <List.Description as='p' className={styles.mainListItem}><strong>Using MH27 immunofluorescenc staining</strong>, we can trace the boundaries of cells as they appear, die, fuse together, or change position during male tail development.
      </List.Description>
    </List.Item>
    <List.Item as='li' value='◉'>
      <List.Description as='p' className={styles.mainListItem}>
      For a model of the 4 tail tip cells showing the location of the adherens junctions, click here.
      </List.Description>
    </List.Item>
  </List>
);

export default MaleTailMorphogenesis;
