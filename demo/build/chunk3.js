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
          template: {v:4,t:[{t:7,e:"div",m:[{n:"class-rshell",t:13},{t:16,r:"extra-attributes"},{n:"tracked",t:71,f:{r:[],s:"[\"outer\"]"}},{n:"class-rshell-left-popped",t:13,f:[{t:2,r:".leftPop"}]},{n:"class-rshell-right-popped",t:13,f:[{t:2,r:".rightPop"}]}],f:["\n  ",{t:7,e:"div",m:[{n:"class-rshell-sizer",t:13},{n:"tracked",t:71,f:{r:[],s:"[\"sizer\"]"}}]},"\n  ",{t:7,e:"div",m:[{n:"class-rshell-main",t:13}],f:["\n    ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rshell-top",t:13},{t:4,f:[{t:16,r:"._topA"}],n:50,r:"._topA"}],f:[{t:16,r:"._top"}]}],n:50,r:"._top"},"\n    ",{t:7,e:"div",m:[{n:"class-rshell-middle",t:13},{n:"class-rshell-has-left",t:13,f:[{t:2,x:{r:["._left","._leftOver",".leftOver"],s:"_0&&!_1&&!_2"}}]},{n:"class-rshell-has-right",t:13,f:[{t:2,x:{r:["._right","._rightOver",".rightOver"],s:"_0&&!_1&&!_2"}}]},{n:"class-rshell-left-hidden",t:13,f:[{t:2,r:".leftHidden"}]},{n:"class-rshell-right-hidden",t:13,f:[{t:2,r:".rightHidden"}]}],f:["\n      ",{t:7,e:"div",m:[{n:"class-rshell-modal",t:13},{n:"class-rshell-blocked",t:13,f:[{t:2,x:{r:[".blocked",".blockableLeft",".leftPull",".blockableRight",".rightPull"],s:"_0||(_1&&_2)||(_3&&_4)"}}]},{n:["click"],t:70,f:{r:["@this",".leftOver","._leftOver",".leftHidden",".rightOver","._rightOver",".rightHidden"],s:"[_0.set({leftHidden:_1||_2?true:_3,rightHidden:_4||_5?true:_6})]"}},{n:["swipeleft"],t:70,a:{r:[],s:"[{bind:\".leftPush\"}]"},f:{r:["@this"],s:"[_0.set(\"leftHidden\",true)]"}},{n:["swiperight"],t:70,a:{r:[],s:"[{bind:\".rightPush\"}]"},f:{r:["@this"],s:"[_0.set(\"rightHidden\",true)]"}},{t:4,f:[{n:"style-transition",f:"none",t:13},{n:"style-opacity",f:[{t:2,x:{r:[".leftPull",".rightPull"],s:"Math.min(_0||_1,100)/200"}}],t:13}],n:50,x:{r:[".leftPull",".rightPull"],s:"_0||_1"}}]},"\n",{t:4,f:["        ",{t:7,e:"div",m:[{n:"class-rshell-left",t:13},{n:"tracked",t:71,f:{r:[],s:"[\"left\"]"}},{t:4,f:[{t:16,r:"._leftA"}],n:50,r:"._leftA"},{n:["click"],t:70,f:{r:["._leftOver",".leftOver","@this"],s:"[(_0||_1)&&_2.toggle(\"leftHidden\")]"}},{n:["swipeleft"],t:70,a:{r:[],s:"[{bind:\".leftPush\"}]"},f:{r:["@this"],s:"[_0.set(\"leftHidden\",true)]"}},{t:4,f:[{n:"style-transition",f:"none",t:13},{n:"style-transform",f:["translate(-",{t:2,x:{r:[".leftPull"],s:"100-(_0>100?100:_0)"}},"%)"],t:13}],n:50,r:".leftPull"},{t:4,f:[{n:"style-transition",f:"none",t:13},{n:"style-transform",f:["translate(-",{t:2,x:{r:[".leftPush"],s:"_0>100?100:_0"}},"%)"],t:13}],n:50,r:".leftPush"}],f:[{t:16,r:"._left"}]},"\n"],n:50,r:"._left"},"      ",{t:4,f:["\n        ",{t:7,e:"div",m:[{n:"class-rshell-center",t:13},{n:"tracked",t:71,f:{r:[],s:"[\"center\"]"}},{t:4,f:[{t:16,r:"._centerA"}],n:50,r:"._centerA"},{t:4,f:[{n:["swiperight"],t:70,a:{r:[],s:"[{maxX:80,bind:\".leftPull\"}]"},f:{r:["@this"],s:"[_0.set(\"leftHidden\",false)]"}}],n:50,x:{r:["._left",".leftHidden"],s:"_0&&_1"}},{t:4,f:[{n:["swipeleft"],t:70,a:{r:[],s:"[{minX:-80,bind:\".rightPull\"}]"},f:{r:["@this"],s:"[_0.set(\"rightHidden\",false)]"}}],n:50,x:{r:["._right",".rightHidden"],s:"_0&&_1"}}],f:[{t:16,r:"._center"}]},"\n"],n:50,r:"._center"},"      ",{t:4,f:["\n        ",{t:7,e:"div",m:[{n:"class-rshell-right",t:13},{n:"tracked",t:71,f:{r:[],s:"[\"right\"]"}},{t:4,f:[{t:16,r:"._rightA"}],n:50,r:"._rightA"},{n:["click"],t:70,f:{r:["._rightOver",".rightOver","@this"],s:"[(_0||_1)&&_2.toggle(\"rightHidden\")]"}},{n:["swiperight"],t:70,a:{r:[],s:"[{bind:\".rightPush\"}]"},f:{r:["@this"],s:"[_0.set(\"rightHidden\",true)]"}},{t:4,f:[{n:"style-transition",f:"none",t:13},{n:"style-transform",f:["translate(",{t:2,x:{r:[".rightPull"],s:"100-(_0>100?100:_0)"}},"%)"],t:13}],n:50,r:".rightPull"},{t:4,f:[{n:"style-transition",f:"none",t:13},{n:"style-transform",f:["translate(",{t:2,x:{r:[".rightPush"],s:"_0>100?100:_0"}},"%)"],t:13}],n:50,r:".rightPush"}],f:[{t:16,r:"._right"}]},"\n"],n:50,r:"._right"},"    "]},"\n    ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rshell-bottom",t:13},{t:4,f:[{t:16,r:"._bottomA"}],n:50,r:"._bottomA"}],f:[{t:16,r:"._bottom"}]}],n:50,r:"._bottom"},"\n  "]},"\n  ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rshell-left-pop",t:13},{t:4,f:[{t:16,r:"._leftPopA"}],n:50,r:"._leftPopA"}],f:[{t:16,r:"._leftPop"}]}],n:50,r:"._leftPop"},"\n  ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rshell-right-pop",t:13},{t:4,f:[{t:16,r:"._rightPopA"}],n:50,r:"._rightPopA"}],f:[{t:16,r:"._rightPop"}]}],n:50,r:"._rightPop"},"\n"]}],e:{"[\"outer\"]":function (){return(["outer"]);},"[\"sizer\"]":function (){return(["sizer"]);},"_0&&!_1&&!_2":function (_0,_1,_2){return(_0&&!_1&&!_2);},"_0||(_1&&_2)||(_3&&_4)":function (_0,_1,_2,_3,_4){return(_0||(_1&&_2)||(_3&&_4));},"[_0.set({leftHidden:_1||_2?true:_3,rightHidden:_4||_5?true:_6})]":function (_0,_1,_2,_3,_4,_5,_6){return([_0.set({leftHidden:_1||_2?true:_3,rightHidden:_4||_5?true:_6})]);},"[{bind:\".leftPush\"}]":function (){return([{bind:".leftPush"}]);},"[_0.set(\"leftHidden\",true)]":function (_0){return([_0.set("leftHidden",true)]);},"[{bind:\".rightPush\"}]":function (){return([{bind:".rightPush"}]);},"[_0.set(\"rightHidden\",true)]":function (_0){return([_0.set("rightHidden",true)]);},"Math.min(_0||_1,100)/200":function (_0,_1){return(Math.min(_0||_1,100)/200);},"_0||_1":function (_0,_1){return(_0||_1);},"[\"left\"]":function (){return(["left"]);},"[(_0||_1)&&_2.toggle(\"leftHidden\")]":function (_0,_1,_2){return([(_0||_1)&&_2.toggle("leftHidden")]);},"100-(_0>100?100:_0)":function (_0){return(100-(_0>100?100:_0));},"_0>100?100:_0":function (_0){return(_0>100?100:_0);},"[\"center\"]":function (){return(["center"]);},"[{maxX:80,bind:\".leftPull\"}]":function (){return([{maxX:80,bind:".leftPull"}]);},"[_0.set(\"leftHidden\",false)]":function (_0){return([_0.set("leftHidden",false)]);},"_0&&_1":function (_0,_1){return(_0&&_1);},"[{minX:-80,bind:\".rightPull\"}]":function (){return([{minX:-80,bind:".rightPull"}]);},"[_0.set(\"rightHidden\",false)]":function (_0){return([_0.set("rightHidden",false)]);},"[\"right\"]":function (){return(["right"]);},"[(_0||_1)&&_2.toggle(\"rightHidden\")]":function (_0,_1,_2){return([(_0||_1)&&_2.toggle("rightHidden")]);}}}, css: function(data) { return [(function(data) {



        var left = data('shell.left.width') || data('menu.width') || '18em';

        var right = data('shell.right.width') || data('menu.width') || '18em';

        return ("\n\n  .rshell {\n\n    width: 100%;\n\n    height: 100%;\n\n    position: absolute;\n\n    overflow: hidden;\n\n  }\n\n  .rshell-sizer {\n\n    position: absolute;\n\n  }\n\n  .rshell-modal {\n\n    position: absolute;\n\n    top: 0;\n\n    left: 0;\n\n    bottom: 0;\n\n    right: 0;\n\n    opacity: 0;\n\n    background-color: #000;\n\n    z-index: -1;\n\n    transition: opacity 0.4s ease-in-out, z-index 0s linear 0.4s;\n\n  }\n\n  .rshell-modal.rshell-blocked {\n\n    opacity: 0.5;\n\n    z-index: 3;\n\n    transition: opacity 0.4s ease-in-out, z-index 0s linear;\n\n  }\n\n  .rshell-main {\n\n    width: 100%;\n\n    height: 100%;\n\n    box-sizing: border-box;\n\n    display: flex;\n\n    flex-direction: column;\n\n    overflow: hidden;\n\n    z-index: 1;\n\n  }\n\n\n\n  .rshell-middle {\n\n    flex-grow: 1;\n\n    position: relative;\n\n  }\n\n\n\n  .rshell-left, .rshell-right {\n\n    position: absolute;\n\n    top: 0;\n\n    box-sizing: border-box;\n\n    height: 100%;\n\n    overflow: auto;\n\n    z-index: 4;\n\n    background-color: " + (data('shell.menu.bg') || data('bg1') || 'inherit') + ";\n\n    transition: transform 0.4s ease-in-out;\n\n  }\n\n  .rshell-left {\n\n    left: 0;\n\n    width: " + left + ";\n\n  }\n\n  .rshell-right {\n\n    right: 0;\n\n    width: " + right + ";\n\n  }\n\n  .rshell-left-hidden > .rshell-left {\n\n    transform: translateX(-100%);\n\n  }\n\n  .rshell-right-hidden > .rshell-right {\n\n    transform: translateX(100%);\n\n  }\n\n  .rshell-has-right > .rshell-right,\n\n  .rshell-has-left > .rshell-left {\n\n    z-index: 2;\n\n  }\n\n  .rshell-left-popped > .rshell-main > .rshell-middle > .rshell-left,\n\n  .rshell-left-popped > .rshell-main > .rshell-middle > .rshell-right,\n\n  .rshell-right-popped > .rshell-main > .rshell-middle > .rshell-left,\n\n  .rshell-right-popped > .rshell-main > .rshell-middle > .rshell-right {\n\n    z-index: 2;\n\n  }\n\n\n\n  .rshell-left-pop, .rshell-right-pop {\n\n    z-index: 5;\n\n    transition: transform 0.4s ease-in-out;\n\n    position: absolute;\n\n    top: 0;\n\n    bottom: 0;\n\n  }\n\n  .rshell-left-pop {\n\n    transform: translateX(-100%);\n\n  }\n\n  .rshell-left-popped > .rshell-left-pop {\n\n    transform: none;\n\n  }\n\n\n\n  .rshell-right-pop {\n\n    transform: translateX(100%);\n\n    right: 0;\n\n  }\n\n  .rshell-right-popped > .rshell-right-pop {\n\n    transform: none;\n\n  }\n\n\n\n  .rshell-center {\n\n    position: absolute;\n\n    top: 0;\n\n    left: 0;\n\n    z-index: 1;\n\n    box-sizing: border-box;\n\n    transition: left 0.4s ease-in-out, width 0.4s ease-in-out;\n\n    height: 100%;\n\n    width: 100%;\n\n    flex-grow: 1;\n\n    overflow: auto;\n\n  }\n\n  .rshell-has-left > .rshell-center {\n\n    width: calc(100% - " + left + ");\n\n    left: " + left + ";\n\n  }\n\n  .rshell-has-right > .rshell-center {\n\n    width: calc(100% - " + right + ");\n\n    left: 0;\n\n  }\n\n  .rshell-has-left.rshell-has-right > .rshell-center {\n\n    width: calc(100% - " + left + " - " + right + ");\n\n    left: " + left + ";\n\n  }\n\n  .rshell-has-left.rshell-left-hidden > .rshell-center {\n\n    width: 100%;\n\n    left: 0;\n\n  }\n\n  .rshell-has-right.rshell-right-hidden > .rshell-center {\n\n    width: 100%;\n\n  }\n\n  .rshell-has-left.rshell-has-right.rshell-left-hidden > .rshell-center {\n\n    width: calc(100% - " + right + ");\n\n    left: 0;\n\n  }\n\n  .rshell-has-left.rshell-has-right.rshell-right-hidden > .rshell-center {\n\n    width: calc(100% - " + left + ");\n\n    left: " + left + ";\n\n  }\n\n  .rshell-has-left.rshell-has-right.rshell-left-hidden.rshell-right-hidden > .rshell-center {\n\n    width: 100%;\n\n    left: 0;\n\n  }\n\n  ");


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
                    this$1.fire('resize');
                    this$1._media && this$1._media.listener && this$1._media.listener.resume();
                  }, 410);
                }
              },
              defer: true,
              init: false
            }
          }
        });

        var parts = ['top', 'bottom', 'center', 'left', 'right', 'left-pop', 'right-pop'];
        var skipAttrs = ['hidden', 'primary', 'over', 'popped'];
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

              var sets = { leftHidden: r.get('leftOver'), rightHidden: r.get('rightOver'), _leftOver: false, _rightOver: false };

              var w = outer - sizes.left - sizes.right;
              if (w <= medium) {
                w += sizes[secondary];
                sets[(secondary + "Hidden")] = true;
                sets[("_" + secondary + "Over")] = true;
                if (w <= medium) {
                  sets[(primary + "Hidden")] = true;
                  sets[("_" + primary + "Over")] = true;
                }
              }

              r.set(sets);
            },
            cancel: function cancel() {
              r._media = null;
              window.removeEventListener('resize', media.fn);
              if (media.observer) { media.observer.cancel(); }
              if (media.listener) { media.listener.cancel(); }
            }
          };

          window.addEventListener('resize', media.fn);
          media.observer = r.observe('@style leftOver rightOver _leftPrimary _rightPrimary', media.fn);
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
