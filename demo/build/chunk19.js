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

      var template = {v:4,t:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtoggle",g:1},{t:8,r:"extra-attributes"},{n:"class-rtoggle-disabled",t:13,f:[{t:2,r:"__toggle.disabled"}]},{n:"class-rtoggle-true",t:13,f:[{t:2,r:"__toggle._value"}]},{n:"class-rtoggle-false",t:13,f:[{t:2,x:{r:["__toggle.nullable","__toggle._value"],s:"_1===false||(!_0&&(_1===null||_1===undefined))"}}]},{n:"class-rtoggle-null",t:13,f:[{t:2,x:{r:["__toggle.nullable","__toggle._value"],s:"_0&&(_1===null||_1===undefined)"}}]},{t:4,f:[{n:["click"],t:70,f:{r:["__toggle"],s:"[_0.toggle()]"}}],n:51,r:"__toggle.disabled"}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtoggle-rail",g:1}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rtoggle-nubbin",g:1}]}]}],e:{"_1===false||(!_0&&(_1===null||_1===undefined))":function (_0,_1){return(_1===false||(!_0&&(_1===null||_1===undefined)));},"_0&&(_1===null||_1===undefined)":function (_0,_1){return(_0&&(_1===null||_1===undefined));},"[_0.toggle()]":function (_0){return([_0.toggle()]);}}};

      var Toggle = Ractive$1.macro(
        function (handle, attrs) {
          var obj = {
            observers: [],
            update: function update(attrs) {
              handle.set('@local', attrs, { deep: true });
              if ('value' in attrs && typeof attrs.value !== 'string') {
                change(attrs.value);
              }
            },
            teardown: function teardown() {
              obj.observers.forEach( function (o) { return o.cancel(); } );
            }
          };

          handle.aliasLocal('__toggle');

          var lock = false;
          if (attrs.value && typeof attrs.value === 'string') {
            handle.set('@local._value', handle.get(attrs.value));
            obj.observers.push(handle.observe(attrs.value, function (v) {
              if (!lock) {
                lock = true;
                change(v);
                lock = false;
              }
            }, { init: false }));
            obj.observers.push(handle.observe('@local._value', function (v) {
              if (!lock) {
                lock = true;
                handle.set(handle.attributes.value, v);
                lock = false;
              }
            }, { init: false }));
          } else { handle.set('@local._value', attrs.value); }

          handle.set('@local', attrs, { deep: true });

          handle.setTemplate(template);
          
          function change(next) {
            var cur = handle.get('@local._value');
            if (cur !== next) {
              handle.set('@local._value', next);
              var div = handle.find('div');
              if (div) {
                Ractive$1.getContext(div).raise('change', {}, next);
              }
            }
          }

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

            change(value);

            return false;
          });

          return obj;
        },
        {
          noCssTransform: true,
          cssId: 'rtoggle',
          css: function(data) { return [(function(data) {
         var primary = Object.assign({}, data('raui.primary'), data('raui.toggle.primary'));
         var toggle = Object.assign({}, data('raui.toggle'));
         return (".rtoggle {\n     display: inline-block;\n     position: relative;\n     width: 2.5em;\n     height: 1.5em;\n     vertical-align: middle;\n     font-size: 1.1em;\n   }\n \n   .rtoggle-rail {\n     height: 1.25em;\n     top: 0.125em;\n     width: 100%;\n     position: absolute;\n     background-color: " + (toggle.railOff || primary.fg || '#222') + ";\n     border-radius: " + (toggle.square ? '2px' : '0.7em') + ";\n     transition: background-color 0.3s ease-in-out;\n   }\n \n   .rtoggle-true .rtoggle-rail {\n     background-color: " + (toggle.railOn || primary.fga || '#07e') + ";\n   }\n \n   .rtoggle-null .rtoggle-rail {\n     background-color: " + (toggle.railNull || primary.bga || '#e2e2e2') + ";\n   }\n \n   .rtoggle-true .rtoggle-nubbin {\n     background-color: " + (toggle.on || primary.bg || '#fff') + ";\n     left: 1.4em;\n   }\n \n   .rtoggle-null .rtoggle-nubbin {\n     background-color: " + (toggle.null || primary.bg || '#fff') + ";\n     left: 0.75em;\n   }\n \n \n   .rtoggle-disabled .rtoggle-rail {\n     background-color: " + (toggle.railDisabled || primary.bc || '#ccc') + ";\n   }\n \n   .rtoggle-nubbin {\n     position: absolute;\n     top: 0.25em;\n     left: 0.1em;\n     display: inline-block;\n     width: 1em;\n     height: 1em;\n     border-radius: " + (toggle.square ? '2px' : '1em') + ";\n     transition: left 0.3s ease-in-out, background-color 0.2s ease-in-out;\n     background-color: " + (toggle.off || primary.bg || '#fff') + ";\n     box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n       0 1px 5px 0 rgba(0, 0, 0, 0.12),\n       0 3px 1px -2px rgba(0, 0, 0, 0.2);\n     cursor: pointer;\n   }\n \n   .rtoggle-disabled .rtoggle-nubbin {\n     background-color: " + (toggle.railDisabled || primary.bc || '#ccc') + ";\n     cursor: not-allowed;\n   }\n   ");
      }).call(this, data)].join(' '); },
          attributes: ['value', 'nullable', 'disabled', 'undefined']
        }
      );

      function plugin(opts) {
        if ( opts === void 0 ) opts = {};

        return function(ref) {
          var instance = ref.instance;

          instance.partials[opts.name || 'toggle'] = Toggle;
        }
      }

      globalRegister('RauiToggle', 'partials', Toggle);
      exports('default', plugin);

    }
  };
});
