# rollup-plugin-blacklist

rollup-plugin-blacklist is a rollup plugin that will prevent files matching a given pattern from being accidentally included in a bundle.

This module is inspired by [blacklistify](https://github.com/bjoerge/blacklistify) which does basically the same thing for browserify.

## Install

    yarn add --dev rollup-plugin-blacklist

or

    npm install --save-dev rollup-plugin-blacklist

## Use

    // rollup.config.js
    import blacklist from "rollup-plugin-blacklist";

    export default {
      input: "./src/index.js",
      plugins: [
        blacklist([/banned-module-name/, /other-banned-module-name/])
      ]
    };

If you are using multiple plugins, make sure you put rollup-plugin-blacklist before other ones that handle module resolution like rollup-plugin-node-resolve, otherwise it won't be able to see the names of the imported files.

## But why?

Say you're making two bundles - `worker.js` for your Web Worker and `main.js` for the rest of your code. If you keep all of the Web Worker code in a folder called `worker`, you can use rollup-plugin-blacklist to ensure that you don't accidentally include some of your Web Worker code in `main.js`.

You could use this to ensure your Web Worker code is not included in `main.js`:

    blacklist([/worker/])

And if you build your UI with React.js, you could use this to ensure that React.js is not included in your Web Worker:

    blacklist([/react/])
