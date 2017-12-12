# Setting up your integrated terminal in VS code

## Chocolatey - A package manager for Windows

Windows users got tired of using executables and wanted a package manager, like those available in \*nix-based OS's(MacOS, Linux, etc...). You can think of it as npm, but for Windows programs - It's like working with installers, but much more convenient. **Read**: https://chocolatey.org/about

To install, open up your current version of PowerShell (PS) _as an Admin_:

`> Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString`

* **Test**: `> choco -v`
* **Update**: `> choco upgrade chocolatey`
* Note: This will install in your _ProgramData_ folder and will hold all of your packages there as well. If you don't have one, it'll make one for you.
* Source: https://chocolatey.org/install.ps1

## PowerShell (PS)

**PowerShell** is a product that comes packaged into Microsoft's _Windows Management Framework (WMF)_, the latest version of which is 5.1. Note that PowerShell (PS) and WMF share version numbers. WMF, and PS by extension, **require _.NET 4.5.2_** or above to work, so check that that is installed on your machine before continuing. What's WMF? Something that provides a consistent management interface across the various flavors of Windows and Windows Server.

`> choco install powershell`

* **Test**: Open up **cmd** `> powershell` . then, `> $Host.Version` , which should show 5.1 in a little table.
* Sanity preservation: Even though PS is not version 5.1, MS thought it wise to mess with us by keeping the folder name .../**_v1.0_**/powershell.exe. Do not let this mess with your head.
* Source: https://docs.microsoft.com/en-us/powershell/wmf/readme

---

We are now ready to integrate with VS Code.

## Option 1 (Cmder)

Obviously, disregards this section if you don't use Cmder...

To use this shell in VS Code, we first need to make a `vscode.bat` file:

```
::Drop this file where Cmder.exe lives
@echo off
SET CMDER_ROOT=C:\Progra~1\cmder
"%CMDER_ROOT%\vendor\init.bat"
```

* Note: cmd doesn't like spaces in paths, so we have to use the alias `Progra~1` for 'Program Files'.

Place this .vscode.bat file in your cmder path. Mine is `C:\Program Files\cmder\`.

Then, in _User Settings_, search for `"terminal.integrated.shell.windows"`. Click on the gutter next to it and it will copy to the right pane, allowing you to input a custom value for it as so:
`"terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe",`

Then, in the same left pane, search for `"terminal.integrated.shellArgs.windows"`, hit the gutter to input your own value and add:

`"terminal.integrated.shellArgs.windows": [ "/K", "C:\\Program Files\\cmder\\vscode.bat" ],`

Reload VS Code and it should appear more or less like Cmder. If the terminal doesn't automatically appear on startup, call it using **Ctrl+`**.

## Option 2 (PowerShell)

Open your _User Settings_ using **Ctrl+,** and search for `'terminal.integrated.shell.windows'` in the left pane. It'll come up with a Windows path to the cmd.exe file. Modify it as above with the path to your PS, such as (for 64bit Windows): `"C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe".`

You may have noticed that you are replacing Cmder here with PowerShell...You could set it up this way and just keep 1 shell. But, there is another way, which allows you to keep both and then some.

## Adding More Terminals

Download the **Shell Launcher** extension (`> code --install-extension Tyriar.shell-launcher`) and reload.

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

_Optional_: set up a keybinding to bring it up quickly.

## Option 3 (Both)

You may have noticed that my shellLauncher config points to PS itself. This is because I set up my default terminal to point to cmder and use shellLauncher for PS and GitBash.

To get here, just follow Option 1 and skip Option 2. That part gets taken care of in the 'Adding More Terminals' section.

---

# Optional

I've found the following to be nice-to-have's, but not critical to running.

## Yarn

Yarn is a competitor of npm's and is developed by teams in Google and Facebook, among others.

Install Yarn using chocolatey:
`> choco install Yarn`

Within a new PS instance, check using `> yarn -v`

Yarn works with the same package.json, but has some nice extra features, including:

* Faster install times, on average.
* Guarantees for getting exactly the same dependency files on each machine (no more 'but it works on my machine!' excuses.
* Ability to locally cache all packages downloaded! This means you can develop w/out an Internet connection, so long as you've downloaded the needed npm package at least once before.

### Setting up an _offline mirror_

Now that you've verified that Yarn is good to go, let's set up your local npm packages repo.

Begin by taking a minimal packages.json file and run `> yarn init` on it. This will generate the `yarn.lock` file, which is basically Yarn's version of package.lock.json.

Time to set up the yarn config file:
`> yarn config set yarn-offline-mirror "C:\A.Project0\PersonalTools\A. Setup\yarn-offline-mirror"`

I'm setting it up so that all my projects's dependencies can be stored into a single, OS-wide library. The plan is to zip up this folder to compress it further and then upload it to GitHub (or w/ever) along with my minimal project config files. This kind of bundling guarantees that all of my projects start from a point that is known to work.

What's inside this folder anyway? It's each package, compressed as tarballs - a \*nix-universal format for packages that is compact and relatively fast to distribute.

Offline mirroring does not come with the ability to automatically remove these tarballs if we choose to (e.g. If you delete off of a project, the file will remaing. This can be a good thing, since not all projects will use the same set of dependencies). In order to keep the cache folder up to date, you need to add the following to the config file:

`> yarn config set yarn-offline-mirror-pruning true\`

_This is not desirable if you want to have a multi-project local repo_. This is because not all projects will use all of the packages from it. If you run `> yarn remove` on a package from one project, it won't delete the file from the local folder. It will just remove the referene to it from the current project. This means that removing some package from project A won't mess with project B, which still uses it.

In a nutshell, to enable Offline mirror for your project you need to:

* Add “yarn-offline-mirror” configuration to `.yarnrc` file.
* Generate a new yarn.lock with the `> yarn install` command.

To test that this works:

1. Clear your global cache with `> yarn cache clean`
2. Turn off your wifi.
3. Run `> yarn install –offline`. The `-offline` flag will make sure yarn does not reach out to the network

Once verified that this works as expected, you can then zip the folder up periodically and
upload to GitHub to keep track of exactly the code you need. That way, if any breaking changes
are introduced in some of your dependencies, you can switch to your own, local sources to keep on trucking. You buy yourself time and peace of mind.
