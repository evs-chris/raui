import globalRegister from './globalRegister';

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
    max: '0'
  },
  xsmall: {
    units: [ 2, 3, 4, 5, 6, 8 ],
    max: '20em',
    prefix: 'xs'
  },
  small: {
    units: [ 2, 3, 4, 5, 6, 8, 10, 12 ],
    max: '36em'
  },
  medium: {
    units: [ 2, 3, 4, 5, 6, 8, 10, 12 ],
    max: '48em'
  },
  large: {
    units: [ 2, 3, 4, 5, 6, 8, 10, 12, 20, 24 ],
    max: '64em'
  },
  xlarge: {
    units: [ 2, 3, 4, 5, 6, 8, 10, 12, 20, 24, 32 ],
    max: '100em'
  },
  ginormous: {
    units: [ 2, 3, 4, 5, 6, 8, 10, 12, 20, 24, 32, 64 ],
    max: '150em'
  }
}

const regexps = { 'grid grid-root': /\bgrid grid-root\b/g };
const spaces = /\s+/g;
export function grid(node, _type, _path) {
  const ctx = this.getContext(node);
  const owner = this;
  let points;
  let type = _type;
  let path = _path;

  function resize() {
    let matches = [];
    const size = node.clientWidth;

    if (!type || type === 'class') {
      for (const k in points) {
        if (points[k] <= size) {
          regexps[k].lastIndex = -1;
          if (!regexps[k].test(node.className)) node.className += ` ${k}`;
        } else node.className = node.className.replace(regexps[k], '').trim();
      }

      node.className = node.className.replace(spaces, ' ');
    }
  }

  function settings() {
    const s = sizer();
    const breaks = owner.get('@style.break') || defaults;
    points = {};
    for (const k in breaks) {
      s.style.width = breaks[k].max;
      points[k] = s.clientWidth;
      if (!regexps[k]) regexps[k] = new RegExp(`\\b${k}\\b`, 'g');
    }
    resize();
  }

  const listener = this.root.on('*.resize', resize);
  const observer = this.observe('@style.breaks', settings);

  node.className += ' grid grid-root';
  settings();

  return {
    update(_type, _path) {
      // TODO: if type changes, undo whatever the original did first
      type = _type;
      path = _path;
      resize();
    },
    teardown() {
      node.className = node.className.replace(regexps['grid grid-root'], '').trim();
      listener.cancel();
      observer.cancel();
    }
  };
}

export function style(data) {
  const defs = data('break') || defaults;

  let out = `.grid > .row > * { position: relative; width: 100%; transition: width 0.2s ease-in-out; }
.grid { display: block; }
.grid > .row { display: flex; flex-wrap: wrap; }
.grid > .row > .pad { display: flex; flex-direction: column; padding: 0.5em; box-sizing: border-box; }`;

  let str;

  Object.keys(defs).forEach(k => {
    const size = defs[k];
    const name = size.prefix || k[0];

    out += `\n.${k} > .row > .${name}0 { width: 0; overflow: hidden; }`;

    size.units.forEach(u => {
      for (let i = 1; i < u; i++) {
        str = '' + ((i / u) * 100);
        str = str.substr(0, str.indexOf('.') + 3);
        out += `\n.${k} > .row >  .${name}${i}-${u} { width: ${str}%; }`;
      }
    });
  });

  return out;
}

grid.style = style;

globalRegister('grid', 'decorators', grid);
