System.register(['ractive', './chunk2.js', './chunk5.js'], function (exports, module) {
  'use strict';
  var Ractive$1, expand, globalRegister, clickout;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      expand = module.default$1;
      globalRegister = module.default;
    }, function (module) {
      clickout = module.default;
    }],
    execute: function () {

      function findRef(items, ref) {
        for (var i = 0; i < items.length; i++) {
          if (items[i].ref === ref) { return [items[i]]; }
          else if (items[i].items) {
            var res = findRef(items[i].items, ref);
            if (res) {
              res.unshift(items[i]);
              return res;
            }
          }
        }
      }

      var Menu = /*@__PURE__*/(function (Ractive) {
        function Menu(opts) {
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

        Menu.prototype.visibleItemsFor = function visibleItemsFor (item) {
          return this.visibleItems(this.itemsFor(item));
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
              else {
                var path = findRef(this.get('items'), what);
                if (path) {
                  return path.reduce(function (a, c) {
                    return new Handle(this$1, a, c);
                  }, null);
                }
              }
            }
          } else if (what && what.parentNode) {
            ctx = this.getContext(what);
          } else if (what && what.decorators) {
            ctx = what;
          }

          if (ctx) {
            var path$1 = [ctx.get()];
            var str = '../../';
            while (ctx.resolve(str) !== '') {
              path$1.unshift(ctx.get(str));
              str += '../../';
            }

            return path$1.reduce(function (a, c) {
              return new Handle(this$1, a, c);
            }, null);
          }
        };

        Menu.prototype.popAllIn = function popAllIn (path) {
          if (!path) { path = ''; }
          var item = this.get(path);
          if (item && item.items) {
            for (var i = 0; i < item.items.length; i++) {
              this.popAllIn(((path ? (path + ".") : '') + "items." + i));
            }
          }
          if (item.open && item.popout) { this.set(((path ? (path + ".") : '') + "open"), false); }
        };

        Menu.prototype.popSiblingsIn = function popSiblingsIn (ctx) {
          var me = ctx.resolve();
          var items = ctx.get('../');
          if (items) {
            for (var i = 0; i < items.length; i++) {
              if (me === ctx.resolve(("../" + i))) { continue; }
              if (items[i].open && items[i].popout) {
                ctx.toggle(("../" + i + ".open"));
              }
            }
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

        // TODO: handle active fn with context param
        Menu.prototype.childActive = function childActive (path) {
          var item = this.get(path);
          if (item && item.items) {
            for (var i = 0; i < item.items.length; i++) {
              if (this.get((path + ".items." + i + ".active")) === true || (typeof item.items[i].active === 'function' && item.items[i].active()) || (this.get((path + ".items." + i + ".activeRef")) && this.get(item.items[i].activeRef)) || this.childActive((path + ".items." + i))) { return true; }
            }
          }
        };

        Menu.prototype.itemsFor = function itemsFor (child) {
          if (child && Array.isArray(child.items)) { return child.items; }
          else if (child && typeof child.items === 'string') { return this.get(child.items) || []; }
          return [];
        };

        return Menu;
      }(Ractive$1));

      // TODO: api handles, active elements, and ids
      Ractive$1.extendWith(Menu, {
        template: {v:4,t:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-wrapper",g:1},{t:16,r:"extra-attributes"},{n:"class-rmenu-vertical",t:13,f:[{t:2,x:{r:["~/horizontal"],s:"!_0"}}]},{n:"class-rmenu-horizontal",t:13,f:[{t:2,r:"~/horizontal"}]},{n:"class-rmenu-alt",t:13,f:[{t:2,r:"alt"}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-inner",g:1}],f:[{t:8,r:"items"}]}]}]}],e:{"!_0":function (_0){return(!_0);},"_0||_1":function (_0,_1){return(_0||_1);},"_0.itemsFor(_1).length&&(_2||_3===\"section\")":function (_0,_1,_2,_3){return(_0.itemsFor(_1).length&&(_2||_3==="section"));},"_0?_3.active(_1.getHandle((_2))):_3.active()":function (_0,_1,_2,_3){return(_0?_3.active(_1.getHandle((_2))):_3.active());},"typeof _0===\"function\"":function (_0){return(typeof _0==="function");},"typeof _0===\"boolean\"":function (_0){return(typeof _0==="boolean");},"_0.childActive(_1)":function (_0,_1){return(_0.childActive(_1));},"_0!=null":function (_0){return(_0!=null);},"[_0.action(),_1._actioned()]":function (_0,_1){return([_0.action(),_1._actioned()]);},"[_0._actioned()]":function (_0){return([_0._actioned()]);},"[_0&&_1.popSiblingsIn((_2)),(_2).toggle(\".open\"),false]":function (_0,_1,_2){return([_0&&_1.popSiblingsIn((_2)),(_2).toggle(".open"),false]);},"_0.itemsFor(_1).length":function (_0,_1){return(_0.itemsFor(_1).length);},"_0||(_1&&_2[_1])":function (_0,_1,_2){return(_0||(_1&&_2[_1]));},"[{axis:\"x\"}]":function (){return([{axis:"x"}]);},"_0.visibleItemsFor(_1)":function (_0,_1){return(_0.visibleItemsFor(_1));},"[_0.popAllIn(_1),false]":function (_0,_1){return([_0.popAllIn(_1),false]);},"typeof _0===\"string\"":function (_0){return(typeof _0==="string");},"!_0||_0===\"item\"":function (_0){return(!_0||_0==="item");},"_0===\"section\"":function (_0){return(_0==="section");},"_0===\"container\"":function (_0){return(_0==="container");},"(!_0||_0===\"item\")&&_1":function (_0,_1){return((!_0||_0==="item")&&_1);},"[_0.popAllIn(_1)]":function (_0,_1){return([_0.popAllIn(_1)]);},"[_0]":function (_0){return([_0]);},"Math.floor((_0-30)/7)+5":function (_0){return(Math.floor((_0-30)/7)+5);},"(_0||_2[_1])&&_3&&_4>34":function (_0,_1,_2,_3,_4){return((_0||_2[_1])&&_3&&_4>34);},"_0||\"item\"":function (_0){return(_0||"item");},"_0._itemRendered((_1))":function (_0,_1){return(_0._itemRendered((_1)));},"_1===undefined||(typeof _1===\"boolean\"&&_1)||(typeof _1===\"string\"&&_0[_1])||(typeof _1===\"function\"&&_2.condition())":function (_0,_1,_2){return(_1===undefined||(typeof _1==="boolean"&&_1)||(typeof _1==="string"&&_0[_1])||(typeof _1==="function"&&_2.condition()));}},p:{container:[{t:4,f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-container-pad",g:1}],f:[{t:3,r:".content"}]}],n:50,r:".pad"},{t:4,f:[{t:3,r:".content"}],n:51,l:1}],n:50,r:".content"},{t:4,f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-container-pad",g:1}],f:[{t:16,r:".contentPartial"}]}],n:50,r:".pad"},{t:4,f:[{t:16,r:".contentPartial"}],n:51,l:1}],n:50,r:".contentPartial",l:1}],section:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-main",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-title",g:1}],f:[{t:4,f:[{t:2,r:".title"}],n:50,r:".title"},{t:4,f:[{t:16,r:".titlePartial"}],n:50,r:".titlePartial",l:1}]}]}],n:50,x:{r:[".title",".titlePartial"],s:"_0||_1"}}," ",{t:8,r:"children"}],children:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-items",g:1},{t:4,f:[{n:"expand",t:72,v:"t0"}],n:50,x:{r:[".popout"],s:"!_0"}},{t:4,f:[{n:"pop",t:72,v:"t0"}],n:51,l:1},{n:"class-rmenu-shrink",t:13,f:[{t:2,r:".shrink"}]}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-popitems",g:1}],f:[{t:8,r:"items"}]}],n:50,r:".popout"},{t:4,f:[{t:8,r:"items"}],n:51,l:1}]}],n:50,x:{r:["@this",".",".open",".type"],s:"_0.itemsFor(_1).length&&(_2||_3===\"section\")"}}],item:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-main",g:1},{t:4,f:[{n:"class-rmenu-active",t:13,f:[{t:2,rx:{r:"~/",m:[{t:30,n:".activeRef"}]}}]}],n:50,r:".activeRef"},{t:4,f:[{n:"class-rmenu-active",t:13,f:[{t:2,x:{r:[".active.length","@this","@context","."],s:"_0?_3.active(_1.getHandle((_2))):_3.active()"}}]}],n:50,x:{r:[".active"],s:"typeof _0===\"function\""},l:1},{t:4,f:[{n:"class-rmenu-active",t:13,f:[{t:2,r:".active"}]}],n:50,x:{r:[".active"],s:"typeof _0===\"boolean\""},l:1},{t:4,f:[{n:"class-rmenu-active",t:13,f:[{t:2,x:{r:["@this","@keypath"],s:"_0.childActive(_1)"}}]}],n:50,r:".popout",l:1},{t:4,f:[{n:"class-rmenu-disabled",t:13,f:[{t:2,r:".disabled"}]}],n:50,x:{r:[".disabled"],s:"_0!=null"}},{t:4,f:[{n:"class-rmenu-disabled",t:13,f:[{t:2,rx:{r:"~/",m:[{t:30,n:".disabledRef"}]}}]}],n:50,r:".disabledRef",l:1}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"menu-left",g:1}],f:[{t:3,r:".left"}]}],n:50,r:".left"},{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-left",g:1}],f:[{t:16,r:".leftPartial"}]}],n:50,r:".leftPartial",l:1}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-title",g:1},{t:4,f:[{t:4,f:[{n:["click"],t:70,f:{r:[".","@this"],s:"[_0.action(),_1._actioned()]"}}],n:50,x:{r:[".action"],s:"typeof _0===\"function\""}},{t:4,f:[{t:16,r:".actionPartial"},{n:["click"],t:70,f:{r:["@this"],s:"[_0._actioned()]"}}],n:50,r:".actionPartial",l:1},{t:4,f:[{n:["click"],t:70,f:{r:[".popout","@this","@context"],s:"[_0&&_1.popSiblingsIn((_2)),(_2).toggle(\".open\"),false]"}}],n:50,x:{r:["@this","."],s:"_0.itemsFor(_1).length"},l:1},{t:4,f:[{n:["click"],t:70,f:{r:["@this"],s:"[_0._actioned()]"}}],n:51,l:1}],n:51,x:{r:[".disabled",".disabledRef","~/"],s:"_0||(_1&&_2[_1])"}}],f:[{t:4,f:[{t:3,r:".title"}],n:50,r:".title"},{t:4,f:[{t:16,r:".titlePartial"}],n:50,r:".titlePartial",l:1}]}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"menu-right",g:1}],f:[{t:3,r:".right"}]}],n:50,r:".right"},{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-right",g:1}],f:[{t:16,r:".rightPartial"}]}],n:50,r:".rightPartial",l:1}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-expand",g:1},{n:["click"],t:70,f:{r:[".popout","@this","@context"],s:"[_0&&_1.popSiblingsIn((_2)),(_2).toggle(\".open\"),false]"}},{n:"expand",t:72,f:{r:[],s:"[{axis:\"x\"}]"},v:"t0"}],f:[{t:8,r:"arrow"}]}],n:50,x:{r:["@this","."],s:"_0.visibleItemsFor(_1)"}}]}," ",{t:8,r:"children"}],arrow:[{t:7,e:"svg",m:[{n:"viewBox",f:"4 7 16 10",t:13,g:1}],f:[{t:7,e:"path",m:[{n:"d",f:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z",t:13,g:1}]}]}],items:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-popout-close",g:1},{n:["click"],t:70,f:{r:["@this","@keypath"],s:"[_0.popAllIn(_1),false]"}}],f:["❌ Close"]}],n:50,r:".shrink"}," ",{t:4,f:[{t:4,f:[{t:8,r:"item-outer"}],n:52,rx:{r:"~/",m:[{t:30,n:".items"}]}}],n:50,x:{r:[".items"],s:"typeof _0===\"string\""}},{t:4,f:[{t:4,f:[{t:8,r:"item-outer"}],n:52,r:".items"}],n:51,l:1}],"item-outer":[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rmenu-entry",g:1},{t:4,f:[{n:"class-rmenu-item",t:13}],n:50,x:{r:[".type"],s:"!_0||_0===\"item\""}},{t:4,f:[{n:"class-rmenu-section",t:13}],n:50,x:{r:[".type"],s:"_0===\"section\""},l:1},{t:4,f:[{n:"class-rmenu-container",t:13}],n:50,x:{r:[".type"],s:"_0===\"container\""},l:1},{n:"class-rmenu-expanded",t:13,f:[{t:2,r:".open"}]},{n:"class-rmenu-popout",t:13,f:[{t:2,x:{r:[".type",".popout"],s:"(!_0||_0===\"item\")&&_1"}}]},{t:4,f:[{n:"pop",t:72,v:"t0"},{t:4,f:[{n:["clickout"],t:70,f:{r:["@this","@keypath"],s:"[_0.popAllIn(_1)]"}}],n:50,r:".open"}," "],n:50,r:".popout"},{t:4,f:[{n:"expand",t:72,v:"t0"}],n:50,x:{r:["~/noExpand"],s:"!_0"},l:1},{t:4,f:[{t:8,r:".refPartial"}],n:50,r:".refPartial"},{t:4,f:[{n:"ref",t:71,f:{r:[".ref"],s:"[_0]"}}],n:50,x:{r:[".ref"],s:"typeof _0===\"string\""},l:1},{t:4,f:[{t:16,r:".extra"}],n:50,r:".extra"},{t:4,f:[{t:8,r:".local"}],n:50,r:".local"},{t:4,f:[{n:"class-marquee",t:13},{n:"style-animation-duration",f:[{t:2,x:{r:[".title.length"],s:"Math.floor((_0-30)/7)+5"}},"s"],t:13}],n:50,x:{r:[".marquee",".marqueeRef","~/",".title",".title.length"],s:"(_0||_2[_1])&&_3&&_4>34"}}],f:[{t:8,x:{r:[".type"],s:"_0||\"item\""}}," ",{t:4,f:[{t:2,x:{r:["@this","@context"],s:"_0._itemRendered((_1))"}}],n:50,x:{r:[".type"],s:"!_0||_0===\"item\""}}]}],n:50,x:{r:["~/",".condition","."],s:"_1===undefined||(typeof _1===\"boolean\"&&_1)||(typeof _1===\"string\"&&_0[_1])||(typeof _1===\"function\"&&_2.condition())"}}]}},
        css: function(data) { return [(function(data) {
         var primary = Object.assign({}, data('raui.primary'), data('raui.menu.primary'));
         primary.popout = Object.assign({}, data('raui.menu.popout'), data('raui.menu.primary.popout'));
         var base = "\n   .rmenu-wrapper {\n     position: relative;\n     z-index: 1;\n   }\n   .rmenu-wrapper.rmenu-vertical {\n     min-height: 100%;\n   }\n   .rmenu {\n     " + (data('raui.menu.font') ? ("font-family: " + (data('raui.menu.font')) + ";") : '') + "\n     color: " + (primary.bg || '#fff') + ";\n     background-color: " + (primary.fg || '#222') + ";\n     position: absolute;\n     top: 0;\n     bottom: 0;\n     left: 0;\n     right: 0;\n   }\n   .rmenu-wrapper.rmenu-alt > .rmenu {\n     color: " + (primary.fga || '#222') + ";\n     background-color: " + (primary.bg || '#fff') + ";\n   }\n   .rmenu-inner {\n     width: 100%;\n     height: 100%;\n     overflow-y: auto;\n   }\n   .rmenu-item {\n     border-top: 1px solid transparent;\n     border-bottom: 1px solid transparent;\n     transition: border 0.2s ease-in-out;\n   }\n   .rmenu-item:hover > .rmenu-main {\n     background-color: " + (primary.fga || '#07e') + ";\n     color: " + (primary.bg || '#fff') + ";\n   }\n   .rmenu-disabled {\n     opacity: 0.5;\n     cursor: not-allowed;\n   }\n   .rmenu-popout {\n     border: none;\n   }\n   .rmenu-expanded {\n     border-top: 0.0625em solid " + (primary.bc || '#ccc') + ";\n     border-bottom: 0.0625em solid " + (primary.bc || '#ccc') + ";\n   }\n   .rmenu-wrapper.rmenu-alt .rmenu-expanded,\n   .rmenu-wrapper.rmenu-alt .rmenu-item,\n   .rmenu-popout.rmenu-expanded {\n     border: none;\n   }\n   .rmenu-popout .rmenu-popout.rmenu-expanded {\n     background-color: " + (primary.popout.bga || primary.bg || '#fff') + ";\n     color: " + (primary.popout.fg || primary.fg || '#222') + ";\n   }\n   .rmenu-popitems {\n     height: 100%;\n     overflow-y: auto;\n   }\n   .rmenu-main {\n     width: 100%;\n     height: 100%;\n     box-sizing: border-box;\n     user-select: none;\n     transition: 0.3s ease-in-out;\n     transition-property: color, background-color;\n     display: flex;\n     align-items: center;\n     min-height: 1em;\n   }\n   .rmenu-main.rmenu-active, .rmenu-item:hover > .rmenu-main.rmenu-active {\n     color: " + (primary.fga || '#07e') + ";\n     background-color: " + (primary.bg || '#fff') + ";\n   }\n   .rmenu-popout .rmenu-entry .rmenu-main.rmenu-active, .rmenu-popout .rmenu-item:hover > .rmenu-main.rmenu-active {\n     color: " + (primary.popout.bg || primary.bg || '#fff') + ";\n     background-color: " + (primary.popout.fga || primary.fga || '#07e') + ";\n   }\n   .rmenu-wrapper.rmenu-alt .rmenu-main.rmenu.active {\n     color: " + (primary.bg || '#fff') + ";\n     background-color: " + (primary.fg || '#222') + ";\n   }\n   .rmenu-popout .rmenu-items .rmenu-item:hover > .rmenu-main,\n   .rmenu-wrapper.rmenu-alt .rmenu-popout .rmenu-item:hover > .rmenu-main {\n     background-color: " + (primary.popout.bga || '#f4f4f4') + ";\n     color: " + (primary.popout.fg || '#222') + ";\n   }\n \n   .rmenu-wrapper.rmenu-alt .rmenu-item > .rmenu-main {\n     border-bottom: " + (primary.border || 1) + "px solid " + (primary.bc || '#ccc') + ";\n   }\n \n   .rmenu-wrapper.rmenu-alt .rmenu-expanded > .rmenu-items {\n     background-color: " + (primary.bga || '#f4f4f4') + ";\n   }\n   .rmenu-wrapper.rmenu-alt .rmenu-popout > .rmenu-items {\n     background-color: " + (primary.bg || '#fff') + ";\n   }\n   .rmenu-wrapper.rmenu-alt .rmenu-expanded > .rmenu-items {\n     box-shadow: 0 0.5em 0.5em 0em rgba(0, 0, 0, 0.1) inset;\n   }\n   .rmenu-wrapper.rmenu-alt .rmenu-popout > .rmenu-items {\n     box-shadow: none;\n   }\n   .rmenu-wrapper.rmenu-alt .rmenu-item:hover > .rmenu-main {\n     color: " + (primary.fg || '#222') + ";\n     background-color: " + (primary.bg || '#fff') + ";\n   }\n   .rmenu-wrapper.rmenu-alt .rmenu-expanded .rmenu-items .rmenu-item > .rmenu-main:hover {\n     background-color: " + (primary.bc || '#ccc') + ";\n   }\n \n   .rmenu-items {\n     display: block;\n   }\n   .rmenu-right {\n     padding-right: 0.4em;  \n   }\n   .rmenu-left {\n     padding-left: 0.4em;\n   }\n   .rmenu-expand {\n     width: 2em;\n     height: 2em;\n     padding-right: 0.5em;\n     cursor: pointer;\n     position: relative;\n     display: flex;\n     align-items: center;\n     justify-content: center;\n   }\n   .rmenu-expand svg {\n     transform: rotate(0deg);\n     transition: transform 0.2s ease-in-out;\n     fill: " + (primary.bg || '#fff') + ";\n     height: 1.2em;\n     width: 1.2em;\n   }\n   .rmenu-expanded > .rmenu-main > .rmenu-expand svg {\n     transform: rotate(180deg);\n   }\n   .rmenu-popout > .rmenu-main > .rmenu-expand svg {\n     transform: rotate(-90deg);\n   }\n   .rmenu-expanded.rmenu-popout > .rmenu-main > .rmenu-expand svg {\n     transform: rotate(90deg);\n   }\n   .rmenu-popitems .rmenu-expand svg,\n   .rmenu-wrapper.rmenu-alt .rmenu-expand svg {\n     fill: " + (primary.popout.fg || '#222') + ";\n   }\n \n   .rmenu-popout > .rmenu-items {\n     position: absolute;\n     left: 0;\n     top: 0;\n     width: 100%;\n     height: 100%;\n     background-color: " + (primary.popout.bg || primary.bg || '#fff') + ";\n     color: " + (primary.popout.fg || primary.fg || '#222') + ";\n     box-sizing: border-box;\n     border-right: 1px solid " + (primary.popout.bc || primary.bc || '#ccc') + ";\n     z-index: -1;\n     transition: box-shadow 0.2s ease-in-out;\n   }\n   .rmenu-popout.rmenu-expanded > .rmenu-items {\n     left: 100%;\n     z-index: initial;\n     box-shadow: 0.2em 0 0.2em rgba(0, 0, 0, 0.2);\n   }\n   .rmenu-popout.rmenu-expanded > .rmenu-items .rmenu-popout.rmenu-expanded > .rmenu-items {\n     left: calc(100% + 1px);\n   }\n \n   .rmenu-popout > .rmenu-items.rmenu-shrink {\n     left: 100%;\n     z-index: 1;\n   }\n   .rmenu-popout.rmenu-expanded > .rmenu-items.rmenu-shrink,\n   .rmenu-popout.rmenu-expanded > .rmenu-items .rmenu-popout.rmenu-expanded > .rmenu-items.rmenu-shrink {\n     left: 0;\n   }\n \n   .rmenu-popout > .rmenu-items .rmenu-popout > .rmenu-items {\n     height: 100%;\n     width: calc(100% + 1px);\n     top: 0px;\n   }\n   .rmenu-popout > .rmenu-items .rmenu-popout > .rmenu-items.rmenu-shrink {\n     height: 100%;\n   }\n \n   .rmenu-popout-close {\n     color:  " + (primary.popout.fga || primary.fga || '#07e') + ";\n     display: block;\n     padding: 0.5em;\n     cursor: pointer;\n   }\n \n   .rmenu-title {\n     white-space: nowrap;\n     overflow: hidden;\n     text-overflow: ellipsis;\n     cursor: pointer;\n     padding: 0.5em;\n     flex-grow: 1;\n   }\n   .rmenu-disabled > .rmenu-title {\n     cursor: not-allowed;\n   }\n   .rmenu-item h1, .rmenu-item h2, .rmenu-item h3, .rmenu-item h4 {\n     margin: 0;\n   }\n \n   .rmenu-section {\n     padding: 0 0 0.75em 0;\n   }\n   .rmenu-section > .rmenu-main {\n     cursor: default;\n     font-size: 0.75em;\n     opacity: 0.7;\n     margin-bottom: 0.25em;\n   }\n   .rmenu-section > .rmenu-main .rmenu-title {\n     cursor: default;\n   }\n   .rmenu-popout .rmenu-section:first-child > .rmenu-main {\n     padding-top: 0;\n   }\n   .rmenu-popout .rmenu-section > .rmenu-main > .rmenu-title {\n     font-size: 1.5em;\n     text-align: center;\n     padding: 0.75em;\n     opacity: 1;\n     font-weight: bold;\n     color: " + (primary.popout.fg || primary.fg || '#222') + ";\n     background-color: " + (primary.popout.bga || primary.bga || '#f4f4f4') + ";\n     border-bottom: 1px solid " + (primary.popout.bc || primary.bc || '#ccc') + ";\n     border-top: 1px solid " + (primary.popout.bc || primary.bc || '#ccc') + ";\n   }\n \n   .rmenu-container {\n     box-sizing: border-box;\n   }\n \n   .rmenu-container-pad {\n     padding: 0.3em 0.3em 0.8em 0.3em;\n   }\n \n   @keyframes rmenu-marquee {\n     0% {\n       transform: translateX(0);\n     }\n     10% {\n       transform: translateX(0);\n     }\n     50% {\n       transform: translateX(calc(-100% + 18em));\n     }\n     60% {\n       transform: translateX(calc(-100% + 18em));\n     }\n     100% {\n       transform: translateX(0);\n     }\n   }\n   .rmenu-entry.marquee > .rmenu-main {\n     animation-duration: inherit;\n   }\n   .rmenu-entry.marquee > .rmenu-main > .rmenu-title {\n     transition: transform 2s linear;\n     transform: translateX(0);\n   }\n   .rmenu-entry.marquee > .rmenu-main > .rmenu-title:hover {\n     overflow: initial;\n     animation: rmenu-marquee 5s linear infinite;\n     animation-duration: inherit;\n   }\n   ";
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
        attributes: ['noExpand', 'alt'],
        use: [expand(), clickout()],
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
            var p = t.processParams(params, { duration: 200, easing: 'easeInOut' });
            var ctx = this.getContext(t.node);
            var shrink = ctx.get('.shrink');

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
                setTimeout(function () { return ctx.set('.shrink', true); });
                shrink = true;
                findParent().style.overflowX = 'hidden';
              } else if (shrink) {
                setTimeout(function () { return ctx.set('.shrink', false); });
                findParent().style.overflowX = '';
                shrink = false;
              } else {
                findParent().style.overflowX = '';
              }
            } else {
              setTimeout(function () { return ctx.set('shrink', false); });
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

      var justSpace = /^\s*$/;
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
            } else if (a.n === 'disabled') {
              if (a.f && a.f.length === 1 && a.f[0].t === 2) {
                var cnd$3 = "_cnd" + (attrs.length);
                res.disabledRef = cnd$3;
                attrs.push({ t: 13, n: cnd$3, f: a.f });
              } else if (a.f === 0) {
                res.disabled = true;
              }
            } else if ((el.e === 'item' || el.e === 'section') && a.n === 'items') {
              var cnd$4 = "_items" + (attrs.length);
              res.items = cnd$4;
              attrs.push({ t: 13, n: cnd$4, f: a.f });
            } else if (el.e === 'item' && a.n === 'marquee') {
              if (a.f && a.f.length === 1 && a.f[0].t === 2) {
                var cnd$5 = "_cnd" + (attrs.length);
                res.marqueeRef = cnd$5;
                attrs.push({ t: 13, n: cnd$5, f: a.f });
              } else if (a.f === 0) {
                res.marquee = true;
              }
            } else {
              as.push(a);
            }
          });

          if (as.length) { res.extra = { t: as }; }

          if (el.e === 'container') {
            res.contentPartial = { t: el.f };
            res.extra = as;
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
            else if (typeof e !== 'string' || !justSpace.test(e)) {
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

      var prototypeAccessors = { keypath: { configurable: true },action: { configurable: true },active: { configurable: true },disabled: { configurable: true },items: { configurable: true },ref: { configurable: true } };

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

      prototypeAccessors.disabled.get = function () {
        if (this.removed) { return; }
        return this.get('.disabled');
      };

      prototypeAccessors.disabled.set = function (v) {
        if (this.removed) { return; }
        return this.set('.disabled', v);
      };

      prototypeAccessors.items.get = function () {
          var this$1 = this;

        if (this.item.items) {
          return this.item.items.map(function (item) { return new Handle(this$1.menu, this$1, item); });
        } else {
          return [];
        }
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
          this.menu.splice(items, idx, 0, item);
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
        if (!keypath) { return this.menu.get(this.keypath); }
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

      globalRegister('RauiMenu', 'components', Menu);
      exports('default', plugin);

    }
  };
});
