var win = typeof window !== 'undefined' ? window : null;

function globalRegister(name, registry, constructor) {
  if (win && win.Ractive && typeof win.Ractive[registry] === 'object') {
    var script = document.currentScript;
    if (!script) {
      script = document.querySelectorAll('script');
      script = script[script.length - 1];
    }

    if (script) {
      var aliases = script.getAttribute('data-alias');
      if (aliases) {
        aliases = aliases.split('&');
        aliases = aliases.reduce(function (a, c) {
          var ref = c.split('=');
          var k = ref[0];
          var v = ref[1];
          a[k] = v;
          return a;
        }, {});
      }

      Ractive[registry][(aliases && aliases[name]) || name] = constructor;
    }
  }
}

var el;
function sizer() {
  if (!el) {
    el = document.createElement('div');
    document.body.appendChild(el);
  }
  return el;
}

var defaults = {
  tiny: {
    units: [ 2, 3, 4, 5, 8 ],
    max: '0'
  },
  xsmall: {
    units: [ 2, 3, 4, 5, 8 ],
    max: '20em',
    prefix: 'xs'
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
};

var regexps = { 'grid grid-root': /\bgrid grid-root\b/g };
var spaces = /\s+/g;
function grid(node, _type, _path) {
  var ctx = this.getContext(node);
  var owner = this;
  var points;
  var type = _type;
  function resize() {
    var size = node.clientWidth;

    if (!type || type === 'class') {
      for (var k in points) {
        if (points[k] <= size) {
          regexps[k].lastIndex = -1;
          if (!regexps[k].test(node.className)) { node.className += " " + k; }
        } else { node.className = node.className.replace(regexps[k], '').trim(); }
      }

      node.className = node.className.replace(spaces, ' ');
    }
  }

  function settings() {
    var s = sizer();
    var breaks = owner.get('@style.break') || defaults;
    points = {};
    for (var k in breaks) {
      s.style.width = breaks[k].max;
      points[k] = s.clientWidth;
      if (!regexps[k]) { regexps[k] = new RegExp(("\\b" + k + "\\b"), 'g'); }
    }
    resize();
  }

  var listener = this.root.on('*.resize', resize);
  var observer = this.observe('@style.breaks', settings);

  node.className += ' grid grid-root';
  settings();

  return {
    update: function update(_type, _path) {
      // TODO: if type changes, undo whatever the original did first
      type = _type;
      resize();
    },
    teardown: function teardown() {
      node.className = node.className.replace(regexps['grid grid-root'], '').trim();
      listener.cancel();
      observer.cancel();
    }
  };
}

function style(data) {
  var defs = data('break') || defaults;

  var out = ".grid > .row > * { position: relative; width: 100%; transition: width 0.2s ease-in-out; }\n.grid { display: block; }\n.grid > .row { display: flex; flex-wrap: wrap; }\n.grid > .row > .pad { display: flex; flex-direction: column; padding: 0.5em; box-sizing: border-box; }";

  var str;

  Object.keys(defs).forEach(function (k) {
    var size = defs[k];
    var name = size.prefix || k[0];

    out += "\n." + k + " > .row > ." + name + "0 { width: 0; overflow: hidden; }";

    size.units.forEach(function (u) {
      for (var i = 1; i < u; i++) {
        str = '' + ((i / u) * 100);
        str = str.substr(0, str.indexOf('.') + 3);
        out += "\n." + k + " > .row >  ." + name + i + "-" + u + " { width: " + str + "%; }";
      }
    });
  });

  return out;
}

grid.style = style;

globalRegister('grid', 'decorators', grid);

export { grid, style };
