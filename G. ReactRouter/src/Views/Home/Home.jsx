import React from 'react';
import { Grid } from 'semantic-ui-react'; // eslint-disable-line

import styles from './Home.postcss';
import Carousel from '../../containers/Carousel/Carousel';
import LongtermGoals from '../../components/LongtermGoals/LongtermGoals';
import CurrentProjects from '../../components/CurrentProjects/CurrentProjects';
import CurrentModels from '../../components/CurrentModels/CurrentModels';
import Facilities from '../../components/Facilities/Facilities';
import Education from '../../components/Education/Education';
import Divider from '../../components/UI/Divider/Divider';

const ViewHome = props => (
  <Grid
    stackable
    centered
    divided
    container
    columns={props.columns}
    className={styles.container}
  >
    <Grid.Row>
      <LongtermGoals />
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <h1 className={styles.header}>Current Projects</h1>
        <CurrentProjects />
        <Divider horizontal />
        <h1 className={styles.header}>Current Models</h1>
        <CurrentModels />
      </Grid.Column>

      <Grid.Column className={styles.column_right}>
        <h1 className={styles.header}>Facilities</h1>
        <Facilities />
        <Divider horizontal />
        <h1 className={styles.header}>Education</h1>
        <Education />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default ViewHome;
