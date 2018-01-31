import webpack from 'webpack'; // eslint-ignore-line

export default bundles => ({
  plugins: bundles.map(
    bundle => new webpack.optimize.CommonsChunkPlugin(bundle)
  ),
});
