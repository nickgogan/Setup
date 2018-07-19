# Developer Guide

The following doc is written for developers looking to maintain or extend the current web app project. It provides a high-level overview of the technologies selected, presented according to area of responsibility. It is not meant to be exhaustive as the best tool for that is inspecting and working with the code itself. It is meant to provide a contextual backdrop for understanding the decisions that led to the current project state.

- [Developer Guide](#developer-guide)
  - [Checklist](#checklist)
    - [OS and Infrastructure](#os-and-infrastructure)
    - [Project Structure](#project-structure)
    - [Version Control and Dependency Deprecation Management](#version-control-and-dependency-deprecation-management)
    - [Package Security](#package-security)
    - [Module Management and Bundling](#module-management-and-bundling)
    - [Linting and Formatting](#linting-and-formatting)
    - [Transpiling](#transpiling)
    - [Development Web Server](#development-web-server)
    - [Documentation and Debugging](#documentation-and-debugging)
    - [Sharing Work](#sharing-work)
    - [Build/Task Management](#buildtask-management)
  - [Utility Packages](#utility-packages)
  - [Backend](#backend)
    - [Webpack](#webpack)
      - [Checklist](#checklist)
      - [Differences](#differences)
      - [Assets Loader](#assets-loader)
      - [Babel Loader](#babel-loader)
      - [Extract Bundles Loader](#extract-bundles-loader)
      - [PostCSS Loader](#postcss-loader)
      - [Templates Loaders](#templates-loaders)
    - [Setting the App Environment](#setting-the-app-environment)
      - [The Structure](#the-structure)
      - [Integration into Project](#integration-into-project)
    - [Templates](#templates)
  - [Frontend](#frontend)
  - [TODO](#todo)

## Checklist

### OS and Infrastructure

This code of this web development project is designed to run cross-platform as of the current dependencies' versions. These versions can be found in `package.json` at the project root.

The backend and package manager is **NodeJS/npm**. All dependencies' versions have been locked to prevent breaking changes or odd behavior that may come from updated minor or major depency versions. Proceed with caution when updating any dependency.

A popular and stable Node-specific framework called **Express** is also used on top of it to provide a production web server.

### Project Structure

This is a high-level overview:

**\.cache\-loader**: Used to hold webpack's build cache, which helps reduce the build time across a set of builds. Note that this slightly increases an initial build's time. It is not captured by git.

**\.vscode**: Holds Visual Studio Code (VSC)'s settings. This would be useless for any other code editor. It is not captured by git.

**build**: Holds out files for the development environment. It is useful for, when during development, you want to examine files that would otherwise exist only in memory. I found this useful for troubleshooting difficult bugs around styling and assets like fonts and imagees.

**dist**: Holds files that would deployed for production.

**flow-typed**: Holds `package-dep-libdefs.js`, which contains stubs for 3rd-party packages that have no support for **Flow**.

**monitor**: Holds `stats.json`, which

**node_modules**: Contains dependency packages.

**server**: Contains code the for **Express** server, as well as

**src**: Holds the webpack system, the middle layer between backend and frontend (`index.jsx`), and the app itself.

**.babelrc**: Project-wide configuration file for the **Babel** transpiler. Babel requires a minimal project-wide config file.

**.eslintignore** and **.eslintrc**: Contains the ESLint configuration.

**.firebaserc** and **firebase.json**: Contains the Firebase configuration.

**.flowconfig**: Contains the Flow configuration.

**.gitattributes** and **.gitignore**: Contains the **git** configuration.

**jsconfig.json**: Its presence indicates the root of a JavaScript project to VSC. This file specifies the root files and options for the features provided by the VSC JavaScript language service. For this project, it holds a minimal configuration.

**package-lock.json** and **package.json**: Holds configuration for Node, locked-in versions for the project dependencies, scripts for building and running the project, and specifies which browsers are targeted by the project ([browserlist](https://github.com/browserslist/browserslist)).

**postcss.config.js**: Holds the configuration for the PostCSS styling system used in this project. It contains config for the two PostCSS packages used, **CSSNext** and **Rucksack**.

**README**: Markdown file containing this developer's guide.

**User Guide**: Markdown file containing the accompanying User's Guide. It contains worksflows on how to update or create new content.

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

This system exists in `src/webpack/*` and is divided according to responsibility. The top of the structure is constituted by `webpack.config.dev.babel.js` and `webpack.config.prod.babel.js`, which are chosen by the `src/index.jsx` file according to the `NODE_MODULE` environment variable.

`src/webpack/parts/` contains webpack configurations that handle, respectively: the external assets (`assetsLoader.babel.js`), the JavaScript (`babelLoader.babel.js`), the styling (`postcssLoader.babel.js`), and the HTML (`templatesLoader.babel.js`). There is also `extractBundles.babel.js`, which is used in the top level prod webpack to divide the final code up into separate logical bundles. This can be used to keep track of where the glut of code is coming from, which is useful when analyzing performance. The reason why the webpack configuration was divided up into these separate parts was to aid in maintanence and to make the code more modular - if you want to switch from PostCSS to Sass (or some future styling framework that webpack supports), then you can just write a webpack config and replace PostCSS in the top-level webpack configs.

In the course of writing the webpack configuration, there were a few problems that required custom code. This functionality is kept in the `src/webpack/helpers/` directory. `nameNonNormalModules.js` assigns legible filenames to code outside of the project and which do not contain the webpack runtime. `setEnvironment.js` is used to set up webpack environment variables, and `stringifyEnvironment.js` is used to ensure that the input to webpack's environment variables are strings and not JSON.

To dive into the webpack architecture set up here, it is best to begin with the top-level dev and prod configs, and then proceed with a summary of what each webpack piece does.

#### Checklist

Both the development and production webpack configs have a common structurel. Those aspects not discussed below are sufficiently commented in the config itself:

1.  Import and merge the webpack loaders from `parts/`. Note that almost all of these webpack pieces have a separate development and production outcome, due to the optimizations involved in production that are not necessary for development. Note also that each piece returns a webpack config that gets merged with the other webpack pieces and with the top-level config requesting these pieces.

2.  Configure and load of webpack plugins

3.  Set the target platform, i.e. web.

4.  Specify the frontend entry point, i.e. `index.jsx`

5.  Specify the output directory and the filenaming pattern.

6.  Set which file types webpack will deal with and set the location of the 3rd-party dependencies.

#### Differences

1.  Webpack plugins used: `webpack.config.prod.babel.js` utilizes many more webpack plugins that help to optimize code, obfuscate code, modularize the code for lazy loading, make the app a PWA, make the app social media-friendly, etc...All can be fairly quickly researched. In `webpack.config.dev.babel.js`, the webpack HMR plugin is added.

2.  Use of `parts/extractBundles.babel.js`: This internal webpack plugins (i.e. it comes with webpack 3) is used to break up the normally singular bundle.js file into modules that contain logically distinct units. This helps the user load the website much faster on subsequent visits, because code that does not change often will not need to be requested again. That module will remain cached in the user's browser and would only be requested if its code is actually different from the latest version. The way that webpack can tell the difference is with a manifest file that gets generated, which contains content-based hashes. To learn more about this, check out [cache-busting]().

3.  In prod, webpack creates these bundles: `vendor` (3rd-party code), `manifest` (the webpack runtime), `commonLazy` (code common across the entire app). The rest of the code requested by the browser will be the React components. These are discussed in more detail in the User Guide. To summarize, those React component constitute a tree that gets traversed by the client requesting different parts of the app. Only the necessary content explicitly requested by the user gets sent to the browser, which caches that content. This is called lazy-loading and keeps the app running very quickly by minimizing the amount of stuff sent "over the wire".

- **Note**: The order in which the webpack plugins are listed in the plugins array is important. Do not mess with the ordering if you don't have to. Although, it is fairly safe to comment out some plugins for exploratory analysis.

4.  In the dev webpack config, the webpack dev server is configured and does not appear in the prod config.

#### Assets Loader

This config piece tells webpack how to handle various image formats and font types. It is the same for both the dev and prod webpack environments.

#### Babel Loader

This piece tells webpack how to use **Babel Loader** to handle the `src` JavaScript/React files (i.e. those with `.jsx`). It excludes, as usual, `node_modules` because those are not needed to be handled in the project. The code there is ready-to-use JS and does not require further processing. The configuration of the Babel Loader includes to which browsers the output code must be understandable. It also includes an extensive array of Babel plugins that serve to trim and optimize the output code, only some of which are used in the dev webpack environment.

- **Note**: The order of the Babel plugins is extremely important.
  This piece also uses the **Cache Loader**, which allows for caching of built code. If some code does not change across subsequent webpack compilations, then that code won't be compiled. This reduces subsequent compilation times, but slightly increases the initial build's compilation time.

This loader also contains useful webpack plugins that further optimize the output JS, especially in the prod webpack environment.

#### Extract Bundles Loader

This short piece uses an internal webpack plugin to break up what would usually be a relatively large bundle.js webpack-outputted file. and allows for it to be broken up into logical submodules. This helps with caching immensely.

#### PostCSS Loader

This piece is used to handle the PostCSS styling of the project. It holds separate objects for dev and prod webpack environments, with dev being significantly more straightfoward than prod. In prod, the CSS is extracted from the code and emitted into its own, sepate CSS file. That file is also "purified" of any CSS that is not actually used in the project, which helps keeps the code lean.

#### Templates Loaders

Holds configuration for what becomes the final HTML output of the project. Here again, there are templates configured separately from the dev and prod environments. They share a common `baseTemplate` configuration object that is then extended by the `productionTemplate` and `developmentTemplate` objects. The main difference is that the production template holds optimizations not needed in development, which tend to increase the webpack compilation time. This loader piece also holds a couple of webpack plugins that generate social media info in the output HTML and a traditional `robots.txt` file.

### Setting the App Environment

This is another hierarchical structure. I will first describe this structure and then describe how it gets incorporated and used in the project.

#### The Structure

First, this structure is entirely held in the `src/env/` folder and is composed of two logical sets written across six files. The first set holds the variables/keys to be expected. The three `*.common.env` files represent these. The second set holds both the keys and their values and are represented by the other three `.env` files. The reason for having these two sets is that there may come a time when some sensitive piece of data (e.g. login info) must be stored for the app to work properly. This info must not be stored in GitHub and should instead be set up individually for each developer. This means that the `.gitignore` config file at the root of the project tells git to not capture the second `.env` in the version control system. The **dotenv-safe** dependency makes this two-set system work.

All variables common to both the development and production environment are stored in the `common` env file.

#### Integration into Project

The start of the flow is in the `package.json` builds scripts (`dev:build` and `prod:build`). In these scripts, a dependency called **cross-env** sets the `NODE_ENV` environment variable's value to be either **development** or **production**. In that same build script, the `server` is called.

- Note: `server` is a shorthand known in npm. It means "access the `index.js` file found in the root `server` directory."

In that `server/index.js` file, the `NODE_ENV` value is used to load either the top-level dev webpack config or the top-level prod webpack config. Within those top-level webpack config files, the `NODE_ENV` value is passed to the `setEnvironment` function (held at `src/webpack/helpers/`), which then grabs either the `dev.env` file or the `prod.env` file (`common.env` is loaded first and merged with whichever other `.env` is requested).

### Templates

This is a relatively simple system - just a collection of three HTML templates at `src/templates`. The main one is `index.html`, `5xx.html` is used for 5xx HTTP errors, and `missingResource.html` is used for the 404 HTTP error. In order for the error templates to be actually used, **the final production server must be configured to use them in the proper scenarios.**

## Frontend

The architecture of the frontend is divided into the following logical pieces. Note that this is **not** a traditional way of architecting a web app frontend:

1.  `src/Screens/`: `Root.jsx` is imported by `index.jsx` as the `AppContainer`. The Root file detects the requestor's device screen size and serves either the `Desktop` or `Mobile` screens. This is also where the `React Router` lives. This means that `Desktop` and `Mobile` each import the different routes of the app, which are stored in the `Views` folder. In addition, this folder contains global PostCSS variables and a traditional CSS reset file that removes much of the browsers' default styling.

2.  `src/Views/`: Holds `Routes.jsx`, which maps browser URLs to high-level React components (which are called **Views** in the context of this app). Each folder in `Views/` corresponds to the app's "pages" and each contain a JSX file and companion PostCSS file.

3.  `src/containers/`: Intermediary React structure that imports React components and imbues them with functionality and styling within a given page/View. Note that the Header and Footer containers have both Desktop and Mobile implementations. This is because the implementations are very different between these two Screens.

4.  `src/components/`: The lowest-level React structures that hold the actual content. Note the `UI/` folder, which contains the most generic of the components, such as the Divider, the Loading component, and the Text component.

5.  `src/assets/`: Holds external assets that are more or less copied to the `dist` and `build` folders in a folder of the same name. It contains favicons in three different formats, a [`.nginx.confg`](https://www.nginx.com/resources/glossary/nginx/), a `.htaccess` for Linux web server configuration, `fonts/` for fonts, and `images` for images/icons.

## TODO

1.  Slideshow at Home
2.  Search bar for Papers
3.  Move linting and formatting to in-project dev dependencies (as opposed to keeping them in the editor).
4.  Testing framework
5.  Integration of test framework with CI tool
6.  Unit tests
