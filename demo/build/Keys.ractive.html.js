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

      globalRegister('RMKeyEvent', 'events', keys().event);

      var Keys_ractive = exports('default', Window.extend({
          template: {v:4,t:[{t:7,e:"tabs",m:[{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"class-secondary",t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13}],f:["\n  ",{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13}],f:[{t:7,e:"marked",f:["\n    Sometimes it's more convenient to declaratively listen for certain keys than it is to install a key listener that has logic on the data or API side. To that end, raui has the custom key event, which automatically filters out keydown events that aren't in its list of keys for which to listen.\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13}],f:[{t:7,e:"marked",f:["\n    ### Plugin options\n\n    All options are optional.\n\n    * `name: string = 'keys'` - the name to use when registering the plugin as an event\n    * `keys: number[]` - a list of key codes to use as the default for the event\n\n    ### Init arguments\n\n    * `on-keys([...keys], { options })=\"event handler\"`\n      * `...keys` - an optional list of for which to listen\n      * `options` - an optional options object\n        * `keys: number[]` - keys can also be specified directly in the options\n        * `prevent: boolean = true` - whether the event should `preventDefault` when a matching event is fired\n  "]}]},"\n  ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13}],f:["\n    ",{t:7,e:"marked",f:["\n      ### Template:\n      ```hbs\n      <label as-field>\n        Test\n        <input on-keys(9,10,13,16,17,18,27,37,38,39,40)=\"@.unshift('presses', @event.which)\" />\n      </label>\n      ```\n      ### Result:\n    "]},"\n    ",{t:7,e:"label",m:[{n:"field",t:71}],f:["\n      Test\n      ",{t:7,e:"input",m:[{n:["keys"],t:70,a:{r:[],s:"[9,10,13,16,17,18,27,37,38,39,40]"},f:{r:["@this","@event.which"],s:"[_0.unshift(\"presses\",_1)]"}}]},"\n    "]},"\n    ",{t:7,e:"pre",f:[{t:7,e:"code",f:["\n",{t:2,x:{r:["presses"],s:"_0.join(\", \")"}},"\n    "]}]},"\n  "]},"\n"]}],e:{"[9,10,13,16,17,18,27,37,38,39,40]":function (){return([9,10,13,16,17,18,27,37,38,39,40]);},"[_0.unshift(\"presses\",_1)]":function (_0,_1){return([_0.unshift("presses",_1)]);},"_0.join(\", \")":function (_0){return(_0.join(", "));}}},
          use: [keys()],
          options: {
            title: 'Event :: Keys',
            resizable: true, flex: true,
            width: '48em', height: '30em'
          }
        }));

    }
  };
});
