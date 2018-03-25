System.register(['ractive', './chunk2.js'], function (exports, module) {
  'use strict';
  var Ractive$1, expand, globalRegister;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      expand = module.default$1;
      globalRegister = module.default;
    }],
    execute: function () {

      var Menu = (function (Ractive) {
          function Menu(opt) {
            Ractive.call(this, opts);
            this.refs = {};
          }

          if ( Ractive ) Menu.__proto__ = Ractive;
          Menu.prototype = Object.create( Ractive && Ractive.prototype );
          Menu.prototype.constructor = Menu;

          Menu.prototype.addItem = function addItem (item, idx) {
            if (typeof idx === 'number') {
              this.splice('items', idx, 0, item);
            } else {
              this.push('items', item);
            }

            return new Handle(this, null, item);
          };

          Menu.prototype.visibleItems = function visibleItems (items) {
            var this$1 = this;

            return items.filter(function (i) { return i.condition !== false && (typeof i.condition !== 'string' || this$1.get(i.condition) !== false); }).length;
          };

          Menu.prototype.getHandle = function getHandle (what) {
            var this$1 = this;

            var ctx;
            if (typeof what === 'string') {
              if (this.refs[what]) {
                ctx = this.refs[what].ctx;
              } else {
                var el = this.find(what);
                if (el) { ctx = this.getContext(el); }
              }
            } else if (what && what.parentNode) {
              ctx = this.getContext(what);
            } else if (what && what.decorators) {
              ctx = what;
            }

            if (ctx) {
              var path = [ctx.get()];
              var str = '../../';
              while (ctx.resolve(str) !== '') {
                path.unshift(ctx.get(str));
                str += '../../';
              }

              return path.reduce(function (a, c) {
                return new Handle(this$1, a, c);
              }, null);
            }
          };

          return Menu;
        }(Ractive$1));

        // TODO: api handles, active elements, and ids
        Ractive$1.extendWith(Menu, {
          template: {v:4,t:[{t:7,e:"div",m:[{n:"class-rmenu",t:13},{t:16,r:"extra-attributes"}],f:["\n  ",{t:8,r:"items"},"\n"]}],p:{container:["\n  ",{t:4,f:[{t:4,f:[{t:7,e:"div",m:[{n:"class-rmenu-container-pad",t:13}],f:[{t:3,r:".content"}]}],n:50,r:".pad"},{t:4,f:[{t:3,r:".content"}],n:51,l:1}],n:50,r:".content"},{t:4,f:[{t:4,f:[{t:7,e:"div",m:[{n:"class-rmenu-container-pad",t:13}],f:[{t:16,r:".contentPartial"}]}],n:50,r:".pad"},{t:4,f:[{t:16,r:".contentPartial"}],n:51,l:1}],n:50,r:".contentPartial",l:1},"\n"],section:["\n  ",{t:7,e:"div",m:[{n:"class-rmenu-main",t:13}],f:["\n    ",{t:7,e:"div",m:[{n:"class-rmenu-title",t:13}],f:[{t:4,f:[{t:2,r:".title"}],n:50,r:".title"},{t:4,f:[{t:16,r:".titlePartial"}],n:50,r:".titlePartial",l:1}]},"\n  "]},"\n  ",{t:8,r:"children"},"\n"],children:["\n",{t:4,f:["  ",{t:7,e:"div",m:[{n:"class-rmenu-items",t:13},{n:"expand",t:72,v:"t0"}],f:["\n    ",{t:8,r:"items"},"\n  "]},"\n"],n:50,x:{r:[".items.length",".open",".type"],s:"_0&&(_1||_2===\"section\")"}}],item:["\n  ",{t:7,e:"div",m:[{n:"class-rmenu-main",t:13},{t:4,f:[{n:"class-rmenu-active",t:13,f:[{t:2,rx:{r:"~/",m:[{t:30,n:".activeRef"}]}}]}],n:50,r:".activeRef"},{t:4,f:[{n:"class-rmenu-active",t:13,f:[{t:2,x:{r:[".active.length","@this","@context","."],s:"_0?_3.active(_1.getHandle((_2))):_3.active()"}}]}],n:50,x:{r:[".active"],s:"typeof _0===\"function\""},l:1},{t:4,f:[{n:"class-rmenu-active",t:13,f:[{t:2,r:".active"}]}],n:50,x:{r:[".active"],s:"typeof _0===\"boolean\""},l:1}],f:["\n    ",{t:4,f:[{t:7,e:"div",m:[{n:"class-menu-left",t:13}],f:[{t:3,r:".left"}]}],n:50,r:".left"},{t:4,f:[{t:7,e:"div",m:[{n:"class-rmenu-left",t:13}],f:[{t:16,r:".leftPartial"}]}],n:50,r:".leftPartial",l:1},"\n    ",{t:7,e:"div",m:[{n:"class-rmenu-title",t:13},{t:4,f:[{n:["click"],t:70,f:{r:["."],s:"[_0.action()]"}}],n:50,x:{r:[".action"],s:"typeof _0===\"function\""}},{t:4,f:[{t:16,r:".actionPartial"},"\n      "],n:50,r:".actionPartial",l:1},{t:4,f:[{n:["click"],t:70,f:{r:["@context"],s:"[(_0).toggle(\".open\"),false]"}}],n:50,r:".items.length",l:1}],f:["\n      ",{t:4,f:[{t:3,r:".title"}],n:50,r:".title"},{t:4,f:[{t:16,r:".titlePartial"}],n:50,r:".titlePartial",l:1},"\n    "]},"\n    ",{t:4,f:[{t:7,e:"div",m:[{n:"class-menu-right",t:13}],f:[{t:3,r:".right"}]}],n:50,r:".right"},{t:4,f:[{t:7,e:"div",m:[{n:"class-rmenu-right",t:13}],f:[{t:16,r:".rightPartial"}]}],n:50,r:".rightPartial",l:1},"\n",{t:4,f:["    ",{t:7,e:"div",m:[{n:"class-rmenu-expand",t:13},{n:["click"],t:70,f:{r:["@context"],s:"[(_0).toggle(\".open\"),false]"}},{n:"expand",t:72,f:{r:[],s:"[{axis:\"x\"}]"},v:"t0"}]},"\n"],n:50,x:{r:[".items.length","@this",".items"],s:"_2&&_0&&_1.visibleItems(_2)"}},"  "]},"\n  ",{t:8,r:"children"},"\n"],items:["\n",{t:4,f:["  ",{t:4,f:["\n    ",{t:7,e:"div",m:[{n:"class-rmenu-entry",t:13},{t:4,f:[{n:"class-rmenu-item",t:13}],n:50,x:{r:[".type"],s:"!_0||_0===\"item\""}},{t:4,f:[{n:"class-rmenu-section",t:13}],n:50,x:{r:[".type"],s:"_0===\"section\""},l:1},{t:4,f:[{n:"class-rmenu-container",t:13}],n:50,x:{r:[".type"],s:"_0===\"container\""},l:1},{n:"class-rmenu-expanded",t:13,f:[{t:2,r:".open"}]},{n:"expand",t:72,v:"t0"},{t:4,f:[{t:8,r:".refPartial"}],n:50,r:".refPartial"},{t:4,f:[{n:"ref",t:71,f:{r:[".ref"],s:"[_0]"}}],n:50,x:{r:[".ref"],s:"typeof _0===\"string\""},l:1},{t:4,f:[{t:16,r:".attrsPartial"}],n:50,r:".attrsPartial"}],f:["\n      ",{t:8,x:{r:[".type"],s:"_0||\"item\""}},"\n    "]},"\n"],n:50,x:{r:["~/",".condition","."],s:"_1===undefined||(typeof _1===\"boolean\"&&_1)||(typeof _1===\"string\"&&_0[_1])||(typeof _1===\"function\"&&_2.condition())"}}],n:52,r:".items"}]},e:{"_0&&(_1||_2===\"section\")":function (_0,_1,_2){return(_0&&(_1||_2==="section"));},"_0?_3.active(_1.getHandle((_2))):_3.active()":function (_0,_1,_2,_3){return(_0?_3.active(_1.getHandle((_2))):_3.active());},"typeof _0===\"function\"":function (_0){return(typeof _0==="function");},"typeof _0===\"boolean\"":function (_0){return(typeof _0==="boolean");},"[_0.action()]":function (_0){return([_0.action()]);},"[(_0).toggle(\".open\"),false]":function (_0){return([(_0).toggle(".open"),false]);},"[{axis:\"x\"}]":function (){return([{axis:"x"}]);},"_2&&_0&&_1.visibleItems(_2)":function (_0,_1,_2){return(_2&&_0&&_1.visibleItems(_2));},"!_0||_0===\"item\"":function (_0){return(!_0||_0==="item");},"_0===\"section\"":function (_0){return(_0==="section");},"_0===\"container\"":function (_0){return(_0==="container");},"[_0]":function (_0){return([_0]);},"typeof _0===\"string\"":function (_0){return(typeof _0==="string");},"_0||\"item\"":function (_0){return(_0||"item");},"_1===undefined||(typeof _1===\"boolean\"&&_1)||(typeof _1===\"string\"&&_0[_1])||(typeof _1===\"function\"&&_2.condition())":function (_0,_1,_2){return(_1===undefined||(typeof _1==="boolean"&&_1)||(typeof _1==="string"&&_0[_1])||(typeof _1==="function"&&_2.condition()));}}},
          css: function(data) { return [(function(data) {



        var base = "\n\n  .rmenu {\n\n    " + (data('menu.font') ? ("font-family: " + (data('menu.font')) + ";") : '') + "\n\n    color: " + (data('menu.fg') || '#fefefe') + ";\n\n    background-color: " + (data('menu.bg') || '#444') + ";\n\n    min-height: 100%;\n\n  }\n\n  .rmenu-item {\n\n    border-top: 1px solid transparent;\n\n    border-bottom: 1px solid transparent;\n\n    transition: border 0.2s ease-in-out;\n\n  }\n\n  .rmenu-expanded {\n\n    border-top: 1.5px solid " + (data('menu.fgdim') || data('fgdim') || 'rgba(255, 255, 255, 0.3)') + ";\n\n    border-bottom: 1.5px solid " + (data('menu.fgdim') || data('fgdim') || 'rgba(255, 255, 255, 0.3)') + ";\n\n  }\n\n  .rmenu-main {\n\n    width: 100%;\n\n    box-sizing: border-box;\n\n    user-select: none;\n\n    transition: 0.3s ease-in-out;\n\n    transition-property: color, background-color;\n\n    display: flex;\n\n    align-items: center;\n\n    padding: 0.2em 0;\n\n  }\n\n  .rmenu-main.rmenu-active {\n\n    color: " + (data('menu.fgActive') || data('fga1') || '#07e') + ";\n\n    background-color: " + (data('menu.bgActive') || data('bg1') || '#dfdfdf') + ";\n\n  }\n\n  .rmenu-items {\n\n    display: block;\n\n  }\n\n  .rmenu-right {\n\n    padding-right: 0.4em;  \n\n  }\n\n  .rmenu-left {\n\n    padding-left: 0.4em;\n\n  }\n\n  .rmenu-expand {\n\n    width: 1.5em;\n\n    height: 1.5em;\n\n    padding-left: 0.5em;\n\n    cursor: pointer;\n\n    position: relative;\n\n  }\n\n  .rmenu-expand:before {\n\n    position: absolute;\n\n    display: inline-block;\n\n    top: 0.25em;\n\n    content: ' ';\n\n    transform: rotate(45deg);\n\n    transition: transform 0.2s ease-in-out, top 0.2s ease-in-out;\n\n    box-sizing: border-box;\n\n    border-width: 0.25em;\n\n    border-style: solid;\n\n    border-left-color: transparent;\n\n    border-top-color: transparent;\n\n  }\n\n  .rmenu-expanded > .rmenu-main > .rmenu-expand:before {\n\n    top: -0.25em;\n\n  }\n\n\n\n  .rmenu-title {\n\n    white-space: nowrap;\n\n    overflow: hidden;\n\n    text-overflow: ellipsis;\n\n    cursor: pointer;\n\n    padding: 0 0.5em;\n\n    flex-grow: 1;\n\n  }\n\n  .rmenu-item h1, .rmenu-item h2, .rmenu-item h3, .rmenu-item h4 {\n\n    margin: 0;\n\n  }\n\n\n\n  .rmenu-section {\n\n    padding: 0.75em 0;\n\n  }\n\n  .rmenu-section > .rmenu-main {\n\n    cursor: default;\n\n    font-size: 0.75em;\n\n    opacity: 0.7;\n\n    margin-bottom: 0.25em;\n\n  }\n\n\n\n  .rmenu-container {\n\n    box-sizing: border-box;\n\n  }\n\n\n\n  .rmenu-container-pad {\n\n    padding: 0.3em 0.3em 0.8em 0.3em;\n\n  }\n\n\n\n  .rmenu-expanded > .rmenu-main > .rmenu-expand:before {\n\n    transform: rotate(-135deg);\n\n    top: 0.5em;\n\n  }\n\n  ";



        return base;


      }).call(this, data)].join(' '); },
          cssId: 'menu',
          noCssTransform: true,
          noIntro: true,
          nestedTransitions: false,
          on: {
            construct: construct,
            config: function config() {
              if ( this._items ) { this.set('items', (this.get('items') || []).concat(this._items), { shuffle: true }); }
            }
          },
          attributes: [],
          use: [expand()],
          decorators: {
            ref: function ref(node, name) {
              var r = this;
              var nm = name;
              if (!r.refs) { r.refs = {}; }

              var handle = {
                update: function update(name) {
                  if (r.refs[nm] === handle) { delete r.refs[nm]; }
                  nm = name;
                  r.refs[nm] = handle;
                },
                teardown: function teardown() {
                  if (r.refs[nm] === handle) { delete r.refs[nm]; }
                }
              };

              handle.ctx = r.getContext(node);

              r.refs[nm] = handle;

              return handle;
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

          function item(el) {
            if (el.e !== 'item' && el.e !== 'section' && el.e !== 'container') { return; }

            var res = {};
            var as = [];
            var title;

            if (el.e !== 'item') { res.type = el.e; }

            el.m && el.m.forEach(function (a) {
              if (a.n === 'title') {
                if (typeof a.f === 'string') { res.title = a.f; }
                else { res.titlePartial = { t: a.f }; }
              } else if (a.t === 70 && a.n[0] === 'action') { // events
                res.actionPartial = { t: [{ n: ['click'], f: a.f, t: a.t }] };
              } else if (a.n === 'guard' && a.f && a.f.length === 1 && a.f[0].t === 2) {
                var cnd = "_cnd" + (attrs.length);
                res.condition = cnd;
                attrs.push({ t: 13, n: cnd, f: a.f });
              } else if (a.n === 'ref') {
                if (typeof a.f === 'string') {
                  res.ref = a.f;
                } else if (a.f && a.f.length === 1 && a.f[0].t === 2) {
                  var cnd$1 = "_cnd" + (attrs.length);
                  attrs.push({ t: 13, n: cnd$1, f: a.f });
                  res.refPartials = { t:[{ t: 71, n: 'ref', f: { r: cnd$1, s: '[_0]' } }] };
                }
              } else if (a.n === 'active') {
                if (a.f && a.f.length === 1 && a.f[0].t === 2) {
                  var cnd$2 = "_cnd" + (attrs.length);
                  res.activeRef = cnd$2;
                  attrs.push({ t: 13, n: cnd$2, f: a.f });
                }
              } else if (a.n === 'open') {
                res.open = true;
              } else if (el.e === 'container' && a.n === 'pad') {
                res.pad = true;
              } else {
                as.push(a);
              }
            });

            if (as.length) { res.attrsPartial = { t: as }; }

            if (el.e === 'container') {
              res.contentPartial = { t: el.f };
              res.attrsPartial = as;
              return res;
            }

            el.f && el.f.forEach(function (e) {
              if (e.e === 'title') {
                if (e.f.length === 1 && typeof e.f[0] === 'string') { res.title = e.f[0]; }
                else { res.titlePartial = { t: e.f }; }
              }
              else if (e.e === 'item' || e.e === 'section' || e.e === 'container') {
                var i = item(e);
                if (i) { (res.items || (res.items = [])).push(i); }
              }
              else if (e.e === 'left') {
                res.leftPartial = { t: e.f };
              }
              else if (e.e === 'right') {
                res.rightPartial = { t: e.f };
              }
              else {
                if (!title) { title = []; }
                title.push(e);
              }
            });

              if (!res.titlePartial && title) { res.titlePartial = { t: title }; }
              title = null;

            return res;
          }

          var list = [];
          tpl.forEach(function (e) {
            var i = item(e);
            if (i) { list.push(i); }
          });

          this._items = list;
        }

        var Handle = function Handle(menu, parent, item) {
          this.menu = menu;
          this.parent = parent;
          this.item = item;
        };

        var prototypeAccessors = { keypath: { configurable: true },action: { configurable: true },active: { configurable: true } };

        prototypeAccessors.keypath.get = function () {
          if (this.removed) { return; }
          if (!this.parent) { return ("items." + (this.menu.get('items').indexOf(this.item))); }
          var path = this.parent.keypath + '.items';
          var parent = this.menu.get(path);
          return (path + "." + (parent.indexOf(this.item)));
        };

        prototypeAccessors.action.get = function () {
          if (this.removed) { return; }
          return this.item.action;
        };

        prototypeAccessors.action.set = function (v) {
          return this.set('.action', v);
        };

        prototypeAccessors.active.get = function () {
          if (this.removed) { return; }
          var item = this.item;
          if (item.activeRef) { return this.menu.get(item.activeRef); }
          else if (typeof item.active === 'function') { return item.active(); }
          else { return item.active; }
        };

        prototypeAccessors.active.set = function (v) {
          if (this.removed) { return; }
          var item = this.item;
          if (item.activeRef) { return this.menu.set(item.activeRef, v); }
          else { return this.set(".active", v); }
        };

        Handle.prototype.addItem = function addItem (item, idx) {
          if (this.removed) { return false; }
          var items = (this.keypath) + ".items";
          if (typeof idx === 'number') {
            this.menu.splice(items, 0, idx, item);
          } else {
            this.menu.push(items, item);
          }
          return new Handle(this.menu, this, item);
        };

        Handle.prototype.open = function open () {
          if (this.removed) { return false; }
          this.menu.set(((this.keypath) + ".open"), true);
        };

        Handle.prototype.close = function close () {
          if (this.removed) { return false; }
          this.menu.set(((this.keypath) + ".open"), false);
        };

        Handle.prototype.remove = function remove () {
          if (this.removed) { return false; }
          var parentPath = (this.parent ? this.parent.keypath + '.' : '') + "items";
          var parent = this.menu.get(parentPath);
          this.menu.splice(parentPath, parent.indexOf(this.item), 1);
          this.removed = true;
          return true;
        };

        Handle.prototype.get = function get (keypath) {
          if (this.removed) { return false; }
          var key = keypath.replace(/^[\.\/]*/, '');
          return this.menu.get(((this.keypath) + "." + key));
        };

        Handle.prototype.set = function set (keypath, value) {
          if (this.removed) { return false; }
          var key = keypath.replace(/^[\.\/]*/, '');
          return this.menu.set(((this.keypath) + "." + key), value);
        };

        Object.defineProperties( Handle.prototype, prototypeAccessors );

        function plugin(opts) {
          if ( opts === void 0 ) opts = {};

          return function(ref) {
            var instance = ref.instance;

            instance.components[opts.name || 'menu'] = Menu;
          }
        }

        globalRegister('RMMenu', 'components', Menu);
      exports('default', plugin);

    }
  };
});
