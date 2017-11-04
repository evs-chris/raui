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

var template = {v:4,t:[{t:7,e:"div",m:[{n:"class-card",t:13},{t:8,r:"extra-attributes"}],f:[{t:8,r:"content"}]}]};

var Card = Ractive$1.macro(
  function (handle) {
    handle.setTemplate( template );
  }, {
    cssId: 'rm-card',
    css: function(data) { return [(function(data) {
   return ("\n   .card {\n     display: block;\n     padding: 0.5em;\n     color: " + (data('card.fg') || data('fg1')) + ";\n     background-color: " + (data('card.bg') || data('bg1')) + ";\n     box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);\n     border-radius: 2px;\n   }\n   ");
}).call(this, data)].join(' '); },
    attributes: []
  }
);

globalRegister('RMCard', 'partials', Card);

export default Card;
