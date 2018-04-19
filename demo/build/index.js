System.register(['./chunk3.js', './chunk4.js', './chunk5.js', './chunk2.js', './chunk6.js', './Hello.ractive.html.js', 'ractive', './chunk8.js'], function (exports, module) {
  'use strict';
  var Shell, AppBar, Menu, Host, globalRegister, style, Hello, Ractive$1, marked;
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
    }, function (module) {
      Hello = module.default;
    }, function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      marked = module.default;
    }],
    execute: function () {

      function button(data) {
        return ("\n    button, .btn {\n      text-decoration: none;\n      text-align: center;\n      letter-spacing: 0.5px;\n      cursor: pointer;\n      user-select: none;\n      border: none;\n      border-radius: 2px;\n      padding: 0 2rem;\n      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n        0 1px 5px 0 rgba(0, 0, 0, 0.12),\n        0 3px 1px -2px rgba(0, 0, 0, 0.2);\n      transition: 0.2s ease-in-out;\n      transition-property: box-shadow, opacity, background-color;\n      font-size: 1em;\n      line-height: 1.5em;\n      background-color: " + (data('button.bg') || data('bg2') || '#ddd') + ";\n      color: " + (data('button.fg') || data('fg2') || '#222') + ";\n      vertical-align: middle;\n      min-height: 2.25em;\n      outline: 0;\n      margin: 0.25em;\n      position: relative;\n      overflow: hidden;\n      -webkit-tap-highlight-color: transparent;\n    }\n\n    button[disabled], .btn.disabled {\n      opacity: 0.7;\n      cursor: not-allowed;\n    }\n\n    button.round {\n      width: 2.2em;\n      height: 2.2em;\n      border-radius: 100%;\n      line-height: 2.2em;\n      text-align: center;\n      padding: 0;\n    }\n\n    button.flat, .btn.flat {\n      background-color: " + (data('button.flat.bg') || data('bg1') || '#fefefe') + ";\n      color: " + (data('button.flat.fg') || data('fg1') || '#222') + ";\n      box-shadow: none;\n    }\n\n    button.alt1, .btn.alt1 {\n      bakcground-color: " + (data('alt1.bg2') || '#ddd') + ";\n      color: " + (data('alt1.fg2') || '#222') + ";\n    }\n\n    button.alt1.flat, .btn.alt1.flat {\n      background-color: " + (data('alt1.bg1') || '#fefefe') + ";\n      color: " + (data('alt1.fg1') || '#222') + ";\n    }\n\n    button.alt2, .btn.alt2 {\n      bakcground-color: " + (data('alt2.bg2') || '#ddd') + ";\n      color: " + (data('alt2.fg2') || '#222') + ";\n    }\n\n    button.alt2.flat, .btn.alt2.flat {\n      background-color: " + (data('alt2.bg1') || '#fefefe') + ";\n      color: " + (data('alt2.fg1') || '#222') + ";\n    }\n\n    button:hover, .btn:hover {\n      opacity: 0.9;\n      box-shadow: 0 3px 3px 0 rgba(0,0,0,0.14),\n      0 1px 7px 0 rgba(0,0,0,0.12),\n      0 3px 1px -1px rgba(0,0,0,0.2);\n    }\n\n    button[disabled]:hover, .btn.disabled:hover {\n      opacity: 0.7;\n    }\n\n    button.flat:hover, .btn.flat:hover {\n      box-shadow: none;\n    }\n\n    button:after {\n      content: ' ';\n      position: absolute;\n      top: 0;\n      left: 0;\n      height: 100%;\n      width: 100%;\n      background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 2em, transparent 2.1em);\n      opacity: 0;\n      transform: scale(5, 5);\n      transition: opacity 1s ease-out, transform 0.5s ease-in;\n    }\n\n    button.flat:after {\n      background: radial-gradient(circle, rgba(0, 0, 0, 0.2) 1.5em, transparent 1.6em);\n    }\n\n    button.round:after {\n      background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0.75em, transparent 0.76em);\n    }\n\n    button.round.flat:after {\n      background: radial-gradient(circle, rgba(0, 0, 0, 0.2) 0.75em, transparent 0.76em);\n    }\n\n    button:before {\n      content: ' ';\n      position: absolute;\n      height: 100%;\n      width: 100%;\n      background-color: rgba(0, 0, 0, 0.075);\n      opacity: 0;\n      top: 0;\n      left: 0;\n      transition: opacity 0.4s ease-in-out;\n    }\n    button:focus:before {\n      opacity: 1;\n    }\n    button.flat:hover:before {\n      opacity: 0.5;\n    }\n    \n    button:active:after {\n      transform: scale(1, 1);\n      opacity: 1;\n      transition: none;\n    }\n  ");
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
        template: {v:4,t:[{t:7,e:"shell",f:[{t:7,e:"left",m:[{n:"hidden",t:13,f:[{t:2,r:"menu.hidden"}]}],f:[{t:7,e:"menu",f:[{t:7,e:"container",m:[{t:13,n:"class",f:"logo",g:1},{n:"pad",f:0,t:13}],f:[{t:7,e:"h1",m:[{t:13,n:"style",f:"text-align: center;",g:1}],f:[{t:7,e:"img",m:[{n:"src",f:"./raui.svg",t:13,g:1},{n:"alt",f:"raui logo",t:13,g:1}]},"RaUI"]}]}," ",{t:7,e:"item",m:[{n:"ref",f:"Hello",t:13,g:1}],f:[{t:7,e:"h3",f:["Welcome"]}," ",{t:7,e:"right",f:[{t:7,e:"a",m:[{n:"href",f:"https://github.com/evs-chris/raui",t:13,g:1},{n:"target",f:"_blank",t:13,g:1}],f:[{t:7,e:"svg",m:[{n:"aria-labelledby",f:"simpleicons-github-icon",t:13,g:1},{n:"role",f:"img",t:13,g:1},{n:"viewBox",f:"0 0 24 24",t:13,g:1},{n:"xmlns",f:"http://www.w3.org/2000/svg",t:13,g:1},{n:"id",f:"gh",t:13,g:1}],f:[{t:7,e:"title",m:[{n:"id",f:"simpleicons-github-icon",t:13,g:1}],f:["Browse code on GitHub"]},{t:7,e:"path",m:[{n:"d",f:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",t:13,g:1}]}]}]}]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Components"]}," ",{t:7,e:"item",m:[{n:"ref",f:"AppBar",t:13,g:1}],f:["AppBar"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Card",t:13,g:1}],f:["Card"]}," ",{t:7,e:"item",m:[{n:"ref",f:"JSONEditor",t:13,g:1}],f:["JSON Editor"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Menu",t:13,g:1}],f:["Menu"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Shell",t:13,g:1}],f:["Shell"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Split",t:13,g:1}],f:["Split"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Table",t:13,g:1}],f:["Table"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Tabs",t:13,g:1}],f:["Tabs"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Toggle",t:13,g:1}],f:["Toggle"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Window",t:13,g:1}],f:["Window"]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Decorators"]}," ",{t:7,e:"item",m:[{n:"ref",f:"AceEditor",t:13,g:1}],f:["Ace Editor"]}," ",{t:7,e:"item",m:[{n:"ref",f:"CodeMirror",t:13,g:1}],f:["CodeMirror"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Form",t:13,g:1}],f:["Form"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Grid",t:13,g:1}],f:["Grid"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Marked",t:13,g:1}],f:["Marked"]}," ",{t:7,e:"item",m:[{n:"ref",f:"MaskedInput",t:13,g:1}],f:["Masked Input"]}," ",{t:7,e:"item",m:[{n:"ref",f:"ScrollSpy",t:13,g:1}],f:["Scroll Spy"]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Events"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Click",t:13,g:1}],f:["Click"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Keys",t:13,g:1}],f:["Keys"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Swipe",t:13,g:1}],f:["Swipe"]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Transitions"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Expand",t:13,g:1}],f:["Expand"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Fade",t:13,g:1}],f:["Fade"]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Helpers"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Button",t:13,g:1}],f:["Button"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Toast",t:13,g:1}],f:["Toast"]}]}]}]}," ",{t:7,e:"center",m:[{t:13,n:"class",f:"app-center",g:1}],f:[{t:4,f:[{t:7,e:"app-bar",f:[{t:7,e:"left",f:[{t:7,e:"div",m:[{t:13,n:"class",f:"hamburger",g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.toggle(\"menu.hidden\")]"}}],f:["☰"]}]}]}],n:51,r:"win.max"}," ",{t:7,e:"host",m:[{n:"windows",t:13,f:[{t:2,r:"windows"}]},{n:"placement",f:"smart",t:13,g:1}],f:[{t:7,e:"max-top",f:[{t:7,e:"app-bar",f:[{t:7,e:"left",f:[{t:7,e:"div",m:[{t:13,n:"class",f:"hamburger",g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.toggle(\"menu.hidden\")]"}}],f:["☰"]}]}," ",{t:7,e:"center",f:[{t:2,r:"window.title"}]}," ",{t:7,e:"right",f:[{t:8,r:"windowControls"}]}]}]}]}]}]}],e:{"[_0.toggle(\"menu.hidden\")]":function (_0){return([_0.toggle("menu.hidden")]);}}},
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

            var builtins = ['Hello', 'AceEditor', 'AppBar', 'Button', 'Card', 'Click', 'CodeMirror', 'Expand', 'Fade', 'Form', 'Grid', 'JSONEditor', 'Keys', 'Marked', 'MaskedInput', 'Menu', 'ScrollSpy', 'Shell', 'Split', 'Swipe', 'Table', 'Tabs', 'Toast', 'Toggle', 'Window'];

            menu.once('complete', function () {
              builtins.forEach(function (r) {
                var item = menu.getHandle(r);
                item.active = function () { return host.currentId === r; };
                item.action = function () { return this$1.fire('launch', {}, r); };
              });
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
        css: function(data) { return [" body { overscroll-behavior-y: contain; } pre { white-space: pre-wrap; } .hamburger { cursor: pointer; user-select: none; margin: -1em; padding: 1em; } .logo { background-color: #f9f9f9; color: #222; border-style: solid; border-width: 1px; box-sizing: border-box; } .logo img { width: 50px; margin-right: 0.5em; margin-left: calc(-0.5em - 50px); vertical-align: middle; } svg#gh { fill: #fff; transition: fill 0.3s ease-in-out; position: relative; width: 1.5em; height: 1.5em; top: 0.2em; } .rmenu-active svg#gh { fill: #07e; }", (function(data) {
         return style(data);
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

      var resizer;
      var instances = [];

      var Tabs = (function (Ractive) {
        function Tabs(opts) {
          Ractive.call(this, opts);
        }

        if ( Ractive ) Tabs.__proto__ = Ractive;
        Tabs.prototype = Object.create( Ractive && Ractive.prototype );
        Tabs.prototype.constructor = Tabs;

        Tabs.prototype.updateIndicator = function updateIndicator () {
          var node = this._tabs[this.get('selected')];

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

        return Tabs;
      }(Ractive$1));

      var tabAttrs = ['closable', 'disabled', 'title', 'right', 'button', 'no-pad'];

      // TODO: api handles
      Ractive$1.extendWith(Tabs, {
        template: {v:4,t:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs",g:1},{t:16,r:"extra-attributes"},{n:"class-rtabs-flat",t:13,f:[{t:2,r:"~/flat"}]},{n:"class-rtabs-margin",t:13,f:[{t:2,r:"~/margin"}]},{n:"class-rtabs-fill",t:13,f:[{t:2,r:"~/fill"}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-tab-window",g:1},{t:4,f:[{n:"class-rtabs-going-left",t:13}],n:50,x:{r:[".direction"],s:"_0===\"left\""}},{t:4,f:[{n:"class-rtabs-going-right",t:13}],n:51,l:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-tabs",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-left",g:1},{n:"class-rtabs-center",t:13,f:[{t:2,r:"~/center"}]}],f:[{t:4,f:[{t:4,f:[{t:8,r:"tab"}],n:51,r:".right"}],n:52,r:".tabs"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-right",g:1}],f:[{t:4,f:[{t:4,f:[{t:8,r:"tab"}],n:50,r:".right"}],n:52,r:".tabs"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-indicator",g:1},{n:"style-left",f:[{t:2,r:".selectedLeft"},"px"],t:13},{t:4,f:[{n:"style-right",f:[{t:2,r:".selectedRight"},"px"],t:13}],n:50,x:{r:[".selectedRight"],s:"_0!==undefined"}}]}]}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-content-wrapper",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-content-window",g:1},{t:4,f:[{n:"class-rtabs-trans-fade",t:13}],n:50,x:{r:[".transition"],s:"_0===\"fade\""}},{t:4,f:[{n:"class-rtabs-trans-slide",t:13}],n:50,x:{r:[".transition"],s:"_0===\"slide\""},l:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-contents",g:1},{n:"style-opacity",f:[{t:2,r:"~/opacity"}],t:13},{n:"style-left",f:[{t:2,x:{r:[".selectedContent"],s:"_0*-100"}},"%"],t:13},{n:"class-rtabs-pad",t:13,f:[{t:2,r:"~/pad"}]}],f:[{t:4,f:[{t:8,r:"tab-content"}],n:52,r:".tabs"}]}]}]}]}],e:{"_0===\"left\"":function (_0){return(_0==="left");},"_0!==undefined":function (_0){return(_0!==undefined);},"_0===\"fade\"":function (_0){return(_0==="fade");},"_0===\"slide\"":function (_0){return(_0==="slide");},"_0*-100":function (_0){return(_0*-100);},"_0===_1":function (_0,_1){return(_0===_1);},"_0===\"dynamic\"":function (_0){return(_0==="dynamic");},"_0!==_1":function (_0,_1){return(_0!==_1);},"_0===false":function (_0){return(_0===false);},"[_0.checkSelection((_1),_2)]":function (_0,_1,_2){return([_0.checkSelection((_1),_2)]);},"!_0":function (_0){return(!_0);},"_0===_1&&!_2":function (_0,_1,_2){return(_0===_1&&!_2);},"typeof _1===\"string\"?_0[_1]:_1":function (_0,_1){return(typeof _1==="string"?_0[_1]:_1);},"[[\"select\",_0]]":function (_0){return([["select",_0]]);},"[_0]":function (_0){return([_0]);},"typeof _0===\"string\"":function (_0){return(typeof _0==="string");},"[[\"close\",_0]]":function (_0){return([["close",_0]]);},"_0&&!_1":function (_0,_1){return(_0&&!_1);}},p:{"tab-content":[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-tab-content",g:1},{n:"class-rtabs-selected-content",t:13,f:[{t:2,x:{r:["~/selectedContent","@index"],s:"_0===_1"}}]},{n:"class-rtabs-dyna",t:13,f:[{t:2,x:{r:["~/height"],s:"_0===\"dynamic\""}}]},{n:"class-rtabs-not-selected",t:13,f:[{t:2,x:{r:["~/selectedContent","@index"],s:"_0!==_1"}}]},{t:4,f:[{t:16,r:".extra"}],n:50,r:".extra"},{t:4,f:[{n:"class-rtabs-no-pad",t:13}],n:50,x:{r:[".pad"],s:"_0===false"}},{t:4,f:[{n:"class-rtabs-no-pad",t:13,f:[{t:2,rx:{r:"~/",m:[{t:30,n:".padRef"}]}}]}],n:50,r:".padRef",l:1},{n:["focus"],t:70,f:{r:["@this","@context","@index"],s:"[_0.checkSelection((_1),_2)]"}}],f:[{t:16,r:".template"}]}],n:50,x:{r:[".button"],s:"!_0"}},{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-placeholder",g:1}]}],n:51,l:1}],tab:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-tab",g:1},{n:"class-rtabs-selected",t:13,f:[{t:2,x:{r:["~/selected","@index",".button"],s:"_0===_1&&!_2"}}]},{t:4,f:[{n:"class-rtabs-disabled",t:13}],n:50,x:{r:["~/",".disabled"],s:"typeof _1===\"string\"?_0[_1]:_1"}},{t:4,f:[{n:["click"],t:70,f:{r:["@index"],s:"[[\"select\",_0]]"}}],n:50,x:{r:[".button"],s:"!_0"},l:1},{n:"registered",t:71,f:{r:["@index"],s:"[_0]"}},{t:4,f:[{t:16,r:".extraTab"}],n:50,r:".extraTab"}],f:[{t:4,f:[{t:2,r:"title"}],n:50,x:{r:[".title"],s:"typeof _0===\"string\""}},{t:4,f:[{t:16,r:".title"}],n:50,r:".title",l:1}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtabs-close",g:1},{n:["click"],t:70,f:{r:["@index"],s:"[[\"close\",_0]]"}}],f:["×"]}],n:50,x:{r:[".closable",".button"],s:"_0&&!_1"}}]}]}},
        cssId: 'rtab',
        noCssTransform: true,
        css: function(data) { return [(function(data) {
         return ("\n   .rtabs {\n     position: relative;\n     display: flex;\n     flex-direction: column;\n     width: 100%;\n   }\n \n   .rtabs-tab-window {\n     overflow-y: hidden;\n     overflow-x: auto;\n     box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n       0 1px 5px 0 rgba(0, 0, 0, 0.12),\n       0 3px 1px -2px rgba(0, 0, 0, 0.2);\n     color: " + (data('tabs.tab.fg') || data('fg1') || '#222') + ";\n     background-color: " + (data('tabs.tab.bg') || data('bg1') || '#fff') + ";\n     position: relative;\n     flex-shrink: 0;\n   }\n   .secondary > .rtabs-tab-window {\n     color: " + (data('fg2') || '#fff') + ";\n     background-color: " + (data('bg2') || '#07e') + ";\n   }\n   .alt1 > .rtabs-tab-window {\n     color: " + (data('alt1.fg1') || '#222') + ";\n     background-color: " + (data('alt1.bg1') || '#fff') + ";\n   }\n   .alt1.secondary > .rtabs-tab-window {\n     color: " + (data('alt1.fg2') || '#222') + ";\n     background-color: " + (data('alt1.bg2') || '#fff') + ";\n   }\n   .alt2 > .rtabs-tab-window {\n     color: " + (data('alt2.fg1') || '#222') + ";\n     background-color: " + (data('alt2.bg1') || '#fff') + ";\n   }\n   .alt2.secondary > .rtabs-tab-window {\n     color: " + (data('alt2.fg2') || '#222') + ";\n     background-color: " + (data('alt2.bg2') || '#fff') + ";\n   }\n \n   .rtabs-flat > .rtabs-tab-window {\n     box-shadow: none;\n   }\n   .rtabs-flat > .rtabs-tab-window:after {\n     content: '';\n     height: 0.15em;\n     position: absolute;\n     bottom: 0px;\n     width: 100%;\n     display: block;\n     background-color: " + (data('tabs.tab.fg') || data('bga1') || '#ccc') + ";\n   }\n   .rtabs-flat.secondary > .rtabs-tab-window:after {\n     background-color: " + (data('tabs.tab.fg') || data('bga2') || '#07e') + ";\n   }\n   .rtabs-flat.alt1 > .rtabs-tab-window:after {\n     background-color: " + (data('alt1.bga1') || '#222') + ";\n   }\n   .rtabs-flat.alt1.secondary > .rtabs-tab-window:after {\n     background-color: " + (data('alt1.bga2') || '#222') + ";\n   }\n   .rtabs-flat.alt2 > .rtabs-tab-window:after {\n     background-color: " + (data('alt2.bga1') || '#222') + ";\n   }\n   .rtabs-flat.alt2.secondary > .rtabs-tab-window:after {\n     background-color: " + (data('alt2.bga2') || '#222') + ";\n   }\n \n   .rtabs-center.rtabs-left {\n     text-align: center;\n   }\n \n   .rtabs-pad {\n     padding: 1em;\n   }\n \n   .rtabs-fill {\n     flex-grow: 1;\n     height: 100%;\n   }\n \n   .rtabs-tabs {\n     display: table;\n     position: relative;\n     min-width: 100%;\n     overflow-x: auto;\n     overflow-y: hidden;\n     white-space: nowrap;\n   }\n \n   .rtabs-tab {\n     display: inline-block;\n     box-sizing: border-box;\n     padding: 0.5em 1em;\n     height: 2.5em;\n     cursor: pointer;\n     opacity: 0.9;\n     transition: opacity 0.2s ease-in-out;\n     user-select: none;\n   }\n   .rtabs-tab:hover {\n     opacity: 1;\n   }\n \n   .rtabs-selected {\n     opacity: 1;\n   }\n \n   .rtabs-disabled {\n     opacity: 0.4;\n   }\n \n   .rtabs-right {\n     text-align: right;\n     display: table-cell;\n   }\n \n   .rtabs-left {\n     text-align: left;\n     display: table-cell;\n   }\n \n   .rtabs-close {\n     display: inline-block;\n     margin-right: -0.5em;\n     font-weight: 700;\n     opacity: 0.3;\n     transition: opacity: 0.2s ease-in-out;\n   }\n \n   .rtabs-close:hover {\n     opacity: 1;\n   }\n \n   .rtabs-indicator {\n     position: absolute;\n     bottom: 0;\n     height: 0.15em;\n     background-color: " + (data('tabs.indicator.color') || data('fga1') || '#07e') + ";\n     z-index: 2;\n   }\n \n   .secondary > .rtabs-tab-window .rtabs-indicator {\n     background-color: " + (data('fga2') || '#fff') + ";\n   }\n   .alt1 > .rtabs-tab-window .rtabs-indicator {\n     background-color: " + (data('alt1.fga1') || 'darkblue') + ";\n   }\n   .alt1.secondary > .rtabs-tab-window .rtabs-indicator {\n     background-color: " + (data('alt1.fga2') || 'darkblue') + ";\n   }\n   .alt2 > .rtabs-tab-window .rtabs-indicator {\n     background-color: " + (data('alt2.fga1') || 'darkblue') + ";\n   }\n   .alt2.secondary > .rtabs-tab-window .rtabs-indicator {\n     background-color: " + (data('alt2.fga2') || 'darkblue') + ";\n   }\n \n   .rtabs-going-left .rtabs-indicator {\n     transition: left 0.2s ease-in-out, right 0.2s ease-in-out 0.1s;\n   }\n   .rtabs-going-right .rtabs-indicator {\n     transition: left 0.2s ease-in-out 0.1s, right 0.2s ease-in-out;\n   }\n \n   .rtabs-content-wrapper {\n     width: 100%;\n     box-sizing: border-box;\n     display: flex;\n     flex-direction: column;\n     flex-grow: 2;\n     overflow: hidden;\n   }\n \n   .rtabs-content-window {\n     width: 100%;\n     display: flex;\n     flex-grow: 1;\n     overflow-y: auto;\n     overflow-x: hidden\n   }\n \n   .rtabs {\n     color: " + (data('tabs.content.fg') || data('fg1') || '#222') + ";\n     background-color: " + (data('tabs.content.bg') || data('bg1') || '#fff') + ";\n   }\n   .rtabs.alt1 {\n     color: " + (data('alt1.fg1') || '#222') + ";\n     background-color: " + (data('alt1.bg1') || '#fff') + ";\n   }\n   rtabs.alt2 {\n     color: " + (data('alt2.fg1') || '#222') + ";\n     background-color: " + (data('alt2.bg1') || '#fff') + ";\n   }\n \n   .rtabs-contents {\n     list-style: none;\n     padding: 0;\n     margin: 0;\n     position: relative;\n     left: 0;\n     display: block;\n     flex-wrap: nowrap;\n     white-space: nowrap;\n     width: 100%;\n   }\n   .rtabs-trans-slide > .rtabs-contents {\n     transition: left 0.2s ease-in-out;\n   }\n   .rtabs-trans-fade > .rtabs-contents {\n     transition: opacity 0.15s ease;\n     opacity: 1;\n     white-space: nowrap;\n   }\n \n   .rtabs-fill > div > div > .rtabs-contents {\n     display: flex;\n   }\n \n   .rtabs-tab-content {\n     display: inline-block;\n     width: 100%;\n     vertical-align: top;\n     white-space: initial;\n     transition: opacity 0.1s ease-in-out;\n     flex-shrink: 0;\n     white-space: initial;\n     display: inline-block;\n     flex-direction: column;\n     flex-grow: 1;\n   }\n \n   .rtabs-placeholder {\n     display: inline-block;\n     width: 100%;\n     height: 1px;\n     flex-shrink: 0;\n   }\n   .rtabs-dyna.rtabs-not-selected {\n     height: 1px;\n     opacity: 0;\n     overflow: hidden;\n   }\n   .rtabs-pad > .rtabs-tab-content {\n     padding: 1em;\n     box-sizing: border-box;\n   }\n   .rtabs-pad > .rtabs-tab-content.rtabs-no-pad {\n     padding: 0;\n   }\n   .rtabs > .rtabs-tab-content.rtabs-pad {\n     padding: 1em;\n     box-sizing: border-box;\n   }\n   ")
      }).call(this, data)].join(' '); },
        attributes: ['transition', 'flat', 'pad', 'center', 'height', 'fill'],
        data: function data() {
          return {
            tabs: [],
            rightTabs: [],
            selected: 0,
            selectedContent: 0,
            opacity: 1
          }
        },
        on: {
          construct: construct,
          config: function config() {
            if ( this._tabs ) { this.set('tabs', (this.get('tabs') || []).concat(this._tabs), { shuffle: true }); }
          },
          select: select,
          close: close,
          teardown: function teardown() {
            instances.splice(instances.indexOf(this), 1);
          },
          render: function render() {
            var this$1 = this;

            this._resizeListener = this.root.on('*.resize', function () { return this$1.updateIndicator(); });
            setTimeout(function () { return this$1.updateIndicator(); });
          },
          unrender: function unrender() {
            if (this._resizeListener) {
              this._resizeListener.cancel();
              this._resizeListener = null;
            }
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
          }
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
            template: { t: t.f }
          };
          var extra = [];
          var extraTab = [];

          t.m.forEach(function (a) {
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
              } else {
                tab[a.n] = a.f === 0 ? true : typeof a.f === 'string' ? a.f : { t: a.f };
              }
            }
            else if (a.t === 70) { extraTab.push(a); }
            else { extra.push(a); }
          });

          if (extra.length) { tab.extra = { t: extra }; }
          if (extraTab.length) { tab.extraTab = { t: extraTab }; }

          return tab;
        });

        this._tabs = tabs;

        if (!resizer && typeof window !== undefined) {
          resizer = true;
          window.addEventListener('resize', function () {
            instances.forEach(function (i) { return i.updateIndicator(); });
          });
        }

        instances.push(this);
      }

      function select(ctx, idx) {
        var this$1 = this;

        var current = this.get('selected');
        var node = this.find('.contents');
        var trans = this.get('transition');

        if (current !== idx) {
          var cur = this.getContext(this.find('.rtabs-selected'));
          var window = this.find('.rtabs-content-window');
          this.set(("scroll." + (cur.get('@index'))), window.scrollTop);
          if (cur.hasListener('leave')) { cur.raise('leave'); }
          if (trans === 'fade') {
            this.set({
              opacity: 0,
              selected: idx
            });
            this.updateIndicator();
            var ctx$1 = this.getContext(this.find('.rtabs-selected'));

            setTimeout(function () {
              this$1.set({
                selectedContent: idx,
                opacity: 1
              });
              if (ctx$1.hasListener('enter')) { ctx$1.raise('enter'); }
              if (window) { window.scrollTop = this$1.get(("scroll." + idx)) || 0; }
            }, 150);
          } else if (trans === 'slide') {
            this.set('selected', idx);
            this.set('selectedContent', idx);
            this.updateIndicator();
            var ctx$2 = this.getContext(this.find('.rtabs-selected'));
            if (ctx$2.hasListener('enter')) { ctx$2.raise('enter'); }
            if (window) { window.scrollTop = this.get(("scroll." + idx)) || 0; }
          } else {
            this.set({
              selected: idx,
              selectedContent: idx
            });
            this.updateIndicator();
            var ctx$3 = this.getContext(this.find('.rtabs-selected'));
            if (ctx$3.hasListener('enter')) { ctx$3.raise('enter'); }
            if (window) { window.scrollTop = this.get(("scroll." + idx)) || 0; }
          }

          if (window && window.scrollLeft) { window.scrollLeft = 0; }
        }
      }

      function close(ctx, idx) {
        var tab = this.getContext(this._tabs[idx]);
        var ok = true;

        if (tab.element.events.find(function (e) { return e.events.find(function (e) { return e.name === 'close'; }); })) {
          ok = tab.raise('close');
        }

        if (ok) { this.splice('tabs', idx, 1); }

        return false;
      }

      function plugin$1(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.components[opts.name || 'tabs'] = Tabs;
        }
      }

      globalRegister('RMTabs', 'components', Tabs);

      function style$1(data) {
        return ("\n  label.field {\n    display: inline-block;\n    font-size: 0.8em;\n    color: " + (data('form.color.accent') || data('fg1') || '#222') + ";\n    min-height: 6.5em;\n    transition: 0.2s ease-in-out;\n    transition-property: color;\n    vertical-align: middle;\n    box-sizing: border-box;\n    padding: " + (data('form.boxy') ? '0.8em 1em' : '0.8em 0.5em') + ";\n  }\n\n  label.field.textarea {\n    display: block;\n    border: 1px solid " + (data('form.color.accent') || data('fg1') || '#222') + ";\n    padding: 0.5em 0.8em 0.8em 0.8em;\n    border-radius: 2px;\n    box-shadow: none;\n    transition-property: color, border-color, box-shadow;\n  label.field.check.focus > input:before  margin: 0.8em 0.2em;\n    min-height: auto;\n  }\n\n  label.field.focus {\n    color: " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n  }\n\n  label.field.textarea.focus {\n    border-color: " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n    " + (!data('form.boxy') ? ("box-shadow: 1px 1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      -1px 1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      1px -1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      -1px -1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";") : '') + "\n  }\n\n  label.field > input,\n  label.field > select,\n  label.field > textarea\n  {\n    display: block;\n    border-width: " + (data('form.boxy') ? '0.0625em' : '0 0 0.0625em 0') + ";\n    border-color: " + (data('form.color.accent') || data('fg1') || '#222') + ";\n    border-style: solid;\n    box-sizing: border-box;\n    background-color: transparent;\n    transition: 0.2s ease-in-out;\n    transition-property: box-shadow, color;\n    outline: none;\n    " + (data('form.boxy') ? 'padding: 0.7em 1.5em 0.7em 0.7em;' : '') + "\n    box-shadow: none;\n    width: 100%;\n    margin-bottom: 0.8em;\n    font-size: 1.2em;" + (data('form.boxy') ? '\n  border-radius: 0.2em;' : '') + "\n  }\n  " + (!data('form.boxy') ? "label.field > select, label.field > input {\n    height: 2.5em;\n  }" : '') + "\n\n  " + (!data('form.boxy') ? ("label.field:hover > input,\n  label.field:hover > select,\n  label.field.file:hover:after {\n    box-shadow: 0 1px 0 0 " + (data('form.color.accent') || data('fg1') || '#222') + ";\n  }\n  label.field.check:hover > input:before,\n  label.field.radio:hover > input:before,\n  label.field.textarea:hover {\n    box-shadow: 1px 1px " + (data('form.color.accent') || data('fg1') || '#222') + ",\n      -1px 1px " + (data('form.color.accent') || data('fg1') || '#222') + ",\n      1px -1px " + (data('form.color.accent') || data('fg1') || '#222') + ",\n      -1px -1px " + (data('form.color.accent') || data('fg1') || '#222') + ";\n  }\n  label.field.check.focus > input:before,\n  label.field.radio.focus > input:before {\n    box-shadow: 1px 1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      -1px 1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      1px -1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      -1px -1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n  }\n  label.field.textarea.focus:hover {\n    box-shadow: 1px 1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      -1px 1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      1px -1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      -1px -1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n  }\n  label.field.check > input:checked:before,\n  label.field.radio > input:checked:before {\n    box-shadow: 0px 1px " + (data('form.color.accent') || data('fg1') || '#222') + ",\n      -1px 0px " + (data('form.color.accent') || data('fg1') || '#222') + ";\n  }\n  label.field.check.focus > input:checked:before,\n  label.field.radio.focus > input:checked:before {\n    box-shadow: 0px 1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      -1px 0px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n  }") : '') + "\n\n  label.field.check, label.field.radio {\n    padding-top: 3em;\n    cursor: pointer;\n  }\n\n  label.field.check > input, label.field.radio > input {\n    width: 1em;\n    height: 1em;\n    border: none;\n    margin-right: 1em;\n    float: left;\n    box-shadow: none;\n  }\n\n  label.field.select {\n    cursor: pointer;\n  }\n\n  label.field.select:after {\n    content: ' ';\n    position: absolute;\n    display: block;\n    width: 0.6em;\n    height: 0.6em;\n    right: 1em;\n    top: 3.5em;\n    border-bottom: 2px solid;\n    border-right: 2px solid;\n    transform: rotate(45deg);\n    pointer-events: none;\n  }\n\n  label.field > textarea {\n    font-size: 1.4em;\n    border: none;\n  }\n\n  label.field.check > input:before,\n  label.field.radio > input:before {\n    content: '';\n    display: block;\n    border: 1px solid " + (data('form.color.accent') || data('fg1') || '#222') + ";\n    width: 1em;\n    height: 1em;\n    box-sizing: border-box;\n    transition: 0.2s ease-in-out;\n    transition-property: transform, border-color, height, width, box-shadow;\n    margin-top: -0.125em;\n  }\n\n  label.field.check.focus > input:before,\n  label.field.radio.focus > input:before {\n    border-color: " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n  }\n\n  label.field.check > input:checked:before,\n  label.field.radio > input:checked:before {\n    height: 0.7em;\n    width: 1.3em;\n    border-width: 2px;\n    border-top-color: transparent;\n    border-right-color: transparent;\n    transform: rotate(-50deg);\n  }\n\n  label.field.check > input,\n  label.field > select {\n    -moz-appearance: none;\n    -webkit-appearance: none;\n  }\n\n  label.field > input:focus,\n  label.field > select:focus,\n  label.field.file.focus:after\n  {\n    border-color: " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n    " + (!data('form.boxy') ? ("box-shadow: 0 1px 0 0 " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";") : '') + "\n  }\n\n  label.field.file.focus:after {\n    color: " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n  }\n  label.field.file [type=file] {\n    position: absolute;\n    width: 0;\n    height: 0;\n    opacity: 0;\n    z-index: -1;\n  }\n  label.field.file:after {\n    position: absolute;\n    content: 'Choose a file';\n    width: calc(100% - 1em);\n    height: 1.22em;\n    color: " + (data('form.color.accent') || data('fg1') || '#222') + ";\n    border-color: " + (data('form.color.accent') || data('fg1') || '#222') + ";\n    border-bottom-style: solid;\n    border-bottom-width: 0.0625em;\n    text-align: center;\n    padding: 1em 0;\n    cursor: pointer;\n    font-style: oblique;\n    left: 0.5em;\n    bottom: 1.78em;\n    transition: 0.2s ease-in-out;\n    transition-property: color, border-bolor, box-shadow;\n  }\n\n  label.field.button > button {\n    position: relative;\n    top: 1.2em;\n    font-size: 1.2em;\n  }\n\n  label.field.plain > div {\n    position: absolute;\n    font-size: 1.2em;\n    top: 2.28em;\n  }\n  ");
      }

      function noop() {}

      function focused(ev) {
        if (!~this.className.indexOf('focus')) { this.className += ' focus'; }
      }

      function blurred(ev) {
        this.className = this.className.replace(/\bfocus\b/, '').trim();
      }

      function field(node) {
        var ctx = this.getContext(node);
        var cls = [];

        var isField, isCheck, isRadio, isArea, isSelect, isFile, isButton, isPlain;

        function invalidate() {
          isField = !!~node.className.indexOf('field');
          if (!isField) { cls.push('field'); }

          isCheck = !!node.querySelector('input[type=checkbox]');
          if (isCheck) { cls.push('check'); }

          isRadio = !!node.querySelector('input[type=radio]');
          if (isRadio) { cls.push('radio'); }

          isArea = !!node.querySelector('textarea');
          if (isArea) { cls.push('textarea'); }

          isSelect = !!node.querySelector('select');
          if (isSelect) { cls.push('select'); }

          isFile = !!node.querySelector('input[type=file]');
          if (isFile) { cls.push('file'); }

          isButton = !!node.querySelector('button');
          if (isButton) { cls.push('button'); }

          isPlain = !!node.querySelector('div');
          if (isPlain) { cls.push('plain'); }

          node.className += (node.className.length ? ' ' : '') + cls.join(' ');
        }

        var focus = ctx.listen('focusin', focused);
        var blur = ctx.listen('focusout', blurred);

        invalidate();

        return {
          update: noop,
          invalidate: invalidate,
          teardown: function teardown() {
            var cls = node.className;

            if (!isField) { cls = cls.replace(/\bfield\b/, '').trim(); }
            if (isCheck) { cls = cls.replace(/\bcheck\b/, '').trim(); }
            if (isRadio) { cls = cls.replace(/\bradio\b/, '').trim(); }
            if (isArea) { cls = cls.replace(/\btextarea\b/, '').trim(); }
            if (isSelect) { cls = cls.replace(/\bselect\b/, '').trim(); }
            if (isFile) { cls = cls.replace(/\bfile\/b/, '').trim(); }
            if (isButton) { cls = cls.replace(/\bbutton\/b/, '').trim(); }
            if (isPlain) { cls = cls.replace(/\bplain\/b/, '').trim(); }
            cls = cls.replace(/\bfocus\b/, '').trim();

            focus.cancel();
            blur.cancel();

            node.className = cls;
          }
        }
      }

      field.style = style$1;

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

          instance.decorators[opts.name || 'field'] = field;
          instance.decorators[opts.autofocusName || 'autofocus'] = autofocus;
        }
      }

      globalRegister('field', 'decorators', field);
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
