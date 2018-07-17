import React from 'react';
import { Grid, List } from 'semantic-ui-react'; // eslint-disable-line

import styles from './MaleTailEvolution.postcss';

const MaleTailMorphogenesis = () => (
  <Grid stackable centered divided container className={styles.container}>
    <Grid.Row columns={2}>
      <Grid.Column>
        <List as='ol'>
          <List.Header as='h4' className={styles.text_title}>
            MH27: a tool for seeing apical cell boundaries
          </List.Header>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              <strong>MH27 antibody</strong> recognizes an epitope in the belt
              adherens junctions that surround the apical surfaces of the
              hypodermal and sensilla cells.
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              <strong>Using MH27 immunofluorescenc staining</strong>, we can
              trace the boundaries of cells as they appear, die, fuse together,
              or change position during male tail development.
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              For a model of the 4 tail tip cells showing the location of the
              adherens junctions, click here.
            </List.Description>
          </List.Item>
        </List>
      </Grid.Column>

      <Grid.Column>
        <List as='ol'>
          <List.Header as='h4' className={styles.text_title}>
            Homologies for male tail sensilla
          </List.Header>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              <strong>The sensilla</strong> In general, males in Rhabditidae
              have 9 bilateral pairs of genital papillae ("rays") required for
              finding the vulva during copulation. Both females and males have a
              pair of "phasmids", which appear to be chemoreceptive sensilla.
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              <strong>Classical assumptions about homologies</strong> of the ray
              and phasmid sensilla in the male tail were based on morphological
              observations of adults only.
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              <strong>The developmental origins of these sensilla</strong> can
              now be observed at the single cell level using MH27.
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              In all Rhabditidae we have analyzed so far, the cells that form
              the rays (as well as other parts of the male tail hypodermis)
              originate in the same relative positions. We call this conserved
              pattern the rhabditid male tail <strong>Archetype</strong>.
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              During the evolution of male tails, the positions of homologous
              rays in adult males of different Rhabditidae species have changed
              substantially (see figure), even though the relative positions of
              ray cell origins has not changed at all. That is,
            </List.Description>
            <List.List as='ol'>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  Many ray cells migrate after they are born.
                </List.Description>
              </List.Item>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  Evolutionary changes have resulted in different patterns of
                  migration and cell-cell association (see Fitch & Emmons 1995).
                </List.Description>
              </List.Item>
            </List.List>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              Reconstructing the pattern of evolutionary change in sensilla
              patterning reveals some changes that are strikingly similar to the
              effects of mutations in C. elegans patterning genes, suggesting
              possible candidate genes that could have been involved in these
              evolutionary changes (see Fitch 1997).
            </List.Description>
          </List.Item>
        </List>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={2}>
      <Grid.Column>
        <List as='ol'>
          <List.Header as='h4' className={styles.text_title}>
            Evolution of male tail tip morphologies
          </List.Header>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              <strong>Tail tips</strong> in Rhabditidae have been classically
              categorized into 2 states: "Leptoderan" (pointy) or "Peloderan"
              (blunt-ended).
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              <strong>The cellular morphology</strong> of tail tips are now
              being studied with MH27 and electron microscopy (EM).
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              <strong>At least one evolutionary change</strong> in male tail tip
              morphology occurred from peloderan to leptoderan in the
              "Eurhabditis" group of Rhabditidae (see figure).
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              This evolutionary change is strikingly similar to the effects of
              mutations we have generated in C. elegans that result in
              leptoderan tail tips (e.g., lep-1 mutants), suggesting possible
              candidate genes that could have been involved in these
              evolutionary changes (see Fitch 1997).
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              Contrary to the classic, dichotomous nomenclature for tail tip
              states, we find that not all peloderan tails are constructed in
              the same way; neither are all leptoderan tails (see figure). Our
              MH27 and EM studies, in the context of phylogenetic analysis, are
              helping us to define the states of tail tip characters.
            </List.Description>
          </List.Item>
        </List>
      </Grid.Column>

      <Grid.Column>
        <List as='ol'>
          <List.Header as='h4' className={styles.text_title}>
            Male tail form and copulatory behavior: evolutionary correlates
          </List.Header>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              Our phylogenetic analysis has revealed an evolutionary correlation
              between one aspect of male tail form and function:{' '}
              <strong>big bursae are required for parallel mating</strong> (see
              figure)
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              <strong>Ancestrally</strong>, males of Rhabditidae species did not
              have broad bursae ("fans"), and mating position was spiral.
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              <strong>A bursa evolved once</strong>, but parallel mating did not
              arise immediately (some species with bursae still show spiral
              mating).
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              <strong>Parallel mating arose later</strong> only in lineages
              where males already had bursae.
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              In lineages where bursae were secondarily reduced, parallel mating
              was lost, and spiral mating was again used.
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              Sometimes, parallel mating is lost even in lineages that retain
              bursae.
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              Taken together, these data suggest that{' '}
              <strong>a bursa (fan) is preadaptive to parallel mating,</strong>{' '}
              and that a capacity for spiral mating is often retained.
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              We are currently seeking correlations between microhabitat and
              mating position to see if substrate type may result in selection
              for a particular mating position.
            </List.Description>
          </List.Item>
        </List>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default MaleTailMorphogenesis;
