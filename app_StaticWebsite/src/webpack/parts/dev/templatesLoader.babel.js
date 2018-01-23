import path from 'path';
import WebpackHtmlPlugin from 'html-webpack-plugin'; // eslint-disable-line
import WebpackHtmlHarddiskPlugin from 'html-webpack-harddisk-plugin'; // eslint-disable-line

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

  return {
    module: {
      rules: []
    },
    plugins: [htmlIndex, htmlToHdd]
  };
};
