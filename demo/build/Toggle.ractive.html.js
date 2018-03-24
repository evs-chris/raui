System.register(['ractive', './chunk2.js'], function (exports, module) {
  'use strict';
  var Ractive$1, globalRegister, Window;
  return {
    setters: [function (module) {
      Ractive$1 = module.default;
    }, function (module) {
      globalRegister = module.default;
      Window = module.Window;
    }],
    execute: function () {

      var template = {v:4,t:[{t:7,e:"div",m:[{n:"class-rtoggle",t:13},{t:16,r:"extra-attributes"},{n:"class-rtoggle-disabled",t:13,f:[{t:2,r:"__toggle.disabled"}]},{n:"class-rtoggle-true",t:13,f:[{t:2,r:"__toggle._value"}]},{n:"class-rtoggle-false",t:13,f:[{t:2,x:{r:["__toggle.nullable","__toggle._value"],s:"_1===false||(!_0&&(_1===null||_1===undefined))"}}]},{n:"class-rtoggle-null",t:13,f:[{t:2,x:{r:["__toggle._value"],s:"_0===null||_0===undefined"}}]},{t:4,f:[{n:["click"],t:70,f:{r:["__toggle"],s:"[_0.toggle()]"}}],n:51,r:"__toggle.disabled"}],f:["\n  ",{t:7,e:"div",m:[{n:"class",f:"rtoggle-rail",t:13}]},"\n  ",{t:7,e:"div",m:[{n:"class",f:"rtoggle-nubbin",t:13}]},"\n"]}],e:{"_1===false||(!_0&&(_1===null||_1===undefined))":function (_0,_1){return(_1===false||(!_0&&(_1===null||_1===undefined)));},"_0===null||_0===undefined":function (_0){return(_0===null||_0===undefined);},"[_0.toggle()]":function (_0){return([_0.toggle()]);}}};

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
            if (attrs.value) {
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
            }

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



        return (".rtoggle {\n\n    display: inline-block;\n\n    position: relative;\n\n    width: 1.7em;\n\n    height: 1.1em;\n\n    vertical-align: middle;\n\n    font-size: 1.1em;\n\n  }\n\n\n\n  .rtoggle-rail {\n\n    height: 0." + (d('toggle.square') ? '8' : '7') + "em;\n\n    top: 0." + (d('toggle.square') ? '1' : '15') + "em;\n\n    width: 100%;\n\n    position: absolute;\n\n    background-color: " + (d('toggle.color.rail.off') || 'rgba(0, 0, 0, 0.5)') + ";\n\n    border-radius: " + (d('toggle.square') ? '2px' : '0.7em') + ";\n\n    transition: background-color 0.3s ease-in-out;\n\n  }\n\n\n\n  .rtoggle-true .rtoggle-rail {\n\n    background-color: " + (d('toggle.color.rail.on') || 'rgba(0, 0, 0, 0.2)') + ";\n\n  }\n\n\n\n  .rtoggle-null .rtoggle-rail {\n\n    background-color: " + (d('toggle.color.rail.null') || 'rgba(0, 0, 0, 0.35)') + ";\n\n  }\n\n\n\n  .rtoggle-true .rtoggle-nubbin {\n\n    background-color: " + (d('toggle.color.on') || '#fefefe') + ";\n\n    left: 0.7em;\n\n  }\n\n\n\n  .rtoggle-null .rtoggle-nubbin {\n\n    background-color: " + (d('toggle.color.null') || '#fefefe') + ";\n\n    left: 0.35em;\n\n  }\n\n\n\n\n\n  .rtoggle-disabled .rtoggle-rail {\n\n    background-color: " + (d('toggle.color.disabled') || '#888') + ";\n\n  }\n\n\n\n  .rtoggle-nubbin {\n\n    position: absolute;\n\n    top: 0;\n\n    left: 0;\n\n    display: inline-block;\n\n    width: 1em;\n\n    height: 1em;\n\n    border-radius: " + (d('toggle.square') ? '2px' : '1em') + ";\n\n    transition: left 0.3s ease-in-out, background-color 0.2s ease-in-out;\n\n    background-color: " + (d('toggle.color.off') || '#eee') + ";\n\n    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n\n      0 1px 5px 0 rgba(0, 0, 0, 0.12),\n\n      0 3px 1px -2px rgba(0, 0, 0, 0.2);\n\n    cursor: pointer;\n\n  }\n\n\n\n  .rtoggle-disabled .rtoggle-nubbin {\n\n    background-color: " + (d('toggle.color.disabled') || '#888') + ";\n\n    cursor: not-allowed;\n\n  }\n\n  ");


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

        globalRegister('RMToggle', 'partials', Toggle);

      var Toggle_ractive = exports('default', Window.extend({
          template: {v:4,t:[{t:7,e:"tabs",m:[{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"class-secondary",t:13},{n:"height",f:"dynamic",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    TODO\n\n    Your standard boolean toggle that looks like an on/off switch. This is actually a macro partial rather than a component, so it's fairly light weight. It also supports `null` or `undefined` states with an intermediate position for all of your parties with three-state booleans.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13}],f:["\n    ",{t:7,e:"toggle",m:[{n:"value",f:".foo",t:13}]},"\n    ",{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".foo"}],t:13}]},"\n  "]},"\n"]}]},
          use: [plugin()],
          options: {
            title: 'Component :: Toggle',
            resizable: true, flex: true,
            width: '48em', height: '30em'
          }
        }));

    }
  };
});
