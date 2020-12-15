System.register(['./chunk2.js', 'ractive', './chunk5.js', './chunk12.js'], function (exports, module) {
  'use strict';
  var globalRegister, Ractive$1, clickout, fade;
  return {
    setters: [function (module) {
      globalRegister = module.default;
    }, function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      clickout = module.default;
    }, function (module) {
      fade = module.default;
    }],
    execute: function () {

      exports('default', plugin$1);
      exports('trigger', trigger);
      function pop(t, params) {
        if ( params === void 0 ) params = {};

        var p = t.processParams(params, { duration: 400, easing: 'easeInOut' });
        params.dir = params.dir || false;
        var distance = params.distance || '20px';
        var scale = params.scale || '0.9';
        var dir = params.dir === 'above' ? ("translateY(" + distance + ")") :
          params.dir === 'left' ? ("translateX(" + distance + ")") :
          params.dir === 'right' ? ("translateX(-" + distance + ")") :
          ("translateY(-" + distance + ")");

        if (t.isIntro || p.intro) {
          t.setStyle('opacity', 0);
          t.setStyle('transform', ("scale(" + scale + ") " + dir));
          return t.animateStyle({
            opacity: 1,
            transform: 'none'
          }, p);
        } else {
          t.setStyle('opacity', 1);
          t.setStyle('transform', 'none');
          return t.animateStyle({
            opacity: 0,
            transform: ("scale(" + scale + ") " + dir)
          }, p);
        }
      }

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.transitions[opts.name || 'pop'] = pop;
        }
      }

      globalRegister('pop', 'transitions', pop);

      var template = {v:4,t:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rpop-wrapper",g:1},{n:"class-rpop-with-tail",t:13,f:[{t:2,r:"position.tail"}]},{n:"class",f:["rpop-",{t:2,x:{r:["where"],s:"_0||\"below\""}}," rpop-align-",{t:2,x:{r:["align"],s:"_0||\"middle\""}}],t:13},{t:4,f:[{n:"style-top",f:[{t:2,r:"position.popTop"},"px"],t:13},{n:"style-left",f:[{t:2,r:"position.popLeft"},"px"],t:13}],n:50,r:"position"},{t:4,f:[{t:4,f:[{n:"style-top",f:[{t:2,r:"top"}],t:13}],n:50,r:"top"},{t:4,f:[{n:"style-left",f:[{t:2,r:"left"}],t:13}],n:50,r:"left"}],n:51,l:1},{n:"pop",t:72,f:{r:["where"],s:"[{dir:_0||\"below\"}]"},v:"t2"},{n:"cleanup",t:71},{t:4,f:[{n:["click"],t:70,f:{r:["@this"],s:"[_0.set(\"popped\",false)]"}}],n:50,r:"clickClose"},{t:4,f:[{n:["clickout"],t:70,f:{r:["@this"],s:"[_0.set(\"popped\",false)]"}}],n:51,r:"noClickout"},{t:16,r:"extra-attributes"}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rpop-tail",g:1},{t:4,f:[{n:"style-top",f:[{t:2,x:{r:["position.tailTop","position.vert"],s:"_0+(_1?1:0)"}},"px"],t:13}],n:50,r:"position.tailTop"},{t:4,f:[{n:"style-bottom",f:[{t:2,x:{r:["position.tailBottom","position.vert"],s:"_0+(_1?1:0)"}},"px"],t:13}],n:50,r:"position.tailBottom"},{t:4,f:[{n:"style-left",f:[{t:2,x:{r:["position.tailLeft","position.vert"],s:"_0+(_1?0:1)"}},"px"],t:13}],n:50,r:"position.tailLeft"},{t:4,f:[{n:"style-right",f:[{t:2,x:{r:["position.tailRight","position.vert"],s:"_0+(_1?0:1)"}},"px"],t:13}],n:50,r:"position.tailRight"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rpop-tail-outer",g:1},{t:4,f:[{n:"style-top",f:[{t:2,x:{r:["position.tailTop"],s:"_0-2"}},"px"],t:13}],n:50,r:"position.tailTop"},{t:4,f:[{n:"style-bottom",f:[{t:2,x:{r:["position.tailBottom"],s:"_0-2"}},"px"],t:13}],n:50,r:"position.tailBottom"},{t:4,f:[{n:"style-left",f:[{t:2,x:{r:["position.tailLeft"],s:"_0-2"}},"px"],t:13}],n:50,r:"position.tailLeft"},{t:4,f:[{n:"style-right",f:[{t:2,x:{r:["position.tailRight"],s:"_0-2"}},"px"],t:13}],n:50,r:"position.tailRight"}]}],n:50,r:"~/tail"}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rpop",g:1}],f:[{t:16,r:"content"}]}]}],n:50,r:"__popped"}],e:{"_0||\"below\"":function (_0){return(_0||"below");},"_0||\"middle\"":function (_0){return(_0||"middle");},"[{dir:_0||\"below\"}]":function (_0){return([{dir:_0||"below"}]);},"[_0.set(\"popped\",false)]":function (_0){return([_0.set("popped",false)]);},"_0+(_1?1:0)":function (_0,_1){return(_0+(_1?1:0));},"_0+(_1?0:1)":function (_0,_1){return(_0+(_1?0:1));},"_0-2":function (_0){return(_0-2);},"[{delay:200}]":function (){return([{delay:200}]);},"[_0===_1&&_2.done(),true]":function (_0,_1,_2){return([_0===_1&&_2.done(),true]);},"[_0.done()]":function (_0){return([_0.done()]);},"true":function (){return(true);}},p:{modal:[{t:4,f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rpop-modal",g:1},{n:"fade",t:72,v:"t1"},{n:"fade",t:72,f:{r:[],s:"[{delay:200}]"},v:"t2"},{t:4,f:[{n:["click"],t:70,f:{r:["@node","@event.target","."],s:"[_0===_1&&_2.done(),true]"}}],n:51,r:".noClickout"}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rpop",g:1},{n:"pop",t:72,f:{r:[],s:"[{delay:200}]"},v:"t1"},{n:"pop",t:72,v:"t2"},{t:4,f:[{n:["click"],t:70,f:{r:["."],s:"[_0.done()]"}}],n:50,r:".clickClose"},{t:8,r:".attrs",c:{r:".context"},z:[{n:"inModal",x:{x:{r:[],s:"true"}}}]}],f:[{t:8,r:".content",c:{r:".context"},z:[{n:"inModal",x:{x:{r:[],s:"true"}}}]}]}]}],n:54,r:"contents.0"}],n:50,r:"contents.length"}]}};

      function noop() {}
      var source, tailSource, mobilePopped, mobilePop;

      var Popover = /*@__PURE__*/(exports('Popover', function (Ractive) {
        function Popover(opts) { Ractive.call(this, opts); }

        if ( Ractive ) Popover.__proto__ = Ractive;
        Popover.prototype = Object.create( Ractive && Ractive.prototype );
        Popover.prototype.constructor = Popover;

        Popover.prototype.position = function position (node) {
          var source = node || this.source;
          var popped = this.get('popped');
          if (!source || !popped) { return; }

          var wrapper = this.find('div');

          if (source && wrapper && wrapper.offsetParent) {
            var parent = wrapper.offsetParent;
            var offset = parent.getBoundingClientRect();
            var local = wrapper.getBoundingClientRect();
            var target = source.getBoundingClientRect();
            var where = this.get('where') || 'below';
            var align = this.get('align') || 'middle';
            var tail = this.get('tail');
            var vert = where === 'above' || where === 'below';
            var fit = this.get('fit');
            var gap = this.get('gap');

            var offx = where === 'above' || where === 'below' ? 0 : where === 'left' ? -local.width - gap : target.width + gap;
            var offy  = where === 'left' || where === 'right' ? -target.height : where === 'above' ? -target.height - local.height - gap : gap;

            if (align === 'middle') {
              if (where === 'below' || where === 'above') { offx -= (local.width - target.width) / 2; }
              else if (where === 'left' || where === 'right') { offy -= (local.height - target.height) / 2; }
            } else if (align === 'end') {
              if (where === 'below' || where === 'above') { offx += target.width - local.width; }
              else if (where === 'left' || where === 'right') { offy += target.height - local.height; }
            }

            var pos = {
              popTop: target.bottom - offset.top + offy,
              popLeft: target.left - offset.left + offx,
              tail: tail,
              vert: where === 'above' || where === 'below'
            };

            if (parent.scrollTop) { pos.popTop += parent.scrollTop; }
            if (parent.scrollLeft) { pos.popLeft += parent.scrollLeft; }

            if (tail) {
              if (where === 'above') {
                pos.tailBottom = -10;
              } else if (where === 'below') {
                pos.tailTop = -10;
              } else if (where === 'left') {
                pos.tailRight = -10;
              } else if (where === 'right') {
                pos.tailLeft = -10;
              }

              var tailTarget = this.tailSource ? this.tailSource.getBoundingClientRect() : target;

              if (align === 'start') {
                if (vert) { pos.tailLeft = Math.floor(tailTarget.width / 2) - 10; }
                else { pos.tailTop = Math.floor(tailTarget.height / 2) - 10; }
              } else if (align === 'end') {
                if (vert) { pos.tailRight = Math.floor(tailTarget.width / 2) - 10; }
                else { pos.tailBottom = Math.floor(tailTarget.height / 2) - 10; }
              } else if (align === 'middle') {
                if (vert) { pos.tailLeft = Math.floor(tailTarget.width / 2) - 10; }
                else { pos.tailTop = Math.floor(tailTarget.height / 2) - 10; }
              }

              if (tailTarget !== target) {
                if (vert) {
                  if (pos.tailLeft != null) { pos.tailLeft += tailTarget.left - target.left; }
                  if (pos.tailRight != null) { pos.tailRight += target.right - tailTarget.right; }
                } else {
                  if (pos.tailTop != null) { pos.tailTop += tailTarget.top - target.top; }
                  if (pos.tailBottom != null) { pos.tailBottom += target.bottom - tailTarget.bottom; }
                }
              } else if (align === 'middle') {
                if (vert) {
                  if (pos.tailLeft != null) { pos.tailLeft += tailTarget.left - (pos.popLeft + offset.left); }
                  if (pos.tailRight != null) { pos.tailRight += (pos.popLeft + offset.left + local.width) - tailTarget.right; }
                } else {
                  if (pos.tailTop != null) { pos.tailTop += tailTarget.top - (pos.popTop + offset.top); }
                  if (pos.tailBottom != null) { pos.tailBottom += (pos.popTop + offset.top + local.height) - tailTarget.bottom; }
                }
              }
            }

            if (fit) {
              var el = parent;

              if (this.get('offsets')) {
                var i = this.get('offsets');
                while (i--) { el = el.offsetParent; }
              }

              var owidth = parent.scrollWidth;
              var oheight = parent.scrollHeight;

              if (pos.popLeft + local.width > owidth) {
                var diff = pos.popLeft - (owidth - local.width);
                pos.popLeft -= diff;
                if (vert && pos.tailLeft) { pos.tailLeft += diff; }
                if (vert && pos.tailRight) { pos.tailRight -= diff; }
                if (tail && !vert) { pos.tail = false; }
              }

              if (pos.popLeft < 0) {
                var diff$1 = -1 * pos.popLeft;
                pos.popLeft += diff$1;
                if (vert && pos.tailLeft) { pos.tailLeft -= diff$1; }
                if (vert && pos.tailRight) { pos.tailRight += diff$1; }
                if (tail && !vert) { pos.tail = false; }
              }

              if (pos.popTop + local.height > oheight) {
                var diff$2 = pos.popTop - (oheight - local.height);
                pos.popTop -= diff$2;
                if (!vert && pos.tailTop) { pos.tailTop += diff$2; }
                if (!vert && pos.tailBottom) { pos.tailBottom -= diff$2; }
                if (tail && vert) { pos.tail = false; }
              }

              if (pos.popTop < 0) {
                var diff$3 = -1 * pos.popTop;
                pos.popTop += diff$3;
                if (!vert && pos.tailTop) { pos.tailTop -= diff$3; }
                if (!vert && pos.tailBottom) { pos.tailBottom += diff$3; }
                if (tail && vert) { pos.tail = false; }
              }
            }

            this.set('position', pos);
          } else {
            this.set('position', null);
          }
        };

        Popover.prototype.show = function show (node) {
          this.source = node;
          this.set('popped', true);
        };

        Popover.prototype.hide = function hide () {
          this.set('popped', false);
        };

        return Popover;
      }(Ractive$1)));

      Ractive$1.extendWith(Popover, {
        attributes: ['popped', 'tail', 'where', 'align', 'top', 'left', 'fit', 'clickClose', 'noClickout', 'gap', 'offsets'],
        use: [plugin(), clickout(), fade()],
        template: template,
        css: function(data) { return [(function(data) {
         var primary = Object.assign({}, data('raui.primary'), data('raui.pop.primary'));
         var themes = (data('raui.themes') || []).slice();
         (data('raui.pop.themes') || []).forEach(function (t) {
           if (!~themes.indexOf(t)) { themes.push(t); }
         });
         return "\n   .rpop-wrapper {\n     position: absolute;\n     display: inline-block;\n     z-index: 21;\n     transition-property: top, left, padding;\n     transition-timing-function: ease-in-out;\n     transition-duration: 0.3s;\n   }\n   .rpop-with-tail.rpop-above {\n     padding-bottom: 10px;\n   }\n   .rpop-with-tail.rpop-below {\n     padding-top: 10px;\n   }\n   .rpop-with-tail.rpop-left {\n     padding-right: 10px;\n   }\n   .rpop-with-tail.rpop-right {\n     padding-left: 10px;\n   }\n \n   .rpop {\n     position: relative;\n     box-shadow: 0 1px 4px 0 rgba(0,0,0,0.24);\n     border: 1px solid #ccc;\n     border-radius: 0.2em;\n     background-color: " + (primary.bg || '#fff') + ";\n     color: " + (primary.fg || '#222') + ";\n     padding: 0.5em;\n     z-index: 2;\n   }\n \n   .rpop-modal {\n     position: fixed;\n     display: flex;\n     z-index: 20;\n     background-color: rgba(0, 0, 0, 0.2);\n     align-items: center;\n     justify-content: center;\n     top: 0;\n     bottom: 0;\n     left: 0;\n     right: 0;\n     padding: 1em;\n     overflow: auto;\n   }\n \n   .rpop-tail, .rpop-tail-outer {\n     z-index: 3;\n     width: 0;\n     height: 0;\n     position: absolute;\n     border-style: solid;\n     border-width: 10px;\n     border-color: transparent;\n     transition-property: top, left, bottom, right, border-color;\n     transition-timing-function: ease-in-out;\n     transition-duration: 0.3s;\n   }\n   .rpop-tail-outer {\n     z-index: 1;\n     border-width: 12px;\n     border-color: transparent;\n   }\n \n   .rpop-below .rpop-tail {\n     border-bottom-color: " + (primary.bg || '#fff') + ";\n   }\n   .rpop-below .rpop-tail-outer {\n     border-bottom-color: " + (primary.bc || '#ccc') + ";\n   }\n \n   .rpop-above .rpop-tail {\n     border-top-color: " + (primary.bg || '#fff') + ";\n   }\n   .rpop-above .rpop-tail-outer {\n     border-top-color: " + (primary.bc || '#ccc') + ";\n   }\n \n   .rpop-left .rpop-tail {\n     border-left-color: " + (primary.bg || '#fff') + ";\n   }\n   .rpop-left .rpop-tail-outer {\n     border-left-color: " + (primary.bc || '#ccc') + ";\n   }\n   \n   .rpop-right .rpop-tail {\n     border-right-color: " + (primary.bg || '#fff') + ";\n   }\n   .rpop-right .rpop-tail-outer {\n     border-right-color: " + (primary.bc || '#ccc') + ";\n   }\n   " + themes.map(function (t) {
           var theme = Object.assign({}, data('raui.primary'), data('raui.pop.primary'), data(("raui." + t)), data(("raui.pop." + t)));
           return ("\n   ." + t + " .rpop {\n     background-color: " + (theme.bg || '#fff') + ";\n     color: " + (theme.fg || '#222') + ";\n   }\n \n   ." + t + ".rpop-below .rpop-tail {\n     border-bottom-color: " + (theme.bg || '#fff') + ";\n   }\n   ." + t + ".rpop-below .rpop-tail-outer {\n     border-bottom-color: " + (theme.bc || '#ccc') + ";\n   }\n \n   ." + t + ".rpop-above .rpop-tail {\n     border-top-color: " + (theme.bg || '#fff') + ";\n   }\n   ." + t + ".rpop-above .rpop-tail-outer {\n     border-top-color: " + (theme.bc || '#ccc') + ";\n   }\n \n   ." + t + ".rpop-left .rpop-tail {\n     border-left-color: " + (theme.bg || '#fff') + ";\n   }\n   ." + t + ".rpop-left .rpop-tail-outer {\n     border-left-color: " + (theme.bc || '#ccc') + ";\n   }\n   \n   ." + t + ".rpop-right .rpop-tail {\n     border-right-color: " + (theme.bg || '#fff') + ";\n   }\n   ." + t + ".rpop-right .rpop-tail-outer {\n     border-right-color: " + (theme.bc || '#ccc') + ";\n   }\n   ");
         });
      }).call(this, data)].join(' '); },
        cssId: 'rpop',
        noCssTransform: true,
        observe: {
          popped: function popped(v) {
            var this$1 = this;

            if (v) {
              if (source) { this.source = source; }
              if (tailSource) { this.tailSource = tailSource; }
            }
            setTimeout(function () {
              if (this$1.get('popped') === v) { this$1.set('_popped', v); }
            }, 1);
          },
          _popped: {
            handler: function handler(v) {
              var this$1 = this;

              if (v) {
                var mobile = this.get('@style.raui.pop.mobile');
                if (mobile && window.matchMedia(("(max-width: " + mobile + ")")).matches) {
                  if (!mobilePop) {
                    mobilePop = new MobilePop({ target: document.body, append: true });
                  }
                  var context = this.getContext().getParent(true);
                  context.isContext = 1;
                  this.set('__popped', false);
                  mobilePop.unshift('contents', { content: this.partials.content, context: context, attrs: this.partials['extra-attributes'] || [], clickClose: this.get('clickClose'), noClickout: this.get('noClickout'), done: function () { this$1.set('popped', false); } });
                } else {
                  this.set('__popped', true);
                }
              } else {
                if (mobilePopped) {
                  mobilePop.shift('contents');
                } else {
                  this.set('__popped', false);
                }
              }
            },
            defer: true
          },
          __popped: {
            handler: function handler(v) {
              if (v) {
                var el = this.find('div');
                var node = el;
                var h = node.offsetHeight + node.offsetTop;
                var w = node.offsetWidth + node.offsetLeft;
                var offset = node.offsetParent;

                if (!this.overflows) {
                  var o = this.overflows = { e: [], v: [] };
                  while (el && el.style) {
                    if (el === offset) {
                      if (el.offsetWidth >= w && el.offsetHeight >= h) { break; }
                      else {
                        w += el.offsetLeft;
                        h += el.offsetTop;
                        offset = el.offsetParent;
                      }
                    }
                    var css = getComputedStyle(el);
                    // if the element scrolls, carry on
                    if (css.overflow === 'auto') { break; }
                    // if the element has hidden overflow, temporarily show it
                    if (css.overflow === 'hidden') {
                      o.e.push(el);
                      o.v.push(el.style.overflow);
                      el.style.overflow = 'visible';
                    }
                    el = el.parentNode;
                  }
                }
                this.position();
                this.transition('pop', node, { intro: true, dir: this.get('where') || 'below' });
              } else {
                this.source = null;
                this.tailSource = null;
              }
            },
            defer: true
          },
          'align where tail fit': {
            handler: function handler() { this.position(); },
            defer: true
          }
        },
        decorators: {
          cleanup: function cleanup(node) {
            var pop$$1 = this;
            return {
              teardown: function teardown() {
                var o = pop$$1.overflows;
                if (o) {
                  pop$$1.overflows = null;
                  for (var i = 0; i < o.e.length; i++) {
                    o.e[i].style.overflow = o.v[i];
                  }
                }
              }
            }
          }
        },

        data: function data() {
          return { gap: 4 };
        }
      });

      function trigger(options) {
        if ( options === void 0 ) options = {};

        return function(ref) {
          var instance = ref.instance;

          instance.decorators[options.name || 'pop'] = function(node, path, opts) {
            if ( opts === void 0 ) opts = {};

            if (!path) { return { teardown: noop }; }
            if (typeof path === 'string') { opts.path = path; }
            else if (typeof path === 'object') { opts = path; }
            var ctx = this.getContext(node);
            var clicked, hover;

            function listener(ev) {
              if (ev.type === 'mouseover' && ctx.get(path)) { return; }

              if (ev.type !== 'click' || !hover || clicked) {
                var init = source;
                var initTail = tailSource;
                source = opts.node || node;
                if (typeof source === 'function') { source = source(); }
                source = source || node;
                tailSource = opts.tail;
                if (typeof tailSource === 'function') { tailSource = tailSource(); }
                ctx.toggle(opts.path);
                source = init;
                tailSource = initTail;
              }

              if (hover && ev.type === 'click') {
                clicked = ctx.observeOnce(opts.path, function () {
                  clicked = null;
                });
              }
            }

            function out(ev) {
              if (!clicked) {
                ctx.set(opts.path, false);
              }
            }

            if ('click' in opts ? opts.click : options.click !== false) {
              ctx.listen('click', listener);
            }

            if ('hover' in opts ? opts.hover : options.hover) {
              hover = 1;
              ctx.listen('mouseover', listener);
              ctx.listen('mouseout', out);
            }

            return {
              teardown: function teardown() {
                ctx.unlisten('click', listener);
                if (hover) {
                  ctx.unlisten('mouseover', listener);
                  ctx.unlisten('mouseout', out);
                  if (clicked) { clicked.cancel(); }
                }
              }
            }
          };
        };
      }

      var MobilePop = /*@__PURE__*/(function (Ractive) {
        function MobilePop(opts) {
          Ractive.call(this, opts);
        }

        if ( Ractive ) MobilePop.__proto__ = Ractive;
        MobilePop.prototype = Object.create( Ractive && Ractive.prototype );
        MobilePop.prototype.constructor = MobilePop;

        return MobilePop;
      }(Ractive$1));

      Ractive$1.extendWith(MobilePop, {
        template: { v: template.v, t: template.p.modal },
        data: function data() {
          return { contents: [] };
        },
        use: [plugin(), fade()],
        observe: {
          contents: function contents(v) {
            mobilePopped = (v || []).length > 0;
          }
        },
        on: {
          init: function init() {
            if (mobilePop) { console.warn("More than one PopOver mobile host created."); }
            else { mobilePop = this; }
          }
        }
      });

      function plugin$1(options) {
        if ( options === void 0 ) options = {};

        return function(ref) {
          var instance = ref.instance;

          instance.components[options.name || 'pop'] = Popover;
          instance.components[options.mobileName || 'mobile-pop'] = MobilePop;
          var opts = Object.assign({}, options);
          opts.name = opts.trigger || opts.name;
          trigger(opts)({ instance: instance });
        }
      }

    }
  };
});
