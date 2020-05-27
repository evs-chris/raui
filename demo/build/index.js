System.register(['./chunk3.js', './chunk4.js', './chunk6.js', './chunk2.js', './chunk7.js', './Hello.ractive.html.js', 'ractive', './chunk12.js', './chunk13.js'], function (exports, module) {
  'use strict';
  var Shell, AppBar, Menu, Host, globalRegister, style, sized, Hello, Ractive$1, scrolled, marked;
  return {
    setters: [function (module) {
      Shell = module.default;
    }, function (module) {
      AppBar = module.default;
    }, function (module) {
      Menu = module.default;
    }, function (module) {
      Host = module.default$2;
      globalRegister = module.default;
    }, function (module) {
      style = module.style;
      sized = module.sized;
    }, function (module) {
      Hello = module.default;
    }, function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      scrolled = module.scrolled;
    }, function (module) {
      marked = module.default;
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
        template: {v:4,t:[{t:7,e:"shell",f:[{t:7,e:"left",m:[{n:"hidden",t:13,f:[{t:2,r:"menu.hidden"}]},{n:"forced",t:13,f:[{t:2,r:"menu.over"}]},{n:"overflow",f:0,t:13}],f:[{t:7,e:"menu",f:[{t:7,e:"container",m:[{t:13,n:"class",f:"logo",g:1},{n:"pad",f:0,t:13}],f:[{t:7,e:"h1",m:[{t:13,n:"style",f:"text-align: center;",g:1}],f:[{t:7,e:"img",m:[{n:"src",f:"./raui.svg",t:13,g:1},{n:"alt",f:"raui logo",t:13,g:1}]},"RaUI"]}]}," ",{t:7,e:"item",m:[{n:"ref",f:"Hello",t:13,g:1}],f:[{t:7,e:"h3",f:["Welcome"]}," ",{t:7,e:"right",f:[{t:7,e:"a",m:[{n:"href",f:"https://github.com/evs-chris/raui",t:13,g:1},{n:"target",f:"_blank",t:13,g:1}],f:[{t:7,e:"svg",m:[{n:"aria-labelledby",f:"simpleicons-github-icon",t:13,g:1},{n:"role",f:"img",t:13,g:1},{n:"viewBox",f:"0 0 24 24",t:13,g:1},{n:"xmlns",f:"http://www.w3.org/2000/svg",t:13,g:1},{n:"id",f:"gh",t:13,g:1}],f:[{t:7,e:"title",m:[{n:"id",f:"simpleicons-github-icon",t:13,g:1}],f:["Browse code on GitHub"]},{t:7,e:"path",m:[{n:"d",f:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",t:13,g:1}]}]}]}]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Components"]}," ",{t:7,e:"item",m:[{n:"ref",f:"AppBar",t:13,g:1}],f:["AppBar"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Card",t:13,g:1}],f:["Card"]}," ",{t:7,e:"item",m:[{n:"ref",f:"JSONEditor",t:13,g:1}],f:["JSON Editor"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Menu",t:13,g:1}],f:["Menu"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Popover",t:13,g:1}],f:["Popover"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Shell",t:13,g:1}],f:["Shell"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Split",t:13,g:1}],f:["Split"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Table",t:13,g:1}],f:["Table"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Tabs",t:13,g:1}],f:["Tabs"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Toggle",t:13,g:1}],f:["Toggle"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Window",t:13,g:1}],f:["Window"]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Decorators"]}," ",{t:7,e:"item",m:[{n:"ref",f:"AceEditor",t:13,g:1}],f:["Ace Editor"]}," ",{t:7,e:"item",m:[{n:"ref",f:"CodeMirror",t:13,g:1}],f:["CodeMirror"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Date",t:13,g:1}],f:["Date"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Form",t:13,g:1}],f:["Form"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Grid",t:13,g:1}],f:["Grid"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Marked",t:13,g:1}],f:["Marked"]}," ",{t:7,e:"item",m:[{n:"ref",f:"MaskedInput",t:13,g:1}],f:["Masked Input"]}," ",{t:7,e:"item",m:[{n:"ref",f:"ScrollSpy",t:13,g:1}],f:["Scroll Spy"]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Events"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Click",t:13,g:1}],f:["Click"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Keys",t:13,g:1}],f:["Keys"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Swipe",t:13,g:1}],f:["Swipe"]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Transitions"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Expand",t:13,g:1}],f:["Expand"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Fade",t:13,g:1}],f:["Fade"]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Helpers"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Button",t:13,g:1}],f:["Button"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Toast",t:13,g:1}],f:["Toast"]}]}]}]}," ",{t:7,e:"center",m:[{t:13,n:"class",f:"app-center",g:1},{n:"style-overflow",f:[{t:2,x:{r:["win.max"],s:"_0?\"hidden\":\"auto\""}}],t:13}],f:[{t:4,f:[{t:7,e:"app-bar",f:[{t:7,e:"left",f:[{t:7,e:"div",m:[{t:13,n:"class",f:"hamburger",g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.toggle(\"menu.hidden\")]"}}],f:["☰"]}]}]}],n:51,r:"win.max"}," ",{t:7,e:"host",m:[{n:"windows",t:13,f:[{t:2,r:"windows"}]},{n:"placement",f:"smart",t:13,g:1}],f:[{t:7,e:"max-top",f:[{t:7,e:"app-bar",f:[{t:7,e:"left",f:[{t:7,e:"div",m:[{t:13,n:"class",f:"hamburger",g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.toggle(\"menu.hidden\")]"}}],f:["☰"]}]}," ",{t:7,e:"center",f:[{t:2,r:"window.title"}]}," ",{t:7,e:"right",f:[{t:8,r:"windowControls"}]}]}]}]}]}]}],e:{"_0?\"hidden\":\"auto\"":function (_0){return(_0?"hidden":"auto");},"[_0.toggle(\"menu.hidden\")]":function (_0){return([_0.toggle("menu.hidden")]);}}},
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

            var builtins = ['Hello', 'AceEditor', 'AppBar', 'Button', 'Card', 'Click', 'CodeMirror', 'Date', 'Expand', 'Fade', 'Form', 'Grid', 'JSONEditor', 'Keys', 'Marked', 'MaskedInput', 'Menu', 'Popover', 'ScrollSpy', 'Shell', 'Split', 'Swipe', 'Table', 'Tabs', 'Toast', 'Toggle', 'Window'];

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

      var Tabs = /*@__PURE__*/(function (Ractive) {
        function Tabs(opts) {
          Ractive.call(this, opts);
        }

        if ( Ractive ) Tabs.__proto__ = Ractive;
        Tabs.prototype = Object.create( Ractive && Ractive.prototype );
        Tabs.prototype.constructor = Tabs;

        Tabs.prototype.addTab = function addTab (tab, idx) {
          if (!tab.template) { tab.template = []; }

          if (typeof idx === 'number') {
            this.splice('tabs', idx, 0, tab);
          } else {
            this.push('tabs', tab);
          }

          var res = new Handle(this, tab);

          if (tab.select) { this.select(res.index); }

          return res;
        };

        Tabs.prototype.getTab = function getTab (id) {
          var tabs = this.get('tabs');
          var tab = tabs.find(function (t) { return t.id === id; });
          if (tab) { return new Handle(this, tab); }
          else if (id in tabs && typeof tabs[id] === 'object') { return new Handle(this, tabs[id]); }
        };

        Tabs.prototype.updateIndicator = function updateIndicator () {
          if (!this.rendered) { return; }
          var ctx = this.getContext(this.find('.rtabs-tab-window'));
          if (ctx.decorators.scrolled) { ctx.decorators.scrolled.refresh(); }
          if (this.get('@style.raui.tabs.boxy')) { return; }
          var node = this._tabs[this.get('selected')];
          if (!node || !node.offsetParent) { return; }

          if (node) {
            var start = this.get('selectedLeft');
            if (start === undefined) {
              this.set({
                selectedLeft: node.offsetLeft,
                selectedRight: node.offsetParent.clientWidth - (node.offsetLeft + node.offsetWidth)
              });
            } else {
              var max = node.offsetParent.clientWidth;
              var left = node.offsetLeft, width = node.clientWidth, right = max - left - width;

              this.set({
                direction: left < start ? 'left' : 'right',
                selectedLeft: left,
                selectedRight: right
              });
            }
          } else {
            this.set({
              selectedLeft: 0,
              selectedRight: this.find('.tabs').offsetWidth
            });
          }
        };

        Tabs.prototype.checkSelection = function checkSelection (ctx, idx) {
          if (this.get('selected') !== idx) { select.call(this, ctx, idx); }
        };

        Tabs.prototype.select = function select (idx) {
          this.fire('select', {}, idx);
        };

        Tabs.prototype._hidden = function _hidden (idx) {
          var hidden = this.get(("tabs." + idx + ".hidden"));
          if (typeof hidden === 'string') { return this.get(hidden); }
          else { return hidden; }
        };

        Tabs.prototype.stopHorizontalScroll = function stopHorizontalScroll (node) {
          if (node.scrollLeft) { node.scrollLeft = 0; }
        };

        Tabs.prototype._scrollsRight = function _scrollsRight () {
          var scroll = this.get('scrollStatus') || '';
          if (/hscroll.*(hmiddle|left)/.test(scroll) && !/right/.test(scroll)) { return true; }
        };

        Tabs.prototype._scrollsLeft = function _scrollsLeft () {
          var scroll = this.get('scrollStatus') || '';
          if (/hscroll.*(hmiddle|right)/.test(scroll) && !/left/.test(scroll)) { return true; }
        };

        return Tabs;
      }(Ractive$1));

      var tabAttrs = ['closable', 'disabled', 'title', 'right', 'button', 'no-pad', 'hidden', 'id', 'load'];

      // TODO: api handles
      Ractive$1.extendWith(Tabs, {
        template: {v:4,t:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs",g:1},{t:16,r:"extra-attributes"},{n:"class-rtabs-flat",t:13,f:[{t:2,r:"~/flat"}]},{n:"class-rtabs-margin",t:13,f:[{t:2,r:"~/margin"}]},{n:"class-rtabs-fill",t:13,f:[{t:2,r:"~/fill"}]},{n:"sized",t:71,f:{r:[],s:"[{clientWidth:\"~/clientWidth\"}]"}}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-tab-window-wrapper",g:1},{n:"class-rtabs-scroll-right",t:13,f:[{t:2,x:{r:["@this"],s:"_0._scrollsRight()"}}]},{n:"class-rtabs-scroll-left",t:13,f:[{t:2,x:{r:["@this"],s:"_0._scrollsLeft()"}}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-tab-window",g:1},{t:4,f:[{n:"class-rtabs-going-left",t:13}],n:50,x:{r:[".direction"],s:"_0===\"left\""}},{t:4,f:[{n:"class-rtabs-going-right",t:13}],n:51,l:1},{n:"scrolled",t:71,f:{r:[],s:"[\"~/scrollStatus\"]"}}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-tabs",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-left",g:1},{n:"class-rtabs-center",t:13,f:[{t:2,r:"~/center"}]}],f:[{t:4,f:[{t:4,f:[{t:8,r:"tab"}],n:50,x:{r:[".right","@this","@index"],s:"!_0&&!_1._hidden(_2)"}}],n:52,r:".tabs"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-right",g:1}],f:[{t:4,f:[{t:4,f:[{t:8,r:"tab"}],n:50,x:{r:[".right","@this","@index"],s:"_0&&!_1._hidden(_2)"}}],n:52,r:".tabs"}]}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-indicator",g:1},{n:"style-left",f:[{t:2,r:".selectedLeft"},"px"],t:13},{t:4,f:[{n:"style-right",f:[{t:2,r:".selectedRight"},"px"],t:13}],n:50,x:{r:[".selectedRight"],s:"_0!==undefined"}}]}],n:51,r:"@style.raui.tabs.boxy"}]}]}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-content-wrapper",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-content-window",g:1},{t:4,f:[{n:"class-rtabs-trans-fade",t:13}],n:50,x:{r:[".transition"],s:"_0===\"fade\""}},{t:4,f:[{n:"class-rtabs-trans-slide",t:13}],n:50,x:{r:[".transition"],s:"_0===\"slide\""},l:1},{n:["scroll"],t:70,f:{r:["@this","@node"],s:"[_0.stopHorizontalScroll(_1)]"}}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-contents",g:1},{n:"style-opacity",f:[{t:2,r:"~/opacity"}],t:13},{n:"style-left",f:[{t:2,x:{r:[".selectedContent"],s:"_0*-100"}},"%"],t:13},{n:"class-rtabs-pad",t:13,f:[{t:2,r:"~/pad"}]}],f:[{t:4,f:[{t:8,r:"tab-content"}],n:52,r:".tabs"}]}]}]}]}],e:{"[{clientWidth:\"~/clientWidth\"}]":function (){return([{clientWidth:"~/clientWidth"}]);},"_0._scrollsRight()":function (_0){return(_0._scrollsRight());},"_0._scrollsLeft()":function (_0){return(_0._scrollsLeft());},"_0===\"left\"":function (_0){return(_0==="left");},"[\"~/scrollStatus\"]":function (){return(["~/scrollStatus"]);},"!_0&&!_1._hidden(_2)":function (_0,_1,_2){return(!_0&&!_1._hidden(_2));},"_0&&!_1._hidden(_2)":function (_0,_1,_2){return(_0&&!_1._hidden(_2));},"_0!==undefined":function (_0){return(_0!==undefined);},"_0===\"fade\"":function (_0){return(_0==="fade");},"_0===\"slide\"":function (_0){return(_0==="slide");},"[_0.stopHorizontalScroll(_1)]":function (_0,_1){return([_0.stopHorizontalScroll(_1)]);},"_0*-100":function (_0){return(_0*-100);},"_0===_1":function (_0,_1){return(_0===_1);},"_0===\"dynamic\"":function (_0){return(_0==="dynamic");},"_0!==_1":function (_0,_1){return(_0!==_1);},"_0===false":function (_0){return(_0===false);},"[_0.checkSelection((_1),_2)]":function (_0,_1,_2){return([_0.checkSelection((_1),_2)]);},"(_3===\"always\"&&_0===_1)||(_3&&_2)||!_3":function (_0,_1,_2,_3){return((_3==="always"&&_0===_1)||(_3&&_2)||!_3);},"!_0":function (_0){return(!_0);},"_0===_1&&!_2":function (_0,_1,_2){return(_0===_1&&!_2);},"typeof _1===\"string\"?_0.get(_1):_1":function (_0,_1){return(typeof _1==="string"?_0.get(_1):_1);},"[[\"select\",_0]]":function (_0){return([["select",_0]]);},"[_0.button()]":function (_0){return([_0.button()]);},"typeof _0===\"function\"":function (_0){return(typeof _0==="function");},"[_0]":function (_0){return([_0]);},"typeof _0===\"string\"":function (_0){return(typeof _0==="string");},"[[\"close\",_0]]":function (_0){return([["close",_0]]);},"_0&&!_1":function (_0,_1){return(_0&&!_1);}},p:{"tab-content":[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-tab-content",g:1},{n:"class-rtabs-selected-content",t:13,f:[{t:2,x:{r:["~/selectedContent","@index"],s:"_0===_1"}}]},{n:"class-rtabs-dyna",t:13,f:[{t:2,x:{r:["~/height"],s:"_0===\"dynamic\""}}]},{n:"class-rtabs-not-selected",t:13,f:[{t:2,x:{r:["~/selectedContent","@index"],s:"_0!==_1"}}]},{t:4,f:[{t:16,r:".extra"}],n:50,r:".extra"},{t:4,f:[{n:"class-rtabs-no-pad",t:13}],n:50,x:{r:[".pad"],s:"_0===false"}},{t:4,f:[{n:"class-rtabs-no-pad",t:13,f:[{t:2,rx:{r:"~/",m:[{t:30,n:".padRef"}]}}]}],n:50,r:".padRef",l:1},{n:["focus"],t:70,f:{r:["@this","@context","@index"],s:"[_0.checkSelection((_1),_2)]"}}],f:[{t:4,f:[{t:16,r:".template"}],n:50,x:{r:["~/selectedContent","@index",".load","~/defer"],s:"(_3===\"always\"&&_0===_1)||(_3&&_2)||!_3"}}]}],n:50,x:{r:[".button"],s:"!_0"}},{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-placeholder",g:1}]}],n:51,l:1}],tab:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-tab",g:1},{n:"class-rtabs-selected",t:13,f:[{t:2,x:{r:["~/selected","@index",".button"],s:"_0===_1&&!_2"}}]},{t:4,f:[{n:"class-rtabs-disabled",t:13}],n:50,x:{r:["@this",".disabled"],s:"typeof _1===\"string\"?_0.get(_1):_1"}},{t:4,f:[{n:["click"],t:70,f:{r:["@index"],s:"[[\"select\",_0]]"}}],n:50,x:{r:[".button"],s:"!_0"},l:1},{t:4,f:[{n:["click"],t:70,f:{r:["."],s:"[_0.button()]"}}],n:50,x:{r:[".button"],s:"typeof _0===\"function\""},l:1},{n:"registered",t:71,f:{r:["@index"],s:"[_0]"}},{t:4,f:[{t:16,r:".extraTab"}],n:50,r:".extraTab"},{n:"data-tab-index",f:[{t:2,r:"@index"}],t:13}],f:[{t:4,f:[{t:2,r:"title"}],n:50,x:{r:[".title"],s:"typeof _0===\"string\""}},{t:4,f:[{t:16,r:".title"}],n:50,r:".title",l:1}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-close",g:1},{n:["click"],t:70,f:{r:["@index"],s:"[[\"close\",_0]]"}}],f:["×"]}],n:50,x:{r:[".closable",".button"],s:"_0&&!_1"}}]}]}},
        cssId: 'rtab',
        noCssTransform: true,
        css: function(data) { return [(function(data) {
         var primary = Object.assign({}, data('raui.primary'), data('raui.tabs.primary'));
         primary.selected = Object.assign({}, data('raui.tabs.selected'), data('raui.tabs.primary.selected'));
         primary.indicator = Object.assign({}, data('raui.tabs.indicator'), data('raui.tabs.primary.indicator'));
         var themes = (data('raui.themes') || []).slice();
         (data('raui.tabs.themes') || []).forEach(function (t) {
           if (!~themes.indexOf(t)) { themes.push(t); }
         });
         var boxy = data('raui.tabs.boxy') || data('raui.tabs.primary.boxy');
       
         return "\n   .rtabs {\n     position: relative;\n     display: flex;\n     flex-direction: column;\n     width: 100%;\n   }\n \n   .rtabs-tab-window {\n     overflow-y: hidden;\n     overflow-x: auto;\n     " + (!boxy ? ("box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n       0 1px 5px 0 rgba(0, 0, 0, 0.12),\n       0 3px 1px -2px rgba(0, 0, 0, 0.2);\n     color: " + (primary.fg || '#222') + ";\n     background-color: " + (primary.bg || '#fff') + ";") :
           ("border-color: " + (primary.bc || '#ccc') + ";\n     border-style: solid;\n     border-width: 1px 1px 0 1px;\n     color: " + (primary.fg || '#222') + ";\n     background-color: " + (primary.bga || '#f4f4f4') + ";\n     ")) + "\n     position: relative;\n     flex-shrink: 0;\n   }\n   .alt > div > .rtabs-tab-window {\n     color: " + (primary.bg || '#fff') + ";\n     background-color: " + (primary.fga || '#07e') + ";\n   }" + (boxy ? ("\n   .alt > div > .rtabs-tab-window .rtabs-tab {\n     color: " + (primary.bg || '#fff') + ";\n     background-color: " + (primary.fga || '#07e') + ";\n   }") : '') + "\n \n   .rtabs-tab-window-wrapper {\n     position: relative;\n     z-index: 10;\n   }\n   .rtabs-tab-window-wrapper:before {\n     content: '';\n     position: absolute;\n     top: 0;\n     left: 0;\n     height: 100%;\n     width: 10px;\n     opacity: 0;\n     transition: opacity 0.3s ease-in-out;\n     background: linear-gradient(to right, " + (primary.indicator.color || primary.fga || '#07e') + ", transparent);\n     z-index: 999;\n     pointer-events: none;\n   }\n   .rtabs-tab-window-wrapper.rtabs-scroll-left:before {\n     opacity: 1;\n   }\n \n   .rtabs-tab-window-wrapper:after {\n     content: '';\n     position: absolute;\n     top: 0;\n     right: 0;\n     height: 100%;\n     width: 10px;\n     opacity: 0;\n     background: linear-gradient(to left, " + (primary.indicator.color || primary.fga || '#07e') + ", transparent);\n     transition: opacity 0.3s ease-in-out;\n     pointer-events: none;\n   }\n   .rtabs-tab-window-wrapper.rtabs-scroll-right:after {\n     opacity: 1;\n   }\n \n   .rtabs-flat > div > .rtabs-tab-window {\n     box-shadow: none;\n     border-width: 0;\n   }\n   " + (!boxy ? (".rtabs-flat > div > .rtabs-tab-window:after {\n     content: '';\n     height: 0.15em;\n     position: absolute;\n     bottom: 0px;\n     width: 100%;\n     display: block;\n     background-color: " + (primary.bga || '#f4f4f4') + ";\n   }\n   .rtabs-flat.alt > div > .rtabs-tab-window:after {\n     background-color: " + (primary.fga || '#07e') + ";\n   }") : ("\n   .rtabs-flat > div > .rtabs-tab-window {\n     background-color: " + (primary.bg || '#fff') + ";\n   }\n   .alt.rtabs-flat > div > .rtabs-tab-window {\n     background-color: " + (primary.fga || '#07e') + ";\n   }\n   .rtabs-flat > div > .rtabs-tab-window .rtabs-tab {\n     border-top-width: 1px;\n   }")) + "\n \n   .rtabs-center.rtabs-left {\n     text-align: center;\n   }" + (boxy ? "\n   .rtabs-center > .rtabs-tab:first-child {\n     border-left-width: 1px;\n   }" : '') + "\n \n   .rtabs-pad {\n     padding: 1em;\n   }\n \n   .rtabs-fill {\n     flex-grow: 1;\n     height: 100%;\n   }\n \n   .rtabs-tabs {\n     display: table;\n     position: relative;\n     min-width: 100%;\n     white-space: nowrap;" + (boxy ? ("\n     border-style: solid;\n     border-width: 0 0 1px 0;\n     border-color: " + (primary.bc || '#ccc') + ";\n     line-height: 1.5em;") : '') + "\n   }\n \n   .rtabs-tab {\n     display: inline-block;\n     box-sizing: border-box;\n     padding: 0.5em 1em;\n     height: 2.5em;\n     transition: opacity 0.2s ease-in-out;\n     user-select: none;\n     cursor: pointer;" + (!boxy ? "\n     opacity: 0.9;" : ("\n     border-color: " + (primary.bc || '#ccc') + ";\n     border-style: solid;\n     border-width: 0 1px 1px 0;\n     margin-bottom: -1px;\n     color: " + (primary.fg || '#222') + ";\n     background-color: " + (primary.bga || '#f4f4f4') + ";\n     ")) + "\n   }\n   .rtabs-tab:hover {\n     opacity: 1;\n   }\n \n   .rtabs-selected" + (boxy ? ",\n   .alt > div > .rtabs-tab-window .rtabs-selected" : '') + " {\n     opacity: 1;" + (boxy ? ("\n     font-weight: bold;\n     border-bottom-color: " + (primary.bg || '#fff') + ";\n     background-color: " + (primary.selected.bg || primary.bg || '#fff') + ";\n     color: " + (primary.selected.fg || primary.fg || '#222') + ";") : '') + "\n   }\n \n   .rtabs-disabled {\n     opacity: 0.4;\n   }\n \n   .rtabs-right {\n     text-align: right;\n     display: table-cell;\n   }\n \n   .rtabs-left {\n     text-align: left;\n     display: table-cell;\n   }\n \n   .rtabs-close {\n     display: inline-block;\n     margin-right: -0.5em;\n     font-weight: 700;\n     opacity: 0.3;\n     transition: opacity: 0.2s ease-in-out;\n   }\n \n   .rtabs-close:hover {\n     opacity: 1;\n   }\n \n   .rtabs-indicator {\n     position: absolute;\n     bottom: 0;\n     height: 0.15em;\n     background-color: " + (primary.indicator.color || primary.fga || '#07e') + ";\n     z-index: 2;\n   }\n \n   .alt > div > .rtabs-tab-window .rtabs-indicator {\n     background-color: " + (primary.bg || '#fff') + ";\n   }\n \n   .rtabs-going-left .rtabs-indicator {\n     transition: left 0.2s ease-in-out, right 0.2s ease-in-out 0.1s;\n   }\n   .rtabs-going-right .rtabs-indicator {\n     transition: left 0.2s ease-in-out 0.1s, right 0.2s ease-in-out;\n   }\n \n   .rtabs-content-wrapper {\n     width: 100%;\n     box-sizing: border-box;\n     display: flex;\n     flex-direction: column;\n     flex-grow: 2;\n     overflow: hidden;\n   }\n \n   .rtabs-content-window {\n     width: 100%;\n     display: flex;\n     flex-grow: 1;\n     overflow-y: auto;\n     overflow-x: hidden\n   }\n \n   .rtabs {\n     color: " + (primary.fg || '#222') + ";\n     background-color: " + (primary.bg || '#fff') + ";\n   }\n   \n   .rtabs-contents {\n     list-style: none;\n     padding: 0;\n     margin: 0;\n     position: relative;\n     left: 0;\n     display: block;\n     flex-wrap: nowrap;\n     white-space: nowrap;\n     width: 100%;\n   }\n   .rtabs-trans-slide > .rtabs-contents {\n     transition: left 0.2s ease-in-out;\n   }\n   .rtabs-trans-fade > .rtabs-contents {\n     transition: opacity 0.15s ease;\n     opacity: 1;\n     white-space: nowrap;\n   }\n \n   .rtabs-fill > div > div > .rtabs-contents {\n     display: flex;\n   }\n \n   .rtabs-tab-content {\n     display: inline-block;\n     position: relative;\n     width: 100%;\n     overflow: auto;\n     vertical-align: top;\n     white-space: initial;\n     transition: opacity 0.1s ease-in-out;\n     flex-shrink: 0;\n     white-space: initial;\n     display: inline-block;\n     flex-direction: column;\n     flex-grow: 1;\n   }\n \n   .rtabs-placeholder {\n     display: inline-block;\n     width: 100%;\n     height: 1px;\n     flex-shrink: 0;\n   }\n   .rtabs-dyna.rtabs-not-selected {\n     height: 1px;\n     opacity: 0;\n     overflow: hidden;\n   }\n   .rtabs-pad > .rtabs-tab-content {\n     padding: 1em;\n     box-sizing: border-box;\n   }\n   .rtabs-pad > .rtabs-tab-content.rtabs-no-pad {\n     padding: 0;\n   }\n   .rtabs > .rtabs-tab-content.rtabs-pad {\n     padding: 1em;\n     box-sizing: border-box;\n   }\n   " + themes.map(function (t) {
           var theme = Object.assign({}, data('raui.primary'), data('raui.tabs.primary'), data(("raui." + t)), data(("raui.tabs." + t)));
           theme.selected = Object.assign({}, data('raui.tabs.selected'), data('raui.tabs.primary.selected'), data(("raui.tabs." + t + ".selected")));
           theme.indicator = Object.assign({}, data('raui.tabs.indicator'), data('raui.tabs.primary.indicator'), data(("raui.tabs." + t + ".indicator")));
           var boxy = 'boxy' in theme ? theme.boxy : data('raui.tabs.boxy');
       
           return (".rtabs." + t + " > div > .rtabs-tab-window {\n     " + (!boxy ? ("box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n       0 1px 5px 0 rgba(0, 0, 0, 0.12),\n       0 3px 1px -2px rgba(0, 0, 0, 0.2);\n     color: " + (theme.fg || '#222') + ";\n     background-color: " + (theme.bg || '#fff') + ";") :
           ("border-color: " + (theme.bc || '#ccc') + ";\n     color: " + (theme.fg || '#222') + ";\n     background-color: " + (theme.bga || '#f4f4f4') + ";\n     ")) + "\n   }\n   .rtabs." + t + " > .rtabs-tab-window-wrapper:before {\n     background: linear-gradient(to right, " + (theme.indicator.color || theme.fga || '#07e') + ", transparent);\n   }\n   .rtabs." + t + " > .rtabs-tab-window-wrapper:after {\n     background: linear-gradient(to left, " + (theme.indicator.color || theme.fga || '#07e') + ", transparent);\n   }\n   .rtabs." + t + ".alt > div > .rtabs-tab-window {\n     color: " + (theme.bg || '#fff') + ";\n     background-color: " + (theme.fga || '#07e') + ";\n   }" + (boxy ? ("\n   .rtabs." + t + ".alt > div > .rtabs-tab-window .rtabs-tab {\n     color: " + (theme.bg || '#fff') + ";\n     background-color: " + (theme.fga || '#07e') + ";\n   }") : '') + "\n \n   " + (!boxy ? (".rtabs-flat." + t + " > div > .rtabs-tab-window:after {\n     background-color: " + (theme.bga || '#f4f4f4') + ";\n   }\n   .rtabs-flat.alt." + t + " > div > .rtabs-tab-window:after {\n     background-color: " + (theme.fga || '#07e') + ";\n   }") : ("\n   .rtabs-flat." + t + " > div > .rtabs-tab-window {\n     background-color: " + (theme.bg || '#fff') + ";\n   }\n   .alt.rtabs-flat." + t + " > div > .rtabs-tab-window {\n     background-color: " + (theme.fga || '#07e') + ";\n   }")) + "\n \n   " + (boxy ? (".rtabs." + t + " > div > .rtabs-tab-window .rtabs-tabs {\n     border-color: " + (theme.bc || '#ccc') + ";\n   }") : '') + "\n \n   .rtabs." + t + " > div > .rtabs-tab-window > .rtabs-tab {\n     cursor: pointer;" + (!boxy ? '' : ("\n     border-color: " + (theme.bc || '#ccc') + ";\n     color: " + (theme.fg || '#222') + ";\n     background-color: " + (theme.bga || '#f4f4f4') + ";\n     ")) + "\n   }\n \n   .rtabs." + t + " > div > .rtabs-tab-window .rtabs-selected" + (boxy ? (",\n   .rtabs." + t + ".alt > div > .rtabs-tab-window .rtabs-selected") : '') + " {" + (boxy ? ("\n     border-bottom-color: " + (them.bg || '#fff') + ";\n     background-color: " + (theme.selected.bg || theme.bg || '#fff') + ";" + (theme.indicator ? ("\n     background-image: linear-gradient(to bottom, " + (theme.indicator.color || theme.fga || '#07e') + ", " + (theme.bg || '#fff') + " 3px);") : '') + "\n     color: " + (theme.selected.fg || theme.fg || '#222') + ";") : '') + "\n   }\n \n   .rtabs." + t + " > div > .rtabs-tab-window .rtabs-indicator {\n     background-color: " + (theme.indicator.color || theme.fga || '#07e') + ";\n   }\n \n   .rtabs." + t + ".alt > div > .rtabs-tab-window .rtabs-indicator {\n     background-color: " + (theme.bg || '#fff') + ";\n   }\n \n   .rtabs." + t + " {\n     color: " + (theme.fg || '#222') + ";\n     background-color: " + (theme.bg || '#fff') + ";\n   }\n   ");
         }).join('\n');
      }).call(this, data)].join(' '); },
        attributes: ['transition', 'flat', 'pad', 'center', 'height', 'fill', 'defer'],
        data: function data() {
          return {
            tabs: [],
            rightTabs: [],
            selected: -1,
            selectedContent: -1,
            opacity: 1,
            scrollStatus: ''
          }
        },
        on: {
          construct: construct,
          config: function config() {
            var this$1 = this;

            if ( this._tabs ) { this.set('tabs', (this.get('tabs') || []).concat(this._tabs), { shuffle: true }); }
            var tabs = this.get('tabs');
            var xs = this.indicatorObservers = [];
            tabs.forEach(function (t) {
              if (typeof t.hidden === 'string') { xs.push(this$1.observe(t.hidden, function () { return setTimeout(function () { return this$1.updateIndicator(); }); }, { init: false, defer: true })); }
            });
            xs.push(this.observe('tabs.*.hidden', function () { return setTimeout(function () { return this$1.updateIndicator(); }); }, { init: false, defer: true }));

            this.once('render', function () {
              if (this$1.get('selected') === -1) { this$1.select(0); }
            });
          },
          select: select,
          close: close,
          teardown: function teardown() {
            this.indicatorObservers.forEach(function (o) { return o.cancel(); });
          }
        },
        observe: {
          selected: {
            handler: function handler(v) {
              var this$1 = this;

              var hidden = this._hidden(v);
              var tabs = this.get('tabs');
              if (hidden) { setTimeout(function () {
                var trans = this$1.get('transition');
                this$1.set('transition', '');
                this$1.select(v + 1 >= tabs.length ? 0 : v + 1);
                this$1.set('transition', trans);
              }); }
            },
            init: false
          },
          clientWidth: function clientWidth() {
            this.updateIndicator();
          }
        },
        decorators: {
          registered: function registered(node, idx) {
            var me = this;

            if (!this._tabs) { this._tabs = []; }

            this._tabs[idx] = node;
            this.updateIndicator();

            return {
              teardown: function teardown() {},
              invalidate: function invalidate() {
                me.updateIndicator();
              },
              update: function update(idx) {
                me._tabs[idx] = node;
                setTimeout(function () { return me.updateIndicator(); });
              }
            };
          },
          scrolled: scrolled, sized: sized
        }
      });

      function construct() {
        var cmp = this.component;
        if ( !cmp ) { return; }

        var tpl = cmp.template.f || [];
        var attrs = cmp.template.m ? cmp.template.m.slice() : [];
        var t = cmp.template;
        cmp.template = { e: t.e, f: t.f, t: t.t, m: attrs };

        var tabs = tpl.filter(function (n) { return n.e === 'tab'; }).map(function (t) {
          var tab = {
            template: { t: t.f.filter(function (n) { return n.e !== 'title'; }) }
          };
          var extra = [];
          var extraTab = [];

          t.m && t.m.forEach(function (a) {
            if (a.t === 13 && ~tabAttrs.indexOf(a.n)) {
              if (a.n === 'disabled' && a.f && a.f.length === 1 && a.f[0].t === 2) {
                var cnd = "_cnd" + (attrs.length);
                tab.disabled = cnd;
                attrs.push({ t: 13, n: cnd, f: a.f });
              } else if (a.n === 'no-pad') {
                if (!a.f) { tab.pad = false; }
                else if (a.f.length === 1 && a.f[0].t === 2) {
                  var cnd$1 = "_cnd" + (attrs.length);
                  tab.padRef = cnd$1;
                  attrs.push({ t: 13, n: cnd$1, f: a.f });
                }
              } else if (a.n === 'hidden' && a.f && a.f.length === 1 && a.f[0].t === 2) {
                var cnd$2 = "_cnd" + (attrs.length);
                tab.hidden = cnd$2;
                attrs.push({ t: 13, n: cnd$2, f: a.f });
              } else {
                tab[a.n] = a.f === 0 ? true : typeof a.f === 'string' ? a.f : { t: a.f };
              }
            }
            else if (a.t === 70) { extraTab.push(a); }
            else { extra.push(a); }
          });

          var tmp;
          tmp = t.f.find(function (n) { return n.e === 'title'; });
          if (tmp) {
            tab.title = tmp.f;
            if (tmp.m) {
              extraTab.push.apply(extraTab, tmp.m);
            }
          }

          if (extra.length) { tab.extra = { t: extra }; }
          if (extraTab.length) { tab.extraTab = { t: extraTab }; }

          return tab;
        });

        this._tabs = tabs;
      }

      function select(ctx, idx) {
        var this$1 = this;
        var obj;

        var current = this.get('selected');
        var trans = this.get('transition');

        if (current !== idx) {
          var cur = this.getContext(this.find('.rtabs-selected'));
          var window = this.find('.rtabs-content-window');
          if (~current) { this.set(("scroll." + (cur.get('@index'))), window.scrollTop); }
          if (cur.hasListener('leave')) { cur.raise('leave'); }
          if (trans === 'fade') {
            this.set({
              opacity: 0,
              selected: idx
            });
            this.updateIndicator();
            var ctx$1 = this.getContext(this.find('.rtabs-selected'));

            setTimeout(function () {
              var obj;

              this$1.set(( obj = {
                selectedContent: idx
              }, obj[("tabs." + idx + ".load")] = true, obj.opacity = 1, obj));
              if (ctx$1.hasListener('enter')) { ctx$1.raise('enter'); }
              if (window && ~current) { window.scrollTop = this$1.get(("scroll." + idx)) || 0; }
            }, 150);
          } else if (trans === 'slide') {
            this.set('selected', idx);
            this.set(("tabs." + idx + ".load"), true);
            this.set('selectedContent', idx);
            this.updateIndicator();
            var ctx$2 = this.getContext(this.find('.rtabs-selected'));
            if (ctx$2.hasListener('enter')) { ctx$2.raise('enter'); }
            if (window && ~current) { window.scrollTop = this.get(("scroll." + idx)) || 0; }
          } else {
            this.set(( obj = {
              selected: idx
            }, obj[("tabs." + idx + ".load")] = true, obj.selectedContent = idx, obj));
            this.updateIndicator();
            var ctx$3 = this.getContext(this.find('.rtabs-selected'));
            if (ctx$3.hasListener('enter')) { ctx$3.raise('enter'); }
            if (window) { window.scrollTop = this.get(("scroll." + idx)) || 0; }
          }

          if (~current && window && window.scrollLeft) { window.scrollLeft = 0; }
        }
      }

      function close(ctx, idx) {
        var tab = this.getContext(this._tabs[idx]);
        var ok = true;

        if (typeof tab.onclose === 'function') {
          ok = tab.onclose.call(undefined) !== false;
        }

        if (ok && tab.element.events.find(function (e) { return e.events.find(function (e) { return e.name === 'close'; }); })) {
          ok = tab.raise('close') !== false;
        }

        if (ok) { this.splice('tabs', idx, 1); }

        return false;
      }

      var Handle = function Handle(tabs, item) {
        this.tabs = tabs;
        this.item = item;
      };

      var prototypeAccessors = { keypath: { configurable: true },id: { configurable: true },index: { configurable: true },title: { configurable: true },template: { configurable: true },hidden: { configurable: true },right: { configurable: true },pad: { configurable: true },disabled: { configurable: true },button: { configurable: true },closable: { configurable: true },load: { configurable: true } };

      prototypeAccessors.keypath.get = function () {
        if (this.removed) { return; }
        return ("tabs." + (this.index));
      };

      prototypeAccessors.id.get = function () { return this.get('id'); };
      prototypeAccessors.id.set = function (v) { this.set('id', v); };
      prototypeAccessors.index.get = function () { return this.tabs.get('tabs').indexOf(this.item); };

      prototypeAccessors.title.get = function () { return this.get('title'); };
      prototypeAccessors.title.set = function (v) { this.set('title', v); };

      prototypeAccessors.template.get = function () { return this.get('template'); };
      prototypeAccessors.template.set = function (v) { return this.set('template', v); };

      prototypeAccessors.hidden.get = function () { return this.get('hidden'); };
      prototypeAccessors.hidden.set = function (v) { return this.set('hidden', v); };

      prototypeAccessors.right.get = function () { return this.get('right'); };
      prototypeAccessors.right.set = function (v) { return this.set('right', v); };

      prototypeAccessors.pad.get = function () { return this.get('pad'); };
      prototypeAccessors.pad.set = function (v) { return this.set('pad', v); };

      prototypeAccessors.disabled.get = function () { return this.get('disabled'); };
      prototypeAccessors.disabled.set = function (v) { return this.set('disabled', v); };

      prototypeAccessors.button.get = function () { return this.get('button'); };
      prototypeAccessors.button.set = function (v) { return this.set('button', v); };

      prototypeAccessors.closable.get = function () { return this.get('closable'); };
      prototypeAccessors.closable.set = function (v) { return this.set('closable', v); };

      prototypeAccessors.load.get = function () { return this.get('load'); };
      prototypeAccessors.load.set = function (v) { return this.set('load', v); };

      Handle.prototype.select = function select () {
        if (this.removed) { return; }
        this.tabs.select(this.index);
      };

      Handle.prototype.remove = function remove () {
        if (this.removed) { return false; }
        this.tabs.splice('tabs', this.index, 1);
        this.removed = true;
        return true;
      };

      Handle.prototype.get = function get (keypath) {
        if (this.removed) { return false; }
        if (!keypath) { return this.tabs.get(this.keypath); }
        var key = keypath.replace(/^[\.\/]*/, '');
        return this.tabs.get(((this.keypath) + "." + key));
      };

      Handle.prototype.set = function set (keypath, value) {
        if (this.removed) { return false; }
        var key = keypath.replace(/^[\.\/]*/, '');
        return this.tabs.set(((this.keypath) + "." + key), value);
      };

      Object.defineProperties( Handle.prototype, prototypeAccessors );

      function plugin$1(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.components[opts.name || 'tabs'] = Tabs;
        }
      }

      globalRegister('RMTabs', 'components', Tabs);

      function style$1(data) {
        var primary = Object.assign({}, data('raui.primary'), data('raui.form.primary'));
        var active = Object.assign({}, data('raui.primary.active'), data('raui.form.primary.active'));
        var boxy = data('raui.form.boxy');
        return ("\n  label.field {\n    display: inline-block;\n    font-size: 0.9em;\n    font-weight: 500;\n    color: " + (primary.fg || '#222') + ";\n    transition: 0.2s ease-in-out;\n    transition-property: color;\n    vertical-align: top;\n    box-sizing: border-box;\n    padding: 0.25em 0.5em;\n    line-height: 1.5em;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    font-family: inherit;\n  }\n\n  label.field.textarea {\n    display: block;\n    border: 0.0625em solid " + (primary.bc || '#ccc') + ";\n    padding: 0.5em 0.8em 0.8em 0.8em;\n    border-radius: " + (primary.radius || '0.2em') + ";\n    box-shadow: none;\n    transition-property: color, border-color, box-shadow;\n    margin: 0.8em 0.2em;\n    min-height: auto;\n    background-color: " + (boxy ? primary.bg || '#fff' : 'transparent') + ";\n  }\n\n  label.field.focus {\n    color: " + (active.fg || primary.fga || '#07e') + ";\n  }\n\n  label.field.textarea.focus {\n    border-color: " + (active.fg || primary.fga || '#07e') + ";\n    " + (!boxy ? ("box-shadow: 0.0625em 0.0625em " + (active.fg || primary.fga || '#07e') + ",\n      -0.0625em 0.0625em " + (active.fg || primary.fga || '#07e') + ",\n      0.0625em -0.0625em " + (active.fg || primary.fga || '#07e') + ",\n      -0.0625em -0.0625em " + (active.fg || primary.fga || '#07e') + ";") : '') + "\n  }\n\n  label.field input,\n  label.field select,\n  label.field textarea\n  {\n    display: block;\n    border-width: " + (boxy ? '0.0625em' : '0 0 0.0625em 0') + ";\n    border-color: " + (primary.bc || '#ccc') + ";\n    border-style: solid;\n    box-sizing: border-box;\n    background-color: " + (boxy ? primary.bg || '#fff' : 'transparent') + ";\n    transition: 0.2s ease-in-out;\n    transition-property: box-shadow, color;\n    outline: none;\n    box-shadow: none;\n    width: 100%;\n    margin-bottom: 0.8em;\n    font-size: 1.1em;" + (boxy ? ("\n  border-radius: " + (primary.radius || '0.2em') + ";") : '') + "\n    font-weight: 400;\n    font-family: inherit;\n  }\n\n  label.field input" + (boxy ? '' : ':disabled') + ",\n  label.field select" + (boxy ? '' : ':disabled') + " {\n    padding: 0 0.75em;\n  }\n  label.field select" + (boxy ? '' : ':disabled') + " {\n    padding-right: 2em;\n  }\n\n  label.field input:disabled,\n  label.field select:disabled,\n  label.field textarea:disabled {\n    background: #f4f4f4;\n  }\n\n  label.field textarea {\n    line-height: 1.2em;\n  }\n  label.field .field-wrapper {\n    display: block;\n  }\n  label.field > select, label.field > input,\n  label.field > .field-wrapper > input, label.field > .field-wrapper > select {\n    height: 2.5em;\n  }\n\n  " + (!boxy ? ("label.field:hover > input,\n  label.field:hover select,\n  label.field.file:hover:after {\n    box-shadow: 0 0.0625em 0 0 " + (primary.bc || '#ccc') + ";\n  }\n\n  label.field.textarea:hover {\n    box-shadow: 0.0625em 0.0625em " + (primary.bc || '#ccc') + ",\n      -0.0625em 0.0625em " + (primary.bc || '#ccc') + ",\n      0.0625em -0.0625em " + (primary.bc || '#ccc') + ",\n      -0.0625em -0.0625em " + (primary.bc || '#ccc') + ";\n  }\n\n  label.field.textarea.focus:hover {\n    box-shadow: 0.0625em 0.0625em " + (active.fg || primary.fga || '#07e') + ",\n      -0.0625em 0.0625em " + (active.fg || primary.fga || '#07e') + ",\n      0.0625em -0.0625em " + (active.fg || primary.fga || '#07e') + ",\n      -0.0625em -0.0625em " + (active.fg || primary.fga || '#07e') + ";\n  }") : '') + "\n\n  /**** CHECK BOXES ****/\n\n  label.field.check {\n    position:relative;\n    z-index: 0;\n    overflow: visible;\n    cursor: pointer;\n    padding-top: 2.2em;\n    white-space: normal;\n  }\n  label.field.check.inline {\n    padding-top: 0.7em;\n  }\n\n  label.field.check input {\n    appearance: none;\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    z-index: -1;\n    position: absolute;\n    left: -3px;\n    top: 23px;\n    display: block;\n    margin: 0;\n    border-radius: 50%;\n    width: 40px;\n    height: 40px;\n    background-color: " + (primary.bc || '#ccc') + ";\n    box-shadow: none;\n    outline: none;\n    opacity: 0;\n    transform: scale(1);\n    pointer-events: none;\n    transition: opacity 0.3s, transform 0.2s;\n  }\n  label.field.inline.check input {\n    top: 3px;\n    left: -3px;\n  }\n\n  label.field.check input:checked {\n    background-color: " + (primary.fga || '#07e') + ";\n  }\n\n  label.field.check:hover > input {\n    opacity: 0.04;\n  }\n\n  label.field.check input:focus {\n    opacity: 0.12;\n  }\n\n  label.field.check:hover > input:focus {\n    opacity: 0.16;\n  }\n\n  label.field.check input:active {\n    opacity: 0.6;\n    transform: scale(0);\n    transition: transform 0s, opacity 0s;\n  }\n\n  label.field.check:before {\n    content: \"\";\n    display: inline-block;\n    box-sizing: border-box;\n    margin: 3px 11px 3px 1px;\n    border: solid 2px; /* Safari */\n    border-color: " + (primary.fg || '#222') + ";\n    border-radius: 2px;\n    width: 18px;\n    height: 18px;\n    vertical-align: bottom;\n    transition: border-color 0.2s, background-color 0.2s;\n  }\n\n  label.field.check:after {\n    content: \"\";\n    display: block;\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    width: 10px;\n    height: 5px;\n    border: solid 2px transparent;\n    border-right: none;\n    border-top: none;\n    transform: translate(0.8em, 2.65em) rotate(-45deg);\n  }\n\n  label.field.check.inline:after {\n    transform: translate(0.8em, 1.2em) rotate(-45deg);\n  }\n\n  label.field.check.checked:before {\n    border-color: " + (primary.fga || '#07e') + ";\n    background-color: " + (primary.fga || '#07e') + ";\n  }\n  label.field.check.focus:before {\n    border-color: " + (primary.fga || '#07e') + ";\n  }\n\n  label.field.check.checked:after {\n    border-color: " + (primary.bg || '#fff') + ";\n  }\n\n  label.field.check input:disabled {\n    opacity: 0;\n  }\n\n  label.field.check.disabled {\n    color: " + (primary.bc || '#ccc') + ";\n    cursor: initial;\n  }\n\n  label.field.check.disabled:before {\n    border-color: " + (primary.bc || '#ccc') + ";\n  }\n\n  label.field.check.checked.disabled:before {\n    border-color: transparent;\n    background-color: " + (primary.bc || '#ccc') + ";\n  }\n\n\n  /**** RADIO BUTTONS ****/\n  \n  label.field.radio {\n    z-index: 0;\n    position: relative;\n    display: inline-block;\n    overflow: visible;\n    padding-top: 2.2em;\n    white-space: normal;\n  }\n  label.field.radio.inline {\n    padding-top: 0.8em;\n  }\n\n  label.field.radio input {\n    appearance: none;\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    z-index: -1;\n    position: absolute;\n    left: 0;\n    top: 0;\n    display: block;\n    margin: 0;\n    border-radius: 50%;\n    width: 41px;\n    height: 40px;\n    background-color: " + (primary.bc || '#ccc') + ";\n    outline: none;\n    opacity: 0;\n    pointer-events: none;\n    transform: translate(-0.2em, 24px) scale(1);\n    transition: opacity 0.3s, transform 0.3s;\n  }\n  label.field.inline.radio input {\n    transform: translate(-0.2em, 3px) scale(1);\n  }\n\n  label.field.radio {\n    cursor: pointer;\n    position: relative;\n  }\n\n  label.field.radio:before {\n    content: \"\";\n    display: inline-block;\n    box-sizing: border-box;\n    margin: 2px 10px 2px 0;\n    border: solid 2px; /* Safari */\n    border-color: " + (primary.fg || '#222') + ";\n    border-radius: 50%;\n    width: 20px;\n    height: 20px;\n    vertical-align: middle;\n    transition: border-color 0.2s;\n  }\n\n  label.field.radio:after {\n    content: \"\";\n    display: block;\n    position: absolute;\n    border-radius: 50%;\n    width: 10px;\n    height: 10px;\n    background-color: " + (primary.fga || '#07e') + ";\n    transform: translate(5px, -17px) scale(0);\n    transition: transform 0.2s;\n  }\n\n  label.field.radio input:checked {\n    background-color: " + (primary.fga || '#07e') + ";\n  }\n\n  label.field.radio.checked:before {\n    border-color: " + (primary.fga || '#07e') + ";\n  }\n\n  label.field.radio.checked:after {\n    transform: translate(5px, -17px) scale(1);\n  }\n\n  label.field.radio:hover input {\n    opacity: 0.04;\n  }\n\n  label.field.radio input:focus {\n    opacity: 0.12;\n    transform: translate(-0.2em, 24px) scale(1);\n    transition: transform 0.2s, opacity 0.2s;\n  }\n  label.field.inline.radio input:focus {\n    transform: translate(-0.2em, 3px) scale(1);\n  }\n\n  label.field.radio:hover input:focus {\n    opacity: 0.16;\n  }\n\n  label.field.radio input:active {\n    opacity: 1;\n    transform: translate(-0.2em, 24px) scale(0);\n    transition: transform 0s, opacity 0s;\n  }\n  label.field.inline.radio input:active {\n    transform: translate(-0.2em, 3px) scale(0);\n  }\n\n  label.field.radio.checked:before {\n    border-color: " + (primary.fga || '#07e') + ";\n  }\n\n  label.field.radio.focus:before {\n    border-color: " + (primary.fga || '#07e') + ";\n  }\n\n  label.field.radio input:disabled {\n    opacity: 0;\n  }\n\n  label.field.radio.disabled {\n    color: " + (primary.bc || '#ccc') + ";\n    cursor: initial;\n  }\n\n  label.field.radio.disabled:before {\n    border-color: " + (primary.bc || '#ccc') + ";\n  }\n\n  label.field.radio.disabled:after {\n    background-color: " + (primary.bc || '#ccc') + ";\n  }\n\n\n\n  label.field select {\n    padding-right: 2em;\n  }\n\n  label.field.select {\n    cursor: pointer;\n    position: relative;\n  }\n\n  label.field.select:after {\n    content: ' ';\n    position: absolute;\n    display: block;\n    width: 0.6em;\n    right: 19px;\n    height: 0.6em;\n    top: 2.6em;\n    border-bottom: 0.125em solid;\n    border-right: 0.125em solid;\n    transform: rotate(45deg);\n    pointer-events: none;\n    color: " + (primary.bc || '#ccc') + ";\n  }\n\n  label.field textarea {\n    border: none;" + (boxy ? "\n    padding: 0;" : '') + "\n  }\n\n  label.field > select {\n    -moz-appearance: none;\n    -webkit-appearance: none;\n  }\n\n  label.field input:focus,\n  label.field select:focus,\n  label.field.file.focus:after\n  {\n    border-color: " + (active.fg || primary.fga || '#07e') + ";\n    " + (!boxy ? ("box-shadow: 0 0.0625em 0 0 " + (active.fg || primary.fga || '#07e') + ";") : '') + "\n  }\n\n  label.field input[type=checkbox]:focus,\n  label.field input[type=radio]:focus {\n    box-shadow: none;\n  }\n\n  label.field.file.focus:after {\n    color: " + (active.fg || primary.fga || '#07e') + ";\n  }\n  label.field.file [type=file] {\n    position: absolute;\n    width: 0;\n    height: 0;\n    opacity: 0;\n    z-index: -1;\n  }\n  label.field.file {\n    position: relative;\n    min-width: 9em;\n    height: 5em;\n  }\n  label.field.file:after {\n    position: absolute;\n    content: 'Choose a file';\n    box-sizing: border-box;\n    width: calc(100% - 0.3em);\n    height: 2.5em;\n    font-size: 1.1em;\n    line-height: 1.5em;\n    color: " + (primary.fg || '#222') + ";\n    text-align: " + (boxy ? 'center' : 'left') + ";\n    padding: 0.5em " + (boxy ? '0.5em' : '0') + ";\n    cursor: pointer;\n    font-style: oblique;\n    left: 0.25em;\n    top: 1.6em;\n    transition: 0.2s ease-in-out;\n    transition-property: color, border-bolor, box-shadow;" + (boxy ? ("\n    border-radius: " + (primary.radius || '0.2em') + ";\n    border-color: " + (primary.bc || '#ccc') + ";\n    border-style: solid;\n    border-width: 0.0625em;") : ("\n    border-bottom-color: " + (primary.bc || '#ccc') + ";\n    border-bottom-width: 0.0625em;\n    border-bottom-style: solid;\n    ")) + "\n  }\n  label.field.file.inline:after {\n    top: 0.2em;\n  }\n\n  label.field.button {\n    vertical-align: top;\n    padding-top: " + (boxy ? '1.7' : '1.958') + "em;\n  }\n  label.field .with-buttons button, label.field.button button {\n    font-size: 1.1em;\n    margin-top: " + (boxy ? '0.15em' : '0') + ";\n  }\n\n  label.field .field-wrapper.with-buttons {\n    display: flex;\n  }\n  label.field .with-buttons button {\n    flex-shrink: 0;\n    padding-left: 0.5em;\n    padding-right: 0.5em;\n    margin-top: 0;\n    margin-right: 0;\n    " + (boxy ? ("height: 2.5em;\n    box-shadow: none;\n    border-radius: 0;\n    border-left: 1px solid " + (primary.bg || '#fff') + ";\n    margin-left: 0;") : 
          "height: 2.25em;") + "\n  }" + (boxy ? ("\n  label.field .with-buttons button:first-of-type {\n    margin-left: -0.05em;\n    border-left: none;\n  }\n  label.field .with-buttons button:last-of-type {\n    border-radius: 0 " + (primary.radius || '0.2em') + " " + (primary.radius || '0.2em') + " 0;\n  }\n  label.field .with-buttons input {\n    border-radius: " + (primary.radius || '0.2em') + " 0 0 " + (primary.radius || '0.2em') + ";\n    min-width: 0;\n  }\n  ") : '') + "\n\n  label.field.plain > div {\n    position: absolute;\n    font-size: 1.1em;\n    top: 2.4em;\n    font-weight: normal;\n  }\n\n  /* inline fields (no labels) */\n  label.field.inline {\n    height: 3.3em;\n  }\n\n  label.field.button.inline {\n    margin-top: 0.2em;\n    padding-top: 0.12em;\n  }\n\n  label.field.button.inline button {\n    margin-top: 0;\n  }\n\n  label.field.inline.select:after {\n    top: 1." + (boxy ? '15' : '1') + "em;\n  }\n\n  label.field .field-tip {\n    display: inline-block;\n    width: 1em;\n    height: 1em;\n    background-color: " + (primary.fga || '#07e') + ";\n    color: " + (primary.bg || '#fff;') + ";\n    cursor: default;\n    user-select: none;\n    border-radius: 1em;\n    margin-left: 0.5em;\n    line-height: 1.2em;\n    text-align: center;\n    margin-top: -0.2em;\n  }\n\n  label.field .field-solo-tip {\n    margin-left: -0.1em;\n  }\n  ");
        // TODO: other themes
      }

      function noop() {}

      function focused(ev) {
        if (!~this.className.indexOf('focus')) { this.className += ' focus'; }
      }

      function blurred(ev) {
        this.className = this.className.replace(/\bfocus\b/g, '').trim();
      }

      function field$1(node) {
        var ctx = this.getContext(node);

        var isField, isCheck, isRadio, isArea, isSelect, isFile, isButton, isPlain, isInput;
        var change, attrs, desc, last;

        function invalidate() {
          var val = setup().split(/\s+/).filter(function (c) { return !!c; });

          isField = !!~val.indexOf('field');
          if (!isField) {
            val.push('field');
            isField = true;
          }

          isCheck = node.querySelector('input[type=checkbox]');
          if (isCheck && !~val.indexOf('check')) { val.push('check'); }

          isRadio = node.querySelector('input[type=radio]');
          if (isRadio && !~val.indexOf('radio')) { val.push('radio'); }

          var checkable = (isCheck || isRadio);
          if (checkable && checkable.checked && !~val.indexOf('checked')) { val.push('checked'); }
          if (checkable && checkable.disabled && !~val.indexOf('disabled')) { val.push('disabled'); }

          if (!checkable && change) {
            change.cancel();
            change = 0;
            if (attrs) {
              attrs.disconnect();
              attrs = 0;
            }
            delete checkable._form_callback;
            if (last) {
              delete last.checked;
              desc = last = undefined;
            }
          } else if (checkable) {
            checkable._form_callback = function (ev, init) {
              if ( init === void 0 ) init = true;

              if (init && checkable.type === 'radio' && checkable.name) {
                var list = [];
                list.push.apply(list, document.querySelectorAll(("input[type=radio][name=" + (checkable.name) + "]")));
                list = list.filter(function (i) { return i !== checkable; });
                list.forEach(function (l) { return l._form_callback && l._form_callback(ev, false); });
              }

              var checked = checkable.checked;
              if (checked && !~node.className.indexOf('checked')) { node.className += ' checked'; }
              else if (!checked && ~node.className.indexOf('checked')) { node.className = node.className.replace(/\bchecked\b/g, '').replace(/ +/g, ' ').trim(); }
            };

            if (MutationObserver) {
              attrs = new MutationObserver(function () {
                var val;
                val = checkable.disabled;
                if (val && !~node.className.indexOf('disabled')) { node.className += ' disabled'; }
                else if (!val && ~node.className.indexOf('disabled')) { node.className = node.className.replace(/\bdisabled\b/g, '').replace(/ +/g, ' ').trim(); }
              });
              attrs.observe(checkable, { attributes: true });
            }

            change = this.getContext(checkable).listen('change', checkable._form_callback);

            desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(checkable), 'checked');
            if (desc && desc.configurable) {
              last = checkable;
              Object.defineProperty(checkable, 'checked', {
                get: desc.get,
                set: function set(v) {
                  desc.set.call(last, v);
                  checkable._form_callback();
                },
                enumerable: true,
                configurable: true
              });
            }
          }

          isArea = !!node.querySelector('textarea');
          if (isArea && !~val.indexOf('textarea')) { val.push('textarea'); }

          isSelect = !!node.querySelector('select');
          if (isSelect && !~val.indexOf('select')) { val.push('select'); }

          isFile = !!node.querySelector('input[type=file]');
          if (isFile && !~val.indexOf('file')) { val.push('file'); }

          isButton = node.querySelector('button');
          isButton = !!isButton && isButton.parentNode === node;
          if (isButton && !~val.indexOf('button')) { val.push('button'); }

          isPlain = !!node.querySelector('div');
          if (isPlain && !~val.indexOf('plain')) { val.push('plain'); }

          isInput = !isCheck && !isRadio && !isFile && !!node.querySelector('input');
          if (isInput && !~val.indexOf('input')) { val.push('input'); }

          node.className = val.join(' ');
        }

        function setup() {
          var cls = node.className;

          if (!isField) { cls = cls.replace(/\bfield\b/g, '').trim(); }
          if (!isCheck) { cls = cls.replace(/\bcheck(ed)?\b/g, '').trim(); }
          if (!isRadio) { cls = cls.replace(/\bradio\b/g, '').trim(); }
          if (!isArea) { cls = cls.replace(/\btextarea\b/g, '').trim(); }
          if (!isSelect) { cls = cls.replace(/\bselect\b/g, '').trim(); }
          if (!isFile) { cls = cls.replace(/\bfile\b/g, '').trim(); }
          if (!isButton) { cls = cls.replace(/\bbutton\b/g, '').trim(); }
          if (!isPlain) { cls = cls.replace(/\bplain\b/g, '').trim(); }
          if (!isInput) { cls = cls.replace(/\binput\b/g, '').trim(); }
          cls = cls.replace(/  +/g, ' ');

          return cls;
        }

        var focus = ctx.listen('focusin', focused);
        var blur = ctx.listen('focusout', blurred);

        invalidate.call(this);

        return {
          update: noop,
          invalidate: invalidate.bind(this),
          teardown: function teardown() {
            var cls = setup();
            cls = cls.replace(/\bfocus\b/g, '').trim();

            focus.cancel();
            blur.cancel();
            change && change.cancel();
            if (attrs) { attrs.disconnect(); }
            if (last) {
              delete last.checked;
              desc = last = undefined;
            }

            node.className = cls;
          }
        }
      }

      field$1.style = style$1;

      function findDeep(els, el) {
        if (!els) { return false; }
        for (var i = 0; i < els.length; i++) {
          if (els[i].e === el) { return true; }
          if (els[i].f && findDeep(els[i].f, el)) { return true; }
        }
        return false;
      }

      var macro = Ractive$1.macro(function (handle) {
        var body = [];
        var attrs = (handle.template.m || []).slice();
        var content = handle.template.f || [];

        // TODO: special field types
        var value = attrs.find(function (a) { return a.n === 'value'; });
        var type = attrs.find(function (a) { return a.n === 'type'; });
        var tip = attrs.find(function (a) { return a.n === 'tip'; });
        if (tip) { attrs.splice(attrs.indexOf(tip), 1); }

        if (type && typeof macro.types[type.f] === 'function') {
          body.push.apply(body, macro.types[type.f](attrs, content, handle));
        } else if (value) {
          var el = {
            t: 7, e: 'input', m: [value]
          };
          // watch for select
          if (findDeep(content, 'option')) {
            el.e = 'select';
            el.f = content;
          }
          if (type) {
            el.m.push(type);
            if (type.f === 'checkbox' || type.f === 'radio') {
              var target = attrs.find(function (a) { return a.n === 'target'; });
              if (target) { el.m.push(Object.assign({}, target, { n: 'name' })); }
              else { el.m.splice(el.m.indexOf(value), 1, Object.assign({}, value, { n: 'checked' })); }
            }
          }
          el.m = el.m.concat(attrs.filter(function (a) { return a.t === 73 || a.t === 73 || a.n === 'placeholder'; }));
          body.push(el);

          var btns = content.filter(function (e) { return e.e === 'button' || findDeep(e.f, 'button'); });
          if (btns.length) {
            body.push.apply(body, btns);
            body = [{
              t: 7, e: 'span', m: [
                { t: 13, n: 'class', f: 'field-wrapper with-buttons', g: 1 }
              ],
              f: body
            }];
          }
        } else { // mostly passthru
          // check for button wrapping
          var els = content.filter(function (e) { return e.e; });
          if (els.find(function (e) { return e.e === 'button'; }) && els.length > 1) {
            body = [{
              t: 7, e: 'span', m: [
                { t: 13, n: 'class', f: 'field-wrapper with-buttons', g: 1 }
              ],
              f: content
            }];
          } else {
            body.push.apply(body, content);
          }
        }

        var label = attrs.find(function (a) { return a.n === 'label'; });
        if (tip) { body.unshift({
          t: 7, e: 'span', m: [
            { t: 13, n: 'class', f: ("field-tip" + (!label ? ' field-solo-tip' : '')), g: 1 },
            { t: 13, n: 'title', f: tip.f },
            { t: 70, n: ['click'], f: { r: [], s: '[false]' } }
          ],
          f: '?'
        }); }
        if (label) { body.unshift(label.f); }
        else { body.unshift('\xa0'); }

        var outer = {
          t: 7, e: 'label', m: [{ t: 71, n: 'field' }].concat(attrs.filter(function (a) { return (a.t !== 13 && a.t !== 73) || (a.n !== 'value' && a.n !== 'type' && a.n !== 'inline' && a.n !== 'label' && a.n !== 'placeholder' && a.n !== 'target'); })),
          f: body
        };

        if (attrs.find(function (a) { return a.n === 'inline'; })) { outer.m.push({ t: 13, n: 'class', f: 'inline' }); }

        handle.setTemplate([outer]);
      });

      macro.types = {};

      function autofocus(node) {
        if (typeof node.focus === 'function') { node.focus(); }
        return { teardown: noop };
      }

      function plugin$2(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var Ractive = ref.Ractive;
          var instance = ref.instance;

          // if an extension, offer to include style
          if (!Ractive.isInstance(instance)) {
            if (opts.includeStyle) {
              // handle global use
              if (instance === Ractive) {
                Ractive.addCSS('form-decorator', style$1);
              } else {
                var css = instance.css;
                instance.css = function(data) {
                  var res = typeof css !== 'function' ? (css || '') : css(data);
                  return res + style$1(data);
                };
              }
            }
          }

          instance.partials[opts.name || 'field'] = macro;
          instance.decorators[opts.name || 'field'] = field$1;
          instance.decorators[opts.autofocusName || 'autofocus'] = autofocus;
        }
      }

      globalRegister('field', 'decorators', field$1);
      globalRegister('field', 'partials', macro);
      globalRegister('autofocus', 'decorators', autofocus);

      Ractive$1.use(
        marked({ highlight: true }),
        plugin$2({ includeStyle: true }),
        plugin$1()
      );

      var app = window.app = new App({ target: '#target' });

    }
  };
});
