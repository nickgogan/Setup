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
