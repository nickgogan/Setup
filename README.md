* [TODO](#todo)
* [Setup](#setup)
  * [The foundation for all of my web development projects.](#the-foundation-for-all-of-my-web-development-projects)
* [Please read the Documentation/\* files in the following order:](#please-read-the-documentation-files-in-the-following-order)
  * [Round 0](#round-0)
* [Round 1](#round-1)
* [Round 2](#round-2)
* [Round 3](#round-3)
* [Round 4](#round-4)

# TODO

Move all personal files to a separate repo.

1. _Browser/_: This is a collection of browser snippets I put together from various online resources. These won't be used in this tutorial series, so feel free to get rid of them now.
1. _docs/_: This directory is automatically made later on, so it can go for now.
1. _Documentation/_: The files containing this tutorial, so you won't be needing that.
1. _node_modules/_ and _yarn-offline-mirror/_: You'll need to eventually run `> npm install` or `> yarn install`, so get rid of these. _yarn-offline-mirror/_ is my local, offline dependencies folder that I mainain for my system. You probably want to make your own.

# Setup

## The foundation for all of my web development projects.

Inspired by the following sources:

1. The JavaScript Starter Kit Manifesto:
   https://www.youtube.com/watch?v=jubd2opc4Ps

2. Building a JavaScript Development Environment:
   https://app.pluralsight.com/library/courses/javascript-development-environment/table-of-contents

3. PluralSight - Visual Studio Code:
   https://app.pluralsight.com/library/courses/visual-studio-code/table-of-contents

---

**Assumption**:

1. You're running a Windows 7 machine.

# Please read the Documentation/\* files in the following order:

## Round 0

1. _System Setup_: Chocolatey, PowerShell, basic VSC setup, and, optionally, Yarn.

1. _VS Code Extensions_: A list of the VSC extensions I've found useful. `vscodeextensions.bat` is meant to install all of them in one shot, sequentially.

# Round 1

1. _General Project Setup_: A description of the supported projects and their commonalities.
1. _Common Technologies_ : A description of those technologies that are used throughout the supported projects.

# Round 2

1. Automated workflows using npm scripts
1. Bundling with Webpack

<!-- 12. ReactJS support
//Runtime dependencies
> npm install --save react react-dom eslint-plugin-react
> install-peerdeps eslint-plugin-react
If you want to avoid ES2015 class syntax:
> npm install create-react-class
Add Babel support for ReactJS
> npm install babel-preset-react -->

# Round 3

1. HTTP calls and mocking
1. Adding a test suite

# Round 4

1. Continuous integration
1. Continuous delivery
