System.register(['./chunk2.js'], function (exports, module) {
  'use strict';
  var globalRegister;
  return {
    setters: [function (module) {
      globalRegister = module.default;
    }],
    execute: function () {

      function fade(t, params) {
        var p = t.processParams(params, { duration: 200, easing: 'easeInOut' });
        if (t.isIntro || p.intro) {
          t.setStyle('opacity', 0);
          return t.animateStyle('opacity', 1, p);
        } else {
          t.setStyle('opacity', 1);
          return t.animateStyle('opacity', 0, p);
        }
      }

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.transitions[opts.name || 'fade'] = fade;
        }
      }

      globalRegister('fade', 'transitions', fade);
      exports('default', plugin);

    }
  };
});
