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

      function clickout(node, fire) {
        function handler(ev) {
          var n = ev.target;
          while (n) {
            if (n === node) { return false; }
            n = n.parentNode;
          }
          fire(ev);
        }

        document.body.addEventListener('click', handler);
        document.body.addEventListener('touchstop', handler);

        return {
          teardown: function teardown() {
            document.body.removeEventListener('click', handler);
            document.body.removeEventListener('touchstop', handler);
          }
        }
      }

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.events[opts.name || 'clickout'] = clickout;
        }
      }

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

        Menu.prototype.popAllIn = function popAllIn (ctx) {
          var this$1 = this;

          ctx = ctx || this.getContext();
          var items = ctx.get('items');
          if (ctx.get('open')) { ctx.set('open', false); }
          var path = ctx.resolve('items');
          for (var i = 0; i < items.length; i++) {
            close(this$1, (path + "." + i));
          }
        };

        Menu.prototype._actioned = function _actioned () {
          this.fire('action');
          this.popAllIn();      
        };

        Menu.prototype._itemRendered = function _itemRendered (ctx) {
          var this$1 = this;

          setTimeout(function () { return this$1.fire('item', ctx, this$1.getHandle(ctx)); });
          return '';
        };

        return Menu;
      }(Ractive$1));

      // TODO: api handles, active elements, and ids
      Ractive$1.extendWith(Menu, {
        template: {v:4,t:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-wrapper",g:1},{t:16,r:"extra-attributes"},{n:"class-rmenu-vertical",t:13,f:[{t:2,x:{r:["~/horizontal"],s:"!_0"}}]},{n:"class-rmenu-horizontal",t:13,f:[{t:2,r:"~/horizontal"}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-inner",g:1}],f:[{t:8,r:"items"}]}]}]}],e:{"!_0":function (_0){return(!_0);},"_0&&(_1||_2===\"section\")":function (_0,_1,_2){return(_0&&(_1||_2==="section"));},"_0?_3.active(_1.getHandle((_2))):_3.active()":function (_0,_1,_2,_3){return(_0?_3.active(_1.getHandle((_2))):_3.active());},"typeof _0===\"function\"":function (_0){return(typeof _0==="function");},"typeof _0===\"boolean\"":function (_0){return(typeof _0==="boolean");},"[_0.action()]":function (_0){return([_0.action()]);},"[_0._actioned()]":function (_0){return([_0._actioned()]);},"[(_0).toggle(\".open\"),false]":function (_0){return([(_0).toggle(".open"),false]);},"[{axis:\"x\"}]":function (){return([{axis:"x"}]);},"_2&&_0&&_1.visibleItems(_2)":function (_0,_1,_2){return(_2&&_0&&_1.visibleItems(_2));},"!_0||_0===\"item\"":function (_0){return(!_0||_0==="item");},"_0===\"section\"":function (_0){return(_0==="section");},"_0===\"container\"":function (_0){return(_0==="container");},"(!_0||_0===\"item\")&&_1":function (_0,_1){return((!_0||_0==="item")&&_1);},"[_0.popAllIn((_1))]":function (_0,_1){return([_0.popAllIn((_1))]);},"[_0]":function (_0){return([_0]);},"typeof _0===\"string\"":function (_0){return(typeof _0==="string");},"_0||\"item\"":function (_0){return(_0||"item");},"_0._itemRendered((_1))":function (_0,_1){return(_0._itemRendered((_1)));},"_1===undefined||(typeof _1===\"boolean\"&&_1)||(typeof _1===\"string\"&&_0[_1])||(typeof _1===\"function\"&&_2.condition())":function (_0,_1,_2){return(_1===undefined||(typeof _1==="boolean"&&_1)||(typeof _1==="string"&&_0[_1])||(typeof _1==="function"&&_2.condition()));}},p:{container:[{t:4,f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-container-pad",g:1}],f:[{t:3,r:".content"}]}],n:50,r:".pad"},{t:4,f:[{t:3,r:".content"}],n:51,l:1}],n:50,r:".content"},{t:4,f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-container-pad",g:1}],f:[{t:16,r:".contentPartial"}]}],n:50,r:".pad"},{t:4,f:[{t:16,r:".contentPartial"}],n:51,l:1}],n:50,r:".contentPartial",l:1}],section:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-main",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-title",g:1}],f:[{t:4,f:[{t:2,r:".title"}],n:50,r:".title"},{t:4,f:[{t:16,r:".titlePartial"}],n:50,r:".titlePartial",l:1}]}]}," ",{t:8,r:"children"}],children:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-items",g:1},{t:4,f:[{n:"expand",t:72,v:"t0"}],n:50,x:{r:[".popout"],s:"!_0"}},{t:4,f:[{n:"pop",t:72,v:"t0"}],n:51,l:1}],f:[{t:8,r:"items"}]}],n:50,x:{r:[".items.length",".open",".type"],s:"_0&&(_1||_2===\"section\")"}}],item:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-main",g:1},{t:4,f:[{n:"class-rmenu-active",t:13,f:[{t:2,rx:{r:"~/",m:[{t:30,n:".activeRef"}]}}]}],n:50,r:".activeRef"},{t:4,f:[{n:"class-rmenu-active",t:13,f:[{t:2,x:{r:[".active.length","@this","@context","."],s:"_0?_3.active(_1.getHandle((_2))):_3.active()"}}]}],n:50,x:{r:[".active"],s:"typeof _0===\"function\""},l:1},{t:4,f:[{n:"class-rmenu-active",t:13,f:[{t:2,r:".active"}]}],n:50,x:{r:[".active"],s:"typeof _0===\"boolean\""},l:1}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"menu-left",g:1}],f:[{t:3,r:".left"}]}],n:50,r:".left"},{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-left",g:1}],f:[{t:16,r:".leftPartial"}]}],n:50,r:".leftPartial",l:1}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-title",g:1},{t:4,f:[{n:["click"],t:70,f:{r:["."],s:"[_0.action()]"}},{n:["click"],t:70,f:{r:["@this"],s:"[_0._actioned()]"}}],n:50,x:{r:[".action"],s:"typeof _0===\"function\""}},{t:4,f:[{t:16,r:".actionPartial"},{n:["click"],t:70,f:{r:["@this"],s:"[_0._actioned()]"}}],n:50,r:".actionPartial",l:1},{t:4,f:[{n:["click"],t:70,f:{r:["@context"],s:"[(_0).toggle(\".open\"),false]"}}],n:50,r:".items.length",l:1}],f:[{t:4,f:[{t:3,r:".title"}],n:50,r:".title"},{t:4,f:[{t:16,r:".titlePartial"}],n:50,r:".titlePartial",l:1}]}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"menu-right",g:1}],f:[{t:3,r:".right"}]}],n:50,r:".right"},{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-right",g:1}],f:[{t:16,r:".rightPartial"}]}],n:50,r:".rightPartial",l:1}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-expand",g:1},{n:["click"],t:70,f:{r:["@context"],s:"[(_0).toggle(\".open\"),false]"}},{n:"expand",t:72,f:{r:[],s:"[{axis:\"x\"}]"},v:"t0"}]}],n:50,x:{r:[".items.length","@this",".items"],s:"_2&&_0&&_1.visibleItems(_2)"}}]}," ",{t:8,r:"children"}],items:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-popout-close",g:1},{n:["click"],t:70,f:{r:["@context"],s:"[(_0).toggle(\".open\"),false]"}}]}],n:50,r:".shrink"}," ",{t:4,f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-entry",g:1},{t:4,f:[{n:"class-rmenu-item",t:13}],n:50,x:{r:[".type"],s:"!_0||_0===\"item\""}},{t:4,f:[{n:"class-rmenu-section",t:13}],n:50,x:{r:[".type"],s:"_0===\"section\""},l:1},{t:4,f:[{n:"class-rmenu-container",t:13}],n:50,x:{r:[".type"],s:"_0===\"container\""},l:1},{n:"class-rmenu-expanded",t:13,f:[{t:2,r:".open"}]},{n:"class-rmenu-popout",t:13,f:[{t:2,x:{r:[".type",".popout"],s:"(!_0||_0===\"item\")&&_1"}}]},{t:4,f:[{n:"pop",t:72,v:"t0"},{t:4,f:[{n:["clickout"],t:70,f:{r:["@this","@context"],s:"[_0.popAllIn((_1))]"}}],n:50,r:".open"}],n:50,r:".popout"},{t:4,f:[{n:"expand",t:72,v:"t0"}],n:51,l:1},{t:4,f:[{t:8,r:".refPartial"}],n:50,r:".refPartial"},{t:4,f:[{n:"ref",t:71,f:{r:[".ref"],s:"[_0]"}}],n:50,x:{r:[".ref"],s:"typeof _0===\"string\""},l:1},{t:4,f:[{t:16,r:".attrsPartial"}],n:50,r:".attrsPartial"}],f:[{t:8,x:{r:[".type"],s:"_0||\"item\""}}," ",{t:4,f:[{t:2,x:{r:["@this","@context"],s:"_0._itemRendered((_1))"}}],n:50,x:{r:[".type"],s:"!_0||_0===\"item\""}}]}],n:50,x:{r:["~/",".condition","."],s:"_1===undefined||(typeof _1===\"boolean\"&&_1)||(typeof _1===\"string\"&&_0[_1])||(typeof _1===\"function\"&&_2.condition())"}}],n:52,r:".items"}]}},
        css: function(data) { return [(function(data) {
         var primary = Object.assign({}, data('raui.primary'), data('raui.menu.primary'));
         var base = "\n   .rmenu-wrapper {\n     position: relative;\n     z-index: 1;\n   }\n   .rmenu-wrapper.rmenu-vertical {\n     min-height: 100%;\n   }\n   .rmenu {\n     " + (data('raui.menu.font') ? ("font-family: " + (data('raui.menu.font')) + ";") : '') + "\n     color: " + (primary.bg || '#fff') + ";\n     background-color: " + (primary.fga || '#222') + ";\n     position: absolute;\n     top: 0;\n     bottom: 0;\n     left: 0;\n     right: 0;\n   }\n   .rmenu-wrapper.alt > .rmenu {\n     color: " + (primary.fga || '#222') + ";\n     background-color: " + (primary.bg || '#fff') + ";\n   }\n   .rmenu-inner {\n     width: 100%;\n     height: 100%;\n     overflow-y: auto;\n   }\n   .rmenu-item {\n     border-top: 1px solid transparent;\n     border-bottom: 1px solid transparent;\n     transition: border 0.2s ease-in-out;\n   }\n   .rmenu-expanded {\n     border-top: 0.0625em solid " + (primary.bc || '#ccc') + ";\n     border-bottom: 0.0625em solid " + (primary.bc || '#ccc') + ";\n   }\n   .rmenu-main {\n     width: 100%;\n     box-sizing: border-box;\n     user-select: none;\n     transition: 0.3s ease-in-out;\n     transition-property: color, background-color;\n     display: flex;\n     align-items: center;\n     padding: 0.2em 0;\n   }\n   .rmenu-main.rmenu-active {\n     color: " + (primary.fga || '#07e') + ";\n     background-color: " + (primary.bg || '#fff') + ";\n   }\n   .rmenu-wrapper.alt .rmenu-main.rmenu.active {\n     color: " + (primary.bg || '#fff') + ";\n     background-color: " + (primary.fga || '#07e') + ";\n   }\n   .rmenu-items {\n     display: block;\n   }\n   .rmenu-right {\n     padding-right: 0.4em;  \n   }\n   .rmenu-left {\n     padding-left: 0.4em;\n   }\n   .rmenu-expand {\n     width: 1.5em;\n     height: 1.5em;\n     padding-left: 0.5em;\n     cursor: pointer;\n     position: relative;\n   }\n   .rmenu-expand:before {\n     position: absolute;\n     display: inline-block;\n     top: 0.25em;\n     content: ' ';\n     transform: rotate(45deg);\n     transition: transform 0.2s ease-in-out, top 0.2s ease-in-out, left 0.2s ease-in-out;\n     box-sizing: border-box;\n     border-width: 0.25em;\n     border-style: solid;\n     border-left-color: transparent;\n     border-top-color: transparent;\n   }\n   .rmenu-expanded > .rmenu-main > .rmenu-expand:before {\n     top: -0.25em;\n   }\n \n   .rmenu-popout > .rmenu-items {\n     position: absolute;\n     left: 0;\n     top: 0;\n     width: 100%;\n     height: 100%;\n     background-color: " + (primary.bg || '#fff') + ";\n     color: " + (primary.fg || '#222') + ";\n     box-sizing: border-box;\n     border: 1px solid;\n     z-index: -1;\n     transition: box-shadow 0.2s ease-in-out;\n   }\n   .rmenu-popout.rmenu-expanded > .rmenu-items {\n     left: 100%;\n     z-index: initial;\n     box-shadow: 0.2em 0 0.2em rgba(0, 0, 0, 0.2);\n   }\n \n   .rmenu-popout > .rmenu-items.rmenu-shrink {\n     left: 100%;\n     z-index: 1;\n   }\n   .rmenu-popout.rmenu-expanded > .rmenu-items.rmenu-shrink {\n     left: 0;\n   }\n \n   .rmenu-popout > .rmenu-main > .rmenu-expand:before {\n     transform: rotate(-45deg);\n     top: 0.4em;\n   }\n \n   .rmenu-popout.rmenu-expanded > .rmenu-main > .rmenu-expand:before {\n     transform: rotate(135deg);\n     left: 0.75em;\n   }\n \n   .rmenu-popout > .rmenu-items .rmenu-popout > .rmenu-items {\n     height: calc(100% + 2px);\n     width: calc(100% + 1px);\n     top: -1px;\n   }\n \n   .rmenu-popout-close:after {\n     color:  " + (primary.bc || '#ccc') + ";\n     content: '\\274c  Close';\n     display: block;\n     padding: 0.5em 0.5em 0.1em 0.5em;\n   }\n \n   .rmenu-title {\n     white-space: nowrap;\n     overflow: hidden;\n     text-overflow: ellipsis;\n     cursor: pointer;\n     padding: 0 0.5em;\n     flex-grow: 1;\n   }\n   .rmenu-item h1, .rmenu-item h2, .rmenu-item h3, .rmenu-item h4 {\n     margin: 0;\n   }\n \n   .rmenu-section {\n     padding: 0.75em 0;\n   }\n   .rmenu-section > .rmenu-main {\n     cursor: default;\n     font-size: 0.75em;\n     opacity: 0.7;\n     margin-bottom: 0.25em;\n   }\n \n   .rmenu-container {\n     box-sizing: border-box;\n   }\n \n   .rmenu-container-pad {\n     padding: 0.3em 0.3em 0.8em 0.3em;\n   }\n \n   .rmenu-expanded > .rmenu-main > .rmenu-expand:before {\n     transform: rotate(-135deg);\n     top: 0.5em;\n   }\n   ";
         // TODO: other themes
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
        use: [expand(), plugin()],
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
        },
        transitions: {
          pop: function pop(t, params) {
            var this$1 = this;

            var p = t.processParams(params, { duration: 200, easing: 'easeInOut' });
            var shrink;

            if (t.isIntro) {
              var rect = t.node.getBoundingClientRect();
              function findParent() {
                var n = t.node.parentNode;
                while (n && n.classList) {
                  if (n.classList.contains('rmenu')) { return n; }
                  else if (n.parentNode.classList.contains('rmenu-popout')) { return n; }
                  n = n.parentNode;
                }
              }
              if (rect.left + rect.width > window.innerWidth) {
                t.node.classList.add('rmenu-shrink');
                shrink = true;
                setTimeout(function () { return this$1.getContext(t.node).set('.shrink', true); });
                findParent().style.overflowX = 'hidden';
              } else if (t.node.classList.contains('rmenu-shrink')) {
                setTimeout(function () { return this$1.getContext(t.node).set('.shrink', false); });
                findParent().style.overflowX = '';
              } else {
                findParent().style.overflowX = '';
              }
            } else {
              shrink = t.node.classList.contains('rmenu-shrink');
            }

            if (t.isIntro) {
              if (shrink) {
                t.setStyle('left', '100%');
                return t.animateStyle('left', 0, p);
              } else {
                t.setStyle('left', 0);
                t.setStyle('z-index', -1);
                return t.animateStyle('left', '100%', p);
              }
            } else {
              if (shrink) {
                t.setStyle('left', 0);
                return t.animateStyle('left', '100%', p);
              } else {
                t.setStyle('left', '100%');
                t.setStyle('z-index', -1);
                return t.animateStyle('left', 0, p);
              }
            }
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
            } else if (a.n === 'popout') {
              res.popout = true;
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

      var prototypeAccessors = { keypath: { configurable: true },action: { configurable: true },active: { configurable: true },ref: { configurable: true } };

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

      prototypeAccessors.ref.get = function () {
        if (this.removed) { return; }
        return this.item.ref;
      };

       prototypeAccessors.ref.set = function (v) {
         return this.set('.ref', v);
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

      function close(instance, path) {
        var item = instance.get(path);
        if (item.open && item.popout) { instance.toggle((path + ".open")); }
        var items;
        if (items = instance.get((path + ".items"))) {
          for (var i = 0; i < items.length; i++) {
            close(instance, (path + ".items." + i));
          }
        }
      }

      function plugin$1(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.components[opts.name || 'menu'] = Menu;
        }
      }

      globalRegister('RMMenu', 'components', Menu);
      exports('default', plugin$1);

    }
  };
});
