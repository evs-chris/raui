System.register([], function (exports, module) {
  'use strict';
  return {
    execute: function () {

      function clickout(node, fire) {
        var registered = false, torndown = false;
        function handler(ev) {
          var n = ev.target;
          while (n) {
            if (n === node) { return; }
            if (!n.parentNode && n !== document) { return; }
            n = n.parentNode;
          }
          fire(ev);
        }


        setTimeout(function () {
          registered = true;
          if (!torndown) {
            document.body.addEventListener('click', handler);
            document.body.addEventListener('touchstop', handler);
          }
        });
        

        return {
          teardown: function teardown() {
            torndown = true;
            if (registered) {
              document.body.removeEventListener('click', handler);
              document.body.removeEventListener('touchstop', handler);
            }
          }
        }
      }

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.events[opts.name || 'clickout'] = clickout;
        }
      }
      exports('default', plugin);

    }
  };
});
