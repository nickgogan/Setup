import path from 'path';
import WebpackHtmlPlugin from 'html-webpack-plugin'; // eslint-disable-line

export default () => {
  const htmlIndex = new WebpackHtmlPlugin({
    template: path.resolve(__dirname, '../../../templates/index.html'),
    filename: path.resolve(__dirname, '../../../../build/index.html'),
    includeChunks: ['main'],
    excludeChunks: ['page'],
    title: 'MyApp',
    desc: 'This is my app.',
    inject: 'body'
  });
  const htmlPage = new WebpackHtmlPlugin({
    template: path.resolve(__dirname, '../../../templates/page.html'),
    filename: path.resolve(__dirname, '../../../../build/page.html'),
    includeChunks: ['page'],
    excludeChunks: ['main'],
    title: 'myPage',
    desc: 'This is my other page.',
    inject: 'body'
  });

  return {
    module: {
      rules: []
    },
    plugins: [htmlIndex, htmlPage]
  };
};
