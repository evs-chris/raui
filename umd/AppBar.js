(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ractive')) :
	typeof define === 'function' && define.amd ? define(['ractive'], factory) :
	(global.RMAppBar = factory(global.Ractive));
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

var AppBar = (function (Ractive) {
  function AppBar(opts) { Ractive.call(this, opts); }

  if ( Ractive ) AppBar.__proto__ = Ractive;
  AppBar.prototype = Object.create( Ractive && Ractive.prototype );
  AppBar.prototype.constructor = AppBar;

  return AppBar;
}(Ractive$1));

Ractive$1.extendWith(AppBar, {
  template: {v:4,t:[{t:7,e:"div",m:[{n:"class-rappbar",t:13},{t:16,r:"extra-attributes"}],f:[{t:7,e:"div",m:[{n:"class-rappbar-left",t:13}],f:[{t:4,f:[{t:16,r:"._leftP"}],n:50,r:"._leftP"}]}," ",{t:7,e:"div",m:[{n:"class-rappbar-center",t:13}],f:[{t:4,f:[{t:16,r:"._centerP"}],n:50,r:"._centerP"}]}," ",{t:7,e:"div",m:[{n:"class-rappbar-right",t:13}],f:[{t:4,f:[{t:16,r:"._rightP"}],n:50,r:"._rightP"}]}]}]},
  css: function(data) { return [(function(data) {
   return ("\n   .rappbar {\n     display: flex;\n     padding: 1em;\n     background-color: " + (data('appbar.bg') || data('bg2') || '#07e') + ";\n     color: " + (data('appbar.fg') || data('fg2') || '#f9f9f9') + ";\n   }\n \n   .rappbar-left {\n     flex-grow: 3;\n     display: flex;\n     justify-content: flex-start;\n   }\n \n   .rappbar-right {\n     flex-grow: 3;\n     display: flex;\n     justify-content: flex-start;\n   }\n \n   .rappbar-center {\n     flex-shrink: 1;\n   }\n   ");
}).call(this, data)].join(' '); },
  cssId: 'appbar',
  attributes: [],
  on: {
    config: function config() {
      var this$1 = this;

      var tpl = this.partials.content;
      if (tpl) {
        tpl.forEach(function (e) {
          if (e.e === 'left') { this$1.set('_leftP', { t: e.f }); }
          if (e.e === 'center') { this$1.set('_centerP', { t: e.f }); }
          if (e.e === 'right') { this$1.set('_rightP', { t: e.f }); }
        });
      }
    }
  }
});

globalRegister('RMAppBar', 'components', AppBar);

return AppBar;

})));
