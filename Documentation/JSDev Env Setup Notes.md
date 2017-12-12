# JS Environment Setup in VS Code

Sources:

1. PluralSight/Visual Studio Code:
   https://app.pluralsight.com/library/courses/visual-studio-code/table-of-contents

2. YT/The JavaScript Starter Kit Manifesto:
   https://www.youtube.com/watch?v=jubd2opc4Ps

3. PluralSight/Building a JavaScript Development Environment:
   https://app.pluralsight.com/library/courses/javascript-development-environment/table-of-contents

## Language Features

VS Code gets much of its IntelliSense from _typings files_. These are TS files that set up expected structures/patterns for different code situations. VS Code comes packaged with a bunch of these, but we can extend the system with typings from the wider community.

1. First, download the Typings tool from npm: `npm i -g typings`. Test using `> typings -v`.
2. Get a wanted definition set, like angular: `typings install dt~angular --save`. This will create a `typings.json` config file and a `typings/` directory to house these definitions.

Search for typings using: `> typings search ...`

Why do this when we have tools like ESLint or TSLint? Because those tools are more specific and sometimes do not have what we need. There is nothing wrong with taking a little bit from all of them when putting together a project's tools. Just make sure that conflicts are resolved.

---

## JavaScript

### Package Security

Since any rando can publish to npm, security becomes a bit of a concern. This gets alleviated by including **Node Security Platform (NSP)** as part of your workflow. We'll just install it for now and, later on, we'll see how to include it in automated npm tasks: `> npm i -g nsp`.

### Development Web Servers

We have several options:

1. http-server:

* Very simple, serves the current directory
* Live reload

2. Express

* Comprehensive and highly configurable
* Production-grade
* Can run anywhere

3. Webpack Dev Server

* Built directly into the Webpack bundler
* Serves from memory, as opposed to writing to disk. This makes it fast to see your changes.
* Supports _hot-reloading_, which means you can instantly see your changes on-screen, no matter how large.

4. Browsersync

* Sets up a dedicated IP for sharing work on LAN.
* All browsers on all devices stay in sync.
* Integrates into Webpack, Gulp, Grunt, Browserify, etc..

We'll do an example using **Express**:

In `server.js`,

```
let express = require('express');
let path = require('path');
let open = require('open');

let port = 3000;
let app = express();

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'))
});

app.listen(port, function(err) {
  err ? console.log(err) : open('http://localhost:' + port);
});
```

Note that the code above requires an `index.html` file.

### Sharing Work

This avoid having to configure stuff like Azure, AWS, etc... to just share work from your local machine. Obviously, don't use these for production deployments.

**localtunnel**: `> npm i localtunnel`

* Allows sharing via a _public_ URL
* To use, add `> lt --port 3000` to your npm start script.

### Automation

Tools like **Grunt**, **Gulp**, **npm**, or your regular terminal are used to automated tasks. Just use **npm**/**yarn** (which uses the same packages.json file)

In `package.json`, you can place a `"scripts:"` field to, bascially, declare what you want npm to do when you hit `npm run __w/e__`:

```
...
"scripts": {
  "start": "node src/server.js"
}
...
```

You can run the above by typing `> npm start` or `> npm run start`. Notice that you can omit the 'run' portion of the command in this case. This only works if you're trying to run `start` or `test`.

npm also has something called _hooks_, which run at specific points. It's best seen via example:

```
...
"scripts": {
  "prestart": ....,
  "start": "node src/server.js"
  "poststart": ...,
  "security-check": "nsp check",
  "share": "lt --port 3000"
}
...
```

You can also run multiple commands simultaneously. When would you want to do this? An example would be times when you want to both start up an app and share it. Normally, you'd have to open 2 terminal sessions, one for each command, since each one takes over the terminal once run. npm can help us get around that limitation with `npm-run-all --parallel`. We can even write commands that we define separately, but within the same `scripts` object:

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

---

## Beyond JS

There are various _supersets_ of JS that we can use to make development easier and more powerful. TypeScript, from Microsoft, is one of them. Another very popular one is EcmaScript's ES6. This one is basically a future version of JS that browsers are slowly adjusting to. The last major release was ES6, which came out in 2015. From then on, the specification people promised to release a new update yearly, no matter how small. This is because it was almost 10 years since ES5 came out and because ES6 was basically a new language entirely, which cause a lot of developer pain. By comparison, ES7, i.e. ES2016, had only 2 small updates to it.

A **transpiler** is used in a build (dev and prod) to translate these JS supersets into a set that current-day browsers can understand. TypeScript uses _tsc_ to make \*.ts files into \*.js files that browsers can digest. Similarly, other solutions appeared to translate ES6 and many others into current-day JS. The biggest by far is called _Babel_.

### ES6 with Babel
