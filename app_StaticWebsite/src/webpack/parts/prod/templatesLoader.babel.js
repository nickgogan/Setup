import path from 'path';
import HtmlPlugin from 'html-webpack-plugin'; // eslint-disable-line
import CriticalCSS from 'html-critical-webpack-plugin'; // eslint-disable-line
import RobotsGeneratorPlugin from 'robotstxt-webpack-plugin'; // eslint-disable-line
import GenerateFaviconsPlugin from 'favicons-webpack-plugin'; // eslint-disable-line
import GenerateSocialInfo from 'social-tags-webpack-plugin'; // eslint-disable-line

export default () => {
  const indexPage = new HtmlPlugin({
    template: path.resolve(__dirname, '../../../templates/index.html'),
    filename: path.resolve(__dirname, '../../../../dist/index.html'),
    includeChunks: ['main',],
    excludeChunks: ['page',],
    title: 'MyApp',
    desc: 'This is my app.',
    inject: 'body',
    showErrors: true, // TODO: Turn off when done.
    minify: {
      html5: true, // TODO: Update if upgrading to HTML6
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeComments: true,
      trimCustomFragments: true,
    },
  });
  const pagePage = new HtmlPlugin({
    template: path.resolve(__dirname, '../../../templates/page.html'),
    filename: path.resolve(__dirname, '../../../../dist/page.html'),
    includeChunks: ['page',],
    excludeChunks: ['main',],
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
    description: 'My description',
    // persistentCache: true,
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
    statsFilename: 'iconstats-[hash].json',
  });
  const socialinfoGenerator = new GenerateSocialInfo({
    appUrl: 'http://example.com/',
    facebook: {
      'fb:app_id': '123456789',
      'og:url': 'http://example.com/page.html',
      'og:type': 'website',
      'og:title': 'Content Title',
      // 'og:image': path.resolve('./assets/'),
      'og:description': 'Description Here',
      'og:site_name': 'Site Name',
      'og:locale': 'en_US',
      'og:article:author': '',
    },
    twitter: {
      'twitter:card': 'summary',
      'twitter:site': '@site_account',
      'twitter:creator': '@individual_account',
      'twitter:url': 'http://example.com/page.html',
      'twitter:title': 'Content Title',
      'twitter:description': 'Content description less than 200 characters',
      // 'twitter:image': path.resolve('src/img/book.png'),
    },
  });

  return {
    module: {
      rules: [],
    },
    plugins: [
      indexPage,
      socialinfoGenerator,
      robotsGenerator,
      // faviconsGenerator
    ], // pagePage,
  };
};
