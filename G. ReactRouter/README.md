# Developer Guide

The following doc is written for developers looking to maintain or extend the current web app project. It provides a high-level overview of the technologies selected, presented according to area of responsibility. It is not meant to be exhaustive as the best tool for that is inspecting and working with the code itself. It is meant to provide a contextual backdrop for understanding the decisions that led to the current project state.

## OS Prerequisites

This code of this web development project is designed to run cross-platform as of the current dependencies' versions. These versions can be found in `package.json` at the project root.

## Backend

This piece is provided by **NodeJS** with its package manager **npm** handling dependencies. All dependencies' versions have been locked to prevent breaking changes or odd behavior that may come from updated minor or major depency versions. Proceed with caution when updating any dependency.

A popular and stable Node-specific framework called **Express** is also used on top of it to provide a production web server.

## Version Control and Deprecation Management

Version control is handled by **git** and the code is hosted in the cloud as a public project in **GitHub**. On top of GitHub runs a 3rd-party service that integrates with it called [**Greenkeeper**](https://github.com/apps/greenkeeper). It provides warnings whenever a package has become deprecated or has security vulnerabilities. Greenkeeper has a number of requirements, an important one being the need for a **Continuous Integration (CI)** tool that automatically runs tests before allowing any git commits to be included in the project. This prevents the introduction of various classes of bugs and code style inconsistencies. Rules must be specified in testing suites and code styling tools, respectively, in order for this to work. Each are discussed in their own sections of this doc.

## Package Security

GitHub itself has integrated within it a security checker that warns project owners about potential vulnerabilities found anywhere in the project's dependency tree. It provides an easy-to-use report that can pinpoint exactly which package and version is the cause, why, and how to fix it. Usually this involves updating either the dependency itself to some minimal version or updating a dependency's depenendency(ies) to some minimal version. To learn more about this GitHub feature, check out their [writeup](https://help.github.com/articles/about-security-alerts-for-vulnerable-dependencies/)

An extra layer of security comes from npm itself, which has integrated security checks as of version 6. This comes from its buyout and integration of the **Node Security Platform**, which will becomes a non-service as of [**9/30/2018**]().

## Module Management and Bundling

**ES6 Modules** has been followed to the greatest extent possible, including in the **webpack** setup itself. Note that this is not the usual way of operating webpack, but it does work well in this setup. Webpack is used in dealing with module bundling, but it is expanded to many other roles thanks to its extensive plugin framework. It is also responsible for uglification, HTML generation, CSS scoping, CSS cleaning (if a given selector is unused), dealing with assets like fonts and images, creating the `manifest.json`, creating the `robots.txt`, optimizing JS code (prepack plugin), creating social media HTML tags, and providing development servers with HMR. On top of webpack is the **service worker** plugin that, along with the manifest, allows this app to be called a [**Progressive Web app (PWA)**](https://developers.google.com/web/progressive-web-apps/). The serivece worker in particualr allows the app to continue to work without a network, so long as it was initially loaded.

## Linting and Formatting

**ES6** and **JSX** are used in this project as part of the **React** frontend framework.

## TODO

1.  Search bar for Papers
2.  Slideshow at Home
3.  Move linting and formatting to in-project dev dependencies (as opposed to keeping them in the editor).
4.  Testing framework
5.  Unit tests
6.  Integration of test framework with CI tool
