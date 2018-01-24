import path from 'path';
import WebpackHtmlPlugin from 'html-webpack-plugin'; // eslint-disable-line
import WebpackHtmlHarddiskPlugin from 'html-webpack-harddisk-plugin'; // eslint-disable-line
import WebpackGenerateRobotsPlugin from 'robotstxt-webpack-plugin'; // eslint-disable-line
import WebpackFaviconsGenerator from 'favicons-webpack-plugin';

export default () => {
  const htmlToHdd = new WebpackHtmlHarddiskPlugin({
    outputPath: path.resolve(__dirname, '../../dist')
  });
  const htmlIndex = new WebpackHtmlPlugin({
    template: path.resolve(__dirname, '../../../templates/index.html'),
    title: 'MyApp',
    desc: 'This is my app.',
    inject: 'body'
    // alwaysWriteToDisk: true // htmlToHdd should handle this.
  });
  const generateRobots = new WebpackGenerateRobotsPlugin({
    policy: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: '/search',
        crawlDelay: 2
      },
      {
        userAgent: 'OtherBot',
        allow: ['/allow-for-all-bots', '/allow-only-for-other-bot'],
        disallow: ['/admin', '/login'],
        crawlDelay: 2
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: '/search',
        crawlDelay: 10,
        cleanParam: 'ref /articles/'
      }
    ]
  });
  const faviconsGenerator = new WebpackFaviconsGenerator({
    logo: path.resolve(__dirname, '../../../assets/favicon.png'),
    title: 'My App',
    persistentCache: true,
    inject: true,
    background: '#fff'
  });

  return {
    module: {
      rules: []
    },
    plugins: [htmlIndex, htmlToHdd, generateRobots, faviconsGenerator]
  };
};
