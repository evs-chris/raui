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

      exports('default', keys);
      function keys(opts) {
        if ( opts === void 0 ) opts = {};

        function KeyEvent(node, fire) {
          var arguments$1 = arguments;

          var options = Object.assign({}, { keys: opts.keys }, arguments[arguments.length - 1]);
          if (arguments.length > 2) {
            options.keys = [];
            for (var i = 2; i < arguments.length; i++) {
              if (typeof arguments$1[i] === 'number') { options.keys.push(arguments$1[i]); }
            }
          }

          var ctx = Ractive$1.getContext(node);

          var listener = ctx.listen('keydown', function (ev) {
            if (~options.keys.indexOf(ev.which)) {
              fire({ event: ev });
              if (options.prevent !== false) { ev.preventDefault(); }
            }
          });

          return {
            teardown: function teardown() {
              listener.cancel();
            }
          }
        }

        function plugin(ref) {
          var instance = ref.instance;

          instance.events[opts.name || 'keys'] = KeyEvent;
        }

        plugin.event = KeyEvent;

        return plugin;
      }

      globalRegister('RauiKeyEvent', 'events', keys().event);

    }
  };
});
