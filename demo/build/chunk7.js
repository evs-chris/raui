System.register(['./chunk2.js'], function (exports, module) {
  'use strict';
  var globalRegister;
  return {
    setters: [function (module) {
      globalRegister = module.default;
    }],
    execute: function () {

      exports('style', style);
      exports('grid', grid);
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
          units: [ 2, 3, 4, 5, 6, 8, 10, 12, 20, 24 ],
          max: '64em',
          value: 40
        },
        xlarge: {
          units: [ 2, 3, 4, 5, 6, 8, 10, 12, 20, 24, 32 ],
          max: '100em',
          value: 50
        },
        ginormous: {
          units: [ 2, 3, 4, 5, 6, 8, 10, 12, 20, 24, 32, 64 ],
          max: '150em',
          value: 60
        }
      };

      var regexps = { 'grid grid-root': /\bgrid grid-root\b/g };
      var spaces = /\s+/g;
      function grid(node, options) {
        var ctx = this.getContext(node);
        var owner = this;
        var points;
        var opts = options || {};
        var breaks;

        function resize() {
          var size = node.clientWidth;

          if (!opts.type || opts.type === 'class') {
            var match, max = -1;
            for (var k in points) {
              if (points[k] <= size) {
                regexps[k].lastIndex = -1;
                if (points[k] > max) {
                  match = k;
                  max = points[k];
                }
              }
              node.className = node.className.replace(regexps[k], '').trim();
            }

            if (!regexps[match].test(node.className)) { node.className += " " + match; }

            if (opts.value) { ctx.set(opts.value, breaks[match].value); }
            if (opts.name) { ctx.set(opts.name, match); }

            node.className = node.className.replace(spaces, ' ');
          }
        }

        function settings() {
          var s = sizer();
          breaks = owner.get('@style.break') || defaults;
          points = {};
          for (var k in breaks) {
            s.style.width = breaks[k].max;
            points[k] = s.clientWidth;
            if (!regexps[k]) { regexps[k] = new RegExp(("\\b" + k + "\\b"), 'g'); }
          }
          s.style.width = 0;
          resize();
        }

        var listener = this.root.on('*.resize', function () { return requestAnimationFrame(resize); });
        var observer = this.observe('@style.break', settings, { init: false });

        node.className += ' grid grid-root';
        requestAnimationFrame(settings);

        return {
          update: function update(options) {
            // TODO: if type changes, undo whatever the original did first
            opts = options || {};
            requestAnimationFrame(resize);
          },
          teardown: function teardown() {
            node.className = node.className.replace(regexps['grid grid-root'], '').trim();
            listener.cancel();
            observer.cancel();
          }
        };
      }

      function style(data, optDefaults) {
        var defs = data('raui.grid.break') || optDefaults || defaults;
        var wrappers = (data('raui.grid.wrappers') || ['.row-wrap > ', '.row-wrap > .row-wrap > ']).slice();
        wrappers.unshift('');

        var out = ".row > * { position: relative; width: 100%; transition-duration: 0.2s; transition-timing-function: ease-in-out; transition-property: width, padding, margin; box-sizing: border-box; }\n.grid { display: block; }\n.grid .row { display: flex; flex-wrap: wrap; min-height: fit-content; width: 100%; }\n.grid .row.row-pad > * { padding: " + (data('raui.grid.padding') || '0.5em') + "; }\n.grid .row > .pad { display: flex; flex-direction: column; padding: " + (data('raui.grid.padding') || '0.5em') + "; box-sizing: border-box; }";

        var str;

        var points = Object.keys(defs).map(function (k) { return (defs[k].key = k) && defs[k]; });
        points.sort(function (l, r) { return l.value > r.value ? 1 : l.value < r.value ? -1 : 0; });
        var greater = {};


        points.reverse().reduce(function (a, c) {
          a.push(c.key);
          greater[c.key] = a.slice();
          return a;
        }, []);

        var rows = '', cols = '';
        points.reverse().forEach(function (size) {
          var name = size.prefix || size.key[0];

          size.units.forEach(function (u) {
            cols += "\n" + (greater[size.key].map(function (s) { return wrappers.map(function (w) { return ("." + s + " > " + w + "." + name + "1, ." + s + " > " + w + ".row > ." + name + "1, ." + s + " ." + name + "-n1, ." + s + " .row-" + name + "-n1 > *"); }).join(', '); }).join(', ')) + " { display: initial; width: 100%; flex-grow: 0; flex-shrink: 0; }\n" + (greater[size.key].map(function (s) { return wrappers.map(function (w) { return ("." + s + " > " + w + "." + name + "0, ." + s + " > " + w + ".row > ." + name + "0, ." + s + " ." + name + "-n0, ." + s + " .row-" + name + "-n0 > *"); }).join(', '); }).join(', ')) + " { display: none; flex-grow: 0; flex-shrink: 0; }";
            rows += "\n" + (greater[size.key].map(function (s) { return ("." + s + " .row-" + name + "-n1 > *"); }).join(', ')) + " { display: initial; width: 100%; }\n" + (greater[size.key].map(function (s) { return ("." + s + " .row-" + name + "-n0 > *"); }).join(', ')) + " { display: none; }";

            var loop = function ( i ) {
              str = '' + ((i / u) * 100);
              str = str.substr(0, str.indexOf('.') + 3);
              rows += "\n" + (greater[size.key].map(function (s) { return wrappers.map(function (w) { return ("." + s + " > " + w + ".row-" + name + i + "-" + u + " > *, ." + s + " .row-" + name + "-n" + i + "-" + u + " > *, ." + s + " .row > ." + name + "-n" + i + "-" + u); }).join(', '); }).join(', ')) + " { display: initial; width: " + str + "%; }";
              cols += "\n" + (greater[size.key].map(function (s) { return wrappers.map(function (w) { return ("." + s + " > " + w + "." + name + i + "-" + u + ", ." + s + " > " + w + ".row > ." + name + i + "-" + u + ", ." + s + " ." + name + "-n" + i + "-" + u + ", ." + s + " .row-" + name + "-n" + i + "-" + u + " > *"); }).join(', '); }).join(', ')) + " { display: initial; width: " + str + "%; flex-grow: 0; flex-shrink: 0; }";
            };

            for (var i = 1; i < u; i++) loop( i );
          });

          greater[size.key].forEach(function (s) { return cols += (wrappers.map(function (w) { return ("." + s + " > " + w + ".row > ." + name + "-fill"); }).join(', ')) + ", ." + s + " ." + name + "-nfill { width: auto; flex-grow: 2; flex-shink: 2; }\n" + (wrappers.map(function (w) { return ("." + s + " > " + w + ".row > ." + name + "-auto"); }).join(', ')) + ", ." + s + " ." + name + "-nauto { width: auto; flex-shrink: 2; }"; });
        });

        out += rows + cols;

        return out;
      }

      grid.style = style;

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var Ractive = ref.Ractive;
          var instance = ref.instance;

          // if an extension, offer to include style
          if (!Ractive.isInstance(instance)) {
            if (opts.includeStyle) {
              if (instance === Ractive) {
                Ractive.addCSS('grid-decorator', style);
              } else {
                var css = instance.css;
                instance.css = function(data) {
                  var res = typeof css !== "function" ? css || "" : css(data);
                  return res + style(data, opts.defaults);
                };
              }
            }
          }

          instance.decorators[opts.name || 'grid'] = grid;
        }
      }

      globalRegister('grid', 'decorators', grid);
      exports('default', plugin);

    }
  };
});
