(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ractive')) :
	typeof define === 'function' && define.amd ? define(['ractive'], factory) :
	(global.RMSplit = factory(global.Ractive));
}(this, (function (Ractive$1) { 'use strict';

Ractive$1 = Ractive$1 && Ractive$1.hasOwnProperty('default') ? Ractive$1['default'] : Ractive$1;

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

function sizeHandle(node, vertical) {
  var ctx = this.getContext(node);
  var root = node.parentNode;
  var pos;
  var vert = vertical;
  var posKey = vertical ? 'screenX' : 'screenY';
  var init;

  function start(ev) {
    document.addEventListener('touchmove', move, true);
    document.addEventListener('mousemove', move, true);
    document.addEventListener('mouseup', end, true);
    document.addEventListener('touchend', end, true);

    init = ctx.get('size');

    if (posKey in ev) {
      pos = ev[posKey];
    } else {
      pos = ev.touches[0][posKey];
    }
  }

  function move(ev) {
    var cur = posKey in ev ? ev[posKey] : ev.touches[0][posKey];
    var width = vert ? root.clientWidth : root.clientHeight;
    var target = init + (((cur - pos) / width) * 100);
    if (target < 10) { target = 10; }
    else if (target > 90) { target = 90; }
    ctx.set({
      size: target,
      maxed: false
    });
    ev.preventDefault();
    ev.stopPropagation();
  }

  function end() {
    document.removeEventListener('touchmove', move, true);
    document.removeEventListener('mousemove', move, true);
    document.removeEventListener('mouseup', end, true);
    document.removeEventListener('touchend', end, true);
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
      posKey = vertical ? 'clientX' : 'clientY';
    }
  };
}

var Split = (function (Ractive) {
  function Split(opts) { Ractive.call(this, opts); }

  if ( Ractive ) Split.__proto__ = Ractive;
  Split.prototype = Object.create( Ractive && Ractive.prototype );
  Split.prototype.constructor = Split;

  return Split;
}(Ractive$1));

Ractive$1.extendWith(Split, {
  template: {v:4,t:[{t:7,e:"div",m:[{n:"class-rsplit",t:13},{n:"class-vertical",t:13,f:[{t:2,r:".vertical"}]},{n:"class-horizontal",t:13,f:[{t:2,x:{r:[".vertical"],s:"!_0"}}]},{t:16,r:"extra-attributes"}],f:[{t:7,e:"div",m:[{n:"class",f:"start",t:13},{t:4,f:[{n:"style-width",f:["calc(",{t:2,r:"size"},"% - 6px)"],t:13}],n:50,r:".vertical"},{t:4,n:51,f:[{n:"style-height",f:["calc(",{t:2,r:"size"},"% - 6px)"],t:13}],l:1}],f:[{t:16,r:"start"}]}," ",{t:7,e:"div",m:[{n:"class",f:"sep",t:13},{n:"class-draggable",t:13,f:[{t:2,x:{r:[".noDrag"],s:"!_0"}}]},{t:4,f:[{n:"style-left",f:["calc(",{t:2,r:"size"},"% - 6px)"],t:13}],n:50,r:".vertical"},{t:4,n:51,f:[{n:"style-top",f:["calc(",{t:2,r:"size"},"% - 6px)"],t:13}],l:1},{t:4,f:[{n:"sizeHandle",t:71,f:{r:[".vertical"],s:"[_0]"}}],n:51,r:".noDrag"}],f:[{t:7,e:"div",m:[{n:"class",f:"vsizer",t:13}]},{t:7,e:"div",m:[{n:"class",f:"rs-btns",t:13}],f:[" ",{t:4,f:[{t:7,e:"div",m:[{n:["click"],t:70,f:{r:[],s:"[[\"toStart\"]]"}}],f:["◂"]}],n:51,x:{r:[".noMax",".noMaxStart",".maxed"],s:"_0||_2===1||(_1&&_2!==2)"}}," ",{t:4,f:[{t:7,e:"div",m:[{n:["click"],t:70,f:{r:[],s:"[[\"toEnd\"]]"}}],f:["▸"]}],n:51,x:{r:[".noMax",".noMaxEnd",".maxed"],s:"_0||_2===2||(_1&&_2!==1)"}}]}]}," ",{t:7,e:"div",m:[{n:"class",f:"end",t:13},{t:4,f:[{n:"style-width",f:["calc(",{t:2,x:{r:["size"],s:"100-_0"}},"% - 6px"],t:13}],n:50,r:".vertical"},{t:4,n:51,f:[{n:"style-height",f:["calc(",{t:2,x:{r:["size"],s:"100-_0"}},"% - 6px)"],t:13}],l:1}],f:[{t:16,r:"end"}]}]}],e:{"!_0":function (_0){return(!_0);},"[_0]":function (_0){return([_0]);},"[[\"toStart\"]]":function (){return([["toStart"]]);},"_0||_2===1||(_1&&_2!==2)":function (_0,_1,_2){return(_0||_2===1||(_1&&_2!==2));},"[[\"toEnd\"]]":function (){return([["toEnd"]]);},"_0||_2===2||(_1&&_2!==1)":function (_0,_1,_2){return(_0||_2===2||(_1&&_2!==1));},"100-_0":function (_0){return(100-_0);}}},
  decorators: { sizeHandle: sizeHandle },
  noCssTransform: true,
  cssId: 'split',
  css: function(data) { return [" .rsplit { position: relative; width: 100%; height: 100%; } .rsplit > .start, .rsplit > .end, .rsplit > .sep { position: absolute; overflow: auto; } .rsplit.vertical > .start { top: 0; left: 0; height: 100%; } .rsplit.horizontal > .start { top: 0; left: 0; width: 100%; } .rsplit.vertical > .end { top: 0; right: 0; height: 100%; } .rsplit.horizontal > .end { right: 0; bottom: 0; width: 100%; } .rsplit.vertical > .sep { top: 0; bottom: 0; width: 12px; } .rsplit.vertical > .sep.draggable { cursor: ew-resize; } .rsplit.horizontal > .sep { left: 0; right: 0; height: 12px; } .rsplit.horizontal > .sep.draggable { cursor: ns-resize; }", (function(data) {
   return ("\n   .rsplit > .sep {\n     background-color: " + (data('split.color.bg') || 'rgba(0, 0, 0, 0.1)') + ";\n     color: " + (data('split.color.fg') || 'rgba(0, 0, 0, 0.7)') + ";\n     text-align: center;\n     overflow: hidden;\n     touch-action: none;\n   }\n   ");
}).call(this, data), " .rsplit > .sep .vsizer { display: inline-block; vertical-align: middle; height: 100%; } .rsplit > .sep .rs-btns { display: inline-block; vertical-align: middle; } .rsplit > .sep .rs-btns div { display: inline-block; width: 10px; height: 10px; vertical-align: top; line-height: 10px; cursor: pointer; opacity: 0.3; transition: opacity 0.2s ease-in-out; } .rsplit > .sep .rs-btns div:hover { opacity: 1; } .rsplit.vertical > .sep .rs-btns div { margin: 1em 0; } .rsplit.horizontal > .sep .rs-btns div { margin: 0 1em; transform: rotate(90deg); }"].join(' '); },
  attributes: [ 'size', 'vertical', 'noDrag', 'noMax', 'noMaxStart', 'noMaxEnd' ],
  data: function data() {
    return {
      size: 50,
      noDrag: false,
      noMaxStart: false,
      noMaxEnd: false
    };
  },
  on: {
    config: config,
    'toStart toEnd': function toStarttoEnd(ctx) {
      if (this.get('maxed')) {
        this.animate('size', this.get('last'), { duration: 200, easing: 'easeInOut' });
        this.set('maxed', false);
        return false;
      }

      this.set('last', this.get('size'));
      this.set('maxed', ctx.name === 'toStart' ? 1 : 2);

      var root = this.find('div');
      var size = this.get('vertical') ? root.clientWidth : root.clientHeight;
      this.animate('size', ((ctx.name === 'toEnd' ? size - 6 : 6) / size) * 100, { duration: 200, easing: 'easeInOut' });

      return false;
    }
  },
  observe: {
    'size vertical': {
      init: false,
      handler: function handler() {
        var this$1 = this;

        this._resizeM = true;

        if (this._resizeT) {
          return;
        }

        var fire = function () {
          this$1._resizeT = false;
          if (this$1._resizeM) {
            this$1._resizeM = false;
            this$1.fire('resize');
            this$1._resizeT = setTimeout(fire, 200);
          }
        };

        fire();
      }
    }
  }
});

function config() {
  var tpl = this.partials.content;
  if (tpl) {
    var panes = tpl.filter(function (n) { return n.e === 'pane'; });
    if (!this.partials.start && panes[0]) {
      this.partials.start = panes.shift().f;
    }
    if (!this.partials.end && panes[0]) {
      this.partials.end = panes[0].f;
    }
  }
}

globalRegister('RMSplit', 'components', Split);

return Split;

})));
