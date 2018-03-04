const pkg = require('./package.json');
const ractive = require('rollup-plugin-ractive-bin');
const buble = require('rollup-plugin-buble');
const uglify = require('rollup-plugin-uglify');

const prefix = 'RM';
const components = [ 'Table', 'Tabs', 'Window', 'Toggle', 'Card', 'Menu', 'Split', 'Shell', 'AppBar', 'JSONEditor' ];
const helpers = [ 'grid', 'button', 'form', 'event-click', 'event-keys', 'event-swipe', 'transition-expand', 'masked-input', 'scroll-spy', 'ace-editor' ]

let bundles = [];

bundles = bundles.concat(helpers.map(h => ({
  input: `src/${h}.js`,
  output: [
    {
      file: `umd/${h}.js`,
      format: 'umd',
      name: `${prefix}${h[0].toUpperCase()}${h.substr(1).replace(/-(.)/g, (o, v) => v.toUpperCase())}`
    },
    {
      file: `es/${h}.js`,
      format: 'es'
    }
  ],
  globals: { ractive: 'Ractive' },
  external: [ 'ractive' ],
  plugins: [ buble() ]
})));

bundles = bundles.concat(helpers.map(h => ({
  input: `src/${h}.js`,
  output: [
    {
      file: `umd/${h}.min.js`,
      format: 'umd',
      name: `${prefix}${h[0].toUpperCase()}${h.substr(1).replace(/-(.)/g, (o, v) => v.toUpperCase())}`
    }
  ],
  globals: { ractive: 'Ractive' },
  external: [ 'ractive' ],
  plugins: [ buble(), uglify() ]
})));

bundles = bundles.concat(components.map(c => ({
  input: `src/${c}.ractive.html`,
  output: [
    {
      file: `umd/${c}.js`,
      format: 'umd',
      name: `${prefix}${c}`
    },
    {
      file: `es/${c}.js`,
      format: 'es'
    }
  ],
  globals: { ractive: 'Ractive' },
  external: [ 'ractive' ],
  plugins: [ ractive(), buble() ]
})));

bundles = bundles.concat(components.map(c => ({
  input: `src/${c}.ractive.html`,
  output: [
    {
      file: `umd/${c}.min.js`,
      format: 'umd',
      name: `${prefix}${c}`
    }
  ],
  globals: { ractive: 'Ractive' },
  external: [ 'ractive' ],
  plugins: [ ractive(), buble(), uglify() ]
})));

module.exports = bundles;
