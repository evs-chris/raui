System.register(['./chunk2.js', './chunk8.js'], function (exports, module) {
  'use strict';
  var Window, keys;
  return {
    setters: [function (module) {
      Window = module.Window;
    }, function (module) {
      keys = module.default;
    }],
    execute: function () {

      var Keys_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    Sometimes it's more convenient to declaratively listen for certain keys than it is to install a key listener that has logic on the data or API side. To that end, raui has the custom key event, which automatically filters out keydown events that aren't in its list of keys for which to listen.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin options\n\n    All options are optional.\n\n    * `name: string = 'keys'` - the name to use when registering the plugin as an event\n    * `keys: number[]` - a list of key codes to use as the default for the event\n\n    ### Init arguments\n\n    * `on-keys([...keys], { options })=\"event handler\"`\n      * `...keys` - an optional list of for which to listen\n      * `options` - an optional options object\n        * `keys: number[]` - keys can also be specified directly in the options\n        * `prevent: boolean = true` - whether the event should `preventDefault` when a matching event is fired\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"marked",f:["      ### Template:\n      ```hbs\n      <label as-field>\n        Test\n        <input on-keys(9,10,13,16,17,18,27,37,38,39,40)=\"@.unshift('presses', @event.which)\" />\n      </label>\n      ```\n      ### Result:\n    "]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:["Test ",{t:7,e:"input",m:[{n:["keys"],t:70,a:{r:[],s:"[9,10,13,16,17,18,27,37,38,39,40]"},f:{r:["@this","@event.which"],s:"[_0.unshift(\"presses\",_1)]"}}]}]}," ",{t:7,e:"pre",f:[{t:7,e:"code",f:["\n",{t:2,x:{r:["presses"],s:"_0.join(\", \")"}},"\n    "]}]}]}]}],e:{"[9,10,13,16,17,18,27,37,38,39,40]":function (){return([9,10,13,16,17,18,27,37,38,39,40]);},"[_0.unshift(\"presses\",_1)]":function (_0,_1){return([_0.unshift("presses",_1)]);},"_0.join(\", \")":function (_0){return(_0.join(", "));}}},
        use: [keys()],
        options: {
          title: 'Event :: Keys',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        },
        data: function data() {
          return {
            presses: []
          };
        }
      }));

    }
  };
});
