# NodeJS for RESTful APIs

#### Published on January 5, 2018

This project is a scaffold for making RESTful APIs using NodeJS and Express. This document will answer each item of The Checklist to showcase the technologies used. Then, debugging methods are showcased and, finally, built-in dev workflows are explained.

# The Checklist

1. **OS prerequisites**: _Windows Setup_ and this gist for getting NodeJS to play nice with Windows - https://gist.github.com/nickgogan/84b0dbb5328ffeafbd6358a235a01db6
1. **Project structure and shells**: Project configs are at the project root, source code is contained in `/src`, final output is contained in `/dist`, and documentation in `/docs`.
1. **Package Management - Managers**: `npm/npx`
1. **Package Management - Deprecation Strategy**: none here, as there is no CI server. If there was one, integrate `Greenkeeper` and `RetireJS` into the pipeline.
1. **Package Management - Security**: `Node Security Manager (nsp)`. If a CI server were used, then go with `Snyk`.
1. **Module Management**: `ES6 Modules`, since we're going to be transpiling with Babel.
1. **Version Control + Cloud Storage**: `Git/GitHub`
1. **Linting**: `ESLint` with the `AirBnb standard` and its dependencies.
1. **Formatting**: `Prettier`.
1. **Transpiling**: `Babel` with the `env` preset.
1. **IntelliSense**: I'm assuming VSC is being used as the IDE, so `@types/node` and `@types/express`.
1. **Debugging**: `nodemon` - See the Debugging section below (#debugging)
1. **Development Web Server**: `Express`.
1. **Documentation**: `DocumentationJS` and `SassDoc`.
1. **Sharing Work**: `LocalTunnel`.
1. **Bundling**: TBD
1. **Build/Task Management**: `package.json` using `npx`.
1. **Dynamic HTML Generation**: None needed here.
1. **Centralized HTTP**: None needed here.
1. **Mocking Framework**: None needed here.
1. **Testing Suite**: TBD
1. **Continuous Integration**: TBD

# Debugging

**Sources**:

1. http://sandny.com/2017/10/30/babel-express-js-node-js-nodemon-to-build-a-node-js-server-with-hot-reloading/
1. http://sandny.com/2017/10/30/babel-express-js-node-js-nodemon-to-build-a-node-js-server-with-hot-reloading/
1. https://stackoverflow.com/questions/39917343/nodemon-babel-restart-the-server-multiple-times
1. https://stackoverflow.com/questions/31711286/vscode-debug-es6-application

# Workflows
