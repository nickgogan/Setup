# Technologies

The following will be seen in all of the projects supported:

1. npm/yarn: #package-management
1. Node Security Platform: #package-security
1. Local Tunnel: #sharing-work
1. Typings: #typings
1. Babel: #babel
1. Documentation.js: #documentation-js
1. ESLint + Prettier: #syntax-help
1. sassdoc: #documentation-styling
1. Node Security Platform: #nsp
1. TSLint: This is mainly for VSC to provide some IntelliSense.
1. Local Tunnel: #lt

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

# Syntax Help

1. ESLint using AirBnb's styleguide: https://www.npmjs.com/package/eslint-config-airbnb

Linting and formatting in VSC can be effectively done using **ESLint** and **Prettier**. They both have extensions that integrate them into VSC and can be configured to mutually reinforce each other. Prettier will have the auto-formatting first. Then ESLint will automatically fix syntax problems it sees, such as missing semicolons.

**Install**: `> npm i --save-dev eslint prettier`

We need guidelines to judge against and AirBnb's has become the de-facto standard:
**Install**: `> npm i --save-dev eslint-config-airbnb`, `> install-peerdeps --dev eslint-config-airbnb`.

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
