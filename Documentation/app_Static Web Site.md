# Introduction

Making a web site is not so simple any more, especially if you're doing it for a client. A good practice is to deliver the finished site + some extra materials, which may include:

1. Documentation for functionality and a styleguide
1. Training materials
1. Presentations that contain other deliverables, like project outlines, timetables, etc.

As you can see, it can get pretty complicated. For now, the only extras I will be discussing are those around documentation. We'll be automatically generating those in the _docs/_.

Your source code should go into _src/_, somewhat like this:

```
functionality/
- index.js
- ...js
- vendor/ - For any 3rd party code not from npm
styles
- main.scss
- vendor/ - For any 3rd party stylings
- shared/ - For partials like resets, grids, etc..
- components/
```

The files in _src/_ will be put through some processes that will generate files to fill the _dist/_ folder:

```
index.html - You main webpage.
favicon file if you have one.
pages/ - Your other webpages
functionality/
- index.js - The final, transpiled + concatenated + minified + gzipped JS file.
styling/
- main.css - The final, transpiled + concatenated + minified + gzipped CSS file.
assets/
- fonts/
- images/
```

**Note**: Obviously, there are other operations we can place upon the final index.js and main.css files, but the 4 I mentioned serve as a minimal baseline.

# Checklist

**Assumption**: OS-specific work, like setting up shells or getting VSC up and running, was done as part of _Windows System Setup_. This takes care of the first 2 items in the checklist.

## Package Management - NodeJS/npm

**Install**: https://nodejs.org/en/

* Just go with the LTS package.

**Test**: `> node -v` and `> npm -v`

## Package Security - Node Security Platform

**Install & Test**:
