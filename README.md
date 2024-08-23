<div align="center">
  <br>
 <img src="https://raw.githubusercontent.com/sinanbekar/browser-extension-react-typescript-starter/main/public/images/extension_128.png" alt="Browser Extension React & TypeScript Starter" width="128">
  <br>
  <h2>
    DOM change alerter
    <br>
  </h2>
</div>

<p align="center">A cross-platform (Chrome, Firefox, Edge, Opera, Brave) web browser extension (Manifest V3 and Manifest V2) for monitoring dom change on web pages (Test Task) </p>
<hr />

## Features

- **Instant HMR** (hot reload)
- Write once run on any browser
- Latest Manifest V3 support
- Manifest V2 support (beta)
- Dynamic manifest.json
- Includes ESLint configured to work with TypeScript and Prettier

#### Built with

- TypeScript
- Vite
- Jest
- ESLint
- Prettier
- simple-git-hooks (lightweight husky alternative)
- nano-staged

## Browser Support

| [![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](/) | [![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](/) | [![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](/) | [![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png)](/) | [![Brave](https://raw.github.com/alrra/browser-logos/master/src/brave/brave_48x48.png)](/) |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| ✔                                                                                             | ✔ (Beta)                                                                                         | ✔                                                                                       | ✔                                                                                          | ✔                                                                                          |

## Quick Start

Ensure you have

- [Node.js](https://nodejs.org) 16 or later installed
- [Yarn](https://yarnpkg.com) installed

#### Clone to local

Then run the following:

- `yarn install` to install dependencies.
- `yarn build` to build an unpacked extension.

- **Load extension in Chrome (Chromium, Manifest V3)**

  - Go to the browser address bar and type `chrome://extensions`
  - Check the `Developer Mode` button to enable it.
  - Click on the `Load Unpacked Extension` button.
  - Select your `dist` folder in the project root.

- **Load extension in Firefox (Manifest V2)**

  - Go to the browser address bar and type `about://debugger`
  - Click on the `Load Temporary Add-on` button.
  - Select your `dist-firefox-v2` folder in the project root.

### Available Commands

- `yarn clean` to remove dist folder. `build` command call this command.
- `yarn format` to fix code with eslint and prettier.
- `yarn lint` to call ESLint and Prettier.
