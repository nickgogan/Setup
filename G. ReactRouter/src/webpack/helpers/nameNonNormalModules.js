// Name non-normal modules. Like NormalModulesPlugin, but can handle those and non-normal modules, like external modules.
export default {
  apply(compiler) {
    compiler.plugin('compilation', compilation => {
      compilation.plugin('before-module-ids', modules => {
        modules.forEach(module => {
          if (module.id !== null) {
            return;
          }
          module.id = module.identifier(); // eslint-disable-line
        });
      });
    });
  },
};
