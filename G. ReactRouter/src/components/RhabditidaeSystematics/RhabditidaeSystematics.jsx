import React from 'react';
import { Grid, List } from 'semantic-ui-react'; // eslint-disable-line

import styles from './RhabditidaeSystematics.postcss';

const RhabditidaeSystematics = () => (
  <Grid stackable centered divided container className={styles.container}>
    <Grid.Row columns={2}>
      <Grid.Column>
        <List as='ol'>
          <List.Header as='h4' className={styles.text_title}>
            What is Rhabditidae?
          </List.Header>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              Rhabditidae is a family of "free-living" nematodes in the order
              Rhabditida. Worms in this family are usually specialized to feed
              on bacteria (decaying organic matter) and are often associated
              with animal hosts or vectors. The life-cycle can be as short as
              3.5 days, but these worms can also develop through an alternative
              larval stage (the dauerlarva, probably preadaptive to the
              infective stage of parasites) which is specialized to disperse or
              to resist harsh conditions. Many are easy to culture on
              bacteriological plates. We maintain a collection of strains and a
              database for these and other strains (WSRN, see Resources).
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              Several scientifically, agriculturally, and medically important
              nematodes are derived from, are closely related to, or are
              themselves Rhabditidae. For example, vertebrate parasites of order
              Strongylida have phylogenetic origins in Rhabditidae (Fitch &
              Thomas 1997; Blaxter et al. 1998; below). C. elegans is a member
              of Rhabditidae and a major model for fundamental biological
              research, drug design and functional genomics (see C. elegans WWW
              server).
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              The taxonomy of Rhabditidae is in flux. Classically, different
              systematists have had very different ideas about the composition
              of species groups in this taxon or about how these groups are
              related to each other. Two major influences on rhabditid
              systematics are Drs. Istvan Andrássy (1983, 1984) and Walter
              Sudhaus (1976 and later). Sudhaus and Fitch (1999) have provided
              an English translation of part of the 1976 monograph by Sudhaus.
            </List.Description>
          </List.Item>
        </List>
      </Grid.Column>

      <Grid.Column>
        <List as='ol'>
          <List.Header as='h4' className={styles.text_title}>
            Data we use to infer Rhabditidae phylogeny
          </List.Header>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              We have been using primarily DNA sequences from 18S ribosomal RNA
              genes (rDNA) for inferring species phylogenies (see also P. De
              Ley's list of nematode 18S sequences).
            </List.Description>
            <List.List as='ol'>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  Although rDNA is a family of repeated genes, the 18S sequences
                  in the different repeated units are very homogeneous. That is,
                  all the 18S sequences share evolutionary changes, a phenomenon
                  known as concerted evolution (see figure on concerted
                  evolution).
                </List.Description>
              </List.Item>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  Using dye-primer sequencing chemistry, we have demonstrated
                  for all of our 18S sequences that intraspecific polymorphisms,
                  though detectable, are very rare. We have detected rare
                  substitution polymorphisms (see figure) and even rarer
                  insertion/deletion polymorphisms (see figure).
                </List.Description>
              </List.Item>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  Our high-throughput Genetics Analysis Facility (GAF), funded
                  by NSF and NYU, allows highly accurate and extensive
                  sequencing reads (see Facilities).
                </List.Description>
              </List.Item>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  One of our alignments of these 18S sequences uses predicted
                  secondary structures of the RNA products (based on models
                  provided by R. De Wachter, Univ. Antwerp):
                </List.Description>
              </List.Item>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  A portion of this alignment is available for downloading (see
                  also the Resources page):
                </List.Description>
              </List.Item>
            </List.List>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              We have also begun to use DNA sequences from other genes; e.g.,
              the genes for RNA polymerase II and let-60 Ras. We are also
              exploring other genes for their phylogenetic informativeness.
              These data will be incorporated into our phylogenetic analyses in
              the next few years.
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              We also use morphological characters for phylogenetic inference,
              but using new data on character homologies and states obtained
              from electron microscopic and developmental studies.
            </List.Description>
            <List.List as='ol'>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  In analyses at the single cell level, we have been able to
                  trace the developmental origins of all cells that make up the
                  ray and phasmid sensilla of the male tails of several
                  representatives of Rhabditidae (see Evolution and
                  Morphogenesis pages). In all Rhabditidae species we have
                  characterized so far, the patterns of these unique origns for
                  each sensillum are identical, providing a means to identify
                  which sensilla are homologous between species (Fitch & Emmons
                  1995; Fitch 1997).
                </List.Description>
              </List.Item>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  We have used these homologies (and other features identified
                  at the cellular level) to compile a matrix of male tail
                  morphological (and cellular) characters. This matrix has been
                  published (Fitch 1997) and is available from the journal site
                  or our Resources page.
                </List.Description>
              </List.Item>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  In collaboration with Dr. Sudhaus, these and additional
                  morphological characters will be incorporated into our
                  phylogenetic analyses in the next few years.
                </List.Description>
              </List.Item>
            </List.List>
          </List.Item>
        </List>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={2}>
      <Grid.Column>
        <List as='ol'>
          <List.Header as='h4' className={styles.text_title}>
            Phylogenetic results so far
          </List.Header>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              Our preliminary analyses with 18S rDNA alone (>50 Rhabditidae
              species) have resulted in 3 phylogenies with different degrees of
              resolution and confidence (evaluated by maximum likelihood using
              appropriately tested models):
            </List.Description>
            <List.List as='ol'>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  The first phylogenetic tree (cladogram) only depicts those
                  relationships which are the most strongly supported, and for
                  which we have nearly 100% confidence.
                </List.Description>
              </List.Item>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  The second tree (also a cladogram) depicts additionally
                  resolved relationships for which we have a somewhat lower
                  confidence. This is the tree we have used for tracing
                  evolutionary changes (see pages on Rhabditidae evolution).
                </List.Description>
              </List.Item>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  The third tree is the maximum-likelihood tree. Several of the
                  relationships in this completely dichotomously branching tree
                  (marked by arrows in Tree 3) are not well-supported. But the
                  advantage of this tree is that it shows branch lengths.
                </List.Description>
              </List.Item>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  Because these are still preliminary results, please do not use
                  them without permission.
                </List.Description>
              </List.Item>
            </List.List>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              Our previous analyses with 18S rDNA and male tail morphological
              characters (10 Rhabditidae species) showed that these two kinds of
              data yield phylogenetic results that are not significantly
              incongruent (Fitch 1997). When combined, the two data partitions
              are complementary and together yield a more highly resolved
              phylogeny.
            </List.Description>
          </List.Item>
        </List>
      </Grid.Column>
      <Grid.Column>
        <List as='ol'>
          <List.Header as='h4' className={styles.text_title}>
            Significance of these results
          </List.Header>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              Adding particular taxa increases resolution for species groups in
              Rhabditidae, even without adding data from more genes. This
              increased resolution results from the "breaking" of long branches
              separating particular taxa.
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              But there are more relationships that need to be resolved when
              more taxa are added; some of these relationships are not well
              resolved because there are not enough evolutionary change
              occurring in 18S rDNA to provide phylogenetic information about
              these particular relationships. This means we need data from
              additional characters (DNA, morphology) to resolve these
              relationships.
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              Several previous phylogenetic hypotheses about Rhabditidae are
              completely overturned by our new data:
            </List.Description>
            <List.List as='ol'>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  In the classical view, species groups in Rhabditidae that do
                  not have a "glottoid apparatus" (Parasitorhabditis,
                  Protorhabditis) are primitive and anciently diverged. However,
                  our data strongly suggest that these taxa are derived, and
                  that the glottoid apparatus must have been lost at least twice
                  independently (see Evolution pages).
                </List.Description>
              </List.Item>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  Rhabditoides was classically thought to be closely related to
                  species in a group that Sudhaus called "Eurhabditis". However,
                  our data strongly suggest that Rhabditoides contains some of
                  the most anciently diverging species lineages in Rhabditidae
                  and could be polyphyletic.
                </List.Description>
              </List.Item>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  Cruznema is not closely related to Mesorhabditis-like species,
                  as classically thought, but is much more closely related to
                  "Eurhabditis" species.
                </List.Description>
              </List.Item>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  "Peloderinae", a subfamily erected by Andrássy containing many
                  species groups with "Peloderan" male tails, is polyphyletic;
                  several independent changes between peloderan and leptoderan
                  tails have occurred in Rhabditidae (see pages on Evolution).
                </List.Description>
              </List.Item>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  Species classically placed in a different family or subfamily
                  (genus Diploscapter) are derived from within the
                  Protorhabditis genus.
                </List.Description>
              </List.Item>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  Two completely different orders are derived from species
                  groups within Rhabditidae: Strongylida (comprising some
                  vertebrate parasites) is derived from the "Eurhabditis" group
                  (as previously predicted by Fitch & Thomas 1997 and Blaxter et
                  al. 1998) and Diplogasterida is closely related to some of the
                  Rhabditoides species (as predicted by nobody).
                </List.Description>
              </List.Item>
              <List.Item as='li' value='◈'>
                <List.Description as='p' className={styles.text_body}>
                  As predicted by Sudhaus (1993), the insect-parasitic family
                  Heterorhabditis is derived from within Rhabditidae
                  ("Eurhabditis").
                </List.Description>
              </List.Item>
            </List.List>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              Because at least two parasitic groups are derived from within
              Rhabditidae, these phylogenetic analyses are required for
              reconstructing the origin of specialized adaptations associated
              with parasitism in these species. Our Rhabditidae phylogeny also
              provides a means of predicting taxa most closely related to these
              parasites for comparative studies that could lead to the
              development of taxon-specific control agents (e.g., anti-parasite
              drugs).
            </List.Description>
          </List.Item>
          <List.Item as='li' value='◉'>
            <List.Description as='p' className={styles.mainListItem}>
              Rhabditidae includes a major model system, Caenorhabditis elegans,
              which provides a wealth of detailed information about biological
              mechanisms. Our phylogeny for Rhabditidae provides the comparative
              context needed for interpreting the relevance of information
              derived from the C. elegans system for other nematodes and
              eventually other metazoan systems, such as humans.
            </List.Description>
          </List.Item>
        </List>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row />
  </Grid>
);

export default RhabditidaeSystematics;
