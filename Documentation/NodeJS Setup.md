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

## Automated Tasks with npm

Humble npm, which hooks onto whatever your OS uses as its shell, is all you need to do your task running. Don't add more tech debt/another abstraction layer, such as Gulp or Grunt, unless they can bring your project functionality that you can't get from npm (without an insane amount of work, that is). Each technology/layer of abstraction adds more to your plate in terms of things to keep track of and in terms of possible places your project can break. The same goes for npm dependencies, or anything else that's part of your project really. The more you add, the more potential points of failure you create. So, make sure the value proposition for your additions are air-tight.

Tools like **Grunt**, **Gulp**, **npm**, or your regular terminal are used to automate tasks. Just use **npm**/**yarn**. It's also a good idea to start doing this early on in the project's life, when there are fewer things to automate.

In `package.json`, you can place a `"scripts:"` field to, bascially, declare what you want npm to do when you hit `npm run {{anything}}`:

```
...
"scripts": {
  "start": "node src/index.js"
}
...
```

You can run the above by typing `> npm start` or `> npm run start`. Notice that you can omit the 'run' portion of the command in this case. This only works if you're trying to run `start` or `test`.

npm also has something called _hooks_, which run at specific points. It's best seen via example:

```
...
"scripts": {
  "prestart": "nsp check",
  "start": "node src/index.js"
  "poststart": "lt --port 3000",
}
...
```

Running `> npm start` will first invoke the `prestart` script, which will check that our project's node_modules don't have any known security vulnerabilities. Then, `start` proper is run, which goes through the `index.js` file. Finally, `poststart` exposes the project on port 3000, allowing anyone who knows the generated URL to work with `index.js`.

You can also run multiple commands, either sequentially or simultaneously. When would you want to do this? An example would be times when you want to both start up an app and share it. Normally, you'd have to open 2 terminal sessions, one for each command, since each one takes over the terminal once run. npm can help us get around that limitation with `npm-run-all --parallel`. We can even write commands that we define separately, but within the same `scripts` object:

```
...
"scripts": {
  "prestart": ....,
  "start": "npm-run-all --parallel security-check open:src",
  "poststart": ...,
  "open-src": "node src/server.js"
  "security-check": "nsp check",
  "localtunnel": "lt --port 3000",
  "share": "npm-run-all --parallel open:src localtunnel"
}
...
```
