import path from 'path';
import WebpackHtmlPlugin from 'html-webpack-plugin'; // eslint-disable-line
import CriticalCSS from 'html-critical-webpack-plugin'; // eslint-disable-line

export default () => {
  const htmlIndex = new WebpackHtmlPlugin({
    template: path.resolve(__dirname, '../../../templates/index.html'),
    filename: path.resolve(__dirname, '../../../../build/index.html'),
    includeChunks: ['main',],
    excludeChunks: ['vendors', 'page',],
    title: 'MyApp',
    desc: 'This is my app.',
    inject: 'body',
  });
  const htmlPage = new WebpackHtmlPlugin({
    template: path.resolve(__dirname, '../../../templates/page.html'),
    filename: path.resolve(__dirname, '../../../../build/page.html'),
    includeChunks: ['page',],
    excludeChunks: ['vendors', 'main',],
    title: 'myPage',
    desc: 'This is my other page.',
    inject: 'body',
  });
  const criticalCSS = new CriticalCSS({
    base: path.resolve(__dirname, '../../../../dist'),
    src: 'index.html',
    dest: 'index.html',
    inline: true,
    width: 375,
    height: 565,
    penthouse: {
      blockJSRequests: false,
    },
  });

  return {
    module: {
      rules: [],
    },
    plugins: [htmlIndex, criticalCSS,], // , htmlPage,
  };
};
