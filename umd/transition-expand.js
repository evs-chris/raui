(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.RM_transition_expand = factory());
}(this, (function () { 'use strict';

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
  t.setStyle('overflow', 'hidden');
  var axis = p.axis === 'x' ? 'width' : 'height';
  if (t.isIntro) {
    var val = t.getStyle(axis);
    t.setStyle(axis, 0);
    t.setStyle('opacity', 0);
    return t.animateStyle(axis, val, p).then(function () { return t.animateStyle('opacity', 1, p); });
  } else {
    t.setStyle(axis, t.getStyle(axis));
    t.setStyle('opacity', 1);
    return t.animateStyle('opacity', 0, p).then(function () { return t.animateStyle(axis, 0, p); });
  }
}

globalRegister('expand', 'transitions', expand);

return expand;

})));
