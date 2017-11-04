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

var template = {v:4,t:[{t:7,e:"div",m:[{n:"class-rtoggle",t:13},{t:16,r:"extra-attributes"},{n:"class-rtoggle-disabled",t:13,f:[{t:2,r:"__toggle.disabled"}]},{n:"class-rtoggle-true",t:13,f:[{t:2,r:"__toggle._value"}]},{n:"class-rtoggle-false",t:13,f:[{t:2,x:{r:["__toggle.nullable","__toggle._value"],s:"_1===false||(!_0&&(_1===null||_1===undefined))"}}]},{n:"class-rtoggle-null",t:13,f:[{t:2,x:{r:["__toggle._value"],s:"_0===null||_0===undefined"}}]},{t:4,f:[{n:["click"],t:70,f:{r:["__toggle"],s:"[_0.toggle()]"}}],n:51,r:"__toggle.disabled"}],f:[{t:7,e:"div",m:[{n:"class",f:"rtoggle-rail",t:13}]}," ",{t:7,e:"div",m:[{n:"class",f:"rtoggle-nubbin",t:13}]}]}],e:{"_1===false||(!_0&&(_1===null||_1===undefined))":function (_0,_1){return(_1===false||(!_0&&(_1===null||_1===undefined)));},"_0===null||_0===undefined":function (_0){return(_0===null||_0===undefined);},"[_0.toggle()]":function (_0){return([_0.toggle()]);}}};

var Toggle = Ractive$1.macro(
  function ( handle, attrs ) {
    var obj = {
      observers: [],
      update: function update(attrs) { handle.set('@local', attrs, { deep: true }); },
      teardown: function teardown() {
        obj.observers.forEach( function (o) { return o.cancel(); } );
      }
    };

    handle.aliasLocal('__toggle');

    var lock = false;
    obj.observers.push(handle.observe(attrs.value, function (v) {
      if (!lock) {
        lock = true;
        handle.set('@local._value', v);
        lock = false;
      }
    }));
    obj.observers.push(handle.observe('@local._value', function (v) {
      if (!lock) {
        lock = true;
        handle.set(handle.attributes.value, v);
        lock = false;
      }
    }));

    handle.set('@local', attrs, { deep: true });

    handle.setTemplate(template);

    handle.set('@local.toggle', function () {
      var ref = handle.get('@local');
      var _value = ref._value;
      var nullable = ref.nullable;
      var value;

      if (_value) { value = false; }
      else if (_value === false) {
        if (nullable) { value = handle.get('@local.undefined') ? undefined : null; }
        else { value = true; }
      } else {
        value = true;
      }

      handle.set('@local._value', value);

      return false;
    });

    return obj;
  },
  {
    noCssTransform: true,
    cssId: 'toggle',
    css: function(data) { return [(function(d) {
   return (".rtoggle {\n     display: inline-block;\n     position: relative;\n     width: 1.7em;\n     height: 1em;\n     vertical-align: middle;\n     font-size: 1.1em;\n   }\n \n   .rtoggle-rail {\n     height: 0." + (d('toggle.square') ? '8' : '7') + "em;\n     top: 0." + (d('toggle.square') ? '1' : '15') + "em;\n     width: 100%;\n     position: absolute;\n     background-color: " + (d('toggle.color.rail.off') || 'rgba(0, 0, 0, 0.5)') + ";\n     border-radius: " + (d('toggle.square') ? '2px' : '0.7em') + ";\n     transition: background-color 0.3s ease-in-out;\n   }\n \n   .rtoggle-true .rtoggle-rail {\n     background-color: " + (d('toggle.color.rail.on') || 'rgba(0, 0, 0, 0.2)') + ";\n   }\n \n   .rtoggle-null .rtoggle-rail {\n     background-color: " + (d('toggle.color.rail.null') || 'rgba(0, 0, 0, 0.35)') + ";\n   }\n \n   .rtoggle-true .rtoggle-nubbin {\n     background-color: " + (d('toggle.color.on') || '#fefefe') + ";\n     left: 0.7em;\n   }\n \n   .rtoggle-null .rtoggle-nubbin {\n     background-color: " + (d('toggle.color.null') || '#fefefe') + ";\n     left: 0.35em;\n   }\n \n \n   .rtoggle-disabled .rtoggle-rail {\n     background-color: " + (d('toggle.color.disabled') || '#888') + ";\n   }\n \n   .rtoggle-nubbin {\n     position: absolute;\n     top: 0;\n     left: 0;\n     display: inline-block;\n     width: 1em;\n     height: 1em;\n     border-radius: " + (d('toggle.square') ? '2px' : '1em') + ";\n     transition: left 0.3s ease-in-out, background-color 0.2s ease-in-out;\n     background-color: " + (d('toggle.color.off') || '#eee') + ";\n     box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n       0 1px 5px 0 rgba(0, 0, 0, 0.12),\n       0 3px 1px -2px rgba(0, 0, 0, 0.2);\n     cursor: pointer;\n   }\n \n   .rtoggle-disabled .rtoggle-nubbin {\n     background-color: " + (d('toggle.color.disabled') || '#888') + ";\n     cursor: not-allowed;\n   }\n   ");
}).call(this, data)].join(' '); },
    attributes: ['value', 'nullable', 'disabled', 'undefined']
  }
);

globalRegister('RMToggle', 'partials', Toggle);

export default Toggle;
