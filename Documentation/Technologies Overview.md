# Checklist Overview

In this section, I'll be taking a look at some of the options available for each of The Checklist items. The various specialized projects are made based off of the options discussed in this doc.

Note that this doc is not meant to be any sort of deep dive or even introduction to the technologies. It only showcases some of the solutions I've seen for each of the checklist items.

# OS Prerequisites

All projects were set up according to _Windows System Setup_.

Some extra work is required for making **NodeJS** work on windows machines. A gist that discusses that is linked to the _NodeJS Setup_ section.

# Project Structure and Shells

The common, overarching project structure that all of these projects use go like this:

```
.git
.vscode
- dist/ -> Holds the public/distributable project
- docs/-> Holds auto-generated documentation for JS and Sass
- node_modules
- src/  -> Holds the stuff developers work on
README.md
...Various Config Files...
... .eslintrc ...
...Various Config Files...
```

Finer-grained descriptions, such as for _dist/_ are reserved for the project-specific sections. In some cases, it's best not to prescribe these at all, since they can change so rapidly with new tech and best practices. I hope to showcase examples that are minimally-viable to achieve max flexibility.

The main shells are going to be the same for all of the projects. It will be those shells that were integrated into VSC as part of the _Windows System Setup_ section. Personally, I use **Cmder**, **PowerShell**, and, ocassionally, **GitBash**.

# Package Management - Managers

**Sources**:

1. https://docs.npmjs.com/
1. https://yarnpkg.com/lang/en/docs/
1. https://scotch.io/@brian_kimo/npm-vs-yarn
1. https://www.keycdn.com/blog/npm-vs-yarn/
1. https://medium.com/learnwithrahul/understanding-npm-dependency-resolution-84a24180901b
1. https://medium.com/@ericsimons/introducing-turbo-5x-faster-than-yarn-npm-and-runs-natively-in-browser-cc2c39715403
1. https://www.kochan.io/nodejs/why-should-we-use-pnpm.html

Options here include **npm** and **yarn**. Though there are others, such as **pnpm** or **Turbo**.

A note on **dependency management**: The reason **pnpm** exists is because the _npm tries to flatten the dependency tree as much as possible_. This can lead to quite a bit of duplication within a given project and across projects (Source 5). Check out the last source to see how pnpm handles things differently from npm v3 and above.

# Package Management - Handling Deprecat(ing)ed Packages

**Sources**:

1. https://medium.freecodecamp.org/what-is-technical-debt-and-why-do-most-startups-have-it-9a54458daabf
1. https://greenkeeper.io/

As you may have noticed, we are working within a thriving language ecosystem that continuous generates more and more packages. We use that code as foundations to build our own solutions. This has positive and negative implications. The positives:

1. We're not reinventing the wheel, but using the best solutions out there for our language.
1. We get a usable product faster, which allows us to iterate and improve it faster.

Negatives:

1. Dependencies change over time, sometimes in ways that break the product.
1. Dependencies add more code to the codebase, increasing the complexity of adding more code (Source 1).

A possible solution is using **Greenkeeper**. "Greenkeeper sits between npm and GitHub, observing all of the modules you depend on. When they get updated, your project gets a new branch with that update. Your CI tests kick in, and we watch them to see whether they pass." (Source 2).

# Package Management - Package Security

**Sources**:

1. https://nodesecurity.io/
1. https://medium.com/node-security/announcing-the-node-security-platform-28c99f872688
1. https://snyk.io/
1. https://retirejs.github.io/retire.js/
1. https://developers.redhat.com/blog/2017/04/12/using-snyk-nsp-and-retire-js-to-identify-and-fix-vulnerable-dependencies-in-your-node-js-applications/
1. https://www.youtube.com/watch?v=Wx3WlQLFa3w
1. https://www.youtube.com/watch?v=RDwOZ6vQGKo

Since any rando can publish to npm, security is a bit of a concern. The first thing to understand is that keeping packages updated goes a decent way towards improving security as well. This is another big reason why **Greenkeeper** is recommended.

After that, more security-specialized contenders include **Node Security Platform (nsp)** and **Snyk**.

**retireJS** can also be included into your security/integrity workflow along with Greenkeeper and nsp/snyk.

# Module Management

**Sources**:

1. https://auth0.com/blog/javascript-module-systems-showdown/
1. http://dsheiko.com/weblog/state-of-javascript-modules-2017
1. https://webpack.js.org/guides/lazy-loading/
1. https://dzone.com/articles/lazy-loading-es2015-modules-in-the-browser
1. https://hacks.mozilla.org/2015/08/es6-in-depth-modules/

The Single Responsibility Principle (SSP) is a very good one to follow if you want to write maintanable code. To that end, we've seen the rise of writing modulat-style code, where large-grain tasks are assigned to modules, which are given 1 file. Within that 1 file, the problem is broken down further and implemented.

Unfortunately, there remains some confusion on the best way to do modular code in JS. Back a couple of years ago, there were 3 competing systems: **CommonJS**, **AMD**, **ES6**.

| Standard    | Sync vs Async | Server vs Browser |
| ----------- | ------------- | ----------------- |
| CommonJS    | Synchronous   | Server            |
| AMD         | Asynchronous  | Browser           |
| ES6 Modules | Asynchronous  | Browser           |

CommonJS was the first standard and it was designed to be synchronously loaded and to work server-side. This made it a natural fit for NodeJS, which took it up as its standard module system. This is why, to this day, _most package on npm are CommonJS modules!_

AMD came about to fill the niche for browser-side module loading, which meant it had to be asynchronous. Optimization techniques like _lazy loading_ (Source 3. I know it's for webpack, but the concept is the same. Lazy loading is also used for assets like images)(Source 4 for lazy loading ES6 modules in the browser with Webpack 3).

ES6 is getting more and more adoption into the browser, but I believe we still have to use transpilers like Babel to make full use of them. This includes the ES6 Modules portion of the ES6 standard. The nice thing about ES6 Modules is that it was designed to interoperate with existing CommonJS and AMD module systems.

Note: Modules are automatically run in **strict mode**.

# Version Control + Cloud Storage

**Sources**:
http://mherman.1. org/blog/2013/09/16/managing-multiple-github-accounts/#.WklYSPCnHD9

Options here include **Git/GitHub**, **SVN**, **Mercurial**. Just use Git/Github.

(See Source 1 above to learn how to manage 2 or more separate GitHub accounts on the same machine. The article is meant for Linux users, but you need to set up SSH for Windows as part of the NodeJS setup process anyway).

# Linting and Formatting

## JavaScript

**Sources**:

1. https://www.npmjs.com/package/eslint-config-airbnb
1. https://www.npmjs.com/package/install-peerdeps
1. https://www.39digits.com/configure-prettier-and-eslint-in-visual-studio-code/
1.

The answer to this one depends upon the language you decide to use. I will only be covering JS and TS here.

Linting and formatting in VSC can be effectively done using **ESLint** and **Prettier**. They both have extensions that integrate them into VSC and can be configured to mutually reinforce each other. Prettier will have the auto-formatting first. Then ESLint will automatically fix syntax problems it sees, such as missing semicolons.

**Install**: `> npm i --save-dev eslint prettier`

We need guidelines to judge against and AirBnb's has become the de-facto standard:
**Install**: `> npm i --save-dev eslint-config-airbnb`, `> install-peerdeps --dev eslint-config-airbnb`.

* See Source 2 for the install-peerdeps package.

Finally, we want to run code through Prettier first, to format it, and then pipe the results into ESLint for further processing using its automatic `--fix` flag:
**Install**: `> npm i prettier-eslint`.

All the software is now installed, so we're ready to configure. Create the `.eslintrc` file at the project root and grab the settings from my file (it's too long to include here): https://github.com/nickgogan/Setup/blob/master/app_foundations/.eslintrc

Set up `.eslintignore` in the same place and add:

```
# /node_modules/* and /bower_components/* ignored by default

# Ignore built files except build/index.js
dist/*

# Ignore vendor libraries not from npm
vendors/*
```

Ok, let's now integrate all of this into VS Code iteself. Go to _User Settings_, search for `prettier.eslintIntegrations`, and set it to `true`. While there, set the following as well:

```
  "eslint.autoFixOnSave": true,
  "prettier.singleQuote": true,
  "prettier.trailingComma": "all",
  "prettier.eslintIntegration": true,
  "javascript.format.enable": false,
```

Some useful _plugins_ for ESLint:

1. JSON: `> npm i --save-dev eslint-plugin-json`
2. HTML/XML: `> npm i --save-dev eslint-plugin-html`

## TypeScript

You know how this goes by now. We're going to install **TSLint** and the package that makes it play nice with Prettier (which you should have installed earlier):
`> npm i -D tslint tslint-config-prettier`

To configure, create a `tslint.json` file and add:

```
{
  "extends": [
    "tslint:latest",
    "tslint-config-prettier"
  ]
}
```

Let's now get the best of both TSLint and ESLint with this package:
`> npm i -D tslint-eslint-rules`. Expand the `tslint.json` file like this:

```
{
  "extends": [
    "tslint:latest",
    "tslint-config-prettier"
    "tslint-eslint-rules"
  ],
  "rules": {
    "no-constant-condition": true
  }
}
```

If you checked out the _VS Code Extensions_, you'd have seen that TSLint can also be integrated directly into VSC through the **TSLint extension**.

# Transpiling

**Sources**:

1. https://en.wikipedia.org/wiki/ECMAScript
1. https://github.com/tc39

There are various _supersets_ of JS that we can use to make development easier and more powerful. TypeScript, from Microsoft, is one of them. Another is basically JS, but in the future. Let's start from the ground; in case you don't know, JS is brought to you by the folks over at _Ecma International_. They're a <del>group of bureaucrats</del> standardization group that focus on specifications for stuff like JavaScript (technically called EcmaScript <del>...b/c bureaucrats</del>). They decide on the what goes into JavaScript/ES and doesn't belong. It's other peoples' jobs then to actually implement these changes in a way that allows the wider public to use it.

1. Prior to December 1999, there is darkness.
1. In Dec 1999, the ES3 spec was released and browser vendors got to work implementing parts of it, little by little.
1. In Dec 2009 (yes, a decade later), ES5 came out because people got drunk, angry, and couldn't agree on what ES4 would be.
1. Only a little more than half a decade later, in June 2015, ES6 was released, which was so different from all the previous releases that it broke the hearts and minds of the developers. It was basically a new language. It is backward-compatible, so you could continue coding in the old way. However, people quickly found that the coding patterns in ES6, for solving the same problems as before, were almost totally different. So, yeah, pretty much a new language. As you can image, there was very slow browser adoption of the language. But, 2 years later, all browsers are at like 90% support for it!
1. ES7 was released in June 2016, and was easy on the shattered minds of its developers - it only added 2 new things to learn. There's almost no browser support for this yet.
1. Present day (Dec 13th, 2017): ES8 has been proposed, again in June of this year, but it won't be for a while longer. Definitely no browser support for this.
1. ESNext

We'll just focus on ES6 for now, but you'll be able to guess how to get even the latest (experimental) features into your project, if you want to check them out.

A **transpiler** is used in a build (dev, qa, prod, w/e) to translate these JS supersets into a set that current-day browsers can understand. You don't have to memorize what browsers currently support or any of that. Just use a good transpiler and everything is taken care of. TypeScript uses _tsc_ to make \*.ts files into \*.js files that browsers can digest. Similarly, other solutions appeared to translate ES6 and many others into current-day JS. The biggest by far is called _Babel_.

## ES6+ with Babel

**Sources**:

1. Transpiling ESNext: https://babeljs.io/
2. Everything About Babel: https://kleopetrov.me/2016/03/18/everything-about-babel/

**Important**: Despite what the main website might say, as of this writing, Windows machines need to install Babel _globally_, not locally. No idea why and no idea if this affects Mac or Linux users. This is what I found for Windows machines. Install it using `> npm i -g babel-cli`. This will hopefully not be the case soon and we can just use Babel locally. The presets that Babel will transpile to, however, can be installed locally as of now, i.e. on a per-project basis. The recommended preset is simply called `env`, as in `> npm i babel-env`.

Next comes configuration. This can be handled directly in package.json, but it is recommeded to do so in a separate file called `.babelrc`. This is where we can make use of the presets and, if you have them, the plugins installed (yes, Babel is highly cofigurable and extensible):

```
{
  "presets": ["env"],
  "sourceMaps": true,
  "ignore": ["*.ts", "./dist/*", "./docs", "./Documentation"]
}
```

Next, we need to integrate Babel with ESLint. That way, ESLint won't hate on the new syntax we're using. In `.eslintrc`:

```
...
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "arrowFunctions": true,
      "generators": true,
      "blockBindings": true
    },
    "allowImportExportEverywhere": false,
    "codeFrame": false
  },
...
```

# IntelliSense in VSC

**Sources**:

1. https://code.visualstudio.com/docs/editor/intellisense

## @types

**Sources**:

1. https://www.npmjs.com/~types

VSC gets much of its IntelliSense from _typings files_. These are TS files that set up expected structures/patterns for different code situations. The IDE comes packaged with a bunch of these, but we can extend the system with typings from the wider community. Typings files also provide you with some dev-time error checking that would otherwise not be caught until it gives you a confusing error at runtime.

**WARNING**: Prior to TypeSript 2.0, the most commonly-used tool to manage and install type definition files was `typings`. Post-TS-2.0, `npm @types` is used. **_Always_** check the publication date of any article, tutorial, course, or tool you are using. There may be deprecated information contained that will have you going down rabbit holes that are no longer relevant or useful.

Why do this when we have tools like ESLint or TSLint? Because those tools are more specific and sometimes do not have what we need. There is nothing wrong with taking a little bit from all of them when putting together a project's tools. Just make sure that conflicts are properly handled.

Some examples to get you started:

```
> yarn add @types/node @types/express @types/angular @types/reac --dev
```

## JS - Static Type Checking with Flow

**Sources**:

1. https://flow.org
1. https://www.lullabot.com/articles/flow-for-static-type-checking-javascript
1. https://hackernoon.com/configure-eslint-prettier-and-flow-in-vs-code-for-react-development-c9d95db07213

TypeScript provides type checking for JS by providing a classic OOP language. The tsc transpiler will lovingly yell at you in much the same way that the old C++/C#/Java/etc... compilers would. This makes you handle mistakes at compile-time, as opposed to run-time (or worse, in production). So, if you're working in TS, then you're set. I'm sure there are augmentations to your toolchain that you can find too.

For folks that are still working in JS, like people developing in Node or React, there are two solutions I can introduce. The first comes built-in with VS Code and it involes just dropping a quick pragma (i.e. a 1-liner at the top of your working file) called `//@ts-check`. So, your file would look like this:

```
//@ts-check
let myNum = 42;
myNum = '42'; //This would lead to a TypeError, thrown by VS Code's [js] checker.
```

This is a very low-friction way to add at least some type safety to your projects and will prevent headaches down the line. Combine this with ESLint, Prettier, and VS Code's powerful debugging capabilities and you get a pretty smooth dev experience.

Another solution, which I prefer for reasons discussed in the next section on documentation, come from Facebook and is called Flow. It allows you to add types directly inline with your code and the cli will yell at you if those rules are violated. The syntax is pretty much the same as the type annotations you see in TS:

```
//@flow
class Greeter {
  private counter: number = 0;
  constructor(public name: string) {};

  hello(): string {
    return `Hello ${this.name} ${this.incrementedCounter()}. time!`;
  }

  private incrementedCounter(): number {
    return ++this.counter;
  }
}
```

Now, install Flow itself: `> yarn add --dev flow-bin`. Now, time to configure Flow:
`> yarn run flow init` to generate the `.flowconfig` file. At its most basic level, .flowconfig tells the Flow background process the root of where to begin checking Flow code for errors.

To get started in actually using Flow, we need to integrate it with Babel to strip out those annotations before running the code through Node or a browser, or w/e. This is done with a Babel preset:
`> yarn add --dev babel-preset-flow`
Next, add this to your `.babelrc` config file:
`"presets": ["env" ,"flow"]` Obviously, if you have other presets, just add "flow" as another array item.

We also want to integrate flow with ESLint, so that can tell us if we're forgetting to add our annotations:
`> yarn add --dev eslint-plugin-flowtype`. Then, in the `.eslintrc` file, add this info:

```
"extends": ["prettier/flowtype],
"plugins": ["flowtype"]
```

In the `.flowconfig` file, add this:

```
[ignore]
.*/node_modules/*
.*/dist/*
```

The final part is integrating Flow with VS Code. This is done using the **Flow Language Support** extension, which will create a new Output console that continuously runs in the background as you code, the same as with ESLint and Prettier.

Note: Flow uses its own version of typings to showcase corrections. These are NOT the same as those used by TS/typings, which we discussed earlier. If you want to use both, you'd have to maintain both separately, which is silly. Some reasearch into this shows that there isn't a solution that combines both yet. So, in the meantime, I have learned that there is a larger number of typings for TS and that they are more reliable. So, for stuff that Flow doesn't cover out of the box, just grab a `@types` library from npm and let VS Code's TS do that work. Just use Flow to do the barebones type checking during dev time to catch errors.

If this were all that Flow provided, I wouldn't recommend it. But, it edges out over `@ts-check` because it can make it drastically easier to automatically document your JS code.

## tsconfig.json

**Sources**:

1. https://blog.angularindepth.com/configuring-typescript-compiler-a84ed8f87e3
1. https://code.visualstudio.com/docs/languages/jsconfig

Since VSC is written in TypeScript, it would make sense that you can configure it a bit by placing a `tsconfig.json` file at the root of your project. This file also tells `tsc` (Microsoft's TypeScript compiler) the root of a TS project. If you're doing a TS project, no worries - having this file won't interfere with anything. Check out the tsconfig.json file in any of the projects. They are the same file.

If the `paths:` option is set, `tsc` goes through those indicated folders and only checks `node_modules` if nothing is found. The **first** resolved module is used and no other paths are checked. So if you have a module placed inside both `node_modules` and `YourCustomFolder`, the module in your custom folder will be picked up by the compiler. If you need the compiler to use the module inside node_modules folder, add it to paths before your custom folder:

```
    "paths": {
      "*": [
        "*",
        "node_modules/*",
        "generated/*"
      ]
    }
```

_Note_: tsc will also compile files that are referenced inside any file from that array.

In the case of conflicts, the priority is set in the following order:

1. Files
2. Exclude
3. Include

# Development Web Servers

**Sources**:

1. https://github.com/indexzero/http-server
1. https://expressjs.com/
1. https://webpack.js.org/configuration/dev-server/
1. https://github.com/johnpapa/lite-server
1. https://scotch.io/bar-talk/a-fast-and-convenient-development-server-with-lite-server
1. https://scotch.io/tutorials/how-to-use-browsersync-for-faster-development
1. https://scotch.io/@tgreco/how-to-use-browsersync-for-faster-development

We have several options:

1. **http-server**:

* Very simple, serves the current directory
* Live reload

2. **Express**

* Comprehensive and highly configurable
* Production-grade
* Can run anywhere

3. **Webpack Dev Server**

* Built directly into the Webpack bundler
* Serves from memory, as opposed to writing to disk. This makes it fast to see your changes.
* Supports _hot-reloading_, which means you can instantly see your changes on-screen, no matter how large.

4. **lite-server** (i.e. **Browsersync**)

# Documentation

Documentation is generated separately for JS and Sass files, using documentation.js and sassdoc, respectively. The output I use is html, but these tools have other formats.

## Documentation: JS

**Sources**:

1. https://github.com/documentationjs/documentation 1.https://github.com/documentationjs/documentation/blob/master/docs/GETTING_STARTED.md
1. http://usejsdoc.org/about-getting-started.html

**JSDoc**-style comments (annotations) are used at a minimum with documentation.js to add a documentation step to our dev workflow. These annotations can be automatically generated (mostly) with the following VSC extension: **Document This**. With the cursor on a defining piece of code, e.g. function declaration or a class, the following shortcut will generate the comment structure: _Ctrl+Alt+D_

**Install**: `> npm i -D documentation`

**Run**: `> npx documentation build src/functionality/** -f html -o docs/js`

```
class Book {
  constructor({title, author, publicationYear}) {
    Object.assign(this, {title, author, publicationYear});
  }
}

function whois({displayName, fullName: {firstName: name}}) {
  console.log(displayName + ' is ' + name);
}
```

Would become, with manual addition from me of the <\*> parts to indicate what you need to input:

```
/**
 * <Cursor goes here for description>
 *
 * @class Book
 */
class Book {
  constructor({title, author, publicationYear}) {
    Object.assign(this, {title, author, publicationYear});
  }

  toString() {
    console.log(`${title}, by ${author}. Published in ${publicationYear}`);
  }
}
/**
 * <Cursor goes here for description>
 *
 * @param {any} {displayName, fullName: {firstName: name}}  <description>
 */
function whois({displayName, fullName: {firstName: name}}) {
  console.log(displayName + ' is ' + name);
}
```

Notice the `{any}` in @param {any} - This is supposed to be the function parameter's type. Since this is vanilla ES2015, it won't have any. This can be remedied by installing Flow, #flow.

**JSDoc** annotations can also be integrated with **ESLint**, which will let you know if your comments are off. Add this to `.eslintrc`:

```
"rules": {
  ...
  "valid-jsdoc": "warn",
  ...
}
```

## Documentation: Sass

**Sources**:

1. http://sassdoc.com/annotations/
1. http://sassdoc.com/file-level-annotations/

The idea is much the same as with documentation for JS files. Just read the short sources above and you'll get the idea.

**Install**: `> yarn add sassdoc --dev`

**Run**: `> yarn sassdoc src/styles -d docs/styles`

# Sharing Work

**Sources**:

1. https://localtunnel.github.io/www/

**Local tunnel** is used to open your project to the world via URL. It's totally insecure, but very easy to get up and running with it - just share the URL that it produces and that person can then access your running project.

This avoids having to configure stuff like Azure, AWS, etc... to just share work from your local machine. Obviously, don't use these for production deployments.

**Install**: `> yarn add localtunnel --dev`

**Test**: `yarn lt --version`

**Run**: `> yarn lt --port 3000`

# Build/Task Management

**Sources**:

1. https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b
1. https://alligator.io/workflow/npx/

# Bundling

**Sources**:

1. webpack
1. https://www.robinwieruch.de/react-eslint-webpack-babel/
1. https://monkeyvault.net/react-starting-from-scratch/
1. https://stanko.github.io/webpack-babel-react-revisited/
1. https://www.robinwieruch.de/react-eslint-webpack-babel/
