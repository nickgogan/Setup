# (Windows) System-Wide Setup

#### Published on: December 26th, 2017

## Chocolatey - A package manager for Windows

### Sources:

1. https://chocolatey.org/about
1. https://chocolatey.org/install

Windows users got tired of using executables and wanted a package manager, like those available in \*nix-based OS's (MacOS, Linux, etc...). You can think of it as npm, but for Windows programs. It's like working with installers, but much more convenient.

You can install with either cmd or PowerShell (v2+), depending on what you currently have. The current version of powershell (check the top of this article for the pubication date) is `5.1`. To test if yours meets the minimum version requirement, run this inside a PowerShell instance:
`> $PSVersionTable.PSVersion`.

* **Install**

  * With cmd _as Admin_: `> @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"`

  - With PowerShell _as Admin_: `Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))`

- **Test**: `> choco -v`
- **Update**: `> choco upgrade chocolatey`

Note: This will install in your `C:\ProgramData\` folder and will hold all of your packages there as well. If you don't have one, it'll make one for you.

## PowerShell (PS)

**Sources:**

1. https://docs.microsoft.com/en-us/powershell/wmf/readme

In the course of installing Chocolatey, you may have found that your version of PowerShell (PS) is completely out of date. In this section, we'll dive into how we can use **Chocolatey** to update PS.

**PowerShell** is a product that comes packaged into Microsoft's _Windows Management Framework (WMF)_, the latest version of which is 5.1. Note that PS and WMF share version numbers. WMF, and PS by extension, **require _.NET 4.5.2_** or above to work, so check that that is installed on your machine before continuing. What's WMF? Something that provides a consistent management interface across the various flavors of Windows and Windows Server. I'm sure it's very useful, but we're only interested in the PS portion of that package in this article.

* **Install**: `> choco install powershell`
* **Test**: Open up **cmd** `> powershell` . then, `> $Host.Version` , which should show 5.1 in a little table.

_Sanity preservation_: Even though PS is now version 5.1, Microsoft thought it wise to mess with us by keeping the install folder name as .../**_v1.0_**/powershell.exe. Don't let this keep you up at night.

## IDE - Visual Studio Code (VSC)

VSC is an open-source project from Microsoft and it's great. You'll see over the course of this setup that it's great. For now, just take my word for it and install it: https://code.visualstudio.com/

We'll be integrating your system's terminal into VSC so you don't have to switch contexts so often. Now, I have written about a couple of options to choose from:

1. Integrating Cmder
1. Integrating PS
1. Integrating both

Just scroll down to the section that pertains to you.

## Option 1: Cmder

**Sources:**

1. https://github.com/Microsoft/vscode/issues/12006 (kemotoe's comment)

Obviously, disregards this section if you don't use Cmder...If you want to check out this project, then go here: http://cmder.net/

To make it work with VSC, we need some work, but it's not too bad. Just follow along - we first need to make a `vscode.bat` file:

```
::Drop this file where Cmder.exe lives
@echo off
SET CMDER_ROOT=C:\Progra~1\cmder
"%CMDER_ROOT%\vendor\init.bat"
```

* **Note**: Terminals like cmd or PS don't like spaces in paths, so we have to use the alias `Progra~1` for 'Program Files'. Putting the path string in quotes sometimes just doesn't work, which is why aliases for important system paths exist.

Place this `.vscode.bat` file in your cmder path. Mine is `C:\Program Files\cmder\`.

Then, in VSC's _User Settings_, search for `"terminal.integrated.shell.windows"`. Click on the gutter next to it and it will copy to the right pane, allowing you to input a custom value for it as so:
`"terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe",`

Then, in the same left pane, search for `"terminal.integrated.shellArgs.windows"`, hit the gutter to input your own value and add:

`"terminal.integrated.shellArgs.windows": [ "/K", "C:\\Program Files\\cmder\\vscode.bat" ],`

Reload VS Code and it should appear more or less like Cmder. If the terminal doesn't automatically appear on startup, call it using **Ctrl+`**.

## Option 2: PS

If, instead of cmder, you want to integrate PS, then follow this section.

Open your _User Settings_ using **Ctrl+,** and search for `'terminal.integrated.shell.windows'` in the left pane. It'll come up with a Windows path to the cmd.exe file. Modify it as above with the path to your PS, such as (for 64bit Windows): `"C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe".`

## Option 3: Integrating Both by Adding More Terminals

My personal favorite is to integrate Cmder as the default shell that VSC will open upon starting up. Then, if we wish, we can call up a PS instance using a VSC extension that allows for setup of any number of different shells.

First, download the **Shell Launcher** extension (`> code --install-extension Tyriar.shell-launcher`) and reload VSC. If you haven't created a keybinding for this yet, I suggest reading up on how to do that: https://code.visualstudio.com/docs/getstarted/keybindings
You could also just grab my `keybindigs.json` and hit **Ctrl+F5**.

Go to _User Settings_ and search `'shellLauncher.shells.windows'` to modify as you need. Here's my example:

```
  ...
  "shellLauncher.shells.windows": [
    {
      "shell": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
      "label": "PowerShell"
    },
    {
      "shell": "C:\\Program Files\\Git\\bin\\bash.exe",
      "label": "Git bash"
    }
  ],
  ...
```

You may have noticed that my shellLauncher config points to PS itself. This is because I set up my default terminal to point to cmder and use shellLauncher for PS and GitBash.

_Optional_: set up a keybinding to bring it up quickly. Mine is **Ctrl+Shift+t**.

---

# Optional

I've found the following to be nice-to-have's, but not critical to running.

## Matching VSC

In the _VSCode_ folder, run the `vscodeextensions.bat` file to install the same extensions that I have. `keybindings.json` and `settings.json` files might also be useful for you, so feel free to take whatever you like from there. `github-markdown.css` makes VSC show you Markdown previews that approximate what you'd get on GitHub, since that's the primary distribution platform I'm writing for. If you really wanna copy my setup, I also included the theme file I use `Ayu Mirage Mod-color-theme.json`, which I slightly modified for myself. The font my IDE uses is called _FiraCode_: https://github.com/tonsky/FiraCode

The _snippets_ folder contains exactly what it sounds. Note that `html.json/HTML5BP` contains a webpage boilerplate that was taken from the latest version of the HTML5 Boilerplate project (v6.0.1).

The _debug-configs_ folder contains VSC configurations for debugging workflows. `node(mon).json` contains Launch and Attach processes for working with NodeJS using nodemon.

Once you've got everything you want out of this directory, get rid of it.

## Yarn

**Sources:**

1. https://yarnpkg.com/lang/en/docs/install/
1. https://app.pluralsight.com/library/courses/play-by-play-yarn-package-manager/table-of-contents

Yarn is a competitor of npm's and is developed by teams in Google and Facebook, among others.

* **Install**: `> choco install Yarn`

* **Test**: Within a new PS instance, check using `> yarn -v`

Yarn works with the same package.json, but has some nice extra features, including:

* Faster install times, on average.
* Guarantees for getting exactly the same dependency files on each machine (no more 'but it works on my machine!' excuses).
* Ability to locally cache all packages downloaded! This means you can develop w/out an Internet connection, so long as you've downloaded the needed npm package at least once before. You can set up an offline repo for your system that all projects can pull subsets from.

### Setting up an _offline mirror_

Now that you've verified that Yarn is good to go, let's set up your local npm packages repo.

Begin by taking a minimal packages.json file and run `> yarn init` on it. This will generate the `yarn.lock` file, which is basically Yarn's version of package.lock.json.

Time to set up the yarn config file to point to wherever you want that local dependencies repo to live on your machine:
`> yarn config set yarn-offline-mirror "C:\A.Project0\PersonalTools\A.Setup\yarn-offline-mirror"`

I'm setting it up so that all my projects's dependencies can be stored into a single, OS-wide library. The plan is to zip up this folder to compress it further and then upload it to GitHub (or w/ever) along with my minimal project config files. This kind of bundling guarantees that all of my projects start from a point that is known to work, dependency-wise.

What's inside this folder anyway? It's each package, compressed as tarballs - a \*nix-universal format for packages that is compact and relatively fast to distribute.

Offline mirroring does not come with the ability to automatically remove these tarballs if we choose to (e.g. If you delete off of a project, the file will remain. This can be a good thing, since not all projects will use the same set of dependencies). If you want this functionality, you need to add the following to the config file:

`> yarn config set yarn-offline-mirror-pruning true\`

_This is not desirable if you want to have a multi-project local repo_. This is because not all projects will use all of the packages from it. If you run `> yarn remove` on a package from one project, it won't delete the file from the local folder. It will just remove the referene to it from the current project. This means that removing some package from project A won't mess with project B, which still uses it.

In a nutshell, to enable Offline mirror for your project you need to:

* Add “yarn-offline-mirror” configuration to `.yarnrc` file.
* Generate a new yarn.lock with the `> yarn install` command.

**Test**:

1. Clear your global cache with `> yarn cache clean`
2. Turn off your wifi.
3. Run `> yarn install –offline`. The `-offline` flag will make sure yarn does not reach out to the network

Once verified that this works as expected, you can then zip the folder up periodically and
upload to GitHub to keep track of exactly the dependencies you need. This way, if any breaking changes
are introduced in some of your dependencies, you can switch to your own, local sources to keep on trucking. You buy yourself time and peace of mind.
