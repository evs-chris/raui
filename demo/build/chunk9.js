System.register(['ractive', './chunk2.js'], function (exports, module) {
  'use strict';
  var Ractive$1, globalRegister;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      globalRegister = module.default;
    }],
    execute: function () {

      var Split = (function (Ractive) {
          function Split(opts) { Ractive.call(this, opts); }

          if ( Ractive ) Split.__proto__ = Ractive;
          Split.prototype = Object.create( Ractive && Ractive.prototype );
          Split.prototype.constructor = Split;

          Split.prototype._adjustSizes = function _adjustSizes () {
            var this$1 = this;

            this._sizing = true;
            var splits = this.get('splits');
            var count = 0;
            var used = 0;

            splits.forEach(function (s) {
              var size = s.sizePath ? this$1.get(s.sizePath) : s.size;
              if (s.curSize === undefined) {
                if (s.min) {
                  s.curSize = 0;
                  s.lastSize = Math.floor(100 / splits.length);
                } else {
                  s.curSize = size;
                  used += size;
                  count++;
                }
              } else if (s.min && s.curSize) {
                s.lastSize = s.curSize;
                s.curSize = 0;
              } else if (!s.min && !s.curSize && s.lastSize) {
                used += s.lastSize;
                s.curSize = s.lastSize;
                s.lastSize = false;
              } else if (s.curSize) {
                used += s.curSize;
                count++;
              }
            });

            var offset = (100 - used) / count;

            var sets = {};
            splits.forEach(function (s, i) {
              sets[s.sizePath ? s.sizePath : ("splits." + i + ".size")] = s.curSize;
              sets[("splits." + i + ".curSize")] = (s.lastSize === false || !s.curSize) ? s.curSize : s.curSize + offset;
              if (!s.lastSize) { s.lastSize = null; }
            });

            this.set(sets);
            setTimeout(function () { return this$1.fire('resize'); }, 320);
            this._sizing = false;
          };

          Split.prototype.maximize = function maximize (idx) {
            if (this.get(("splits." + idx + ".min"))) { this.toggle(("splits." + idx + ".min")); }
            else { this.toggle(("splits." + (idx + 1) + ".min")); }
            this._adjustSizes();
          };

          Split.prototype.minimize = function minimize (idx) {
            if (this.get(("splits." + (idx + 1) + ".min"))) { this.toggle(("splits." + (idx + 1) + ".min")); }
            else { this.toggle(("splits." + idx + ".min")); }
            this._adjustSizes();
          };

          return Split;
        }(Ractive$1));

        Ractive$1.extendWith(Split, {
          template: {v:4,t:[{t:7,e:"div",m:[{n:"class-rsplit",t:13},{n:"class-rsplit-vertical",t:13,f:[{t:2,r:"vertical"}]},{n:"class-rsplit-horizontal",t:13,f:[{t:2,x:{r:["vertical"],s:"!_0"}}]},{n:"class-rsplit-draggable",t:13,f:[{t:2,r:"draggable"}]},{t:16,r:"extra-attributes"}],f:["\n",{t:4,f:["    ",{t:7,e:"div",m:[{n:"class-rsplit-split",t:13},{t:4,f:[{n:"style-transition",f:"width 0.3s ease-in-out, height 0.3s ease-in-out",t:13}],n:51,r:"~/dragging"},{t:4,f:[{n:"style-width",f:["calc(",{t:2,r:".curSize"},"% - ",{t:2,x:{r:["@style.split.handle.width","@last"],s:"_1*(_0||14)/(_1+1)"}},"px)"],t:13}],n:50,r:"~/vertical"},{t:4,f:[{n:"style-height",f:["calc(",{t:2,r:".curSize"},"% - ",{t:2,x:{r:["@style.split.handle.width","@last"],s:"_1*(_0||14)/(_1+1)"}},"px)"],t:13}],n:51,l:1},{t:4,f:[{t:16,r:".attrs"}],n:50,r:".attrs"}],f:["\n      ",{t:16,r:".content"},"\n    "]},"\n",{t:4,f:["      ",{t:7,e:"div",m:[{n:"class-rsplit-sep",t:13},{t:4,f:[{n:"sizeHandle",t:71,f:{r:["~/vertical","@index"],s:"[_0,_1]"}}],n:50,x:{r:[".",".draggable","~/draggable"],s:"\"draggable\" in _0?_1:_2"}}],f:["\n          ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rsplit-sep-max",t:13},{n:["click"],t:70,f:{r:["@this","@index"],s:"[_0.maximize(_1)]"}}],f:[{t:7,e:"div",m:[{n:"class-rsplit-sep-max-btn",t:13}]}]}],n:50,x:{r:[".",".maximizable","~/maximizable",".min","@index","../"],s:"\"maximizable\" in _0?_1:_2&&(_3||!_5[_4+1].min)"}},"\n          ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rsplit-sep-min",t:13},{n:["click"],t:70,f:{r:["@this","@index"],s:"[_0.minimize(_1)]"}}],f:[{t:7,e:"div",m:[{n:"class-rsplit-sep-min-btn",t:13}]}]}],n:50,x:{r:[".",".minimizable","~/minimizable",".min"],s:"\"minimizable\" in _0?_1:_2&&!_3"}},"\n      "]},"\n"],n:50,x:{r:["@index","@last"],s:"_0!==_1"}}],n:52,r:"splits"}]}],e:{"!_0":function (_0){return(!_0);},"_1*(_0||14)/(_1+1)":function (_0,_1){return(_1*(_0||14)/(_1+1));},"[_0,_1]":function (_0,_1){return([_0,_1]);},"\"draggable\" in _0?_1:_2":function (_0,_1,_2){return("draggable" in _0?_1:_2);},"[_0.maximize(_1)]":function (_0,_1){return([_0.maximize(_1)]);},"\"maximizable\" in _0?_1:_2&&(_3||!_5[_4+1].min)":function (_0,_1,_2,_3,_4,_5){return("maximizable" in _0?_1:_2&&(_3||!_5[_4+1].min));},"[_0.minimize(_1)]":function (_0,_1){return([_0.minimize(_1)]);},"\"minimizable\" in _0?_1:_2&&!_3":function (_0,_1,_2,_3){return("minimizable" in _0?_1:_2&&!_3);},"_0!==_1":function (_0,_1){return(_0!==_1);}}}, css: function(data) { return [" .rsplit { position: absolute; width: 100%; height: 100%; flex-grow: 1; display: flex; } .rsplit.rsplit-vertical { flex-direction: row; } .rsplit.rsplit-horizontal { flex-direction: column; } .rsplit > .rsplit-split { display: inline-block; overflow: auto; position: relative; } .rsplit.rsplit-vertical > .rsplit-split { height: 100%; } .rsplit.rsplit-horizontal > .rsplit-split { width: 100%; } .rsplit.rsplit-draggable.rsplit-vertical > .rsplit-sep { cursor: ew-resize; } .rsplit.rsplit-draggable.rsplit-horizontal > .rsplit-sep { cursor: ns-resize; } .rsplit > .rsplit-sep { display: flex; justify-content: center; overflow: hidden; touch-action: none; flex-shrink: 0; } .rsplit.rsplit-vertical > .rsplit-sep { flex-direction: column; } .rsplit > .rsplit-sep .rsplit-sep-max, .rsplit > .rsplit-sep .rsplit-sep-min { text-align: center; display: inline-block; position: relative; cursor: pointer; } .rsplit.rsplit-horizontal > .rsplit-sep .rsplit-sep-max, .rsplit.rsplit-horizontal > .rsplit-sep .rsplit-sep-min { width: 3em; height: 100%; margin: 0 1em; } .rsplit.rsplit-vertical > .rsplit-sep .rsplit-sep-max, .rsplit.rsplit-vertical > .rsplit-sep .rsplit-sep-min { width: 100%; height: 1em; padding: 1em 0; margin: 0.5em 0; } .rsplit > .rsplit-sep .rsplit-sep-max-btn, .rsplit > .rsplit-sep .rsplit-sep-min-btn { display: inline-block; border-style: solid; position: relative; width: 0; height: 0; box-sizing: border-box; } ", (function(data) {



        return ("\n\n  .rsplit > .rsplit-sep {\n\n    background-color: " + (data('split.handle.bg') || 'rgba(0, 0, 0, 0.1)') + ";\n\n    color: " + (data('split.handle.fg') || 'rgba(0, 0, 0, 0.4)') + ";\n\n  }\n\n\n\n  .rsplit.rsplit-vertical > .rsplit-sep {\n\n    width: " + (data('split.handle.width') || 14) + "px;\n\n    height: 100%;\n\n  }\n\n\n\n  .rsplit.rsplit-horizontal > .rsplit-sep {\n\n    height: " + (data('split.handle.width') || 14) + "px;\n\n    width: 100%;\n\n  }\n\n\n\n  .rsplit > .rsplit-sep {\n\n    font-size: " + (data('split.handle.width') || 14) + "px;\n\n  }\n\n\n\n  .rsplit > .rsplit-sep .rsplit-sep-max-btn,\n\n  .rsplit > .rsplit-sep .rsplit-sep-min-btn {\n\n    border-width: " + ((data('split.handle.width') || 14) / 2) + "px;\n\n  }\n\n\n\n  .rsplit.rsplit-horizontal > .rsplit-sep .rsplit-sep-max-btn {\n\n    top: " + ((data('split.handle.width') || 14) / 4) + "px;\n\n    border-right-color: transparent;\n\n    border-bottom-color: transparent;\n\n    border-left-color: transparent;\n\n  }\n\n\n\n  .rsplit.rsplit-horizontal > .rsplit-sep .rsplit-sep-min-btn {\n\n    bottom: " + ((data('split.handle.width') || 14) / 4) + "px;\n\n    border-top-color: transparent;\n\n    border-right-color: transparent;\n\n    border-left-color: transparent;\n\n  }\n\n\n\n  .rsplit.rsplit-vertical > .rsplit-sep .rsplit-sep-max-btn {\n\n    left: " + ((data('split.handle.width') || 14) / 4) + "px;\n\n    border-top-color: transparent;\n\n    border-right-color: transparent;\n\n    border-bottom-color: transparent;\n\n  }\n\n\n\n  .rsplit.rsplit-vertical > .rsplit-sep .rsplit-sep-min-btn {\n\n    right: " + ((data('split.handle.width') || 14) / 4) + "px;\n\n    border-top-color: transparent;\n\n    border-bottom-color: transparent;\n\n    border-left-color: transparent;\n\n  }\n\n  ");


      }).call(this, data)].join(' '); },
          cssId: 'split',
          noCssTransform: true,
          attributes: ['vertical', 'draggable', 'maximizable', 'minimizable'],
          data: function data() {
            return {
              draggable: true,
              maximizable: true,
              minimizable: true
            }
          },
          decorators: {
            sizeHandle: sizeHandle
          },
          on: {
            construct: function construct() {
              var this$1 = this;

              var cmp = this.component;
              if ( !cmp ) { return; }

              var tpl = cmp.template.f || [];
              var attrs = cmp.template.m ? cmp.template.m.slice() : [];
              var t = cmp.template;
              cmp.template = { e: t.e, f: t.f, t: t.t, m: attrs };

              var id = 0;
              function map(attr, partial) {
                if (attr && attr.f && attr.f.length === 1 && attr.f[0].t === 2) {
                  var n = "_a" + (id++);
                  attrs.push({ t: 13, n: n, f: attr.f });
                  return partial ? { t: [{ t: 2, r: ("~/" + n) }] } : { t: 2, r: ("~/" + n) };
                }
                return attr && attr.f;
              }

              var splits = tpl.filter(function (e) { return e.e; });

              this._mappedSizes = [];
              this._splits = splits.map(function (e, i) {
                var attrs = (e.m || []).slice();
                var el = { e: e.e, f: e.f, t: e.t, m: attrs.filter(function (a) { return a.n !== 'size' && a.n !== 'minimize'; }) };

                var res = {
                  content: el.e === 'pane' ? el.f : [el]
                };

                if (el.e === 'pane') {
                  if (el.m) { res.attrs = el.m.slice(); }
                }

                var size = attrs.find(function (a) { return a.n === 'size'; });
                if (size) {
                  if (size.f && typeof size.f[0] === 'string') { res.size = +size.f[0]; }
                  else {
                    res.sizePath = map(size).r;
                    this$1._mappedSizes.push(res.sizePath);
                  }
                }

                if (attrs.find(function (a) { return a.n === 'minimize'; })) { res.min = true; }

                return res;
              });

              this._splits.forEach(function (s) {
                if (!('size' in s)) { s.size = 100 / this$1._splits.length; }
              });
            },
            config: function config() {
              if (this._splits) { this.set('splits', this._splits); }
            },
            init: function init() {
              var this$1 = this;

              this.observe(this._mappedSizes.concat('splits.*.size').join(' '), function () {
                if (this$1._sizing || this$1._tm) { return; }
                this$1._tm = setTimeout(function () {
                  this$1._adjustSizes();
                  this$1._tm = null;
                });
              });
            }
          }
        });

        function sizeHandle(node, vertical, startIdx) {
          var ctx = this.getContext(node);
          var startSplit = ctx.get(("../" + startIdx));
          var endSplit = ctx.get(("../" + (startIdx + 1)));
          var root = node.parentNode;

          var pos, initStart, initEnd, available;
          var vert = vertical;
          var posKey = vert ? 'screenX' : 'screenY';

          var tm;

          function start(ev) {
            if (ev.target !== node && ev.target.parentNode !== node) { return; }
            ctx.ractive._sizing = true;
            ctx.set('~/dragging', true);
            available = vert ? root.clientWidth : root.clientHeight;

            document.addEventListener('touchmove', move, true);
            document.addEventListener('mousemove', move, true);
            document.addEventListener('mouseup', end, true);
            document.addEventListener('touchend', end, true);

            initStart = startSplit.curSize;
            initEnd = endSplit.curSize;

            if (posKey in ev) {
              pos = ev[posKey];
            } else {
              pos = ev.touches[0][posKey];
            }

            ev.preventDefault();
          }

          function move(ev) {
            var obj;

            var cur = posKey in ev ? ev[posKey] : ev.touches[0][posKey];
            var dist = cur - pos;

            var moved, s, e;
            moved = (Math.abs(dist) / available) * 100;

            if (dist < 0) {
              s = initStart - moved;
              e = initEnd + moved;
            } else {
              s = initStart + moved;
              e = initEnd - moved;
            }

            if (s < startSplit.min || 0) {
              e -= startSplit.min - s;
              s += startSplit.min - s;
            }

            if (e < endSplit.min || 0) {
              s -= endSplit.min - e;
              e += endSplit.min - e;
            }

            if (s < 0) {
              s = 0;
              e = initStart + initEnd;
            }
            if (e < 0) {
              s = initStart + initEnd;
              e = 0;
            }

            ctx.set(( obj = {}, obj[startSplit.sizePath ? ("~/" + (startSplit.sizePath)) : ("../" + startIdx + ".size")] = s, obj[endSplit.sizePath ? ("~/" + (endSplit.sizePath)) : ("../" + (startIdx + 1) + ".size")] = e, obj[("../" + startIdx + ".curSize")] = s, obj[("../" + startIdx + ".min")] = false, obj[("../" + (startIdx + 1) + ".curSize")] = e, obj[("../" + (startIdx + 1) + ".min")] = false, obj));

            if (!tm) {
              setTimeout(function () {
                ctx.ractive.fire('resize');
                tm = null;
              }, 300);
            }
          }

          function end() {
            ctx.ractive._sizing = false;
            ctx.set('~/dragging', false);
            document.removeEventListener('touchmove', move, true);
            document.removeEventListener('mousemove', move, true);
            document.removeEventListener('mouseup', end, true);
            document.removeEventListener('touchend', end, true);
            if (tm) { clearTimeout(tm); }
            ctx.ractive.fire('resize');
          }

          ctx.listen('mousedown', start);
          ctx.listen('touchstart', start);

          return {
            teardown: function teardown() {
              ctx.unlisten('mousedown', start);
              ctx.unlisten('touchstart', start);
              end();
            },
            update: function update(vertical) {
              vert = vertical;
              posKey = vertical ? 'screenX' : 'screenY';
            }
          };
        }

        function plugin(opts) {
          if ( opts === void 0 ) opts = {};

          return function(ref) {
            var instance = ref.instance;

            instance.components[opts.name || 'split'] = Split;
          }
        }

        globalRegister('RMSplit', 'components', Split);
      exports('default', plugin);

    }
  };
});
