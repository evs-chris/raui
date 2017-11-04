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

function keys() {
  var keys = [], len = arguments.length;
  while ( len-- ) keys[ len ] = arguments[ len ];

  return function KeyEvent(node, fire) {
    var ctx = Ractive$1.getContext(node);

    var listener = ctx.listen('keydown', function (ev) {
      if (~keys.indexOf(ev.which)) {
        fire(ev);
        ev.preventDefault();
      }
    });

    return {
      teardown: function teardown() {
        listener.cancel();
      }
    }
  }
}

var tabQuery = 'input:not(:disabled):not([tabIndex="-1"]), select:not(:disabled):not([tabIndex="-1"]), a:not([tabIndex="-1"]), button:not(:disabled):not([tabIndex="-1"])';

function tab(instance) {
  var nodes;

  if (instance) {
    nodes = instance.findAll(tabQuery);
  } else {
    nodes = document.querySelectorAll(tabQuery);
  }

  var node = document.activeElement;

  var idx = nodes.indexOf(node);

  if (idx === -1 || idx === nodes.length - 1) {
    nodes[0].focus();
  } else {
    nodes[idx + 1].focus();
  }
}

globalRegister('RMKeyEvent', 'events', keys);
globalRegister('EMTabEvent', 'events', tab);

export { keys, tab };
