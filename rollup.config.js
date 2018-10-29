const pkg = require('./package.json');
const fs = require('fs');
const ractive = require('rollup-plugin-ractive-bin');
const buble = require('rollup-plugin-buble');
const uglify = require('rollup-plugin-uglify');
const resolver = require('rollup-plugin-import-resolver');

const prefix = 'RM';

const components = fs.readdirSync('./src')
  .filter(f => /\.ractive\.html$/.test(f))
  .map(f => f.replace(/\.ractive\.html$/, ''));
const helpers = fs.readdirSync('./src')
  .filter(f => /\.js$/.test(f))
  .map(f => f.replace(/\.js$/, ''));

const resolve = resolver({
  extensions: ['.js', '.ractive.html']
});

let bundles = [];

if (process.env.NODE_ENV !== 'dev') {
  bundles = bundles.concat(
    helpers.map(h => ({
      input: `src/${h}.js`,
      output: [
        {
          file: `umd/${h}.js`,
          format: "umd",
          name: `${prefix}${h[0].toUpperCase()}${h
            .substr(1)
            .replace(/-(.)/g, (o, v) => v.toUpperCase())}`,
          globals: { ractive: "Ractive" },
          exports: "named"
        }
      ],
      external: ["ractive"],
      plugins: [buble()],
      watch: { clearScreen: false }
    }))
  );

  bundles = bundles.concat(
    helpers.map(h => ({
      input: `src/${h}.js`,
      output: [
        {
          file: `umd/${h}.min.js`,
          format: "umd",
          name: `${prefix}${h[0].toUpperCase()}${h
            .substr(1)
            .replace(/-(.)/g, (o, v) => v.toUpperCase())}`,
          globals: { ractive: "Ractive" },
          exports: "named"
        }
      ],
      external: ["ractive"],
      plugins: [buble(), uglify()],
      watch: { clearScreen: false }
    }))
  );

  bundles = bundles.concat(
    components.map(c => ({
      input: `src/${c}.ractive.html`,
      output: [
        {
          file: `umd/${c}.js`,
          format: "umd",
          name: `${prefix}${c}`,
          globals: { ractive: "Ractive" },
          exports: "named"
        }
      ],
      external: ["ractive"],
      plugins: [ractive(), buble(), resolve],
      watch: { clearScreen: false }
    }))
  );

  bundles = bundles.concat(
    components.map(c => ({
      input: `src/${c}.ractive.html`,
      output: [
        {
          file: `umd/${c}.min.js`,
          format: "umd",
          name: `${prefix}${c}`,
          globals: { ractive: "Ractive" },
          exports: "named"
        }
      ],
      external: ["ractive"],
      plugins: [ractive(), buble(), uglify(), resolve],
      watch: { clearScreen: false }
    }))
  );
}

// Demo
if (process.env.DEMO !== 'no') {
  bundles.push({
    input: ['demo-src/index.js']
      .concat(
        fs.readdirSync('./demo-src/views')
          .filter(e => /\.ractive\.(html|md)$/.test(e))
          .map(e => `./demo-src/views/${e}`)
      ),
    output: {
      dir: 'demo/build',
      format: 'system',
      globals: { ractive: 'Ractive' }
    },
    experimentalCodeSplitting: true,
    experimentalDynamicImport: true,
    plugins: [
      ractive({
        include: ['**/*.ractive.html'],
        interpolate: { marked: false, md: false },
        preserveWhitespace: { marked: true, md: true }
      }),
      buble(),
      resolver({
        extensions: ['.js', '.ractive.html'],
        alias: {
          'cmp': './src'
        }
      })
    ],
    watch: { clearScreen: false },
    external: ['ractive']
  });
}

bundles.push({
  input: 'demo-src/dev.js',
  output: {
    file: 'demo/build/dev/index.js',
    format: 'iife',
    globals: { ractive: 'Ractive' }
  },
  plugins: [
    ractive({
      include: ['**/*.ractive.html']
    }),
    buble(),
    resolver({
      extensions: ['.js', '.ractive.html'],
      alias: {
        cmp: './src'
      }
    })
  ],
  watch: { clearScreen: false },
  external: ['ractive']
});

module.exports = bundles;
