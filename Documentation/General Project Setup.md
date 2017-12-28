**Assumptions**:

1. Finished _Windows System setup_ and

We'll be going over:

1. Setting a workling project structure.
1. The common technologies used in the types of projects that are supported.

The idea is to showcase what goes into the basic foundations. Later on, we can take this basic foundation and construct more specific projects, such as those for NodeJS or web sites. When discussing these projects, I will first go through the common technologies, to ensure that they play nice with the tech that would be installed on top. Then, I will introduce the new tech that helps us tackle those project types.

# Table of Contents

* [Minimal Project Structure](#minimal-project-structure)
* [Common Technologies](#common-technologies)
* [Documentation](#documentation)
  * [Documentation-JS](#documentation-js)
  * [Documentation-Style](#documentation-style)

# Minimal Project Structure

You'll notice that this repo has way more things in it than a minimal project. This is the case because I wanted to provide a foundation for a few possible projects:

1. Static web sites, _app_Website_
1. NodeJS/Express apps, _app_NodeJS_

Just delete the ones that don't correspond with the project you want to do.

**Note**: The config files, like `.babelrc` or `.eslintrc`, were made such that they work across all of the project types.

Within each project, the same structure can be seen:

1. Global: Config files.
1. _src/_: Your source files.
1. _dist/_: Your public/distribution files.
1. _docs/_: Your documentation files.

From there, each project can be different. Personally, if possible, I try to keep it simple.

# Common Technologies

The following will be seen in all of the projects supported:

1. npm/yarn: #package-management
1. Node Security Platform: #package-security
1. Local Tunnel: #sharing-work
1. Typings: #typings
1. Babel: #babel
1. Documentation.js: #documentation-js
1. ESLint + Prettier + Babel: #syntax-help
1. sassdoc: #documentation-styling
1. Node Security Platform: #nsp
1. TSLint: This is mainly for VSC to provide some IntelliSense.
1. Local Tunnel: #lt

# Package Management

1. https://nodejs.org/en/
1. https://yarnpkg.com/en/
1. https://alligator.io/workflow/npx/

The answer should be either `npm` or `yarn`. Either way works, choose whichever makes you happy. `npm` comes with `NodeJS`, so install NodeJS on your machine to get that going. To test, `> npm -v`. See the _Windows System Setup_ doc on how to get up and running with Yarn (including having a local, offline mirror of your projects' dependencies).

**npx**: Whenever you install a package using the `-g` flag (through either npm or yarn), that package gets added to your PATH system variable. This means that you can call that package through your terminal without having to know the path to its executable. This means that any locally installed packages will not work in the same way. An example, with the shell at the project root:

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

Yarn doesn't have this problem at all, which is nice: `> yarn http-server --help`

# Package Security

**Sources**:

1. https://nodesecurity.io/
1. https://www.youtube.com/watch?v=Wx3WlQLFa3w
1. https://www.youtube.com/watch?v=RDwOZ6vQGKo

Since any rando can publish to npm, security is a bit of a concern. This pain point gets alleviated by including **Node Security Platform (NSP)** as part of your workflow. We'll just install it for now and, later on, we'll see how to include it in automated npm tasks.

**Install**: `> npm i -D nsp`

**Run**: `> npx nsp check --reporter summary`

# Sharing Work

**Local tunner** is used to open your project to the world via URL. It's totally insecure, but very easy to get up and running with it - just share the URL that it produces and that person can then access your running project.

This avoids having to configure stuff like Azure, AWS, etc... to just share work from your local machine. Obviously, don't use these for production deployments.

**Install**: `> yarn add localtunnel --dev`

**Test**: `yarn lt --version`

**Run**: `> yarn lt --port 3000`

# Typings

VSC gets much of its IntelliSense from _typings files_. These are TS files that set up expected structures/patterns for different code situations. The IDE comes packaged with a bunch of these, but we can extend the system with typings from the wider community. Typings files also provide you with some dev-time error checking that would otherwise not be caught until it gives you a confusing error at runtime.

**WARNING**: Prior to TypeSript 2.0, the most commonly-used tool to manage and install type definition files was `typings`. Post-TS-2.0, `npm @types` is used. **_Always_** check the publication date of any article, tutorial, course, or tool you are using. There may be deprecated information contained that will have you going down rabbit holes that are no longer relevant or useful.

Why do this when we have tools like ESLint or TSLint? Because those tools are more specific and sometimes do not have what we need. There is nothing wrong with taking a little bit from all of them when putting together a project's tools. Just make sure that conflicts are properly handled.

Some examples to get you started:

```
> yarn add @types/node @types/express @types/angular @types/reac --dev
```

Note that the _app_Foundation_ project doesn't have any of these.

# Documentation

Documentation is generated separately for JS and Sass files, using documentation.js and sassdoc, respectively. The output I use is html, but I think these tools have other formats.

## Documentation-JS

**Sources**:

1. https://github.com/documentationjs/documentation 1.https://github.com/documentationjs/documentation/blob/master/docs/GETTING_STARTED.md
1. http://usejsdoc.org/about-getting-started.html

JSDoc-style comments (annotations) are used at a minimum with documentation.js to add a documentation step to our dev workflow. These annotations can be automatically generated (mostly) with the following VSC extension: **Document This**. With the cursor on a defining piece of code, e.g. function declaration or a class, the following shortcut will generate the comment structure: _Ctrl+Alt+D_

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

## Documentation-Style

**Sources**:

1. http://sassdoc.com/annotations/
1. http://sassdoc.com/file-level-annotations/

The idea is much the same as with documentation for JS files. Just read the short sources above and you'll get the idea.

**Install**: `> yarn add sassdoc --dev`

**Run**: `> yarn sassdoc src/styles -d docs/styles`
