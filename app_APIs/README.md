# REST APIs with Node and Express

#### Published on January 5, 2018

This project is a scaffold for making RESTful APIs using NodeJS and Express. This document will answer each item of The Checklist to showcase the technologies used. Then, debugging methods are showcased and, finally, built-in dev workflows are explained.

* [The Checklist](#the-checklist)
* [Debugging](#debugging)
  * [Method 1: nodemon and VSC Debugger](#method-1-nodemon-and-vsc-debugger)
  * [Method 2: Chrome devTools](#method-2-chrome-devtools)
* [Workflows](#workflows)

# The Checklist

1. **OS prerequisites**: _Windows Setup_ and this gist for getting NodeJS to play nice with Windows - https://gist.github.com/nickgogan/84b0dbb5328ffeafbd6358a235a01db6

https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html

* Additional packages:
  * `cross-env`: Used to set system variables such that they will work in both Windows and \*nix platforms.
  * `morgan`: Express logger.
  * `winston`: More general logger used to provided more detailed, differentiated, and rotating logs.
  * `rimraf`: Cross-platform utility for deleting files and folders. Along with `cross-env`, this module makes this project work across operating systems.

1. **Project structure and shells**: Project configs are at the project root, source code is contained in `/src` (with a debugging demo), final output is contained in `/dist`, and documentation in `/docs`.
1. **Package Management - Managers**: `npm/npx`.
1. **Package Management - Deprecation Strategy**: none here, as there is no CI server. If there was one, integrate `Greenkeeper` and `RetireJS` into the pipeline.
1. **Package Management - Security**: `Node Security Manager (nsp)`. If a CI server were used, then go with `Snyk`.
1. **Module Management**: `ES6 Modules`, since we're going to be transpiling with Babel.
1. **Version Control + Cloud Storage**: `Git/GitHub`.
1. **Linting**: `ESLint` with the `AirBnb standard` and its dependencies.
1. **Formatting**: `Prettier`.
1. **Transpiling**: `Babel` with the `env` preset.
1. **IntelliSense**: I'm assuming VSC is being used as the IDE, so `@types/node` and `@types/express`.
1. **Debugging**: `nodemon` - See the Debugging section below.
1. **Development Web Server**: `Express`.
1. **Documentation**: `DocumentationJS`.
1. **Sharing Work**: `Localtunnel`.
1. **Bundling**: `Babel`.
1. **Build/Task Management**: `package.json` build scripts using `npx`.
1. **Dynamic HTML Generation**: None needed here.
1. **Centralized HTTP**: TBD
1. **Mocking Framework**: TBD
1. **Testing Suite**: TBD
1. **Continuous Integration**: TBD
1. **Continuous Monitoring**: `morgan` and `winston`

# Project Setup

## Structure

Apart from the customized config files taken from the **Configs** boilerplate, this project has a `src/` directory that's divided between `app/`, which contains the REST API boilerplate and `demo_Debugging`, which showcases how to set up an effective VSC debugging workflow (see the Debugging section below for more info).

# Debugging

## Method 1: nodemon and VSC Debugger

**Sources**:

1. https://code.visualstudio.com/docs/editor/debugging
1. https://github.com/Microsoft/vscode-recipes/tree/master/nodemon
1. https://stackoverflow.com/questions/31711286/vscode-debug-es6-application
1. http://sandny.com/2017/10/30/babel-express-js-node-js-nodemon-to-build-a-node-js-server-with-hot-reloading/
1. https://stackoverflow.com/questions/39917343/nodemon-babel-restart-the-server-multiple-times

**`nodemon`** is the tool most often used to reload JS code upon change or upon filesave. While it comes from the Node/JS ecosystem, it can be used to "watch" any kind of file. Examples include HTML, CSS, Sass, Python, Go, etc...It doesn't matter because it's configurable by file extension, making it a very versatile tool to include in the toolchain.

The other piece of the puzzle is VSC's built-in debuggers. See Source 1 for a general clue on how to get started (it's required reading). In this project, there's a `.vscode` folder that contains a `launch.json` file. This is a configuration file that tells VSC the type of debugger to use when, as well as more fine-grained configuration. These debuggers are broken down by **type** (in this case, node) and **task** (either _Launch_ or _Attach_). You'll notice that all, with the exception of the _Attach_ node debugger, were configured to launch with `nodemon` and utilize `babel`. (Sources 2, 3, 4, and 5 if you want to know how I put this together).

The demo-related debuggers are obviously named, so that should be straightforward to test. To try out, open up the debugger demo files and add some breakpoints. Then, select a VSC debugger from the dropdown. To see how VSC attaches debuggers to node processes, add breakpoints to `demo_Debugging/app.js`, run `> npm run debug`, and then start the Attach:3001 VSC debugger.

* Note: For some reason, when nodemon is used with Babel, the VSC Attach debugger always hits Babel itself. I could never figure out how to fix this. If anyone know of a way, please let me know! What I have been doing is just moving past that. The next breakpoint VSC hits will be the one you actually set. This problem can be avoided by going with Launch instead, but there are instances where you want to attach to an already-running Node process.

If you want to **restart**, do NOT do it through the VSC debugger. Just hit Ctrl+S to save on a file and let `nodemon` start instead. If you want to **end** the debugging session, don't exit via the VSC debugger - nodemon will still be running and will do weird things if you try to attach again. Instead, give `nodemon` control by exiting its process in the terminal via Ctrl+C. This will immediately end the VSC debuggers as well. Notice that in both the restart and end instances, `nodemon` has to be the driver, not the VSC debugger. This is important to keep in mind to have a smooth debugging experience. Thankfully, the Launch debuggers don't have this issue.

B. **Debugging several entry points at once**: As an example, the app also includes a `client.js` and `server.js`, which handle exactly what they sound they would. The server being used is Express and the client is just setInterval() with a console.log as the callback. These entry points can be launched via the **nodemon(Server)** and **nodemon(Client)** debuggers. You could even start one of them, debug + refactor for a while, and then launch the other to see how they integrate with your changes. Of course, on each save, nodemon restarts and the debuggers re-attach. Otherwise, what would be the point?

C. **Compound debugging**: The logical next step of B. is to launch both the server and client with "one" debugger,**Fullstack** in this case. VSC is gracious enough to support this. This literally just runs the two debuggers in sequence, which saves you a couple of clicks, but it all adds up. Plus, it's really cool to be able to do this!

## Method 2: Chrome devTools

**Sources**:

1. https://medium.com/the-node-js-collection/debugging-node-js-with-google-chrome-4965b5f910f4
1. https://www.youtube.com/watch?v=OqOOCv73czYs
1. https://www.youtube.com/watch?v=hfpkMyvSOp4

**As far as I can tell, and as far as I'm concerned, this method is deprecated.**

Chrome has a set of built-in NodeJS devTools that can be accessed at `about://inspect`. Simply start Express (or whatever Node-based web server you want) and then access the inspector. Source 1 is a recent writeup that showcases how this works step-by-step. It's worth reading through to have an idea of how this works. Source 2 is a two minute video that does this with Node's built-in HTTP server (which Express is built on top of).

I have not personally investigated this method very much, as I find working with `nodemon` and VSC a very smooth experience. I prefer to minimize context switching, so keeping things in VSC works great for me. Plus, the hot reloading that nodemon yields is just great, and I haven't found a way to hook that with Chrome's Node Inspector.

# Server Logging

**Sources**:

1. http://www.jyotman.xyz/post/logging-in-node.js-done-right
2. http://tostring.it/2014/06/23/advanced-logging-with-nodejs/
3. https://www.loggly.com/ultimate-guide/node-logging-basics/
4. https://blog.tompawlak.org/rotate-winston-logs-based-on-time
5. https://www.npmjs.com/package/winston-daily-rotate-file
6. https://stackoverflow.com/questions/27906551/node-js-logging-use-morgan-and-winston
7. https://www.codeday.top/2017/10/20/50689.html
8. https://github.com/expressjs/morgan/issues/56
9. https://gist.github.com/pbaio/ac934a06b91b99be6526

# Workflows

The workflows possible are more or less captured by the `package.json` scripts. The other workflows possible are the VSC-side debugging ones discussed in the previous section. In this section, I'll go through the `package.json` scripts from top to bottom. For each one, I will end on when it's best to use them.

1. **debugDemo**: starts `./src/demo_Debugging/app.js` with the `inspect-brk` flag set to the localhost:port you want. _This port has to match the port set for the Attach task in `launch.json`_. `nodemon` is started with `babel-node` and any changes you make will restart the app. This showcases the scenario where you want to quickly run through an app or file and leave yourself the possibility of debugging via the Attach debugger at some point during runtime.

2. **dev:start**: Uses `npm-run-all -s` to _sequentially_ run the **`security`** and **``dev:start-app** build scripts. `security` uses Node Security Platform (nsp) to check for known package vulnerabilities in the project and `dev:start-app` runs babel-node on the main app entry point. This is for when you just want to go through the app, but not attach any VSC debuggers.

3. **dev:debug-app** & **dev:debug-server**: Uses `nodemon` with the debugger flag and `babel-node` to start up these two app entry points. Either of these are useful for running the app from either endpoints with the possibility of attaching a debugger at some point during runtime.

4. **start**: Runs the nsp security check and then the `publish` build script. The publishing process begins with the `clean` script, which empties out the `dist./` and `docs/`. Then, the `build` step, which uses `babel` to output ES5 in `dist/` with sourcemaps. Finally, `documentation:html` generates documentation in the `docs/` folder by reading off the JSDoc + Flow annotations in the `src/*.js` files.

5. **Helper scripts**: Build scripts like `security` and `localtunnel` aren't really meant to be run by themselves, but as part of a build process. Obviously, if somethng goes wrong, then run them to check the integrity of the build processes.
