System.register(['./chunk2.js', './chunk7.js'], function (exports, module) {
  'use strict';
  var globalRegister, sized;
  return {
    setters: [function (module) {
      globalRegister = module.default;
    }, function (module) {
      sized = module.sized;
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
      };

      var regexps = { 'grid grid-root': /\bgrid grid-root\b/g };
      var spaces = /\s+/g;
      function grid(node, options) {
        var ctx = this.getContext(node);
        var owner = this;
        var points;
        var opts = options || {};
        var breaks;

        function resize(size) {
          if (typeof opts.offset === 'number') { size -= opts.offset; }
          if (!opts.type || opts.type === 'class') {
            var cls = node.className;
            var max = -1;
            var match;
            for (var k in points) {
              regexps[k].lastIndex = -1;
              if (points[k] <= size) {
                if (!regexps[k].test(cls)) { cls += " " + k; }
                if (points[k] > max) {
                  max = points[k];
                  match = k;
                }
              } else {
                cls = cls.replace(regexps[k], '').trim();
              }
            }

            node.className = cls.replace(spaces, ' ');

            if (!match) { return; }

            if (opts.value) { ctx.set(opts.value, breaks[match].value); }
            if (opts.name) { ctx.set(opts.name, match); }
            if (opts.size) { ctx.set(opts.size, size); }
            if (opts.max) { ctx.set(opts.max, max); }
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
          resize(node.clientWidth);
        }

        var observer = this.observe('@style.break', settings, { init: false });
        var listener = ctx.observe('@local.width', resize, { init: false });
        var watcher = sized.call(this, node, { clientWidth: '@local.width' });

        node.className += ' grid grid-root';
        if (opts.immediate) { settings(); }
        else { requestAnimationFrame(settings); }

        return {
          update: function update(options) {
            // TODO: if type changes, undo whatever the original did first
            opts = options || {};
            requestAnimationFrame(function () { return resize(node.clientWidth); });
          },
          teardown: function teardown() {
            node.className = node.className.replace(regexps['grid grid-root'], '').trim();
            listener.cancel();
            observer.cancel();
            watcher.teardown();
          }
        };
      }

      function style(data, optDefaults) {
        var defs = data('raui.grid.break') || optDefaults || defaults;
        var wrappers = (data('raui.grid.wrappers') || ['.row-wrap > ', '.row-wrap > .row-wrap > ']).slice();
        wrappers.unshift('');

        var out = ".row > * { position: relative; width: 100%; transition-duration: 0.2s; transition-timing-function: ease-in-out; transition-property: padding, margin; box-sizing: border-box; }\n.grid { display: block; }\n.grid .row { display: flex !important; flex-wrap: wrap; min-height: fit-content; width: 100%; align-content: flex-start; }\n.grid .row.row-pad > * { padding: " + (data('raui.grid.padding') || '0.5em') + "; }\n.grid .row > .pad { display: flex; flex-direction: column; padding: " + (data('raui.grid.padding') || '0.5em') + "; box-sizing: border-box; }";

        var points = Object.keys(defs).map(function (k) { return (defs[k].key = k) && defs[k]; });
        points.sort(function (l, r) { return l.value > r.value ? 1 : l.value < r.value ? -1 : 0; });

        points.forEach(function (size) {
          var name = size.prefix || size.key[0];
          var map = {};

          size.units.forEach(function (u) {
            for (var i = 1; i < u; i++) {
              var pc = '' + ((i / u) * 100);
              pc = pc.substr(0, pc.indexOf('.') + 3);
              if (!map[pc]) { map[pc] = []; }
              map[pc].push((i + "-" + u));
            }
          });

          var s = size.key;

          out += "\n" + ([wrappers.map(function (w) { return ("." + s + " > " + w + "." + name + "1, ." + s + " > " + w + ".row > ." + name + "1"); }).join(', '), ("." + s + " ." + name + "-n1, ." + s + " .row-" + name + "-n1 > *")].filter(function (x) { return x; }).join(', ')) + " { display: " + (data('raui.grid.display') || 'inline-block') + "; width: 100%; flex-grow: 0; flex-shrink: 0; }\n" + ([wrappers.map(function (w) { return ("." + s + " > " + w + "." + name + "0, ." + s + " > " + w + ".row > ." + name + "0"); }).join(', '), ("." + s + " ." + name + "-n0, ." + s + " .row-" + name + "-n0 > *")].filter(function (x) { return x; }).join(', ')) + " { display: none; flex-grow: 0; flex-shrink: 0: }\n" + (Object.keys(map).map(function (pc) { return ((map[pc].map(function (fraction) { return ("" + ([wrappers.map(function (w) { return ("." + s + " > " + w + ".row-" + name + fraction + " > *, ." + s + " > " + w + "." + name + fraction + ", ." + s + " > " + w + ".row > ." + name + fraction); }).join(', '), ("." + s + " .row-" + name + "-n" + fraction + " > * .row > ." + name + "-n" + fraction + ", ." + s + " ." + name + "-n" + fraction + ", ." + s + " .row-" + name + "-n" + fraction + " > *")].filter(function (x) { return x; }).join(', '))); }).join(', ')) + " { display: " + (data('raui.grid.display') || 'inline-block') + "; width: " + pc + "%; flex-grow: 0; flex-shrink: 0; }"); }
      ).join('\n')) + "\n" + ([wrappers.map(function (w) { return ("." + s + " > " + w + ".row > " + name + "-fill, ." + s + " >" + w + ".row > ." + name + "-auto"); }).join(', '), ("." + s + " ." + name + "-nfill, ." + s + " ." + name + "-nauto")].filter(function (x) { return x; }).join(', ')) + " { display: " + (data('raui.grid.display') || 'inline-block') + "; width: auto; flex-grow: 1; flex-shrink: 1; }";
        });
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
