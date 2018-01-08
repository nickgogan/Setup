# NodeJS for RESTful APIs

#### Published on January 5, 2018

This project is a scaffold for making RESTful APIs using NodeJS and Express. This document will answer each item of The Checklist to showcase the technologies used. Then, debugging methods are showcased and, finally, built-in dev workflows are explained.

* [The Checklist](#the-checklist)
* [Debugging](#debugging)
  * [Method 1: nodemon and VSC Debugger](#method-1-nodemon-and-vsc-debugger)
  * [Method 2: Chrome devTools](#method-2-chrome-devtools)
* [Workflows](#workflows)

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

## Method 1: nodemon and VSC Debugger

**Sources**:

1. https://code.visualstudio.com/docs/editor/debugging
1. https://github.com/Microsoft/vscode-recipes/tree/master/nodemon
1. https://stackoverflow.com/questions/31711286/vscode-debug-es6-application
1. http://sandny.com/2017/10/30/babel-express-js-node-js-nodemon-to-build-a-node-js-server-with-hot-reloading/
1. https://stackoverflow.com/questions/39917343/nodemon-babel-restart-the-server-multiple-times

**``nodemon** is the tool most often used to reload JS code upon change or upon saving. While it comes from the Node/JS ecosystem, it can be used to "watch" any kind of file for changes. Examples include HTML, CSS, Sass, Python, Go, etc...It doesn't matter because it's configurable by file extension, making it very general and a great tool to include in your toolchain.

The other piece of the puzzle is VSC's built-in debuggers. See Source 1 for a general clue on how to get started (it's required reading). In this project, there is a `.vscode` folder that contains a `launch.json` file. This is a configuration file that tells VSC the type of debugger to use when, as well as more fine-grained configuration. These debuggers are broken down by **type** (in this case, node) and **task** (either _Launch_ or _Attach_). You'll notice that all, with the exception of the _Attach_ node debugger, were configured to launch with `nodemon` and utilize `babel`. (Sources 2, 3, 4, and 5 if you want to know how I put this together).

To showcase this flow, the app simply contains three JS files: `main.js`, `client.js`, and `server.js`. Obviously, this is just for demo purposes - adapt as you need to for your project. Quickly note that the main entrypoint for the project is set to be `main.js` in the `package.json/main`.

The most straightforward way to test this all out is to open `main.js`, add random breakpoints, and bring up the VSC Debugger panel on the left. Then:
A. `> npm run debug` + Attach (chosen from the debugging dropdown).

The result is a VSC node debugger attached to whatever node process is currently going at the port you set (the default here is 3001). It gets more exciting that this.

* Note: For some reason, when nodemon is used with Babel, the VSC Attach debugger always hits Babel itself. I could never figure out how to fix this. If anyone know of a way, please let me know! What I have been doing is just moving past that. The next breakpoint VSC hits will be the one you actually set. This problem can be avoided by going with Launch instead, but there are instances where you want to attach to an already-running Node process.

If you want to **restart**, do NOT do it through the VSC debugger. Just hit Ctrl+S to save on a file and let `nodemon` start instead. If you want to **end** the debugging session, don't exit via the VSC debugger - nodemon will still be running and will do weird things if you try to attach again. Instead, give `nodemon` control by exiting its process in the terminal via Ctrl+C. This will immediately end the VSC debuggers as well. Notice that in both the restart and end instances, `nodemon` has to be the driver, not the VSC debugger. This is important to keep in mind to have a smooth debugging experience. Thankfully, the Launch debuggers don't have this issue.

B. **Debugging several entry points at once**: As an example, the app also includes a `client.js` and `server.js`, which handle exactly what they sound they would. The server being used is Express and the client is just setInterval() with a console.log as the callback. These entry points can be launched via the **nodemon(Server)** and **nodemon(Client)** debuggers. You could even start one of them, debug + refactor for a while, and then launch the other to see how they integrate with your changes. Of course, on each save, nodemon restarts and the debuggers re-attach. Otherwise, what would be the point?

C. **Compound debugging**: The logical next step of B. is to launch both the server and client with "one" debugger,**Fullstack** in this case. VSC is graceous enough to support this. This literally just runs the two debuggers in sequence, which saves you a couple of clicks, but it all adds up. Plus, it's really cool to be able to do this!

## Method 2: Chrome devTools

**Sources**:

1. https://medium.com/the-node-js-collection/debugging-node-js-with-google-chrome-4965b5f910f4
1. https://www.youtube.com/watch?v=OqOOCv73czYs
1. https://www.youtube.com/watch?v=hfpkMyvSOp4

**As far as I can tell, and as far as I'm concerned, this method is deprecated.**

Chrome has a set of built-in NodeJS devTools that can be accessed at `about://inspect`. Simply start Express (or whatever Node-based web server you want) and then access the inspector. Source 1 is a recent writeup that showcases how this works step-by-step. It's worth reading through to have an idea of how this works. Source 2 is a two minute video that does this with Node's built-in HTTP server (which Express is built on top of).

I have not personally investigated this method very much, as I find working with `nodemon` and VSC a very smooth experience. I prefer to minimize context switching, so keeping things in VSC works great for me. Plus, the hot reloading that nodemon yields is just great, and I haven't found a way to hook that with Chrome's Node Inspector.

# Workflows

The workflows possible are more or less captured by the `package.json` scripts. The other workflows possible are the VSC-side debugging ones discussed in the previous section. In this section, I'll go through the `package.json` scripts from top to bottom. For each one, I will end on when it's best to use them.

1. **Debug**: `debug-js` and `debug-express` are the ingredients of the general `debug` script. The js one starts up `nodemon`, with the `--inspect-brk` flag set to the localhost:port you want. _This port has to match the port set for the Attach task in `launch.json`_. The express one will just fire console messages as you call express services. `nodemon` is started with `babel-node` and any changes you make will restart the app. Notice that `npm-run-all -s` is used to run these scripts _sequentially_. This is useful when you want to quickly run through the app and leave yourself the possibility of debugging via the Attach debugger.

2. **Start/Share**: `start-js` is the same as `debug-js`, but without the `--inspect-brk` flag. `start` utilizes this and `security` to begin the app, the latter running a helper script for `Node Security Platform`. This is done sequentially via `npm-run-all`. Finally, `share` builds on top of that by running `start` and `share` (a script for `localtunnel`) in parallel, again using `npm-run-all`.

3. **Publish**: Next come a set of scripts that constitute `publish`. `clean` is used to remove all content from the output `dist/` and `docs/` folders. `build` uses Babel to output ES5 files (with sourcemaps) from the `src/` directory. `documentation:html` generates documentation in the `docs/` folder by reading off the JSDoc + Flow annotations in the `src/*.js` files. `publish` brings it all together using `npm-run-all -s`.

Note on the helper scripts: Scripts like `security` and `localtunnel` aren't really meant to be run by themselves, but as part of a build process. Obviously, if somethng goes wrong, then run them to check integrity of the build processes.
