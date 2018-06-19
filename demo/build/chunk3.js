System.register(['ractive', './chunk1.js', './chunk2.js'], function (exports, module) {
  'use strict';
  var Ractive$1, left, right, globalRegister;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      left = module.left;
      right = module.right;
    }, function (module) {
      globalRegister = module.default;
    }],
    execute: function () {

      var Shell = (function (Ractive) {
        function Shell(opts) { Ractive.call(this, opts); }

        if ( Ractive ) Shell.__proto__ = Ractive;
        Shell.prototype = Object.create( Ractive && Ractive.prototype );
        Shell.prototype.constructor = Shell;

        Shell.prototype.adaptSize = function adaptSize (reinit) {
          if (reinit) {
            if (this._media) { this._media.cancel(); }
            initMediaListener(this);
          } else {
            this._media && this._media.fn();
          }
        };

        Shell.prototype.sizeInPx = function sizeInPx (size) {
          if (!this.sizer) { return 160; }
          this.sizer.style.width = typeof size === 'number' ? (size + "px") : size;
          return this.sizer.clientWidth;
        };

        Shell.prototype.relativeSize = function relativeSize (size, rel) {
          if ( rel === void 0 ) rel = '1em';

          if (!this.sizer) { return 10; }
          return this.sizeInPx(size) / this.sizeInPx(rel);
        };

        return Shell;
      }(Ractive$1));

      Ractive$1.extendWith(Shell, {
        template: {v:4,t:[{t:7,e:"div",m:[{t:13,n:"class",f:"rshell",g:1},{t:16,r:"extra-attributes"},{n:"tracked",t:71,f:{r:[],s:"[\"outer\"]"}},{n:"class-rshell-left-popped",t:13,f:[{t:2,r:".leftPop"}]},{n:"class-rshell-right-popped",t:13,f:[{t:2,r:".rightPop"}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rshell-sizer",g:1},{n:"tracked",t:71,f:{r:[],s:"[\"sizer\"]"}}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rshell-main",g:1}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rshell-top",g:1},{n:"class-rshell-overflow",t:13,f:[{t:2,r:"~/topOverflow"}]},{t:4,f:[{t:16,r:"._topA"}],n:50,r:"._topA"}],f:[{t:16,r:"._top"}]}],n:50,r:"._top"}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rshell-middle",g:1},{n:"class-rshell-has-left",t:13,f:[{t:2,x:{r:["._left","._leftOver",".leftOver"],s:"_0&&!_1&&!_2"}}]},{n:"class-rshell-has-right",t:13,f:[{t:2,x:{r:["._right","._rightOver",".rightOver"],s:"_0&&!_1&&!_2"}}]},{n:"class-rshell-left-hidden",t:13,f:[{t:2,r:".leftHidden"}]},{n:"class-rshell-right-hidden",t:13,f:[{t:2,r:".rightHidden"}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rshell-modal",g:1},{n:"class-rshell-blocked",t:13,f:[{t:2,x:{r:[".blocked",".blockableLeft",".leftPull",".blockableRight",".rightPull"],s:"_0||(_1&&_2)||(_3&&_4)"}}]},{n:["click"],t:70,f:{r:["@this",".leftOver","._leftOver",".leftHidden",".rightOver","._rightOver",".rightHidden"],s:"[_0.set({leftHidden:_1||_2?true:_3,rightHidden:_4||_5?true:_6})]"}},{n:["swipeleft"],t:70,a:{r:[],s:"[{bind:\".leftPush\"}]"},f:{r:["@this"],s:"[_0.set(\"leftHidden\",true)]"}},{n:["swiperight"],t:70,a:{r:[],s:"[{bind:\".rightPush\"}]"},f:{r:["@this"],s:"[_0.set(\"rightHidden\",true)]"}},{t:4,f:[{n:"style-transition",f:"none",t:13},{n:"style-opacity",f:[{t:2,x:{r:[".leftPull",".rightPull"],s:"Math.min(_0||_1,100)/200"}}],t:13}],n:50,x:{r:[".leftPull",".rightPull"],s:"_0||_1"}}]}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rshell-left",g:1},{n:"tracked",t:71,f:{r:[],s:"[\"left\"]"}},{t:4,f:[{t:16,r:"._leftA"}],n:50,r:"._leftA"},{n:["swipeleft"],t:70,a:{r:[],s:"[{bind:\".leftPush\"}]"},f:{r:["@this"],s:"[_0.set(\"leftHidden\",true)]"}},{t:4,f:[{n:"style-transition",f:"none",t:13},{n:"style-transform",f:["translate(-",{t:2,x:{r:[".leftPull"],s:"100-(_0>100?100:_0)"}},"%)"],t:13}],n:50,r:".leftPull"},{t:4,f:[{n:"style-transition",f:"none",t:13},{n:"style-transform",f:["translate(-",{t:2,x:{r:[".leftPush"],s:"_0>100?100:_0"}},"%)"],t:13}],n:50,r:".leftPush"},{n:"class-rshell-overflow",t:13,f:[{t:2,r:"~/leftOverflow"}]}],f:[{t:16,r:"._left"}]}],n:50,r:"._left"}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rshell-center",g:1},{n:"tracked",t:71,f:{r:[],s:"[\"center\"]"}},{t:4,f:[{t:16,r:"._centerA"}],n:50,r:"._centerA"},{t:4,f:[{n:["swiperight"],t:70,a:{r:[],s:"[{maxX:80,bind:\".leftPull\"}]"},f:{r:["@this"],s:"[_0.set(\"leftHidden\",false)]"}}],n:50,x:{r:["._left",".leftHidden"],s:"_0&&_1"}},{t:4,f:[{n:["swipeleft"],t:70,a:{r:[],s:"[{minX:-80,bind:\".rightPull\"}]"},f:{r:["@this"],s:"[_0.set(\"rightHidden\",false)]"}}],n:50,x:{r:["._right",".rightHidden"],s:"_0&&_1"}},{n:"class-rshell-overflow",t:13,f:[{t:2,r:"~/centerOverflow"}]}],f:[{t:16,r:"._center"}]}],n:50,r:"._center"}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rshell-right",g:1},{n:"tracked",t:71,f:{r:[],s:"[\"right\"]"}},{t:4,f:[{t:16,r:"._rightA"}],n:50,r:"._rightA"},{n:["swiperight"],t:70,a:{r:[],s:"[{bind:\".rightPush\"}]"},f:{r:["@this"],s:"[_0.set(\"rightHidden\",true)]"}},{t:4,f:[{n:"style-transition",f:"none",t:13},{n:"style-transform",f:["translate(",{t:2,x:{r:[".rightPull"],s:"100-(_0>100?100:_0)"}},"%)"],t:13}],n:50,r:".rightPull"},{t:4,f:[{n:"style-transition",f:"none",t:13},{n:"style-transform",f:["translate(",{t:2,x:{r:[".rightPush"],s:"_0>100?100:_0"}},"%)"],t:13}],n:50,r:".rightPush"},{n:"class-rshell-overflow",t:13,f:[{t:2,r:"~/rightOverflow"}]}],f:[{t:16,r:"._right"}]}],n:50,r:"._right"}]}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rshell-bottom",g:1},{t:4,f:[{t:16,r:"._bottomA"}],n:50,r:"._bottomA"},{n:"class-rshell-overflow",t:13,f:[{t:2,r:"~/bottomOverflow"}]}],f:[{t:16,r:"._bottom"}]}],n:50,r:"._bottom"}]}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rshell-left-pop",g:1},{t:4,f:[{t:16,r:"._leftPopA"}],n:50,r:"._leftPopA"}],f:[{t:16,r:"._leftPop"}]}],n:50,r:"._leftPop"}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rshell-right-pop",g:1},{t:4,f:[{t:16,r:"._rightPopA"}],n:50,r:"._rightPopA"}],f:[{t:16,r:"._rightPop"}]}],n:50,r:"._rightPop"}]}],e:{"[\"outer\"]":function (){return(["outer"]);},"[\"sizer\"]":function (){return(["sizer"]);},"_0&&!_1&&!_2":function (_0,_1,_2){return(_0&&!_1&&!_2);},"_0||(_1&&_2)||(_3&&_4)":function (_0,_1,_2,_3,_4){return(_0||(_1&&_2)||(_3&&_4));},"[_0.set({leftHidden:_1||_2?true:_3,rightHidden:_4||_5?true:_6})]":function (_0,_1,_2,_3,_4,_5,_6){return([_0.set({leftHidden:_1||_2?true:_3,rightHidden:_4||_5?true:_6})]);},"[{bind:\".leftPush\"}]":function (){return([{bind:".leftPush"}]);},"[_0.set(\"leftHidden\",true)]":function (_0){return([_0.set("leftHidden",true)]);},"[{bind:\".rightPush\"}]":function (){return([{bind:".rightPush"}]);},"[_0.set(\"rightHidden\",true)]":function (_0){return([_0.set("rightHidden",true)]);},"Math.min(_0||_1,100)/200":function (_0,_1){return(Math.min(_0||_1,100)/200);},"_0||_1":function (_0,_1){return(_0||_1);},"[\"left\"]":function (){return(["left"]);},"100-(_0>100?100:_0)":function (_0){return(100-(_0>100?100:_0));},"_0>100?100:_0":function (_0){return(_0>100?100:_0);},"[\"center\"]":function (){return(["center"]);},"[{maxX:80,bind:\".leftPull\"}]":function (){return([{maxX:80,bind:".leftPull"}]);},"[_0.set(\"leftHidden\",false)]":function (_0){return([_0.set("leftHidden",false)]);},"_0&&_1":function (_0,_1){return(_0&&_1);},"[{minX:-80,bind:\".rightPull\"}]":function (){return([{minX:-80,bind:".rightPull"}]);},"[_0.set(\"rightHidden\",false)]":function (_0){return([_0.set("rightHidden",false)]);},"[\"right\"]":function (){return(["right"]);}}}, css: function(data) { return [(function(data) {
         var left = data('raui.shell.left.width') || data('raui.menu.width') || '18em';
         var right = data('raui.shell.right.width') || data('raui.menu.width') || '18em';
         var primary = Object.assign({}, data('raui.primary'), data('raui.shell.primary'));
         return ("\n   .rshell {\n     width: 100%;\n     height: 100%;\n     position: absolute;\n     overflow: hidden;\n   }\n   .rshell-sizer {\n     position: absolute;\n   }\n   .rshell-modal {\n     position: absolute;\n     top: 0;\n     left: 0;\n     bottom: 0;\n     right: 0;\n     opacity: 0;\n     background-color: #000;\n     z-index: -1;\n     transition: opacity " + (data('raui.shell.slide.ms') || 400) + "ms ease-in-out, z-index 0s linear " + (data('raui.shell.slide.ms') || 400) + "ms;\n   }\n   .rshell-modal.rshell-blocked {\n     opacity: 0.5;\n     z-index: 3;\n     transition: opacity " + (data('raui.shell.slide.ms') || 400) + "ms ease-in-out, z-index 0s linear;\n   }\n   .rshell-main {\n     width: 100%;\n     height: 100%;\n     box-sizing: border-box;\n     display: flex;\n     flex-direction: column;\n     overflow: hidden;\n     z-index: 1;\n   }\n \n   .rshell-middle {\n     flex-grow: 1;\n     position: relative;\n   }\n \n   .rshell-left, .rshell-right {\n     position: absolute;\n     top: 0;\n     box-sizing: border-box;\n     height: 100%;\n     overflow: auto;\n     z-index: 4;\n     background-color: " + (primary.bg || 'inherit') + ";\n     transition: transform " + (data('raui.shell.slide.ms') || 400) + "ms ease-in-out;\n   }\n   .rshell-left {\n     left: 0;\n     width: " + left + ";\n   }\n   .rshell-right {\n     right: 0;\n     width: " + right + ";\n   }\n   .rshell-left-hidden > .rshell-left {\n     transform: translateX(-100%);\n   }\n   .rshell-right-hidden > .rshell-right {\n     transform: translateX(100%);\n   }\n   .rshell-has-right > .rshell-right,\n   .rshell-has-left > .rshell-left {\n     z-index: 2;\n   }\n   .rshell-left-popped > .rshell-main > .rshell-middle > .rshell-left,\n   .rshell-left-popped > .rshell-main > .rshell-middle > .rshell-right,\n   .rshell-right-popped > .rshell-main > .rshell-middle > .rshell-left,\n   .rshell-right-popped > .rshell-main > .rshell-middle > .rshell-right {\n     z-index: 2;\n   }\n \n   .rshell-left-pop, .rshell-right-pop {\n     z-index: 5;\n     transition: transform " + (data('raui.shell.slide.ms') || 400) + "ms ease-in-out;\n     position: absolute;\n     top: 0;\n     bottom: 0;\n   }\n   .rshell-left-pop {\n     transform: translateX(-100%);\n   }\n   .rshell-left-popped > .rshell-left-pop {\n     transform: none;\n   }\n \n   .rshell-right-pop {\n     transform: translateX(100%);\n     right: 0;\n   }\n   .rshell-right-popped > .rshell-right-pop {\n     transform: none;\n   }\n \n   .rshell-center {\n     position: absolute;\n     top: 0;\n     left: 0;\n     z-index: 1;\n     box-sizing: border-box;\n     transition: left " + (data('raui.shell.slide.ms') || 400) + "ms ease-in-out, width " + (data('raui.shell.slide.ms') || 400) + "ms ease-in-out;\n     height: 100%;\n     width: 100%;\n     flex-grow: 1;\n     overflow: auto;\n   }\n   .rshell-has-left > .rshell-center {\n     width: calc(100% - " + left + ");\n     left: " + left + ";\n   }\n   .rshell-has-right > .rshell-center {\n     width: calc(100% - " + right + ");\n     left: 0;\n   }\n   .rshell-has-left.rshell-has-right > .rshell-center {\n     width: calc(100% - " + left + " - " + right + ");\n     left: " + left + ";\n   }\n   .rshell-has-left.rshell-left-hidden > .rshell-center {\n     width: 100%;\n     left: 0;\n   }\n   .rshell-has-right.rshell-right-hidden > .rshell-center {\n     width: 100%;\n   }\n   .rshell-has-left.rshell-has-right.rshell-left-hidden > .rshell-center {\n     width: calc(100% - " + right + ");\n     left: 0;\n   }\n   .rshell-has-left.rshell-has-right.rshell-right-hidden > .rshell-center {\n     width: calc(100% - " + left + ");\n     left: " + left + ";\n   }\n   .rshell-has-left.rshell-has-right.rshell-left-hidden.rshell-right-hidden > .rshell-center {\n     width: 100%;\n     left: 0;\n   }\n \n   .rshell-overflow {\n     overflow: visible;\n   }\n   ");
         // TODO: other themes
      }).call(this, data)].join(' '); },
        attributes: ['adaptive'],
        use: [ left, right ],
        decorators: {
          tracked: function tracked(node, name) {
            this[name] = node;
            return { teardown: function teardown() { this[name] = undefined; } };
          }
        },
        cssId: 'rshell',
        noCssTransform: true,
        computed: {
          blockableLeft: function blockableLeft() {
            return this.get('_left') && (this.get('leftOver') || this.get('_leftOver'));
          },
          blockableRight: function blockableRight() {
            return this.get('_right') && (this.get('rightOver') || this.get('_rightOver'));
          },
          blocked: function blocked() {
            return (this.get('blockableLeft') && !(this.get('leftHidden')) || (this.get('blockableRight') && !this.get('rightHidden'))) || this.get('leftPop') || this.get('rightPop');
          }
        },
        on: {
          construct: construct,
          config: function config() {
            if (this._items) { this.set(this._items); }
          },
          init: function init() {
            var this$1 = this;

            if (this.get('@style.shell.sides.initialTimeout') && (this.get('rightOver') || this.get('leftOver'))) {
              setTimeout(function () {
                if (this$1.get('rightOver')) { this$1.set('rightHidden', true); }
                if (this$1.get('leftOver')) { this$1.set('leftHidden', true); }
              }, this.get('@style.shell.sides.initialTimeout') || 1500);
            } else {
                if (this.get('rightOver')) { this.set('rightHidden', true); }
                if (this.get('leftOver')) { this.set('leftHidden', true); }
            }
          },
          complete: function complete() {
            initMediaListener(this);
          },
          unrender: function unrender() {
            if (this._media) { this._media.cancel(); }
          }
        },
        observe: {
          'leftHidden rightHidden': {
            handler: function handler(v, o, k) {
              var this$1 = this;

              if (~k.indexOf('left') && !this.get('leftOver') && !this.get('_leftOver') || ~k.indexOf('right') && !this.get('rightOver') && !this.get('_rightOver')) {
                setTimeout(function () {
                  this$1._media && this$1._media.listener && this$1._media.listener.silence();
                  this$1._media && this$1._media.observer && this$1._media.observer.silence();
                  this$1.fire('resize');
                  this$1._media && this$1._media.listener && this$1._media.listener.resume();
                  this$1._media && this$1._media.observer && this$1._media.observer.resume();
                }, (this.get('shell.slide.ms') || 400) + 10);
              }
            },
            defer: true,
            init: false
          }
        }
      });

      var parts = ['top', 'bottom', 'center', 'left', 'right', 'left-pop', 'right-pop'];
      var skipAttrs = ['hidden', 'primary', 'over', 'popped', 'overflow', 'forced'];
      function construct() {
        var cmp = this.component;
        if ( !cmp ) { return; }

        var tpl = cmp.template.f || [];
        var attrs = cmp.template.m ? cmp.template.m.slice() : [];
        var t = cmp.template;
        cmp.template = { e: t.e, f: t.f, t: t.t, m: attrs };

        var items = {};

        tpl.forEach(function (e) {
          if (~parts.indexOf(e.e)) {
            var name = e.e === 'left-pop' ? 'leftPop' : e.e === 'right-pop' ? 'rightPop' : e.e;
            items[("_" + name)] = { t: e.f };
            if (e.m) {
              var as = e.m.filter(function (a) { return !~skipAttrs.indexOf(a.n); });

              if (as.length) {
                items[("_" + name + "A")] = { t: as };
              }

              if (as.length !== e.m.length) {
                var a = e.m.find(function (a) { return a.n === 'hidden'; });
                if (a) { attrs.push({ t: 13, n: (name + "Hidden"), f: a.f }); }
                a = e.m.find(function (a) { return a.n === 'over'; });
                if (a) { attrs.push({ t: 13, n: (name + "Over"), f: a.f }); }
                a = e.m.find(function (a) { return a.n === 'primary'; });
                if (a) { attrs.push({ t: 13, n: ("_" + name + "Primary"), f: a.f }); }
                if (~e.e.indexOf('-pop')) {
                  a = e.m.find(function (a) { return a.n === 'popped'; });
                  if (a) { attrs.push({ t: 13, n: name, f: a.f }); }
                }
                a = e.m.find(function (a) { return a.n === 'overflow'; });
                if (a) { attrs.push({ t: 13, n: (name + "Overflow"), f: a.f }); }
                a = (e.e === 'left' || e.e === 'right') && e.m.find(function (a) { return a.n === 'forced'; });
                if (a) { attrs.push({ t: 13, n: ("_" + name + "Over"), f: a.f }); }
              }
            }
          }
        });

        this._items = items;
      }

      function initMediaListener(r) {
        if (typeof window === 'undefined') { return; }
        if (!r.left && !r.right) { return; }
        if (r._media) { return r._media.fn; }
        var inited = 0;
        var tm;

        var media = {
          fn: function fn() {
            var sizes = {
              left:  !r.get('leftOver') && r.left && r.left.clientWidth || 0,
              right: !r.get('rightOver') && r.right && r.right.clientWidth || 0
            };
            if (sizes.left) { sizes.left = r.relativeSize(sizes.left); }
            if (sizes.right) { sizes.right = r.relativeSize(sizes.right); }

            var outer = r.relativeSize('100%');
            var primary = r.get('_rightPrimary') ? 'right' : 'left';
            var secondary = primary === 'right' ? 'left' : 'right';
            var medium = r.relativeSize(r.get('@style.break.medium') || '60rem', '1rem');

            var overs = { _leftOver: false, _rightOver: false };
            var hides = { leftHidden: r.get('leftOver'), rightHidden: r.get('rightOver') };

            if (!inited) {
              overs.leftHidden = false;
              overs.rightHidden = false;
            }

            var w = outer - sizes.left - sizes.right;
            if (w <= medium) {
              w += sizes[secondary];
              hides[(secondary + "Hidden")] = true;
              overs[("_" + secondary + "Over")] = true;
              if (w <= medium) {
                hides[(primary + "Hidden")] = true;
                overs[("_" + primary + "Over")] = true;
              }
            }

            r.set(overs);

            if (!inited) {
              inited = 1;
              setTimeout(function () {
                inited = 2;
                r.set(hides);
              }, r.get('@style.shell.sides.initialTimeout') || 1500);
            } else if (inited === 2) {
              r.set(hides);
            }

            if (tm) { clearTimeout(tm); }
            tm = setTimeout(function () {
              if (media.listener) { media.listener.silence(); }
              r.fire('resize');
              if (media.listener) { media.listener.resume(); }
              tm = 0;
            }, (r.get('shell.slide.ms') || 400) + 100);
          },
          cancel: function cancel() {
            r._media = null;
            window.removeEventListener('resize', media.fn);
            if (media.observer) { media.observer.cancel(); }
            if (media.listener) { media.listener.cancel(); }
          }
        };

        window.addEventListener('resize', media.fn);
        media.observer = r.observe('@style leftOver rightOver _leftPrimary _rightPrimary', media.fn, { init: false });
        if (r.get('adaptive')) { media.listener = r.root.on('*.resize', media.fn); }

        r._media = media;

        r._media.fn();
      }

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.components[opts.name || 'shell'] = Shell;
        }
      }

      globalRegister('RMShell', 'components', Shell);
      exports('default', plugin);

    }
  };
});
