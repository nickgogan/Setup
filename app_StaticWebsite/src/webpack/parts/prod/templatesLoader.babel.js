import path from 'path';
import WebpackHtmlPlugin from 'html-webpack-plugin'; // eslint-disable-line
import WebpackHtmlHarddiskPlugin from 'html-webpack-harddisk-plugin'; // eslint-disable-line
import WebpackGenerateRobotsPlugin from 'robotstxt-webpack-plugin'; // eslint-disable-line
import WebpackFaviconsGenerator from 'favicons-webpack-plugin'; // eslint-disable-line

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
  const htmlPage = new WebpackHtmlPlugin({
    template: path.resolve(__dirname, '../../../templates/page.html'),
    title: 'myPage',
    desc: 'This is my other page.',
    inject: 'body'
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
    appTitle: 'My App',
    appDescription: 'My App',
    description: 'My description',
    persistentCache: true,
    inject: true,
    background: '#fff',
    theme_color: '#fff',
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      coast: { offset: 25 },
      favicons: true,
      firefox: true,
      opengraph: true,
      twitter: true,
      yandex: true,
      windows: true
    },
    emitStats: true,
    statsFilename: 'iconstats.json'
  });

  return {
    module: {
      rules: []
    },
    plugins: [htmlIndex, htmlPage, htmlToHdd, generateRobots, faviconsGenerator]
  };
};
