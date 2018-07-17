# Starter Kits

[![Greenkeeper badge](https://badges.greenkeeper.io/nickgogan/Setup.svg)](https://greenkeeper.io/)

#### Published on January 1, 2018

My goals in putting this together:

1. Have starter kits for the projects I'm interested in.
1. Allow people to follow along with various walkthroughs. Instead of watching NodeJS REST API videos, use the starter kit to code along, adding any missing dependencies as you go. The kit also adds a lot of syntax help, which should hopefully allow you to weed out common mistakes early and focus on the actual app and language logic.
1. Give a sense of the standard moving parts expected from modern software.

Inspired by the following sources:

1. The JavaScript Starter Kit Manifesto:
   https://www.youtube.com/watch?v=jubd2opc4Ps

2. Building a JavaScript Development Environment:
   https://app.pluralsight.com/library/courses/javascript-development-environment/table-of-contents

3. PluralSight - Visual Studio Code:
   https://app.pluralsight.com/library/courses/visual-studio-code/table-of-contents

4. The Agile Manifesto: http://agilemanifesto.org/

5. The Twelve-Factor App: https://12factor.net/

6. Front-End Developer Handbook 2017: https://frontendmasters.com/books/front-end-handbook/2017/

## The Checklist

1. OS prerequisites
1. Project structure and shells used
1. Package management - Managers
1. Package management - Deprecation strategy
1. Package management - Security
1. Module management
1. Version control + cloud storage
1. Linting
1. Formatting
1. Transpiling
1. IntelliSense
1. Development Web Server
1. Debugging
1. Documentation
1. Sharing work
1. Bundling with sourcemaps, minification, concatenation, spriting (for images), and compression (TBD)
1. Build/Task management
1. Dynamic HTML generation (TBD)
1. Centralized HTTP (TBD)
1. Mocking framework (TBD)
1. Testing suite (TBD)
   1. Framework
   1. Assertion Library
   1. Helper Libraries
   1. Where to run tests
   1. Where to place tests
   1. When to run tests
1. Continuous Integration (TBD)
1. Continuous Monitoring (TBD)

---

**Assumption**: You're running a Windows 7 machine.

The starter kits can be found in the _app\_\*_ folders. Each kit is documented according to:

1. The product intended to be created.
1. How the kit answers The Checklist.
1. What debugging capabilities are available.
1. What workflows are available (as instantiated in the `"scripts"` section of `package.json`).

Before diving into the individual kit, please look over the following:

1. _Windows System Setup_: If using Windows, the document shows how to install the following applications: Chocolatey, PowerShell, basic VSC setup, and, optionally, Yarn.
1. _VS Code Extensions_: Contains a list of the VSC extensions I've found useful. `vscodeextensions.bat` is meant to install all of them in one shot, sequentially. If using a \*nix-based system, just change the extension to `sh`.
1. _Checklist Overview_: In this document, each Checklist item is introduced with some answers with relatively recent sources. The responses are meant as a very general overview, with the sources meant to fill in some of the gaps. The technologies enumerated only represent what I was able to research at the time. In our fast-moving industry, these players might not exist by the time you read this. That's not important. What is important is that you understand what each Checklist item is meant to do when propping up a successfull modern web app.
1. _Configs_: This half-project-half-not contains base config files that are used throughout the actual boilerplate projects. Its `package.json` contains build scripts that are meant as references when creating your own or customizing those within the boilerplates.

There is another file I'm maintaining called _Weird Facts_, which is a collection of interesting things that I feel I might forget.

<!-- 12. ReactJS support
//Runtime dependencies
> npm install --save react react-dom eslint-plugin-react
> install-peerdeps eslint-plugin-react
If you want to avoid ES2015 class syntax:
> npm install create-react-class
Add Babel support for ReactJS
> npm install babel-preset-react -->
