import React from 'react';
import { Image } from 'semantic-ui-react'; // eslint-disable-line
import styles from './Sponsors.postcss';

const logos = [
  'adobeLogo',
  'androidLogo',
  'appleLogo',
  'bluetoothLogo',
  'dropboxLogo',
  'evernoteLogo',
  'facebookLogo',
  'firefoxLogo',
  'pinterestLogo',
  'quoraLogo',
  'rssLogo',
  'snapchatLogo',
  'soundcloudLogo',
  'twitterLogo',
  'vimeoLogo',
  'xboxLogo',
  'yahooLogo',
  'youtubeLogo',
];

function getRandomSponsors(sponsorsList, minimumRequired) {
  let startIndex;
  const endIndex = Math.floor(
    Math.random() * (sponsorsList.length - minimumRequired) + minimumRequired
  );

  if (endIndex > 0 && endIndex > 10) {
    startIndex = Math.floor(endIndex - 10 - 1);
  } else if (endIndex > 0 && endIndex < 10) {
    startIndex = Math.floor(10 + endIndex - 1);
  } else {
    console.log(`NEGATIVE FOUND: ${endIndex}`);
  }

  return sponsorsList.slice(startIndex, endIndex - 1);
}

export default class Sponsors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sponsors: getRandomSponsors(logos, 10),
    };
  }

  render() {
    return (
      <Image.Group size='tiny' className={styles.container}>
        {this.state.sponsors.map(sponsor => (
          <Image
            key={sponsor}
            src={require(`../../assets/images/${sponsor}.svg`)} // eslint-disable-line
            alt={sponsor}
            className={styles.sponsor}
          />
        ))}
      </Image.Group>
    );
  }
}
