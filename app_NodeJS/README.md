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
1. **Version Control + Cloud Storage**: `Git/GitHub`.
1. **Linting**: `ESLint` with the `AirBnb standard` and its dependencies.
1. **Formatting**: `Prettier`.
1. **Transpiling**: `Babel` with the `env` preset.
1. **IntelliSense**: I'm assuming VSC is being used as the IDE, so `@types/node` and `@types/express`.
1. **Debugging**: `nodemon` - See the Debugging section below (#debugging).
1. **Development Web Server**: `Express`.
1. **Documentation**: `DocumentationJS`.
1. **Sharing Work**: `LocalTunnel`.
1. **Bundling**: `Babel`
1. **Build/Task Management**: `package.json` using `npx`.
1. **Dynamic HTML Generation**: None needed here.
1. **Centralized HTTP**: TBD
1. **Mocking Framework**: TBD
1. **Testing Suite**: TBD
1. **Continuous Integration**: TBD

# Debugging

**Sources**:

1. https://code.visualstudio.com/docs/editor/debugging
1. https://github.com/Microsoft/vscode-recipes/tree/master/nodemon
1. 1. https://stackoverflow.com/questions/31711286/vscode-debug-es6-application
1. http://sandny.com/2017/10/30/babel-express-js-node-js-nodemon-to-build-a-node-js-server-with-hot-reloading/
1. https://stackoverflow.com/questions/39917343/nodemon-babel-restart-the-server-multiple-times

## Method 1: nodemon and VSC Debugger

**``nodemon** is the tool most often used to reload JS code upon change or upon saving. While it comes from the Node/JS ecosystem, it can be used to "watch" any kind of file for changes. Examples include HTML, CSS, Sass, Python, Go, etc...It literally doesn't matter. This is configurable by file extension, so it's very general, making this a great tool to include in the toolchain.

The other puzzle is VSC's built-in debuggers. See Source 1 for a general clue on how to get started. Once you get how it works, go to the repo's `VSCode/debug-configs` and grab `node(mon).json`. Replace your `launch.json` (in your project's `.vscode/` folder) with this file and you'll get the Attach and Launch tasks that utilize nodemon (with Babel - see Sources 2, 3, 4, and 5 if you want to know how I put this together).

The most straightforward way to test this all out is to open `src/main.js`, add a random breakpoint, and bring up the VSC Debugger panel on the left. Then:
A. `> npm run watch` + Attach (chosen from the dropdown).

* Note: For some reason, with Babel, this process always hits Babel itself. I could never figure out how to fix this. If anyone know of a way, please let me know! What I have been doing is just moving past that. The next breakpoint VSC hits will be the one you actually set. This problem can be avoided by going with Launch instead, but there are instanced where you want to attach to an already-running Node process.
  B. Run Launch from the Debugger panel.

Things to keep in mind as you do this:

1. These VSC debugger tasks are set up in such a way that they begin based off of the currently-viewed file. So, you could either start with the project root, or with a JS file/module you want to focus on.
2. Both Attach and Launch should work with nodemon restarting all the time. No worries there.

## Method 2: Chrome devTools

**Sources**:

1. https://medium.com/the-node-js-collection/debugging-node-js-with-google-chrome-4965b5f910f4
1. https://www.youtube.com/watch?v=OqOOCv73czYs
1. https://www.youtube.com/watch?v=hfpkMyvSOp4

Chrome has a set of built-in NodeJS devTools that can be accessed at `about://inspect`. Simply start Express (or whatever Node-based web server you want) and then access the inspector. Source 1 is a recent writeup that showcases how this works step-by-step. It's worth reading through to have an idea of how this works. Source 2 is a 2 minute video that does this with Node's built-in HTTP server (which Express is built on top of).

I have not personally investigated this method very much, as I find working with `nodemon` and VSC a very smooth experience. I prefer to minimize context switching, so keeping things in VSC works great for me. Plus, the hot reloading that nodemon yields is just great, and I haven't found a way to hook that with Chrome's Node Inspector.

# Workflows

The workflows possible are more or less captured by the `package.json` scripts. In this section, I'll go through them from top to bottom. For each one, I will end on when it's best to use them.

1. **Debug**: `debug-js` and `debug-express` are the ingredients of the general `watch` script. The js one starts up `nodemon`, with the `--inspect-brk` flag set to the localhost:port you want. _This port has to match the port set for the Attach task in `launch.json`_. The express one will just fire console messages as you call express services (e.g. it says that it's current getting something if you go to the URL you set up for getting data ). `nodemon` is started with `babel-node` and any changes you make will restart the app. Notice that `npm-run-all -s` is used to run these scripts _sequentially_.

2. **Start/Share**: `start-js` is the same as `debug-js`, but without the `--inspect-brk` flag. Since `server.js` is imported, `express` will also start up. `start` utilizes this and `security` to begin the app. `start` then just runs `security` (a script for `Node Security Platform`) and then the `start-js` script. Finally, `share` builds on top of that by running `start` and `share` (a script for `localtunnel`). Notice that `npm-run-all -p` is used to run these two commands in parallel.

3. **Publish**: Next come a set of scripts that constitute `publish`. `clean` is used to remove all content from the `dist/` and `docs/` folders. `build` uses Babel to output ES5 files (with sourcemaps) from the `src/` directory. `documentation:html` generated documentation in the `docs/` folder by reading off the JSDoc + Flow annotations in the `src/*.js` files. `publish` brings it all together using `npm-run-all -s`, which _sequentially_ runs each script.

Note on the helper scripts: Scripts like `security` and `localtunnel` aren't really meant to be run by themselves, but as part of a build process. Obviously, if somethng goes wrong, then run them to rule them out as the possible source(s) of the issue(s).
