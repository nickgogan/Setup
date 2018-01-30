import path from 'path';
import HtmlPlugin from 'html-webpack-plugin'; // eslint-disable-line
import RobotsGeneratorPlugin from 'robotstxt-webpack-plugin'; // eslint-disable-line
import GenerateFaviconsPlugin from 'favicons-webpack-plugin'; // eslint-disable-line

export default () => {
  const indexPage = new HtmlPlugin({
    template: path.resolve(__dirname, '../../../templates/index.html'),
    filename: path.resolve(__dirname, '../../../../dist/index.html'),
    includeChunks: ['main',],
    excludeChunks: ['vendors', 'page',],
    title: 'MyApp',
    desc: 'This is my app.',
    inject: 'body',
  });
  const pagePage = new HtmlPlugin({
    template: path.resolve(__dirname, '../../../templates/page.html'),
    filename: path.resolve(__dirname, '../../../../dist/page.html'),
    includeChunks: ['page',],
    excludeChunks: ['vendors', 'main',],
    title: 'myPage',
    desc: 'This is my other page.',
    inject: 'body',
  });
  const robotsGenerator = new RobotsGeneratorPlugin({
    policy: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: '/search',
        crawlDelay: 2,
      },
      {
        userAgent: 'OtherBot',
        allow: ['/allow-for-all-bots', '/allow-only-for-other-bot',],
        disallow: ['/admin', '/login',],
        crawlDelay: 2,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: '/search',
        crawlDelay: 10,
        cleanParam: 'ref /articles/',
      },
    ],
  });
  const faviconsGenerator = new GenerateFaviconsPlugin({
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
      coast: { offset: 25, },
      favicons: true,
      firefox: true,
      opengraph: true,
      twitter: true,
      yandex: true,
      windows: true,
    },
    emitStats: true,
    statsFilename: 'iconstats.json',
  });

  return {
    plugins: [indexPage, robotsGenerator,], // pagePage, faviconsGenerator
  };
};
