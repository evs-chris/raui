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

      var template = {v:4,t:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtoggle",g:1},{t:16,r:"extra-attributes"},{n:"class-rtoggle-disabled",t:13,f:[{t:2,r:"__toggle.disabled"}]},{n:"class-rtoggle-true",t:13,f:[{t:2,r:"__toggle._value"}]},{n:"class-rtoggle-false",t:13,f:[{t:2,x:{r:["__toggle.nullable","__toggle._value"],s:"_1===false||(!_0&&(_1===null||_1===undefined))"}}]},{n:"class-rtoggle-null",t:13,f:[{t:2,x:{r:["__toggle.nullable","__toggle._value"],s:"_0&&(_1===null||_1===undefined)"}}]},{t:4,f:[{n:["click"],t:70,f:{r:["__toggle"],s:"[_0.toggle()]"}}],n:51,r:"__toggle.disabled"}],f:[{t:7,e:"div",m:[{t:13,n:"class",f:"rtoggle-rail",g:1}]}," ",{t:7,e:"div",m:[{t:13,n:"class",f:"rtoggle-nubbin",g:1}]}]}],e:{"_1===false||(!_0&&(_1===null||_1===undefined))":function (_0,_1){return(_1===false||(!_0&&(_1===null||_1===undefined)));},"_0&&(_1===null||_1===undefined)":function (_0,_1){return(_0&&(_1===null||_1===undefined));},"[_0.toggle()]":function (_0){return([_0.toggle()]);}}};

      var Toggle = Ractive$1.macro(
        function (handle, attrs) {
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
          cssId: 'rtoggle',
          css: function(data) { return [(function(data) {
         var primary = Object.assign({}, data('raui.primary'), data('raui.toggle.primary'));
         var toggle = Object.assign({}, data('raui.toggle'));
         return (".rtoggle {\n     display: inline-block;\n     position: relative;\n     width: 2.5em;\n     height: 1.5em;\n     vertical-align: middle;\n     font-size: 1.1em;\n   }\n \n   .rtoggle-rail {\n     height: 1.25em;\n     top: 0.125em;\n     width: 100%;\n     position: absolute;\n     background-color: " + (toggle.railOff || primary.fg || '#222') + ";\n     border-radius: " + (toggle.square ? '2px' : '0.7em') + ";\n     transition: background-color 0.3s ease-in-out;\n   }\n \n   .rtoggle-true .rtoggle-rail {\n     background-color: " + (toggle.railOn || primary.fga || '#07e') + ";\n   }\n \n   .rtoggle-null .rtoggle-rail {\n     background-color: " + (toggle.railNull || primary.bga || '#f4f4f4') + ";\n   }\n \n   .rtoggle-true .rtoggle-nubbin {\n     background-color: " + (toggle.on || primary.bg || '#fff') + ";\n     left: 1.4em;\n   }\n \n   .rtoggle-null .rtoggle-nubbin {\n     background-color: " + (toggle.null || primary.bg || '#fff') + ";\n     left: 0.75em;\n   }\n \n \n   .rtoggle-disabled .rtoggle-rail {\n     background-color: " + (toggle.railDisabled || primary.bc || '#ccc') + ";\n   }\n \n   .rtoggle-nubbin {\n     position: absolute;\n     top: 0.25em;\n     left: 0.1em;\n     display: inline-block;\n     width: 1em;\n     height: 1em;\n     border-radius: " + (toggle.square ? '2px' : '1em') + ";\n     transition: left 0.3s ease-in-out, background-color 0.2s ease-in-out;\n     background-color: " + (toggle.off || primary.bg || '#fff') + ";\n     box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),\n       0 1px 5px 0 rgba(0, 0, 0, 0.12),\n       0 3px 1px -2px rgba(0, 0, 0, 0.2);\n     cursor: pointer;\n   }\n \n   .rtoggle-disabled .rtoggle-nubbin {\n     background-color: " + (toggle.railDisabled || primary.bc || '#ccc') + ";\n     cursor: not-allowed;\n   }\n   ");
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
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    This is your standard boolean toggle that looks like an on/off switch. This is actually a macro partial rather than a component, so it's fairly light weight. It also supports `null` or `undefined` states with an intermediate position for all of your parties with three-state booleans.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin options\n\n    All options are optional.\n\n    * `name: string = 'toggle'` - the name to use when registering the plugin as a component\n\n    ### Attributes\n\n    * `disabled: boolean` - whether the toggle is disabled\n    * `value: any` - the backing value for the toggle\n    * `nullable: boolean` - whether the toggle includes a `null` state\n    * `undefined: boolean` - whether the null value should be `undefined` rather than `null`\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:["change"],t:70,f:{r:["@this.constructor.Ractive"],s:"[_0.styleSet(\"raui.toggle.square\",!_0.styleGet(\"raui.toggle.square\"))]"}}]}," Square toggles?"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".nullable"}],t:13}]}," Nullable"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".undefined"}],t:13}]}," Undefined"]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".disabled"}],t:13}]}," Disabled"]}," ",{t:7,e:"marked",f:["      ### Template:\n      ```hbs\n      <toggle value=\".foo\" bind-disabled bind-nullable bind-undefined />\n      <input type=\"checkbox\" checked=\"{{.foo}}\" />\n      {{'' + .foo}}\n      ```\n      ### Result:\n    "]}," ",{t:7,e:"toggle",m:[{n:"value",f:".foo",t:13},{n:"disabled",t:13,f:[{t:2,r:"disabled"}]},{n:"nullable",t:13,f:[{t:2,r:"nullable"}]},{n:"undefined",t:13,f:[{t:2,r:"undefined"}]}]}," ",{t:7,e:"input",m:[{n:"type",f:"checkbox",t:13},{n:"checked",f:[{t:2,r:".foo"}],t:13}]}," ",{t:2,x:{r:[".foo"],s:"\"\"+_0"}}]}]}],e:{"[_0.styleSet(\"raui.toggle.square\",!_0.styleGet(\"raui.toggle.square\"))]":function (_0){return([_0.styleSet("raui.toggle.square",!_0.styleGet("raui.toggle.square"))]);},"\"\"+_0":function (_0){return(""+_0);}}},
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
