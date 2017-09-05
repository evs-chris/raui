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
    units: [ 2, 3, 4, 5, 8 ],
    max: '0'
  },
  small: {
    units: [ 2, 3, 4, 5, 8, 10, 12 ],
    max: '36em'
  },
  medium: {
    units: [ 2, 3, 4, 5, 8, 10, 12 ],
    max: '48em'
  },
  large: {
    units: [ 2, 3, 4, 5, 8, 10, 12, 20, 24 ],
    max: '64em'
  },
  xlarge: {
    units: [ 2, 3, 4, 5, 8, 10, 12, 20, 24, 32 ],
    max: '100em'
  },
  ginormous: {
    units: [ 2, 3, 4, 5, 8, 10, 12, 20, 24, 32, 64 ],
    max: '150em'
  }
}

// TODO: drop classlist
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
        if (points[k] <= size) node.classList.add(k);
        else node.classList.remove(k);
      }
    }
  }

  function settings() {
    const s = sizer();
    const breaks = owner.get('@style.break') || defaults;
    points = {};
    for (const k in breaks) {
      s.style.width = breaks[k].max;
      points[k] = s.clientWidth;
    }
    resize();
  }

  const listener = this.root.on('*.resize', resize);
  const observer = this.observe('@style.breaks', settings);

  node.classList.add('grid');
  settings();

  return {
    update(_type, _path) {
      // TODO: if type changes, undo whatever the original did first
      type = _type;
      path = _path;
      resize();
    },
    teardown() {
      node.classList.remove('grid');
      listener.cancel();
      observer.cancel();
    }
  };
}

export function style(data) {
  const defs = data('break') || defaults;

  let out = '.grid > .row > * { position: relative; width: 100%; } .grid { display: block; } .grid > .row { display: flex; flex-wrap: wrap; }';
  let str;

  Object.keys(defs).forEach(k => {
    const size = defs[k];
    const name = size.name || k[0];

    out += `\n.${k} > .${name}0 { width: 0; overflow: hidden; }`;

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
