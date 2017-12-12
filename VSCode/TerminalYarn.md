# Setting up your integrated terminal in VS code

## Chocolatey - A package manager for Windows

Just like npm and all \*nix-based OS (MacOS, Linux, etc...), Windows has it's own package manager. It's like working with installers, but much more convenient.

To install, open up your current version of PowerShell (PS) and run as Admin:

`> Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString`

* **Test**: > choco -v
* Note: This will install in your ProgramData folder and will hold all of your packages there as well. If you don't have one, it'll make one for you.
* Source: https://chocolatey.org/install.ps1
  to Update: > choco upgrade chocolatey

## PowerShell (PS)

PowerShell is a product that comes packaged into _Microsoft's Windows Management Framework (WMF)_, the latest version of which is 5.1. Note that PowerShell (PS) and WMF share version numbers. WMF, and PS by extension, require .NET 4.5.2 or above to work, so check that that is installed on your machine before continuing. What's WMF? something that provides a consistent management interface across the various flavors of Windows and Windows Server.

`> choco install powershell`

* **Test**: Open up cmd > powershell . then, `> $Host.Version` , which should show 5.1 in a little table.
* Sanity preservation: Even though PS is not version 5.1, MS thought it wise to mess with us by keeping the folder name .../**v1.0**/powershell.exe. Do not let this mess with your head.
* Source: https://docs.microsoft.com/en-us/powershell/wmf/readme

---

We are now ready to integrate with VS Code.

## Cmder in VS Code

Obviously, disregards this section if you don't use Cmder...

To use this shell in VS Code, we need to make a `vscode.bat` file:

```
::Drop this file in your cmder directory (where Cmder.exe lives)
@echo off
SET CMDER_ROOT=C:\Progra~1\cmder
"%CMDER_ROOT%\vendor\init.bat"
```

* Note: cmd doesn't like spaces in paths, so we have to use the alias `Progra~1` for 'Program Files'.

Place this .vscode.bat file in your cmder path. Mine is `C:\Program Files\cmder\`.

Then, in User Settings, add this:

```
"terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe",
"terminal.integrated.shellArgs.windows": [
"/K",
"C:\\Program Files\\cmder\\vscode.bat"
],
```

Reload and it should appear more or less like Cmder. If the terminal doesn't automatically appear on startup, call it using Ctrl+`.

## PowerShell Integrated with VS Code

Open your User Settings using `Ctrl+`, and search for `'terminal.integrated.shell.windows'` in the left pane. It'll come up with a Windows path to the powershell.exe file. In the left gutter, you'll see a pencil. Click that pencil and choose 'Replace in settings'. It'll then appear on the right pane, where you can tell VS Code the path to the PS shell. It still thinks it's special though, so you have to put in the path like this: `"C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe".`

## Adding More Terminals

1. Download the **'Shell Launcher'** and reload VS Code.
2. Go to _User Settings_ and search `'shellLauncher.shells.windows'`. Copy it over to the right pane to set your own settings based on the format you see. Optionall, you can grab the settings from my `User Settings.json`.
3. _Optional_: set up a keybinding to bring it up quickly.

---

# Optional

I've found the following to be nice-to-have's, but not critical to running.

## Yarn

Yarn is a competitor of npm's and is developed by teams in Google and Facebook, among others.

Install Yarn using chocolatey:
`> choco install Yarn`

Within a new PS instance, check using `> yarn -v`

Yarn works with the same package.json, but has some nice extra features, including:

* Faster install times, on average
* Guarantees for getting exactly the same dependency files on each machine (no more 'but it works on my machine!' excuses.
* Ability to locally cache all packages downloaded! This means you can develop w/out an Internet connection, so long as you've downloaded the needed npm package at least once before.

### Setting up an offline mirror

Now that you've verified that Yarn is good to go, let's set up your local npm packages repo.

Begin by taking a minimal packages.json file and run `> yarn init` on it. This will generate the `yarn.lock` file, which is basically Yarn's version of package.lock.json.

Time to set up the yarn config file:
`> yarn config set yarn-offline-mirror "C:\A.Project0\PersonalTools\A. Setup\yarn-offline-mirror"`

I'm setting it up so that all my projects's dependencies can be stored into a single, OS-wide library. The plan is to zip up this folder to compress it further and then upload it to GitHub (or w/ever) along with my minimal project config files. This kind of bundling guarantees that all of my projects start from a point that is known to work.

What's inside this folder anyway? It's each package compressed as tarballs - a \*nix-universal format for packages that is compact and relatively fast to distribute.

Offline mirror does not come with the ability to remove these tarballs if we choose to. In order to keep the cache folder up to date, you need to add the following to the config file:

> yarn config set yarn-offline-mirror-pruning true\
> This is not desirable if you want to have a multi-project local repo. This is because not all
> projects will use all of the packages from it. If you run > yarn remove on a package from one
> project, it won't delete the file from the local folder. It will just remove the referene to it from
> the current project. This means that removing the package from project A won't mess with project
> B, which still uses it.

In a nutshell, to enable _Offline mirror_ for your project you need:

* Add “yarn-offline-mirror” configuration to .yarnrc file
* Generate a new yarn.lock with “yarn install” command

To test that this works:

1. Clear your global cache with `> yarn cache clean`
2. Turn off your wifi.
3. Run `> yarn install –offline`. The `-offline` flag will make sure yarn does not reach out to the network

Once verified that this works as expected, you can then zip the folder up periodically and
upload to GitHub to keep track of exactly the code you need. That way, if any breaking changes
are introduction in some of your dependencies, you can pull from your own sources to keep on trucking. You buy yourself time and peace of mind.
