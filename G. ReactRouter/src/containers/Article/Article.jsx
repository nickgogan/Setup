// @flow

import React from 'react';
import styles from './Article.postcss';

import { Grid, Container, } from 'semantic-ui-react';
import Markdown from 'markdown-to-jsx';

import marklar from '../../../TEST.md';

const Article = props => (
  <Grid container divided='vertically' centered className={styles.article}>
    <Grid.Row columns={2}>
      <Grid.Column>
        <Markdown>{marklar}</Markdown>
      </Grid.Column>

      <Grid.Column>
        <Container className={styles.article}>
          <h1 className={styles.heading}>{props.headerText}</h1>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus
            elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
            ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam
            lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
            viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
            imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
            ultricies nisi.
          </p>
        </Container>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Article;
