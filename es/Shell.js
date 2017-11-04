import Ractive$1 from 'ractive';

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

var Shell = (function (Ractive) {
  function Shell(opts) { Ractive.call(this, opts); }

  if ( Ractive ) Shell.__proto__ = Ractive;
  Shell.prototype = Object.create( Ractive && Ractive.prototype );
  Shell.prototype.constructor = Shell;

  return Shell;
}(Ractive$1));

Ractive$1.extendWith(Shell, {
  template: {v:4,t:[{t:7,e:"div",m:[{n:"class-rshell",t:13},{t:16,r:"extra-attributes"}],f:[{t:7,e:"div",m:[{n:"class-rshell-main",t:13}],f:[{t:4,f:[{t:7,e:"div",m:[{n:"class-rshell-top",t:13},{t:4,f:[{t:16,r:"._topA"}],n:50,r:"._topA"}],f:[{t:16,r:"._top"}]}],n:50,r:"._top"}," ",{t:7,e:"div",m:[{n:"class-rshell-has-left",t:13,f:[{t:2,x:{r:["._left","._leftOver",".leftOver"],s:"_0&&!_1&&!_2"}}]},{n:"class-rshell-has-right",t:13,f:[{t:2,x:{r:["._right","._rightOver",".rightOver"],s:"_0&&!_1&&!_2"}}]},{n:"class-rshell-left-hidden",t:13,f:[{t:2,r:".leftHidden"}]},{n:"class-rshell-right-hidden",t:13,f:[{t:2,r:".rightHidden"}]}],f:[{t:7,e:"div",m:[{n:"class-rshell-modal",t:13},{n:"class-rshell-blocked",t:13,f:[{t:2,r:".blocked"}]},{n:["click"],t:70,f:{r:["@this","leftOver","_leftOver","leftHidden","rightOver","_rightOver","rightHidden"],s:"[_0.set({leftHidden:_1||_2?true:_3,rightHidden:_4||_5?true:_6})]"}}]}," ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rshell-left",t:13},{t:4,f:[{t:16,r:"._leftA"}],n:50,r:"._leftA"},{n:["click"],t:70,f:{r:["._leftOver","leftOver","@this"],s:"[(_0||_1)&&_2.toggle(\"leftHidden\")]"}}],f:[{t:16,r:"._left"}]}],n:50,r:"._left"}," ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rshell-center",t:13},{t:4,f:[{t:16,r:"._centerA"}],n:50,r:"._centerA"}],f:[{t:16,r:"._center"}]}],n:50,r:"._center"}," ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rshell-right",t:13},{t:4,f:[{t:16,r:"._rightA"}],n:50,r:"._rightA"},{n:["click"],t:70,f:{r:["._rightOver",".rightOver","@this"],s:"[(_0||_1)&&_2.toggle(\"rightHidden\")]"}}],f:[{t:16,r:"._right"}]}],n:50,r:"._right"}]}," ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rshell-bottom",t:13},{t:4,f:[{t:16,r:"._bottomA"}],n:50,r:"._bottomA"}],f:[{t:16,r:"._bottom"}]}],n:50,r:"._bottom"}]}," ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rshell-left-pop",t:13},{t:4,f:[{t:16,r:"._leftPA"}],n:50,r:"._leftPA"}],f:[{t:16,r:"._leftP"}]}],n:50,r:"._leftP"}," ",{t:4,f:[{t:7,e:"div",m:[{n:"class-rshell-right-pop",t:13},{t:4,f:[{t:16,r:"._rightPA"}],n:50,r:"._rightPA"}],f:[{t:16,r:"._rightP"}]}],n:50,r:"._rightP"}]}],e:{"_0&&!_1&&!_2":function (_0,_1,_2){return(_0&&!_1&&!_2);},"[_0.set({leftHidden:_1||_2?true:_3,rightHidden:_4||_5?true:_6})]":function (_0,_1,_2,_3,_4,_5,_6){return([_0.set({leftHidden:_1||_2?true:_3,rightHidden:_4||_5?true:_6})]);},"[(_0||_1)&&_2.toggle(\"leftHidden\")]":function (_0,_1,_2){return([(_0||_1)&&_2.toggle("leftHidden")]);},"[(_0||_1)&&_2.toggle(\"rightHidden\")]":function (_0,_1,_2){return([(_0||_1)&&_2.toggle("rightHidden")]);}}},
  attributes: [],
  css: function(data) { return [(function(data) {
   var left = data('shell.left.width') || data('menu.width') || '18em';
   var right = data('shell.right.width') || data('menu.width') || '18em';
   return ("\n   .rshell {\n     width: 100%;\n     height: 100%;\n     position: absolute;\n     overflow: hidden;\n   }\n   .rshell-modal {\n     position: absolute;\n     top: 0;\n     left: 0;\n     bottom: 0;\n     right: 0;\n     opacity: 0;\n     background-color: #000;\n     z-index: -1;\n     transition: opacity 0.4s ease-in-out, z-index 0s linear 0.4s;\n   }\n   .rshell-modal.rshell-blocked {\n     opacity: 0.5;\n     z-index: 3;\n     transition: opacity 0.4s ease-in-out, z-index 0s linear;\n   }\n   .rshell-main {\n     width: 100%;\n     height: 100%;\n     box-sizing: border-box;\n     display: flex;\n     overflow: hidden;\n     z-index: 1;\n   }\n \n   .rshell-left, .rshell-right {\n     position: absolute;\n     top: 0;\n     box-sizing: border-box;\n     height: 100%;\n     overflow: auto;\n     z-index: 4;\n     background-color: " + (data('shell.menu.bg') || data('bg1') || 'inherit') + ";\n     transition: transform 0.4s ease-in-out;\n   }\n   .rshell-left {\n     left: 0;\n     width: " + left + ";\n   }\n   .rshell-right {\n     right: 0;\n     width: " + right + ";\n   }\n   .rshell-left-hidden > .rshell-left {\n     transform: translateX(-100%);\n   }\n   .rshell-right-hidden > .rshell-right {\n     transform: translateX(100%);\n   }\n   .rshell-has-right > .rshell-right,\n   .rshell-has-left > .rshell-left {\n     z-index: 1;\n   }\n \n   .rshell-center {\n     position: absolute;\n     top: 0;\n     left: 0;\n     z-index: 1;\n     box-sizing: border-box;\n     transition: left 0.4s ease-in-out, width 0.4s ease-in-out;\n     height: 100%;\n     width: 100%;\n     overflow: auto;\n   }\n   .rshell-has-left > .rshell-center {\n     width: calc(100% - " + left + ");\n     left: " + left + ";\n   }\n   .rshell-has-right > .rshell-center {\n     width: calc(100% - " + right + ");\n     left: 0;\n   }\n   .rshell-has-left.rshell-has-right > .rshell-center {\n     width: calc(100% - " + left + " - " + right + ");\n     left: " + left + ";\n   }\n   .rshell-has-left.rshell-left-hidden > .rshell-center {\n     width: 100%;\n     left: 0;\n   }\n   .rshell-has-right.rshell-right-hidden > .rshell-center {\n     width: 100%;\n   }\n   .rshell-has-left.rshell-has-right.rshell-left-hidden > .rshell-center {\n     width: calc(100% - " + right + ");\n     left: 0;\n   }\n   .rshell-has-left.rshell-has-right.rshell-right-hidden > .rshell-center {\n     width: calc(100% - " + left + ");\n     left: " + left + ";\n   }\n   .rshell-has-left.rshell-has-right.rshell-left-hidden.rshell-right-hidden > .rshell-center {\n     width: 100%;\n     left: 0;\n   }\n   ");
}).call(this, data)].join(' '); },
  cssId: 'rshell',
  noCssTransform: true,
  computed: {
    blocked: {
      get: function get() { return ((this.get('leftOver') || this.get('_leftOver')) && !this.get('leftHidden')) || ((this.get('rightOver') || this.get('_rightOver')) && !this.get('rightHidden')); }
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

globalRegister('RMShell', 'components', Shell);

export default Shell;
