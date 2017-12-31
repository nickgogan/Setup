# Technologies Overview

In this section, I'll be taking a look at some of the options available for each of The Checklist items. The various specialized projects are made based off of the options discussed in this doc.

# OS Prerequisites

All projects were set up according to _Windows System Setup_.

Some extra work is required for making **NodeJS** work on windows machines. A gist that discusses that is linked to the _NodeJS Setup_ section.

# Project Structure and Shells

The common, overarching project structure that all of these projects use go like this:

```
.git
.vscode
- dist/ -> Holds the public/distributable project
- docs/-> Holds auto-generated documentation for JS and Sass
- node_modules
- src/  -> Holds the stuff developers work on
README.md
...Various Config Files...
... .eslintrc ...
...Various Config Files...
```

Finer-grained descriptions, such as for _dist/_ are reserved for the project-specific sections. In some cases, it's best not to prescribe these at all, since they can change so rapidly based on new tech and best practices. I hope to showcase examples that are minimally-viable to achieve max flexibility.

The main shells are going to be the same for all of the projects. It will be those shells that were integrated into VSC as part of the _Windows System Setup_ section. Personally, I use **Cmder**, **PowerShell**, and, ocassionally, **GitBash**.

# Package Management - Managers

**Sources**:

1. https://docs.npmjs.com/
1. https://yarnpkg.com/lang/en/docs/
1. https://scotch.io/@brian_kimo/npm-vs-yarn
1. https://www.keycdn.com/blog/npm-vs-yarn/
1. https://medium.com/learnwithrahul/understanding-npm-dependency-resolution-84a24180901b
1. https://medium.com/@ericsimons/introducing-turbo-5x-faster-than-yarn-npm-and-runs-natively-in-browser-cc2c39715403
1. https://www.kochan.io/nodejs/why-should-we-use-pnpm.html

Options here include **npm** and **yarn**. Though there are others, such as **pnpm** or **Turbo**.

A note on **dependency management**: The reason **pnpm** exists is because the _npm tries to flatten the dependency tree as much as possible_. This can lead to quite a bit of duplication within a given project and across projects. Please read source 5 above to get an idea of how npm v3 (and above) handles dependencies. With that foundation in place, check out the last source to see how pnpm handles things.

# Package Management - Package Deprecation

**Sources**:

1. https://medium.freecodecamp.org/what-is-technical-debt-and-why-do-most-startups-have-it-9a54458daabf
1. https://greenkeeper.io/

As you may have noticed, we are working within a thriving language ecosystem that continuous generates more and more packages. We use that code as foundations to build our own solutions. This has positive and negative implications. The positives:

1. We're not reinventing the wheel, but using the best solutions out there for our language.
1. We get a usable product faster, which allows us to iterate and improve it faster.

Negatives:

1. Depdendencies change over time, sometimes in a way that breaks your product.
1. Dependencies add more code to your codebase, increasing the complexity of adding more code (refer Source 1).

# Package Management - Package Security

**Sources**:

1. https://medium.com/node-security/announcing-the-node-security-platform-28c99f872688
1. https://developers.redhat.com/blog/2017/04/12/using-snyk-nsp-and-retire-js-to-identify-and-fix-vulnerable-dependencies-in-your-node-js-applications/

The contenders here are **Node Security Platform (nsp)** and

# Automation with npm

**Sources**:

1. https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b
