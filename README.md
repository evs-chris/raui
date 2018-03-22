# RaUI

This collection of components and plugins is handy for making desktop- and mobile-friendly frontend applications with [Ractive](https://ractive.js.org). They try to stay somewhat close to [Material](https://material.io/) by default where it makes sense.

__Note:__ This is still very much a work in progress. The components here are fairly complete and in use in a number of projects, but the documentation, build, and testing setups are certainly incomplete to missing entirely.

## Building

```sh
# Clone the repositoy
git clone https://github.com/evs-chris/raui.git raui
cd raui
# or wherever you cloned
npm install

# now you have options:

# 1. run the dev server, which is light and watches for changes
npm run dev

# 2. run a build, which just builds the world and exits
npm run build

# 3. run the watch server, which builds the world and watches for changes
npm run watch

# for kicks, to switch ports
PORT=2929 npm run dev
```


Hopefully you're in a POSIX-ish environment, so a Linux shell, and OS X shell, or a git bash or WSL shell on Windows. Windows CMD or PowerShell users, well, I'm sorry. The default dev port is 3000, but you can change it with the `PORT` environment variable.

## Documentation

The currently-in-progress demo/docs are available at https://evs-chris.github.io/raui/demo or in the `demo` and `demo-src` directories of this repo.
