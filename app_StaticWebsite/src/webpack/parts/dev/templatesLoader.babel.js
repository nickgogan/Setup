import path from 'path';
import HtmlPlugin from 'html-webpack-plugin'; // eslint-disable-line
import CriticalCSS from 'html-critical-webpack-plugin'; // eslint-disable-line
import GenerateFaviconsPlugin from 'favicons-webpack-plugin'; // eslint-disable-line

export default () => {
  const pageIndex = new HtmlPlugin({
    template: path.resolve(__dirname, '../../../templates/index.html'),
    filename: path.resolve(__dirname, '../../../../build/index.html'),
    includeChunks: ['main',],
    excludeChunks: ['page',],
    title: 'MyApp',
    desc: 'This is my app.',
    inject: 'body',
  });
  const pagePage = new HtmlPlugin({
    template: path.resolve(__dirname, '../../../templates/page.html'),
    filename: path.resolve(__dirname, '../../../../build/page.html'),
    includeChunks: ['page',],
    excludeChunks: ['main',],
    title: 'myPage',
    desc: 'This is my other page.',
    inject: 'body',
  });

  return {
    module: {
      rules: [],
    },
    plugins: [pageIndex,],
  };
};
