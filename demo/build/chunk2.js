System.register(['ractive'], function (exports, module) {
  'use strict';
  var Ractive$1, Ractive$2;
  return {
    setters: [function (module) {
      Ractive$1 = module.Ractive;
      Ractive$2 = module.default;
    }],
    execute: function () {

      exports('default', globalRegister);
      exports('expand', expand);
      exports('default$3', plugin$1);
      var win = typeof window !== 'undefined' ? window : null;

      function globalRegister(name, registry, constructor) {
        if (win && win.Ractive && typeof win.Ractive[registry] === 'object') {
          var script = document.currentScript;
          if (!script) {
            script = document.querySelectorAll('script');
            script = script[script.length - 1];
          }

          if (script) {
            var aliases = script.getAttribute('data-alias');
            if (aliases) {
              aliases = aliases.split('&');
              aliases = aliases.reduce(function (a, c) {
                var ref = c.split('=');
                var k = ref[0];
                var v = ref[1];
                a[k] = v;
                return a;
              }, {});
            }

            Ractive[registry][(aliases && aliases[name]) || name] = constructor;
          }
        }
      }

      function expand(t, params) {
        var p = t.processParams(params, { duration: 200, easing: 'easeInOut' });
        return new Promise(function (ok) {
          // defer execution to allow for grid stuff
          requestAnimationFrame(function () {
            t.setStyle('overflow', 'hidden');
            var axis = p.axis === 'x' ? 'width' : 'height';
            if (t.isIntro || p.intro) {
              var val = t.getStyle(axis);
              t.setStyle(axis, 0);
              t.setStyle('opacity', 0);
              ok(t.animateStyle(axis, val, p)
                .then(function () { return t.animateStyle('opacity', 1, p); })
                .then(function () {
                  t.setStyle(axis, '');
                  t.setStyle('overflow', '');
                }));
            } else {
              t.setStyle(axis, t.getStyle(axis));
              t.setStyle('opacity', 1);
              ok(t.animateStyle('opacity', 0, p)
                .then(function () { return t.animateStyle(axis, 0, p); }));
            }
          });
        });
      }

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.transitions[opts.name || 'expand'] = expand;
        }
      }

      globalRegister('expand', 'transitions', expand);
      exports('default$1', plugin);

      var DEFAULTS = {
        timeout: 6000,
        top: true
      };

      function plugin$1(opts) {
        if ( opts === void 0 ) opts = {};

        var style = function(data) { return [(function(data) {
         var primary = Object.assign({}, data('raui.primary'), data('raui.toast.primary'));
         return ("\n   .rtoast {\n     position: absolute;\n     display: flex;\n     flex-wrap: wrap;\n     justify-content: center;\n     left: 1em;\n     right: 1em;\n     top: 1em;\n     bottom: auto;\n     z-index: 5;\n     pointer-events: none;\n     overflow: hidden;\n     max-height: 80%;\n   }\n   .rtoast-message {\n     flex-grow: 2;\n     display: flex;\n     align-items: center;\n   }\n   .rtoast-string {\n     white-space: pre-wrap;\n     line-height: 1.3em;\n     padding-top: 0.3em;\n   }\n   .rtoast-upper .rtoast-string {\n     \n   }\n   .rtoast-expand .rtoast-string {\n     padding-top: 0.5em;\n   }\n   .rtoast-buttons {\n     display: flex;\n     padding-left: 0.5em;\n     flex-shrink: 1;\n     align-items: center;\n     max-height: max-content;\n     margin-left: auto;\n   }\n   .rtoast-buttons button {\n     cursor: pointer;\n   }\n   .rtoast-button {\n     background-color: transparent;\n     border: none;\n     color: inherit;\n     padding: 0.5em 0.75em;\n     margin: 0 0 0 0.5em;\n     line-height: 1em;\n     box-shadow: none;\n   }\n   .rtoast-more {\n     cursor: pointer;\n     width: 2em;\n     position: relative;\n     flex-shrink: 2;\n     background-color: transparent;\n     border: none;\n     color: inherit;\n     margin: 0 0 0 0.5em;\n     height: 2em;\n   }\n   .rtoast-more:after {\n     content: ' ';\n     position: absolute;\n     display: block;\n     width: 0.6em;\n     height: 0.6em;\n     top: calc(50% - 0.55em);\n     left: calc(50% - 0.3em);\n     border-bottom: 0.125em solid;\n     border-right: 0.125em solid;\n     transform: rotate(45deg);\n     transition: transform 0.2s ease-in-out, top 0.2s ease-in-out;\n     pointer-events: none;\n   }\n   .rtoast-expanded .rtoast-more:after {\n     transform: rotate(225deg);\n     top: calc(50% - 0.1em);\n   }\n   .rtoast-bottom {\n     bottom: 1em;\n     top: auto;\n   }\n   .rtoast-left {\n     justify-content: flex-start;\n   }\n   .rtoast-right {\n     justify-content: flex-end;\n   }\n   .rtoast-body {\n     border-radius: 0.2em;\n     padding: 1em;\n     color: " + (primary.bg || '#fff') + ";\n     background-color: " + (primary.fg || '#222') + ";\n     box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n     opacity: 0.95;\n     pointer-events: all;\n     transition: color 0.5s ease-in-out, background 0.5s ease-in-out;\n     flex-shrink: 1;\n     display: flex;\n     flex-direction: column;\n   }\n   .rtoast-upper {\n     display: flex;\n     flex-shrink: 2;\n     flex-wrap: wrap;\n     justify-content: space-between;\n   }\n \n   .rtoast-expand {\n     margin-top: 1em;\n     border-radius: 0.2em;\n     background-color: " + (primary.bg || '#fff') + ";\n     color: " + (primary.fg || '#222') + ";\n     overflow: auto;\n   }\n \n   .rtoast-success {\n     color: " + (data('raui.toast.success.fg') || '#f9f9f9') + ";\n     background-color: " + (data('raui.toast.success.bg') || '#4caf50') + ";\n   }\n   .rtoast-info {\n     color: " + (data('raui.toast.info.fg') || '#f9f9f9') + ";\n     background-color: " + (data('raui.toast.info.bg') || '#07e') + ";\n   }\n   .rtoast-warn {\n     color: " + (data('raui.toast.warn.fg') || '#222') + ";\n     background-color: " + (data('raui.warn.success.bg') || '#ffc107') + ";\n   }\n   .rtoast-error {\n     color: " + (data('raui.toast.error.fg') || '#f9f9f9') + ";\n     background-color: " + (data('raui.toast.error.bg') || '#ff5252') + ";\n   }\n   ");
      }).call(this, data)].join(' '); };
        var template = {v:4,t:[{t:4,f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtoast",g:1},{n:"class-rtoast-expanded",t:13,f:[{t:2,r:".showMore"}]},{n:"class-rtoast-bottom",t:13,f:[{t:2,r:".bottom"}]},{n:"class-rtoast-left",t:13,f:[{t:2,r:".left"}]},{n:"class-rtoast-right",t:13,f:[{t:2,r:".right"}]}],f:[{t:7,e:"div",m:[{n:"toast",t:72,v:"t0"},{n:"class",f:["rtoast-body",{t:4,f:[" rtoast-",{t:2,r:".type"}],n:50,r:".type"},{t:4,f:[{t:2,r:".class"}],n:50,r:".class"}],t:13},{t:4,f:[{n:["click"],t:70,f:{r:["."],s:"[_0.close()]"}}],n:50,x:{r:[".dismissable"],s:"_0!==false"}}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtoast-upper",g:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtoast-message",g:1}],f:[{t:4,f:[{t:4,f:[{t:8,r:".message",c:{r:".context"}}],n:50,x:{r:[".context"],s:"!!_0"}},{t:4,f:[{t:8,r:".message"}],n:51,l:1}],n:50,x:{r:[".message"],s:"Array.isArray(_0)"}},{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtoast-string",g:1}],f:[{t:2,r:".message"}]}],n:51,l:1}]}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtoast-buttons",g:1}],f:[{t:4,f:[{t:7,e:"button",m:[{n:"class",f:["rtoast-button",{t:4,f:[" ",{t:2,r:".class"}],n:50,r:".class"}],t:13},{t:4,f:[{n:["click"],t:70,f:{r:["."],s:"[_0.action()]"}}],n:50,x:{r:[".action"],s:"typeof _0===\"function\""}}],f:[{t:2,r:".label"}]}],n:52,r:".buttons"},{t:4,f:[{t:7,e:"button",m:[{t:13,n:"class",f:"rtoast-button",g:1}],f:["Close"]}],n:50,x:{r:[".dismissable",".closeButton"],s:"_0!==false&&_1!==false"},l:1}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtoast-more",g:1},{n:"title",f:"Toggle more",t:13,g:1},{n:["click"],t:70,f:{r:[".","@context"],s:"[_0.expand(),(_1).toggle(\".showMore\"),false]"}}]}],n:50,r:".more"}]}],n:50,x:{r:[".dismissable",".closeButton",".buttons.length",".more"],s:"(_0!==false&&_1!==false)||_2||_3"}}]}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtoast-expand",g:1},{n:"toast-expand",t:72,v:"t0"},{n:["click"],t:70,f:{r:[],s:"[false,false]"}}],f:[{t:4,f:[{t:4,f:[{t:8,r:".more",c:{r:".context"}}],n:50,x:{r:[".context"],s:"!!_0"}},{t:4,f:[{t:8,r:".more"}],n:51,l:1}],n:50,x:{r:[".more"],s:"Array.isArray(_0)"}},{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtoast-string",g:1}],f:[{t:2,r:".more"}]}],n:51,l:1}]}],n:50,x:{r:[".more",".showMore"],s:"_0&&_1"}}]}]}],n:54,r:"~/_toast"}],n:50,r:"~/_toast"}],e:{"[_0.close()]":function (_0){return([_0.close()]);},"_0!==false":function (_0){return(_0!==false);},"!!_0":function (_0){return(!!_0);},"Array.isArray(_0)":function (_0){return(Array.isArray(_0));},"[_0.action()]":function (_0){return([_0.action()]);},"typeof _0===\"function\"":function (_0){return(typeof _0==="function");},"_0!==false&&_1!==false":function (_0,_1){return(_0!==false&&_1!==false);},"[_0.expand(),(_1).toggle(\".showMore\"),false]":function (_0,_1){return([_0.expand(),(_1).toggle(".showMore"),false]);},"(_0!==false&&_1!==false)||_2||_3":function (_0,_1,_2,_3){return((_0!==false&&_1!==false)||_2||_3);},"[false,false]":function (){return([false,false]);},"_0&&_1":function (_0,_1){return(_0&&_1);}}};

        return function(ref) {
          var Ractive = ref.Ractive;
          var instance = ref.instance;
          var proto = ref.proto;

          instance.partials[opts.name || 'toast'] = template;

          var defaults = Object.assign({}, DEFAULTS, opts);
          var toasts = [];
          var holder = { toasts: toasts };
          var active;

          Object.defineProperty(proto, 'toastDefaults', {
            value: defaults,
            writable: false,
            configurable: true
          });

          proto.toast = function toast(message, options) {
            var this$1 = this;

            var opts = Object.assign({ message: message, instance: this }, defaults, this.toastDefaults, options);
            opts.close = function () { return closeToast(opts, this$1); };
            opts.expand = function () {
              if (holder.active !== opts) { return; }
              if (holder.tm) {
                clearTimeout(holder.tm);
                holder.tm = null;
              }

              if (opts.showMore) {
                if (opts.timeout) { holder.tm = setTimeout(function () {
                  opts.close();
                  holder.tm = null;
                }, opts.timeout); }
              }
            };
            toasts.push(opts);
            if (!active) { showToast(); }
            return new Handle(holder, opts);
          };

          function closeToast(which, instance) {
            if (active !== which) {
              toasts.splice(toasts.indexOf(opts), 1);
              if (typeof which.onclose === 'function') { which.onclose(); }
            } else {
              if (holder.tm) {
                clearTimeout(holder.tm);
                holder.tm = null;
              }

              active.instance.set('_toast', null).then(function () {
                holder.active = active = null;
                if (typeof which.onclose === 'function') { which.onclose(); }
                if (toasts.length) { showToast(); }
              });
            }

            instance && instance.fire('toasted', null, which);
          }
          function showToast() {
            holder.active = active = toasts.shift();
            active.instance.set('_toast', active).then(function () {
              if (active.timeout) {
                if (holder.tm) { clearTimeout(holder.tm); }
                holder.tm = setTimeout(function () {
                  active.close();
                  holder.tm = null;
                }, active.timeout);
              }
            });
          }

          proto.on = proto.on || {};

          instance.transitions.toast = function(t, ps) {
            var params = t.processParams({ duration: 200 }, ps);
            var opacity = t.getStyle('opacity');
            if (t.isIntro) {
              t.setStyle({
                opacity: 0,
                transform: ("translateY(" + (active.bottom ? '' : '-') + "1em)")
              });
              return t.animateStyle({
                opacity: opacity,
                transform: "none"
              }, params);
            } else {
              t.setStyle({
                opacity: opacity,
                transform: "none"
              });
              return t.animateStyle({
                opacity: 0,
                transform: ("translateY(" + (active.bottom ? '' : '-') + "1em)")
              }, params);
            }
          };

          instance.transitions['toast-expand'] = function(t, ps) {
            var params = t.processParams({ duration: 200, nested: false }, ps);
            if (t.isIntro) {
              var h = t.getStyle('height');
              var w = t.getStyle('width');
              t.setStyle('height', 0);
              t.setStyle('width', 0);
              return t.animateStyle('width', w, params).then(function () { return t.animateStyle('height', h, params); }).then(function () {
                t.setStyle('height', '');
                t.setStyle('width', '');
              });
            } else {
              var h$1 = t.getStyle('height');
              t.setStyle('height', h$1);
              t.setStyle('width', t.getStyle('width'));
              return t.animateStyle('height', 0, params).then(function () { return t.animateStyle('width', 0, params); }).then(function () {
                t.setStyle('height', '');
                t.setStyle('width', '');
              });
            }
          };

          proto.on['close-toast'] = function() {
            if (active) { active.close(); }
          };

          if (instance === Ractive || Ractive.isInstance(instance)) {
            if (!Ractive.hasCSS('toast-css')) { Ractive.addCSS('toast', style); }
          } else {
            var pcss = instance.css;
            instance.css = function(data) {
              var css = '';
              if (typeof pcss === 'string') { css += pcss; }
              else if (typeof pcss === 'function') { css += pcss(data); }
              return style(data) + css;
            };
          }

          return proto;
        }
      }

      var Handle = function Handle(holder, data) {
        this.holder = holder;
        this.data = data;
      };

      var prototypeAccessors = { message: { configurable: true },more: { configurable: true },showMore: { configurable: true },left: { configurable: true },right: { configurable: true },top: { configurable: true },bottom: { configurable: true },center: { configurable: true },context: { configurable: true },type: { configurable: true },class: { configurable: true },dismissable: { configurable: true },closeButton: { configurable: true },buttons: { configurable: true },live: { configurable: true },closed: { configurable: true } };

      Handle.prototype.close = function close (timeout) {
          var this$1 = this;

        this.data.timeout = timeout;
        if (this.data === this.holder.active) {
          if (this.holder.tm) { clearTimeout(this.holder.tm); }
          if (timeout) {
            this.holder.tm = setTimeout(function () {
              this$1.data.close();
              this$1.holder.tm = null;
            }, timeout);
          } else { this.data.close(); }
        } else {
          if (timeout) {
            this.data.timeout = timeout;
          } else { this.data.close(); }
        }

        return this.closed;
      };

      Handle.prototype.cancelClose = function cancelClose () {
        if (this.data === this.holder.active) {
          clearTimeout(this.holder.tm);
          this.holder.tm = null;
        } else {
          this.data.timeout = 0;
        }
      };

      Handle.prototype.updateButtons = function updateButtons () { this.data === this.holder.active && this.data.instance.update('_toast.buttons'); };

      Handle.prototype.set = function set (key, value) {
        if (typeof key === 'object') {
          for (var k in key) {
            this.data[k] = key[k];
          }
          if (this.data === this.holder.active) { return this.data.instance.update('_toast'); }
          else { return Promise.resolve(); }
        } else {
          this.data[key] = value;
          if (this.data === this.holder.active) { return this.data.instance.update(("_toast." + (Ractive$1.escapeKey(key)))); }
          else { return Promise.resolve(); }
        }
      };

      prototypeAccessors.message.get = function () { return this.data.message; };
      prototypeAccessors.message.set = function (v) { this.data.message = v; this.data === this.holder.active && this.data.instance.update('_toast.message'); };

      prototypeAccessors.more.get = function () { return this.data.more; };
      prototypeAccessors.more.set = function (v) { this.data.more = v; this.data === this.holder.active && this.data.instance.update('_toast.more'); };

      prototypeAccessors.showMore.get = function () { return this.data.showMore; };
      prototypeAccessors.showMore.set = function (v) { this.data.showMore = v; this.data === this.holder.active && this.data.instance.update('_toast.showMore'); };

      prototypeAccessors.left.get = function () { return this.data.left; };
      prototypeAccessors.left.set = function (v) { this.data.left = v; this.data.right = false; this.data === this.holder.active && this.data.instance.update('_toast.left') && this.data.instance.update('_toast.right'); };

      prototypeAccessors.right.get = function () { return this.data.right; };
      prototypeAccessors.right.set = function (v) { this.data.right = v; this.data.left = false; this.data === this.holder.active && this.data.instance.update('_toast.right') && this.data.instance.update('_toast.left'); };

      prototypeAccessors.top.get = function () { return !this.data.bottom; };
      prototypeAccessors.top.set = function (v) { this.data.bottom = !v; this.data === this.holder.active && this.data.instance.update('_toast.bottom'); };

      prototypeAccessors.bottom.get = function () { return this.data.bottom; };
      prototypeAccessors.bottom.set = function (v) { this.data.bottom = v; this.data === this.holder.active && this.data.instance.update('_toast.bottom'); };

      prototypeAccessors.center.get = function () { return !this.data.left && !this.data.right; };
      prototypeAccessors.center.set = function (v) { this.data.left = false; this.data.right = false; this.data === this.holder.active && this.data.instance.update('_toast.right'); this.data.instance.update('_toast.left'); };

      prototypeAccessors.context.get = function () { return this.data.context; };
      prototypeAccessors.context.set = function (v) { this.data.context = v; this.data === this.holder.active && this.data.instance.update('_toast.context'); };

      prototypeAccessors.type.get = function () { return this.data.type; };
      prototypeAccessors.type.set = function (v) { this.data.type = v; this.data === this.holder.active && this.data.instance.update('_toast.type'); };

      prototypeAccessors.class.get = function () { return this.data.class; };
      prototypeAccessors.class.set = function (v) { this.data.class = v; this.data === this.holder.active && this.data.instance.update('_toast.class'); };

      prototypeAccessors.dismissable.get = function () { return this.data.dismissable; };
      prototypeAccessors.dismissable.set = function (v) { this.data.dismissable = v; this.data === this.holder.active && this.data.instance.update('_toast.dismissable'); };

      prototypeAccessors.closeButton.get = function () { return this.data.closeButton; };
      prototypeAccessors.closeButton.set = function (v) { this.data.closeButton = v; this.data === this.holder.active && this.data.instance.update('_toast.closeButton'); };

      prototypeAccessors.buttons.get = function () { return this.data.buttons; };
      prototypeAccessors.buttons.set = function (v) { this.data.buttons = v; this.data === this.holder.active && this.data.instance.update('_toast.buttons'); };

      prototypeAccessors.live.get = function () { return this.data === this.holder.active || ~this.holder.toasts.indexOf(this.data); };
      prototypeAccessors.closed.get = function () {
          var this$1 = this;

        if (!this._promise) {
          this._promise = new Promise(function (ok) {
            this$1.data.onclose = ok;
          });
        }
        return this._promise;
      };

      Object.defineProperties( Handle.prototype, prototypeAccessors );

      var escape = Ractive$2.escapeKey;
      var windowTrans;

      var Base = /*@__PURE__*/(function (Ractive) {
        function Base(opts) { Ractive.call(this, opts); }

        if ( Ractive ) Base.__proto__ = Ractive;
        Base.prototype = Object.create( Ractive && Ractive.prototype );
        Base.prototype.constructor = Base;

        return Base;
      }(Ractive$2));

      Ractive$2.extendWith(Base, {
        css: function(data) { return [(function(data) {
         var primary = Object.assign({}, data('raui.primary'), data('raui.window.primary'));
         primary.action = Object.assign({}, data('raui.window.action'), data('raui.window.primary.action'));
         primary.host = Object.assign({}, data('raui.window.host'), data('raui.window.primary.host'));
         primary.title = Object.assign({ inactive: {} }, data('raui.window.title'), data('raui.window.primary.title'));
         return ("\n   .rwhost {\n     position: relative;\n     display: flex;\n     flex-direction: column;\n     box-sizing: border-box;\n     top: 0;\n     left: 0;\n     width: 100%;\n     height: 100%;\n     background-color: " + (primary.host.bg || primary.bg || '#fff') + ";\n   }\n \n   .rwhost-sizer {\n     position: absolute;\n   }\n \n   .rwhost-pane {\n     display: flex;\n     position: relative;\n     width: 100%;\n     box-sizing: border-box;\n     flex-grow: 2;\n     overflow: auto;\n     z-index: 1;\n   }\n   .rwhost-pane.blocked {\n     overflow: hidden;\n   }\n \n   .rwhost-pane-content {\n     flex-grow: 1;\n   }\n \n   .rwhost-modal {\n     position: absolute;\n     position: --webkit-sticky;\n     position: sticky;\n     top: 0;\n     left: 0;\n     z-index: -1;\n     opacity: 0;\n     transition: opacity 0.2s ease-in-out, z-index 0s linear 0.2s;\n     background-color: #000;\n     width: 100%;\n     height: 100%;\n   }\n   .rwhost-modal-active {\n     opacity: 0.5;\n     z-index: 1;\n     transition: opacity 0.2s ease-in-out, z-index 0s linear;\n   }\n \n   .rwindow-wrapper {\n     display: inline-block;\n     box-sizing: border-box;\n     position: absolute;\n   }\n   .rwindow-wrapper.rwindow-resizing {\n     transition: none;\n   }\n \n   .rwindow-wrapper.rwindow-resizable {\n     padding: " + (primary.handleSize || 7) + "px;\n   }\n \n   .rwindow-slide-left {\n     height: 100%;\n     left: 0;\n   }\n   .rwindow-slide-right {\n     height: 100%;\n     right: 0;\n   }\n   .rwindow-slide-top {\n     width: 100%;\n     top: 0;\n   }\n   .rwindow-slide-bottom {\n     width: 100%;\n     bottom: 0;\n   }\n \n   .rwindow-topmost > .rwindow {\n     box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.3);\n     opacity: 1;\n   }\n \n   .rwindow-modal {\n     position: absolute;\n     top: 0;\n     bottom: 0;\n     left: 0;\n     right: 0;\n     background-color: rgba(0, 0, 0, 0.5);\n     opacity: 0;\n     z-index: -1;\n     transition: opacity 0.4s ease-in-out, z-index 0s linear 0.4s;\n   }\n   .rwindow-modal.rwindow-blocked {\n     opacity: 1;\n     z-index: 50;\n     transition: opacity 0.4s ease-in-out, z-index 0s linear;\n   }\n \n   .rwindow {\n     position: relative;\n     box-sizing: border-box;\n     background-color: " + (primary.bg || '#fff') + ";\n     color: " + (primary.fg || '#222') + ";\n     box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n     border-radius: 2px;\n     overflow: hidden;\n     width: 100%;\n     height: 100%;\n     min-width: " + (primary.minWidth || '6em') + ";\n     min-height: " + (primary.minHeight || '6em') + ";\n     transition: box-shadow 0.4s ease-in-out, opacity 0.4s ease-in-out;\n   }\n   .rwindow-max > .rwindow {\n    border-radius: 0;\n    box-shadow: none;\n   }\n \n   .rwindow-pane-top,\n   .rwindow-max-top {\n     background-color: " + (primary.title.inactive.bg || primary.fg || '#222') + ";\n     color: " + (primary.title.inactive.fg || primary.bg || '#fff') + ";\n     flex-shrink: 0;\n   }\n \n   .rwindow-max-top {\n     flex-shrink: 2;\n   }\n \n   .rwindow-pane-top {\n     display: flex;\n     align-items: center;\n   }\n \n   .rwindow-topmost .rwindow-pane-top {\n     background-color: " + (primary.title.bg || primary.fga || '#07e') + ";\n     color: " + (primary.title.fg || primary.bg || '#fff') + ";\n   }\n \n   .rwindow-pane {\n     display: flex;\n     flex-direction: column;\n     table-layout: fixed;\n     width: 100%;\n     height: 100%;\n   }\n   .rwindow-autosizing {\n     display: block;\n     box-sizing: border-box;\n   }\n   .rwindow-content {\n     overflow: auto;\n     flex-grow: 2;\n     position: relative;\n     box-sizing: border-box;\n   }\n   .rwindow-content.rwindow-pad {\n     padding: 1em;\n   }\n   .rwindow-content.rwindow-flex {\n     display: flex;\n     flex-direction: column;\n   }\n \n   .rwindow-buttons {\n     display: flex;\n     flex-shrink: 0;\n     padding: 0.5em;\n     border-top: 1px solid " + (primary.action.bc || primary.bc || '#ccc') + ";\n     background-color: " + (primary.action.bg || primary.bg || '#fff') + ";\n     color: " + (primary.action.fg || primary.fg || '#222') + ";\n   }\n   .rwindow-buttons.no-buttons {\n     display: none;\n   }\n   .rwindow-left-buttons {\n     text-align: left;\n     flex-grow: 2;\n   }\n   .rwindow-left-buttons button {\n     margin-right: 0.5em;\n   }\n   .rwindow-center-buttons {\n     text-align: center;\n     flex-shrink: 2;\n   }\n   .rwindow-center-buttons button {\n     margin: 0 0.25em;\n   }\n   .rwindow-right-buttons {\n     text-align: right;\n     flex-grow: 2;\n   }\n   .rwindow-right-buttons button {\n     margin-left: 0.5em;\n   }\n \n   .rwindow-title {\n     overflow: hidden;\n     text-overflow: ellipsis;\n     padding: 0.5em;\n     white-space: nowrap;\n     box-sizing: border-box;\n     flex-grow: 1;\n   }\n \n   .rwindow-controls {\n     display: flex;\n     justify-content: flex-end;\n     align-items: center;\n     flex-grow: 1;\n   }\n   .rwindow-controls > div {\n     margin: 0 1em 0 0;\n     width: 0.7em;\n     height: 0.7em;\n     cursor: pointer;\n   }\n   .rwindow-minimize {\n     border-bottom: 2px solid;\n   }\n   .rwindow-maximize {\n     border: 2px solid;\n   }\n   .rwindow-controls > .rwindow-close {\n     width: 0.5em;\n     height: 1em;\n     border-right: 2px solid;\n     transform: rotate(45deg);\n     transform-origin: center right;\n     position: relative;\n     margin-right: 1.5em;\n   }\n   .rwindow-close:before {\n     cursor: pointer;\n     height: 1.2em;\n     width: 1.2em;\n     top: 0.3em;\n     left: 0.1em;\n     content: ' ';\n     transform: rotate(-45deg);\n     transform-origin: center left;\n     position: absolute;\n   }\n   .rwindow-close:after {\n     cursor: pointer;\n     height: 100%;\n     width: 100%;\n     top: 1px;\n     left: calc(100% + 1px);\n     content: ' ';\n     border-left: 2px solid;\n     transform: rotate(-90deg);\n     transform-origin: center left;\n     position: absolute;\n   }\n   .rwindow-max-top .rwindow-controls > .rwindow-close {\n     margin-right: 0.5em;\n   }\n   " + (typeof data('raui.window.extra') === 'function' ? data('raui.window.extra').call(this, data) : '') + "\n   ");
      }).call(this, data)].join(' '); },
        cssId: 'rwindow',
        noCssTransform: true,
        delegate: false,
        decorators: {
          tracked: function tracked(node, id) {
            this[id] = node;
            return {
              teardown: function teardown() { if (this[id] === node) { this[id] = null; } }
            };
          }
        },
        transitions: {
          window: function window(t, params) {
            if (windowTrans) { return t.complete(); }

            windowTrans = t;

            var p = t.processParams(params, { duration: 400, easing: 'easeInOut' });
            var parent = t.node.parentNode;
            var overflow = parent.style ? parent.style.overflow : '';

            if (parent.style) { parent.style.overflow = 'hidden'; }
            if (t.isIntro || p.intro) {
              t.setStyle({
                transform: 'translate(30%, 0px) scale(1.1, 1.1)',
                opacity: 0
              });
              setTimeout(function () {
                t.animateStyle({
                  transform: 'none',
                  opacity: 1
                }, p).then(function () {
                  t.setStyle('opacity', 1);
                  windowTrans = false;
                  t.complete();
                  if (parent.style) { parent.style.overflow = overflow; }
                });
              });
            } else {
              t.setStyle({
                transform: 'none',
                opacity: 1
              });
              t.animateStyle({
                transform: 'translate(30%, 0px) scale(1.1, 1.1)',
                opacity: 0
              }, p).then(function () {
                windowTrans = false;
                t.complete();
                if (parent.style) { parent.style.overflow = overflow; }
              });
            }
          },
          slide: function slide(t, params) {
            var p = t.processParams(params, { duration: 400, easing: 'easeInOut' });
            var parent = t.node.parentNode;
            var overflow = parent.style ? parent.style.overflow : '';
            var done = function () {
              t.complete();
              if (parent.style) { setTimeout(function () { return parent.style.overflow = overflow; }); }
            };
            if (parent.style) { parent.style.overflow = 'hidden'; }
            if (t.isIntro || p.intro) {
              if (p.from === 'top') {
                t.setStyle({ transform: 'translateY(-100%)' });
                t.animateStyle({ transform: 'translateY(0)' }, p).then(done);
              } else if (p.from === 'bottom') {
                t.setStyle({ transform: 'translateY(100%)' });
                t.animateStyle({ transform: 'translateY(0)' }, p).then(done);
              } else if (p.from === 'left') {
                t.setStyle({ transform: 'translateX(-100%)' });
                t.animateStyle({ transform: 'translateX(0)' }, p).then(done);
              } else if (p.from === 'right') {
                t.setStyle({ transform: 'translateX(100%)' });
                t.animateStyle({ transform: 'translateX(0)' }, p).then(done);
              }
            } else {
              if (p.from === 'top') {
                t.setStyle({ transform: 'translateY(0)' });
                t.animateStyle({ transform: 'translateY(-100%)' }, p).then(done);
              } else if (p.from === 'bottom') {
                t.setStyle({ transform: 'translateY(0)' });
                t.animateStyle({ transform: 'translateY(100%)' }, p).then(done);
              } else if (p.from === 'left') {
                t.setStyle({ transform: 'translateX(0)' });
                t.animateStyle({ transform: 'translateX(-100%)' }, p).then(done);
              } else if (p.from === 'right') {
                t.setStyle({ transform: 'translateX(0)' });
                t.animateStyle({ transform: 'translateX(100%)' }, p).then(done);
              }
            }
          }
        }
      });

      var id$1 = 0;
      var Host = /*@__PURE__*/(function (Base) {
        function Host(opts) { Base.call(this, opts); this.defaults = {}; }

        if ( Base ) Host.__proto__ = Base;
        Host.prototype = Object.create( Base && Base.prototype );
        Host.prototype.constructor = Host;

        var prototypeAccessors = { current: { configurable: true },currentId: { configurable: true },placement: { configurable: true },topmost: { configurable: true },windows: { configurable: true } };

        prototypeAccessors.current.get = function () {
          var top = this.get('topLevel');
          return this.getWindow(this.get(("windows." + (escape(top)) + ".id")));
        };

        prototypeAccessors.currentId.get = function () {
          var top = this.get('topLevel');
          return this.get(("windows." + (escape(top)) + ".id"));
        };

        prototypeAccessors.placement.get = function () { return this.get('placement'); };
        prototypeAccessors.placement.set = function (v) { return this.set('placement', v); };

        prototypeAccessors.topmost.get = function () {
          var windows = this.get('windows');
          for (var k in windows) {
            if (windows[k].topmost) { return this.getWindow(windows[k].id); }
          }
        };

        prototypeAccessors.windows.get = function () { return Object.keys(this.get('windows')); };

        Host.prototype.addWindow = function addWindow (window, opts) {
          var this$1 = this;

          var options = Object.assign({}, this.defaults, window.constructor.prototype.options, window.options, window.get('options'), opts);

          if (!(window instanceof Window)) {
            throw new Error('Windows must be instances of Window');
          }

          if (!window.id) { window.set('@.id', options.id || ("window" + (id$1++))); }
          if (!this.get(("windows." + (escape(window.id))))) {
            this.set(("windows." + (escape(window.id))), Object.assign({ show: options.show !== false, autosize: true, id: window.id, blockers: [], close: true, minimize: true, maximize: true, minWidth: '5em', minHeight: '5em' }, options, { id: window.id }));
          }

          window.host = this;
          var promise = this.attachChild(window, { target: 'window' });

          var parent;
          if (options.block) {
            parent = options.block.id || options.block;
            if (typeof parent === 'string' && parent in this.get('windows')) {
              this.push(("windows." + (escape(parent)) + ".blockers"), window.id);
              window.set('control.blocking', parent);
            } else { parent = false; }
          }

          window.minSize(options.minWidth || '5em', options.minHeight || '5em');

          if (options.slide) {
          } else if (options.size === 'fill' && (parent || options.block)) {
            var wnd;

            if (options.block === true) { wnd = this.find('.rwhost-pane'); }
            else if (wnd = this.getWindow(parent)) { wnd = wnd.find('.rwindow'); }

            if (wnd) {
              window.size(wnd.clientWidth - (options.fillPad || 20), wnd.clientHeight - (options.fillPad || 20));
              if (options.block && !(options.top || options.left)) {
                options.top = options.left = Math.floor((options.fillPad || 20) / 2);
              }
            }
          } else if (options.width && options.height) {
            window.size(options.width, options.height);
          } else {
            window.size('auto');
          }

          if (options.slide) {
          } else if (options.top && options.left) {
            window.move(options.top, options.left);
          } else {
            this.place(window);
          }

          this.raise(window, { show: options.show !== false, parent: options.stickToParent });

          window.on('close', function () {
            var blocking = window.get('control.blocking');
            if (blocking) {
              var blockers = this$1.windowGet(blocking, 'blockers') || [];
              this$1.splice(("windows." + (escape(blocking)) + ".blockers"), blockers.indexOf(window.id), 1);
            }
            this$1.detachChild(window).then(function () { return window.teardown(); });
            this$1.set(("windows." + (escape(window.id)) + ".block"), false);
            this$1.set(("windows." + (escape(window.id)) + ".index"), -1);
            this$1.raise();
            this$1.set(("windows." + (escape(window.id))), undefined);
            delete this$1.get('windows')[window.id];
          });

          this.update(("windows." + (escape(window.id)) + ".id"), { force: true });

          this.fire('add', {}, { window: window, options: options });

          return promise.then(function () { return window; });
        };

        Host.prototype.getWindow = function getWindow (id) {
          return this.children.byName.window && this.children.byName.window.filter(function (w) { return w.instance.id === id; }).map(function (w) { return w.instance; })[0];
        };

        Host.prototype.windowGet = function windowGet (id, path) {
          return this.get(("windows." + (escape(id)) + "." + path));
        };
        Host.prototype.windowSet = function windowSet (id, path, val) {
          return this.set(("windows." + (escape(id)) + "." + path), val);
        };

        Host.prototype.raise = function raise (window, opts) {
          var this$1 = this;
          if ( opts === void 0 ) opts = {};

          var wnd = window instanceof Window ? window : this.children.byName.window.filter(function (a) { return a.instance.id === window; }).map(function (a) { return a.instance; })[0];
          var object = this.get('windows', { virtual: false });
          var wnds = Object.keys(object).map(function (k) { return object[k]; });
          var top = (wnds.length + 1) * 2;
          var last = this.get('topLevel');
          var wasBlocked = this.get('blocked');
          var id = wnd ? wnd.get('control.id') : wnds.reduce(function (a, c) { return !a ? c : c.index > a.index ? c : a; }, null);

          if (!wnd && id) { wnd = this.children.byName.window.find(function (a) { return a.instance.id === id; }); }

          function blocks(ctrl) {
            if (ctrl.blockers) {
              ctrl.blockers.forEach(function (b, i) {
                var w = wnds.find(function (w) { return w.id === b; });
                if (!w) { return; }
                w.index = ctrl.index + i + 1;
                blocks(w);
              });
            }
          }

          function liftBlocked(control, pos) {
            if (!control) { return; }
            control.index = pos--;
            if (control.blocking) { liftBlocked(wnds.find(function (w) { return w.id === control.blocking; }), pos); }
            blocks(control);
          }

          if (wnd) {
            var ctrl = wnd.get('control');
            ctrl.index = opts.show === false ? -1 : top;
            blocks(ctrl);
            if (ctrl.blocking) { liftBlocked(wnds.find(function (w) { return w.id === ctrl.blocking; }), top - 1); }
            if (opts.show !== false && !ctrl.show) { wnd.show(); }
          }

          wnds.filter(function (w) { return w.show !== false && w.block === true; }).forEach(function (w) {
            this$1.set(("windows." + (escape(w.id)) + ".index"), (w.index || 0) + top);
            blocks(w);
          });

          var ordered = wnds.sort(function (l, r) { return !l.show ? -1 : !r.show ? 1 : l.index < r.index ? -1 : 1; });
          var visible = ordered.filter(function (w) { return w.show; });
          top = ordered.indexOf(visible[visible.length - 1]);
          var sets = {};

          var modalIdx = null;
          ordered.forEach(function (w, i) {
            var key = escape(w.id);
            if (w.block === true && modalIdx === null) { modalIdx = i; }
            sets[("windows." + key + ".index")] = w.index = modalIdx !== null ? i + 2 : i;
            sets[("windows." + key + ".topmost")] = i === top;
            sets[("windows." + key + ".stack")] = ordered.length - i;
          });

          if (modalIdx !== null) {
            sets.blocked = modalIdx + 1;
          } else {
            sets.blocked = 0;
          }

          if (~top && ordered.length) { sets.topLevel = ordered[top].id; }
          else { sets.topLevel = null; }

          this.set(sets);

          top = sets.topLevel;
          if (top && top !== last && this.get('currentMax') && this.rendered) {
            var leaving = this.get(("windows." + (escape(last))));
            wnd = this.getWindow(top);
            var transition = this.get('transition');
            if (transition !== false && !wnd.get('control.slide') && (!leaving || (!leaving.dialog && !leaving.slide) && (!leaving.blocking || (leaving.blocking && leaving.blocking !== top)))) { wnd.transition(transition || 'window', wnd.find('div'), { intro: true }); }
          }

          this.fire('raise', {}, { top: this.topmost });
          if (last !== this.get('topLevel')) {
            var wnd$1 = this.current;
            wnd$1 && wnd$1.fire('raise', {}, { last: this.getWindow(last) });
          }
        };

        Host.prototype.place = function place (wnd) {
          var this$1 = this;

          if (!wnd.get('control.show')) { return Promise.resolve(); }
          return new Promise(function (ok) {
            requestAnimationFrame(function () {
              var local = wnd.get('control');
              if (local.width === undefined) { wnd.size('auto'); }
              var left = 0;
              var top = 0;

              if (!(this$1.fragment && this$1.fragment.rendered)) { return; }

              var host = this$1.find('.rwhost');
              var maxw = host.clientWidth;
              var maxh = host.clientHeight;

              // if it's blocking, center on blocked
              var blocking = local.blocking;
              if (blocking) {
                var key = "windows." + (escape(blocking));
                var blocked = this$1.get(key);
                var max = local.max || (!local.dialog && (this$1.get('max') || this$1.get('userMax')));
                var bmax = blocked.max || this$1.get('userMax') || this$1.get('max');
                var bw = bmax ? this$1.host.clientWidth : this$1.sizeInPx(((blocked.width) + "em"));
                var bh = bmax ? this$1.host.clientHeight : this$1.sizeInPx(((blocked.height) + "em"));
                var bl = bmax ? 0 : blocked.left;
                var bt = bmax ? 0 : blocked.top;

                left = (max ? maxw : bw / 2) + (max ? 0 : bl) - (this$1.sizeInPx(((local.width) + "em")) / 2);
                top = (max ? maxh : bh / 2) + (max ? 0 : bt) - (this$1.sizeInPx(((local.height) + "em")) / 2);
              }

              // place in 3x3 grid
              else {
                var place = this$1.get('placement');
                var pos;
                if (typeof place === 'function') {
                  try {
                    pos = place(this$1, host, local);
                  } catch (e) {
                    pos = placeGrid(this$1, host, local);
                  }
                } else if (typeof place === 'string') {
                  switch (place) {
                    case 'smart':
                      pos = placeSmart(this$1, host, local);
                      break;
                    default:
                      pos = placeGrid(this$1, host, local);
                      break;
                  }
                } else {
                  pos = placeGrid(this$1, host, local);
                }
                top = pos.top;
                left = pos.left;
              }

              if (isNaN(left) || left < 0) { left = 10; }
              if (isNaN(top) || top < 0) { top = 10; }

              wnd.set({
                'control.top': top,
                'control.left': left
              });

              ok();
            });
          });
        };

        Host.prototype.sizeInPx = function sizeInPx (size) {
          if (!this.sizer) { return parseFloat(size) * 16; }
          this.sizer.style.width = typeof size === 'number' ? (size + "px") : size;
          return this.sizer.clientWidth;
        };

        Host.prototype.sizeInEm = function sizeInEm (size) {
          var px = this.sizeInPx(size);
          return px / this.sizeInPx('1em');
        };

        Object.defineProperties( Host.prototype, prototypeAccessors );

        return Host;
      }(Base));

      function placeGrid(host, target, node) {
        var maxw = target.clientWidth;
        var maxh = target.clientHeight;
        var top = 0, left = 0;
        //if (host._grid1 > 8) host._grid2 > 8 ? host._grid2 = 0 : ++host._grid2;
        var grid1 = host._grid1 === undefined ? (host._grid1 = 0) : host._grid1 > 7 ? (host._grid1 = 0) : ++host._grid1;
        // ignoring, for now
        //const grid2 = host._grid2 || (host._grid2 = 0);

        var width = Math.floor(maxw / 3);
        var height = Math.floor(maxh / 3);
        var localWidth = host.sizeInPx(node.width + 'em');
        var localHeight = host.sizeInPx(node.height + 'em');

        switch (grid1) {
          case 5: case 7: case 8:
            top = maxh - localHeight - 10;
            break;
          case 2: case 4: case 6:
            top = height + Math.floor((height - localHeight) / 2);
            break;
          case 0: case 1: case 3:
            top = 10;
            break;
        }

        switch (grid1) {
          case 3: case 6: case 8:
            left = maxw - localWidth - 10;
            break;
          case 1: case 4: case 7:
            left = width + Math.floor((width - localWidth) / 2);
            break;
          case 0: case 2: case 5:
            left = 10;
            break;
        }

        if (left + localWidth > maxw) { left = maxw - localWidth - 10; }
        if (top + localHeight > maxh) { top = maxh - localHeight - 10; }

        return { top: top, left: left };
      }

      function placeSmart(host, target, node) {
        var maxw = target.clientWidth - 10;
        var maxh = target.clientHeight - 10;
        var i, j;
        var cell = 16;
        var mh = Math.floor(maxh / cell), mw = Math.floor(maxw / cell);
        var grid = new Array(mh * mw);
        var dest = new Array(mh * mw);

        // init grid
        for (i = 0; i < grid.length; i++) {
          grid[i] = 0;
        }

        // fill in grid with window coords
        var win, t, l, w, h, wins = 0;
        var windows = host.get('windows');
        for (var k in windows) {
          wins++;
          win = windows[k];
          t = Math.floor(win.top / cell); l = Math.floor(win.left / cell); h = Math.ceil(host.sizeInPx(win.height + 'em') / cell); w = Math.ceil(host.sizeInPx(win.width + 'em') / cell);
          for (i = t; i < t + h && i < mh; i++) {
            for (j = l; j < l + w && j < mw; j++) {
              grid[i * mw + j]++;
            }
          }
        }

        // compute each cell
        var c, ii, jj;
        w = Math.ceil(host.sizeInPx(node.width + 'em') / cell);
        h = Math.ceil(host.sizeInPx(node.height + 'em') / cell);
        for (i = 0; i < mh; i++) {
          for (j = 0; j < mw; j++) {
            if (i + h > mh || j + w > mw) { c = wins * w * h; }
            else {
              c = 0;
              for (ii = 0; ii < h; ii++) {
                for (jj = 0; jj < w; jj++) {
                  c += grid[(i + ii) * mw + j + jj];
                }
              }
            }
            if (c === 0) { return { top: i * cell + 5, left: j * cell + 5 }; }
            dest[i * mw + j] = c;
          }
        }

        // if there were no blanks, find the smallest overlap
        c = wins * w * h;
        ii = 0;
        for (i = 0; i < dest.length; i++) {
          if (dest[i] < c) {
            c = dest[i];
            ii = i;
          }
        }

        return { top: Math.floor(ii / mw) * cell + 5, left: (ii % mw) * cell + 5 };
      }

      Base.extendWith(Host, {
        template: {v:4,t:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwhost",g:1},{n:"tracked",t:71,f:{r:[],s:"[\"host\"]"}},{t:16,r:"extra-attributes"}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwhost-sizer",g:1},{n:"tracked",t:71,f:{r:[],s:"[\"sizer\"]"}}]}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-max-top",g:1},{t:4,f:[{t:16,r:"~/_maxAttrsP"}],n:50,r:"~/_maxAttrsP"}],f:[{t:16,r:"~/_maxP",z:[{n:"window",x:{r:"~/current"}},{n:"windowControls",x:{x:{r:["@this.partials.windowControls"],s:"{t:_0}"}}},{n:"host",x:{r:"@this"}}]}]}],n:50,x:{r:["~/currentMax","~/_maxP"],s:"_0&&_1"}}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rwhost-pane",g:1},{n:"class-rwhost-blocked",t:13,f:[{t:2,r:"~/blocked"}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwhost-pane-content",g:1}],f:[{t:16}]}," ",{t:4,f:[{t:11,n:"window",m:[{n:"control",f:[{t:2,rx:{r:"~/windows",m:[{t:30,n:".instance.id"}]}}],t:13},{n:"root",t:13,f:[{t:2,r:"~/"}]}]}],n:52,r:"@this.children.byName.window"}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rwhost-modal",g:1},{n:"tracked",t:71,f:{r:[],s:"[\"modalPane\"]"}},{t:4,f:[{n:"class-rwhost-modal-active",t:13},{n:"style-z-index",f:[{t:2,r:"~/blocked"}],t:13}],n:50,r:"~/blocked"}]}]}," ",{t:8,r:"toast"}]}],e:{"[\"host\"]":function (){return(["host"]);},"[\"sizer\"]":function (){return(["sizer"]);},"{t:_0}":function (_0){return({t:_0});},"_0&&_1":function (_0,_1){return(_0&&_1);},"[\"modalPane\"]":function (){return(["modalPane"]);},"[_0.getWindow(_1).hide()]":function (_0,_1){return([_0.getWindow(_1).hide()]);},"!_0&&_1":function (_0,_1){return(!_0&&_1);},"[_0.getWindow(_1).maximize()]":function (_0,_1){return([_0.getWindow(_1).maximize()]);},"!_0&&_1&&_2":function (_0,_1,_2){return(!_0&&_1&&_2);},"[_0.getWindow(_1).close()]":function (_0,_1){return([_0.getWindow(_1).close()]);},"[\"top\"]":function (){return(["top"]);},"[_0.hide()]":function (_0){return([_0.hide()]);},"[_0.maximize()]":function (_0){return([_0.maximize()]);},"[_0.close()]":function (_0){return([_0.close()]);},"!((_0||_1||_2)&&_3&&!_4)&&!_5&&!_6":function (_0,_1,_2,_3,_4,_5,_6){return(!((_0||_1||_2)&&_3&&!_4)&&!_5&&!_6);},"[\"content\"]":function (){return(["content"]);},"!_0":function (_0){return(!_0);},"[_0.call(_1)]":function (_0,_1){return([_0.call(_1)]);},"[\"wrapper\"]":function (){return(["wrapper"]);},"_0!==false":function (_0){return(_0!==false);},"_0||_1":function (_0,_1){return(_0||_1);},"(_0||_1||_2)&&!_3&&!_4":function (_0,_1,_2,_3,_4){return((_0||_1||_2)&&!_3&&!_4);},"[{from:_0}]":function (_0){return([{from:_0}]);},"[_0._startResize(_1)]":function (_0,_1){return([_0._startResize(_1)]);},"[_0._sizeHandle(_1)]":function (_0,_1){return([_0._sizeHandle(_1)]);},"[_0._startMove(_1)]":function (_0,_1){return([_0._startMove(_1)]);},"!(_4===false||((_0||_1)&&!_3)||_2)&&(!_3||_4===true)&&!_5":function (_0,_1,_2,_3,_4,_5){return(!(_4===false||((_0||_1)&&!_3)||_2)&&(!_3||_4===true)&&!_5);},"[_0.raise()]":function (_0){return([_0.raise()]);},"[\"pane\"]":function (){return(["pane"]);},"_0&&!_1":function (_0,_1){return(_0&&!_1);}},p:{title:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-title",g:1}],f:[{t:3,r:"~/control.title"}]}],n:50,r:"~/control.title"}],windowControls:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-controls",g:1}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-minimize",g:1},{n:["click"],t:70,f:{r:["host","window.id"],s:"[_0.getWindow(_1).hide()]"}}]}],n:50,x:{r:["window.dialog","window.minimize"],s:"!_0&&_1"}}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-maximize",g:1},{n:["click"],t:70,f:{r:["host","window.id"],s:"[_0.getWindow(_1).maximize()]"}}]}],n:50,x:{r:["window.dialog","window.maximize","host.data.userMax"],s:"!_0&&_1&&_2"}}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-close",g:1},{n:["click"],t:70,f:{r:["host","window.id"],s:"[_0.getWindow(_1).close()]"}}]}],n:50,r:"window.close"}]}],pane:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-pane-top",g:1},{n:"tracked",t:71,f:{r:[],s:"[\"top\"]"}}],f:[{t:8,r:"title"}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-controls",g:1}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-minimize",g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.hide()]"}}]}],n:50,x:{r:["~/control.dialog","~/control.minimize"],s:"!_0&&_1"}}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-maximize",g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.maximize()]"}}]}],n:50,x:{r:["~/control.dialog","~/control.maximize"],s:"!_0&&_1"}}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-close",g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.close()]"}}]}],n:50,r:"~/control.close"}]}]}],n:50,x:{r:["~/control.max","~/root.userMax","~/root.max","~/root.hideTitleMax","~/control.dialog","~/control.hideTitle","~/control.slide"],s:"!((_0||_1||_2)&&_3&&!_4)&&!_5&&!_6"}}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-content",g:1},{n:"tracked",t:71,f:{r:[],s:"[\"content\"]"}},{n:"class-rwindow-pad",t:13,f:[{t:2,r:"~/control.pad"}]},{n:"class-rwindow-flex",t:13,f:[{t:2,r:"~/control.flex"}]},{t:4,f:[{n:"style-overflow",f:"visible",t:13}],n:50,r:"~/control.autosize"}],f:[{t:8,r:"contents"}]}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-buttons",g:1},{n:"class-no-buttons",t:13,f:[{t:2,x:{r:["~/visibleButtons"],s:"!_0"}}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-left-buttons",g:1}],f:[{t:4,f:[{t:4,f:[{t:8,r:".partial"}],n:50,r:".partial"},{t:4,f:[{t:7,e:"button",m:[{n:"button",t:71},{n:["click"],t:70,f:{r:[".action","@"],s:"[_0.call(_1)]"}},{t:4,f:[{n:"class",f:[{t:2,r:".class"}],t:13}],n:50,r:".class"}],f:[{t:2,r:".label"}]}],n:51,l:1}],n:52,r:"~/leftButtons"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-center-buttons",g:1}],f:[{t:4,f:[{t:4,f:[{t:8,r:".partial"}],n:50,r:".partial"},{t:4,f:[{t:7,e:"button",m:[{n:"button",t:71},{n:["click"],t:70,f:{r:[".action","@"],s:"[_0.call(_1)]"}},{t:4,f:[{n:"class",f:[{t:2,r:".class"}],t:13}],n:50,r:".class"}],f:[{t:2,r:".label"}]}],n:51,l:1}],n:52,r:"~/centerButtons"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-right-buttons",g:1}],f:[{t:4,f:[{t:4,f:[{t:8,r:".partial"}],n:50,r:".partial"},{t:4,f:[{t:7,e:"button",m:[{n:"button",t:71},{n:["click"],t:70,f:{r:[".action","@"],s:"[_0.call(_1)]"}},{t:4,f:[{n:"class",f:[{t:2,r:".class"}],t:13}],n:50,r:".class"}],f:[{t:2,r:".label"}]}],n:51,l:1}],n:52,r:"~/rightButtons"}]}]}],n:50,r:"~/buttons"}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-pane-bottom",g:1}],f:[{t:8,r:"status"}]}],window:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-wrapper",g:1},{n:"tracked",t:71,f:{r:[],s:"[\"wrapper\"]"}},{t:4,f:[" ",{t:4,f:[{n:"window",t:72,v:"t2"}],n:50,x:{r:["~/root.transition"],s:"_0!==false"}}," ",{t:4,f:[{n:"style-top",f:"0",t:13},{n:"style-left",f:"0",t:13},{n:"style-width",f:"100%",t:13},{n:"style-height",f:"100%",t:13}],n:51,x:{r:["~/control.autosize","~/control.dialog"],s:"_0||_1"}},{n:"class-rwindow-max",t:13}],n:50,x:{r:["~/root.max","~/root.userMax","~/control.max","~/control.dialog","~/control.slide"],s:"(_0||_1||_2)&&!_3&&!_4"}},{t:4,f:[{n:"class",f:["rwindow-slide rwindow-slide-",{t:2,r:"~/control.slide"}],t:13},{n:"slide",t:72,f:{r:["~/control.slide"],s:"[{from:_0}]"},v:"t0"}],n:50,r:"~/control.slide",l:1},{t:4,f:[" ",{t:4,f:[{n:"modal",t:72,v:"t0"}],n:50,x:{r:["~/root.transition"],s:"_0!==false"}}," ",{t:4,f:[{n:"class-rwindow-resizable",t:13},{n:["mousedown","touchstart"],t:70,f:{r:["@this","@event"],s:"[_0._startResize(_1)]"}},{n:["mousemove","mouseout"],t:70,f:{r:["@this","@event"],s:"[_0._sizeHandle(_1)]"}}],n:50,r:"~/control.resizable"}," ",{t:4,f:[{n:"class-rwindow-resizing",t:13}],n:50,r:"~/control.resizing"},{n:"style-top",f:[{t:2,r:"~/control.top"},"px"],t:13},{n:"style-left",f:[{t:2,r:"~/control.left"},"px"],t:13},{t:4,f:[{n:"style-width",f:[{t:2,r:"~/control.width"},"em"],t:13},{n:"style-height",f:[{t:2,r:"~/control.height"},"em"],t:13}],n:51,r:"~/control.autosize"}],n:51,l:1},{n:"style-z-index",f:[{t:2,r:"~/control.index"}],t:13},{n:"class-rwindow-topmost",t:13,f:[{t:2,r:"~/control.topmost"}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow",g:1},{t:4,f:[{n:["mousedown","touchstart"],t:70,f:{r:["@this","@event"],s:"[_0._startMove(_1)]"}}],n:50,x:{r:["~/root.max","~/root.userMax","~/control.max","~/control.dialog","~/control.movable","~/control.slide"],s:"!(_4===false||((_0||_1)&&!_3)||_2)&&(!_3||_4===true)&&!_5"}},{t:4,f:[{n:["mousedown","touchstart"],t:70,f:{r:["@this"],s:"[_0.raise()]"}}],n:50,x:{r:["~/control.topmost"],s:"!_0"},l:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-modal",g:1},{n:"class-rwindow-blocked",t:13,f:[{t:2,x:{r:["~/control.blockers.length","~/control.blocked"],s:"_0||_1"}}]}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-pane",g:1},{n:"tracked",t:71,f:{r:[],s:"[\"pane\"]"}},{t:4,f:[{n:"class-rwindow-autosizing",t:13}],n:50,x:{r:["~/control.autosize","~/control.slide"],s:"_0&&!_1"}}],f:[{t:8,r:"pane"}]}]}]}],n:50,r:"~/control.show"}]}},
        use: [plugin$1(), plugin()],
        cssId: 'window-host',
        noIntro: true,
        attributes: ['placement', 'windows', 'transition'],
        observe: {
          '@style.raui.window.maxFrom': function _style_raui_window_maxFrom() {
            initMediaListener(this);
          },
          topLevel: function topLevel(v) {
            if (v) {
              this.link(("windows." + (escape(v))), 'current');
            } else {
              this.unlink('current');
            }
          },
          currentMax: {
            handler: function handler(v) {
              (this.children.byName.window || []).forEach(function (w) { return w.instance.fire('resize'); });
            },
            defer: true
          }
        },
        computed: {
          currentMax: function currentMax() {
            var top = this.get('topLevel');
            var max = this.get(("windows." + (escape(top)) + ".max"));
            var user = this.get('userMax');
            return user || this.get('max') || max;
          }
        },
        on: {
          config: function config() {
            var this$1 = this;

            var content = this.partials.content;
            if (content && Array.isArray(content)) {
              content = this.partials.content = content.slice();
              var i = content.length;
              while (i--) {
                var e = content[i];
                if (e.e === 'max-top') {
                  content.splice(i, 1);
                  this.set({
                    _maxP: { t: e.f },
                    hideTitleMax: true
                  });
                  if (e.m) {
                    this.set({
                      _maxAttrsP: { t: e.m }
                    });
                  }
                }
              }
            }

            if (typeof window !== 'undefined') {
              var tm;
              this._resizeListener = function () {
                if (tm) { return; }
                tm = setTimeout(function () {
                  tm = null;
                  this$1.fire('resize');
                }, 300);
              };
              window.addEventListener('resize', this._resizeListener);
            }
          },
          teardown: function teardown() {
            if (this._resizeListener) {
              window.removeEventListener('resize', this._resizeListener);
            }
          }
        }
      });

      function initMediaListener(r) {
        if (r._media) {
          r._media.fn();
        } else {
          r._media = {};
          r._media.fn = function () {
            if (!r.host) { return; }
            var max = r.sizeInPx(r.get('@style.raui.window.maxFrom'));
            var trans = r.transitionsEnabled;
            r.transitionsEnabled = false;
            r.set('max', r.host.clientWidth <= max);
            r.set('dimensions', { clientWidth: r.host.clientWidth, clientHeight: r.host.clientHeight });
            r.transitionsEnabled = trans;
          };
          r._media.handle = r.root.on('*.resize', r._media.fn);
          setTimeout(r._media.fn);
        }
      }

      function getEventCoords(event) {
        var node = event.target;
        if (!node) { return { x: 0, y: 0 }; }
        var rect = node.getBoundingClientRect();
        return { x: Math.round(rect.left + (rect.right - rect.left) / 2), y: Math.round(rect.top + (rect.bottom - rect.top) / 2) };
      }

      Ractive$2.transitions.modal = function(t, parms) {
        var params = t.processParams(parms, { duration: 400, easing: 'easeOut', x: 0, y: -50, event: true });
        var event = null;//params.event ? findEvent(this) : null;

        var current = { x: t.node.offsetLeft, y: t.node.offsetTop };

        var styles;
        var overflow = t.node.parentNode.style ? t.node.parentNode.style.overflow : 'hidden';

        if (!event && !t.node._modalSrc) {
          if (t.isIntro) {
            styles = { transform: 'translate(0, 0) scale(1, 1)', opacity: 1 };
            t.setStyle({ transform: ("translate(" + (params.x) + "px, " + (params.y) + "px) scale(0.5, 0.5)"), opacity: 0 });
          } else {
            styles = { transform: ("translate(" + (params.x) + "px, " + (params.y) + "px) scale(0.5, 0.5)"), opacity: 0 };
          }
        } else {
          var click = t.node._modalSrc || (event ? getEventCoords(event) : { x: current.x + params.x, y: current.y + params.y });

          var target = { x: click.x - Math.round(t.node.clientWidth / 2) - current.x, y: click.y - Math.round(t.node.clientHeight / 2) - current.y };

          if (t.node.parentNode.style) { t.node.parentNode.style.overflow = 'hidden'; }

          if (t.isIntro) {
            t.node._modalSrc = click;
            styles = { transform: 'translate(0, 0) scale(1, 1)', opacity: 1 };
            t.setStyle({ transform: ("translate(" + (target.x) + "px, " + (target.y) + "px) scale(0.5, 0.5)"), opacity: 0 });
          } else {
            styles = { transform: ("translate(" + (target.x) + "px, " + (target.y) + "px) scale(0.5, 0.5)"), opacity: 0 };
          }
        }

        t.animateStyle(styles, params).then(function () {
          if (t.node.parentNode.style) { t.node.parentNode.style.overflow = overflow; }
          t.complete();
        });
      };

      var moveEvents = ['mousemove', 'mouseup', 'touchmove', 'touchend'];
      var handleSize = 7;

      var Window = /*@__PURE__*/(exports('Window', function (Base) {
        function Window(opts) { Base.call(this, opts); }

        if ( Base ) Window.__proto__ = Base;
        Window.prototype = Object.create( Base && Base.prototype );
        Window.prototype.constructor = Window;

        var prototypeAccessors$1 = { resizable: { configurable: true },title: { configurable: true },visible: { configurable: true },pad: { configurable: true },buttons: { configurable: true },blocked: { configurable: true },result: { configurable: true } };

        prototypeAccessors$1.resizable.get = function () { return this.get('control.resizable'); };
        prototypeAccessors$1.resizable.set = function (v) { return this.set('control.resizable', v); };
        prototypeAccessors$1.title.get = function () { return this.get('control.title'); };
        prototypeAccessors$1.title.set = function (v) { return this.set('control.title', v); };
        prototypeAccessors$1.visible.get = function () { return this.get('control.show'); };
        prototypeAccessors$1.visible.set = function (v) {
          if (v) { this.show(); }
          else { this.set('control.show', v, { keep: true }); }
          this.host.raise(this, { show: v });
        };
        prototypeAccessors$1.pad.get = function () { return this.get('pad'); };
        prototypeAccessors$1.pad.set = function (v) { this.set('pad', v); };
        prototypeAccessors$1.buttons.get = function () { return this.get('buttons'); };
        prototypeAccessors$1.buttons.set = function (v) { return this.set('buttons', v); };
        prototypeAccessors$1.blocked.get = function () { return this.get('control.blocked'); };
        prototypeAccessors$1.blocked.set = function (v) { return this.set('control.blocked', v); };

        prototypeAccessors$1.result.get = function () {
          var this$1 = this;

          if (!this._result) {
            this._result = {};
            this._result.promise = new Promise(function (ok) {
              this$1._result.ok = ok;
            });
          }
          return this._result.promise;
        };

        Window.prototype.setResult = function setResult (v) {
          this.result;
          this._result.value = v;
        };

        Window.prototype.close = function close (force, result) {
          if (force !== true) {
            if (!this.parent) { return false; }
            if (this.get('control.blockers.length')) { return false; }
            if (typeof this.beforeClose === 'function' && this.beforeClose() === false) { return false; }
            if (this.fire('beforeClose') === false) { return false; }
          }

          this.fire('close');
          if (this._result) { this._result.ok(this._result.value || result); }

          return true;
        };

        Window.prototype.maximize = function maximize () {
          this.toggle('root.userMax');
        };

        Window.prototype.hide = function hide () { this.visible = false; };

        Window.prototype.raise = function raise (show) {
          this.host.raise(this, { show: show });
        };

        Window.prototype.show = function show () {
          this.set('control.show', true);
          if (this.get('control.top') === undefined) {
            this.host.place(this);
          }
        };

        Window.prototype.size = function size (w, h) {
          var this$1 = this;

          return new Promise(function (ok) {
            requestAnimationFrame(function () {
              if (!this$1.visible) {
                if (typeof w === 'number' && typeof h === 'number') {
                  this$1.set({
                    'control.width': this$1.host.sizeInEm(w),
                    'control.height': this$1.host.sizeInEm(h),
                    'control.naturalWidth': this$1.host.sizeInEm(w),
                    'control.naturalHeight': this$1.host.sizeInEm(h),
                    'control.autosize': false
                  });
                }
                return ok();
              }

              var el = this$1.wrapper;
              if (!el) { return ok(); }

              if (w === 'auto') {
                this$1.set('control.autosize', true);
                var nw = this$1.host.sizeInEm(el.clientWidth + 16);
                var nh = this$1.host.sizeInEm(el.clientHeight);
                this$1.set({
                  'control.width': nw,
                  'control.height': nh,
                  'control.naturalWidth': nw,
                  'control.naturalHeight': nh,
                  'control.autosize': false
                });
              }

              else if (typeof w === 'number' && typeof h === 'number') {
                this$1.set({
                  'control.width': this$1.host.sizeInEm(w),
                  'control.height': this$1.host.sizeInEm(h),
                  'control.naturalWidth': this$1.host.sizeInEm(w),
                  'control.naturalHeight': this$1.host.sizeInEm(h),
                  'control.autosize': false
                });
              }

              else if (typeof w === 'string' && typeof h === 'string') {
                var ow = el.style.width;
                var oh = el.style.height;
                el.style.width = w;
                el.style.height = h;
                var nw$1 = el.clientWidth;
                var nh$1 = el.clientHeight;
                el.style.width = ow;
                el.style.height = oh;

                this$1.set({
                  'control.width': this$1.host.sizeInEm(nw$1),
                  'control.height': this$1.host.sizeInEm(nh$1),
                  'control.naturalWidth': this$1.host.sizeInEm(nw$1),
                  'control.naturalHeight': this$1.host.sizeInEm(nh$1),
                  'control.autosize': false
                });
              }

              var hel = this$1.host.host;
              if (hel) {
                var maxw = this$1.host.sizeInEm(hel.clientWidth - 16);
                var maxh = this$1.host.sizeInEm(hel.clientHeight - 16);
                if (this$1.get('control.width') > maxw) { this$1.set('control.width', maxw); }
                if (this$1.get('control.height') > maxh) { this$1.set('control.height', maxh); }
              }
              var minw = this$1.get('control.minWidth') || 5;
              var minh = this$1.get('control.minHeight') || 5;
              if (this$1.get('control.width') < minw) { this$1.set('control.width', minw); }
              if (this$1.get('control.height') < minh) { this$1.set('control.height', minh); }

              this$1.fire('resize');

              ok();
            });
          });
        };

        Window.prototype.minSize = function minSize (w, h) {
          var this$1 = this;

          return new Promise(function (ok) {
            requestAnimationFrame(function () {
              if (!this$1.visible) {
                if (typeof w === 'number' && typeof h === 'number') {
                  this$1.set({
                    'control.minWidth': this$1.host.sizeInEm(w),
                    'control.minHeight': this$1.host.sizeInEm(h),
                  });
                }
                return ok();
              }

              var el = this$1.wrapper;
              if (!el) { return ok(); }

              if (w === 'auto') {
                var auto = this$1.get('control.autosize');
                this$1.set('control.autosize', true);
                var nw = this$1.host.sizeInEm(el.clientWidth + 16);
                var nh = this$1.host.sizeInEm(el.clientHeight);
                this$1.set({
                  'control.minWidth': nw,
                  'control.minHeight': nh,
                  'control.autosize': auto
                });
              }

              else if (typeof w === 'number' && typeof h === 'number') {
                this$1.set({
                  'control.minWidth': this$1.host.sizeInEm(w),
                  'control.minHeight': this$1.host.sizeInEm(h),
                });
              }

              else if (typeof w === 'string' && typeof h === 'string') {
                var ow = el.style.width;
                var oh = el.style.height;
                el.style.width = w;
                el.style.height = h;
                var nw$1 = el.clientWidth;
                var nh$1 = el.clientHeight;
                el.style.width = ow;
                el.style.height = oh;

                this$1.set({
                  'control.minWidth': this$1.host.sizeInEm(nw$1),
                  'control.minHeight': this$1.host.sizeInEm(nh$1),
                });
              }

              ok();
            });
          });
        };

        Window.prototype.move = function move (top, left) {
          var this$1 = this;

          return new Promise(function (ok) {
            requestAnimationFrame(function () {
              if (top === 'center') { top = (this$1.host.modalPane.clientHeight / 2) - (this$1.wrapper.clientHeight / 2); }
              else if (typeof top === 'string') { top = this$1.host.sizeInEm(top); }

              if (left === 'center') { left = (this$1.host.modalPane.clientWidth / 2) - (this$1.wrapper.clientWidth / 2); }
              if (typeof left === 'string') { left = this$1.host.sizeInEm(left); }

              var set = {};

              if (typeof top === 'number') { set['control.top'] = top; }
              if (typeof left === 'number') { set['control.left'] = left; }

              this$1.set(set);

              ok();
            });
          });
        };

        Window.prototype._startMove = function _startMove (event) {
          var this$1 = this;

          if (event.type === 'mousedown' && event.button !== 0) { return; }
          if (!this.get('control.topmost')) { this.raise(); }
          if (~event.type.indexOf('mouse')) {
            if (!this.top || (!event.ctrlKey && event.target !== this.content && event.target !== this.top && !this.top.contains(event.target))) { return; }
          } else {
            if (event.targetTouches && event.targetTouches.length === 1 && event.target !== this.content && event.target !== this.top && !this.top.contains(event.target)) { return; }
          }

          var wnd = this.pane;
          var cursor = wnd.style.cursor;
          wnd.style.cursor = 'move';
          wnd.style.userSelect = 'none';

          var sx = event.x || event.clientX || (event.targetTouches && event.targetTouches[0].clientX) || 0;
          var sy = event.y || event.clientY || (event.targetTouches && event.targetTouches[0].clientY) || 0;
          var ox = this.get('control.left') || 0;
          var oy = this.get('control.top') || 0;
          var ow = wnd.clientWidth;
          var oh = wnd.clientHeight;

          var _move = function (ev) {
            var x = ev.x || ev.clientX || (ev.targetTouches && ev.targetTouches[0] && ev.targetTouches[0].clientX) || (ev.changedTouches && ev.changedTouches[0].clientX) || 0;
            var y = ev.y || ev.clientY || (ev.targetTouches && ev.targetTouches[0] && ev.targetTouches[0].clientY) || (ev.changedTouches && ev.changedTouches[0].clientY) || 0;

            var nx = ox + (x - sx);
            var ny = oy + (y - sy);
            if (nx < (ow < 30 ? 0 : 30 - ow)) { nx = ow < 30 ? 0 : 30 - ow; }
            if (ny < (oh < 30 ? 0 : 30 - oh)) { ny = oh < 30 ? 0 : 30 - oh; }
            if (nx < 0) { nx = 0; }
            if (ny < 0) { ny = 0; }

            this$1.set({
              'control.top': ny,
              'control.left': nx
            });

            if (ev.type === 'touchend' || ev.type === 'mouseup') {
              moveEvents.forEach(function (e) { return document.removeEventListener(e, _move, { passive: false }); });
              wnd.style.cursor = cursor;
              wnd.style.userSelect = '';
            } else {
              ev.preventDefault();
            }
          };

          moveEvents.forEach(function (e) { return document.addEventListener(e, _move, { passive: false }); });

          if (event.type.indexOf('mouse') === 0) { return false; }
        };

        Window.prototype._startResize = function _startResize (event) {
          var this$1 = this;

          if (event.target !== this.wrapper) { return; }
          if (event.type === 'mousedown' && event.button !== 0) { return; }

          if (this.get('control.autosize')) {
            this.size('auto');
          }

          if (!this.get('control.topmost')) { this.raise(); }

          this.set('control.resizing', true);

          var el = this.wrapper;
          var ix = event.offsetX || (event.targetTouches && (event.targetTouches[0].pageX - el.getBoundingClientRect().left));
          var iy = event.offsetY || (event.targetTouches && (event.targetTouches[0].pageY - el.getBoundingClientRect().top));
          var size = this.get('@style.window.handleSize') || handleSize;
          var right = el.clientWidth - size * 2, bottom = el.clientHeight - size * 2;
          var min = 2 * size;

          var l = ix <= min || ix >= right;
          var t = iy <= min || iy >= bottom;

          var sx = event.x || event.clientX || (event.targetTouches && event.targetTouches[0].clientX) || 0;
          var sy = event.y || event.clientY || (event.targetTouches && event.targetTouches[0].clientY) || 0;

          var ox = this.get('control.left') || 0;
          var oy = this.get('control.top') || 0;
          var ow = this.host.sizeInPx(this.get('control.width') + 'em');
          var oh = this.host.sizeInPx(this.get('control.height') + 'em');
          var nh = this.host.sizeInPx(this.get('control.minHeight') + 'em');
          var nw = this.host.sizeInPx(this.get('control.minWidth') + 'em');

          var tm;
          var _resize = function (ev) {
            ev.preventDefault();

            var x = ev.x || ev.clientX || (ev.targetTouches && ev.targetTouches[0] && ev.targetTouches[0].clientX) || (ev.changedTouches && ev.changedTouches[0].clientX) || 0;
            var y = ev.y || ev.clientY || (ev.targetTouches && ev.targetTouches[0] && ev.targetTouches[0].clientY) || (ev.changedTouches && ev.changedTouches[0].clientY) || 0;

            var dx = l ? x - sx : 0;
            var dy = t ? y - sy : 0;

            // resizing from top/left requires top/left/width/height adjustments
            var set = {};

            if (iy <= size) {
              set['control.top'] = oy + dy;
              set['control.height'] = oh - dy;
            } else {
              set['control.height'] = oh + dy;
            }

            if (ix <= size) {
              set['control.left'] = ox + dx;
              set['control.width'] = ow - dx;
            } else {
              set['control.width'] = ow + dx;
            }

            if (set['control.width'] < nw) {
              delete set['control.width'];
              delete set['control.left'];
            }

            if (set['control.height'] < nh) {
              delete set['control.height'];
              delete set['control.top'];
            }

            if (set['control.left'] < 0) { set['control.left'] = 0; }
            if (set['control.top'] < 0) { set['control.top'] = 0; }

            if (set['control.width']) { set['control.width'] = this$1.host.sizeInEm(set['control.width']); }
            if (set['control.height']) { set['control.height'] = this$1.host.sizeInEm(set['control.height']); }

            this$1.set(set);

            if (ev.type === 'touchend' || ev.type === 'mouseup') {
              moveEvents.forEach(function (e) { return document.removeEventListener(e, _resize, { passive: false }); });
              this$1.set('control.resizing', false);
              if (ow !== this$1.get('control.width') || oh !== this$1.get('control.height')) {
                if (tm) { clearTimeout(tm); }
                tm = null;
                this$1.fire('resize');
              }
            } else {
              if (!tm) {
                tm = setTimeout(function () {
                  this$1.fire('resize');
                  tm = null;
                }, 200);
              }
            }
          };

          moveEvents.forEach(function (e) { return document.addEventListener(e, _resize, { passive: false }); });

          return false;
        };

        Window.prototype._sizeHandle = function _sizeHandle (event) {
          if (event.target !== this.wrapper) { return; }
          var el = this.wrapper;

          if (event.type === 'mouseout') { return el.style.cursor = 'auto'; }

          var x = event.offsetX, y = event.offsetY;
          var size = this.get('@style.window.handleSize') || handleSize;
          var right = el.clientWidth - size, bottom = el.clientHeight - size;

          var style = el.style;
          if ((x <= size + size && y <= size + size) || (x >= right - size && y >= bottom - size)) {
            style.cursor = 'nwse-resize';
          } else if ((x >= right - size && y <= size + size) || (x <= size + size && y >= bottom - size)) {
            style.cursor = 'nesw-resize';
          } else if ((x <= size || x >= right) && (y < bottom || y > size)) {
            style.cursor = 'ew-resize';
          } else if ((y <= size || y >= bottom) && (x < right || x > size)) {
            style.cursor = 'ns-resize';
          } else {
            style.cursor = 'auto';
          }
        };

        Object.defineProperties( Window.prototype, prototypeAccessors$1 );

        return Window;
      }(Base)));

      var buttonAttrs = [ 'left', 'right', 'center', 'condition' ];
      Base.extendWith(Window, {
        template: {v:4,t:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-wrapper",g:1},{n:"tracked",t:71,f:{r:[],s:"[\"wrapper\"]"}},{t:4,f:[" ",{t:4,f:[{n:"window",t:72,v:"t2"}],n:50,x:{r:["~/root.transition"],s:"_0!==false"}}," ",{t:4,f:[{n:"style-top",f:"0",t:13},{n:"style-left",f:"0",t:13},{n:"style-width",f:"100%",t:13},{n:"style-height",f:"100%",t:13}],n:51,x:{r:["~/control.autosize","~/control.dialog"],s:"_0||_1"}},{n:"class-rwindow-max",t:13}],n:50,x:{r:["~/root.max","~/root.userMax","~/control.max","~/control.dialog","~/control.slide"],s:"(_0||_1||_2)&&!_3&&!_4"}},{t:4,f:[{n:"class",f:["rwindow-slide rwindow-slide-",{t:2,r:"~/control.slide"}],t:13},{n:"slide",t:72,f:{r:["~/control.slide"],s:"[{from:_0}]"},v:"t0"}],n:50,r:"~/control.slide",l:1},{t:4,f:[" ",{t:4,f:[{n:"modal",t:72,v:"t0"}],n:50,x:{r:["~/root.transition"],s:"_0!==false"}}," ",{t:4,f:[{n:"class-rwindow-resizable",t:13},{n:["mousedown","touchstart"],t:70,f:{r:["@this","@event"],s:"[_0._startResize(_1)]"}},{n:["mousemove","mouseout"],t:70,f:{r:["@this","@event"],s:"[_0._sizeHandle(_1)]"}}],n:50,r:"~/control.resizable"}," ",{t:4,f:[{n:"class-rwindow-resizing",t:13}],n:50,r:"~/control.resizing"},{n:"style-top",f:[{t:2,r:"~/control.top"},"px"],t:13},{n:"style-left",f:[{t:2,r:"~/control.left"},"px"],t:13},{t:4,f:[{n:"style-width",f:[{t:2,r:"~/control.width"},"em"],t:13},{n:"style-height",f:[{t:2,r:"~/control.height"},"em"],t:13}],n:51,r:"~/control.autosize"}],n:51,l:1},{n:"style-z-index",f:[{t:2,r:"~/control.index"}],t:13},{n:"class-rwindow-topmost",t:13,f:[{t:2,r:"~/control.topmost"}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow",g:1},{t:4,f:[{n:["mousedown","touchstart"],t:70,f:{r:["@this","@event"],s:"[_0._startMove(_1)]"}}],n:50,x:{r:["~/root.max","~/root.userMax","~/control.max","~/control.dialog","~/control.movable","~/control.slide"],s:"!(_4===false||((_0||_1)&&!_3)||_2)&&(!_3||_4===true)&&!_5"}},{t:4,f:[{n:["mousedown","touchstart"],t:70,f:{r:["@this"],s:"[_0.raise()]"}}],n:50,x:{r:["~/control.topmost"],s:"!_0"},l:1}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-modal",g:1},{n:"class-rwindow-blocked",t:13,f:[{t:2,x:{r:["~/control.blockers.length","~/control.blocked"],s:"_0||_1"}}]}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-pane",g:1},{n:"tracked",t:71,f:{r:[],s:"[\"pane\"]"}},{t:4,f:[{n:"class-rwindow-autosizing",t:13}],n:50,x:{r:["~/control.autosize","~/control.slide"],s:"_0&&!_1"}}],f:[{t:8,r:"pane"}]}]}]}],n:50,r:"~/control.show"}]},
        cssId: 'window',
        partials: {
          pane: {v:4,t:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-pane-top",g:1},{n:"tracked",t:71,f:{r:[],s:"[\"top\"]"}}],f:[{t:8,r:"title"}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-controls",g:1}],f:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-minimize",g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.hide()]"}}]}],n:50,x:{r:["~/control.dialog","~/control.minimize"],s:"!_0&&_1"}}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-maximize",g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.maximize()]"}}]}],n:50,x:{r:["~/control.dialog","~/control.maximize"],s:"!_0&&_1"}}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-close",g:1},{n:["click"],t:70,f:{r:["@this"],s:"[_0.close()]"}}]}],n:50,r:"~/control.close"}]}]}],n:50,x:{r:["~/control.max","~/root.userMax","~/root.max","~/root.hideTitleMax","~/control.dialog","~/control.hideTitle","~/control.slide"],s:"!((_0||_1||_2)&&_3&&!_4)&&!_5&&!_6"}}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-content",g:1},{n:"tracked",t:71,f:{r:[],s:"[\"content\"]"}},{n:"class-rwindow-pad",t:13,f:[{t:2,r:"~/control.pad"}]},{n:"class-rwindow-flex",t:13,f:[{t:2,r:"~/control.flex"}]},{t:4,f:[{n:"style-overflow",f:"visible",t:13}],n:50,r:"~/control.autosize"}],f:[{t:8,r:"contents"}]}," ",{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-buttons",g:1},{n:"class-no-buttons",t:13,f:[{t:2,x:{r:["~/visibleButtons"],s:"!_0"}}]}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-left-buttons",g:1}],f:[{t:4,f:[{t:4,f:[{t:8,r:".partial"}],n:50,r:".partial"},{t:4,f:[{t:7,e:"button",m:[{n:"button",t:71},{n:["click"],t:70,f:{r:[".action","@"],s:"[_0.call(_1)]"}},{t:4,f:[{n:"class",f:[{t:2,r:".class"}],t:13}],n:50,r:".class"}],f:[{t:2,r:".label"}]}],n:51,l:1}],n:52,r:"~/leftButtons"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-center-buttons",g:1}],f:[{t:4,f:[{t:4,f:[{t:8,r:".partial"}],n:50,r:".partial"},{t:4,f:[{t:7,e:"button",m:[{n:"button",t:71},{n:["click"],t:70,f:{r:[".action","@"],s:"[_0.call(_1)]"}},{t:4,f:[{n:"class",f:[{t:2,r:".class"}],t:13}],n:50,r:".class"}],f:[{t:2,r:".label"}]}],n:51,l:1}],n:52,r:"~/centerButtons"}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-right-buttons",g:1}],f:[{t:4,f:[{t:4,f:[{t:8,r:".partial"}],n:50,r:".partial"},{t:4,f:[{t:7,e:"button",m:[{n:"button",t:71},{n:["click"],t:70,f:{r:[".action","@"],s:"[_0.call(_1)]"}},{t:4,f:[{n:"class",f:[{t:2,r:".class"}],t:13}],n:50,r:".class"}],f:[{t:2,r:".label"}]}],n:51,l:1}],n:52,r:"~/rightButtons"}]}]}],n:50,r:"~/buttons"}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-pane-bottom",g:1}],f:[{t:8,r:"status"}]}]}.t,
          title: {v:4,t:[{t:4,f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rwindow-title",g:1}],f:[{t:3,r:"~/control.title"}]}],n:50,r:"~/control.title"}]}.t,
          contents: {v:4,t:""}.t,
          status: {v:4,t:""}.t
        },
        data: function data() {
          return {
            buttons: [],
            visibleButtons: 0
          }
        },
        computed: {
          leftButtons: function leftButtons() {
            return (this.get('buttons') || []).filter(function (b) { return b.where === 'left'; });
          },
          centerButtons: function centerButtons() {
            return (this.get('buttons') || []).filter(function (b) { return b.where === 'center'; });
          },
          rightButtons: function rightButtons() {
            return (this.get('buttons') || []).filter(function (b) { return !b.where || b.where === 'right'; });
          }
        },
        decorators: {
          button: function button(node) {
            var ctx = this.getContext(node);

            ctx.add('visibleButtons');

            return {
              update: function update() {},
              teardown: function teardown() { ctx.subtract('visibleButtons'); }
            };
          }
        },
        on: {
          config: function config() {
            var parent = Window.prototype.template;
            var child = this.template;
            if (typeof parent !== 'string' && !Array.isArray(parent) && parent.t) { parent = parent.t; }
            if (typeof child !== 'string' && !Array.isArray(child) && child.t) { child = child.t; }

            if (parent !== child) {
              if (!this.partials.hasOwnProperty('contents')) { this.partials.contents = child; }
              this.template = parent;
            }
          },
          construct: function construct() {
            var wnd = this.constructor;
            if (!wnd._constructed) {
              wnd._constructed = 1;
              var tpl = wnd.prototype.template.t.slice();
              var btns = tpl.find(function (e) { return e.e === 'buttons'; });
              wnd.prototype.template.t = tpl.filter(function (e) { return e.e !== 'buttons'; });

              function mapButton(b) {
                var attrs = b.m || [];
                var res = {
                  partial: { t: [{ t: b.t, e: b.e, f: b.f, m: attrs.filter(function (a) { return !~buttonAttrs.indexOf(a.n); }) }] },
                  where: attrs.find(function (a) { return a.n === 'left'; }) ? 'left' : attrs.find(function (a) { return a.n === 'center'; }) ? 'center' : 'right'
                };
                res.partial.t[0].m.push({ t: 71, n: 'button' });
                return res;
              }

              if (btns) {
                wnd._btns = btns.f.filter(function (e) { return e.e === 'button' || (e.t === 4 && (e.n === 50 || e.n === 51) && e.f.find(function (e) { return e.e === 'button'; })); }).map(function (n) {
                  if (n.t === 4) {
                      return n.f.filter(function (e) { return e.e === 'button'; }).map(function (bb) {
                        var b = mapButton(bb);
                        var f = { t: n.t, n: n.n, f: [b.partial.t[0]] };
                        if (n.r) { f.r = n.r; }
                        if (n.rx) { f.rx = n.rx; }
                        if (n.x) { f.x = n.x; }
                        b.partial = { t: [f] };
                        return b;
                      });
                  } else {
                    var b = mapButton(n);
                    return [b];
                  }
                }).reduce(function (a, c) { return a.concat(c); }, []);
              }
            }
          },
          init: function init() {
            var wnd = this.constructor;
            if (wnd._btns && !this.get('buttons.length')) { this.set('buttons', wnd._btns); }
          }
        },
        observe: {
          'control.max root.max root.userMax control.width control.height root.dimensions.clientHeight root.dimensions.clientWidth': {
            handler: function handler(v, o, k) {
              if (!this.get('control.id')) { return; }
              var max = this.get('control.max') || this.get('root.userMax') || this.get('root.max');
              var actual = this.get('control.actual') || {};

              if (max) {
                if (!actual.max) {
                  var root = this.wrapper;
                  if (this.wrapper) {
                    this.set(
                      'control.actual',
                      { width: this.host.sizeInEm(this.wrapper.clientWidth), height: this.host.sizeInEm(this.wrapper.clientHeight), max: max }
                    );
                  }
                } else if (~k.indexOf('client') && typeof v === 'number') {
                  if (~k.indexOf('Width')) { this.set('control.actual.width', this.host.sizeInEm(v)); }
                  else if (~k.indexOf('Height')) { this.set('control.actual.height', this.host.sizeInEm(v)); }
                }
              } else {
                if (typeof v === 'number') {
                  if (~k.indexOf('width')) { this.set('control.actual.width', v); }
                  else if (~k.indexOf('height')) { this.set('control.actual.height', v); }
                }

                if (actual.max) {
                  this.set(
                    'control.actual',
                    { width: this.get('control.width'), height: this.get('control.width'), max: max }
                  );
                }
                this.set('control.actual.max', false);
              }
            },
            init: false, defer: true
          }
        }
      });

      function plugin$2(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.components[opts.name || 'host'] = Host;
        }
      }

      globalRegister('RMWindowHost', 'components', Host);
      globalRegister('RMWindow', 'components', Window);

      Host.prototype.Window = Window;
      exports('default$2', plugin$2);

    }
  };
});
