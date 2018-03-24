System.register(['ractive', './chunk1.js', './chunk2.js', './chunk3.js', './chunk4.js', './chunk5.js', './Hello.ractive.html.js'], function (exports, module) {
  'use strict';
  var Ractive$1, left, right, globalRegister, Host, AppBar, Menu, style, Hello;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      left = module.left;
      right = module.right;
    }, function (module) {
      globalRegister = module.default;
      Host = module.default$1;
    }, function (module) {
      AppBar = module.default;
    }, function (module) {
      Menu = module.default;
    }, function (module) {
      style = module.style;
    }, function (module) {
      Hello = module.default;
    }],
    execute: function () {

      var Shell = (function (Ractive) {
          function Shell(opts) { Ractive.call(this, opts); }

          if ( Ractive ) Shell.__proto__ = Ractive;
          Shell.prototype = Object.create( Ractive && Ractive.prototype );
          Shell.prototype.constructor = Shell;

          return Shell;
        }(Ractive$1));

        Ractive$1.extendWith(Shell, {
          template: {v:4,t:[{t:7,e:"div",m:[{n:"class-rshell",t:13},{t:16,r:"extra-attributes"}],f:["\n  ",{t:7,e:"div",m:[{n:"class-rshell-main",t:13}],f:["\n    ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rshell-top",t:13},{t:4,f:[{t:16,r:"._topA"}],n:50,r:"._topA"}],f:[{t:16,r:"._top"}]}],n:50,r:"._top"},"\n    ",{t:7,e:"div",m:[{n:"class-rshell-has-left",t:13,f:[{t:2,x:{r:["._left","._leftOver",".leftOver"],s:"_0&&!_1&&!_2"}}]},{n:"class-rshell-has-right",t:13,f:[{t:2,x:{r:["._right","._rightOver",".rightOver"],s:"_0&&!_1&&!_2"}}]},{n:"class-rshell-left-hidden",t:13,f:[{t:2,r:".leftHidden"}]},{n:"class-rshell-right-hidden",t:13,f:[{t:2,r:".rightHidden"}]}],f:["\n      ",{t:7,e:"div",m:[{n:"class-rshell-modal",t:13},{n:"class-rshell-blocked",t:13,f:[{t:2,x:{r:[".blocked",".blockableLeft",".leftPull",".blockableRight",".rightPull"],s:"_0||(_1&&_2)||(_3&&_4)"}}]},{n:["click"],t:70,f:{r:["@this","leftOver","_leftOver","leftHidden","rightOver","_rightOver","rightHidden"],s:"[_0.set({leftHidden:_1||_2?true:_3,rightHidden:_4||_5?true:_6})]"}},{n:["swipeleft"],t:70,a:{r:[],s:"[{bind:\".leftPush\"}]"},f:{r:["@this"],s:"[_0.set(\"leftHidden\",true)]"}},{n:["swiperight"],t:70,a:{r:[],s:"[{bind:\".rightPush\"}]"},f:{r:["@this"],s:"[_0.set(\"rightHidden\",true)]"}},{t:4,f:[{n:"style-transition",f:"none",t:13},{n:"style-opacity",f:[{t:2,x:{r:[".leftPull",".rightPull"],s:"Math.min(_0||_1,100)/200"}}],t:13}],n:50,x:{r:[".leftPull",".rightPull"],s:"_0||_1"}}]},"\n",{t:4,f:["        ",{t:7,e:"div",m:[{n:"class-rshell-left",t:13},{t:4,f:[{t:16,r:"._leftA"}],n:50,r:"._leftA"},{n:["click"],t:70,f:{r:["._leftOver","leftOver","@this"],s:"[(_0||_1)&&_2.toggle(\"leftHidden\")]"}},{n:["swipeleft"],t:70,a:{r:[],s:"[{bind:\".leftPush\"}]"},f:{r:["@this"],s:"[_0.set(\"leftHidden\",true)]"}},{t:4,f:[{n:"style-transition",f:"none",t:13},{n:"style-transform",f:["translate(-",{t:2,x:{r:[".leftPull"],s:"100-(_0>100?100:_0)"}},"%)"],t:13}],n:50,r:".leftPull"},{t:4,f:[{n:"style-transition",f:"none",t:13},{n:"style-transform",f:["translate(-",{t:2,x:{r:[".leftPush"],s:"_0>100?100:_0"}},"%)"],t:13}],n:50,r:".leftPush"}],f:[{t:16,r:"._left"}]},"\n"],n:50,r:"._left"},"      ",{t:4,f:["\n        ",{t:7,e:"div",m:[{n:"class-rshell-center",t:13},{t:4,f:[{t:16,r:"._centerA"}],n:50,r:"._centerA"},{t:4,f:[{n:["swiperight"],t:70,a:{r:[],s:"[{maxX:80,bind:\".leftPull\"}]"},f:{r:["@this"],s:"[_0.set(\"leftHidden\",false)]"}}],n:50,x:{r:["._left",".leftHidden"],s:"_0&&_1"}},{t:4,f:[{n:["swipeleft"],t:70,a:{r:[],s:"[{minX:-80,bind:\".rightPull\"}]"},f:{r:["@this"],s:"[_0.set(\"rightHidden\",false)]"}}],n:50,x:{r:["._right",".rightHidden"],s:"_0&&_1"}}],f:[{t:16,r:"._center"}]},"\n"],n:50,r:"._center"},"      ",{t:4,f:["\n        ",{t:7,e:"div",m:[{n:"class-rshell-right",t:13},{t:4,f:[{t:16,r:"._rightA"}],n:50,r:"._rightA"},{n:["click"],t:70,f:{r:["._rightOver",".rightOver","@this"],s:"[(_0||_1)&&_2.toggle(\"rightHidden\")]"}},{n:["swiperight"],t:70,a:{r:[],s:"[{bind:\".rightPush\"}]"},f:{r:["@this"],s:"[_0.set(\"rightHidden\",true)]"}},{t:4,f:[{n:"style-transition",f:"none",t:13},{n:"style-transform",f:["translate(",{t:2,x:{r:[".rightPull"],s:"100-(_0>100?100:_0)"}},"%)"],t:13}],n:50,r:".rightPull"},{t:4,f:[{n:"style-transition",f:"none",t:13},{n:"style-transform",f:["translate(",{t:2,x:{r:[".rightPush"],s:"_0>100?100:_0"}},"%)"],t:13}],n:50,r:".rightPush"}],f:[{t:16,r:"._right"}]},"\n"],n:50,r:"._right"},"    "]},"\n    ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rshell-bottom",t:13},{t:4,f:[{t:16,r:"._bottomA"}],n:50,r:"._bottomA"}],f:[{t:16,r:"._bottom"}]}],n:50,r:"._bottom"},"\n  "]},"\n  ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rshell-left-pop",t:13},{t:4,f:[{t:16,r:"._leftPA"}],n:50,r:"._leftPA"}],f:[{t:16,r:"._leftP"}]}],n:50,r:"._leftP"},"\n  ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rshell-right-pop",t:13},{t:4,f:[{t:16,r:"._rightPA"}],n:50,r:"._rightPA"}],f:[{t:16,r:"._rightP"}]}],n:50,r:"._rightP"},"\n"]}],e:{"_0&&!_1&&!_2":function (_0,_1,_2){return(_0&&!_1&&!_2);},"_0||(_1&&_2)||(_3&&_4)":function (_0,_1,_2,_3,_4){return(_0||(_1&&_2)||(_3&&_4));},"[_0.set({leftHidden:_1||_2?true:_3,rightHidden:_4||_5?true:_6})]":function (_0,_1,_2,_3,_4,_5,_6){return([_0.set({leftHidden:_1||_2?true:_3,rightHidden:_4||_5?true:_6})]);},"[{bind:\".leftPush\"}]":function (){return([{bind:".leftPush"}]);},"[_0.set(\"leftHidden\",true)]":function (_0){return([_0.set("leftHidden",true)]);},"[{bind:\".rightPush\"}]":function (){return([{bind:".rightPush"}]);},"[_0.set(\"rightHidden\",true)]":function (_0){return([_0.set("rightHidden",true)]);},"Math.min(_0||_1,100)/200":function (_0,_1){return(Math.min(_0||_1,100)/200);},"_0||_1":function (_0,_1){return(_0||_1);},"[(_0||_1)&&_2.toggle(\"leftHidden\")]":function (_0,_1,_2){return([(_0||_1)&&_2.toggle("leftHidden")]);},"100-(_0>100?100:_0)":function (_0){return(100-(_0>100?100:_0));},"_0>100?100:_0":function (_0){return(_0>100?100:_0);},"[{maxX:80,bind:\".leftPull\"}]":function (){return([{maxX:80,bind:".leftPull"}]);},"[_0.set(\"leftHidden\",false)]":function (_0){return([_0.set("leftHidden",false)]);},"_0&&_1":function (_0,_1){return(_0&&_1);},"[{minX:-80,bind:\".rightPull\"}]":function (){return([{minX:-80,bind:".rightPull"}]);},"[_0.set(\"rightHidden\",false)]":function (_0){return([_0.set("rightHidden",false)]);},"[(_0||_1)&&_2.toggle(\"rightHidden\")]":function (_0,_1,_2){return([(_0||_1)&&_2.toggle("rightHidden")]);}}},
          attributes: [],
          use: [ left, right ],
          css: function(data) { return [(function(data) {



        var left = data('shell.left.width') || data('menu.width') || '18em';

        var right = data('shell.right.width') || data('menu.width') || '18em';

        return ("\n\n  .rshell {\n\n    width: 100%;\n\n    height: 100%;\n\n    position: absolute;\n\n    overflow: hidden;\n\n  }\n\n  .rshell-modal {\n\n    position: absolute;\n\n    top: 0;\n\n    left: 0;\n\n    bottom: 0;\n\n    right: 0;\n\n    opacity: 0;\n\n    background-color: #000;\n\n    z-index: -1;\n\n    transition: opacity 0.4s ease-in-out, z-index 0s linear 0.4s;\n\n  }\n\n  .rshell-modal.rshell-blocked {\n\n    opacity: 0.5;\n\n    z-index: 3;\n\n    transition: opacity 0.4s ease-in-out, z-index 0s linear;\n\n  }\n\n  .rshell-main {\n\n    width: 100%;\n\n    height: 100%;\n\n    box-sizing: border-box;\n\n    display: flex;\n\n    overflow: hidden;\n\n    z-index: 1;\n\n  }\n\n\n\n  .rshell-left, .rshell-right {\n\n    position: absolute;\n\n    top: 0;\n\n    box-sizing: border-box;\n\n    height: 100%;\n\n    overflow: auto;\n\n    z-index: 4;\n\n    background-color: " + (data('shell.menu.bg') || data('bg1') || 'inherit') + ";\n\n    transition: transform 0.4s ease-in-out;\n\n  }\n\n  .rshell-left {\n\n    left: 0;\n\n    width: " + left + ";\n\n  }\n\n  .rshell-right {\n\n    right: 0;\n\n    width: " + right + ";\n\n  }\n\n  .rshell-left-hidden > .rshell-left {\n\n    transform: translateX(-100%);\n\n  }\n\n  .rshell-right-hidden > .rshell-right {\n\n    transform: translateX(100%);\n\n  }\n\n  .rshell-has-right > .rshell-right,\n\n  .rshell-has-left > .rshell-left {\n\n    z-index: 2;\n\n  }\n\n\n\n  .rshell-center {\n\n    position: absolute;\n\n    top: 0;\n\n    left: 0;\n\n    z-index: 1;\n\n    box-sizing: border-box;\n\n    transition: left 0.4s ease-in-out, width 0.4s ease-in-out;\n\n    height: 100%;\n\n    width: 100%;\n\n    overflow: auto;\n\n  }\n\n  .rshell-has-left > .rshell-center {\n\n    width: calc(100% - " + left + ");\n\n    left: " + left + ";\n\n  }\n\n  .rshell-has-right > .rshell-center {\n\n    width: calc(100% - " + right + ");\n\n    left: 0;\n\n  }\n\n  .rshell-has-left.rshell-has-right > .rshell-center {\n\n    width: calc(100% - " + left + " - " + right + ");\n\n    left: " + left + ";\n\n  }\n\n  .rshell-has-left.rshell-left-hidden > .rshell-center {\n\n    width: 100%;\n\n    left: 0;\n\n  }\n\n  .rshell-has-right.rshell-right-hidden > .rshell-center {\n\n    width: 100%;\n\n  }\n\n  .rshell-has-left.rshell-has-right.rshell-left-hidden > .rshell-center {\n\n    width: calc(100% - " + right + ");\n\n    left: 0;\n\n  }\n\n  .rshell-has-left.rshell-has-right.rshell-right-hidden > .rshell-center {\n\n    width: calc(100% - " + left + ");\n\n    left: " + left + ";\n\n  }\n\n  .rshell-has-left.rshell-has-right.rshell-left-hidden.rshell-right-hidden > .rshell-center {\n\n    width: 100%;\n\n    left: 0;\n\n  }\n\n  ");


      }).call(this, data)].join(' '); },
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
              return (this.get('blockableLeft') && !(this.get('leftHidden')) || (this.get('blockableRight') && !this.get('rightHidden')));
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
            }
          },
          observe: {
            '@style': function _style(v) {
              initMediaListener(this);
            },
            'leftHidden rightHidden': {
              handler: function handler() {
                var this$1 = this;

                setTimeout(function () { return this$1.fire('resize'); }, 410);
              },
              defer: true,
              init: false
            }
          }
        });

        var parts = ['top', 'bottom', 'center', 'left', 'right', 'leftP', 'rightP'];
        var skipAttrs = ['hidden', 'primary', 'over'];
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
              items[("_" + (e.e))] = { t: e.f };
              if (e.m) {
                var as = e.m.filter(function (a) { return !~skipAttrs.indexOf(a.n); });

                if (as.length) {
                  items[("_" + (e.e) + "A")] = { t: as };
                }

                if (as.length !== e.m.length) {
                  var a = e.m.find(function (a) { return a.n === 'hidden'; });
                  if (a) { attrs.push({ t: 13, n: ((e.e) + "Hidden"), f: a.f }); }
                  a = e.m.find(function (a) { return a.n === 'over'; });
                  if (a) { attrs.push({ t: 13, n: ((e.e) + "Over"), f: a.f }); }
                  a = e.m.find(function (a) { return a.n === 'primary'; });
                  if (a) { attrs.push({ t: 13, n: ("_" + (e.e) + "Primary"), f: a.f }); }
                }
              }
            }
          });

          this._items = items;
        }

        function initMediaListener(r) {
          if (typeof window === 'undefined') { return; }

          var left = r.get('@style.shell.left.width') || r.get('@style.menu.width') || '18em';
          var right = r.get('@style.shell.right.width') || r.get('@style.menu.width') || '18em';
          var hasLeft = r.get('_left') && !r.get('leftOver');
          var hasRight = r.get('_right') && !r.get('rightOver');
          var prim = (!hasLeft || r.get('_rightPrimary')) ? 'r' : 'l';
          var hasPrimary = hasLeft || hasRight;
          var hasSecondary = hasLeft && hasRight;
          var medium = r.get('@style.break.medium') || '960px';

          if (!hasPrimary) { return; }

          if (r._media) {
            r._media.cancel();
          }

          var media = {};
          r._media = media;

          var div = document.createElement('div');
          document.body.appendChild(div);
          div.style.width = "calc((" + medium + " + " + (prim === 'l' ? left : right) + ") - 1px)";
          var style = getComputedStyle(div);
          var primary = window.matchMedia(("(max-width: " + (style.width) + ")"));
          if (hasSecondary) {
            div.style.width = "calc(((" + medium + " + " + (prim === 'l' ? left : right) + ")" + (hasSecondary ? (" + " + (prim === 'l' ? right : left)) : '') + ") - 1px)";
          }
          var secondary = hasSecondary && window.matchMedia(("(max-width: " + (style.width) + ")"));
          document.body.removeChild(div);

          function matcher() {
            var left = !hasLeft ? true : prim === 'l' ? primary.matches : secondary ? secondary.matches : false;
            var right = !hasRight ? true : prim === 'r' ? primary.matches : secondary ? secondary.matches : false;
            r.set({
              leftHidden: left,
              rightHidden: right,
              _leftOver: left,
              _rightOver: right
            });
          }

          primary.addListener(matcher);
          secondary && secondary.addListener(matcher);

          media.cancel = function() {
            r._media = null;
            primary.removeListener(matcher);
            secondary && secondary.removeListener(matcher);
          };

          matcher();
        }

        function plugin(opts) {
          if ( opts === void 0 ) opts = {};

          return function(ref) {
            var instance = ref.instance;

            instance.components[opts.name || 'shell'] = Shell;
          }
        }

        globalRegister('RMShell', 'components', Shell);

      Ractive.styleSet('window.maxFrom', '60em');

        var App = Ractive.extend({
          template: {v:4,t:[{t:7,e:"shell",f:["\n  ",{t:7,e:"left",m:[{n:"hidden",t:13,f:[{t:2,r:"menu.hidden"}]}],f:["\n    ",{t:7,e:"menu",f:["\n      ",{t:7,e:"container",m:[{n:"pad",f:0,t:13},{n:"class-logo",t:13}],f:[{t:7,e:"h1",m:[{n:"style-text-align",f:"center",t:13}],f:[{t:7,e:"img",m:[{n:"src",f:"./raui.svg",t:13},{n:"alt",f:"raui logo",t:13}]},"RaUI"]}]},"\n      ",{t:7,e:"item",m:[{n:"ref",f:"Hello",t:13}],f:["\n        ",{t:7,e:"h3",f:["Welcome"]},"\n        ",{t:7,e:"right",f:["\n            ",{t:7,e:"a",m:[{n:"href",f:"https://github.com/evs-chris/raui",t:13},{n:"target",f:"_blank",t:13}],f:[{t:7,e:"svg",m:[{n:"aria-labelledby",f:"simpleicons-github-icon",t:13},{n:"role",f:"img",t:13},{n:"viewBox",f:"0 0 24 24",t:13},{n:"xmlns",f:"http://www.w3.org/2000/svg",t:13},{n:"id",f:"gh",t:13}],f:[{t:7,e:"title",m:[{n:"id",f:"simpleicons-github-icon",t:13}],f:["Browse code on GitHub"]},{t:7,e:"path",m:[{n:"d",f:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",t:13}]}]}]},"\n        "]},"\n      "]},"\n      ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Components"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"AppBar",t:13}],f:["AppBar"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"Card",t:13}],f:["Card"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"JSONEditor",t:13}],f:["JSON Editor"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"Menu",t:13}],f:["Menu"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"Shell",t:13}],f:["Shell"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"Split",t:13}],f:["Split"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"Table",t:13}],f:["Table"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"Tabs",t:13}],f:["Tabs"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"Toggle",t:13}],f:["Toggle"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"Window",t:13}],f:["Window"]},"\n      "]},"\n      ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Decorators"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"AceEditor",t:13}],f:["Ace Editor"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"CodeMirror",t:13}],f:["CodeMirror"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"Form",t:13}],f:["Form"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"Grid",t:13}],f:["Grid"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"Marked",t:13}],f:["Marked"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"MaskedInput",t:13}],f:["Masked Input"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"ScrollSpy",t:13}],f:["Scroll Spy"]},"\n      "]},"\n      ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Events"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"Click",t:13}],f:["Click"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"Keys",t:13}],f:["Keys"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"Swipe",t:13}],f:["Swipe"]},"\n      "]},"\n      ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Transitions"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"Expand",t:13}],f:["Expand"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"Fade",t:13}],f:["Fade"]},"\n      "]},"\n      ",{t:7,e:"item",m:[{n:"open",f:0,t:13}],f:[{t:7,e:"h3",f:["Helpers"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"Button",t:13}],f:["Button"]},"\n        ",{t:7,e:"item",m:[{n:"ref",f:"Toast",t:13}],f:["Toast"]},"\n      "]},"\n    "]},"\n  "]},"\n  ",{t:7,e:"center",m:[{n:"class-app-center",t:13}],f:["\n",{t:4,f:["      ",{t:7,e:"app-bar",f:["\n        ",{t:7,e:"left",f:[{t:7,e:"div",m:[{n:"class-hamburger",t:13},{n:["click"],t:70,f:{r:["@this"],s:"[_0.toggle(\"menu.hidden\")]"}}],f:["☰"]}]},"\n      "]},"\n"],n:51,r:"win.max"},"    ",{t:7,e:"host",m:[{n:"windows",t:13,f:[{t:2,r:"windows"}]},{n:"placement",f:"smart",t:13}],f:["\n      ",{t:7,e:"max-top",f:["\n        ",{t:7,e:"app-bar",f:["\n          ",{t:7,e:"left",f:[{t:7,e:"div",m:[{n:"class-hamburger",t:13},{n:["click"],t:70,f:{r:["@this"],s:"[_0.toggle(\"menu.hidden\")]"}}],f:["☰"]}]},"\n          ",{t:7,e:"center",f:[{t:2,r:"window.title"}]},"\n          ",{t:7,e:"right",f:[{t:8,r:"windowControls"}]},"\n        "]},"\n      "]},"\n    "]},"\n  "]},"\n"]}],e:{"[_0.toggle(\"menu.hidden\")]":function (_0){return([_0.toggle("menu.hidden")]);}}},
          use: [AppBar(), Host(), Menu(), plugin()],
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
          css: function(data) { return [" body { overscroll-behavior-y: contain; } p { text-indent: 1em; } pre { white-space: pre-wrap; } .hamburger { cursor: pointer; user-select: none; margin: -1em; padding: 1em; } .logo { background-color: #f9f9f9; color: #222; border-style: solid; border-width: 1px; box-sizing: border-box; } .logo img { width: 50px; margin-right: 0.5em; margin-left: calc(-0.5em - 50px); vertical-align: middle; } svg#gh { fill: #fff; transition: fill 0.3s ease-in-out; position: relative; width: 1.5em; height: 1.5em; top: 0.2em; } .rmenu-active svg#gh { fill: #07e; } ", (function(data) {



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
          template: {v:4,t:[{t:7,e:"div",m:[{n:"class-rtabs",t:13},{t:16,r:"extra-attributes"},{n:"class-rtabs-flat",t:13,f:[{t:2,r:"~/flat"}]},{n:"class-rtabs-margin",t:13,f:[{t:2,r:"~/margin"}]},{n:"class-rtabs-fill",t:13,f:[{t:2,r:"~/fill"}]}],f:["\n  ",{t:7,e:"div",m:[{n:"class-rtabs-tab-window",t:13},{t:4,f:[{n:"class-rtabs-going-left",t:13}],n:50,x:{r:[".direction"],s:"_0===\"left\""}},{t:4,f:[{n:"class-rtabs-going-right",t:13}],n:51,l:1}],f:["\n    ",{t:7,e:"div",m:[{n:"class-rtabs-tabs",t:13}],f:["\n      ",{t:7,e:"div",m:[{n:"class-rtabs-left",t:13},{n:"class-rtabs-center",t:13,f:[{t:2,r:"~/center"}]}],f:["\n        ",{t:4,f:[{t:4,f:[{t:8,r:"tab"}],n:51,r:".right"}],n:52,r:".tabs"},"\n      "]},"\n      ",{t:7,e:"div",m:[{n:"class-rtabs-right",t:13}],f:["\n        ",{t:4,f:[{t:4,f:[{t:8,r:"tab"}],n:50,r:".right"}],n:52,r:".tabs"},"\n      "]},"\n      ",{t:7,e:"div",m:[{n:"class-rtabs-indicator",t:13},{n:"style-left",f:[{t:2,r:".selectedLeft"},"px"],t:13},{t:4,f:[{n:"style-right",f:[{t:2,r:".selectedRight"},"px"],t:13}],n:50,x:{r:[".selectedRight"],s:"_0!==undefined"}}]},"\n      "]},"\n  "]},"\n  ",{t:7,e:"div",m:[{n:"class-rtabs-content-wrapper",t:13}],f:["\n    ",{t:7,e:"div",m:[{n:"class-rtabs-content-window",t:13},{t:4,f:[{n:"class-rtabs-trans-fade",t:13}],n:50,x:{r:[".transition"],s:"_0===\"fade\""}},{t:4,f:[{n:"class-rtabs-trans-slide",t:13}],n:50,x:{r:[".transition"],s:"_0===\"slide\""},l:1}],f:["\n      ",{t:7,e:"div",m:[{n:"class-rtabs-contents",t:13},{n:"style-opacity",f:[{t:2,r:"~/opacity"}],t:13},{n:"style-left",f:[{t:2,x:{r:[".selectedContent"],s:"_0*-100"}},"%"],t:13},{n:"class-rtabs-pad",t:13,f:[{t:2,r:"~/pad"}]}],f:[{t:4,f:[{t:8,r:"tab-content"}],n:52,r:".tabs"}]},"\n    "]},"\n  "]},"\n"]}],e:{"_0===\"left\"":function (_0){return(_0==="left");},"_0!==undefined":function (_0){return(_0!==undefined);},"_0===\"fade\"":function (_0){return(_0==="fade");},"_0===\"slide\"":function (_0){return(_0==="slide");},"_0*-100":function (_0){return(_0*-100);},"_0===_1":function (_0,_1){return(_0===_1);},"_0===\"dynamic\"":function (_0){return(_0==="dynamic");},"_0!==_1":function (_0,_1){return(_0!==_1);},"_0===false":function (_0){return(_0===false);},"[_0.checkSelection((_1),_2)]":function (_0,_1,_2){return([_0.checkSelection((_1),_2)]);},"!_0":function (_0){return(!_0);},"_0===_1&&!_2":function (_0,_1,_2){return(_0===_1&&!_2);},"typeof _1===\"string\"?_0[_1]:_1":function (_0,_1){return(typeof _1==="string"?_0[_1]:_1);},"[[\"select\",_0]]":function (_0){return([["select",_0]]);},"[_0]":function (_0){return([_0]);},"typeof _0===\"string\"":function (_0){return(typeof _0==="string");},"[[\"close\",_0]]":function (_0){return([["close",_0]]);},"_0&&!_1":function (_0,_1){return(_0&&!_1);}},p:{"tab-content":[{t:4,f:[{t:7,e:"div",m:[{n:"class-rtabs-tab-content",t:13},{n:"class-rtabs-selected-content",t:13,f:[{t:2,x:{r:["~/selectedContent","@index"],s:"_0===_1"}}]},{n:"class-rtabs-dyna",t:13,f:[{t:2,x:{r:["~/height"],s:"_0===\"dynamic\""}}]},{n:"class-rtabs-not-selected",t:13,f:[{t:2,x:{r:["~/selectedContent","@index"],s:"_0!==_1"}}]},{t:4,f:[{t:16,r:".extra"}],n:50,r:".extra"},{t:4,f:[{n:"class-rtabs-no-pad",t:13}],n:50,x:{r:[".pad"],s:"_0===false"}},{t:4,f:[{n:"class-rtabs-no-pad",t:13,f:[{t:2,rx:{r:"~/",m:[{t:30,n:".padRef"}]}}]}],n:50,r:".padRef",l:1},{n:["focus"],t:70,f:{r:["@this","@context","@index"],s:"[_0.checkSelection((_1),_2)]"}}],f:["\n      ",{t:16,r:".template"},"\n    "]}],n:50,x:{r:[".button"],s:"!_0"}},{t:4,f:[{t:7,e:"div",m:[{n:"class-rtabs-placeholder",t:13}]}],n:51,l:1}],tab:["\n  ",{t:7,e:"div",m:[{n:"class-rtabs-tab",t:13},{n:"class-rtabs-selected",t:13,f:[{t:2,x:{r:["~/selected","@index",".button"],s:"_0===_1&&!_2"}}]},{t:4,f:[{n:"class-rtabs-disabled",t:13}],n:50,x:{r:["~/",".disabled"],s:"typeof _1===\"string\"?_0[_1]:_1"}},{t:4,f:[{n:["click"],t:70,f:{r:["@index"],s:"[[\"select\",_0]]"}}],n:50,x:{r:[".button"],s:"!_0"},l:1},{n:"registered",t:71,f:{r:["@index"],s:"[_0]"}},{t:4,f:[{t:16,r:".extraTab"}],n:50,r:".extraTab"}],f:["\n    ",{t:4,f:[{t:2,r:"title"}],n:50,x:{r:[".title"],s:"typeof _0===\"string\""}},{t:4,f:[{t:16,r:".title"}],n:50,r:".title",l:1},"\n    ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rtabs-close",t:13},{n:["click"],t:70,f:{r:["@index"],s:"[[\"close\",_0]]"}}],f:["×"]}],n:50,x:{r:[".closable",".button"],s:"_0&&!_1"}},"\n  "]},"\n"]}},
          cssId: 'rtab',
          noCssTransform: true,
          css: function(data) { return [(function(data) {



        return ("\n\n  .rtabs {\n\n    position: relative;\n\n    display: flex;\n\n    flex-direction: column;\n\n    width: 100%;\n\n  }\n\n\n\n  .rtabs-tab-window {\n\n    overflow-y: hidden;\n\n    overflow-x: auto;\n\n    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n\n      0 1px 5px 0 rgba(0, 0, 0, 0.12),\n\n      0 3px 1px -2px rgba(0, 0, 0, 0.2);\n\n    color: " + (data('tabs.tab.fg') || data('fg1') || '#222') + ";\n\n    background-color: " + (data('tabs.tab.bg') || data('bg1') || '#fff') + ";\n\n    position: relative;\n\n    flex-shrink: 0;\n\n  }\n\n  .secondary > .rtabs-tab-window {\n\n    color: " + (data('fg2') || '#fff') + ";\n\n    background-color: " + (data('bg2') || '#07e') + ";\n\n  }\n\n  .alt1 > .rtabs-tab-window {\n\n    color: " + (data('alt1.fg1') || '#222') + ";\n\n    background-color: " + (data('alt1.bg1') || '#fff') + ";\n\n  }\n\n  .alt1.secondary > .rtabs-tab-window {\n\n    color: " + (data('alt1.fg2') || '#222') + ";\n\n    background-color: " + (data('alt1.bg2') || '#fff') + ";\n\n  }\n\n  .alt2 > .rtabs-tab-window {\n\n    color: " + (data('alt2.fg1') || '#222') + ";\n\n    background-color: " + (data('alt2.bg1') || '#fff') + ";\n\n  }\n\n  .alt2.secondary > .rtabs-tab-window {\n\n    color: " + (data('alt2.fg2') || '#222') + ";\n\n    background-color: " + (data('alt2.bg2') || '#fff') + ";\n\n  }\n\n\n\n  .rtabs-flat > .rtabs-tab-window {\n\n    box-shadow: none;\n\n  }\n\n  .rtabs-flat > .rtabs-tab-window:after {\n\n    content: '';\n\n    height: 0.15em;\n\n    position: absolute;\n\n    bottom: 0px;\n\n    width: 100%;\n\n    display: block;\n\n    background-color: " + (data('tabs.tab.fg') || data('bga1') || '#ccc') + ";\n\n  }\n\n  .rtabs-flat.secondary > .rtabs-tab-window:after {\n\n    background-color: " + (data('tabs.tab.fg') || data('bga2') || '#07e') + ";\n\n  }\n\n  .rtabs-flat.alt1 > .rtabs-tab-window:after {\n\n    background-color: " + (data('alt1.bga1') || '#222') + ";\n\n  }\n\n  .rtabs-flat.alt1.secondary > .rtabs-tab-window:after {\n\n    background-color: " + (data('alt1.bga2') || '#222') + ";\n\n  }\n\n  .rtabs-flat.alt2 > .rtabs-tab-window:after {\n\n    background-color: " + (data('alt2.bga1') || '#222') + ";\n\n  }\n\n  .rtabs-flat.alt2.secondary > .rtabs-tab-window:after {\n\n    background-color: " + (data('alt2.bga2') || '#222') + ";\n\n  }\n\n\n\n  .rtabs-center.rtabs-left {\n\n    text-align: center;\n\n  }\n\n\n\n  .rtabs-pad {\n\n    padding: 1em;\n\n  }\n\n\n\n  .rtabs-fill {\n\n    flex-grow: 1;\n\n  }\n\n\n\n  .rtabs-tabs {\n\n    display: table;\n\n    position: relative;\n\n    min-width: 100%;\n\n    overflow-x: auto;\n\n    overflow-y: hidden;\n\n    white-space: nowrap;\n\n  }\n\n\n\n  .rtabs-tab {\n\n    display: inline-block;\n\n    box-sizing: border-box;\n\n    padding: 0.5em 1em;\n\n    height: 2.5em;\n\n    cursor: pointer;\n\n    opacity: 0.9;\n\n    transition: opacity 0.2s ease-in-out;\n\n    user-select: none;\n\n  }\n\n  .rtabs-tab:hover {\n\n    opacity: 1;\n\n  }\n\n\n\n  .rtabs-selected {\n\n    opacity: 1;\n\n  }\n\n\n\n  .rtabs-disabled {\n\n    opacity: 0.4;\n\n  }\n\n\n\n  .rtabs-right {\n\n    text-align: right;\n\n    display: table-cell;\n\n  }\n\n\n\n  .rtabs-left {\n\n    text-align: left;\n\n    display: table-cell;\n\n  }\n\n\n\n  .rtabs-close {\n\n    display: inline-block;\n\n    margin-right: -0.5em;\n\n    font-weight: 700;\n\n    opacity: 0.3;\n\n    transition: opacity: 0.2s ease-in-out;\n\n  }\n\n\n\n  .rtabs-close:hover {\n\n    opacity: 1;\n\n  }\n\n\n\n  .rtabs-indicator {\n\n    position: absolute;\n\n    bottom: 0;\n\n    height: 0.15em;\n\n    background-color: " + (data('tabs.indicator.color') || data('fga1') || '#07e') + ";\n\n    z-index: 2;\n\n  }\n\n\n\n  .secondary > .rtabs-tab-window .rtabs-indicator {\n\n    background-color: " + (data('fga2') || '#fff') + ";\n\n  }\n\n  .alt1 > .rtabs-tab-window .rtabs-indicator {\n\n    background-color: " + (data('alt1.fga1') || 'darkblue') + ";\n\n  }\n\n  .alt1.secondary > .rtabs-tab-window .rtabs-indicator {\n\n    background-color: " + (data('alt1.fga2') || 'darkblue') + ";\n\n  }\n\n  .alt2 > .rtabs-tab-window .rtabs-indicator {\n\n    background-color: " + (data('alt2.fga1') || 'darkblue') + ";\n\n  }\n\n  .alt2.secondary > .rtabs-tab-window .rtabs-indicator {\n\n    background-color: " + (data('alt2.fga2') || 'darkblue') + ";\n\n  }\n\n\n\n  .rtabs-going-left .rtabs-indicator {\n\n    transition: left 0.2s ease-in-out, right 0.2s ease-in-out 0.1s;\n\n  }\n\n  .rtabs-going-right .rtabs-indicator {\n\n    transition: left 0.2s ease-in-out 0.1s, right 0.2s ease-in-out;\n\n  }\n\n\n\n  .rtabs-content-wrapper {\n\n    width: 100%;\n\n    box-sizing: border-box;\n\n    display: flex;\n\n    flex-direction: column;\n\n    flex-grow: 2;\n\n    overflow: hidden;\n\n  }\n\n\n\n  .rtabs-content-window {\n\n    width: 100%;\n\n    display: flex;\n\n    flex-grow: 1;\n\n    overflow-y: auto;\n\n    overflow-x: hidden\n\n  }\n\n\n\n  .rtabs {\n\n    color: " + (data('tabs.content.fg') || data('fg1') || '#222') + ";\n\n    background-color: " + (data('tabs.content.bg') || data('bg1') || '#fff') + ";\n\n  }\n\n  .rtabs.alt1 {\n\n    color: " + (data('alt1.fg1') || '#222') + ";\n\n    background-color: " + (data('alt1.bg1') || '#fff') + ";\n\n  }\n\n  rtabs.alt2 {\n\n    color: " + (data('alt2.fg1') || '#222') + ";\n\n    background-color: " + (data('alt2.bg1') || '#fff') + ";\n\n  }\n\n\n\n  .rtabs-contents {\n\n    list-style: none;\n\n    padding: 0;\n\n    margin: 0;\n\n    position: relative;\n\n    left: 0;\n\n    display: block;\n\n    flex-wrap: nowrap;\n\n    white-space: nowrap;\n\n    width: 100%;\n\n  }\n\n  .rtabs-trans-slide > .rtabs-contents {\n\n    transition: left 0.2s ease-in-out;\n\n  }\n\n  .rtabs-trans-fade > .rtabs-contents {\n\n    transition: opacity 0.15s ease;\n\n    opacity: 1;\n\n    white-space: nowrap;\n\n  }\n\n\n\n  .rtabs-fill > div > div > .rtabs-contents {\n\n    display: flex;\n\n  }\n\n\n\n  .rtabs-tab-content {\n\n    display: inline-block;\n\n    width: 100%;\n\n    vertical-align: top;\n\n    white-space: initial;\n\n    transition: opacity 0.1s ease-in-out;\n\n    flex-shrink: 0;\n\n    white-space: initial;\n\n    display: inline-block;\n\n    flex-direction: column;\n\n    flex-grow: 1;\n\n  }\n\n  .rtabs-fill > div > div > div > .rtabs-tab-content {\n\n    display: flex;\n\n  }\n\n\n\n  .rtabs-placeholder {\n\n    display: inline-block;\n\n    width: 100%;\n\n    height: 1px;\n\n    flex-shrink: 0;\n\n  }\n\n  .rtabs-dyna.rtabs-not-selected {\n\n    height: 1px;\n\n    opacity: 0;\n\n    overflow: hidden;\n\n  }\n\n  .rtabs-pad > .rtabs-tab-content {\n\n    padding: 1em;\n\n    box-sizing: border-box;\n\n  }\n\n  .rtabs-pad > .rtabs-tab-content.rtabs-no-pad {\n\n    padding: 0;\n\n  }\n\n  .rtabs > .rtabs-tab-content.rtabs-pad {\n\n    padding: 1em;\n\n    box-sizing: border-box;\n\n  }\n\n  ")


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
            construct: construct$1,
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

        function construct$1() {
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

      function plugin$2(options) {
        if ( options === void 0 ) options = {};

        var lib = options.marked || window.marked;
        if (!lib) { throw new Error("Marked must be either passed in or provided globally as 'marked'.") }

        function marked(node, opts) {
          var div = document.createElement('div');
          div.setAttribute('class', 'marked-container');
          var display = node.style.display;
          node.style.display = 'none';

          var content = document.createElement('div');
          content.setAttribute('class', 'marked-content');
          div.appendChild(content);

          var html = node.innerText;
          var lines = html.split(/\r?\n/);
          var indent = lines.find(function (l) { return /[^\s]/.test(l); });
          if (indent) { html = html.replace(new RegExp(("^" + (indent.replace(/(\s*).*/, '$1'))), 'gm'), ''); }

          lib(html, function (err, res) {
            content.innerHTML = res;
            node.parentNode.insertBefore(div, node.nextSibling);
          });

          return { teardown: function teardown() {
            node.parentNode.removeChild(div);
            node.style.display = display;
          } };
        }

        return function plugin(ref) {
          var Ractive = ref.Ractive;
          var instance = ref.instance;

          instance.decorators[options.name || 'marked'] = marked;
          instance.partials[options.name || 'marked'] = Ractive.macro(function (handle) {
            var content = handle.partials.content || [];
            if (content.length === 1 && typeof content[0] === 'string') {
              handle.aliasLocal('_marked');
              handle.setTemplate(['Marking down...']);
              var tpl = content[0];
              var indent = tpl.split(/\r?\n/).find(function (l) { return /[^\s]/.test(l); });
              if (indent) { tpl = tpl.replace(new RegExp(("^" + (indent.replace(/(\s*).*/, '$1'))), 'gm'), ''); }
              lib(tpl, function (err, res) {
                if (!err) { handle.set('@local.content', res); }
              });
              handle.setTemplate([{ t: 7, e: 'div', m: [{ t: 13, n: 'class-marked-container' }], f: [{ t: 7, e: 'div', m: [{ t: 13, n: 'class-marked-content' }], f: [{ t: 3, r: '_marked.content' }] }] }]);
            } else {
              handle.setTemplate([{ t: 7, e: 'div', m: [{ t: 71, n: 'marked' }], f: handle.template.f }]);
            }
          }, {
            css: function css(data) { return (".marked-container { display: flex; justify-content: space-around; } .marked-content { max-width: " + (data('marked.max') || '70em') + "; width: 100%; box-sizing: border-box; }") },
            noCssTransform: true
          });
        }
      }

      function style$1(data) {
        return ("\n  label.field {\n    display: inline-block;\n    font-size: 0.8em;\n    color: " + (data('form.color.accent') || data('fg1') || '#222') + ";\n    min-height: 6.5em;\n    transition: 0.2s ease-in-out;\n    transition-property: color;\n    vertical-align: middle;\n    box-sizing: border-box;\n    padding: " + (data('form.boxy') ? '0.8em 1em' : '0.8em 0.5em') + ";\n  }\n\n  label.field.textarea {\n    display: block;\n    border: 1px solid " + (data('form.color.accent') || data('fg1') || '#222') + ";\n    padding: 0.5em 0.8em 0.8em 0.8em;\n    border-radius: 2px;\n    box-shadow: none;\n    transition-property: color, border-color, box-shadow;\n    margin: 0.8em 0.2em;\n    min-height: auto;\n  }\n\n  label.field.inline {\n    padding-top: 3em;\n    cursor: pointer;\n  }\n\n  label.field.focus {\n    color: " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n  }\n\n  label.field.textarea.focus {\n    border-color: " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n    " + (!data('form.boxy') ? ("box-shadow: 1px 1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      -1px 1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      1px -1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      -1px -1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";") : '') + "\n  }\n\n  label.field > input,\n  label.field > select,\n  label.field > textarea\n  {\n    display: block;\n    border-width: " + (data('form.boxy') ? '0.0625em' : '0 0 0.0625em 0') + ";\n    border-color: " + (data('form.color.accent') || data('fg1') || '#222') + ";\n    border-style: solid;\n    box-sizing: border-box;\n    background-color: transparent;\n    transition: 0.2s ease-in-out;\n    transition-property: box-shadow, color;\n    outline: none;\n    padding: " + (data('form.boxy') ? '0.7em 1.5em 0.7em 0.7em' : '0.5em 0') + ";\n    box-shadow: none;\n    width: 100%;\n    margin-bottom: 0.8em;\n    font-size: 1.2em;" + (data('form.boxy') ? '\n  border-radius: 0.2em;' : '') + "\n  }\n  " + (!data('form.boxy') ? "label.field > select {\n    height: 2.25em;\n  }" : '') + "\n\n  " + (!data('form.boxy') ? ("label.field:hover > input,\n  label.field:hover > select,\n  label.field.file:hover:after {\n    box-shadow: 0 1px 0 0 " + (data('form.color.accent') || data('fg1') || '#222') + ";\n  }\n  label.field.inline:hover > input:before,\n  label.field.textarea:hover {\n    box-shadow: 1px 1px " + (data('form.color.accent') || data('fg1') || '#222') + ",\n      -1px 1px " + (data('form.color.accent') || data('fg1') || '#222') + ",\n      1px -1px " + (data('form.color.accent') || data('fg1') || '#222') + ",\n      -1px -1px " + (data('form.color.accent') || data('fg1') || '#222') + ";\n  }\n  label.field.textarea.focus:hover {\n    box-shadow: 1px 1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      -1px 1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      1px -1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      -1px -1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n  }\n  label.field.inline:hover > input:checked:before {\n    box-shadow: 0px 1px " + (data('form.color.accent') || data('fg1') || '#222') + ",\n      -1px 0px " + (data('form.color.accent') || data('fg1') || '#222') + ";\n  }\n  label.field.inline.focus:hover > input:checked:before {\n    box-shadow: 0px 1px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ",\n      -1px 0px " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n  }") : '') + "\n\n  label.field > textarea {\n    font-size: 1.4em;\n    border: none;\n  }\n\n  label.field.inline > input {\n    width: auto;\n    float: left;\n    width: 0;\n    margin-right: 1.5em;\n  }\n\n  label.field.inline > input:before {\n    content: '';\n    display: block;\n    border: 1px solid " + (data('form.color.accent') || data('fg1') || '#222') + ";\n    width: 1em;\n    height: 1em;\n    box-sizing: border-box;\n    transition: 0.2s ease-in-out;\n    transition-property: transform, border-color, height, width, box-shadow;\n    margin-top: -0.125em;\n  }\n\n  label.field.inline.focus > input:before {\n    border-color: " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n  }\n\n  label.field.inline > input:checked:before {\n    height: 0.7em;\n    width: 1.3em;\n    border-width: 2px;\n    border-top-color: transparent;\n    border-right-color: transparent;\n    transform: rotate(-50deg);\n  }\n\n  label.field > input:focus,\n  label.field > select:focus,\n  label.field.file.focus:after\n  {\n    border-color: " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n    " + (!data('form.boxy') ? ("box-shadow: 0 1px 0 0 " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";") : '') + "\n  }\n\n  label.field.file.focus:after {\n    color: " + (data('form.color.accentActive') || data('fga1') || '#07e') + ";\n  }\n  label.field.file [type=file] {\n    position: absolute;\n    width: 0;\n    height: 0;\n    opacity: 0;\n    z-index: -1;\n  }\n  label.field.file:after {\n    position: absolute;\n    content: 'Choose a file';\n    width: calc(100% - 1em);\n    height: 1.22em;\n    color: " + (data('form.color.accent') || data('fg1') || '#222') + ";\n    border-color: " + (data('form.color.accent') || data('fg1') || '#222') + ";\n    border-bottom-style: solid;\n    border-bottom-width: 0.0625em;\n    text-align: center;\n    padding: 0.5em 0;\n    cursor: pointer;\n    font-style: oblique;\n    left: 0.5em;\n    bottom: 1.78em;\n    transition: 0.2s ease-in-out;\n    transition-property: color, border-bolor, box-shadow;\n  }\n\n  label.field.button > button {\n    position: relative;\n    top: 1.2em;\n    font-size: 1.2em;\n  }\n\n  label.field.plain > div {\n    position: absolute;\n    font-size: 1.2em;\n    top: 2.28em;\n  }\n  ");
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

        var isField = !!~node.className.indexOf('field');
        if (!isField) { cls.push('field'); }

        var isCheck = !!node.querySelector('input[type=checkbox], input[type=radio]');
        if (isCheck) { cls.push('inline'); }

        var isArea = !!node.querySelector('textarea');
        if (isArea) { cls.push('textarea'); }

        var isFile = !!node.querySelector('input[type=file]');
        if (isFile) { cls.push('file'); }

        var isButton = !!node.querySelector('button');
        if (isButton) { cls.push('button'); }

        var isPlain = !!node.querySelector('div');
        if (isPlain) { cls.push('plain'); }

        var focus = ctx.listen('focusin', focused);
        var blur = ctx.listen('focusout', blurred);

        node.className += (node.className.length ? ' ' : '') + cls.join(' ');

        return {
          update: noop,
          teardown: function teardown() {
            var cls = node.className;

            if (!isField) {
              cls = cls.replace(/\bfield\b/, '').trim();
            }

            if (isCheck) {
              cls = cls.replace(/\binline\b/, '').trim();
            }

            if (isArea) {
              cls = cls.replace(/\btextarea\b/, '').trim();
            }

            if (isFile) {
              cls = cls.replace(/\bfile\/b/, '').trim();
            }

            if (isButton) {
              cls = cls.replace(/\bbutton\/b/, '').trim();
            }

            if (isPlain) {
              cls = cls.replace(/\bplain\/b/, '').trim();
            }

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

      function plugin$3(opts) {
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
        plugin$2(),
        plugin$3({ includeStyle: true }),
        plugin$1()
      );

      var app = window.app = new App({ target: '#target' });

    }
  };
});
