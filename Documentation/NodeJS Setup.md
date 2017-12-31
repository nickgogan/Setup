# Setting up NodeJS

Here, as before, I'll take the Checklist as the foundation and try to answer each item on it.

# OS Prerequisites

Complete _Windows System Setup_.

Complete the following Gist: https://gist.github.com/nickgogan/84b0dbb5328ffeafbd6358a235a01db6

# Package Management

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

# Package Security - nsp

**Install**: `> npm i -D nsp`
**Run**: `> npx nsp check --reporter summary`

# Module Management

**Sources**:

1. https://auth0.com/blog/javascript-module-systems-showdown/
1. https://medium.com/the-node-js-collection/an-update-on-es6-modules-in-node-js-42c958b890c
1. http://dsheiko.com/weblog/state-of-javascript-modules-2017
1. https://darrenderidder.github.io/talks/ModulePatterns/#/

This part depends on how you answer the Transpilation item. If you're going to use **Babel**, then use **ES6 Modules**. If you're going to use regular NodeJS without transpilation, then you can use either **CommonJS** or **AMD** modules.
