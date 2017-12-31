# Setting up NodeJS

Here, as before, I'll take the Checklist as the foundation and try to answer each item on it.

# OS Prerequisites

Complete _Windows System Setup_.

Complete the following Gist: https://gist.github.com/nickgogan/84b0dbb5328ffeafbd6358a235a01db6

# Project Structure and Shells

The project structure has the app being developed in _src/_ and the final product in _dist/_. All config files are found at the root of the project,at the same level as those two folders.

The shells used are those integrated into VSC as part of _Windows System Setup_.

# Package Management

**Sources**:

1. https://nodejs.org/en/
1. https://yarnpkg.com/en/
1. https://alligator.io/workflow/npx/

Packaged will be handled via **npm/npx**. **npm** is a package manager that comes bundled with **NodeJS**. If you haven't installed NodeJS, do so now (the LTS version is fine).

**npx** is a tool that allows you to use locally-installed packages as though they were global. Whenever you install a package using the `-g` flag, that package gets added to your PATH system variable. This means that you can call that package through your terminal without having to know the path to its executable. The other end of that is that any locally installed packages will not work in the same way. An example, with the shell at the project root:

```
> npm i -D http-server
> http-server --help
...
Error: Cannot find module ...
```

If you want to call those packages without traveling to the _node_modules/.bin/_, you have to specify the path. This problem is alleviated in npm with a built-in tool called **npx**:

```
> npm i -D http-server
> npx http-server --help
```

Fun fact: Yarn doesn't have this problem at all, which is nice: `> yarn http-server --help`

# Package Security

**Sources**:

1. https://nodesecurity.io/
1. https://www.youtube.com/watch?v=Wx3WlQLFa3w
1. https://www.youtube.com/watch?v=RDwOZ6vQGKo

Since any rando can publish to npm, security is a bit of a concern. This pain point gets alleviated by including **Node Security Platform (NSP)** as part of your workflow. We'll just install it for now and, later on, we'll see how to include it in automated npm tasks.

**Install**: `> npm i -D nsp`

**Run**: `> npx nsp check --reporter summary`

# Module Management

**Sources**:

1. https://auth0.com/blog/javascript-module-systems-showdown/
1. https://medium.com/the-node-js-collection/an-update-on-es6-modules-in-node-js-42c958b890c
1. http://dsheiko.com/weblog/state-of-javascript-modules-2017
1. https://darrenderidder.github.io/talks/ModulePatterns/#/

This part depends on how you answer the Transpilation item. If you're going to use **Babel**, then use **ES6 Modules**. If you're going to use regular NodeJS without transpilation, then you can use either **CommonJS** or **AMD** modules.

# Sharing Work

**Local tunnel** is used to open your project to the world via URL. It's totally insecure, but very easy to get up and running with it - just share the URL that it produces and that person can then access your running project.

This avoids having to configure stuff like Azure, AWS, etc... to just share work from your local machine. Obviously, don't use these for production deployments.

**Install**: `> yarn add localtunnel --dev`

**Test**: `yarn lt --version`

**Run**: `> yarn lt --port 3000`
