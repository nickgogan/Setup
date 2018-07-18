# Developer Guide

The following doc is written for developers looking to maintain or extend the current web app project. It provides a high-level overview of the technologies selected, presented according to area of responsibility. It is not meant to be exhaustive as the best tool for that is inspecting and working with the code itself. It is meant to provide a contextual backdrop for understanding the decisions that led to the current project state.

## Checklist

### OS and Backend

This code of this web development project is designed to run cross-platform as of the current dependencies' versions. These versions can be found in `package.json` at the project root.

The backend and package manager is **NodeJS/npm**. All dependencies' versions have been locked to prevent breaking changes or odd behavior that may come from updated minor or major depency versions. Proceed with caution when updating any dependency.

A popular and stable Node-specific framework called **Express** is also used on top of it to provide a production web server.

### Version Control and Dependency Deprecation Management

Version control is handled by **git** and the code is hosted in the cloud as a public project in **GitHub**. On top of GitHub runs a 3rd-party service that integrates with it called [**Greenkeeper**](https://github.com/apps/greenkeeper). It provides warnings whenever a package has become deprecated or has security vulnerabilities. Greenkeeper has a number of requirements, an important one being the need for a **Continuous Integration (CI)** tool that automatically runs tests before allowing any git commits to be included in the project. This prevents the introduction of various classes of bugs and code style inconsistencies. Rules must be specified in testing suites and code styling tools, respectively, in order for this to work. Each are discussed in their own sections of this doc.

### Package Security

GitHub itself has integrated a security checker that warns project owners about potential vulnerabilities found anywhere in the project's dependency tree. It provides an easy-to-use report that can pinpoint exactly which package and version is the cause, why, and how to fix it. Usually this involves updating either the dependency itself to some minimal version or updating a dependency's depenendency(ies) to some minimal version. To learn more about this GitHub feature, check out their [writeup](https://help.github.com/articles/about-security-alerts-for-vulnerable-dependencies/)

An extra layer of security comes from npm itself, which has integrated security checks as of version 6. This comes from its buyout and integration of the **Node Security Platform**, which will becomes a non-service as of [**9/30/2018**](https://medium.com/npm-inc/npm-acquires-lift-security-258e257ef639).

### Module Management and Bundling

**ES6 Modules** has been used to the greatest extent possible, including in the **webpack** setup itself. Note that this is not the usual way of using webpack, but it does work well in this setup. In essence, webpack is a module bundler, but it has expanded to many other roles thanks to its extensive plugin system. In this project, it is also responsible for uglification, HTML generation, CSS scoping, CSS cleaning (if a given selector is unused), dealing with assets like fonts and images, creating the `manifest.json`, creating the `robots.txt`, optimizing JS code (prepack plugin), creating social media HTML tags, and providing development servers with HMR. On top of webpack is the **service worker** plugin that, along with the manifest, allows this app to be called a [**Progressive Web app (PWA)**](https://developers.google.com/web/progressive-web-apps/). The service worker in particualr allows the app to continue to work without a network, so long as it was initially loaded. This will be fleshed out in more detail in a dedicated webpack section of this doc.

### Linting and Formatting

**ES6** and **JSX** are the languages used in this project as part of the **React** frontend framework. To enforce best practices in terms of code styling and linting, **ESLint** and **Prettier** are used. ESLint is set up within the project (see `package.json`), but Prettier is integrated into the local VSC editor. A TODO item is dedicated to making Prettier project-specific like ESLint, as this will enforce the rules better over time and across developers.

### Transpiling

**Babel** is used to transpile ES6 to ES5 in order to support browser versions at least 2 years old. On top of this responsibility lie Babel plugins that serve to optimize React code. More details on this can be found in the webpack section of this doc.

### Development Web Server

The dev server and Hot Module Reloading (HMR) capability is provided by webpack and its Express-specific plugins. More detail on this in the Node/Express section of this doc.

### Documentation and Debugging

There is currently no debugging support for this app, as the Chrome React dev tools extension has proven useful enough. However, there is a TODO item dedicated to implementing a testing suite over time.

Documentation is provided in this doc and in the User Guide.

### Sharing Work

The latest deployed version of the app is hosted on **Firebase** and can be accessed from this URL: https://static-web-site-16a54.firebaseapp.com/

### Build/Task Management

**npm** itself is used, with all relevant scripts in `package.json/scripts`. The scripts can be divided along the lines of the following categories: deployment, production, development, utility.

_deployment_

`deploy`: Builds the project and then push it to the Firebase server.

`deploy-firebase`: Push the `dist` folder to Firebase.

- Note: `firebase.json` is configures this command and `.firebaserc` holds the URL that it can be reached at.

_production_

`prod:clean`: Deletes files in the `dist` folder.

`prod:build`: Uses webpack to compile the project in `dist`.

`prod:serve`:

`prod`: Sequentially runs the clean, build, and serve commands, in that order.

_development_

`dev:clean`: Deletes files in the `build folder`.

`dev:build`:

_utility_

`postinstall`: Automatically runs after every `npm install` command. For this project, it created a stub of the package for **Flow**.

## Utility Packages

The following dependencies are used to assist in building the project.

**npm-run-all**: Used to run multiple npm commands either sequentially or in parallel.

**cross-env**: Runs scripts that set and use OS environment variables across different platforms.

**rimraf**: The UNIX command `rm -rf`, but for Node.

**nodemon**: A utility that monitors for any changes in source and automatically restarts the server. In this project, it is used to monitor config files (especially webpack files), utility files, and server files.

**dotenv-safe**: Load environment variables from `.env` files, but without having to expose sensitive data to GitHub. `*.example.env` files set the expected variables and the actual `*.env` files contain the sensitive info (e.g. logins). This is used in conjunction with `.gitignore`, which is configured to not push the `*.env` files to GitHub.

**glob-all**: Provides a similar API to **glob**, but with more patterns and the option of using arrays of patterns.

**firebase-tools**: The Firebase CLI used, in this project, to deploy code and asets to the Firebase server.

**install-peerdeps**: CLI used to install an npm package and its peer dependencies automatically. This is usually done manually.

## Backend

The entryway to the app is provided by `server/index.js`. Here, the **Express** server is spun up based on the `NODE_ENV` environment variable that is set by **cross-env** in `package.json`. This is also the place where the decision is made regarding which webpack config gets loaded up, which determines the features avaiable. Once within the webpack system, `index.jsx` is called, which can be thought of as the separator of the backend and frontend.

- **development**: Has extra features like **HMR** and the app is served by Express reading the `build` directory when `localhost` is requested by the browser.
- **production**: Does not have HMR and has the Express server serve the app as simple static files. The emitted `styles.*.css`, by default, has incorrect paths for the external assets (images and fonts). The `fixCSSPath.js` contains a function that correct these paths.

**cors**: Provides Express middleware that allows the webapp to get resources external to its own domain. More info [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

### Webpack

This system exists in `src/webpack/*` and is divided by responsibility.

The HTML templates are at `src/templates`. The main template is `index.html`, while `5xx.html` is used for 5xx HTTP errors and `missingResource.html` is used for the 404 HTTP error. In order for the error templates to be used, **the final delivery server must be configured to use them in the proper scenarios.**

## TODO

1.  Search bar for Papers
2.  Slideshow at Home
3.  Move linting and formatting to in-project dev dependencies (as opposed to keeping them in the editor).
4.  Testing framework
5.  Unit tests
6.  Integration of test framework with CI tool
