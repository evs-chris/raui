import globalRegister from './globalRegister';
import { sized } from './watch-size';

let el;
function sizer() {
  if (!el) {
    el = document.createElement('div');
    document.body.appendChild(el);
  }
  return el;
}

const defaults = {
  tiny: {
    units: [ 2, 3, 4, 5, 6, 8 ],
    max: '0',
    value: 0
  },
  xsmall: {
    units: [ 2, 3, 4, 5, 6, 8, 10, 12 ],
    max: '20em',
    prefix: 'xs',
    value: 10
  },
  small: {
    units: [ 2, 3, 4, 5, 6, 8, 10, 12 ],
    max: '36em',
    value: 20
  },
  medium: {
    units: [ 2, 3, 4, 5, 6, 8, 10, 12 ],
    max: '48em',
    value: 30
  },
  large: {
    units: [ 2, 3, 4, 5, 6, 8, 10, 12, 16, 20 ],
    max: '64em',
    value: 40
  },
  xlarge: {
    units: [ 2, 3, 4, 5, 6, 8, 10, 12, 16, 20 ],
    max: '100em',
    value: 50
  },
  ginormous: {
    units: [ 2, 3, 4, 5, 6, 8, 10, 12, 16, 20 ],
    max: '150em',
    value: 60
  }
}

const regexps = { 'grid grid-root': /\bgrid grid-root\b/g };
const spaces = /\s+/g;
export function grid(node, options) {
  const ctx = this.getContext(node);
  const owner = this;
  let points;
  let opts = options || {};
  let breaks;

  function resize(size) {
    if (typeof opts.offset === 'number') size -= opts.offset;
    if (!opts.type || opts.type === 'class') {
      let cls = node.className;
      let max = -1;
      let match;
      const matches = [];
      for (const k in points) {
        regexps[k].lastIndex = -1;
        if (points[k] <= size) {
          if (!regexps[k].test(cls)) cls += ` ${k}`;
          if (points[k] > max) {
            max = points[k];
            match = k;
            matches.push(match);
          }
        } else {
          cls = cls.replace(regexps[k], '').trim();
        }
      }

      node.className = cls.replace(spaces, ' ');

      if (!match) return;

      if (opts.value) ctx.set(opts.value, breaks[match].value);
      if (opts.name) ctx.set(opts.name, match);
      if (opts.size) ctx.set(opts.size, size);
      if (opts.max) ctx.set(opts.max, max);
      if (opts.classes) ctx.set(opts.classes, matches.join(' '));
      if (opts.matches) ctx.set(opts.matches, matches);
    }
  }

  function settings() {
    const s = sizer();
    breaks = owner.get('@style.break') || defaults;
    points = {};
    for (const k in breaks) {
      s.style.width = breaks[k].max;
      points[k] = s.clientWidth;
      if (!regexps[k]) regexps[k] = new RegExp(`\\b${k}\\b`, 'g');
    }
    s.style.width = 0;
    resize(node.clientWidth);
  }

  const observer = this.observe('@style.break', settings, { init: false });
  const listener = ctx.observe('@local.width', resize, { init: false });
  const watcher = sized.call(this, node, { clientWidth: '@local.width' });

  node.className += ' grid grid-root';
  if (opts.immediate) settings();
  else requestAnimationFrame(settings);

  return {
    update(options) {
      // TODO: if type changes, undo whatever the original did first
      opts = options || {};
      requestAnimationFrame(() => resize(node.clientWidth));
    },
    teardown() {
      node.className = node.className.replace(regexps['grid grid-root'], '').trim();
      listener.cancel();
      observer.cancel();
      watcher.teardown();
    }
  };
}

export function style(data, optDefaults) {
  const defs = data('raui.grid.break') || optDefaults || defaults;
  const wrappers = (data('raui.grid.wrappers') || ['.row-wrap > ', '.row-wrap > .row-wrap > ']).slice();
  wrappers.unshift('');

  let out = `.row > * { position: relative; width: 100%; transition-duration: 0.2s; transition-timing-function: ease-in-out; transition-property: padding, margin; box-sizing: border-box; }
.grid { display: block; }
.grid .row { display: flex !important; flex-wrap: wrap; min-height: fit-content; width: 100%; align-content: flex-start; }
.grid .row.row-pad > * { padding: ${data('raui.grid.padding') || '0.5em'}; }
.grid .row > .pad { display: flex; flex-direction: column; padding: ${data('raui.grid.padding') || '0.5em'}; box-sizing: border-box; }`;

  const points = Object.keys(defs).map(k => (defs[k].key = k) && defs[k]);
  points.sort((l, r) => l.value > r.value ? 1 : l.value < r.value ? -1 : 0);

  points.forEach(size => {
    const name = size.prefix || size.key[0];
    const map = {};

    size.units.forEach(u => {
      for (let i = 1; i < u; i++) {
        let pc = '' + ((i / u) * 100);
        pc = pc.substr(0, pc.indexOf('.') + 3);
        if (!map[pc]) map[pc] = [];
        map[pc].push(`${i}-${u}`);
      }
    });

    const s = size.key;

    out += `
${[wrappers.map(w => `.${s} > ${w}.${name}1, .${s} > ${w}.row > .${name}1`).join(', '), `.${s} .${name}-n1, .${s} .row-${name}-n1 > *`].filter(x => x).join(', ')} { display: ${data('raui.grid.display') || 'inline-block'}; width: 100%; flex-grow: 0; flex-shrink: 0; }
${[wrappers.map(w => `.${s} > ${w}.${name}0, .${s} > ${w}.row > .${name}0`).join(', '), `.${s} .${name}-n0, .${s} .row-${name}-n0 > *`].filter(x => x).join(', ')} { display: none; flex-grow: 0; flex-shrink: 0: }
${Object.keys(map).map(pc => `${map[pc].map(fraction => `${[wrappers.map(w =>
  `.${s} > ${w}.row-${name}${fraction} > *, .${s} > ${w}.${name}${fraction}, .${s} > ${w}.row > .${name}${fraction}`).join(', '), `.${s} .row-${name}-n${fraction} > * .row > .${name}-n${fraction}, .${s} .${name}-n${fraction}, .${s} .row-${name}-n${fraction} > *`].filter(x => x).join(', ')}`).join(', ')} { display: ${data('raui.grid.display') || 'inline-block'}; width: ${pc}%; flex-grow: 0; flex-shrink: 0; }`
).join('\n')}
${[wrappers.map(w => `.${s} > ${w}.row > ${name}-fill, .${s} >${w}.row > .${name}-auto`).join(', '), `.${s} .${name}-nfill, .${s} .${name}-nauto`].filter(x => x).join(', ')} { display: ${data('raui.grid.display') || 'inline-block'}; width: auto; flex-grow: 1; flex-shrink: 1; }`;
  });
  return out;
}

grid.style = style;

export function plugin(opts = {}) {
  return function({ Ractive, instance }) {
    // if an extension, offer to include style
    if (!Ractive.isInstance(instance)) {
      if (opts.includeStyle) {
        if (instance === Ractive) {
          Ractive.addCSS('grid-decorator', style);
        } else {
          const css = instance.css;
          instance.css = function(data) {
            const res = typeof css !== "function" ? css || "" : css(data);
            return res + style(data, opts.defaults);
          };
        }
      }
    }

    instance.decorators[opts.name || 'grid'] = grid;
  }
}

globalRegister('grid', 'decorators', grid);

export default plugin;
