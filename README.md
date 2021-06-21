# Tab-Finder

![Logo](https://github.com/markusbink/tab-finder/blob/assets/tabfinder-logo.png)

Your one stop solution to manage your tab chaos.

## Problem

Ever found yourself opening one tab after another, especially while doing research, coding or just generally opening interesting stuff in new tabs? Then I'm sure you found yourself in the sitation where you were searching for the _one right tab_ that you need by just randomly clicking through your open tabs.

## Solution

Tab-Finder tries to combat this issue by providing a simple browser extension that lets you easily manage your tabs.

### Current Features

- Sort tabs via Drag-and-Drop
- Find tabs via a search-bar that matches the pages Title or URL
- See how many tabs you currently have open
- Go to tab by clicking on a singular tab-item
- Pin a tab by clicking the pin icon
- Toggle audio of tabs that play sound
- Close tabs by clicking on the x icon
- Change theme of the Popup (currently supporting dark and light theme)

### Future Features

- Select multiple tabs to group them
- Perform actions on multiple tabs at once
- Add Keyboard-Shorcuts

### Feature Requests

If you think a feature you would love is missing, feel free to contact me or create an issue.

## Installation

CD into the project directory and install all dependencies

```bash
  npm install OR
  yarn install
```

Build unpacked version of the extension

```bash
  npm run build OR
  yarn build
```

Open your browser and go to

```bash
chrome://extensions
```

Enable the `Developer mode`, click on `Load unpacked`and select the `build`folder inside the project directory.
