System.register(['./chunk3.js', './chunk4.js', './chunk6.js', './chunk2.js', './chunk7.js', './Hello.ractive.html.js', 'ractive', './chunk13.js', './chunk14.js', './chunk15.js'], function (exports, module) {
  'use strict';
  var Shell, AppBar, Menu, Host, style, Hello, Ractive$1, tabs, marked, form;
  return {
    setters: [function (module) {
      Shell = module.default;
    }, function (module) {
      AppBar = module.default;
    }, function (module) {
      Menu = module.default;
    }, function (module) {
      Host = module.default$2;
    }, function (module) {
      style = module.style;
    }, function (module) {
      Hello = module.default;
    }, function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      tabs = module.default;
    }, function (module) {
      marked = module.default;
    }, function (module) {
      form = module.default;
    }],
    execute: function () {

      function button(data) {
        var primary = Object.assign({}, data('raui.primary'), data('raui.button.primary'), { disabled: Object.assign({}, data('raui.primary.disabled'), data('raui.button.primary.disabled')) });
        var themes = (data('raui.themes') || []).slice();
        (data('raui.button.themes') || []).forEach(function (t) {
          if (!~themes.indexOf(t)) { themes.push(t); }
        });

        return "\n    button, .btn {\n      text-decoration: none;\n      text-align: center;\n      letter-spacing: 0.5px;\n      cursor: pointer;\n      user-select: none;\n      border: none;\n      border-radius: " + (primary.radius || '0.2em') + ";\n      padding: 0 1.25rem;\n      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n        0 1px 5px 0 rgba(0, 0, 0, 0.12),\n        0 3px 1px -2px rgba(0, 0, 0, 0.2);\n      transition: 0.2s ease-in-out;\n      transition-property: box-shadow, opacity, background-color;\n      font-size: 1em;\n      line-height: 1.5em;\n      background-color: " + (primary.fga || '#07e') + ";\n      color: " + (primary.bg || '#fff') + ";\n      vertical-align: middle;\n      min-height: 2.25em;\n      outline: 0;\n      margin: 0.25em;\n      position: relative;\n      overflow: hidden;\n      -webkit-tap-highlight-color: transparent;\n      font-family: inherit;\n    }\n    button.alt, .btn.alt {\n      background-color: " + (primary.fg || '#222') + ";\n    }\n\n    button[disabled], .btn.disabled {\n      opacity: 0.7;\n      cursor: not-allowed;\n    }\n\n    button.round {\n      width: 2.2em;\n      height: 2.2em;\n      border-radius: 100%;\n      line-height: 2.2em;\n      text-align: center;\n      padding: 0;\n    }\n\n    button.flat, .btn.flat {\n      background-color: transparent;\n      color: " + (primary.fg || '#222') + ";\n      box-shadow: none;\n    }\n    button.flat.alt, .btn.flat.alt {\n      color: " + (primary.fga || '#07e') + ";\n    }\n\n    button:hover, .btn:hover {\n      opacity: 0.9;\n      box-shadow: 0 3px 3px 0 rgba(0,0,0,0.14),\n      0 1px 7px 0 rgba(0,0,0,0.12),\n      0 3px 1px -1px rgba(0,0,0,0.2);\n    }\n\n    button[disabled]:hover, .btn.disabled:hover {\n      opacity: 0.7;\n    }\n\n    button.flat:hover, .btn.flat:hover {\n      box-shadow: none;\n    }\n\n    button:after {\n      content: ' ';\n      position: absolute;\n      top: 0;\n      left: 0;\n      height: 100%;\n      width: 100%;\n      background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 2em, transparent 2.1em);\n      opacity: 0;\n      transform: scale(5, 5);\n      transition: opacity 1s ease-out, transform 0.5s ease-in;\n    }\n\n    button.flat:after {\n      background: radial-gradient(circle, rgba(0, 0, 0, 0.2) 1.5em, transparent 1.6em);\n    }\n\n    button.round:after {\n      background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0.75em, transparent 0.76em);\n    }\n\n    button.round.flat:after {\n      background: radial-gradient(circle, rgba(0, 0, 0, 0.2) 0.75em, transparent 0.76em);\n    }\n\n    button:before {\n      content: ' ';\n      position: absolute;\n      height: 100%;\n      width: 100%;\n      background-color: rgba(0, 0, 0, 0.075);\n      opacity: 0;\n      top: 0;\n      left: 0;\n      transition: opacity 0.4s ease-in-out;\n    }\n    button:focus:before {\n      opacity: 1;\n    }\n    button.flat:hover:before {\n      opacity: 0.5;\n    }\n    \n    button:active:after {\n      transform: scale(1, 1);\n      opacity: 1;\n      transition: none;\n    }\n  " + themes.map(function (t) {
          var theme = Object.assign({}, primary, data(("raui." + t)), data(("raui.button." + t)), { disabled: Object.assign({}, primary.disabled, data(("raui." + t + ".disabled")), data(("raui.button." + t + ".disabled")))});
          return (".btn." + t + ", button." + t + " {\n      background-color: " + (theme.fga || '#07e') + ";\n      color: " + (theme.bg || '#fff') + ";\n    }\n    button." + t + ".alt, .btn." + t + ".alt {\n      background-color: " + (theme.fg || '#222') + ";\n    }\n    .btn.flat." + t + ", button.flat." + t + " {\n      background-color: " + (theme.bg || '#fff') + ";\n      color: " + (theme.fg || '#222') + ";\n    }\n    button.flat." + t + ".alt, .btn.flat." + t + ".alt {\n      color: " + (theme.fga || '#07e') + ";\n    }\n    ");
        }).join('');
      }

      function plugin() {
        return function(ref) {
          var instance = ref.instance;
          var Ractive = ref.Ractive;

          if (instance === Ractive || Ractive.isInstance(instance)) {
            Ractive.addCSS('raui-button', button);
          } else {
            var css = instance.css;
            instance.css = function(data) {
              var res = typeof css === 'string' ? css : typeof css === 'function' ? css(data) : '';
              return res + button(data);
            };
          }
        };
      }

      Ractive.styleSet('window.maxFrom', '60em');

      var App = Ractive.extend({
        template: {v:4,t:[{t:7,e:"shell",f:[{t:7,e:"left",m:[{n:"hidden",t:13,f:[{t:2,r:"menu.hidden"}]},{n:"forced",t:13,f:[{t:2,r:"menu.over"}]},{n:"overflow",f:0,t:13}],f:[{t:7,e:"menu",f:[{t:7,e:"container",m:[{t:13,n:"class",f:"logo",g:1},{n:"pad",f:0,t:13}],f:[{t:7,e:"h1",m:[{t:13,n:"style",f:"text-align: center;",g:1}],f:[{t:7,e:"img",m:[{n:"src",f:"./raui.svg",t:13,g:1},{n:"alt",f:"raui logo",t:13,g:1}]},"RaUI"]}]}," ",{t:7,e:"item",m:[{n:"ref",f:"Hello",t:13,g:1}],f:[{t:7,e:"h3",f:["Welcome"]}," ",{t:7,e:"right",f:[{t:7,e:"a",m:[{n:"href",f:"https://github.com/evs-chris/raui",t:13,g:1},{n:"target",f:"_blank",t:13,g:1}],f:[{t:7,e:"svg",m:[{n:"aria-labelledby",f:"simpleicons-github-icon",t:13,g:1},{n:"role",f:"img",t:13,g:1},{n:"viewBox",f:"0 0 24 24",t:13,g:1},{n:"xmlns",f:"http://www.w3.org/2000/svg",t:13,g:1},{n:"id",f:"gh",t:13,g:1}],f:[{t:7,e:"title",m:[{n:"id",f:"simpleicons-github-icon",t:13,g:1}],f:["Browse code on GitHub"]},{t:7,e:"path",m:[{n:"d",f:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",t:13,g:1}]}]}]}]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Components"]}," ",{t:7,e:"item",m:[{n:"ref",f:"AppBar",t:13,g:1}],f:["AppBar"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Autocomplete",t:13,g:1}],f:["Autocomplete"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Card",t:13,g:1}],f:["Card"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Chart",t:13,g:1}],f:["Chart"]}," ",{t:7,e:"item",m:[{n:"ref",f:"DateInput",t:13,g:1}],f:["Date Input"]}," ",{t:7,e:"item",m:[{n:"ref",f:"DatePicker",t:13,g:1}],f:["Date Picker"]}," ",{t:7,e:"item",m:[{n:"ref",f:"JSONEditor",t:13,g:1}],f:["JSON Editor"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Menu",t:13,g:1}],f:["Menu"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Popover",t:13,g:1}],f:["Popover"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Shell",t:13,g:1}],f:["Shell"]}," ",{t:7,e:"item",m:[{n:"ref",f:"SideBar",t:13,g:1}],f:["Side Bar"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Split",t:13,g:1}],f:["Split"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Table",t:13,g:1}],f:["Table"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Tabs",t:13,g:1}],f:["Tabs"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Toggle",t:13,g:1}],f:["Toggle"]}," ",{t:7,e:"item",m:[{n:"ref",f:"VirtualList",t:13,g:1}],f:["Virtual List"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Window",t:13,g:1}],f:["Window"]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Decorators"]}," ",{t:7,e:"item",m:[{n:"ref",f:"AceEditor",t:13,g:1}],f:["Ace Editor"]}," ",{t:7,e:"item",m:[{n:"ref",f:"CodeMirror",t:13,g:1}],f:["CodeMirror"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Date",t:13,g:1}],f:["Date"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Form",t:13,g:1}],f:["Form"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Grid",t:13,g:1}],f:["Grid"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Marked",t:13,g:1}],f:["Marked"]}," ",{t:7,e:"item",m:[{n:"ref",f:"MaskedInput",t:13,g:1}],f:["Masked Input"]}," ",{t:7,e:"item",m:[{n:"ref",f:"NumericInput",t:13,g:1}],f:["Numeric Input"]}," ",{t:7,e:"item",m:[{n:"ref",f:"ScrollSpy",t:13,g:1}],f:["Scroll Spy"]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Events"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Click",t:13,g:1}],f:["Click"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Keys",t:13,g:1}],f:["Keys"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Swipe",t:13,g:1}],f:["Swipe"]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Transitions"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Expand",t:13,g:1}],f:["Expand"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Fade",t:13,g:1}],f:["Fade"]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Helpers"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Button",t:13,g:1}],f:["Button"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Toast",t:13,g:1}],f:["Toast"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Validate",t:13,g:1}],f:["Validate"]}]}]}]}," ",{t:7,e:"center",m:[{t:13,n:"class",f:"app-center",g:1},{n:"style-overflow",f:[{t:2,x:{r:["win.max"],s:"_0?\"hidden\":\"auto\""}}],t:13}],f:[{t:4,f:[{t:7,e:"app-bar",f:[{t:7,e:"left",f:[{t:7,e:"div",m:[{t:13,n:"class",f:"hamburger",g:1},{n:"title",f:"Toggle menu",t:13,g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.toggle(\"menu.hidden\")]"}}],f:["☰"]}," ",{t:7,e:"div",m:[{t:13,n:"style",f:"margin-left: 1em;",g:1},{t:13,n:"class",f:"hamburger",g:1},{n:"title",f:"Auto arrange windows",t:13,g:1},{n:["click"],t:70,f:{r:["@this.host"],s:"[_0.placeAll()]"}}],f:["▦"]}]}]}],n:51,r:"win.max"}," ",{t:7,e:"host",m:[{n:"windows",t:13,f:[{t:2,r:"windows"}]},{n:"placement",f:"smart",t:13,g:1}],f:[{t:7,e:"max-top",f:[{t:7,e:"app-bar",f:[{t:7,e:"left",f:[{t:7,e:"div",m:[{t:13,n:"class",f:"hamburger",g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.toggle(\"menu.hidden\")]"}}],f:["☰"]}]}," ",{t:7,e:"center",f:[{t:2,r:"window.title"}]}," ",{t:7,e:"right",f:[{t:8,r:"windowControls"}]}]}]}]}]}]}],e:{"_0?\"hidden\":\"auto\"":function (_0){return(_0?"hidden":"auto");},"[_0.toggle(\"menu.hidden\")]":function (_0){return([_0.toggle("menu.hidden")]);},"[_0.placeAll()]":function (_0){return([_0.placeAll()]);}}},
        use: [AppBar(), Host(), Menu(), Shell(), plugin()],
        on: {
          init: function init() {
            var this$1 = this;

            this.shell = this.findComponent('shell');
            var menu = this.menu = this.findComponent('menu');
            var host = this.host = this.findComponent('host');
            this.update('@.active', { force: true });
            this.link('currentMax', 'win.max', { instance: this.host });

            host.set('userMax', true);

            var builtins = ['Hello', 'AceEditor', 'AppBar', 'Autocomplete', 'Button', 'Card', 'Chart', 'Click', 'CodeMirror', 'Date', 'DateInput', 'DatePicker', 'Expand', 'Fade', 'Form', 'Grid', 'JSONEditor', 'Keys', 'Marked', 'MaskedInput', 'Menu', 'NumericInput', 'Popover', 'ScrollSpy', 'Shell', 'SideBar', 'Split', 'Swipe', 'Table', 'Tabs', 'Toast', 'Toggle', 'Validate', 'VirtualList', 'Window'];

            menu.on('item', function (ctx, handle) {
              if (~builtins.indexOf(handle.ref)) {
                var r = handle.ref;
                handle.active = function () { return host.currentId === r; };
                handle.action = function () { return this$1.fire('launch', {}, r); };
              }
            });

            menu.on('action', function () {
              this$1.get('menu.over') && this$1.toggle('menu.hidden');
            });

            var wins = this.winMenu = this.menu.addItem({ title: 'Open Windows', type: 'section', condition: false });
            var items = this.winMenuItems = [];
            this.windowObserver = this.observe('windows.*', function (n, o, k, id) {
              if (~builtins.indexOf(id)) { return; }
              setTimeout(function () {
                var wnd = host.getWindow(id);
                if (n) {
                  if (wnd && wnd.get('control.title')) {
                    var item = { id: id, menu: {
                      action: function action() { host.getWindow(id).raise(); },
                      active: function active() { return host.currentId && (host.currentId === id || this.ref === id); }
                    } };
                    item.entry = wins.addItem(item.menu);
                    items.push(item);
                  }
                } else {
                  var item$1 = items.find(function (i) { return i.id === id; });
                  if (item$1) {
                    items.splice(items.indexOf(item$1), 1);
                    item$1.entry.remove();
                  }
                }

                // meh
                items.forEach( function (m) {
                  menu.link(("windows." + (m.id) + ".title"), ((m.entry.keypath) + ".title"), { instance: this$1 });
                });

                menu.set(((wins.keypath) + ".condition"), items.length > 0);
              });
            }, { strict: true, defer: true });
          },
          complete: {
            handler: function handler() {
              var hello = new Hello();
              this.host.addWindow(hello, { id: 'Hello' });
            },
            once: true
          },
          launch: function launch(ctx, name) {
            var this$1 = this;

            var wnd = this.host.getWindow(name);
            if (wnd) {
              wnd.raise();
            } else {
              if (name === 'Hello') {
                var v = new Hello();
                this.host.addWindow(v, { id: name });
              } else {
                var mod = module.import("./" + name + ".ractive.html.js");
                mod && mod.then(function (m) {
                  var v = new m.default();
                  this$1.host.addWindow(v, { id: name });
                });
              }
            }
          }
        },
        cssId: 'app',
        css: function(data) { return [" body { overscroll-behavior-y: contain; } pre { white-space: pre-wrap; } .hamburger { cursor: pointer; user-select: none; margin: -1em; padding: 1em; } .logo { background-color: #f9f9f9; color: #222; border-style: solid; border-width: 1px; box-sizing: border-box; } .logo img { width: 50px; margin-right: 0.5em; margin-left: calc(-0.5em - 50px); vertical-align: middle; } svg#gh { transition: fill 0.3s ease-in-out; position: relative; width: 1.5em; height: 1.5em; top: 0.2em; }", (function(data) {
         return "svg#gh {\n     fill: " + (data('raui.primary.bg') || '#fff') + ";\n   }\n \n   .rmenu-active svg#gh {\n     fill: " + (data('raui.primary.fga') || '#07e') + ";\n   }\n   " +
         style(data);
      }).call(this, data)].join(' '); },
        noCssTransform: true,
        data: function() {
          return {
            right: { hidden: true }
          };
        },
        active: function active(id) {
          return this.host && this.host.currentId === id;
        }
      });

      Ractive$1.use(
        marked({ highlight: true }),
        form({ includeStyle: true }),
        tabs()
      );

      Ractive$1.styleSet('raui.pop.mobile', '48em');

      var app = window.app = new App({ target: '#target' });

      var el;
      document.addEventListener('click', function (ev) { return el = ev.target; });
      document.addEventListener('focus', function (ev) { return el = ev.target; });

      Object.defineProperty(globalThis, 'R', {
        value: new Proxy(function () { return ({}); }, {
          apply: function apply(_obj, _e, args) {
            if (args.length) {
              var ctx;
              if (typeof args[0] === 'object' && args[0] instanceof Node) { ctx = Ractive$1.getContext(args.shift()); }
              else { ctx = Ractive$1.getContext(el); }
              if (!ctx) { return; }
              if (typeof args[0] === 'string') {
                if (args.length === 1) { return ctx.get(args[0]); }
                else if (args.length === 2) { return ctx.set(args[0], args[1]); }
              } else if (typeof args[0] === 'object') {
                return ctx.set(args[0]);
              }
              return ctx;
            } else {
              return Ractive$1.getContext(el).get();
            }
          },
          get: function get(_obj, prop) {
            var ctx = Ractive$1.getContext(el);
            if (!ctx) { return; }
            if (!(prop in ctx) && prop in ctx.ractive) {
              var val = ctx.ractive[prop];
              if (typeof val === 'function') { return val.bind(ctx.ractive); }
              return val;
            } else {
              return ctx[prop];
            }
          },
        }),
      });

    }
  };
});
