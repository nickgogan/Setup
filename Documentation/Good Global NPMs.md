# NPM Packages Useful to Install Globally

1. NPM Peer Dependencies (`> npm i -g peerdeps`): Install a given package's missing peer dependencies.

* Example: `> install-peerdeps --dev eslint-config-airbnb`

2. TypeScript (`> npm i -g typescript`)

1. Typings (`> npm i -g typings && typings install -h`): CLI interface to a npm library that can add IntelliSense for languages/frameworks/etc... when working in VS Code (or any other TypeScript-based editor).

* Example: `> typings install dt~node --save --global`. This generates a typings.json config file and a typings/ folder to hold the definition modules.

1. Node Security Platform: (`> npm i -g nsp`): Checks npm packages for known vulnerabilities.

* Example: `> nsp check`

- Note: Include this check when doing `> npm start`

1. npm-run-all (`> npm i -g npm-run-all`): Allows commands to be run in parallel.

1. Babel (`> npm i -g babel-cli`): Babel needs to be installed globally! The presets can be installed locally.
