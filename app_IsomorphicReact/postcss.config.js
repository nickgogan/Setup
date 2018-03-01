module.exports = {
  plugins: {
    // 'postcss-import': { addDependencyTo: 'webpack', },
    'postcss-cssnext': {
      features: {
        customProperties: {
          preserve: true,
          appendVariables: true,
        },
      },
    },
    cssnano: {
      autoprefixer: false,
      discardDuplicates: true,
    },
  },
};
