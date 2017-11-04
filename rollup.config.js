const pkg = require('./package.json');
const ractive = require('rollup-plugin-ractive-bin');
const buble = require('rollup-plugin-buble');
const uglify = require('rollup-plugin-uglify');

const prefix = 'RM';
const components = [ 'Table', 'Tabs', 'Window', 'Toggle', 'Card', 'Menu', 'Split', 'Shell', 'AppBar', 'JSONEditor' ];
const helpers = [ 'grid', 'button', 'form', 'event-keys', 'transition-expand', 'masked-input', 'scroll-spy' ]

let bundles = [];

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

bundles = bundles.concat(helpers.map(h => ({
  input: `src/${h}.js`,
  output: [
    {
      file: `umd/${h}.js`,
      format: 'umd',
      name: `${prefix}_${h.replace(/-/g, '_')}`
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
      name: `${prefix}_${h.replace(/-/g, '_')}`
    }
  ],
  globals: { ractive: 'Ractive' },
  external: [ 'ractive' ],
  plugins: [ buble(), uglify() ]
})));

module.exports = bundles;
