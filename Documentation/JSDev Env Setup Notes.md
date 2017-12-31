7. ESLint + Babel + Webpack + React: https://www.robinwieruch.de/react-eslint-webpack-babel/

## JavaScript

### Automation

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

## Beyond JS

There are various _supersets_ of JS that we can use to make development easier and more powerful. TypeScript, from Microsoft, is one of them. Another is basically JS, but in the future. Let's start from the ground; in case you don't know, JS is brought to you by the folks over at _Ecma International_. They're a <del>group of bureaucrats</del> standardization group that focus on specifications for stuff like JavaScript (technically called EcmaScript <del>...b/c bureaucrats</del>). They decide on the what goes into JavaScript/ES and doesn't belong. It's other peoples' jobs then to actually implement these changes in a way that allows the wider public to use it.

_A <del>bad</del> history lesson_:

* _Source_: https://en.wikipedia.org/wiki/ECMAScript

- _GitHub account_: https://github.com/tc39

- _caniuse_: https://caniuse.com/#search=es

1. Prior to December 1999, there is darkness.
1. In Dec 1999, the ES3 spec was released and browser vendors got to work implementing parts of it, little by little.
1. In Dec 2009 (yes, a decade later), ES5 came out because people got drunk, angry, and couldn't agree on what ES4 would be.
1. Only a little more than half a decade later, in June 2015, ES6 was released, which was so different from all the previous released that it broke the hearts and minds of the developers. It was basically a new language. It is backgrounds-compatible, so you could continue coding the old way. However, if you wanted to stay relevant, the language coding patterns in ES6, for solving the same problems as always, were almost totally different. So, yeah, pretty much a new language. As you can image, there was very slow browser adoption of the language. But, 2 years later, all browsers are at like 90% support for it!
1. ES7 was released in June 2016, and was easy on the shattered minds of its developers - it only added 2 new things to learn. There's almost no browser support for this yet.
1. Present day (Dec 13th, 2017): ES8 has been proposed, again in June of this year, but it won't be for a while longer. Definitely no browser support for this.

We'll just focus on ES6 for now, but you'll be able to guess how to get even the latest (experimental) features into your project, if you want to check them out.

A **transpiler** is used in a build (dev, qa, prod, w/e) to translate these JS supersets into a set that current-day browsers can understand. You don't have to memorize what browsers currently support or any of that. Just use a good transpiler and everything is taken care of. TypeScript uses _tsc_ to make \*.ts files into \*.js files that browsers can digest. Similarly, other solutions appeared to translate ES6 and many others into current-day JS. The biggest by far is called _Babel_.

### ES6 with Babel

**Sources**:

1. Transpiling ESNext: https://babeljs.io/
2. Everything About Babel: https://kleopetrov.me/2016/03/18/everything-about-babel/

**Important**: Despite what the main website might say, as of this writing, Windows machines need to install Babel _globally_, not locally. No idea why and no idea if this affects Mac or Linux users. This is what I found for Windows machines. Install it using `> npm i -g babel-cli`. This will hopefully not be the case soon and we can just use Babel locally. The presets that Babel will transpile to, however, can be installed locally as of now, i.e. on a per-project basis. The recommended preset is simply called `env`, as in `> npm i babel-env`.

Next comes configuration. This can be handled directly in package.json, but it is recommeded to do so in a separate file called `.babelrc`. This is where we can make use of the presets and, if you have them, the plugins installed (yes, Babel is highly cofigurable and extensible):

```
{
  "presets": ["env"]
}
```

Do a quick VS Code reload and start testing it out!

### TypeScript (TS)

**Sources**:

1. Configuring TS - tsconfig.json: https://blog.angularindepth.com/configuring-typescript-compiler-a84ed8f87e3

The other JS superset that is taking the community by storm is Microsoft's OO language, TypeScript. Technically, it's a superset of ES6. It's starting to pop up everywhere, so it's worth familiarizing with as well. Like ES6, it needs to be transpiled down into a JS version that browsers can understand. This is done using the TS compiler, which can be acquired using `npm i -g typescript`.

Next comes configuration, using `tsconfig.json`. One thing to keep in mind about this file is that it tells tsc what your TS project root is:

```
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/",
    "baseUrl": "./src/",
    "sourceMap": true,
    "declaration": false,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,f
    "target": "es5",
    "typeRoots": ["node_modules/@types", "typings/*"],
    "lib": ["es2016", "dom"]
  }
}
```

If you want to specify vendor libraries outside of npm (idk why, but ok...), then you can tell tsc like this:

```
"compilerOptions": {
  "baseUrl": "./src/",
  "paths": {
    "*": [
      "libs/*"
    ]
  }
```

Setting this options **requires** you to also set the `baseUrl` option, which specifies the base directory to resolve non-relative modules in.

If `paths:` option is set, tsc goes through those folders and only checks `node_modules` if nothing is found. The **first** resolved module is used and no other paths are checked. So if you have a module placed inside both `node_modules` and `YourCustomFolder`, the module in your custom folder will be picked up by the compiler. If you need the compiler to use the module inside node_modules folder, add it to paths before your custom folder:

```
    "paths": {
      "*": [
        "*",
        "node_modules/*",
        "generated/*"
      ]
    }
```

### Both?

Why not? The `jsconfig.json` sets up the JS project root and Babel will only target \*.js files. The `tsconfig.json` config only targets the \*.ts.

If you want to be very specific about it, you can set a configuration option in `tsconfig.json` that tells the tsc compiler to only target specific files:

```
  "files": [
    "main.ts",
    "router/b.ts"
  ]
```

OR you can set a pattern:

```
  "include": [
    "router/*"
  ]
```

_Note_: tsc will also compile files that are referenced inside any file from that array.

In the case of conflicts, the priority is set in the following order:

1. Files
2. Exclude
3. Include

---

## Static File Checking with Flow

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
`"presets": ["flow"]` Obviously, if you have other presets, just add "flow" as another array item.

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

## Automated Tasks with npm

Humble npm, which hooks onto whatever your OS uses as its shell, is all you need to do your task running. Don't add more tech debt/another abstraction layer, such as Gulp or Grunt, unless they can bring your project functionality that you can't get from npm (without an insane amount of work, that is). Each technology/layer of abstraction adds more to your plate in terms of things to keep track of and in terms of possible places your project can break. The same goes for npm dependencies, or anything else that's part of your project really. The more you add, the more potential points of failure you create. So, make sure the value proposition for your additions are air-tight.

---

<!-- 12. ReactJS support
//Runtime dependencies
> npm install --save react react-dom eslint-plugin-react
> install-peerdeps eslint-plugin-react
If you want to avoid ES2015 class syntax:
> npm install create-react-class
Add Babel support for ReactJS
> npm install babel-preset-react -->
