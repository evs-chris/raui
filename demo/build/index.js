System.register(['./chunk3.js', './chunk4.js', './chunk6.js', './chunk2.js', './chunk8.js', './Hello.ractive.html.js', 'ractive', './chunk14.js', './chunk15.js'], function (exports, module) {
  'use strict';
  var Shell, AppBar, Menu, Host, globalRegister, style, Hello, Ractive$1, tabs, marked;
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
      tabs = module.default;
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
        template: {v:4,t:[{t:7,e:"shell",f:[{t:7,e:"left",m:[{n:"hidden",t:13,f:[{t:2,r:"menu.hidden"}]},{n:"forced",t:13,f:[{t:2,r:"menu.over"}]},{n:"overflow",f:0,t:13}],f:[{t:7,e:"menu",f:[{t:7,e:"container",m:[{t:13,n:"class",f:"logo",g:1},{n:"pad",f:0,t:13}],f:[{t:7,e:"h1",m:[{t:13,n:"style",f:"text-align: center;",g:1}],f:[{t:7,e:"img",m:[{n:"src",f:"./raui.svg",t:13,g:1},{n:"alt",f:"raui logo",t:13,g:1}]},"RaUI"]}]}," ",{t:7,e:"item",m:[{n:"ref",f:"Hello",t:13,g:1}],f:[{t:7,e:"h3",f:["Welcome"]}," ",{t:7,e:"right",f:[{t:7,e:"a",m:[{n:"href",f:"https://github.com/evs-chris/raui",t:13,g:1},{n:"target",f:"_blank",t:13,g:1}],f:[{t:7,e:"svg",m:[{n:"aria-labelledby",f:"simpleicons-github-icon",t:13,g:1},{n:"role",f:"img",t:13,g:1},{n:"viewBox",f:"0 0 24 24",t:13,g:1},{n:"xmlns",f:"http://www.w3.org/2000/svg",t:13,g:1},{n:"id",f:"gh",t:13,g:1}],f:[{t:7,e:"title",m:[{n:"id",f:"simpleicons-github-icon",t:13,g:1}],f:["Browse code on GitHub"]},{t:7,e:"path",m:[{n:"d",f:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",t:13,g:1}]}]}]}]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Components"]}," ",{t:7,e:"item",m:[{n:"ref",f:"AppBar",t:13,g:1}],f:["AppBar"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Card",t:13,g:1}],f:["Card"]}," ",{t:7,e:"item",m:[{n:"ref",f:"DateInput",t:13,g:1}],f:["Date Input"]}," ",{t:7,e:"item",m:[{n:"ref",f:"DatePicker",t:13,g:1}],f:["Date Picker"]}," ",{t:7,e:"item",m:[{n:"ref",f:"JSONEditor",t:13,g:1}],f:["JSON Editor"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Menu",t:13,g:1}],f:["Menu"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Popover",t:13,g:1}],f:["Popover"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Shell",t:13,g:1}],f:["Shell"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Split",t:13,g:1}],f:["Split"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Table",t:13,g:1}],f:["Table"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Tabs",t:13,g:1}],f:["Tabs"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Toggle",t:13,g:1}],f:["Toggle"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Window",t:13,g:1}],f:["Window"]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Decorators"]}," ",{t:7,e:"item",m:[{n:"ref",f:"AceEditor",t:13,g:1}],f:["Ace Editor"]}," ",{t:7,e:"item",m:[{n:"ref",f:"CodeMirror",t:13,g:1}],f:["CodeMirror"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Date",t:13,g:1}],f:["Date"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Form",t:13,g:1}],f:["Form"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Grid",t:13,g:1}],f:["Grid"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Marked",t:13,g:1}],f:["Marked"]}," ",{t:7,e:"item",m:[{n:"ref",f:"MaskedInput",t:13,g:1}],f:["Masked Input"]}," ",{t:7,e:"item",m:[{n:"ref",f:"ScrollSpy",t:13,g:1}],f:["Scroll Spy"]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Events"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Click",t:13,g:1}],f:["Click"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Keys",t:13,g:1}],f:["Keys"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Swipe",t:13,g:1}],f:["Swipe"]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Transitions"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Expand",t:13,g:1}],f:["Expand"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Fade",t:13,g:1}],f:["Fade"]}]}," ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Helpers"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Button",t:13,g:1}],f:["Button"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Toast",t:13,g:1}],f:["Toast"]}," ",{t:7,e:"item",m:[{n:"ref",f:"Validate",t:13,g:1}],f:["Validate"]}]}]}]}," ",{t:7,e:"center",m:[{t:13,n:"class",f:"app-center",g:1},{n:"style-overflow",f:[{t:2,x:{r:["win.max"],s:"_0?\"hidden\":\"auto\""}}],t:13}],f:[{t:4,f:[{t:7,e:"app-bar",f:[{t:7,e:"left",f:[{t:7,e:"div",m:[{t:13,n:"class",f:"hamburger",g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.toggle(\"menu.hidden\")]"}}],f:["☰"]}]}]}],n:51,r:"win.max"}," ",{t:7,e:"host",m:[{n:"windows",t:13,f:[{t:2,r:"windows"}]},{n:"placement",f:"smart",t:13,g:1}],f:[{t:7,e:"max-top",f:[{t:7,e:"app-bar",f:[{t:7,e:"left",f:[{t:7,e:"div",m:[{t:13,n:"class",f:"hamburger",g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.toggle(\"menu.hidden\")]"}}],f:["☰"]}]}," ",{t:7,e:"center",f:[{t:2,r:"window.title"}]}," ",{t:7,e:"right",f:[{t:8,r:"windowControls"}]}]}]}]}]}]}],e:{"_0?\"hidden\":\"auto\"":function (_0){return(_0?"hidden":"auto");},"[_0.toggle(\"menu.hidden\")]":function (_0){return([_0.toggle("menu.hidden")]);}}},
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

            var builtins = ['Hello', 'AceEditor', 'AppBar', 'Button', 'Card', 'Click', 'CodeMirror', 'Date', 'DateInput', 'DatePicker', 'Expand', 'Fade', 'Form', 'Grid', 'JSONEditor', 'Keys', 'Marked', 'MaskedInput', 'Menu', 'Popover', 'ScrollSpy', 'Shell', 'Split', 'Swipe', 'Table', 'Tabs', 'Toast', 'Toggle', 'Validate', 'Window'];

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
        var disabled = attrs.find(function (a) { return a.n === 'disabled'; });
        if (tip) { attrs.splice(attrs.indexOf(tip), 1); }

        if (type && typeof macro.types[type.f] === 'function') {
          body.push.apply(body, macro.types[type.f](attrs, content, handle));
        } else if (value) {
          var el = {
            t: 7, e: 'input', m: [value]
          };
          if (disabled) { el.m.push(disabled); }
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
        if (label) { body.unshift.apply(body, Array.isArray(label.f) ? label.f : [label.f]); }
        else { body.unshift('\xa0'); }

        var outer = {
          t: 7, e: 'label', m: [{ t: 71, n: 'field' }].concat(attrs.filter(function (a) { return (a.t !== 13 && a.t !== 73) || (a.n !== 'value' && a.n !== 'type' && a.n !== 'inline' && a.n !== 'label' && a.n !== 'placeholder' && a.n !== 'target' && a.n !== 'disabled'); })),
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

      function plugin$1(opts) {
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
        plugin$1({ includeStyle: true }),
        tabs()
      );

      var app = window.app = new App({ target: '#target' });

      var el;
      document.addEventListener('click', function (ev) { return el = ev.target; });
      document.addEventListener('focus', function (ev) { return el = ev.target; });

      Object.defineProperty(window, 'C', {
        get: function get() {
          return app.getContext(el);
        }
      });

      Object.defineProperty(window, 'R', {
        get: function get() {
          var res = window.C;
          if (res) { return res.ractive; }
        }
      });

    }
  };
});
