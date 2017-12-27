This doc assumes that you've completed the steps in the _System setup_.

We'll be going over:

1. Setting a workling project structure.
1. Implementing language-specific features in Visual Studio Code (VSC).
1. Setting up a minimal JS/TS development environment (DevEnv).

# Minimal Project Structure

You'll notice that this repo has way more things in it than a minimal project. This is the case because I wanted to provide a foundation for a few possible projects:

1. Static web sites
1. NodeJS/Express apps
1. React apps

Just delete the ones that don't correspond with the project you want to do. Here's a list of other stuff to eventually delete:

1. _Browser/_: This is a collection of browser snippets I put together from various online resources. These won't be used in this tutorial series, so feel free to get rid of them now.
1. _docs/_: This directory is automatically made later on, so it can go for now.
1. _Documentation/_: The files containing this tutorial, so you won't be needing that.
1. _node_modules/_ and _yarn-offline-mirror/_: You'll need to eventually run `> npm install` or `> yarn install`, so get rid of these. _yarn-offline-mirror/_ is my local, offline dependencies folder that I mainain for my system. You probably want to make your own.

The config files that are at the root of the repo, like `.babelrc` or `.eslintrc`, work across the board for all projects, so they can remain there.
