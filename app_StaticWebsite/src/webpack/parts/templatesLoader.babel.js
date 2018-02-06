import path from 'path';
import HtmlPlugin from 'html-webpack-plugin'; // eslint-disable-line
import CriticalCSS from 'html-critical-webpack-plugin'; // eslint-disable-line
import RobotsGeneratorPlugin from 'robotstxt-webpack-plugin'; // eslint-disable-line
import GenerateFaviconsPlugin from 'favicons-webpack-plugin'; // eslint-disable-line
import GenerateSocialInfo from 'social-tags-webpack-plugin'; // eslint-disable-line

/*
########################################
                    Template-Generator


Generate baseTemplate
########################################
*/

/*
########################################
                        Templates


Generate templates based on environment.
########################################
*/
const baseTemplate = {
  template: path.resolve(__dirname, '../../templates/index.html'),
  includeChunks: ['main',],
  excludeChunks: ['page',],
  title: 'MyApp',
  desc: 'This is my app.',
  inject: 'body',
};
const productionTemplate = {
  filename: path.resolve(__dirname, '../../../dist/index.html'),
  minify: {
    html5: true, // TODO: Update if upgrading to HTML6
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    removeComments: true,
    trimCustomFragments: true,
  },
};
const developmentTemplate = {
  filename: path.resolve(__dirname, '../../../build/index.html'),
  indexPage: true,
};
/*
########################################
                        Useful Plugins


Various plugins for a wider net of situations.
########################################
*/
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
  title: 'MyApp',
  description: 'This is my app.',
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
/*
########################################
                    Exported Webpack


What actually gets sent to webpack config.
########################################
*/
export default env => {
  const indexPageConfig =
    env === 'production'
      ? Object.assign({}, baseTemplate, productionTemplate)
      : Object.assign({}, baseTemplate, developmentTemplate);
  const indexPage = new HtmlPlugin(indexPageConfig);

  return {
    plugins: [
      indexPage,
      socialinfoGenerator,
      robotsGenerator,
      // faviconsGenerator
    ], // pagePage,
  };
};
