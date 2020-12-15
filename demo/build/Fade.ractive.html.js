System.register(['./chunk2.js', './chunk12.js'], function (exports, module) {
  'use strict';
  var Window, fade;
  return {
    setters: [function (module) {
      Window = module.Window;
    }, function (module) {
      fade = module.default;
    }],
    execute: function () {

      var Fade_ractive = exports('default', Window.extend({
        template: {v:4,t:[{t:7,e:"tabs",m:[{t:13,n:"class",f:"alt",g:1},{n:"flat",f:0,t:13},{n:"pad",f:0,t:13},{n:"fill",f:0,t:13},{n:"height",f:"dynamic",t:13,g:1}],f:[{t:7,e:"tab",m:[{n:"title",f:"Intro",t:13,g:1}],f:[{t:7,e:"marked",f:["    This is your bog-standard fade transition. It's only included as a convenience to avoid yet another tiny dependency.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Usage",t:13,g:1}],f:[{t:7,e:"marked",f:["    ### Plugin options\n\n    All options are optional.\n\n    * `name: string = 'fade'` - the name to use when registering the plugin as a transition\n\n    ### Parameters\n\n    Parameters, as with most transitions, are passed in an options argument e.g. `fade-in=\"{ ... }\"`. Any Ractive transition args can be passed in, and this transition has no non-standard parameters.\n  "]}]}," ",{t:7,e:"tab",m:[{n:"title",f:"Example",t:13,g:1}],f:[{t:7,e:"marked",f:["      ### Template:\n      ```hbs\n      {{#if .show}}\n      <div fade-in-out=\"{ duration: 1000 }\">\n        This is a thing that will fade in and out.\n      </div>\n      {{/if}]}\n      ```\n      ### Result:\n    "]}," ",{t:7,e:"label",m:[{n:"field",t:71}],f:[{t:7,e:"button",m:[{n:["click"],t:70,f:{r:["@this"],s:"[_0.toggle(\"show\")]"}}],f:["Show"]}]}," ",{t:4,f:[{t:7,e:"div",m:[{n:"fade",t:72,f:{r:[],s:"[{duration:1000}]"},v:"t0"}],f:["This is a thing that will fade in and out."]}],n:50,r:".show"}]}]}],e:{"[_0.toggle(\"show\")]":function (_0){return([_0.toggle("show")]);},"[{duration:1000}]":function (){return([{duration:1000}]);}}},
        use: [fade],
        options: {
          title: 'Transition :: Fade',
          resizable: true, flex: true,
          width: '48em', height: '30em'
        }
      }));

    }
  };
});
