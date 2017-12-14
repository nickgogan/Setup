# NPM Packages Useful to Install Globally

1. NPM Peer Dependencies (`> npm i -g peerdeps`): Install a given package's missing peer dependencies.

* Example: `> install-peerdeps --dev eslint-config-airbnb`

2. TypeScript (`> npm i -g typescript tsc`): The actual TS language and its compiler.

1. Node Security Platform: (`> npm i -g nsp`): Checks npm packages for known vulnerabilities.

* Example: `> nsp check`

- Note: Include this check when doing `> npm start`

1. npm-run-all (`> npm i -g npm-run-all`): Allows commands to be run in parallel.

1. Babel (`> npm i -g babel-cli`): Babel needs to be installed globally! The presets can be installed locally.
