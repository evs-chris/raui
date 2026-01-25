System.register(['ractive', './chunk2.js', './chunk8.js'], function (exports, module) {
  'use strict';
  var Ractive$1, globalRegister, keys;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      globalRegister = module.default;
    }, function (module) {
      keys = module.default;
    }],
    execute: function () {

      exports('MenuList', MenuList);
      exports('WindowList', WindowList);
      var Runner = /*@__PURE__*/(function (Ractive) {
        function Runner(opts) {
          Ractive.call(this, opts);
        }

        if ( Ractive ) Runner.__proto__ = Ractive;
        Runner.prototype = Object.create( Ractive && Ractive.prototype );
        Runner.prototype.constructor = Runner;

        Runner.prototype.show = function show () {
          this.set('popped', true);
        };
        Runner.prototype.hide = function hide () {
          this.set('popped', false);
        };
        Runner.prototype.showHide = function showHide () {
          this.toggle('popped');
        };

        Runner.prototype.addPlugin = function addPlugin (plugin) {
          if (typeof plugin !== 'object' || !plugin.name || typeof plugin.run !== 'function') { return; }
          this.push('plugins', plugin);
        };

        Runner.prototype.onSelected = function onSelected (result) {
          var this$1 = this;

          var plugs = this.get('plugins');
          var plug = plugs.find(function (p) { return p.name === result.plugin; });
          if (plug && typeof plug.action === 'function') {
            var res = plug.action(result.result.value);
            if (typeof res === 'boolean' && !res) { return; }
            else if (typeof res === 'object' && res && typeof res.then === 'function') {
              res.then(function (r) {
                if (typeof r === 'boolean' && !res) { return; }
                this$1.set('popped', false);
              });
            } else {
              this.set('popped', false);
            }
          }
        };

        Runner.prototype.onKey = function onKey (which) {
          if (which === 27) { this.set('popped', false); }
          else if (which === 13) {
            var r = this.get('results')[this.get('selected')];
            if (r) { this.onSelected(r); }
          } else {
            var dir = which === 38 ? -1 : 1;
            var cur = this.get('selected');
            var len = this.get('results.length') || 0;
            cur += dir;
            if (cur < 0) { cur = len - 1; }
            if (cur < 0) { cur = 0; }
            if (cur >= len) { cur = 0; }
            this.set('selected', cur);
            var el = this.find('.selected');
            if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
          }
        };

        return Runner;
      }(Ractive$1));
      Ractive$1.extendWith(Runner, {
        template: {v:4,t:[{t:7,e:"div",m:[{t:13,n:"class",f:"rrunner-back",g:1},{n:"class-rrunner-popped",t:13,f:[{t:2,r:"~/popped"}]},{n:["click"],t:70,f:{r:["@this"],s:"[_0.toggle(\"popped\")]"}}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rrunner-box",g:1},{n:"class-rrunner-popped",t:13,f:[{t:2,r:"~/popped"}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"command",g:1}],f:[{t:7,e:"input",m:[{n:"value",f:[{t:2,r:"command"}],t:13},{t:73,v:"l",f:"500"},{n:["keys"],t:70,a:{r:[],s:"[13,27,38,40]"},f:{r:["@this","@event.which"],s:"[_0.onKey(_1)]"}}]}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"results",g:1}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"result",g:1},{n:"class-selected",t:13,f:[{t:2,x:{r:["@index","selected"],s:"_0===_1"}}]},{n:["click"],t:70,f:{r:["@this","."],s:"[_0.onSelected(_1)]"}}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"plugin",g:1}],f:[{t:2,r:".plugin"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"label",g:1}],f:[{t:2,r:"result.label"}]}]}],n:52,r:"results"}]}]}],e:{"[_0.toggle(\"popped\")]":function (_0){return([_0.toggle("popped")]);},"[13,27,38,40]":function (){return([13,27,38,40]);},"[_0.onKey(_1)]":function (_0,_1){return([_0.onKey(_1)]);},"_0===_1":function (_0,_1){return(_0===_1);},"[_0.onSelected(_1)]":function (_0,_1){return([_0.onSelected(_1)]);}}},
        css: function(data) { return [(function(data) {
         var primary = Object.assign({}, data('raui.primary'), data('raui.runner.primary'));
         return (".rrunner-back {\n     position: absolute;\n     top: 0;\n     bottom: 0;\n     left: 0;\n     right: 0;\n     background: rgba(0, 0, 0, 0.14);\n     z-index: -1;\n     opacity: 0;\n     transition: z-index 0s linear 0.5s, opacity 0.5s ease-in-out;\n     " + (primary.blur || 'backdrop-filter: blur(2px);') + "\n   }\n   .rrunner-back.rrunner-popped {\n     opacity: 1;\n     z-index: 999999;\n     transition: opacity 0.5s ease-in-out;\n   }\n   .rrunner-box {\n     position: absolute;\n     top: 1em;\n     left: calc(50% - 13em);\n     width: 26em;\n     z-index: -1;\n     opacity: 0;\n     padding: 0.5em;\n     color: " + (primary.fg || '#222') + ";\n     border: " + (primary.bodrder || 1) + "px solid " + (primary.bc || '#ccc') + ";\n     box-shadow: " + (primary.shadow || '0 1px 4px 0 rgba(0, 0, 0, 0.14)') + ";\n     border-radius: " + (primary.radius || '0.2em') + ";\n     background-color: " + (primary.bg || '#fff') + ";\n   }\n   .rrunner-box.rrunner-popped {\n     z-index: 1000000;\n     opacity: 1;\n   }\n   .rrunner-box .command {\n     border-radius: " + (primary.radius || '0.2em') + ";\n     border: " + (primary.border || 1) + "px solid " + (primary.bc || '#ccc') + ";\n   }\n   .rrunner-box .command input {\n     width: 100%;\n     padding: 0 0.5em;\n     border: 0;\n     box-sizing: border-box;\n     outline: 0;\n   }\n   .rrunner-box .result:nth-child(1) {\n     margin-top: 0.5em;\n   }\n   .rrunner-box .result {\n     padding: 0.6em 0.3em 0.3em 0.3em;\n     border: " + (primary.border || 1) + "px solid transparent;\n     border-radius: " + (primary.radius || '0.2em') + ";\n     position: relative;\n   }\n   .rrunner-box .result .plugin {\n     font-size: 0.75em;\n     opacity: 0.8;\n     right: 0.3em;\n     top: 0;\n     position: absolute;\n   }\n   .rrunner-box .result.selected {\n     background-color: " + (primary.bga || '#f4f4f4') + ";\n     color: " + (primary.fga || '#07e') + ";\n     border-color: " + (primary.bc || '#ccc') + ";\n   }\n   .rrunner-box .results {\n     max-height: 25em;\n     overflow: auto;\n   }");
      }).call(this, data)].join(' '); },
        cssId: 'rrunner',
        noCssTransform: true,
        use: [keys()],
        data: function data() {
          return { running: 0, run: 0, selected: 0 };
        },
        observe: {
          command: function command(v) {
            var this$1 = this;

            if (!v) {
              this.set('results', []);
              return;
            }
            var plugs = this.get('plugins') || [];
            var results = [];
            this.add('running', 1);
            this.add('run', 1);
            var run = this.get('run');
            var loop = function ( i ) {
              var p = plugs[i];
              var r = p.run(v);
              if (Array.isArray(r)) {
                results.push(Promise.resolve(r.map(function (r) { return ({ result: handleResult(r), plugin: p.name }); })));
              } else if (r && typeof r === 'object' && typeof r.then === 'function') {
                r.then(function (arr) {
                  if (Array.isArray(arr)) { return arr.map(function (r) { return ({ result: handleResult(r), plugin: p.name }); }); }
                }, function (err) { return []; });
              }
            };

            for (var i = 0; i < plugs.length; i++) loop( i );
            Promise.all(results).then(function (results) {
              this$1.subtract('running', 1);
              if (this$1.get('run') === run) {
                var arr = [];
                this$1.set('results', arr.concat.apply(arr, results));
              }
            });
          },
          popped: function popped(v) {
            var this$1 = this;

            if (v) { setTimeout(function () {
              var el = this$1.find('input');
              if (el) {
                el.focus();
                var v = el.value;
                el.selectionStart = 0;
                el.selectionEnd = v.length;
              }
            }, 100); }
          },
        },
      });

      function handleResult(r) {
        if (Array.isArray(r) && r.length === 2) { return { label: r[0], value: r[1] }; }
        else if (typeof r === 'object' && 'label' in r && 'value' in r) { return r; }
        else { return { label: ("" + r), value:r }; }
      }

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.components[opts.name || 'runner'] = Runner;
        };
      }

      globalRegister('RauiRunner', 'components', Runner);

      function WindowList(host) {
        return {
          run: function run(name) {
            var wins = Object.values(host.get('windows'));
            var s = ("" + name).toLowerCase();
            return wins.filter(function (w) { return (w.title || '').toLowerCase().includes(s); }).map(function (w) { return ({ label: w.title, value: w.id }); });
          },
          name: 'Window List',
          action: function action(win) {
            host.getWindow(win).raise();
          },
        };
      }

      function MenuList(menu, opts) {
        opts = opts || {};
        function path(el) {
          var res = el.innerText;
          if (opts.flat) { return res; }
          while (el) {
            while (el && el.classList && !el.classList.contains('rmenu-items')) { el = el.parentNode; }
            if (el) { el = el.parentNode; }
            if (el) {
              var e = el.querySelector('.rmenu-item > .rmenu-main > .rmenu-title');
              if (e) { res = (e.innerText) + " > " + res; }
            }
          }
          return res;
        }
        function getItems() {
          var els = menu.findAll('.rmenu-title');
          var res = [];
          for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (!el.parentElement.classList.contains('rmenu-disabled')) {
              var ctx = Ractive$1.getContext(el);
              if (typeof ctx.get('.action') === 'function') {
                res.push({ label: path(el), value: ctx });
              }
            }
          }
          return res;
        }
        var els = !opts.dynamic ? getItems() : undefined;

        return {
          name: opts.name || 'Menu List',
          run: function run(name) {
            var es = els || getItems();
            var s = ("" + name).toLowerCase();
            return es.filter(function (e) { return (e.label || '').toLowerCase().includes(s); });
          },
          action: function action(ctx) {
            var act = ctx.get('.action');
            if (typeof act === 'function') { act(); }
          },
        }
      }
      exports('default', plugin);

    }
  };
});
