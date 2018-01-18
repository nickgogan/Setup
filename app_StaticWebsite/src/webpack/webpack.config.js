require('babel-register');

module.exports = env => {
  console.log(env);

  const webpackConfig =
    env.env === 'dev'
      ? require(`./webpack.config.dev.babel.js`)
      : require(`./webpack.prod.babel.js`);

  return webpackConfig;
};
