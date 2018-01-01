# Checklist Overview

In this article, I'll be taking a look at some of the options available for each of The Checklist items. The various specialized projects are created based off of the options discussed in this doc.

Note that this doc is not meant to be any sort of deep dive or even introduction to the technologies. It only showcases some of the solutions I've seen for each of The Checklist items.

# OS Prerequisites

All projects were set up according to _Windows System Setup_. If you're using a Mac, then you'd be installing **Homebrew** as your OS package manager instead of Chocolatey. The section on VSC would still pertain while the section on PowerShell wouldn't.

Some extra work is also required for making **NodeJS** work on Windows machines. A gist with the extra setup steps linked to in the _NodeJS Setup_ article.

# Project Structure and Shells

**Sources**:

1. https://medium.com/@dan.shapiro1210/understanding-component-based-architecture-3ff48ec0c238
1. https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
1. https://medium.com/@learnreact/container-components-c0e67432e005
1. https://www.fullstackreact.com/p/using-presentational-and-container-components-with-redux/
1. https://medium.com/monitisemea/isomorphic-universal-javascript-496dc8c4341a
1. https://scotch.io/tutorials/react-on-the-server-for-beginners-build-a-universal-react-and-node-app

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

Finer-grained descriptions, such as for _dist/_, are reserved for the project-specific articles. In some cases, it's best not to prescribe these at all, since they can change so rapidly with new tech and best practices. For example, the rise of _component-based architectures_ (Source 1) and its subcategories (e.g. _presentational + container components_ (Sources 2, 3, 4)) has changed the way we structure our projects. I suspect that other approaches will emerge to compete (like _Universal applications_ (Sources 5, 6), which will lead to more uncertainty, so I don't want to prescribe anything prematurely. In that vein, I think the structure above is minimal enough to maximize flexibility.

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

Options here include **npm** (Source 1) and **yarn** (Source 2). Check out Sources 3 and 4 for comparisons between npm and yarn. There are also other competitors, such as **pnpm** (Source 7) and **Turbo** (Source 6).

A note on _dependency management_: The reason **pnpm** exists is because the _npm tries to flatten the dependency tree as much as possible_. This can lead to quite a bit of duplication within a given project and across projects (Source 5). Check out Source 6 to see how pnpm handles things differently from npm v3 and above.

# Package Management - Handling Deprecat(ing)ed Packages

**Sources**:

1. https://medium.freecodecamp.org/what-is-technical-debt-and-why-do-most-startups-have-it-9a54458daabf
1. https://developers.redhat.com/blog/2017/04/12/using-snyk-nsp-and-retire-js-to-identify-and-fix-vulnerable-dependencies-in-your-node-js-applications/
1. https://greenkeeper.io/
1. https://tidelift.com/blog/2017/12/13/dont-judge-a-project-by-its-github-stars-alone
1. https://tidelift.com/blog/2017/12/07/what-makes-a-top-open-source-package

As you may have noticed, we are working within a thriving language ecosystem that continuously generates more and more packages. We use that code as foundations to build our own solutions. This has positive and negative implications. The positives:

1. We're not reinventing the wheel, but using the best solutions out there for our language (assuming you know how to research (Sources 4, 5)).
1. We get a usable product faster, which allows us to iterate and improve it faster.

Negatives:

1. Dependencies add more code to the codebase, increasing the complexity of adding more code (Source 1).
1. Dependencies change over time, sometimes in ways that break the product (Source 2).

A possible solution is using **Greenkeeper**. "Greenkeeper sits between npm and GitHub, observing all of the modules you depend on. When they get updated, your project gets a new branch with that update. Your CI tests kick in, and we watch them to see whether they pass." (Sources 2, 3).

# Package Management - Package Security

**Sources**:

1. https://nodesecurity.io/
1. https://medium.com/node-security/announcing-the-node-security-platform-28c99f872688
1. https://snyk.io/
1. https://retirejs.github.io/retire.js/
1. https://developers.redhat.com/blog/2017/04/12/using-snyk-nsp-and-retire-js-to-identify-and-fix-vulnerable-dependencies-in-your-node-js-applications/
1. https://www.youtube.com/watch?v=Wx3WlQLFa3w
1. https://www.youtube.com/watch?v=RDwOZ6vQGKo

Since any rando can publish to npm, security is a bit of a concern. Check out the talks linked in Sources 6 and 7 to get an idea of how your apps might be hacked.

The first thing to understand is that keeping packages updated goes a decent way towards improving security as well. This is another big reason why **Greenkeeper** is recommended (Source 5).

After that, more security-specialized contenders include **Node Security Platform (nsp)** (Sources 1, 2) and **Snyk** (Source 3).

**retireJS** (Source 4) can also be included into your security/integrity workflow along with Greenkeeper and nsp/snyk (Source 5).

Last, I have also found a set of linting rules that can help prevent some code patterns that have been labelled as risky. This is discussed a bit more in the Linting section.

# Module Management

**Sources**:

1. https://auth0.com/blog/javascript-module-systems-showdown/
1. http://dsheiko.com/weblog/state-of-javascript-modules-2017
1. https://darrenderidder.github.io/talks/ModulePatterns/#/
1. http://requirejs.org/docs/whyamd.html#purposes
1. https://hacks.mozilla.org/2015/08/es6-in-depth-modules/
1. https://medium.com/the-node-js-collection/an-update-on-es6-modules-in-node-js-42c958b890c
1. https://webpack.js.org/guides/lazy-loading/
1. https://dzone.com/articles/lazy-loading-es2015-modules-in-the-browser

The Single Responsibility Principle (SSP) is a very good one to follow if you want to write maintanable code. To that end, we've seen the rise of modulat-style code, where large-grain tasks are assigned to modules, which are contained in 1 file. Within that 1 file, the problem is broken down further and implemented.

Unfortunately, there remains some confusion on the best way to do modular code in JS. Back a couple of years ago, there were 3 competing systems: **CommonJS**, **AMD**, **ES6** (Sources 1, 2).

| Standard    | Sync vs Async | Server vs Browser |
| ----------- | ------------- | ----------------- |
| CommonJS    | Synchronous   | Server            |
| AMD         | Asynchronous  | Browser           |
| ES6 Modules | Asynchronous  | Browser           |

CommonJS was the first standard and it was designed to be synchronously loaded and to work server-side. This made it a natural fit for NodeJS, which took it up as its standard module system. This is why, to this day, _most package on npm are CommonJS modules!_. Check out Source 3 for exampls on how to write CommonJS modules. It's quite good.

AMD came about to fill the niche for browser-side module loading, which meant it had to be asynchronous (Source4). Optimization techniques like _lazy loading_ were created to only load up essential modules per UI view (Source 7 - I know it's for Webpack, but the concept is the same. Lazy loading is also used for assets like images). Check out Source 8 for lazy loading ES6 modules in the browser with Webpack.

ES6 is getting more and more adoption into the browser, but I believe we still have to use transpilers like Babel to make full use of them. This includes the ES6 Modules portion of the ES6 standard. The nice thing about ES6 Modules is that it was designed to interoperate with existing CommonJS and AMD module systems (Sources 5, 6).

So, if you're going to use Babel, then stick to the ES6 Modules way of doing things. If you're not, then the choice would depend upon where your JS would run. If it will run in-browser, then use AMD Modules. If not, then use CommonJS.

**Note**: Modules are automatically run in **strict mode**.

# Version Control + Cloud Storage

**Sources**:

1. http://mherman.org/blog/2013/09/16/managing-multiple-github-accounts/#.WkpXyfCnHD8

Options here include **Git/GitHub**, **SVN**, **Mercurial**. Just use Git/Github.

(See Source 1 above to learn how to manage 2 or more separate GitHub accounts on the same machine. The article is meant for Linux users, but you need to set up **SSH for Windows** as part of the NodeJS setup process anyway).

# Linting and Formatting

The answer to this one depends upon the language you decide to use. I will only be covering JS and TS here.

## JavaScript

**Sources**:

1. https://www.npmjs.com/package/eslint-config-airbnb
1. https://www.npmjs.com/package/install-peerdeps
1. https://www.39digits.com/configure-prettier-and-eslint-in-visual-studio-code/

Linting and formatting in VSC can be effectively done using **ESLint** and **Prettier**. They both have extensions that integrate them into VSC and can be configured to mutually reinforce each other; Prettier will first auto-format the code, and then ESLint will automatically fix any syntax problems it sees, such as missing semicolons.

**Install**: `> npm i --save-dev eslint prettier`

We need guidelines to judge against and AirBnb's has become the de-facto standard (Source 1):
**Install**: `> npm i --save-dev eslint-config-airbnb`, `> install-peerdeps --dev eslint-config-airbnb`.

* See Source 2 for the **install-peerdeps package**.

Finally, we want to run code through Prettier first, to format it, and then pipe the results into ESLint for further processing using its automatic `--fix` flag:
**Install**: `> npm i prettier-eslint`.

All the software is now installed, so we're ready to configure (Source 3). Create the `.eslintrc` config file at the project root and grab the settings from my file (it's too long to include here). Choose from whichever project you want to set up.

Then, set up `.eslintignore` at root and add:

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

We're going to install **TSLint** and the package that makes it play nice with **Prettier**:
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

## Security

**Sources**:

1. https://github.com/nodesecurity/eslint-plugin-security

**eslint-plugin-security** provides ESLint "rules that identify potential security hotspots". However, it also "finds a lot of false positives which need triage by a human." (Source 1) In `.eslintrc`:

```
"plugins": [
  "security"
],
"extends": [
  "plugin:security/recommended"
]
```

# Transpiling

**Sources**:

1. https://en.wikipedia.org/wiki/ECMAScript
1. https://github.com/tc39

There are various _supersets_ of JS that we can use to make development easier and more powerful. TypeScript, from Microsoft, is one of them. Another is basically JS, but in the future. Let's start from the ground. JS is brought to you by the folks over at _Ecma International_. They're a <del>group of bureaucrats</del> standardization group that focus on specifications for stuff like JavaScript (technically called EcmaScript <del>...b/c bureaucrats</del>). They decide on what goes into JavaScript/ES and what doesn't. It's other peoples' jobs then to actually implement these changes in a way that allows the wider public (us developers) to use it.

Here's a <del>bad</del> history lesson on JS:

1. Prior to December 1999, there is darkness.
1. In Dec 1999, the ES3 spec was released and browser vendors got to work implementing parts of it, little by little.
1. In Dec 2009 (yes, a decade later), ES5 came out because people got drunk, angry, and couldn't agree on what ES4 would be.
1. Only a little more than half a decade later, in June 2015, ES6 was released, which was so different from all the previous releases that it broke the hearts and minds of the developers. It was basically a new language. It is backward-compatible, so you could continue coding in the old way. And many did, since people quickly found that the coding patterns in ES6, for solving the same problems as before, were almost totally different. So, yeah, pretty much a new language. As you can imagine, there was very slow browser adoption of the language. But, 2 years later, all browsers are at like 90% support for it!
1. ES7 was released in June 2016, and was easy on the shattered minds of its developers - it only added 2 new things to learn. There's almost no browser support for this yet.
1. Present day (Dec 13th, 2017): ES8 has been proposed, again in June of this year, but it won't be implemented for a while longer. Definitely no browser support for this.
1. ESNext: A monicker for the new ES versions. This changes to encompass different features as more proposals are created.

We'll just focus on ES6 for now, but you'll be able to guess how to get even the latest (experimental) features into your project, if you want to check them out.

A **transpiler** is used in a build (dev, qa, prod, w/e) to translate these JS supersets into a set that current-day browsers can understand. You don't have to memorize what browsers currently support or any of that. Just use a good transpiler and everything is taken care of. TypeScript uses _tsc_ to make \*.ts files into \*.js files that browsers can digest. Similarly, other solutions appeared to translate ES6 and many others into current-day JS. The biggest by far is called _Babel_. These transpilers can be set to output \*.js files in any ES version, but stick to ES5 as it has pretty much universal browser adoption by now.

## ES6+ with Babel

**Sources**:

1. https://babeljs.io/
2. https://kleopetrov.me/2016/03/18/everything-about-babel/

**Install**: `> npm i -D babel-cli babel-preset-env`

Babel needs to know what ES version you'll be writing in, which is why you need to download what they call a preset. The env preset represents the latest version of the ES standard that they've been able to implement into Babel.

Once you have all that, next comes configuration. This can be handled directly in package.json, but it is recommeded to do so in a separate file called `.babelrc`. This is where we can make use of the presets and, if you have them, any plugins installed (yes, Babel is highly cofigurable and extensible):

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

VSC gets much of its IntelliSense from _typings files_. These are TS files that set up expected structures/patterns for different situations. The IDE comes packaged with a bunch of these, but we can extend the system with typings from the wider community. Typings files also provide you with some dev-time error checking that would otherwise not be caught until it gives you a confusing error at runtime.

**WARNING**: Prior to TypeSript 2.0, the most commonly-used tool to manage and install type definition files was `typings`. Post-TS-2.0, `npm @types` is used (Source 1). **_Always_** check the publication date of any article, tutorial, course, or tool you are using. There may be deprecated information contained that will have you going down rabbit holes that are no longer relevant or useful.

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

Another solution, which I prefer for reasons discussed in the next section on documentation, comes from Facebook and is called Flow (Sources 1, 2). It allows you to add types directly inline with your code and the cli will yell at you if those rules are violated. The syntax is pretty much the same as the type annotations you see in TS:

```
//@flow

class Greeter {
  private counter: number = 0;
  constructor(name: string) {};

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

We also want to integrate flow with ESLint, so that can tell us if we're forgetting to add our annotations (Source 3):
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

Since VSC is written in TypeScript, it would make sense that you can configure it a bit by placing a `tsconfig.json` file at the root of your project. This file also tells `tsc` (Microsoft's TypeScript compiler) the root of a TS project. If you're not doing a TS project, no worries - having this file won't interfere with anything. Check out the tsconfig.json file in any of the projects to get an idea of the settings. They are the same file across the different project types..

(Source 1) If the `paths:` option is set, `tsc` goes through those indicated folders and only checks `node_modules` if nothing is found. The **first** resolved module is used and no other paths are checked. So if you have a module placed inside both `node_modules` and `YourCustomFolder`, the module in your custom folder will be picked up by the compiler. If you need the compiler to use the module inside node_modules folder, add it to paths before your custom folder:

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

A note on **jsconfig.json**: This is a descendant of `tsconfig.json`. It's basically the same file but with `"allowJS": true` (Source 2). As such, it's redundant to have both files in the same project. If it's a JS project, just add that allowJS property along with the usual JS-specific config. The file will still designate its location as the root of the TS/JS project.

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

1. **http-server** (Source 1):

* Very simple, serves the current directory
* Live reload

2. **Express** (Source 2):

* Comprehensive and highly configurable
* Production-grade
* Can run anywhere

3. **Webpack Dev Server** (Source 3):

* Built directly into the Webpack bundler
* Serves from memory, as opposed to writing to disk. This makes it fast to see your changes.
* Supports _hot-reloading_, which means you can instantly see your changes on-screen, no matter how large. This is especially useful if you're working in React, as it lets you update components without losing your state. As in, you're testing your app and run across an issue with one of the components. You implement a possible fix. Normally, you have to go through all the same steps all over again to test your fix in-browser. With hot module reloading, you don't have to do any of that - the updated components shows up and everything around it is the same.

4. **lite-server** (i.e. **Browsersync**. Sources 4, 5, 6, 7).

* Good combo of bootstraping ease and power.
* Allows for simultaneous testing across multiple browsers on multiple devices, including user inputs.
* Can be integrated with Webpack, which will be used in the more advanced articles later on.

# Documentation

Documentation is generated separately for JS and Sass files, using **documentation.js** and **sassdoc**, respectively. The output I use is html, which creates web sites. The web sites can also be customized using themes and such. Of course, these systems also support output in other formats, like PDF.

## Documentation: JS

**Sources**:

1. http://usejsdoc.org/about-getting-started.html
1. https://github.com/documentationjs/documentation 1.https://github.com/documentationjs/documentation/blob/master/docs/GETTING_STARTED.md

**JSDoc**-style comments (annotations, Source 1) are used at a minimum with documentation.js (Sources 2, 3) to add a documentation step to our dev workflow. These annotations can be automatically generated (mostly) with the following VSC extension: **Document This**. With the cursor on a defining piece of code, e.g. function declaration or a class, the following shortcut will generate the comment structure: _Ctrl+Alt+D_

**Install**: `> npm i -D documentation`

**Run**: `> npx documentation build src/functionality/** -f html -o docs/js`

```
//IMPORTANT: An empty line above the block of code you want to document is required by the Document This extension.
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
 * <Cursor goes here for description. Input general description, i.e. how this class fits with your overall app>
 *
 * @class Book <Class description goes here>
 */
class Book {
  constructor({title, author, publicationYear}) {
    Object.assign(this, {title, author, publicationYear});
  }
  /**
   * <Cursor goes here for description>
   *
   * @returns {string} <description>
   * @memberof Book
   */
  displayBook() {
      return `${this.title}, by ${this.author}, was published on ${this.publicationYear}.`;
    }
}
/**
 * <Cursor goes here for description>
 *
 * @param {any} {displayName, fullName: {firstName: name}} <description>
 */
function whois({displayName, fullName: {firstName: name}}) {
  console.log(displayName + ' is ' + name);
}

var user = {
  id: 42,
  displayName: 'jdoe',
  fullName: {
      firstName: 'John',
      lastName: 'Doe'
  }
};
```

Notice the `{any}` in @param {any} - This is supposed to be the function parameter's type. Since this is vanilla ES2015, it won't have any. This can be remedied by installing **Flow**.

JSDoc annotations can also be integrated with **ESLint**, which will let you know if your comments are off. Add this to `.eslintrc`:

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

The idea is much the same as with documenting JS files. Just read the short sources above and you'll get the idea.

**Install**: `> yarn add sassdoc --dev`

**Run**: `> yarn sassdoc src/styles -d docs/styles`

# Sharing Work

**Sources**:

1. https://localtunnel.github.io/www/

**Local tunnel** is used to open your project to the world via URL. It's totally insecure, but very easy to get up and running with it - just share the URL that it produces and that person can then access your running project (Source 1).

This avoids having to configure stuff like Azure, AWS, etc... to just share work from your local machine. Obviously, don't use these for production deployments.

**Install**: `> yarn add localtunnel --dev`

**Test**: `yarn lt --version`

**Run**: `> yarn lt --port 3000`

# Bundling

**Sources**:

1. https://webpack.js.org/guides/getting-started/
1. https://www.robinwieruch.de/react-eslint-webpack-babel/
1. https://monkeyvault.net/react-starting-from-scratch/
1. https://stanko.github.io/webpack-babel-react-revisited/
1. https://www.robinwieruch.de/react-eslint-webpack-babel/

# Build/Task Management

Humble npm, which hooks onto whatever your OS uses as its shell, is all you need to do your task running. Don't add more tech debt in the form of yet another abstraction layer, such as Gulp or Grunt, unless they can bring something unique to your project. Each technology/layer of abstraction adds more to your plate in terms of things to keep track of and in terms of possible places your project can break. The same goes for npm dependencies, or anything else that's part of your project really. The more you add, the more potential points of failure you create. So, make sure the value proposition for your additions are air-tight.

It's a good idea to start doing this early on in the project's life, when there are fewer things to automate. To give you an idea of how to use this, let me say that I basically mapped the workflows for the more specific projects (like NodeJS or Static Web Site) to the `"scripts"` in `package.json`. That way, you could call something like `> npm run document-js:html` to re-generate JS documentation as a web site.

So, the `"scripts"` attribute let's you declare what you want npm to do when you hit `npm run {{anything}}`:

```
...
"scripts": {
  "start": "node src/index.js"
}
...
```

You can run the above by typing `> npm start` or `> npm run start`. Notice that you can omit the 'run' portion of the command in this case. This only works if you're trying to run `start` or `test`.

npm (and the rest) also has something called _hooks_, which run at specific points. It's best seen via example:

```
...
"scripts": {
  "prestart": "nsp check",
  "start": "node src/index.js"
  "poststart": "lt --port 3000",
}
...
```

Running `> npm start` will first invoke the `prestart` script, which'll check that our project's node_modules doesn't have any known security vulnerabilities. Then, `start` proper is run, which goes through the `index.js` file. Finally, `poststart` exposes the project on port 3000, allowing anyone who knows the generated URL to interact with `index.js`.

## Multiple Commands per Script

**Sources**:

1. https://github.com/mysticatea/npm-run-all

What if you wanted to run several (say, custom-made) scripts one after the other, or in parallel? Turns out that there's a very handy tool for doing that called **npm-run-all** (Source 1). When would you want to do this? An example would be times when you want to both start up an app and share it. Normally, you'd have to open 2 terminal sessions, one for each command, since each one takes over the terminal once initiated. npm can help us get around that limitation with `npm-run-all --parallel`. We can even write commands that we define separately, but within the same `scripts` object:

```
...
"scripts": {
  "prestart": ....,
  "start": "npm-run-all --parallel security-check open:src",
  "poststart": ...,
  "open-src": "node src/server.js"
  "security-check": "nsp check",
  "localtunnel": "lt --port 3000",
  "share": "npm-run-all --sequential open:src localtunnel"
}
...
```

## npx

**Sources**:

1. https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b
1. https://alligator.io/workflow/npx/

**npx** is a tool that allows you to use locally-installed packages as though they were global. Whenever you install a package using the `-g` flag, that package gets added to your PATH system variable. This means that you can call that package through your terminal without having to know the path to its executable (Source 1). The other end of that is that any locally installed packages will not work in the same way. An example, with the shell at the project root:

```
> npm i -D http-server
> http-server --help
...
Error: Cannot find module ...
```

If you want to call those packages without traveling to the _node_modules/.bin/_, you have to specify the path. This problem is alleviated in npm with a built-in tool called **npx** (Sources 1, 2):

```
> npm i -D http-server
> npx http-server --help
```

Fun fact: Yarn doesn't have this problem at all, which is nice: `> yarn http-server --help`
