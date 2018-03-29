import path from 'path';
import HtmlPlugin from 'html-webpack-plugin'; // eslint-disable-line
// import CriticalCSS from 'html-critical-webpack-plugin'; // eslint-disable-line
import RobotsGeneratorPlugin from 'robotstxt-webpack-plugin'; // eslint-disable-line
import GenerateSocialInfo from 'social-tags-webpack-plugin'; // eslint-disable-line
import { getIfUtils, removeEmpty } from 'webpack-config-utils'; //eslint-disable-line

/*
########################################
                        Templates


Generate templates based on environment.
########################################
*/
const baseTemplate = page => ({
  template: path.resolve(__dirname, `../../templates/${page}.html`),
  includeChunks: ['main',],
  excludeChunks: ['page',],
  title: 'MyApp',
  desc: 'This is my app.',
  inject: 'body',
  // Note that you can add custom options here if you need to handle other custom logic in index.html
  // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
  trackJSToken: '',
});
const productionTemplate = page => ({
  filename: path.resolve(__dirname, `../../../dist/${page}.html`),
  minify: {
    html5: true, // TODO: Update if upgrading to HTML6
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    removeComments: true,
    trimCustomFragments: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyURLs: true,
  },
  showErrors: false,
});
const developmentTemplate = page => ({
  filename: path.resolve(__dirname, `../../../build/${page}.html`),
  showErrors: true,
});
/*
########################################
                    Template-Generator


Generate baseTemplate
########################################
*/
// Config Generator
const TemplateGenerator = (env, pageNames, ifProduction) =>
  pageNames.map(page =>
    ifProduction(
      Object.assign({}, baseTemplate(page), productionTemplate(page)),
      Object.assign({}, baseTemplate(page), developmentTemplate(page))
    )
  );
/*
########################################
                        Useful Plugins


Various plugins for a wider net of situations.
########################################
*/
// const criticalCSS = new CriticalCSS({
//   base: path.resolve(__dirname, '../../../dist'),
//   src: 'index.html',
//   dest: 'index.html',
//   inline: true,
//   width: 375,
//   height: 565,
//   penthouse: {
//     blockJSRequests: false,
//   },
// });
const robotsGenerator = new RobotsGeneratorPlugin({
  policy: [
    {
      userAgent: 'Googlebot',
      allow: '/',
      disallow: '/search',
      crawlDelay: 2,
    },
    // Set up other search engine bots here
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
export default (env, pagesNames) => {
  const { ifProduction, } = getIfUtils(env);

  const pageConfigs = TemplateGenerator(env, pagesNames, ifProduction);
  const templates = pageConfigs.map(pageConfig => new HtmlPlugin(pageConfig));

  return {
    cache: ifProduction(),
    plugins: removeEmpty([
      ...templates,
      // ifProduction(criticalCSS),
      ifProduction(socialinfoGenerator),
      ifProduction(robotsGenerator),
    ]),
  };
};
